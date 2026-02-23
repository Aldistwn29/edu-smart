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
                [
                    'title' => 'Aljabar Dasar',
                    'description' => 'Pintu awal untuk berkenalan dengan matematika. Tetap positif dan semangat ya!',
                    'order' => 1,
                ],
                [
                    'title' => 'Persamaan Linear Satu Variabel',
                    'description' => 'Mengenal variabel dan cara menyelesaikan persamaan linear sederhana.',
                    'order' => 2,
                ],
                [
                    'title' => 'Pertidaksamaan Linear',
                    'description' => 'Mempelajari hubungan ketidaksamaan dalam aljabar.',
                    'order' => 3,
                ],
                [
                    'title' => 'Sistem Koordinat Kartesius',
                    'description' => 'Cara menentukan posisi titik pada bidang koordinat.',
                    'order' => 4,
                ],
            ];

            foreach ($materiMTK as $mtk) {
                Material::create([
                    'class_id' => $kelasMTK->id,
                    'teacher_id' => $guruMTK->id,
                    'title' => $mtk['title'],
                    'description' => $mtk['description'],
                    'type' => 'text',
                    'file_path' => null,
                    'order' => $mtk['order'],
                ]);
            }
        }

        // Materi IPA
        if ($kelasIPA && $guruIPA) {
            Material::create([
                'class_id' => $kelasIPA->id,
                'teacher_id' => $guruIPA->id,
                'title' => 'Ekosistem',
                'description' => 'Materi ini sebenarnya ga ribet, cuman mengingatkan aja di sekitar kita ada apa aja dan bagaimana interaksinya, yuk kita pelajari bareng-bareng',
                'type' => 'text',
                'file_path' => null,
                'order' => 1,
            ]);
        }
    }
}
