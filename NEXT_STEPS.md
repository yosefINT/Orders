# השלבים הבאים - העלאת הפרויקט ל-GitHub

## שלב 1: צור Repository ב-GitHub

1. **לך ל-GitHub:**
   - פתח https://github.com והתחבר
   - לחץ על הכפתור הירוק **"New"** (או ה-`+` בפינה הימנית העליונה)
   - בחר **"New repository"**

2. **הגדר את ה-Repository:**
   - **Repository name:** `cafeteria-orders` (או כל שם שתרצה)
   - **Description:** "Cafeteria ordering system for Intel"
   - **Public** או **Private** (בחר לפי הצורך)
   - **⚠️ חשוב:** אל תסמן שום דבר אחר:
     - ❌ לא "Add a README file"
     - ❌ לא "Add .gitignore" 
     - ❌ לא "Choose a license"
   - לחץ על **"Create repository"**

3. **GitHub יציג לך הוראות** - **אל תעשה כלום עדיין!**

## שלב 2: העלה את הקוד ל-GitHub

**החלף `YOUR_USERNAME` בשם המשתמש שלך ב-GitHub:**

פתח PowerShell והרץ:

```powershell
cd C:\Projects\Orders
git remote add origin https://github.com/YOUR_USERNAME/cafeteria-orders.git
git branch -M main
git push -u origin main
```

**דוגמה:**
אם ה-username שלך הוא `yosef-tal`:
```powershell
cd C:\Projects\Orders
git remote add origin https://github.com/yosef-tal/cafeteria-orders.git
git branch -M main
git push -u origin main
```

## שלב 3: אימות ב-GitHub

אם תתבקש להזין שם משתמש וסיסמה:
- **Username:** שם המשתמש שלך ב-GitHub
- **Password:** **לא הסיסמה הרגילה!** אלא Personal Access Token

### יצירת Personal Access Token:

1. **GitHub → Settings:**
   - לחץ על התמונה שלך בפינה הימנית העליונה
   - בחר **"Settings"**

2. **Developer settings:**
   - גלול למטה → **"Developer settings"**
   - לחץ על **"Personal access tokens"** → **"Tokens (classic)"**

3. **Generate new token:**
   - לחץ על **"Generate new token"** → **"Generate new token (classic)"**
   - **Note:** `Vercel Deployment` (או כל שם שתרצה)
   - **Expiration:** בחר כמה זמן (90 days או No expiration)
   - **Select scopes:** סמן **`repo`** (זה יבחר את כל ה-sub-options)
   - לחץ על **"Generate token"** בתחתית

4. **העתק את ה-Token:**
   - **⚠️ חשוב:** זה היחיד שתראה אותו! העתק אותו מיד
   - השתמש בו כסיסמה כשמתבקש ב-`git push`

## שלב 4: אימות

1. רענן את הדף ב-GitHub
2. אתה אמור לראות את כל הקבצים של הפרויקט Orders

## שלב 5: חיבור ל-Vercel

עכשיו שתוכל:

1. **לך ל-Vercel:**
   - פתח https://vercel.com
   - התחבר (אפשר עם GitHub)

2. **צור פרויקט חדש:**
   - לחץ על **"Add New"** → **"Project"**
   - לחץ על **"Import Git Repository"**
   - בחר את ה-repository `cafeteria-orders` שיצרת
   - Vercel יזהה אוטומטית שזה Next.js project

3. **הגדר את הפרויקט:**
   - **Project Name:** `cafeteria-orders` (או כל שם)
   - **Framework Preset:** Next.js (אמור להיות אוטומטי)
   - לחץ על **"Deploy"**

4. **Vercel יבנה ויפרס:**
   - זה יקח כמה דקות
   - בסוף תקבל קישור לאתר (למשל: `cafeteria-orders.vercel.app`)

## עדכונים עתידיים

כל פעם שתרצה לעדכן את הקוד:

```powershell
cd C:\Projects\Orders
git add .
git commit -m "תיאור השינויים"
git push
```

Vercel יבנה ויפרס אוטומטית את השינויים! 🚀

## פתרון בעיות

### "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/cafeteria-orders.git
```

### "authentication failed"
- ודא שהשתמשת ב-Personal Access Token, לא בסיסמה
- ודא שה-token עדיין תקף
- נסה ליצור token חדש

### "refusing to merge unrelated histories"
```powershell
git pull origin main --allow-unrelated-histories
```

