# התקנת Git - מדריך מהיר

## שלב 1: הורד והתקן Git

1. **לך ל:**
   https://git-scm.com/download/win

2. **הורד את הגרסה האחרונה:**
   - לחץ על "64-bit Git for Windows Setup"
   - הקובץ יתחיל להוריד (בערך 50MB)

3. **הרץ את הקובץ שהורדת:**
   - לחץ Next על כל המסכים
   - **חשוב:** ודא ש-"Git from the command line and also from 3rd-party software" נבחר
   - המשך עם ברירת המחדל בכל השאר
   - לחץ "Install"

4. **אחרי ההתקנה:**
   - לחץ "Finish"
   - **סגור את כל חלונות PowerShell**
   - **פתח PowerShell חדש**

## שלב 2: בדוק שההתקנה הצליחה

פתח PowerShell חדש והרץ:
```powershell
git --version
```

אם אתה רואה משהו כמו `git version 2.xx.x` - הכל טוב! ✅

אם אתה עדיין רואה שגיאה - אתחל את המחשב ונסה שוב.

## שלב 3: הגדר את Git (פעם אחת)

הרץ את הפקודות הבאות (החלף את הפרטים שלך):

```powershell
git config --global user.name "Yosef Tal"
git config --global user.email "your-email@example.com"
```

**דוגמה:**
```powershell
git config --global user.name "Yosef Tal"
git config --global user.email "yosef.tal@intel.com"
```

## שלב 4: אתחל את הפרויקט

```powershell
cd C:\Projects\Orders
git init
git add .
git commit -m "Initial commit - Cafeteria ordering system"
```

## שלב 5: צור Repository ב-GitHub

1. לך ל: https://github.com
2. לחץ על הכפתור הירוק "New" (או ה-`+` בפינה הימנית)
3. תן שם: `cafeteria-orders`
4. **אל תסמן שום דבר** (לא README, לא .gitignore)
5. לחץ "Create repository"

## שלב 6: העלה את הקוד

**החלף `YOUR_USERNAME` בשם המשתמש שלך ב-GitHub:**

```powershell
cd C:\Projects\Orders
git remote add origin https://github.com/YOUR_USERNAME/cafeteria-orders.git
git branch -M main
git push -u origin main
```

**דוגמה:**
אם ה-username שלך הוא `yosef-tal`:
```powershell
git remote add origin https://github.com/yosef-tal/cafeteria-orders.git
git branch -M main
git push -u origin main
```

**אם תתבקש להזין שם משתמש וסיסמה:**
- **Username:** שם המשתמש שלך ב-GitHub
- **Password:** Personal Access Token (לא הסיסמה הרגילה!)

### יצירת Personal Access Token:

1. GitHub → לחץ על התמונה שלך → Settings
2. גלול למטה → Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token → Generate new token (classic)
4. **Note:** `Vercel Deployment`
5. **Expiration:** בחר כמה זמן
6. **Select scopes:** סמן `repo` (זה יבחר הכל)
7. Generate token → **העתק את ה-Token מיד!**
8. השתמש בו כסיסמה כשמתבקש

## סיימת! 🎉

עכשיו תוכל:
1. לך ל-Vercel.com
2. Import את ה-repository
3. Deploy!

