/**
 * Lambda: Report Generation
 * Trigger: EventBridge scheduled rule (e.g., daily at 06:00 UTC)
 * Flow: EventBridge → Lambda → query RDS/DynamoDB → generate CSV → S3 → SNS
 */

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { SNSClient, PublishCommand }  = require('@aws-sdk/client-sns')

const s3  = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })
const sns = new SNSClient({ region: process.env.AWS_REGION || 'us-east-1' })

const BUCKET = process.env.S3_BUCKET_NAME      || 'carelink-medical-records'
const TOPIC  = process.env.SNS_ALERT_TOPIC_ARN || ''

function generateMockReportData() {
  const today = new Date()
  return {
    reportDate: today.toISOString().split('T')[0],
    summary: {
      totalPatients:        248,
      activePatients:       231,
      totalAppointments:    89,
      completedAppointments: 74,
      criticalAlerts:       7,
      warningAlerts:        23,
    },
    vitalsStats: {
      avgHeartRate:    78,
      avgSpo2:         97.2,
      avgSystolic:     124,
      abnormalReadings: 15,
    },
    topConditions: [
      { condition:'Hypertension', count:78 },
      { condition:'Diabetes T2',  count:61 },
      { condition:'Heart Failure',count:45 },
      { condition:'COPD',         count:32 },
    ],
  }
}

function jsonToCsv(data) {
  const lines = ['Report Date,Metric,Value', `${data.reportDate},Total Patients,${data.summary.totalPatients}`, `${data.reportDate},Active Patients,${data.summary.activePatients}`, `${data.reportDate},Total Appointments,${data.summary.totalAppointments}`, `${data.reportDate},Critical Alerts,${data.summary.criticalAlerts}`, `${data.reportDate},Warning Alerts,${data.summary.warningAlerts}`, `${data.reportDate},Avg Heart Rate,${data.vitalsStats.avgHeartRate}`, `${data.reportDate},Avg SpO2,${data.vitalsStats.avgSpo2}`, `${data.reportDate},Abnormal Readings,${data.vitalsStats.abnormalReadings}`]
  return lines.join('\n')
}

exports.handler = async (event) => {
  console.log('[reportGeneration] Triggered:', JSON.stringify(event))

  try {
    // 1. Gather data
    const reportData = generateMockReportData()
    const csv = jsonToCsv(reportData)
    const json = JSON.stringify(reportData, null, 2)

    const dateStr = reportData.reportDate
    const csvKey  = `reports/${dateStr}/daily-report.csv`
    const jsonKey = `reports/${dateStr}/daily-report.json`

    // 2. Upload CSV to S3
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: csvKey,  Body: csv,  ContentType: 'text/csv' }))
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: jsonKey, Body: json, ContentType: 'application/json' }))

    console.log(`[reportGeneration] Reports uploaded: s3://${BUCKET}/${csvKey}`)

    // 3. Notify via SNS
    if (TOPIC) {
      await sns.send(new PublishCommand({
        TopicArn: TOPIC,
        Subject: `[CareLink] Daily Health Report — ${dateStr}`,
        Message: `Daily report for ${dateStr} has been generated.\n\nSummary:\n- Patients: ${reportData.summary.totalPatients}\n- Appointments: ${reportData.summary.totalAppointments}\n- Critical Alerts: ${reportData.summary.criticalAlerts}\n\nCSV: s3://${BUCKET}/${csvKey}`,
      }))
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, reportDate: dateStr, s3Paths: [csvKey, jsonKey], summary: reportData.summary }),
    }
  } catch (err) {
    console.error('[reportGeneration] Error:', err)
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
