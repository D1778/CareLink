const { snsClient } = require('../config/aws')
const { PublishCommand, SubscribeCommand } = require('@aws-sdk/client-sns')

const ALERT_TOPIC    = process.env.SNS_ALERT_TOPIC_ARN       || ''
const APPT_TOPIC     = process.env.SNS_APPOINTMENT_TOPIC_ARN || ''

const snsService = {
  /**
   * Publish a vital alert notification
   */
  publishAlert: async ({ patientId, patientName, alertType, message, severity }) => {
    const cmd = new PublishCommand({
      TopicArn: ALERT_TOPIC,
      Subject: `[CareLink ${severity.toUpperCase()}] ${alertType} — ${patientName}`,
      Message: JSON.stringify({ patientId, patientName, alertType, message, severity, timestamp: new Date().toISOString() }),
      MessageAttributes: {
        severity: { DataType: 'String', StringValue: severity },
        patientId: { DataType: 'String', StringValue: patientId },
      },
    })
    return snsClient.send(cmd)
  },

  /**
   * Notify about appointment status change
   */
  publishAppointmentUpdate: async ({ appointmentId, patientEmail, doctorName, status, scheduledAt }) => {
    const cmd = new PublishCommand({
      TopicArn: APPT_TOPIC,
      Subject: `[CareLink] Appointment ${status} — ${doctorName}`,
      Message: JSON.stringify({ appointmentId, patientEmail, doctorName, status, scheduledAt }),
    })
    return snsClient.send(cmd)
  },
}

module.exports = { snsService }
