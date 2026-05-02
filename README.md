# Edusmart - Modern Learning Management System (LMS)

<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="300" alt="Laravel Logo">
</p>

Edusmart adalah platform sistem manajemen pembelajaran (LMS) modern yang dirancang untuk memfasilitasi interaksi antara Guru dan Siswa secara digital. Dibangun dengan fokus pada kemudahan penggunaan, keamanan data, dan integrasi kecerdasan buatan (AI).

---

## 🚀 Teknologi Utama

Proyek ini dibangun menggunakan teknologi mutakhir dalam ekosistem web:

*   **Core Framework**: [Laravel 11](https://laravel.com) (PHP 8.3+)
*   **Frontend Bridge**: [Inertia.js v2](https://inertiajs.com)
*   **Frontend Library**: [React 18](https://reactjs.org)
*   **Styling**: [Tailwind CSS v3](https://tailwindcss.com)
*   **State Management**: Inertia Form Helpers & React Hooks
*   **AI Integration**: [Google Gemini AI](https://ai.google.dev/) (via Gemini Laravel SDK)
*   **Icons**: Lucide React & Radix UI Components

---

## ✨ Fitur Unggulan

### 👨‍🏫 Panel Guru (Teacher Panel)
*   **Manajemen Kelas**: Membuat dan mengelola ruang kelas digital.
*   **Materi Belajar**: Mengunggah materi dalam berbagai format dengan progres siswa yang terpantau.
*   **Sistem Kuis**: Pembuat kuis interaktif (Pilihan Ganda & Benar/Salah) dengan pengaturan deadline otomatis.
*   **Analisis Aktivitas**: Memantau partisipasi siswa melalui log aktivitas sistematis.
*   **Keamanan**: Implementasi Policy-based authorization untuk setiap sumber daya kelas.

### 👨‍🎓 Panel Siswa (Student Panel)
*   **Dashboard Progres**: Visualisasi pencapaian materi, kuis, dan rata-rata nilai secara real-time.
*   **Ujian Online**: Antarmuka pengerjaan kuis yang bersih dengan timer otomatis.
*   **AI Chatbot**: Asisten pintar Edusmart AI untuk membantu analisis akademik siswa.
*   **Log Aktivitas**: Riwayat belajar yang tercatat rapi untuk evaluasi mandiri.

---

## 🛠️ Persyaratan Sistem

Sebelum memulai, pastikan perangkat Anda memenuhi persyaratan berikut:
*   PHP >= 8.3
*   Composer >= 2.x
*   Node.js >= 20.x & NPM
*   MySQL 8.0+ atau PostgreSQL
*   Browser modern (Chrome, Edge, Firefox)

---

## 📦 Instalasi Proyek

Ikuti langkah-langkah berikut untuk menjalankan Edusmart di lingkungan lokal Anda:

1.  **Clone Repository**
    ```bash
    git clone https://github.com/Aldistwn29/Edusmart.git
    cd Edusmart
    ```

2.  **Instal Dependensi PHP**
    ```bash
    composer install
    ```

3.  **Instal Dependensi Frontend**
    ```bash
    npm install
    ```

4.  **Konfigurasi Environment**
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
    *Sesuaikan koneksi database dan `GEMINI_API_KEY` di file `.env`.*

5.  **Migrasi & Database Seeding**
    ```bash
    php artisan migrate --seed
    ```

6.  **Menjalankan Server**
    ```bash
    # Terminal 1 (Laravel Server)
    php artisan serve

    # Terminal 2 (Vite HMR)
    npm run dev
    ```

---

## 🧹 Perawatan Kode (Maintenance)

Proyek ini menjaga standar kode yang tinggi menggunakan tools berikut:

*   **Laravel Pint**: Menjaga konsistensi gaya penulisan PSR-12.
    ```bash
    vendor/bin/pint
    ```
*   **IDE Helper**: Membantu autocompletion pada editor (VS Code).
    ```bash
    php artisan ide-helper:generate
    php artisan ide-helper:models --nowrite
    ```

---

## 🔒 Keamanan

Aplikasi ini menerapkan standar keamanan ketat:
*   **CSRF Protection**: Aktif secara default via Laravel.
*   **Secure File Uploads**: Validasi mimetype dan ukuran file yang ketat.
*   **Role-based Access Control (RBAC)**: Menggunakan Laravel Gate dan Policy.
*   **Sanitized Data**: Seluruh input divalidasi via Form Requests.

---

## 📄 Lisensi

Proyek ini bersifat open-source di bawah lisensi [MIT](LICENSE).
