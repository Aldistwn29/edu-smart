<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create guru
        $guru = [
            [
                'name' => 'Ai Somansi S.Pd',
                'email' => 'matematika@edusmart.id',
                'subject' => 'Matematika',
            ],
            [
                'name' => 'Asika Mekka S.Pd',
                'email' => 'ipa@edusmart.id',
                'subject' => 'IPA',
            ],
            [
                'name' => 'Burhanudin S.Pd',
                'email' => 'ips@edusmart.id',
                'subject' => 'IPS',
            ],
            [
                'name' => 'Drs. H. Asep Saepudin',
                'email' => 'bahasa@edusmart.id',
                'subject' => 'Bahasa Indonesia',
            ],
            [
                'name' => 'Siti Aminah S.Pd',
                'email' => 'biologi@edusmart.id',
                'subject' => 'Biologi',
            ],
            [
                'name' => 'Budi Santoso S.H',
                'email' => 'ppkn@edusmart.id',
                'subject' => 'PPKN',
            ],
            [
                'name' => 'Ust. Abdul Malik S.Ag',
                'email' => 'pai@edusmart.id',
                'subject' => 'PAI',
            ],
            [
                'name' => 'Neng Elis S.Pd',
                'email' => 'sunda@edusmart.id',
                'subject' => 'Bahasa Sunda',
            ],
        ];

        foreach ($guru as $g) {
            User::create([
                'name' => $g['name'],
                'email' => $g['email'],
                'password' => Hash::make('password123'),
                'role' => 'guru',
                'photo' => null,
            ]);
        }

        // create siswa
        User::create([
            'name' => 'Siswa',
            'email' => 'siswa@gmail.com',
            'password' => Hash::make('password123'),
            'role' => 'siswa',
            'photo' => null,
        ]);

        // create siswa dengan faktori
        // untuk membuat 10 siswa agar bisa testing
        User::factory(10)->create([
            'role' => 'siswa',
            'password' => Hash::make('password123'),
        ]);
    }
}
