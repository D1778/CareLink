const { dynamoClient } = require('../config/aws')
const { PutItemCommand, QueryCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb')
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb')

const TABLE = process.env.DYNAMODB_VITALS_TABLE || 'carelink-vitals'

const dynamoService = {
  /**
   * Store a vital reading in DynamoDB
   */
  putItem: async (vital) => {
    const cmd = new PutItemCommand({
      TableName: TABLE,
      Item: marshall({
        patient_id:    vital.patient_id,
        timestamp:     vital.timestamp,
        id:            vital.id,
        heart_rate:    vital.heart_rate,
        systolic:      vital.systolic,
        diastolic:     vital.diastolic,
        spo2:          vital.spo2,
        blood_glucose: vital.blood_glucose,
        status:        vital.status,
        ttl:           Math.floor(Date.now() / 1000) + 7776000, // 90 day TTL
      }),
    })
    return dynamoClient.send(cmd)
  },

  /**
   * Query vitals for a specific patient (descending order)
   */
  queryByPatient: async (patientId, limit = 50) => {
    const cmd = new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: 'patient_id = :pid',
      ExpressionAttributeValues: marshall({ ':pid': patientId }),
      ScanIndexForward: false,
      Limit: limit,
    })
    const result = await dynamoClient.send(cmd)
    return (result.Items || []).map(item => unmarshall(item))
  },

  /**
   * Get a single vital record by patient + timestamp
   */
  getItem: async (patientId, timestamp) => {
    const cmd = new GetItemCommand({
      TableName: TABLE,
      Key: marshall({ patient_id: patientId, timestamp }),
    })
    const result = await dynamoClient.send(cmd)
    return result.Item ? unmarshall(result.Item) : null
  },
}

module.exports = { dynamoService }
