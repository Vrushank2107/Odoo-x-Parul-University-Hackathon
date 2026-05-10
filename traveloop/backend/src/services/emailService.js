import nodemailer from 'nodemailer'
import { config } from '../config/env.js'

// Create transporter based on environment
const createTransporter = () => {
  // For Gmail
  if (config.emailService === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.emailUser,
        pass: config.emailPassword // Use App Password for Gmail
      }
    })
  }

  // For custom SMTP
  return nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword
    }
  })
}

// HTML template for password reset email
const getPasswordResetTemplate = (resetUrl, userName) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - Traveloop</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      color: rgba(255, 255, 255, 0.9);
      margin: 10px 0 0 0;
      font-size: 16px;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #1f2937;
      font-size: 22px;
      margin-bottom: 20px;
    }
    .content p {
      color: #4b5563;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
      text-align: center;
    }
    .button:hover {
      opacity: 0.9;
    }
    .link-text {
      background-color: #f3f4f6;
      padding: 15px;
      border-radius: 8px;
      word-break: break-all;
      font-family: monospace;
      font-size: 14px;
      color: #374151;
      margin: 20px 0;
    }
    .footer {
      background-color: #f9fafb;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      color: #6b7280;
      font-size: 14px;
      margin: 5px 0;
    }
    .warning {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .warning p {
      color: #92400e;
      margin: 0;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✈️ Traveloop</h1>
      <p>Your Journey Starts Here</p>
    </div>
    
    <div class="content">
      <h2>Password Reset Request</h2>
      <p>Hello ${userName || 'Traveler'},</p>
      <p>We received a request to reset your password for your Traveloop account. Click the button below to reset your password:</p>
      
      <div style="text-align: center;">
        <a href="${resetUrl}" class="button">Reset My Password</a>
      </div>
      
      <div class="warning">
        <p><strong>⚠️ Important:</strong> This link will expire in 1 hour for security reasons.</p>
      </div>
      
      <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
      <div class="link-text">${resetUrl}</div>
      
      <p>If you didn't request a password reset, please ignore this email. Your account remains secure.</p>
      
      <p>Need help? Contact our support team at <a href="mailto:support@traveloop.com">support@traveloop.com</a></p>
    </div>
    
    <div class="footer">
      <p><strong>Traveloop</strong> - Plan Your Perfect Journey</p>
      <p>&copy; ${new Date().getFullYear()} Traveloop. All rights reserved.</p>
      <p>This is an automated email. Please do not reply to this message.</p>
    </div>
  </div>
</body>
</html>
  `
}

export const emailService = {
  // Send password reset email
  async sendPasswordResetEmail(email, resetToken, userName = '') {
    try {
      const transporter = createTransporter()
      const resetUrl = `${config.frontendUrl}/reset-password?token=${resetToken}`

      const mailOptions = {
        from: `"Traveloop" <${config.emailUser}>`,
        to: email,
        subject: 'Reset Your Traveloop Password',
        html: getPasswordResetTemplate(resetUrl, userName),
        text: `
Hello ${userName || 'Traveler'},

We received a request to reset your password for your Traveloop account.

Click the link below to reset your password:
${resetUrl}

This link will expire in 1 hour for security reasons.

If you didn't request a password reset, please ignore this email.

Need help? Contact us at support@traveloop.com

Traveloop - Plan Your Perfect Journey
        `
      }

      const info = await transporter.sendMail(mailOptions)
      console.log('Password reset email sent:', info.messageId)
      return { success: true, messageId: info.messageId }
    } catch (error) {
      console.error('Failed to send password reset email:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }
  },

  // Verify email configuration
  async verifyConnection() {
    try {
      const transporter = createTransporter()
      await transporter.verify()
      console.log('Email service connection verified')
      return true
    } catch (error) {
      console.error('Email service connection failed:', error)
      return false
    }
  }
}
