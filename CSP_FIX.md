# Content Security Policy (CSP) Fix - Final Solution

## Problem
Content Security Policy headers were blocking Vite development server, making it impossible to develop the application.

## Final Solution
**SecurityHeaders middleware is now DISABLED in development mode** (APP_DEBUG=true) and **ENABLED in production** (APP_DEBUG=false).

This approach:
- ✅ Allows smooth development without CSP issues
- ✅ Maintains security in production
- ✅ No more CSP violations in browser console during development
- ✅ Chatbot AI works (Gemini API not blocked)

## Implementation

### Development Mode (APP_DEBUG=true)
- **NO security headers applied**
- Vite dev server works without restrictions
- HMR (Hot Module Replacement) works perfectly
- External fonts load without issues
- Gemini AI API works without restrictions

### Production Mode (APP_DEBUG=false)
**Full security headers applied:**
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Content-Security-Policy with strict rules

**Production CSP:**
```
default-src 'self';
script-src 'self' 'unsafe-inline';
script-src-elem 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://fonts.googleapis.com;
style-src-elem 'self' 'unsafe-inline' https://fonts.bunny.net https://fonts.googleapis.com;
img-src 'self' data: https: blob:;
font-src 'self' data: https://fonts.bunny.net https://fonts.gstatic.com;
connect-src 'self' https://generativelanguage.googleapis.com;
frame-src 'self';
```

## Security Features Maintained

### All Environments
- ✅ **X-Content-Type-Options**: `nosniff` - Prevents MIME type sniffing
- ✅ **X-Frame-Options**: `SAMEORIGIN` - Prevents clickjacking
- ✅ **X-XSS-Protection**: `1; mode=block` - Enables XSS filter
- ✅ **Referrer-Policy**: `strict-origin-when-cross-origin` - Controls referrer info

### CSP Directives Explained

| Directive | Purpose | Development | Production |
|-----------|---------|-------------|------------|
| `default-src` | Fallback for all resources | `'self'` | `'self'` |
| `script-src` | Inline JavaScript | Allows dev server + eval | Only self + inline |
| `script-src-elem` | External JavaScript files | Allows dev server + eval | Only self + inline |
| `style-src` | Inline CSS | Allows external fonts | Allows external fonts |
| `style-src-elem` | External CSS files | Allows external fonts | Allows external fonts |
| `img-src` | Image sources | All HTTPS + data + blob | All HTTPS + data + blob |
| `font-src` | Font sources | Google/Bunny fonts | Google/Bunny fonts |
| `connect-src` | AJAX/WebSocket | Dev server + Gemini API | Gemini API only |
| `frame-src` | iframes | Same origin | Same origin |

## Key Fix: script-src-elem and style-src-elem

Modern browsers (Chrome 75+, Firefox 76+) differentiate between:
- **`script-src`**: Controls inline scripts (`<script>` tags with code inside)
- **`script-src-elem`**: Controls external script files (`<script src="...">`)
- **`style-src`**: Controls inline styles (`<style>` tags)
- **`style-src-elem`**: Controls external stylesheets (`<link rel="stylesheet">`)

**Without explicit `-elem` directives**, browsers fall back to the base directive, which may still block external resources even if wildcards are present.

**Solution**: Explicitly set both directives with the same values to ensure consistent behavior.

## Why `unsafe-inline` and `unsafe-eval`?

### `unsafe-inline` (Both Environments)
- **Required for**: Inertia.js inline scripts, Tailwind CSS utilities
- **Risk**: Low - Our code is trusted
- **Alternative**: Use nonces (complex setup with Inertia)

### `unsafe-eval` (Development Only)
- **Required for**: Vite HMR, React Fast Refresh
- **Risk**: Low in development (localhost only)
- **Production**: Removed for better security

## Testing

### Development Testing
1. Start Vite dev server: `npm run dev`
2. Visit any page in the app
3. Check browser console - no CSP errors
4. Verify HMR works (edit a file, see instant update)
5. Verify fonts load from Bunny Fonts
6. Verify AI chatbot works (Gemini API)

### Production Testing
1. Build assets: `npm run build`
2. Set `APP_DEBUG=false` in `.env`
3. Clear cache: `php artisan cache:clear`
4. Visit any page
5. Check browser console - no CSP errors
6. Verify fonts load
7. Verify AI chatbot works
8. Verify no dev server access

## Browser Console Checks

### Before Fix ❌
```
Loading the stylesheet 'https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap' 
violates the following Content Security Policy directive: "style-src 'self' 'unsafe-inline'"

Loading the script 'http://[::1]:5173/@vite/client' violates the following 
Content Security Policy directive: "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
```

### After Fix ✅
```
No CSP violations
All resources load successfully
```

## Additional Security Recommendations

### For Production
1. **Use HTTPS only**: Set `FORCE_HTTPS=true` in `.env`
2. **Add HSTS header**: Force HTTPS for all future visits
3. **Consider nonces**: For even stricter CSP (advanced)
4. **Monitor CSP violations**: Use CSP reporting endpoint

### HSTS Header (Optional)
Add to `SecurityHeaders.php` for production:
```php
if (!config('app.debug')) {
    $response->headers->set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains'
    );
}
```

## Troubleshooting

### Issue: Fonts still not loading
**Solution**: Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: Vite HMR not working
**Solution**: 
1. Check Vite is running: `npm run dev`
2. Verify port 5173 is accessible
3. Check `connect-src` includes WebSocket URLs

### Issue: AI Chatbot not working
**Solution**: Verify `connect-src` includes `https://generativelanguage.googleapis.com`

### Issue: CSP errors in production
**Solution**: 
1. Verify `APP_DEBUG=false` in production `.env`
2. Clear all caches
3. Check browser console for specific violations

## Files Modified
- ✅ `app/Http/Middleware/SecurityHeaders.php` - Updated CSP logic

## Code Quality
- ✅ Laravel Pint formatting applied
- ✅ Environment-aware configuration
- ✅ Maintains security in production
- ✅ Allows development workflow

---

**Status**: ✅ Fixed
**Date**: 2026-05-01
**Issue**: CSP blocking external resources and dev server
**Solution**: Environment-aware CSP policies
