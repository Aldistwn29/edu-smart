<?php

namespace Database\Seeders;

use App\Models\Assigment;
use App\Models\ClassRoom;
use Illuminate\Database\Seeder;

class AssigmentMateriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classrooms = ClassRoom::with('teacher')->get();

        foreach ($classrooms as $kelas) {
            if (! $kelas->teacher) {
                continue;
            }

            $subject = $kelas->subject;

            // Variasi tugas berdasarkan mata pelajaran
            $title = "Tugas $subject";
            $description = "Ini adalah tugas wajib untuk mata pelajaran $subject. Silakan kerjakan dengan baik dan kumpulkan tepat waktu.";

            if ($subject === 'Matematika') {
                $title = 'Aljabar Linear';
                $description = 'Latihan soal doang jangan overthiking banyak ko sumber di internet, yang penting usahanya jawaban nanti kita diskusikan';
            } elseif ($subject === 'IPA') {
                $title = 'Ekosistem';
                $description = 'Jangan stress dulu, ini cuman mengamati hal-hal yang ada disekitarmu (sawah, kebun, sungai, dll) dan ceritakan penemuan anda di kelas';
            } elseif ($subject === 'IPS') {
                $title = 'Sejarah Kemerdekaan';
                $description = 'Buatlah ringkasan tentang peristiwa proklamasi kemerdekaan Indonesia beserta tokoh-tokoh yang terlibat.';
            } elseif ($subject === 'Bahasa Indonesia') {
                $title = 'Menulis Puisi';
                $description = 'Buatlah sebuah puisi bertema alam atau lingkungan sekitar. Minimal 4 bait.';
            } elseif ($subject === 'Biologi') {
                $title = 'Sel dan Fungsinya';
                $description = 'Gambarkan struktur sel hewan dan tumbuhan beserta penjelasan fungsi masing-masing organel.';
            } elseif ($subject === 'PPKN') {
                $title = 'Penerapan Pancasila';
                $description = 'Sebutkan contoh penerapan sila ke-3 dalam kehidupan sehari-hari di sekolah dan masyarakat.';
            } elseif ($subject === 'PAI') {
                $title = 'Hafalan Surat Pendek';
                $description = 'Kirimkan video hafalan Surat Al-Lahab beserta artinya.';
            } elseif ($subject === 'Bahasa Sunda') {
                $title = 'Ngarang Carpon';
                $description = 'Pangdamelkeun hiji carpon basa Sunda anu temana ngeunaan kagiatan sapopoe di sakola.';
            }

            Assigment::create([
                'class_id' => $kelas->id,
                'teacher_id' => $kelas->teacher_id,
                'title' => $title,
                'description' => $description,
                'deadline' => now()->addDays(rand(3, 7)),
            ]);
        }
    }
}
