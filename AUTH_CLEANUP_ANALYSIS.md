# 🔐 Auth Cleanup Analysis - EduSmart

**Date:** May 1, 2026  
**Status:** ⚠️ Breeze Files Not Used

---

## 📊 Current Situation

### ✅ Custom Auth Page (USED)
- **File:** `resources/js/Pages/Auth/LoginRegistrasi.jsx`
- **Status:** ✅ **ACTIVELY USED**
- **Features:**
  - Combined Login & Register in one page
  - Role selection (Guru/Siswa)
  - Modern UI with Tabs
  - Password visibility toggle
  - Form validation

### ❌ Breeze Default Pages (NOT USED)
- **File:** `resources/js/Pages/Auth/Login.jsx` - ❌ Not used
- **File:** `resources/js/Pages/Auth/Register.jsx` - ❌ Not used
- **Reason:** Controllers return `LoginRegistrasi` instead

---

## 🔍 Controller Analysis

### AuthenticatedSessionController
```php
public function create(): Response
{
    return Inertia::render('Auth/LoginRegistrasi'); // ✅ Custom page
}
```

### RegisteredUserController
```php
public function create(): Response
{
    return Inertia::render('Auth/LoginRegistrasi'); // ✅ Custom page
}
```

**Conclusion:** Both controllers use `LoginRegistrasi`, so `Login.jsx` and `Register.jsx` are **NOT USED**.

---

## 🗑️ Files to Delete

### Safe to Delete (Not Used)
1. ❌ `resources/js/Pages/Auth/Login.jsx` - Replaced by LoginRegistrasi
2. ❌ `resources/js/Pages/Auth/Register.jsx` - Replaced by LoginRegistrasi

### Keep (May Be Used)
3. ✅ `resources/js/Pages/Auth/LoginRegistrasi.jsx` - **MAIN AUTH PAGE**
4. ⚠️ `resources/js/Pages/Auth/ForgotPassword.jsx` - For password reset
5. ⚠️ `resources/js/Pages/Auth/ResetPassword.jsx` - For password reset
6. ⚠️ `resources/js/Pages/Auth/ConfirmPassword.jsx` - For sensitive actions
7. ⚠️ `resources/js/Pages/Auth/VerifyEmail.jsx` - For email verification

---

## 🐛 Bugs Found in LoginRegistrasi

### Bug 1: Role Selection Only Shows in Login Mode
```jsx
{mode === 'login' && (
    <div className="mb-6">
        <Label className="mb-3 block text-sm font-medium">
            Masuk Sebagai
        </Label>
        // Role selection here
    </div>
)}
```

**Problem:** 
- Saat register (signup), role selection tidak muncul
- Default role adalah 'siswa'
- Guru tidak bisa register sebagai guru

**Solution:** Show role selection in both modes

---

### Bug 2: Role Not Sent in Login Request
```jsx
const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    role: 'siswa', // ✅ Has role
    password: '',
    password_confirmation: '',
    remember: true,
});
```

**Problem:**
- Role is in form data
- But `LoginRequest` doesn't validate or use role
- Login should work without role (authenticate by email/password only)

**Solution:** Remove role from login, only use in register

---

### Bug 3: Typo in Password Placeholder
```jsx
placeholder="Massukan password anda"
// Should be: "Masukkan password anda"
```

---

## ✅ Recommended Actions

### Action 1: Delete Unused Breeze Files
```bash
# Delete unused auth pages
rm resources/js/Pages/Auth/Login.jsx
rm resources/js/Pages/Auth/Register.jsx
```

### Action 2: Fix LoginRegistrasi Bugs
1. Show role selection in both login and register modes
2. Remove role from login form (not needed)
3. Fix typo in placeholder
4. Add better error handling

### Action 3: Clean Up Unused Breeze Components (Optional)
Check if these are used:
- `resources/js/Components/Checkbox.jsx`
- `resources/js/Components/InputError.jsx`
- `resources/js/Components/InputLabel.jsx`
- `resources/js/Components/PrimaryButton.jsx`
- `resources/js/Components/TextInput.jsx`
- `resources/js/Layouts/GuestLayout.jsx`

If not used, delete them.

---

## 🔧 Fixed LoginRegistrasi Code

### Fix 1: Role Selection for Both Modes
```jsx
{/* Role selection - Show in BOTH modes */}
<div className="mb-6">
    <Label className="mb-3 block text-sm font-medium">
        {mode === 'login' ? 'Masuk Sebagai' : 'Daftar Sebagai'}
    </Label>
    <div className="grid grid-cols-2 gap-3">
        {/* Siswa */}
        <Button
            variant="outline"
            type="button"
            onClick={() => setData('role', 'siswa')}
            className={`h-auto flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all ${
                data.role === 'siswa'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50'
            }`}
        >
            <User className="h-8 w-8" />
            <span className="text-base font-medium">Siswa</span>
        </Button>
        {/* Guru */}
        <Button
            variant="outline"
            type="button"
            onClick={() => setData('role', 'guru')}
            className={`h-auto flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all ${
                data.role === 'guru'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50'
            }`}
        >
            <BookOpen className="h-8 w-8" />
            <span className="text-base font-medium">Guru</span>
        </Button>
    </div>
</div>
```

### Fix 2: Separate Form Data for Login/Register
```jsx
// Use different form data based on mode
const loginForm = useForm({
    email: '',
    password: '',
    remember: true,
});

const registerForm = useForm({
    name: '',
    email: '',
    role: 'siswa',
    password: '',
    password_confirmation: '',
});

// Use appropriate form based on mode
const form = mode === 'login' ? loginForm : registerForm;
```

### Fix 3: Fix Typo
```jsx
placeholder="Masukkan password anda" // ✅ Fixed
```

---

## 📋 Cleanup Checklist

### Immediate Actions
- [ ] Delete `Login.jsx`
- [ ] Delete `Register.jsx`
- [ ] Fix role selection bug
- [ ] Fix typo in placeholder
- [ ] Test login as Guru
- [ ] Test login as Siswa
- [ ] Test register as Guru
- [ ] Test register as Siswa

### Optional Actions
- [ ] Check unused Breeze components
- [ ] Delete unused components
- [ ] Update .gitignore if needed
- [ ] Clean up commented code in routes/auth.php

---

## 🧪 Testing Checklist

### Login Tests
- [ ] Login as Siswa with correct credentials
- [ ] Login as Guru with correct credentials
- [ ] Login with wrong password
- [ ] Login with non-existent email
- [ ] Redirect to correct dashboard based on role

### Register Tests
- [ ] Register as Siswa
- [ ] Register as Guru
- [ ] Register with existing email (should fail)
- [ ] Register with weak password (should fail)
- [ ] Register with mismatched password confirmation (should fail)
- [ ] Redirect to correct dashboard based on role

---

## 📝 Summary

### Files to Delete
1. `resources/js/Pages/Auth/Login.jsx`
2. `resources/js/Pages/Auth/Register.jsx`

### Bugs to Fix
1. Role selection only in login mode
2. Typo in placeholder
3. Better error handling

### Files to Keep
1. `LoginRegistrasi.jsx` - Main auth page
2. `ForgotPassword.jsx` - May be used
3. `ResetPassword.jsx` - May be used
4. `ConfirmPassword.jsx` - May be used
5. `VerifyEmail.jsx` - May be used

---

**Status:** ⏳ Awaiting cleanup and bug fixes
