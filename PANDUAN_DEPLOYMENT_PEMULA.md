# 🚀 Panduan Deployment untuk Pemula - EduSmart

**Dibuat:** 1 Mei 2026  
**Untuk:** Pemula yang baru belajar deployment  
**Bahasa:** Indonesia, mudah dipahami

---

## 📚 Daftar Isi

1. [Apa itu Deployment?](#apa-itu-deployment)
2. [Persiapan Sebelum Deployment](#persiapan-sebelum-deployment)
3. [Pilihan Platform Deployment](#pilihan-platform-deployment)
4. [Deployment ke Shared Hosting (Mudah)](#deployment-ke-shared-hosting)
5. [Deployment ke VPS (Menengah)](#deployment-ke-vps)
6. [Deployment ke Cloud (Advanced)](#deployment-ke-cloud)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Apa itu Deployment?

**Deployment** adalah proses memindahkan aplikasi dari komputer lokal (laptop/PC kamu) ke server online agar bisa diakses orang lain melalui internet.

### Analogi Sederhana:
- **Lokal (Development)** = Masak di dapur rumah sendiri
- **Deployment (Production)** = Buka restoran yang bisa dikunjungi orang lain

### Yang Terjadi Saat Deployment:
1. ✅ Aplikasi dipindah ke server
2. ✅ Database dipindah ke server
3. ✅ Domain/URL diatur (misal: edusmart.com)
4. ✅ SSL/HTTPS diaktifkan (gembok hijau di browser)
5. ✅ Aplikasi bisa diakses 24/7

---

## 📋 Persiapan Sebelum Deployment

### 1. Checklist Aplikasi

#### ✅ Pastikan Aplikasi Berjalan Lokal
```bash
# Test di komputer kamu dulu
php artisan serve
npm run dev

# Buka browser: http://localhost:8000
# Pastikan semua fitur berjalan normal
```

#### ✅ Test Semua Fitur
- [ ] Login/Register berfungsi
- [ ] Guru bisa buat tugas
- [ ] Siswa bisa submit tugas
- [ ] Upload file berfungsi
- [ ] AI Chatbot berfungsi
- [ ] Tidak ada error di console browser

#### ✅ Siapkan Data Penting
```bash
# 1. Backup database
php artisan db:backup

# 2. Catat semua password:
# - Database password
# - Email password
# - API keys (Gemini)
# - Domain registrar password
```

---

### 2. Siapkan Akun & Tools

#### Yang Perlu Disiapkan:

1. **Domain** (Nama website)
   - Contoh: `edusmart.com`, `belajar-online.id`
   - Beli di: Niagahoster, Domainesia, Namecheap
   - Harga: Rp 100.000 - 200.000/tahun

2. **Hosting/Server** (Tempat aplikasi)
   - Pilihan: Shared Hosting, VPS, atau Cloud
   - Harga: Rp 20.000 - 500.000/bulan

3. **Git Repository** (Opsional tapi recommended)
   - GitHub, GitLab, atau Bitbucket
   - Gratis untuk public repository

4. **SSL Certificate** (HTTPS)
   - Gratis dari Let's Encrypt
   - Atau beli di hosting provider

---

## 🎨 Pilihan Platform Deployment

### Perbandingan Platform:

| Platform | Kesulitan | Harga/Bulan | Cocok Untuk |
|----------|-----------|-------------|-------------|
| **Shared Hosting** | 🟢 Mudah | Rp 20k - 100k | Pemula, traffic rendah |
| **VPS** | 🟡 Menengah | Rp 100k - 500k | Traffic menengah, kontrol penuh |
| **Cloud (AWS/GCP)** | 🔴 Sulit | Rp 200k - 2jt+ | Traffic tinggi, scalable |

### Rekomendasi untuk Pemula:

1. **Baru Belajar?** → Mulai dari **Shared Hosting**
2. **Sudah Paham Linux?** → Coba **VPS**
3. **Butuh Scalable?** → Gunakan **Cloud**

---

## 🏠 Deployment ke Shared Hosting (MUDAH)

**Cocok untuk:** Pemula, project kecil, budget terbatas

### Langkah 1: Pilih Hosting

**Rekomendasi Hosting Indonesia:**
- ✅ Niagahoster (Paling populer)
- ✅ Domainesia (Support bagus)
- ✅ IDCloudHost (Murah)
- ✅ Dewaweb (Premium)

**Spesifikasi Minimal:**
- PHP 8.3+
- MySQL 5.7+
- 1 GB RAM
- 10 GB Storage
- SSL Gratis

### Langkah 2: Beli Hosting & Domain

#### Di Niagahoster (Contoh):

1. **Buka** https://www.niagahoster.co.id
2. **Pilih** paket "Bayi" atau "Pelajar" (Rp 20k-40k/bulan)
3. **Pilih** domain (misal: `edusmart.my.id` - gratis)
4. **Checkout** dan bayar
5. **Tunggu** email aktivasi (5-10 menit)

### Langkah 3: Akses cPanel

1. **Login** ke cPanel (link di email)
   - URL: `https://yourdomain.com/cpanel`
   - Username: dari email
   - Password: yang kamu buat

2. **Tampilan cPanel:**
   ```
   ┌─────────────────────────────────┐
   │  cPanel Dashboard               │
   ├─────────────────────────────────┤
   │  📁 File Manager                │
   │  🗄️  MySQL Databases            │
   │  📧 Email Accounts              │
   │  🔒 SSL/TLS                     │
   │  📊 Metrics                     │
   └─────────────────────────────────┘
   ```

### Langkah 4: Upload Aplikasi

#### Cara 1: Upload Manual (Mudah)

1. **Compress** aplikasi di komputer:
   ```bash
   # Di komputer lokal
   zip -r edusmart.zip . -x "node_modules/*" -x "vendor/*" -x ".git/*"
   ```

2. **Upload** via File Manager:
   - Buka **File Manager** di cPanel
   - Masuk ke folder `public_html`
   - Klik **Upload**
   - Pilih file `edusmart.zip`
   - Tunggu upload selesai (5-30 menit tergantung internet)

3. **Extract** file:
   - Klik kanan `edusmart.zip`
   - Pilih **Extract**
   - Hapus file zip setelah selesai

#### Cara 2: Upload via Git (Recommended)

1. **Push** ke GitHub dulu:
   ```bash
   # Di komputer lokal
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Clone** di server:
   - Buka **Terminal** di cPanel (atau SSH)
   ```bash
   cd public_html
   git clone https://github.com/username/edusmart.git .
   ```

### Langkah 5: Install Dependencies

```bash
# Di Terminal cPanel atau SSH

# 1. Install Composer dependencies
composer install --optimize-autoloader --no-dev

# 2. Install NPM dependencies
npm ci

# 3. Build assets
npm run build
```

**Catatan:** Jika tidak ada akses terminal, minta hosting provider untuk install dependencies.

### Langkah 6: Setup Database

1. **Buat Database** di cPanel:
   - Buka **MySQL Databases**
   - Database Name: `edusmart_db`
   - Klik **Create Database**

2. **Buat User Database:**
   - Username: `edusmart_user`
   - Password: (buat password kuat)
   - Klik **Create User**

3. **Hubungkan User ke Database:**
   - Pilih user dan database
   - Klik **Add**
   - Centang **ALL PRIVILEGES**
   - Klik **Make Changes**

4. **Catat Informasi:**
   ```
   Database Name: edusmart_db
   Username: edusmart_user
   Password: [password yang kamu buat]
   Host: localhost
   ```

### Langkah 7: Konfigurasi .env

1. **Copy** `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```

2. **Edit** `.env` via File Manager:
   ```env
   APP_NAME="EduSmart"
   APP_ENV=production
   APP_KEY=
   APP_DEBUG=false
   APP_URL=https://yourdomain.com

   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=edusmart_db
   DB_USERNAME=edusmart_user
   DB_PASSWORD=password_yang_kamu_buat

   SESSION_DRIVER=database
   SESSION_SECURE_COOKIE=true

   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Generate** APP_KEY:
   ```bash
   php artisan key:generate
   ```

### Langkah 8: Migrasi Database

```bash
# Jalankan migrasi
php artisan migrate --force

# Seed data (opsional)
php artisan db:seed --force
```

### Langkah 9: Setup Storage

```bash
# Buat symlink storage
php artisan storage:link

# Set permission (via File Manager)
# Klik kanan folder storage → Change Permissions → 755
```

### Langkah 10: Optimize Aplikasi

```bash
# Cache semua config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Clear cache lama
php artisan optimize:clear
```

### Langkah 11: Setup SSL (HTTPS)

1. **Buka** SSL/TLS di cPanel
2. **Pilih** "Let's Encrypt SSL"
3. **Pilih** domain kamu
4. **Klik** "Install"
5. **Tunggu** 2-5 menit

**Atau otomatis:**
- Kebanyakan hosting sudah auto-install SSL
- Cek dengan buka: `https://yourdomain.com`

### Langkah 12: Test Aplikasi

1. **Buka** browser
2. **Akses** `https://yourdomain.com`
3. **Test** semua fitur:
   - Login/Register
   - Upload file
   - Submit tugas
   - AI Chatbot

**Jika ada error:**
- Cek `storage/logs/laravel.log`
- Atau hubungi support hosting

---

## 🖥️ Deployment ke VPS (MENENGAH)

**Cocok untuk:** Yang sudah paham Linux, butuh kontrol penuh

### Langkah 1: Pilih VPS Provider

**Rekomendasi VPS:**
- ✅ DigitalOcean (Paling populer, $6/bulan)
- ✅ Vultr (Murah, $5/bulan)
- ✅ Linode (Reliable, $5/bulan)
- ✅ IDCloudHost (Indonesia, Rp 100k/bulan)

**Spesifikasi Minimal:**
- 1 vCPU
- 1 GB RAM
- 25 GB SSD
- Ubuntu 22.04 LTS

### Langkah 2: Buat VPS (Droplet)

#### Di DigitalOcean (Contoh):

1. **Daftar** di https://digitalocean.com
2. **Klik** "Create Droplet"
3. **Pilih:**
   - Image: Ubuntu 22.04 LTS
   - Plan: Basic ($6/month)
   - Region: Singapore (terdekat)
   - Authentication: SSH Key (recommended) atau Password
4. **Klik** "Create Droplet"
5. **Tunggu** 1-2 menit
6. **Catat** IP Address (misal: `123.45.67.89`)

### Langkah 3: Koneksi ke VPS

#### Windows (Pakai PuTTY):

1. **Download** PuTTY: https://putty.org
2. **Buka** PuTTY
3. **Masukkan:**
   - Host Name: `123.45.67.89` (IP VPS kamu)
   - Port: `22`
   - Connection Type: SSH
4. **Klik** "Open"
5. **Login:**
   - Username: `root`
   - Password: (dari email DigitalOcean)

#### Mac/Linux (Pakai Terminal):

```bash
ssh root@123.45.67.89
# Masukkan password
```

### Langkah 4: Update Server

```bash
# Update package list
sudo apt update

# Upgrade packages
sudo apt upgrade -y

# Reboot (opsional)
sudo reboot
```

### Langkah 5: Install Software

#### Install Nginx (Web Server)

```bash
# Install Nginx
sudo apt install nginx -y

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Test: Buka browser → http://123.45.67.89
# Harus muncul "Welcome to nginx!"
```

#### Install PHP 8.3

```bash
# Add PHP repository
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update

# Install PHP dan extensions
sudo apt install php8.3-fpm php8.3-mysql php8.3-mbstring \
    php8.3-xml php8.3-bcmath php8.3-curl php8.3-zip \
    php8.3-gd php8.3-redis -y

# Cek versi PHP
php -v
# Harus muncul: PHP 8.3.x
```

#### Install MySQL

```bash
# Install MySQL
sudo apt install mysql-server -y

# Secure installation
sudo mysql_secure_installation

# Jawab pertanyaan:
# - Set root password: YES (buat password kuat)
# - Remove anonymous users: YES
# - Disallow root login remotely: YES
# - Remove test database: YES
# - Reload privilege tables: YES
```

#### Install Composer

```bash
# Download Composer
curl -sS https://getcomposer.org/installer | php

# Move to global
sudo mv composer.phar /usr/local/bin/composer

# Cek versi
composer --version
```

#### Install Node.js & NPM

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# Cek versi
node -v
npm -v
```

#### Install Git

```bash
# Install Git
sudo apt install git -y

# Cek versi
git --version
```

### Langkah 6: Setup Database

```bash
# Login ke MySQL
sudo mysql -u root -p

# Buat database
CREATE DATABASE edusmart_production;

# Buat user
CREATE USER 'edusmart_user'@'localhost' IDENTIFIED BY 'PASSWORD_KUAT_DISINI';

# Berikan akses
GRANT ALL PRIVILEGES ON edusmart_production.* TO 'edusmart_user'@'localhost';

# Reload privileges
FLUSH PRIVILEGES;

# Keluar
EXIT;
```

### Langkah 7: Clone Aplikasi

```bash
# Buat folder untuk aplikasi
sudo mkdir -p /var/www/edusmart

# Set ownership
sudo chown -R $USER:$USER /var/www/edusmart

# Clone dari GitHub
cd /var/www
git clone https://github.com/username/edusmart.git

# Masuk ke folder
cd edusmart
```

### Langkah 8: Install Dependencies

```bash
# Install Composer dependencies
composer install --optimize-autoloader --no-dev

# Install NPM dependencies
npm ci

# Build assets
npm run build
```

### Langkah 9: Konfigurasi .env

```bash
# Copy .env.example
cp .env.example .env

# Edit .env
nano .env
```

**Isi .env:**
```env
APP_NAME="EduSmart"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=edusmart_production
DB_USERNAME=edusmart_user
DB_PASSWORD=PASSWORD_KUAT_DISINI

SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true

GEMINI_API_KEY=your_gemini_api_key_here
```

**Simpan:** `Ctrl + X`, `Y`, `Enter`

```bash
# Generate APP_KEY
php artisan key:generate
```

### Langkah 10: Setup Permission

```bash
# Set ownership
sudo chown -R www-data:www-data /var/www/edusmart

# Set permission
sudo chmod -R 755 /var/www/edusmart/storage
sudo chmod -R 755 /var/www/edusmart/bootstrap/cache
```

### Langkah 11: Migrasi Database

```bash
# Jalankan migrasi
php artisan migrate --force

# Seed data (opsional)
php artisan db:seed --force

# Buat storage symlink
php artisan storage:link
```

### Langkah 12: Optimize Aplikasi

```bash
# Cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Langkah 13: Konfigurasi Nginx

```bash
# Buat config file
sudo nano /etc/nginx/sites-available/edusmart
```

**Isi config:**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/edusmart/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    client_max_body_size 25M;
}
```

**Simpan:** `Ctrl + X`, `Y`, `Enter`

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/edusmart /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Langkah 14: Setup Domain

1. **Login** ke domain registrar (Niagahoster, dll)
2. **Buka** DNS Management
3. **Tambah** A Record:
   - Type: `A`
   - Name: `@`
   - Value: `123.45.67.89` (IP VPS kamu)
   - TTL: `3600`
4. **Tambah** A Record untuk www:
   - Type: `A`
   - Name: `www`
   - Value: `123.45.67.89`
   - TTL: `3600`
5. **Tunggu** 5-60 menit (DNS propagation)

### Langkah 15: Install SSL (HTTPS)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Jawab pertanyaan:
# - Email: your@email.com
# - Agree to terms: YES
# - Share email: NO (optional)
# - Redirect HTTP to HTTPS: YES (pilih 2)

# Test auto-renewal
sudo certbot renew --dry-run
```

### Langkah 16: Test Aplikasi

1. **Buka** browser
2. **Akses** `https://yourdomain.com`
3. **Test** semua fitur

**Jika ada error:**
```bash
# Cek log Nginx
sudo tail -f /var/log/nginx/error.log

# Cek log Laravel
tail -f /var/www/edusmart/storage/logs/laravel.log
```

---

## ☁️ Deployment ke Cloud (ADVANCED)

**Cocok untuk:** Traffic tinggi, butuh scalability

### Platform Cloud:

1. **AWS (Amazon Web Services)**
   - Paling populer
   - Banyak fitur
   - Harga: Pay as you go

2. **Google Cloud Platform (GCP)**
   - Bagus untuk AI/ML
   - Integrasi dengan Google services

3. **Microsoft Azure**
   - Bagus untuk enterprise
   - Integrasi dengan Microsoft products

**Catatan:** Cloud deployment lebih kompleks, butuh pengetahuan DevOps. Untuk pemula, mulai dari Shared Hosting atau VPS dulu.

---

## 🔧 Troubleshooting

### Error 500 - Internal Server Error

**Penyebab:**
- Permission salah
- .env tidak dikonfigurasi
- APP_KEY belum di-generate

**Solusi:**
```bash
# Set permission
sudo chmod -R 755 storage bootstrap/cache

# Generate key
php artisan key:generate

# Clear cache
php artisan optimize:clear

# Cek log
tail -f storage/logs/laravel.log
```

---

### Error 404 - Not Found

**Penyebab:**
- Nginx config salah
- Root path salah

**Solusi:**
```bash
# Pastikan root path ke folder public
# Di Nginx config:
root /var/www/edusmart/public;

# Restart Nginx
sudo systemctl restart nginx
```

---

### Database Connection Error

**Penyebab:**
- Kredensial database salah
- Database belum dibuat

**Solusi:**
```bash
# Cek .env
cat .env | grep DB_

# Test koneksi MySQL
mysql -u edusmart_user -p edusmart_production

# Jika gagal, buat ulang user
sudo mysql -u root -p
CREATE USER 'edusmart_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON edusmart_production.* TO 'edusmart_user'@'localhost';
FLUSH PRIVILEGES;
```

---

### File Upload Gagal

**Penyebab:**
- Permission storage salah
- Upload limit terlalu kecil

**Solusi:**
```bash
# Set permission
sudo chmod -R 755 storage

# Edit php.ini
sudo nano /etc/php/8.3/fpm/php.ini

# Ubah:
upload_max_filesize = 25M
post_max_size = 25M

# Restart PHP-FPM
sudo systemctl restart php8.3-fpm

# Edit Nginx config
sudo nano /etc/nginx/sites-available/edusmart

# Tambahkan:
client_max_body_size 25M;

# Restart Nginx
sudo systemctl restart nginx
```

---

### SSL Certificate Error

**Penyebab:**
- Certificate expired
- Domain tidak pointing ke server

**Solusi:**
```bash
# Renew certificate
sudo certbot renew

# Atau force renew
sudo certbot renew --force-renewal

# Restart Nginx
sudo systemctl restart nginx
```

---

## 📊 Monitoring & Maintenance

### Daily Checks

```bash
# Cek disk space
df -h

# Cek memory
free -m

# Cek log errors
tail -f storage/logs/laravel.log
```

### Weekly Tasks

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Clear old logs
find storage/logs -name "*.log" -mtime +7 -delete

# Backup database
mysqldump -u root -p edusmart_production > backup_$(date +%Y%m%d).sql
```

### Monthly Tasks

```bash
# Renew SSL (auto, tapi cek manual)
sudo certbot renew

# Check security updates
sudo apt list --upgradable

# Review application logs
# Cari pattern error yang sering muncul
```

---

## ✅ Checklist Deployment

### Pre-Deployment
- [ ] Aplikasi berjalan normal di lokal
- [ ] Semua fitur sudah di-test
- [ ] Database sudah di-backup
- [ ] .env.example sudah update
- [ ] Security sudah diimplementasi

### During Deployment
- [ ] Server/hosting sudah siap
- [ ] Domain sudah dibeli
- [ ] Database sudah dibuat
- [ ] .env sudah dikonfigurasi
- [ ] Dependencies sudah di-install
- [ ] Migration sudah dijalankan
- [ ] SSL sudah di-install

### Post-Deployment
- [ ] Aplikasi bisa diakses via domain
- [ ] HTTPS aktif (gembok hijau)
- [ ] Semua fitur berfungsi
- [ ] File upload berfungsi
- [ ] Email notification berfungsi (jika ada)
- [ ] Monitoring sudah setup
- [ ] Backup sudah dijadwalkan

---

## 🎓 Tips untuk Pemula

### 1. Mulai dari yang Mudah
- Jangan langsung ke VPS/Cloud
- Mulai dari Shared Hosting dulu
- Pahami konsep dasar dulu

### 2. Dokumentasikan Semuanya
- Catat setiap langkah
- Screenshot error yang muncul
- Simpan semua password di password manager

### 3. Backup, Backup, Backup!
- Backup database sebelum deploy
- Backup code sebelum update
- Backup config file

### 4. Test di Staging Dulu
- Jangan langsung deploy ke production
- Buat environment staging untuk test
- Pastikan semua berjalan normal

### 5. Belajar dari Error
- Jangan takut error
- Google error message
- Tanya di forum/komunitas

### 6. Gunakan Git
- Commit setiap perubahan
- Push ke GitHub/GitLab
- Mudah rollback jika ada masalah

### 7. Monitor Aplikasi
- Cek log secara berkala
- Setup uptime monitoring
- Setup error notification

---

## 📚 Resource Belajar

### Tutorial Video (YouTube)
- "Laravel Deployment Tutorial" - Web Programming UNPAS
- "Deploy Laravel ke Shared Hosting" - Parsinta
- "VPS Setup for Laravel" - Laracasts

### Dokumentasi
- Laravel Deployment: https://laravel.com/docs/11.x/deployment
- DigitalOcean Tutorials: https://www.digitalocean.com/community/tutorials
- Nginx Documentation: https://nginx.org/en/docs/

### Komunitas
- Laravel Indonesia: https://t.me/laravelindonesia
- Facebook Group: Laravel Indonesia
- Stack Overflow: Tag [laravel]

---

## 🎉 Kesimpulan

Deployment memang terlihat rumit di awal, tapi dengan praktek akan jadi mudah!

**Ingat:**
1. ✅ Mulai dari yang mudah (Shared Hosting)
2. ✅ Ikuti langkah-langkah dengan teliti
3. ✅ Jangan takut error, itu bagian dari belajar
4. ✅ Backup sebelum melakukan perubahan
5. ✅ Test semua fitur setelah deploy

**Selamat mencoba! 🚀**

---

**Dibuat dengan ❤️ untuk pemula**  
**Jika ada pertanyaan, jangan ragu untuk bertanya!**
