# התקנת Git והעלאת הפרויקט ל-GitHub

## שלב 1: התקנת Git

1. **הורד Git:**
   - לך ל: https://git-scm.com/download/win
   - הורד את הגרסה האחרונה ל-Windows
   - הרץ את הקובץ שהורדת

2. **במהלך ההתקנה:**
   - לחץ "Next" על כל המסכים
   - **חשוב:** ודא ש-"Git from the command line and also from 3rd-party software" נבחר
   - המשך עם ברירת המחדל בכל השאר

3. **סיים את ההתקנה:**
   - לחץ "Install"
   - אחרי ההתקנה, לחץ "Finish"

4. **אתחל את PowerShell/Terminal:**
   - סגור את כל חלונות PowerShell/Terminal
   - פתח PowerShell חדש

5. **בדוק שההתקנה הצליחה:**
   ```powershell
   git --version
   ```
   - אתה אמור לראות משהו כמו: `git version 2.xx.x`

## שלב 2: הגדרת Git (פעם אחת בלבד)

הרץ את הפקודות הבאות (החלף את הפרטים שלך):

```powershell
git config --global user.name "השם שלך"
git config --global user.email "your-email@example.com"
```

**דוגמה:**
```powershell
git config --global user.name "Yosef Tal"
git config --global user.email "yosef.tal@example.com"
```

## שלב 3: אתחול Git בפרויקט

פתח PowerShell בתיקיית הפרויקט והרץ:

```powershell
cd C:\Projects\Orders
git init
git add .
git commit -m "Initial commit - Cafeteria ordering system"
```

## שלב 4: יצירת Repository ב-GitHub

1. **לך ל-GitHub:**
   - פתח [github.com](https://github.com) והתחבר
   - לחץ על הכפתור הירוק "New" או על ה-`+` בפינה הימנית העליונה
   - בחר "New repository"

2. **הגדר את ה-Repository:**
   - **Repository name:** `cafeteria-orders` (או כל שם שתרצה)
   - **Description:** "Cafeteria ordering system"
   - **Public** או **Private** (בחר לפי הצורך)
   - **אל תסמן** שום דבר אחר (לא README, לא .gitignore, לא license)
   - לחץ על "Create repository"

## שלב 5: חיבור הפרויקט ל-GitHub

GitHub יציג לך הוראות. הרץ את הפקודות הבאות ב-PowerShell:

**החלף `YOUR_USERNAME` ו-`YOUR_REPO_NAME` בשם ה-repository שיצרת:**

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

**אם תתבקש להזין שם משתמש וסיסמה:**
- **Username:** שם המשתמש שלך ב-GitHub
- **Password:** **לא הסיסמה שלך!** אלא Personal Access Token (ראה למטה)

## יצירת Personal Access Token (אם צריך)

1. **GitHub → Settings:**
   - לחץ על התמונה שלך בפינה הימנית העליונה
   - בחר "Settings"

2. **Developer settings:**
   - גלול למטה → "Developer settings"
   - לחץ על "Personal access tokens" → "Tokens (classic)"

3. **Generate new token:**
   - לחץ על "Generate new token" → "Generate new token (classic)"
   - **Note:** `Vercel Deployment` (או כל שם שתרצה)
   - **Expiration:** בחר כמה זמן (90 days או No expiration)
   - **Select scopes:** סמן `repo` (זה יבחר את כל ה-sub-options)
   - לחץ על "Generate token" בתחתית

4. **העתק את ה-Token:**
   - **חשוב:** זה היחיד שתראה אותו! העתק אותו מיד
   - השתמש בו כסיסמה כשמתבקש

## שלב 6: אימות

1. רענן את הדף ב-GitHub
2. אתה אמור לראות את כל הקבצים של הפרויקט

## שלב 7: חיבור ל-Vercel

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

### "git is not recognized"
- ודא שהתקנת Git
- אתחל את PowerShell מחדש
- נסה לפתוח PowerShell חדש

### "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### "authentication failed"
- ודא שהשתמשת ב-Personal Access Token, לא בסיסמה
- ודא שה-token עדיין תקף
- נסה ליצור token חדש

