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
              body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #4f8fff 0%, #3366cc 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #4f8fff; margin-bottom: 5px; }
              .value { background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #4f8fff; }
              .product-highlight { background: linear-gradient(135deg, #4f8fff 0%, #3366cc 100%); color: white; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>${product ? '🎯 Product Enquiry!' : 'New Enquiry Received'}</h1>
              </div>
              <div class="content">
                ${product ? `
                  <div class="product-highlight">
                    <h2 style="margin: 0; font-size: 24px;">📦 ${product}</h2>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Customer is interested in this product</p>
                  </div>
                ` : ''}
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
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
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
      from: `"${process.env.COMPANY_NAME || 'Company'}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting us!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #4f8fff 0%, #3366cc 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .highlight { background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #4f8fff; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You for Reaching Out!</h1>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>We have received your ${product ? 'product enquiry' : 'enquiry'} and appreciate you taking the time to contact us.</p>
                <div class="highlight">
                  <strong>Your Enquiry Summary:</strong><br><br>
                  ${product ? `<strong>Product:</strong> ${product}<br>` : ''}
                  <strong>Category:</strong> ${category}<br>
                  <strong>Message:</strong><br>
                  ${message.replace(/\n/g, '<br>')}
                </div>
                <p>Our team will review your message and get back to you as soon as possible.</p>
                <p>If you have any urgent concerns, please don't hesitate to contact us directly.</p>
                <p>Best regards,<br><strong>${process.env.COMPANY_NAME || 'Our Team'}</strong></p>
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
