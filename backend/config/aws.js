const { S3Client }       = require('@aws-sdk/client-s3')
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { SNSClient }      = require('@aws-sdk/client-sns')
const { KinesisClient }  = require('@aws-sdk/client-kinesis')

const awsConfig = {
  region:      process.env.AWS_REGION            || 'us-east-1',
  credentials: {
    accessKeyId:     process.env.AWS_ACCESS_KEY_ID     || 'local',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
  },
}

const s3Client       = new S3Client(awsConfig)
const dynamoClient   = new DynamoDBClient(awsConfig)
const snsClient      = new SNSClient(awsConfig)
const kinesisClient  = new KinesisClient(awsConfig)

module.exports = { s3Client, dynamoClient, snsClient, kinesisClient }
