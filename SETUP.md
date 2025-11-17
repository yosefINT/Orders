# Setup Guide - Cafeteria Ordering System

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Vercel Postgres (Cloud Database)

**Option A: Set up during Vercel deployment (Recommended)**
- When you deploy to Vercel (Step 5), you can add Vercel Postgres directly from the Vercel dashboard
- Vercel will automatically configure all environment variables

**Option B: Set up locally first**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Go to your dashboard → Storage → Create Database
3. Select "Postgres" → Create
4. Choose a name and region
5. After creation, go to the database → Settings → Connection String
6. You'll see connection details (Vercel handles this automatically when deployed)

**Set up the database schema:**
- After deploying to Vercel, you can run the SQL schema:
  - Go to Vercel Dashboard → Your Project → Storage → Your Postgres Database
  - Click "Data" tab → "SQL Editor"
  - Copy the contents of `database/schema.sql`
  - Paste and run it
  - This creates all tables and sample menu items

## Step 3: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. For local development, you can use Vercel CLI to pull environment variables:
   ```bash
   npx vercel env pull .env.local
   ```

3. Or manually add to `.env.local`:

```env
# Vercel Postgres - These are auto-configured when using Vercel Postgres
# For local dev, you can use the connection string from Vercel dashboard
POSTGRES_URL=your_postgres_connection_string
POSTGRES_PRISMA_URL=your_prisma_url
POSTGRES_URL_NON_POOLING=your_non_pooling_url

# Email Configuration (for daily reports)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SUPPLIER_EMAIL=supplier@example.com

# Vercel Cron Secret (generate a random string)
CRON_SECRET=your_random_secret_string_here
```

**Note:** When deployed to Vercel, the Postgres environment variables are automatically set. You only need to configure email and CRON_SECRET.

### Email Setup (Gmail example):

1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Create an app password for "Mail"
4. Use that password (not your regular Gmail password) in `SMTP_PASSWORD`

## Step 4: Test Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

You should see:
- Menu with sample items
- Shopping cart
- Ability to add items and place orders

## Step 5: Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your_github_repo_url
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - **Add Vercel Postgres:**
     - In the project setup, click "Add" under "Storage"
     - Select "Postgres" → Create
     - Vercel will automatically add the database connection variables
   - **Add other environment variables:**
     - Go to Settings → Environment Variables
     - Add: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SUPPLIER_EMAIL`, `CRON_SECRET`
   - Click "Deploy"
   
3. **Set up database schema after deployment:**
   - Go to Vercel Dashboard → Your Project → Storage → Your Postgres Database
   - Click "Data" tab → "SQL Editor"
   - Copy and paste the contents of `supabase/schema.sql`
   - Click "Run" to create tables and sample data

4. **Set up Daily Email Cron:**
   - The cron job is already configured in `vercel.json`
   - Vercel will automatically call `/api/cron/daily-report` at 10:30 AM daily
   - Make sure `CRON_SECRET` is set in environment variables
   - Vercel will automatically add the `Authorization: Bearer {CRON_SECRET}` header

## Step 6: Verify Everything Works

1. **Test ordering:**
   - Add items to cart
   - Place an order (minimum 25 ILS)
   - Check Vercel Dashboard → Storage → Your Postgres → Data tab → `orders` table to see your order

2. **Test daily email (optional):**
   - You can manually trigger the cron endpoint:
   ```bash
   curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://your-app.vercel.app/api/cron/daily-report
   ```

## Important Notes

- ✅ **Database is online** - No need to keep your PC on
- ✅ **Shared database** - All users see the same menu and orders
- ✅ **Real-time updates** - Changes appear immediately
- ✅ **Free hosting** - Vercel free tier is sufficient
- ✅ **Free database** - Vercel Postgres free tier available

## Troubleshooting

**Menu not loading?**
- Check that Vercel Postgres is connected
- Verify you ran the SQL schema in Vercel Postgres SQL Editor
- Check Vercel function logs for errors

**Orders not saving?**
- Check browser console for errors
- Check Vercel function logs
- Verify database tables exist (check Vercel Postgres Data tab)

**Email not sending?**
- Verify SMTP credentials
- Check spam folder
- For Gmail, make sure you're using an App Password, not regular password

**Cron job not working?**
- Verify `CRON_SECRET` is set in Vercel environment variables
- Check Vercel logs for errors

