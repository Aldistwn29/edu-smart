import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Calendar } from '@/Components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import DashbordLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { TabsContent } from '@radix-ui/react-tabs';
import {
    ArrowRight,
    BookOpen,
    CalendarIcon,
    CheckCircle2,
    ChevronLeft,
    Clock,
    Trophy,
    User,
} from 'lucide-react';
import { useState } from 'react';

export default function Show({
    classroom,
    materials = [],
    progressValue = 0,
    completedCount = 0,
    totalCount = 0,
}) {
    const [activeTab, setActiveTab] = useState('all');

    const [date, setDate] = useState(new Date());

    const filteredMaterials =
        activeTab === 'all'
            ? materials
            : materials.filter((m) => !m.progress?.[0]?.is_completed);

    return (
        <DashbordLayout>
            <Head title={`Kelas ${classroom.name}`} />
            <div className="pb-10 space-y-8 animate-fade-in">
                <div className="flex items-center">
                    <Link
                        href={route('siswa.classroom.index')}
                        className="flex items-center gap-2 text-sm font-semibold transition-colors group text-muted-foreground hover:text-primary"
                    >
                        <div className="flex items-center justify-center w-10 h-10 transition-all shadow-sm rounded-xl bg-card ring-1 ring-border/50 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
                            <ChevronLeft className="w-6 h-6" />
                        </div>
                        Kembali ke Daftar Kelas
                    </Link>
                </div>
                <Card className="relative overflow-hidden border-none rounded-lg shadow-lg gradient-card ring-1 ring-white/50">
                    <CardContent className="flex flex-col items-center justify-between gap-10 p-8 md:flex-row md:p-12">
                        <div className="flex-1 space-y-6 text-center md:text-left">
                            <Badge
                                variant="secondry"
                                className="px-4 py-2 text-xs font-bold tracking-wider uppercase border-none rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                            >
                                {classroom?.subject || 'Mata Pelajaran'}
                            </Badge>
                            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
                                {classroom?.name || 'Nama Kelas'}
                            </h1>
                            <p className="max-w-xl text-lg font-medium leading-relaxed text-muted-foreground">
                                {classroom?.description ||
                                    'Jelajahi modul pembelajaran interaktif dan asah kemampuanmu bersama AI Tutor di kelas ini.'}
                            </p>
                        </div>
                        {/* Progres tracking */}
                        <div className="w-full space-y-5 rounded-[2rem] bg-card p-8 ring-1 ring-border/50 md:w-80">
                            <div className="flex items-end justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                                        Your Mastery
                                    </p>
                                    <p className="text-3xl font-black text-foreground">
                                        {progressValue}%
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-warning/10 text-warning">
                                    <Trophy className="w-6 h-6" />
                                </div>
                            </div>
                            <Progress
                                value={progressValue}
                                className="h-3 bg-secondary"
                            />
                            <p className="text-sm italic font-bold text-center text-muted-foreground">
                                {progressValue === 100
                                    ? 'Luar biasa! Kamu sudah menguasai semuanya!'
                                    : '"Sedikit lagi S.Kom, Ayoo!"'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Daftar Materi */}
                    <div className="space-y-8 lg:col-span-8">
                        <Tabs
                            defaultValue="all"
                            onValueChange={setActiveTab}
                            className="w-full space-y-6"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight">
                                            Kurikulum Pembelajaran
                                        </h2>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {completedCount} / {totalCount}{' '}
                                            Materi Selesai
                                        </p>
                                    </div>
                                </div>
                                <div className="flex pb-2 overflow-x-auto no-scrollbar sm:pb-0">
                                    <TabsList className="h-12 p-1 rounded-full shadow-sm glass w-fit shrink-0 border-border/50">
                                        <TabsTrigger
                                            value="all"
                                            className="rounded-full px-6 text-sm font-bold transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                        >
                                            Semua
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="active"
                                            className="rounded-full px-6 text-sm font-bold transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                        >
                                            Belum Selesai
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                            </div>

                            <TabsContent
                                value={activeTab}
                                className="space-y-4 animate-fade-in-up"
                            >
                                {filteredMaterials.length > 0 ? (
                                    filteredMaterials.map((material) => {
                                        const isCompleted =
                                            material.progress?.[0]
                                                ?.is_completed;
                                        return (
                                            <Card
                                                key={material.id}
                                                className="group relative overflow-hidden rounded-[2.5rem] border-none bg-card shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-primary/5"
                                            >
                                                <div className="absolute top-0 right-0 w-32 h-32 transition-colors translate-x-16 -translate-y-16 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10" />
                                                <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center">
                                                    <div className="relative flex-shrink-0">
                                                        <div
                                                            className={`flex h-20 w-20 items-center justify-center rounded-3xl transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 ${isCompleted ? 'bg-success/10' : 'bg-secondary'}`}
                                                        >
                                                            {isCompleted ? (
                                                                <CheckCircle2 className="w-10 h-10 text-success" />
                                                            ) : (
                                                                <BookOpen className="w-10 h-10 text-primary" />
                                                            )}
                                                        </div>
                                                        {isCompleted && (
                                                            <div className="absolute w-5 h-5 border-4 rounded-full -bottom-1 -right-1 border-card bg-success" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 space-y-4">
                                                        <div className="space-y-2">
                                                            <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">
                                                                {material.title}
                                                            </h3>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-sm font-medium text-muted-foreground">
                                                                    {
                                                                        material.type
                                                                    }
                                                                </span>
                                                                <span className="w-1 h-1 rounded-full bg-border" />
                                                                <Badge
                                                                    variant="outline"
                                                                    className={`font-bold ${isCompleted ? 'border-success/20 bg-success/10 text-success' : 'border-primary/20 bg-primary/5 text-primary'}`}
                                                                >
                                                                    {isCompleted
                                                                        ? 'Lulus'
                                                                        : 'Sedang Dipelajari'}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                        {!isCompleted && (
                                                            <div className="space-y-2">
                                                                <div className="flex justify-between text-xs font-bold text-muted-foreground">
                                                                    <span>
                                                                        Kemajuan
                                                                        Belajar
                                                                    </span>
                                                                    <span>
                                                                        0%
                                                                    </span>
                                                                </div>
                                                                <Progress
                                                                    value={0}
                                                                    className="h-2 bg-secondary"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center justify-center flex-shrink-0 md:items-end">
                                                        <Link
                                                            href={route(
                                                                'siswa.materies.show',
                                                                material.id
                                                            )}
                                                            className="w-full md:w-auto"
                                                        >
                                                            <Button
                                                                className={`h-14 w-full gap-3 rounded-2xl px-6 font-bold shadow-lg transition-all md:w-auto ${isCompleted ? 'bg-secondary text-foreground hover:bg-muted' : 'bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/40 group-hover:translate-x-1'}`}
                                                            >
                                                                {isCompleted
                                                                    ? 'Lihat Kembali'
                                                                    : 'Lanjut Belajar'}
                                                                <ArrowRight className="w-5 h-5" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })
                                ) : (
                                    <div className="py-20 text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-muted">
                                            <BookOpen className="w-8 h-8 text-muted-foreground/50" />
                                        </div>
                                        <p className="text-lg font-bold text-foreground">
                                            Belum ada materi
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Materi akan muncul di sini setelah
                                            guru menambahkannya.
                                        </p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar / Info Tambahan */}
                    <div className="space-y-8 lg:col-span-4">
                        {/* Profile Section */}
                        <Card className="overflow-hidden border-none shadow-sm rounded-3xl bg-card ring-1 ring-border/50">
                            <div className="w-full gradient-hero h-28 opacity-90" />
                            <CardContent className="relative px-6 pb-8 text-center">
                                <div className="flex justify-center mb-4 -mt-14">
                                    <Avatar className="h-28 w-28 border-[6px] border-card shadow-2xl transition-transform duration-500 hover:rotate-3 hover:scale-105">
                                        <AvatarImage src="" />
                                        <AvatarFallback className="bg-secondary text-primary">
                                            <User className="w-12 h-12" />
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-2xl font-bold tracking-tight text-foreground">
                                        {classroom?.teacher?.name ||
                                            'Nama Guru'}
                                    </h4>
                                    <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                        Guru Pengampu
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-8 mt-8 border-t border-border/50">
                                    <div className="space-y-1 text-left">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                            Total Materi
                                        </p>
                                        <p className="text-lg font-black text-foreground">
                                            {totalCount} Modul
                                        </p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                            Siswa Terdaftar
                                        </p>
                                        <p className="text-lg font-black text-foreground">
                                            {classroom?.students_count || 0}{' '}
                                            Orang
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Jadwal Kelas */}
                        <Card className="overflow-hidden rounded-[2.5rem] border-none bg-card shadow-sm ring-1 ring-border/50">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-4 text-xl font-bold">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary">
                                        <CalendarIcon className="w-6 h-6" />
                                    </div>
                                    Jadwal Kelas
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="flex justify-center p-3 border-b">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="border-none rounded-md"
                                    />
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 mt-1 text-orange-600 bg-orange-100 shrink-0 rounded-xl">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-foreground">
                                                Sesi Video Konferensi
                                            </p>
                                            <p className="text-sm font-medium text-muted-foreground">
                                                Senin • 08.00 - 10.00 WIB
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 mt-1 text-blue-600 bg-blue-100 shrink-0 rounded-xl">
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-foreground">
                                                Diskusi Kelompok
                                            </p>
                                            <p className="text-sm font-medium text-muted-foreground">
                                                Rabu • 13.00 - 15.00 WIB
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full font-bold transition-all border-2 h-11 rounded-2xl hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                    >
                                        Lihat Semua Jadwal
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashbordLayout>
    );
}
