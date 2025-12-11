import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, category, product, message } = await request.json();

    // Validate required fields
    if (!name || !email || !category || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('SMTP credentials not configured. Please set SMTP_USER and SMTP_PASSWORD in your environment variables.');
      return NextResponse.json(
        { 
          error: 'Email service not configured. Please contact the administrator.',
          details: 'SMTP credentials are missing'
        },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email to company (you)
    const mailOptionsToCompany = {
      from: `"${name}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.COMPANY_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: product
        ? `Product Enquiry: ${product} - From ${name}`
        : `New Enquiry: ${category} - From ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; padding: 0; }
              .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white; padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
              .content { background: linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%); padding: 35px 30px; border-radius: 0 0 12px 12px; }
              .field { margin-bottom: 22px; }
              .label { font-weight: 600; color: #1e293b; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
              .value { background: white; padding: 12px 14px; border-radius: 8px; border-left: 4px solid #2563eb; border: 1px solid #e2e8f0; border-left: 4px solid #2563eb; }
              .value a { color: #2563eb; text-decoration: none; }
              .value a:hover { text-decoration: underline; }
              .product-highlight { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 22px; text-align: center; }
              .product-highlight h2 { margin: 0; font-size: 22px; font-weight: 600; }
              .product-highlight p { margin: 5px 0 0 0; opacity: 0.95; font-size: 14px; }
              .footer { text-align: center; margin-top: 25px; color: #64748b; font-size: 12px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>${product ? "🎯 Product Enquiry!" : "New Enquiry Received"}</h1>
              </div>
              <div class="content">
                ${
                  product
                    ? `
                  <div class="product-highlight">
                    <h2 style="margin: 0; font-size: 24px;">📦 ${product}</h2>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Customer is interested in this product</p>
                  </div>
                `
                    : ""
                }
                <div class="field">
                  <div class="label">From:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}" style="color: #4f8fff; text-decoration: none;">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Category:</div>
                  <div class="value">${category}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${message.replace(/\n/g, "<br>")}</div>
                </div>
                <div class="footer">
                  <p>This is an automated message from your website contact form.</p>
                  <p>Reply directly to this email to respond to ${name}.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Confirmation email to user
    const mailOptionsToUser = {
      from: `"${process.env.COMPANY_NAME || "Company"}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for contacting us!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; padding: 0; }
              .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white; padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
              .content { background: linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%); padding: 35px 30px; border-radius: 0 0 12px 12px; }
              .highlight { background: white; padding: 18px; border-radius: 8px; border-left: 4px solid #2563eb; border: 1px solid #e2e8f0; border-left: 4px solid #2563eb; margin: 22px 0; line-height: 1.8; }
              .highlight strong { color: #1e293b; }
              .footer { text-align: center; margin-top: 25px; color: #64748b; font-size: 12px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
              .cta-button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 15px; }
              p { margin: 14px 0; color: #475569; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You for Reaching Out!</h1>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>We have received your ${product ? "product enquiry" : "enquiry"} and appreciate you taking the time to contact us.</p>
                <div class="highlight">
                  <strong>Your Enquiry Summary:</strong><br><br>
                  ${product ? `<strong>Product:</strong> ${product}<br>` : ""}
                  <strong>Category:</strong> ${category}<br>
                  <strong>Message:</strong><br>
                  ${message.replace(/\n/g, "<br>")}
                </div>
                <p>Our team will review your message and get back to you as soon as possible.</p>
                <p>If you have any urgent concerns, please don't hesitate to contact us directly.</p>
                <p>Best regards,<br><strong>${process.env.COMPANY_NAME || "Our Team"}</strong></p>
                <div class="footer">
                  <p>This is an automated confirmation email. Please do not reply to this email.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToCompany);
    await transporter.sendMail(mailOptionsToUser);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully! We\'ll get back to you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
