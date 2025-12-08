# Email Configuration Test Script
# This script helps you test your email setup

Write-Host "`n╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Email Configuration Test Helper     ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "❌ .env.local file not found!" -ForegroundColor Red
    Write-Host "   Please create it from .env.example first." -ForegroundColor Yellow
    exit 1
}

# Check for placeholder values
$content = Get-Content .env.local -Raw
$hasPlaceholders = $false

Write-Host "Checking configuration..." -ForegroundColor Cyan

if ($content -match 'your-email@gmail.com' -or $content -match 'your-') {
    Write-Host "⚠️  Warning: Found placeholder values in .env.local" -ForegroundColor Yellow
    Write-Host "   You need to replace these with your actual SMTP credentials.`n" -ForegroundColor Yellow
    $hasPlaceholders = $true
}

if ($content -match 'SMTP_USER=([^\r\n]+)') {
    $user = $matches[1]
    if ($user -notmatch 'your-') {
        Write-Host "✅ SMTP_USER: Configured" -ForegroundColor Green
    } else {
        Write-Host "⚠️  SMTP_USER: Not configured (still has placeholder)" -ForegroundColor Yellow
    }
}

if ($content -match 'SMTP_PASSWORD=([^\r\n]+)') {
    $pass = $matches[1]
    if ($pass -notmatch 'your-' -and $pass -notmatch 'password-here' -and $pass.Length -gt 5) {
        Write-Host "✅ SMTP_PASSWORD: Configured" -ForegroundColor Green
    } else {
        Write-Host "⚠️  SMTP_PASSWORD: Not configured (still has placeholder)" -ForegroundColor Yellow
    }
}

if ($hasPlaceholders) {
    Write-Host "`n📝 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Open .env.local" -ForegroundColor White
    Write-Host "   2. Replace placeholder values with your actual SMTP credentials" -ForegroundColor White
    Write-Host "   3. For Gmail: Use an App Password from https://myaccount.google.com/apppasswords" -ForegroundColor White
    Write-Host "   4. Save the file" -ForegroundColor White
    Write-Host "   5. Run this script again to start testing`n" -ForegroundColor White
    exit 0
}

Write-Host "`n✅ Configuration looks good! Starting dev server...`n" -ForegroundColor Green

# Start the dev server
Write-Host "Starting Next.js dev server..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server when done testing.`n" -ForegroundColor Yellow

Start-Sleep -Seconds 2

# Start dev server and wait a bit for it to start
npm run dev
