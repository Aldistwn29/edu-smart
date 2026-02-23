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
                'name' => 'Ai Somansi SPD',
                'email' => 'matematika@edusmart.id',
                'subject' => 'Matematika',
            ],
            [
                'name' => 'Asika Mekka SPD',
                'email' => 'ipa@edusmart.id',
                'subject' => 'IPA',
            ],
            [
                'name' => 'Burhanudin SPD',
                'email' => 'ips@edusmart.id',
                'subject' => 'IPS',
            ],
            [
                'name' => 'Drs. H. Asep Saepudin',
                'email' => 'bahasa@edusmart.id',
                'subject' => 'Bahasa Indonesia',
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
