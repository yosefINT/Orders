# מדריך פריסה - מערכת הזמנות קפיטריה

## שלב 1: הגדרת Vercel Postgres

1. **התחבר ל-Vercel Dashboard:**
   - לך ל [vercel.com](https://vercel.com)
   - התחבר לחשבון שלך

2. **צור פרויקט חדש:**
   - לחץ על "Add New" → "Project"
   - חבר את ה-repository שלך מ-GitHub

3. **הוסף Vercel Postgres:**
   - בפרויקט, לך ל-"Storage" → "Create Database"
   - בחר "Postgres"
   - בחר שם למסד הנתונים (למשל: `cafeteria-db`)
   - בחר אזור קרוב (למשל: `Frankfurt` או `Washington D.C.`)

4. **הרץ את ה-Schema:**
   - לך ל-"Storage" → בחר את המסד הנתונים
   - לחץ על "SQL Editor"
   - העתק את כל התוכן מ-`database/schema.sql`
   - הדבק והרץ את השאילתה
   - ודא שהטבלאות נוצרו בהצלחה

## שלב 2: הגדרת משתני סביבה

1. **ב-Vercel Dashboard:**
   - לך ל-"Settings" → "Environment Variables"
   - הוסף את המשתנים הבאים:

### משתנים אוטומטיים (מתווספים אוטומטית):
- `POSTGRES_URL` - מתווסף אוטומטית
- `POSTGRES_PRISMA_URL` - מתווסף אוטומטית
- `POSTGRES_URL_NON_POOLING` - מתווסף אוטומטית

### משתנים ידניים (צריך להוסיף):

```
CRON_SECRET=your-random-secret-key-here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SUPPLIER_EMAIL=supplier@example.com
```

**הסבר:**
- `CRON_SECRET`: מפתח אבטחה אקראי (השתמש ב-generator או `openssl rand -hex 32`)
- `SMTP_HOST`: שרת האימייל (Gmail: `smtp.gmail.com`, Outlook: `smtp-mail.outlook.com`)
- `SMTP_PORT`: פורט (Gmail: `587`, Outlook: `587`)
- `SMTP_USER`: כתובת האימייל שלך
- `SMTP_PASS`: סיסמת אפליקציה (לא הסיסמה הרגילה!)
- `SUPPLIER_EMAIL`: כתובת האימייל של הספק (לשליחת הדוחות)

### יצירת App Password ב-Gmail:
1. לך ל-[Google Account](https://myaccount.google.com/)
2. Security → 2-Step Verification (חייב להיות מופעל)
3. App passwords → Generate
4. בחר "Mail" ו-"Other (Custom name)"
5. העתק את הסיסמה שנוצרה

## שלב 3: הגדרת Vercel Cron

1. **צור קובץ `vercel.json` בפרויקט:**
   ```json
   {
     "crons": [
       {
         "path": "/api/cron/daily-report",
         "schedule": "30 10 * * *"
       }
     ]
   }
   ```

2. **הסבר:**
   - `"30 10 * * *"` = כל יום ב-10:30 בבוקר (UTC)
   - אם אתה בישראל (UTC+2), זה יהיה 12:30 בצהריים
   - לשנות ל-10:30 ישראל: `"30 8 * * *"` (8:30 UTC = 10:30 IST)

## שלב 4: עדכון Schema עם כל הפריטים

**חשוב:** לפני הפריסה, עדכן את `database/schema.sql` עם כל הפריטים החדשים:
- 4 כריכים (חביתה, אבוקדו, טונה, צהובה)
- כל משקאות השתייה הקרה
- 4 מאפים (קוראסון שוקולד, חמאה, שקדים, בורקס גבינה)
- מסטיקים בקטגוריית חטיפים
- פיצה עם תוספות

## שלב 5: פריסה

1. **Push ל-GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Vercel יבנה ויפרס אוטומטית**

3. **בדוק שהכל עובד:**
   - פתח את האתר
   - נסה להוסיף פריט לעגלה
   - נסה ליצור הזמנה
   - בדוק שההזמנות נשמרות במסד הנתונים

## שלב 6: בדיקת Cron Job

1. **בדיקה ידנית:**
   - לך ל: `https://your-domain.vercel.app/api/cron/daily-report`
   - הוסף header: `Authorization: Bearer YOUR_CRON_SECRET`
   - בדוק שהדוח נשלח

2. **בדיקת לוגים:**
   - ב-Vercel Dashboard → "Deployments" → בחר deployment
   - לך ל-"Functions" → בדוק את הלוגים

## בעיות נפוצות

### הפריטים לא מופיעים:
- ודא שהרצת את ה-schema במסד הנתונים
- בדוק שהפריטים קיימים בטבלת `menu_items`

### האימיילים לא נשלחים:
- ודא שה-App Password נכון
- בדוק שה-2-Step Verification מופעל
- ודא שה-SMTP settings נכונים

### Cron לא עובד:
- ודא שה-`vercel.json` קיים
- בדוק שה-`CRON_SECRET` מוגדר
- ודא שה-schedule נכון

## תמיכה

אם יש בעיות, בדוק:
1. Vercel Dashboard → Logs
2. Browser Console
3. Network tab בדפדפן

