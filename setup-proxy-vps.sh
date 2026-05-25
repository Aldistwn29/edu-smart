#!/bin/bash

###############################################################################
# Setup Squid Proxy untuk Gemini API
# Jalankan script ini di VPS Singapore/Tokyo/US
###############################################################################

echo "=========================================="
echo "Setup Squid Proxy untuk Gemini API"
echo "=========================================="
echo ""

# Cek apakah running sebagai root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Script ini harus dijalankan sebagai root"
    echo "Gunakan: sudo bash setup-proxy-vps.sh"
    exit 1
fi

# Update system
echo "📦 Updating system..."
apt update -y
apt upgrade -y

# Install Squid
echo "📦 Installing Squid proxy..."
apt install squid apache2-utils -y

# Backup config original
cp /etc/squid/squid.conf /etc/squid/squid.conf.backup

# Minta input IP VPS Indonesia
echo ""
echo "=========================================="
read -p "Masukkan IP VPS Indonesia Anda: " INDONESIA_IP
echo "=========================================="
echo ""

# Minta username & password untuk auth
read -p "Username untuk proxy (default: edusmart): " PROXY_USER
PROXY_USER=${PROXY_USER:-edusmart}

read -sp "Password untuk proxy: " PROXY_PASS
echo ""

# Buat password file
htpasswd -bc /etc/squid/passwd "$PROXY_USER" "$PROXY_PASS"

# Buat konfigurasi Squid
cat > /etc/squid/squid.conf << EOF
# Port proxy
http_port 3128

# Authentication
auth_param basic program /usr/lib/squid/basic_ncsa_auth /etc/squid/passwd
auth_param basic realm Proxy Authentication Required
auth_param basic credentialsttl 2 hours

# ACL untuk authentication
acl authenticated proxy_auth REQUIRED

# ACL untuk IP whitelist (optional, sebagai backup)
acl allowed_ips src $INDONESIA_IP/32

# Allow authenticated users atau IP whitelist
http_access allow authenticated
http_access allow allowed_ips
http_access deny all

# Cache settings (optional)
cache_dir ufs /var/spool/squid 100 16 256
maximum_object_size 4096 KB

# Logging
access_log /var/log/squid/access.log squid
cache_log /var/log/squid/cache.log

# Forwarding
forwarded_for delete
via off

# DNS
dns_nameservers 8.8.8.8 8.8.4.4
EOF

# Buat cache directory
squid -z

# Restart Squid
systemctl restart squid
systemctl enable squid

# Setup firewall
echo "🔥 Configuring firewall..."
ufw allow 3128/tcp
ufw allow 22/tcp
ufw --force enable

# Test Squid
if systemctl is-active --quiet squid; then
    echo ""
    echo "=========================================="
    echo "✅ Squid Proxy berhasil diinstall!"
    echo "=========================================="
    echo ""
    echo "📝 Informasi Proxy:"
    echo "   IP: $(curl -s ifconfig.me)"
    echo "   Port: 3128"
    echo "   Username: $PROXY_USER"
    echo "   Password: [hidden]"
    echo ""
    echo "🔧 Konfigurasi Laravel (.env):"
    echo "   GEMINI_PROVIDER=google"
    echo "   GEMINI_API_KEY=your-google-api-key"
    echo "   GEMINI_PROXY=http://$PROXY_USER:$PROXY_PASS@$(curl -s ifconfig.me):3128"
    echo ""
    echo "📊 Monitoring:"
    echo "   Status: systemctl status squid"
    echo "   Logs: tail -f /var/log/squid/access.log"
    echo ""
else
    echo "❌ Squid gagal start. Cek logs:"
    echo "   journalctl -u squid -n 50"
fi
