# 🎨 Secure Exam Paper Management System – Frontend  
Angular | TypeScript | Bootstrap | JWT Authentication

This is the frontend application for the **Secure Exam Paper Management System**.  
It provides a clean, role-based UI for **Admin** and **Examiner** to manage and access exam papers securely.

---

## 🚀 Features

### 🧑‍💼 1. Admin Registration with OTP Verification
- Admin enters email → system sends OTP.
- Admin verifies OTP to activate their account.
- Secure onboarding for university admins.

### 🔐 2. Login System (Admin + Examiner)
- JWT-based authentication.
- Token stored in localStorage.
- Guards protect routes from unauthorized access.

### 👨‍🏫 3. Admin Dashboard
Admin can:
- Create Examiner accounts  
- Upload exam papers  
- Assign papers to examiners  
- View list of uploaded papers  
- Manage examiner list  

### 📤 4. Upload Paper UI
Admin fills:
- Title  
- Exam Date & Time  
- Select Examiner  
- Choose PDF File  

Frontend sends multipart form-data to backend.

### 📑 5. Examiner Dashboard
Examiner can:
- View assigned papers  
- See exam schedule  
- Download paper (button enabled only within allowed time)  

### ⏳ 6. Time-Restricted Download Handling
- Frontend calls backend to attempt download.
- If early → shows error message from backend.
- If allowed → downloads the PDF.

### 🎨 UI
- Built with **Bootstrap** and custom CSS.
- Fully responsive and mobile-friendly.

---

## 📁 Folder Structure

```
src/
 ├── app/
 │    ├── auth/               # Login, Register, OTP
 │    ├── admin/              # Admin dashboard & features
 │    ├── examiner/           # Examiner dashboard
 │    ├── services/           # API services (Auth, Admin, Examiner)
 │    ├── guards/             # Auth & Role guards
 │    └── app-routing.module.ts
 │
 └── assets/
```

---

## 🔧 Environment Configuration

### `environment.ts`
```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

### `environment.prod.ts`
```
export const environment = {
  production: true,
  apiUrl: 'https://testsecure-backend.onrender.com/'
};
```

---

## 🔌 API Integration

### Services Included
- **AuthService**
  - login()
  - registerAdmin()
  - verifyOtp()
  - isLoggedIn()
  - logout()

- **AdminService**
  - createExaminer()
  - uploadPaper()
  - getAllPapers()

- **ExaminerService**
  - getAssignedPapers()
  - downloadPaper()

---

## 🔐 Route Protection
### Guards
- `AuthGuard` → ensures user is logged in
- `RoleGuard` → ensures only Admin or Examiner can access specific components

**Example:**
```
{
  path: 'admin',
  component: AdminDashboardComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { role: 'ADMIN' }
}
```

---

## ▶️ Running the Project

### 1️⃣ Install dependencies
```
npm install
```

### 2️⃣ Run development server
```
ng serve
```

### App runs at:
```
http://localhost:4200/
```

Make sure backend (Spring Boot) is running.

---

## 📦 Build for Production
```
ng build --configuration production
```

---

## 🧪 Testing (Manual + UI)
You can test:
- Admin registration + OTP flow  
- Admin → Create examiner  
- Admin → Upload + Assign paper  
- Examiner → Login and download paper  

---

## 🌐 Deployment
When deployed with backend:

**Live Frontend URL:** https://secureexamination.netlify.app/

---

## 💡 Notes
- Works best with JWT authentication enabled in backend.
- Ensure CORS is enabled in Spring Boot for Angular domain.

---

## 📄 License
This project is for educational and demonstration purposes.

