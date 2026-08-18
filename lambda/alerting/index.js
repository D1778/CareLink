/**
 * Lambda: Alerting
 * Trigger: SNS topic subscription (carelink-alerts)
 * Flow: SNS → Lambda → format & route notification → email/push
 */

const HEALTHCARE_TEAM_EMAIL = process.env.HEALTHCARE_TEAM_EMAIL || 'alerts@carelink.health'

exports.handler = async (event) => {
  for (const record of event.Records) {
    try {
      const snsMessage = record.Sns
      const alert = JSON.parse(snsMessage.Message)

      console.log(`[alerting] Received alert:`, alert)

      const severity   = alert.severity || snsMessage.MessageAttributes?.severity?.Value || 'warning'
      const patientId  = alert.patient_id || snsMessage.MessageAttributes?.patientId?.Value
      const message    = alert.message || snsMessage.Subject

      // Format notification payload
      const notification = {
        id:         `ALT-${Date.now()}`,
        patientId,
        severity,
        message,
        timestamp:  new Date().toISOString(),
        source:     'CareLink Alerting Lambda',
        channels:   severity === 'critical' ? ['push', 'email', 'sms'] : ['push', 'email'],
        delivered:  false,
      }

      // In production, integrate with:
      // - AWS SES for email
      // - AWS SNS mobile push notifications
      // - Amazon Pinpoint for SMS
      // - Amazon Connect for voice calls (critical only)
      console.log(`[alerting] Would send ${severity} notification via ${notification.channels.join(', ')}`)
      console.log(`[alerting] Notification:`, JSON.stringify(notification, null, 2))

      // Mock delivery confirmation
      notification.delivered = true
      notification.deliveredAt = new Date().toISOString()

    } catch (err) {
      console.error('[alerting] Error processing SNS record:', err)
    }
  }

  return { statusCode: 200, body: JSON.stringify({ processed: event.Records.length }) }
}
