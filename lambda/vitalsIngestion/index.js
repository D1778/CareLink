/**
 * Lambda: Vitals Ingestion
 * Trigger: Amazon Kinesis stream (carelink-vitals-stream)
 * Flow: Kinesis → Lambda → DynamoDB → anomaly check → SNS alert
 */

const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb')
const { SNSClient, PublishCommand }       = require('@aws-sdk/client-sns')
const { marshall } = require('@aws-sdk/util-dynamodb')

const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' })
const sns    = new SNSClient({ region: process.env.AWS_REGION || 'us-east-1' })

const VITALS_TABLE  = process.env.DYNAMODB_VITALS_TABLE || 'carelink-vitals'
const ALERT_TOPIC   = process.env.SNS_ALERT_TOPIC_ARN   || ''

// Threshold rules
const THRESHOLDS = {
  heart_rate:    { critical: { min: 40, max: 130 }, warning: { min: 50, max: 110 } },
  spo2:          { critical: { min: 90 },            warning: { min: 93 } },
  systolic:      { critical: { max: 180 },           warning: { max: 160 } },
  blood_glucose: { critical: { max: 300 },           warning: { max: 180 } },
}

function checkThresholds(vital) {
  const alerts = []
  const { heart_rate, spo2, systolic, blood_glucose } = vital

  if (heart_rate < THRESHOLDS.heart_rate.critical.min || heart_rate > THRESHOLDS.heart_rate.critical.max)
    alerts.push({ field: 'heart_rate', severity: 'critical', value: heart_rate, message: `Heart rate ${heart_rate} BPM is critically abnormal` })
  else if (heart_rate < THRESHOLDS.heart_rate.warning.min || heart_rate > THRESHOLDS.heart_rate.warning.max)
    alerts.push({ field: 'heart_rate', severity: 'warning',  value: heart_rate, message: `Heart rate ${heart_rate} BPM is elevated` })

  if (spo2 < THRESHOLDS.spo2.critical.min)
    alerts.push({ field: 'spo2', severity: 'critical', value: spo2, message: `SpO₂ ${spo2}% is critically low` })
  else if (spo2 < THRESHOLDS.spo2.warning.min)
    alerts.push({ field: 'spo2', severity: 'warning',  value: spo2, message: `SpO₂ ${spo2}% is below normal` })

  if (systolic > THRESHOLDS.systolic.critical.max)
    alerts.push({ field: 'systolic', severity: 'critical', value: systolic, message: `Blood pressure ${systolic} mmHg is critically high` })
  else if (systolic > THRESHOLDS.systolic.warning.max)
    alerts.push({ field: 'systolic', severity: 'warning',  value: systolic, message: `Blood pressure ${systolic} mmHg is elevated` })

  return alerts
}

exports.handler = async (event) => {
  const results = []

  for (const record of event.Records) {
    try {
      // Decode Kinesis record
      const payload = Buffer.from(record.kinesis.data, 'base64').toString('utf-8')
      const vital   = JSON.parse(payload)

      console.log(`[vitalsIngestion] Processing vital for patient ${vital.patient_id}`)

      // 1. Store in DynamoDB
      await dynamo.send(new PutItemCommand({
        TableName: VITALS_TABLE,
        Item: marshall({
          ...vital,
          processed_at: new Date().toISOString(),
          ttl: Math.floor(Date.now() / 1000) + 7776000,
        }),
      }))

      // 2. Check thresholds and trigger alerts
      const alerts = checkThresholds(vital)
      for (const alert of alerts) {
        if (ALERT_TOPIC) {
          await sns.send(new PublishCommand({
            TopicArn: ALERT_TOPIC,
            Subject: `[CareLink ${alert.severity.toUpperCase()}] ${alert.field} alert — Patient ${vital.patient_id}`,
            Message: JSON.stringify({ ...alert, patient_id: vital.patient_id, timestamp: vital.timestamp }),
            MessageAttributes: {
              severity:  { DataType: 'String', StringValue: alert.severity },
              patientId: { DataType: 'String', StringValue: vital.patient_id },
            },
          }))
          console.log(`[vitalsIngestion] Published ${alert.severity} alert for ${vital.patient_id}: ${alert.message}`)
        }
      }

      results.push({ patient_id: vital.patient_id, status: 'processed', alerts: alerts.length })
    } catch (err) {
      console.error('[vitalsIngestion] Error processing record:', err)
      results.push({ status: 'error', error: err.message })
    }
  }

  return { statusCode: 200, body: JSON.stringify({ processed: results.length, results }) }
}
