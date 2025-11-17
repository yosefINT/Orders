# מדריך העלאת הפרויקט ל-GitHub

## שלב 1: יצירת Repository ב-GitHub

1. **לך ל-GitHub:**
   - פתח [github.com](https://github.com) והתחבר
   - לחץ על הכפתור הירוק "New" או על ה-`+` בפינה הימנית העליונה
   - בחר "New repository"

2. **הגדר את ה-Repository:**
   - **Repository name:** `cafeteria-orders` (או כל שם שתרצה)
   - **Description:** "Cafeteria ordering system for Intel"
   - **Public** או **Private** (בחר לפי הצורך)
   - **אל תסמן** "Add a README file" (כבר יש לנו)
   - **אל תסמן** "Add .gitignore" (כבר יש לנו)
   - **אל תסמן** "Choose a license"
   - לחץ על "Create repository"

3. **GitHub יציג לך הוראות** - **אל תעשה כלום עדיין!**

## שלב 2: חיבור הפרויקט המקומי ל-GitHub

**הערה:** אם עדיין לא הגדרת את Git עם השם והאימייל שלך, הרץ קודם:
```powershell
git config --global user.name "השם שלך"
git config --global user.email "your-email@example.com"
```

**אז הרץ את הפקודות הבאות** (החלף את `YOUR_USERNAME` ו-`YOUR_REPO_NAME`):

```powershell
cd C:\Projects\Orders
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**דוגמה:**
אם ה-username שלך הוא `yosef-tal` וה-repo נקרא `cafeteria-orders`:
```powershell
git remote add origin https://github.com/yosef-tal/cafeteria-orders.git
git branch -M main
git push -u origin main
```

## שלב 3: אימות

1. רענן את הדף ב-GitHub
2. אתה אמור לראות את כל הקבצים של הפרויקט

## שלב 4: חיבור ל-Vercel

עכשיו שתוכל:
1. לך ל [vercel.com](https://vercel.com)
2. לחץ על "Add New" → "Project"
3. לחץ על "Import Git Repository"
4. בחר את ה-repository שיצרת
5. Vercel יזהה אוטומטית שזה Next.js project
6. לחץ על "Deploy"

## עדכונים עתידיים

כל פעם שתרצה לעדכן את הקוד ב-GitHub:

```powershell
cd C:\Projects\Orders
git add .
git commit -m "תיאור השינויים"
git push
```

Vercel יבנה ויפרס אוטומטית את השינויים!

## פתרון בעיות

### שגיאה: "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### שגיאה: "authentication failed"
- ודא שהשם והאימייל ב-Git מוגדרים נכון
- אם צריך, השתמש ב-Personal Access Token במקום סיסמה

### יצירת Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. בחר את ה-permissions הנדרשות (לפחות `repo`)
4. העתק את ה-token והשתמש בו במקום סיסמה

