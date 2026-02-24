import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    ChevronRight,
    ClipboardCheck,
    GraduationCap,
    MessageSquare,
    PlayCircle,
    Timer,
} from 'lucide-react';

export default function SiswaDashboard({
    auth,
    stats,
    progress_belajar,
    quiz_terakhir,
}) {
    const kpiData = [
        {
            title: 'Materi Selesai',
            value: stats.materi_selesai,
            icon: BookOpen,
            color: 'text-blue-500',
        },
        {
            title: 'Quiz Dikerjakan',
            value: stats.quiz_dikerjakan,
            icon: ClipboardCheck,
            color: 'text-purple-500',
        },
        {
            title: 'Nilai Rata-rata',
            value: stats.nilai_rata_rata,
            icon: GraduationCap,
            color: 'text-emerald-500',
        },
        {
            title: 'Jam Belajar',
            value: stats.jam_belajar,
            icon: Timer,
            color: 'text-orange-500',
        },
    ];
    return (
        <DashboardLayout>
            <Head title="Dashboard Siswa" />
            <div className="space-y-8 pb-10">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">
                            Hallo Selamat Datang ,{' '}
                            <span className="text-primary">
                                {auth.user.name}
                            </span>
                        </h1>
                        <p className="font-medium text-muted-foreground">
                            Yuk Lanjutkan belajarmu hari ini!
                        </p>
                    </div>
                    <Link href="#">
                        <Button variant="outline" size="lg">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Tanya Mas Mas AI
                        </Button>
                    </Link>
                </div>
                {/* KPI Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {kpiData.map((item, i) => (
                        <Card
                            keys={i}
                            className="shadwo-md rounded-2xl border-none"
                        >
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-900">
                                        {item.title}
                                    </p>
                                    <p className="mt-1 text-2xl font-black text-slate-800">
                                        {item.value}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-slate-50 p-3">
                                    <item.icon
                                        className={`h-5 w-5 ${item.color}`}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {/* Main Content */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Left: Progress Belajar */}
                    <Card classNam="lg:col-span-1 border-none shadow-sm rounded-2xl p-4">
                        <div className="flex items-center justify-between p-6">
                            <h3 className="text-2xl text-slate-900">
                                Progress belajar
                            </h3>
                            <Link
                                href="#"
                                className="flex items-center text-xs font-semibold text-slate-900 transition-colors hover:text-primary"
                            >
                                Lihat Semua
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                        <CardContent className="space-y-8">
                            {progress_belajar.map((item) => (
                                <div key={item.id} className="space-y-3">
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-500">
                                                    {item.subject
                                                        .substring(0, 2)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900">
                                                        {item.subject}
                                                    </h4>
                                                    <span className="text-xs font-medium text-slate-500">
                                                        {item.last_activity}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-sm font-bold text-primary">
                                                {item.percentage}%
                                            </span>
                                        </div>
                                        <Progress
                                            value={item.percentage}
                                            className="h-3 bg-slate-100"
                                        />
                                    </div>
                                </div>
                            ))}
                            <Link href="#">
                                <Button
                                    className="mt-4 w-full"
                                    variant="outline"
                                >
                                    <PlayCircle className="mr-2 h-5 w-5 text-primary" />
                                    Lanjutkan Belajar
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                    {/* Right: Quiz Terakhir */}
                    <Card className="rounded-2xl border-none p-4 shadow-sm">
                        <div className="flex items-center justify-between p-6">
                            <h3 className="text-xl font-semibold text-slate-800">
                                Quiz terakhir
                            </h3>
                            <ChevronRight className="h-5 w-5 text-slate-800" />
                        </div>
                        <CardContent className="space-y-4">
                            {quiz_terakhir.length > 0 ? (
                                quiz_terakhir.map((quiz) => (
                                    <div
                                        key={quiz.id}
                                        className="group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-100 p-4 transition-all hover:border-primary/50 hover:bg-primary/5"
                                    >
                                        <div className="space-y-1">
                                            <h4 className="font-semibold text-slate-800 transition-colors group-hover:text-primary">
                                                {quiz.title}
                                            </h4>
                                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                                                {quiz.subject} • {quiz.date}
                                            </p>
                                        </div>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-primary/20 text-xs font-bold text-primary">
                                            {quiz.score}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="py-10 text-center text-sm text-muted-foreground">
                                    Belum ada quiz dikerjakan
                                </p>
                            )}

                            <div className="mt-6 space-y-4 rounded-2xl border border-primary/10 bg-primary/5 p-6">
                                <Link href="#">
                                    <p className="text-center text-sm font-semibold text-slate-700">
                                        Analisis Permorma belajar anda, tanya
                                        mas AI aja.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-4 w-full"
                                    >
                                        Tanya Mas AI
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
