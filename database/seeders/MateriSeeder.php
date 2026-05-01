<?php

namespace Database\Seeders;

use App\Models\ClassRoom;
use App\Models\Material;
use App\Models\User;
use Illuminate\Database\Seeder;

class MateriSeeder extends Seeder
{
    public function run(): void
    {
        $subjects = [
            'matematika@edusmart.id' => [
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
            ],
            'ipa@edusmart.id' => [
                ['title' => 'Besaran dan Pengukuran Fisika', 'description' => 'Mengenal alat ukur seperti jangka sorong dan satuan standar internasional.'],
                ['title' => 'Klasifikasi Materi dan Perubahannya', 'description' => 'Unsur, senyawa, campuran, serta perubahan fisika dan kimia.'],
                ['title' => 'Zat dan Karakteristik Wujudnya', 'description' => 'Mengenal ciri-ciri fisik zat padat, zat cair, gas, dan proses perubahannya.'],
                ['title' => 'Suhu dan Pemuaian Benda', 'description' => 'Apa itu suhu, fungsi alat termometer, dan kondisi benda yang memuai akibat energi.'],
                ['title' => 'Kalor dan Perpindahan Suhu', 'description' => 'Konduksi, konveksi, dan radiasi panas dalam kehidupan sehari-hari kita.'],
                ['title' => 'Energi dalam Sistem Kehidupan', 'description' => 'Transformasi energi pada makhluk hidup dan fotosintesis.'],
                ['title' => 'Sistem Organisasi Kehidupan', 'description' => 'Dari organisme sel tunggal kecil hingga menjadi organisme makhluk utuh yang kompleks.'],
                ['title' => 'Ekosistem dan Interaksi Lingkungan', 'description' => 'Mengenal rantai makanan, jaring-jaring makanan dan pola interaksi alam.'],
                ['title' => 'Pencemaran Lingkungan', 'description' => 'Dampak limbah terhadap air, partikel racun udara, dan tanah di sekitar kita.'],
                ['title' => 'Pemanasan Global', 'description' => 'Bahaya laten efek rumah kaca dan anomali perubahan iklim yang terjadi di bumi belakangan ini.'],
            ],
            'ips@edusmart.id' => [
                ['title' => 'Keadaan Alam Indonesia', 'description' => 'Kondisi fisik wilayah Indonesia dan pengaruhnya.'],
                ['title' => 'Dinamika Kependudukan', 'description' => 'Pertumbuhan, persebaran, dan kualitas penduduk Indonesia.'],
                ['title' => 'Kehidupan Sosial Masyarakat', 'description' => 'Nilai dan norma yang berlaku di masyarakat Indonesia.'],
                ['title' => 'Kegiatan Ekonomi Dasar', 'description' => 'Produksi, distribusi, dan konsumsi dalam memenuhi kebutuhan.'],
                ['title' => 'Letak Geografis Indonesia', 'description' => 'Pengaruh letak astronomis dan geografis bagi Indonesia.'],
                ['title' => 'Interaksi Antar Ruang', 'description' => 'Perpindahan barang, jasa, dan manusia antar wilayah.'],
                ['title' => 'Peninggalan Sejarah Hindu-Buddha', 'description' => 'Candi, prasasti, dan kerajaan masa Hindu-Buddha di Nusantara.'],
                ['title' => 'Peninggalan Sejarah Islam', 'description' => 'Kerajaan Islam, masjid kuno, dan penyebaran Islam di Indonesia.'],
                ['title' => 'Interaksi Sosial', 'description' => 'Syarat, bentuk, dan proses terjadinya interaksi sosial.'],
                ['title' => 'Lembaga Sosial', 'description' => 'Fungsi lembaga keluarga, agama, ekonomi, pendidikan, dan politik.'],
            ],
            'biologi@edusmart.id' => [
                ['title' => 'Ciri-Ciri Makhluk Hidup', 'description' => 'Bernapas, bergerak, tumbuh, berkembang biak, dan peka terhadap rangsang.'],
                ['title' => 'Klasifikasi Lima Kingdom', 'description' => 'Monera, Protista, Fungi, Plantae, dan Animalia.'],
                ['title' => 'Mikroskop dan Sel', 'description' => 'Cara menggunakan mikroskop dan mengenal bagian-bagian sel.'],
                ['title' => 'Organisasi Kehidupan Tingkat Jaringan', 'description' => 'Jaringan penyusun tubuh hewan dan tumbuhan.'],
                ['title' => 'Ekosistem Komponen Biotik Abiotik', 'description' => 'Hubungan timbal balik antara makhluk hidup dengan lingkungannya.'],
                ['title' => 'Interaksi dalam Ekosistem', 'description' => 'Simbiosis mutualisme, komensalisme, parasitisme, dan predasi.'],
                ['title' => 'Pencemaran Air dan Udara', 'description' => 'Indikator pencemaran biologis dan dampaknya bagi kesehatan.'],
                ['title' => 'Pemanasan Global (Perspektif Biologi)', 'description' => 'Dampak perubahan iklim terhadap kepunahan spesies dan habitat.'],
                ['title' => 'Kepadatan Penduduk', 'description' => 'Hubungan kepadatan penduduk dengan ketersediaan air bersih dan udara segar.'],
                ['title' => 'Anatomi Tumbuhan Dasar', 'description' => 'Akar, batang, daun, bunga, dan fungsinya dalam kelangsungan hidup tumbuhan.'],
            ],
            'ppkn@edusmart.id' => [
                ['title' => 'Perumusan Pancasila', 'description' => 'Sejarah sidang BPUPKI dalam merumuskan dasar negara.'],
                ['title' => 'Penetapan Pancasila', 'description' => 'Proses pengesahan Pancasila oleh PPKI pada 18 Agustus 1945.'],
                ['title' => 'Norma dalam Masyarakat', 'description' => 'Norma agama, kesusilaan, kesopanan, dan hukum.'],
                ['title' => 'Keadilan dalam Kehidupan', 'description' => 'Arti penting keadilan dan penegakan hukum di Indonesia.'],
                ['title' => 'Sejarah Perumusan UUD 1945', 'description' => 'Latar belakang penyusunan konstitusi pertama Republik Indonesia.'],
                ['title' => 'Pengesahan UUD 1945', 'description' => 'Sistematika UUD 1945 sebelum dan sesudah amandemen (pengenalan awal).'],
                ['title' => 'Semangat Pendiri Negara', 'description' => 'Meneladani nilai juang pahlawan dalam kehidupan sehari-hari.'],
                ['title' => 'Keberagaman SARA', 'description' => 'Suku, Agama, Ras, dan Antargolongan dalam bingkai Bhinneka Tunggal Ika.'],
                ['title' => 'Toleransi dalam Keberagaman', 'description' => 'Sikap saling menghargai dan menghormati antar sesama warga negara.'],
                ['title' => 'Kerja Sama dalam Berbagai Bidang', 'description' => 'Gotong royong dalam kehidupan bermasyarakat, berbangsa, dan bernegara.'],
            ],
            'pai@edusmart.id' => [
                ['title' => 'Iman Kepada Allah SWT', 'description' => 'Mengenal Asmaul Husna dan sifat-sifat wajib Allah.'],
                ['title' => 'Beriman Kepada Malaikat', 'description' => 'Nama-nama malaikat beserta tugasnya masing-masing.'],
                ['title' => 'Shalat Fardhu dan Ketentuannya', 'description' => 'Syarat sah, rukun, dan sunnah dalam ibadah shalat wajib.'],
                ['title' => 'Shalat Berjamaah', 'description' => 'Keutamaan, tata cara, syarat imam dan makmum dalam shalat berjamaah.'],
                ['title' => 'Thaharah (Bersuci)', 'description' => 'Tata cara wudhu, mandi wajib, dan tayamum yang benar menurut syariat.'],
                ['title' => 'Kisah Keteladanan Nabi Muhammad SAW', 'description' => 'Sifat sidiq, amanah, tabligh, dan fathonah rasulullah.'],
                ['title' => 'Berbakti Kepada Orang Tua (Birrul Walidain)', 'description' => 'Adab dan kewajiban anak terhadap ibu dan bapak.'],
                ['title' => 'Kejujuran dan Amanah', 'description' => 'Penerapan akhlak terpuji dalam kehidupan sehari-hari.'],
                ['title' => 'Membaca Al-Qur\'an dengan Tajwid', 'description' => 'Hukum bacaan Nun Sukun, Tanwin, dan Mim Sukun.'],
                ['title' => 'Sejarah Masuknya Islam', 'description' => 'Perjuangan Rasulullah periode Makkah dan ketabahannya.'],
            ],
            'sunda@edusmart.id' => [
                ['title' => 'Paguneman', 'description' => 'Tata krama bercakap-cakap atau berdialog dalam bahasa Sunda sehari-hari.'],
                ['title' => 'Kaulinan Barudak', 'description' => 'Mengenal permainan tradisional Sunda seperti oray-orayan, gatrik, dan congklak.'],
                ['title' => 'Pupujian', 'description' => 'Bentuk puisi buhun Sunda yang isinya berupa pepatah atau doa keagamaan.'],
                ['title' => 'Pangalaman Pribadi', 'description' => 'Cara menceritakan pengalaman pribadi menggunakan kalimat yang runtut.'],
                ['title' => 'Dongeng Sunda', 'description' => 'Dongeng sasakala (legenda), fabel, dan pamuk dalam sastra Sunda.'],
                ['title' => 'Sajak Sunda', 'description' => 'Membaca, memahami, dan memparafrasekan puisi modern Sunda.'],
                ['title' => 'Biantara (Pidato)', 'description' => 'Struktur dan teknik menyampaikan pidato (biantara) dengan sopan.'],
                ['title' => 'Aksara Sunda', 'description' => 'Mengenal huruf Ngalagena, Vokal Mandiri, dan Rarangken.'],
                ['title' => 'Sisindiran', 'description' => 'Paparikan, rarakitan, dan wawangsalan (sejenis pantun ala Sunda).'],
                ['title' => 'Rumpaka Kawih', 'description' => 'Lirik lagu-lagu tradisional Sunda dan makna kiasan di dalamnya.'],
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
                Material::create([
                    'class_id' => $kelas->id,
                    'teacher_id' => $guru->id,
                    'title' => $topic['title'],
                    'description' => $topic['description'],
                    'type' => 'text',
                    'file_path' => null,
                    'order' => $index + 1,
                ]);
            }
        }
    }
}
