<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SecureFileUpload implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! $value || ! is_object($value) || ! method_exists($value, 'isValid')) {
            $fail('File tidak valid.');

            return;
        }

        // Check if file upload was successful
        if (! $value->isValid()) {
            $fail('Upload file gagal.');

            return;
        }

        // Check file extension
        $allowedExtensions = ['pdf', 'doc', 'docx', 'zip'];
        $extension = strtolower($value->getClientOriginalExtension());

        if (! in_array($extension, $allowedExtensions)) {
            $fail('File harus berformat: '.implode(', ', $allowedExtensions));

            return;
        }

        // Check MIME type (more secure than extension)
        $allowedMimes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/zip',
            'application/x-zip-compressed',
        ];

        if (! in_array($value->getMimeType(), $allowedMimes)) {
            $fail('Tipe file tidak valid.');

            return;
        }

        // Check file content (magic bytes) for extra security
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $value->getRealPath());
        finfo_close($finfo);

        if (! in_array($mimeType, $allowedMimes)) {
            $fail('Konten file tidak sesuai dengan ekstensi.');

            return;
        }
    }
}
