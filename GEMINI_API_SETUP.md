# Setup Gemini AI API - Panduan Lengkap

## Masalah
Chatbot AI menampilkan error: **"Maaf, sistem AI kami sedang istirahat. Coba lagi nanti ya! Pastikan konfigurasi API sudah benar."**

## Penyebab
- ❌ GEMINI_API_KEY belum dikonfigurasi di file `.env`
- ❌ API key salah atau tidak valid
- ❌ Koneksi ke Gemini API terblokir oleh CSP (sudah diperbaiki)

## Solusi: Cara Setup Gemini API

### Langkah 1: Dapatkan API Key dari Google AI Studio

1. **Buka Google AI Studio**
   - Kunjungi: https://aistudio.google.com/app/apikey
   - Login dengan akun Google Anda

2. **Buat API Key Baru**
   - Klik tombol **"Create API Key"** atau **"Get API Key"**
   - Pilih project Google Cloud (atau buat baru jika belum ada)
   - Copy API key yang dihasilkan (format: `AIza...`)

3. **Simpan API Key**
   - ⚠️ **PENTING**: Jangan share API key ke siapapun!
   - Simpan di tempat aman (password manager)

### Langkah 2: Konfigurasi di File .env

1. **Buka file `.env`** di root project Anda
   
2. **Tambahkan konfigurasi Gemini** (jika belum ada):
   ```env
   # Gemini AI Configuration
   GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   GEMINI_BASE_URL=
   GEMINI_REQUEST_TIMEOUT=30
   ```

3. **Ganti `AIzaSyXXX...`** dengan API key Anda yang sebenarnya

4. **Simpan file `.env`**

### Langkah 3: Clear Cache Laravel

Setelah mengubah `.env`, jalankan command ini:

```bash
php artisan config:clear
php artisan cache:clear
```

### Langkah 4: Test Chatbot

1. **Login sebagai Siswa**
2. **Buka halaman Chatbot AI**
3. **Kirim pesan**: "Tolong analisis performa belajar saya"
4. **Chatbot harus merespon** dengan analisis berdasarkan data nilai Anda

## Verifikasi Setup

### Cek 1: API Key Terkonfigurasi
Jalankan di terminal:
```bash
php artisan tinker
```

Lalu ketik:
```php
config('gemini.api_key')
```

**Output yang benar**: Harus menampilkan API key Anda (bukan `null`)

### Cek 2: Test Koneksi Gemini API
Jalankan di terminal:
```bash
php artisan tinker
```

Lalu ketik:
```php
use Gemini\Laravel\Facades\Gemini;
$result = Gemini::generativeModel('gemini-1.5-flash')->generateContent('Halo, apa kabar?');
echo $result->text();
```

**Output yang benar**: Harus menampilkan response dari Gemini AI

## Model Gemini yang Tersedia

### Recommended Models (Stable)
- **gemini-1.5-flash** ✅ (Digunakan di aplikasi ini)
  - Fast, efficient, good for production
  - Best balance of speed and quality
  
- **gemini-1.5-pro**
  - More powerful, slower
  - Better for complex analysis

### Experimental Models
- **gemini-2.0-flash-exp**
  - Latest experimental version
  - May have breaking changes

### Deprecated Models ❌
- **gemini-pro** (JANGAN DIGUNAKAN)
  - Model lama yang sudah tidak didukung
  - Akan menyebabkan error

## Troubleshooting

### Error: "API key not valid"
**Solusi:**
1. Pastikan API key benar (copy-paste ulang dari Google AI Studio)
2. Pastikan tidak ada spasi di awal/akhir API key
3. Pastikan API key aktif (tidak expired atau disabled)

### Error: "Quota exceeded"
**Solusi:**
1. Gemini API memiliki quota gratis terbatas
2. Cek quota di: https://aistudio.google.com/app/apikey
3. Tunggu reset quota (biasanya per hari)
4. Atau upgrade ke plan berbayar

### Error: "Connection timeout"
**Solusi:**
1. Cek koneksi internet Anda
2. Tingkatkan `GEMINI_REQUEST_TIMEOUT` di `.env` (misal: 60)
3. Pastikan firewall tidak memblokir koneksi ke `generativelanguage.googleapis.com`

### Chatbot masih tidak bisa setelah setup
**Solusi:**
1. Clear cache: `php artisan config:clear && php artisan cache:clear`
2. Restart Vite dev server: Stop `npm run dev` lalu jalankan lagi
3. Hard refresh browser: Ctrl+Shift+R
4. Cek browser console (F12) untuk error JavaScript

## Fitur Chatbot AI

### 1. Analisis Performa
**Perintah**: "Tolong analisis performa belajar saya"

**Output**:
- Rata-rata nilai quiz dan tugas
- Trend naik/turun
- Pujian atau motivasi

### 2. Diagnosis Pembelajaran
**Perintah**: "Diagnosis pembelajaran saya"

**Output**:
- ✅ Materi yang dikuasai (skor tertinggi)
- ❌ Materi yang lemah (skor terendah)
- Evaluasi per mata pelajaran

### 3. Action Plan
**Perintah**: "Buatkan action plan untuk saya"

**Output**:
- Fokus pada materi lemah
- Prinsip Pareto (80/20)
- 3 langkah aksi konkrit
- Kata kunci pencarian Google

## Security & Best Practices

### ✅ DO (Lakukan)
- Simpan API key di `.env` (tidak di code)
- Tambahkan `.env` ke `.gitignore` (sudah otomatis)
- Gunakan environment variables
- Monitor penggunaan quota API
- Implementasi rate limiting (sudah ada)

### ❌ DON'T (Jangan)
- Jangan commit API key ke Git
- Jangan share API key ke orang lain
- Jangan hardcode API key di code
- Jangan expose API key di frontend
- Jangan gunakan API key production di development

## Quota & Pricing

### Free Tier (Gratis)
- **15 requests per minute (RPM)**
- **1 million tokens per day**
- **1,500 requests per day**

Untuk aplikasi e-learning dengan ~50 siswa aktif:
- Estimasi: 200-500 requests/hari
- ✅ Free tier cukup untuk development dan testing

### Paid Tier (Berbayar)
Jika quota gratis tidak cukup:
- Upgrade ke Google Cloud billing
- Pay-as-you-go pricing
- Cek: https://ai.google.dev/pricing

## File yang Dimodifikasi

- ✅ `.env.example` - Ditambahkan template konfigurasi Gemini
- ✅ `app/Http/Middleware/SecurityHeaders.php` - CSP mengizinkan Gemini API
- ✅ `config/gemini.php` - Konfigurasi Gemini (sudah ada)
- ✅ `app/Services/LearningAnalysisService.php` - Service untuk AI (sudah ada)
- ✅ `app/Http/Controllers/Siswa/ChatbotAi.php` - Controller chatbot (sudah ada)

## Testing Checklist

- [ ] API key sudah didapat dari Google AI Studio
- [ ] API key sudah ditambahkan ke `.env`
- [ ] Cache sudah di-clear
- [ ] Test koneksi di tinker berhasil
- [ ] Login sebagai siswa
- [ ] Buka halaman chatbot
- [ ] Kirim pesan test
- [ ] Chatbot merespon dengan benar
- [ ] Tidak ada error di browser console
- [ ] Tidak ada error di Laravel log

## Dokumentasi Tambahan

- **Gemini API Docs**: https://ai.google.dev/docs
- **Laravel Gemini Package**: https://github.com/google-gemini-php/laravel
- **Google AI Studio**: https://aistudio.google.com/

---

**Status**: ✅ Dokumentasi Lengkap
**Date**: 2026-05-01
**Issue**: Chatbot AI tidak bisa karena API key belum dikonfigurasi
**Solution**: Setup GEMINI_API_KEY di .env dan clear cache
