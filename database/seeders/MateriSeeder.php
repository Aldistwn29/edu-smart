<?php

namespace Database\Seeders;

use App\Models\ClassRoom;
use App\Models\Material;
use App\Models\User;
use Illuminate\Database\Seeder;

class MateriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $guruMTK = User::where('email', 'matematika@edusmart.id')->first();
        $guruIPA = User::where('email', 'ipa@edusmart.id')->first();

        $kelasMTK = ClassRoom::where('teacher_id', $guruMTK->id ?? null)->first();
        $kelasIPA = ClassRoom::where('teacher_id', $guruIPA->id ?? null)->first();

        // Materi MTK
        if ($kelasMTK && $guruMTK) {
            $materiMTK = [
                ['title' => 'Aljabar Dasar', 'description' => 'Pintu awal untuk berkenalan dengan bilangan dan huruf sebagai pengganti angka.'],
                ['title' => 'Persamaan Linear Satu Variabel', 'description' => 'Bagaimana cara mencari nilai satu variabel yang belum diketahui.'],
                ['title' => 'Pertidaksamaan Linear', 'description' => 'Mempelajari bentuk tidak sama (kurang dari, lebih dari) pada aljabar.'],
                ['title' => 'Sistem Koordinat Kartesius', 'description' => 'Belajar posisi titik (x,y) pada grafik koordinat kartesius.'],
                ['title' => 'Persamaan Linear Dua Variabel', 'description' => 'Menyelesaikan sistem persamaan dengan metode substitusi dan eliminasi.'],
                ['title' => 'Teorema Pythagoras', 'description' => 'Rumus ajaib segitiga siku-siku dari dalil ilmuwan Pythagoras.'],
                ['title' => 'Lingkaran dan Unsur-unsurnya', 'description' => 'Mengenal jari-jari, diameter, luas, keliling tepi, dan busur lingkaran.'],
                ['title' => 'Bangun Ruang Sisi Datar', 'description' => 'Kenali kubus, balok, prisma, dan limas beserta jaring-jaring susunannya.'],
                ['title' => 'Statistika Dasar', 'description' => 'Mencari mean, median, modus dari sebuah data acak maupun data berkelompok.'],
                ['title' => 'Teori Peluang', 'description' => 'Seberapa besar kemungkinan sebuah dadu, kartu, atau koin muncul sisi tertentu.'],
            ];

            foreach ($materiMTK as $index => $mtk) {
                Material::create([
                    'class_id' => $kelasMTK->id,
                    'teacher_id' => $guruMTK->id,
                    'title' => $mtk['title'],
                    'description' => $mtk['description'],
                    'type' => 'text',
                    'content' => '<p>Ini adalah konten detail pembelajaran untuk materi <strong>'.$mtk['title'].'</strong>. Silahkan diskusikan materi ini dengan teman-teman di kelas.</p>',
                    'file_path' => null,
                    'order' => $index + 1,
                ]);
            }
        }

        // Materi IPA
        if ($kelasIPA && $guruIPA) {
            $materiIPA = [
                ['title' => 'Besaran dan Pengukuran Fisika', 'description' => 'Mengenal alat ukur seperti jangka sorong dan satuan standar internasional.'],
                ['title' => 'Klasifikasi Makhluk Hidup', 'description' => 'Mengapa hewan dan tumbuhan dikelompokkan berdasarkan familinya dan bagaimana caranya.'],
                ['title' => 'Zat dan Karakteristik Wujudnya', 'description' => 'Mengenal ciri-ciri fisik zat padat, zat cair, gas, dan proses perubahannya.'],
                ['title' => 'Suhu dan Pemuaian Benda', 'description' => 'Apa itu suhu, fungsi alat termometer, dan kondisi benda yang memuai akibat energi.'],
                ['title' => 'Kalor dan Perpindahan Suhu', 'description' => 'Konduksi, konveksi, dan radiasi panas dalam kehidupan sehari-hari kita.'],
                ['title' => 'Energi dalam Sistem Kehidupan (Biologi)', 'description' => 'Bagaimana tumbuhan bereproduksi dan hewan membakar energi untuk bertahan hidup.'],
                ['title' => 'Sistem Organisasi Kehidupan', 'description' => 'Dari organisme sel tunggal kecil hingga menjadi organisme makhluk utuh yang kompleks.'],
                ['title' => 'Ekosistem dan Interaksi Lingkungan', 'description' => 'Mengenal lebih dekat rantai makanan, ikatan simbiosis, dan jaring-jaring siklus alam.'],
                ['title' => 'Pencemaran Lingkungan', 'description' => 'Dampak limbah terhadap air, partikel racun udara, dan susunan nutrisi tanah di sekitar kita.'],
                ['title' => 'Pemanasan Global', 'description' => 'Bahaya laten efek rumah kaca dan anomali perubahan iklim yang terjadi di bumi belakangan ini.'],
            ];

            foreach ($materiIPA as $index => $ipa) {
                Material::create([
                    'class_id' => $kelasIPA->id,
                    'teacher_id' => $guruIPA->id,
                    'title' => $ipa['title'],
                    'description' => $ipa['description'],
                    'type' => 'text',
                    'content' => '<p>Ini adalah konten detail pembelajaran untuk materi <strong>'.$ipa['title'].'</strong>. Silahkan observasi materi ini dengan lingkungan sekitarmu.</p>',
                    'file_path' => null,
                    'order' => $index + 1,
                ]);
            }
        }
    }
}
