# Email Configuration Guide

This application uses **Nodemailer** to allow users to enquire about your products and services.

## Features

✅ **Product Enquiries** - Users can enquire about specific products directly from the product listing page  
✅ **General Contact** - Users can submit general enquiries, support requests, and sales questions  
✅ **Dual Email System** - Sends a notification to you and a confirmation to the user  
✅ **Beautiful HTML Templates** - Professional, branded email templates  
✅ **Product Highlighting** - Product enquiries are prominently displayed with special formatting  

## Setup Instructions

### 1. Copy the environment file

```bash
copy .env.example .env.local
```

### 2. Configure Your Email Settings

Open `.env.local` and update with your email provider's details.

#### For Gmail Users (Recommended):

1. **Enable 2-Step Verification**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Copy the generated 16-character password

3. **Update .env.local**:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
SMTP_FROM=your-email@gmail.com
COMPANY_EMAIL=your-email@gmail.com
COMPANY_NAME=Your Company Name
```

#### For Other Email Providers:

**Outlook/Hotmail**:
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

**Yahoo**:
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=465
SMTP_SECURE=true
```

**Custom SMTP**:
- Contact your email hosting provider for SMTP settings

### 3. Test The Setup

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the contact page: `http://localhost:3000/contact`

3. Fill out and submit the form

4. Check:
   - Your inbox for the enquiry notification
   - The test email address for the confirmation

## How It Works

### Product Enquiries

When users browse your products (`/products`), each product card has a **"Product Enquiry"** button that:
1. Redirects to `/contact?product=ProductName`
2. Pre-fills the contact form with product information
3. Sends an email with the product prominently highlighted

### Email Flow

1. **User submits form** → Contact page sends data to API route
2. **API validates** → Checks all required fields and email format
3. **Sends two emails**:
   - **To You (Owner)**: Contains customer details and enquiry with product highlighted
   - **To Customer**: Confirmation email with enquiry summary

### Email Templates

Both emails use beautiful, responsive HTML templates with:
- Gradient headers
- Professional styling
- Product highlighting (for product enquiries)
- Your company branding

## Customization

### Change Email Templates

Edit `src/app/api/send-email/route.ts`:

```typescript
const mailOptionsToCompany = {
  // ... customize the HTML template here
};

const mailOptionsToUser = {
  // ... customize the HTML template here
};
```

### Add More Form Fields

1. Update `src/app/contact/page.tsx` form state
2. Add new input fields to the form JSX
3. Update `src/app/api/send-email/route.ts` to handle new fields
4. Include new fields in email templates

## Troubleshooting

### Emails Not Sending

1. **Check environment variables**: Ensure `.env.local` exists and has correct values
2. **Gmail users**: Make sure you're using an App Password, not your regular password
3. **Check console**: Look for error messages in the terminal running `npm run dev`
4. **SMTP settings**: Verify host, port, and security settings match your provider

### "Invalid email format" Error

- The API validates email format using regex
- Ensure the email address is properly formatted

### Emails Going to Spam

- Set up SPF, DKIM, and DMARC records for your domain
- Use a professional email address (not free Gmail/Yahoo for production)
- Consider using a dedicated email service like SendGrid or Mailgun for production

## Production Deployment

### Environment Variables on Netlify/Vercel

1. Go to your project settings
2. Add all SMTP environment variables
3. Redeploy your application

### Recommended for Production

Consider using a dedicated email service:
- **SendGrid** - Free tier available
- **Mailgun** - Good deliverability
- **AWS SES** - Cost-effective
- **Resend** - Developer-friendly

These services provide better deliverability, analytics, and reliability than SMTP.

## Security Best Practices

⚠️ **Never commit `.env.local` to Git**  
⚠️ **Use App Passwords, not account passwords**  
⚠️ **Keep SMTP credentials secure**  
⚠️ **Implement rate limiting in production** (prevent spam)  

## Support

For issues or questions:
1. Check the error messages in the browser console and terminal
2. Verify your email provider's SMTP documentation
3. Test with a simple email first before product enquiries

---

**Powered by Nodemailer** 📧
