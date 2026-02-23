import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Book, FileText, Plus, TrendingUp, User } from 'lucide-react';
export default function GuruDashboard({ stats, activities }) {
    const statItems = [
        {
            title: 'Total Siswa',
            value: stats.total_students.value,
            change: stats.total_students.change,
            icon: User,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
        {
            title: 'Total Materi',
            value: stats.total_subject.value,
            change: stats.total_subject.change,
            icon: Book,
            color: 'text-success',
            bgColor: 'bg-success/10',
        },
        {
            title: 'Quiz Dibuat',
            value: stats.total_quizzes.value,
            change: stats.total_quizzes.change,
            icon: FileText,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
        },
        {
            title: 'Rata-rata Nilai',
            value: stats.avg_score.value,
            change: stats.avg_score.change,
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
                        <Link href="#">
                            <Button variant="outline">
                                <FileText className="mr-2 h-4 w-4" />
                                Buat Quiz
                            </Button>
                        </Link>
                        <Link href="#">
                            <Button variant="default">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Materi
                            </Button>
                        </Link>
                    </div>
                </motion.div>
                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {statItems.map((stat, index) => (
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

                {/* Activitas Terbaru */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="overflow-hidden border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30 px-6 py-4">
                            <h2 className="text-lg font-bold">
                                Aktivitas Terbaru
                            </h2>
                            <Link href="#">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                >
                                    Lihat Semua
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent className="p-0">
                            {activities.length > 0 ? (
                                <div className="divide-y divide-border">
                                    {activities.map((activity, index) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 0.1 * index + 0.6,
                                            }}
                                            key={activity.id}
                                            className="group flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                                                <TrendingUp className="h-5 w-5" />
                                            </div>
                                            <div className="flex flex-1 flex-col">
                                                <span className="text-sm font-semibold text-foreground">
                                                    {activity.title}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {activity.subtitle}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-medium text-muted-foreground">
                                                    {activity.time}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="mb-4 rounded-full bg-muted p-4">
                                        <TrendingUp className="h-8 w-8 text-muted-foreground/50" />
                                    </div>
                                    <p className="text-muted-foreground">
                                        Belum ada aktivitas terbaru
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </DashboardLayout>
    );
}
