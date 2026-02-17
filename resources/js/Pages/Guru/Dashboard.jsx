import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Book, FileText, Plus, TrendingUp, User } from 'lucide-react';
export default function GuruDashboard() {
    const stats = [
        {
            title: 'Total Siswa',
            value: '150',
            change: '+ 12 Bulan ini',
            icon: User,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
        {
            title: 'Total Materi',
            value: '10',
            change: '+5 Minggu ini',
            icon: Book,
            color: 'text-success',
            bgColor: 'bg-success/10',
        },
        {
            title: 'Rata-rata Nilai',
            value: '80',
            change: '+2.3 dari sebelumnya',
            icon: TrendingUp,
            color: 'text-warning',
            bgColor: 'bg-warning/10',
        },
    ];
    return (
        <DashboardLayout>
            <Head title="Dashboard Guru" />
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                >
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard Guru</h1>
                        <p className="text-muted-foregroun">
                            Selamat datang kembali! Berikut ringkasan aktivitas
                            kelas Anda.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Buat Quiz
                        </Button>
                        <Button variant="default">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Materi
                        </Button>
                    </div>
                </motion.div>
                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (index + 1) }}
                            className="rounded-lg bg-white p-4 shadow"
                            key={index}
                        >
                            <Card className="transition-shadow hover:shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                {stat.title}
                                            </p>
                                            <p className="mt-1 text-3xl font-bold">
                                                {stat.value}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {stat.change}
                                            </p>
                                        </div>
                                        <div
                                            className={`rounded-xl p-3 ${stat.bgColor}`}
                                        >
                                            <stat.icon
                                                className={`h-6 w-6 ${stat.color}`}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </DashboardLayout>
    );
}
