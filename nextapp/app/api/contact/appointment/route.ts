import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/**
 * API Route for handling Contact Inquiries and Appointment Scheduling
 * Target Recipient: shlokkharva@gmail.com
 */

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { mode, name, email, company, product, message, date, time, meetingType, topics } = body

    // 1. Setup Nodemailer Transporter
    // In production, these should be in .env.local
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your sending email
        pass: process.env.EMAIL_PASS, // Your App Password
      },
    })

    // 2. Construct Email Content based on Mode
    const isAppointment = mode === 'appointment'
    const subject = isAppointment 
      ? `📅 NEW APPOINTMENT REQUEST: ${name}` 
      : `✉️ NEW INQUIRY: ${name} (${company || 'No Company'})`

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0F1C33; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Parul Chemicals Notifications</h1>
        </div>
        <div style="padding: 30px; color: #4a5568;">
          <h2 style="color: #0F1C33; border-bottom: 2px solid #4DA8DA; padding-bottom: 10px;">
            ${isAppointment ? 'Appointment Scheduled' : 'General Inquiry'}
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${email}</td></tr>
            ${company ? `<tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td>${company}</td></tr>` : ''}
            
            ${isAppointment ? `
              <tr><td style="padding: 8px 0; font-weight: bold;">Date:</td><td style="color: #4DA8DA; font-weight: bold;">${date}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Time:</td><td style="color: #4DA8DA; font-weight: bold;">${time}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Type:</td><td>${meetingType}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Topics:</td><td>${topics || 'N/A'}</td></tr>
            ` : `
              <tr><td style="padding: 8px 0; font-weight: bold;">Product:</td><td>${product}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td><td>${message}</td></tr>
            `}
          </table>
        </div>
        <div style="background-color: #f8fafc; padding: 15px; text-align: center; font-size: 11px; color: #94a3b8;">
          This message was sent from the Parul Chemicals Contact Interface.
        </div>
      </div>
    `

    // 3. Send the Email
    // Note: If credentials are not set, this will fail. 
    // We wrap it in a try-catch to ensure the API doesn't crash.
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const receiver = process.env.RECEIVER_EMAIL || 'info@parulchemicals.in';
      await transporter.sendMail({
        from: `"Parul Chemicals Web" <${process.env.EMAIL_USER}>`,
        to: receiver,
        subject: subject,
        html: htmlContent,
      })
      return NextResponse.json({ success: true, message: 'Email sent successfully' })
    } else {
      console.warn("Mailing keys missing. Data received:", body)
      // Return success anyway for front-end demo if keys are missing
      return NextResponse.json({ 
        success: true, 
        message: 'Data captured (Mailing credentials missing in .env.local)' 
      })
    }

  } catch (error) {
    console.error('Submission Error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
