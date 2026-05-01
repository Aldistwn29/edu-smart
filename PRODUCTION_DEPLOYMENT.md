# 🚀 Production Deployment Checklist - EduSmart

**Last Updated:** May 1, 2026  
**Version:** 1.0

---

## ✅ Pre-Deployment Checklist

### 1. Environment Configuration

#### .env File (Production)
```bash
# Application
APP_NAME="EduSmart"
APP_ENV=production
APP_KEY=base64:YOUR_PRODUCTION_KEY_HERE
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=edusmart_production
DB_USERNAME=edusmart_user
DB_PASSWORD=STRONG_RANDOM_PASSWORD_HERE

# Session & Security
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax

# Cache
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis

# Redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Mail
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@yourdomain.com"
MAIL_FROM_NAME="${APP_NAME}"

# Gemini AI
GEMINI_API_KEY=your_production_gemini_api_key
GEMINI_REQUEST_TIMEOUT=30

# Logging
LOG_CHANNEL=stack
LOG_LEVEL=error
```

---

### 2. Security Checklist

- [ ] `APP_DEBUG=false` ✅ Critical
- [ ] `APP_ENV=production` ✅ Critical
- [ ] `SESSION_SECURE_COOKIE=true` ✅ Critical
- [ ] Strong `APP_KEY` generated
- [ ] Strong database password
- [ ] HTTPS enabled (SSL certificate)
- [ ] Firewall configured
- [ ] Database access restricted to localhost
- [ ] `.env` file NOT in git
- [ ] Security headers middleware active
- [ ] Rate limiting configured
- [ ] File upload validation active
- [ ] Authorization policies implemented

---

### 3. Code Optimization

```bash
# Clear all caches
php artisan optimize:clear

# Cache configuration
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache

# Cache events
php artisan event:cache

# Optimize autoloader
composer install --optimize-autoloader --no-dev

# Build frontend assets
npm run build
```

---

### 4. Database Setup

```bash
# Run migrations (BACKUP FIRST!)
php artisan migrate --force

# Seed production data (if needed)
php artisan db:seed --class=ProductionSeeder

# Create storage symlink
php artisan storage:link
```

---

### 5. File Permissions

```bash
# Set correct permissions
chmod -R 755 storage
chmod -R 755 bootstrap/cache

# Set ownership (adjust user/group as needed)
chown -R www-data:www-data storage
chown -R www-data:www-data bootstrap/cache
```

---

### 6. Server Configuration

#### Nginx Configuration Example
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/edusmart/public;

    # SSL Configuration
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers (Laravel middleware handles most)
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

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

    # Max upload size
    client_max_body_size 25M;
}
```

---

### 7. Monitoring & Logging

#### Setup Log Rotation
```bash
# Create logrotate config
sudo nano /etc/logrotate.d/laravel

# Add:
/var/www/edusmart/storage/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
}
```

#### Setup Monitoring
- [ ] Setup application monitoring (e.g., Sentry, Bugsnag)
- [ ] Setup server monitoring (e.g., New Relic, DataDog)
- [ ] Setup uptime monitoring (e.g., UptimeRobot)
- [ ] Setup log aggregation (e.g., Papertrail, Loggly)

---

### 8. Backup Strategy

```bash
# Database backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/edusmart"
DB_NAME="edusmart_production"

# Create backup
mysqldump -u root -p $DB_NAME > $BACKUP_DIR/db_$DATE.sql

# Compress
gzip $BACKUP_DIR/db_$DATE.sql

# Delete backups older than 30 days
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +30 -delete
```

**Setup Cron:**
```bash
# Daily backup at 2 AM
0 2 * * * /path/to/backup-script.sh
```

---

### 9. Performance Optimization

#### PHP Configuration (php.ini)
```ini
memory_limit = 256M
upload_max_filesize = 25M
post_max_size = 25M
max_execution_time = 60
opcache.enable = 1
opcache.memory_consumption = 128
opcache.interned_strings_buffer = 8
opcache.max_accelerated_files = 10000
opcache.revalidate_freq = 2
```

#### Redis Configuration
```bash
# Install Redis
sudo apt install redis-server

# Configure Laravel to use Redis
# Already set in .env:
# CACHE_DRIVER=redis
# QUEUE_CONNECTION=redis
```

---

### 10. Queue Workers (Optional)

If using queues:

```bash
# Install Supervisor
sudo apt install supervisor

# Create config
sudo nano /etc/supervisor/conf.d/edusmart-worker.conf

# Add:
[program:edusmart-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/edusmart/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/edusmart/storage/logs/worker.log
stopwaitsecs=3600

# Reload supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start edusmart-worker:*
```

---

## 🚀 Deployment Steps

### Step 1: Prepare Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y nginx mysql-server php8.3-fpm php8.3-mysql \
    php8.3-mbstring php8.3-xml php8.3-bcmath php8.3-curl \
    php8.3-zip php8.3-gd php8.3-redis redis-server
```

### Step 2: Clone Repository
```bash
# Clone to server
cd /var/www
sudo git clone https://github.com/yourusername/edusmart.git
cd edusmart

# Set permissions
sudo chown -R www-data:www-data /var/www/edusmart
```

### Step 3: Install Dependencies
```bash
# Install Composer dependencies
composer install --optimize-autoloader --no-dev

# Install NPM dependencies
npm ci

# Build assets
npm run build
```

### Step 4: Configure Environment
```bash
# Copy .env file
cp .env.example .env

# Edit .env with production values
nano .env

# Generate app key
php artisan key:generate
```

### Step 5: Setup Database
```bash
# Create database
mysql -u root -p
CREATE DATABASE edusmart_production;
CREATE USER 'edusmart_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON edusmart_production.* TO 'edusmart_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Run migrations
php artisan migrate --force
```

### Step 6: Optimize Application
```bash
# Cache everything
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Create storage symlink
php artisan storage:link
```

### Step 7: Configure Web Server
```bash
# Copy Nginx config
sudo nano /etc/nginx/sites-available/edusmart

# Enable site
sudo ln -s /etc/nginx/sites-available/edusmart /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 8: Setup SSL
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is setup automatically
```

### Step 9: Final Checks
```bash
# Check application
curl https://yourdomain.com

# Check logs
tail -f storage/logs/laravel.log

# Test features
# - Login
# - File upload
# - AI chatbot
# - Assignment submission
```

---

## 🔍 Post-Deployment Verification

### Functional Tests
- [ ] Homepage loads correctly
- [ ] Login/Register works
- [ ] Guru can create assignments
- [ ] Siswa can submit assignments
- [ ] File uploads work (with security validation)
- [ ] AI chatbot responds
- [ ] Rate limiting works
- [ ] Authorization policies work
- [ ] Email notifications work (if configured)

### Security Tests
- [ ] HTTPS is enforced
- [ ] Security headers are present
- [ ] File upload validation works
- [ ] Authorization prevents unauthorized access
- [ ] Rate limiting prevents abuse
- [ ] `.env` file is not accessible
- [ ] Directory listing is disabled

### Performance Tests
- [ ] Page load time < 2 seconds
- [ ] Database queries are optimized
- [ ] Assets are minified and compressed
- [ ] Caching is working
- [ ] Redis is connected (if used)

---

## 🐛 Troubleshooting

### Common Issues

#### 1. 500 Internal Server Error
```bash
# Check logs
tail -f storage/logs/laravel.log

# Check permissions
sudo chown -R www-data:www-data storage bootstrap/cache

# Clear cache
php artisan optimize:clear
```

#### 2. Assets Not Loading
```bash
# Rebuild assets
npm run build

# Check public/build exists
ls -la public/build

# Check Nginx config for correct root path
```

#### 3. Database Connection Error
```bash
# Check .env database credentials
cat .env | grep DB_

# Test MySQL connection
mysql -u edusmart_user -p edusmart_production
```

#### 4. File Upload Fails
```bash
# Check storage permissions
ls -la storage/app/public

# Check upload limits in php.ini
php -i | grep upload_max_filesize
php -i | grep post_max_size

# Check Nginx client_max_body_size
```

---

## 📊 Monitoring Commands

```bash
# Check application status
php artisan about

# Check queue status (if using queues)
php artisan queue:work --once

# Check scheduled tasks
php artisan schedule:list

# Check failed jobs
php artisan queue:failed

# Monitor logs in real-time
tail -f storage/logs/laravel.log

# Check disk space
df -h

# Check memory usage
free -m

# Check running processes
ps aux | grep php
```

---

## 🔄 Update Procedure

When deploying updates:

```bash
# 1. Backup database
mysqldump -u root -p edusmart_production > backup_$(date +%Y%m%d).sql

# 2. Enable maintenance mode
php artisan down

# 3. Pull latest code
git pull origin main

# 4. Update dependencies
composer install --optimize-autoloader --no-dev
npm ci
npm run build

# 5. Run migrations
php artisan migrate --force

# 6. Clear and cache
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 7. Restart services
sudo systemctl restart php8.3-fpm
sudo systemctl restart nginx

# 8. Disable maintenance mode
php artisan up

# 9. Verify
curl https://yourdomain.com
```

---

## ✅ Production Checklist Summary

### Critical (Must Do)
- [x] `APP_DEBUG=false`
- [x] `APP_ENV=production`
- [x] `SESSION_SECURE_COOKIE=true`
- [x] HTTPS enabled
- [x] Strong passwords
- [x] File permissions correct
- [x] Security headers active
- [x] Rate limiting configured
- [x] Backups configured

### Important (Should Do)
- [ ] Monitoring setup
- [ ] Log rotation configured
- [ ] Queue workers (if needed)
- [ ] Redis caching
- [ ] Performance optimization
- [ ] Uptime monitoring

### Optional (Nice to Have)
- [ ] CDN for assets
- [ ] Load balancer
- [ ] Auto-scaling
- [ ] Advanced monitoring
- [ ] A/B testing

---

**Deployment Status:** ⏳ Pending  
**Last Deployed:** [Date]  
**Deployed By:** [Name]  
**Environment:** Production  
**Version:** 1.0.0
