const { kinesisClient } = require('../config/aws')
const { PutRecordCommand, PutRecordsCommand } = require('@aws-sdk/client-kinesis')

const STREAM = process.env.KINESIS_VITALS_STREAM || 'carelink-vitals-stream'

const kinesisService = {
  /**
   * Send a single vital reading to the Kinesis stream
   * The Lambda vitalsIngestion function will process this record
   */
  putRecord: async (vital) => {
    const cmd = new PutRecordCommand({
      StreamName: STREAM,
      PartitionKey: vital.patient_id,
      Data: Buffer.from(JSON.stringify(vital)),
    })
    return kinesisClient.send(cmd)
  },

  /**
   * Send multiple vital readings in a single batch
   */
  putRecords: async (vitals) => {
    const cmd = new PutRecordsCommand({
      StreamName: STREAM,
      Records: vitals.map(v => ({
        PartitionKey: v.patient_id,
        Data: Buffer.from(JSON.stringify(v)),
      })),
    })
    return kinesisClient.send(cmd)
  },
}

module.exports = { kinesisService }
