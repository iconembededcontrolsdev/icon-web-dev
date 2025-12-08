# Quick Email Setup Guide

## ✅ Your Code Already Reads from Environment Variables!

Your email sending code in `src/app/api/send-email/route.ts` is **already configured** to read SMTP credentials from environment variables. Here's what it reads:

```typescript
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,      // ✅ Reads from env
    pass: process.env.SMTP_PASSWORD,  // ✅ Reads from env
  },
});
```

## 🚀 How to Configure (Choose One)

### Option 1: Use .env.local (Recommended for Local Development)

1. **Create `.env.local` file** in the project root:
   ```bash
   copy .env.example .env.local
   ```

2. **Edit `.env.local`** with your SMTP credentials:
   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   SMTP_FROM=your-email@gmail.com
   COMPANY_EMAIL=your-email@gmail.com
   COMPANY_NAME=Your Company Name
   ```

3. **Restart your dev server** to load the new variables

### Option 2: Use Existing .env File

You already have a `.env` file. Edit it with your actual credentials:

1. Open `e:\Tester\embedded-icon\.env`
2. Replace placeholder values with your actual SMTP credentials
3. Restart your dev server

## 🔐 How to Get Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select **"Mail"** and **"Other (Custom name)"**
5. Copy the 16-character password (no spaces)
6. Use this as `SMTP_PASSWORD` in your `.env` or `.env.local`

## 📝 Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | SMTP server address | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_SECURE` | Use SSL (true for 465, false for 587) | `false` |
| `SMTP_USER` | Your email address | `you@gmail.com` |
| `SMTP_PASSWORD` | App password (Gmail) or regular password | `abcd efgh ijkl mnop` |
| `SMTP_FROM` | From email address | `you@gmail.com` |
| `COMPANY_EMAIL` | Where to receive enquiries | `you@gmail.com` |
| `COMPANY_NAME` | Your company name | `My Company` |

## ✨ Recent Improvements

I've added **environment variable validation** to your code:

- ✅ Checks if `SMTP_USER` and `SMTP_PASSWORD` are set
- ✅ Returns clear error message if credentials are missing
- ✅ Logs helpful error to console for debugging

## 🧪 Test Your Setup

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Navigate to contact page**:
   ```
   http://localhost:3000/contact
   ```

3. **Submit a test enquiry**

4. **Check**:
   - Terminal for any errors
   - Your email inbox for the enquiry
   - Test email for confirmation

## 🔍 Troubleshooting

### "Email service not configured" Error

**Problem**: `SMTP_USER` or `SMTP_PASSWORD` not set

**Solution**:
1. Verify `.env.local` or `.env` file exists
2. Check variable names are exactly `SMTP_USER` and `SMTP_PASSWORD`
3. Restart dev server after changes

### Authentication Failed

**Problem**: Wrong credentials or not using App Password

**Solution**:
1. For Gmail, use App Password (not regular password)
2. Verify email and password are correct
3. Check for extra spaces in credentials

### Emails Not Sending

**Checklist**:
- [ ] Environment variables are set correctly
- [ ] Dev server was restarted after changing `.env`
- [ ] Using App Password for Gmail (not regular password)
- [ ] SMTP settings match your email provider
- [ ] Check terminal/console for error messages

## 🌐 Production Deployment

### For Vercel/Netlify:

1. Go to project settings
2. Add environment variables:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASSWORD`
   - `SMTP_FROM`
   - `COMPANY_EMAIL`
   - `COMPANY_NAME`
3. Redeploy your application

**Note**: Environment variables in production are **separate** from your local `.env` files!

## 📚 Files Involved

- **`src/app/api/send-email/route.ts`** - Email sending API (reads env vars)
- **`.env.example`** - Template file (safe to commit)
- **`.env`** - Current env file (git-ignored)
- **`.env.local`** - Local override (git-ignored, highest priority)

## 🔒 Security Notes

⚠️ **Never commit `.env` or `.env.local` to Git!**
- These files are already in `.gitignore`
- They contain sensitive credentials
- Use `.env.example` as a template only

---

**Need Help?** Check `EMAIL_SETUP.md` for detailed documentation.
