<?php

namespace Database\Seeders;

use App\Models\ClassRoom;
use App\Models\Quize;
use App\Models\QuizQuestions;
use App\Models\User;
use Illuminate\Database\Seeder;

class QuizesSeeder extends Seeder
{
    public function run(): void
    {
        $subjects = [
            'matematika@edusmart.id' => [
                'Aljabar Dasar', 'Persamaan Linear Satu Variabel', 'Pertidaksamaan Linear',
                'Sistem Koordinat Kartesius', 'Persamaan Linear Dua Variabel', 'Teorema Pythagoras',
                'Lingkaran dan Unsur-unsurnya', 'Bangun Ruang Sisi Datar', 'Statistika Dasar', 'Teori Peluang',
            ],
            'ipa@edusmart.id' => [
                'Besaran dan Pengukuran Fisika', 'Klasifikasi Materi dan Perubahannya', 'Zat dan Karakteristik Wujudnya',
                'Suhu dan Pemuaian Benda', 'Kalor dan Perpindahan Suhu', 'Energi dalam Sistem Kehidupan',
                'Sistem Organisasi Kehidupan', 'Ekosistem dan Interaksi Lingkungan', 'Pencemaran Lingkungan', 'Pemanasan Global',
            ],
            'ips@edusmart.id' => [
                'Keadaan Alam Indonesia', 'Dinamika Kependudukan', 'Kehidupan Sosial Masyarakat',
                'Kegiatan Ekonomi Dasar', 'Letak Geografis Indonesia', 'Interaksi Antar Ruang',
                'Peninggalan Sejarah Hindu-Buddha', 'Peninggalan Sejarah Islam', 'Interaksi Sosial', 'Lembaga Sosial',
            ],
            'biologi@edusmart.id' => [
                'Ciri-Ciri Makhluk Hidup', 'Klasifikasi Lima Kingdom', 'Mikroskop dan Sel',
                'Organisasi Kehidupan Tingkat Jaringan', 'Ekosistem Komponen Biotik Abiotik', 'Interaksi dalam Ekosistem',
                'Pencemaran Air dan Udara', 'Pemanasan Global (Perspektif Biologi)', 'Kepadatan Penduduk', 'Anatomi Tumbuhan Dasar',
            ],
            'ppkn@edusmart.id' => [
                'Perumusan Pancasila', 'Penetapan Pancasila', 'Norma dalam Masyarakat',
                'Keadilan dalam Kehidupan', 'Sejarah Perumusan UUD 1945', 'Pengesahan UUD 1945',
                'Semangat Pendiri Negara', 'Keberagaman SARA', 'Toleransi dalam Keberagaman', 'Kerja Sama dalam Berbagai Bidang',
            ],
            'pai@edusmart.id' => [
                'Iman Kepada Allah SWT', 'Beriman Kepada Malaikat', 'Shalat Fardhu dan Ketentuannya',
                'Shalat Berjamaah', 'Thaharah (Bersuci)', 'Kisah Keteladanan Nabi Muhammad SAW',
                'Berbakti Kepada Orang Tua (Birrul Walidain)', 'Kejujuran dan Amanah', 'Membaca Al-Qur\'an dengan Tajwid', 'Sejarah Masuknya Islam',
            ],
            'sunda@edusmart.id' => [
                'Paguneman', 'Kaulinan Barudak', 'Pupujian',
                'Pangalaman Pribadi', 'Dongeng Sunda', 'Sajak Sunda',
                'Biantara (Pidato)', 'Aksara Sunda', 'Sisindiran', 'Rumpaka Kawih',
            ],
        ];

        foreach ($subjects as $email => $topics) {
            $guru = User::query()->where('email', $email)->first();
            if (! $guru) {
                continue;
            }

            $kelas = ClassRoom::query()->where('teacher_id', $guru->id)->first();
            if (! $kelas) {
                continue;
            }

            foreach ($topics as $index => $topic) {
                $quiz = Quize::create([
                    'class_id' => $kelas->id,
                    'teacher_id' => $guru->id,
                    'title' => 'Quiz '.($index + 1).': '.$topic,
                    'description' => "Uji pemahamanmu tentang materi $topic. Kerjakan dengan jujur!",
                    'duration_minutes' => 60,
                    'deadline' => now()->addDays(rand(3, 10)),
                ]);

                // Create dummy questions for each quiz
                QuizQuestions::create([
                    'quize_id' => $quiz->id,
                    'question' => "Pertanyaan Pilihan Ganda tentang $topic?",
                    'type' => 'multiple_choice',
                    'options' => ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
                    'answer' => 'Opsi A',
                    'points' => 50,
                    'order' => 1,
                ]);

                QuizQuestions::create([
                    'quize_id' => $quiz->id,
                    'question' => "Pernyataan ini benar terkait dengan $topic?",
                    'type' => 'true_false',
                    'options' => ['Benar', 'Salah'],
                    'answer' => 'Benar',
                    'points' => 50,
                    'order' => 2,
                ]);
            }
        }
    }
}
