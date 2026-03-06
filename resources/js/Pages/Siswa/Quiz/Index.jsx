import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    Calendar,
    Clock,
    GraduationCap,
    List,
    SearchX,
    User,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';

export default function QuizIndex({ quizzes = { data: [] }, stats }) {
    const [activeTab, setActiveTab] = useState('Semua');

    // Logic Filter Client-side agar UX instan
    const filteredQuizzes = useMemo(() => {
        return (quizzes.data || []).filter((quiz) => {
            if (activeTab === 'Semua') return true;
            if (activeTab === 'Tersedia')
                return quiz.status !== 'selesai' && !quiz.is_overdue;
            if (activeTab === 'Selesai') return quiz.status === 'selesai';
            if (activeTab === 'Terlewat')
                return quiz.status !== 'selesai' && quiz.is_overdue;
            return true;
        });
    }, [activeTab, quizzes]);

    return (
        <DashboardLayout>
            <Head title="Quiz Saya" />

            <div className="animate-fade-in space-y-8 pb-10">
                {/* Header Section */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Quiz Saya
                    </h1>
                    <p className="tracking-tight text-muted-foreground">
                        Kelola dan kerjakan tugas kuis Anda di sini.
                    </p>
                </div>

                {/* Tab Navigation - Scrollable on Mobile */}
                <div className="no-scrollbar flex gap-8 overflow-x-auto border-b border-border">
                    {['Semua', 'Tersedia', 'Selesai', 'Terlewat'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative whitespace-nowrap pb-4 text-sm font-semibold transition-all ${
                                activeTab === tab
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 animate-scale-in bg-primary" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Stats Cards Section */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                    <Card className="rounded-[1.25rem] border-border shadow-sm transition-shadow hover:shadow-md">
                        <CardContent className="flex items-center gap-5 p-6">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <GraduationCap size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                    Selesai
                                </p>
                                <p className="text-2xl font-extrabold">
                                    {stats?.total_selesai || 0}{' '}
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Items
                                    </span>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[1.25rem] border-border shadow-sm transition-shadow hover:shadow-md">
                        <CardContent className="flex items-center gap-5 p-6">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10 text-success">
                                <BookOpen size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                    Rata-rata
                                </p>
                                <p className="text-2xl font-extrabold">
                                    {stats?.rata_rata || 0}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[1.25rem] border-border shadow-sm transition-shadow hover:shadow-md sm:col-span-2 lg:col-span-1">
                        <CardContent className="flex items-center gap-5 p-6">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/10 text-warning">
                                <Clock size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                    Mendatang
                                </p>
                                <p className="text-2xl font-extrabold">
                                    {stats?.mendatang || 0}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Daftar Quiz Container */}
                <Card className="overflow-hidden rounded-[2rem] border-border bg-card shadow-sm">
                    <CardContent className="p-6 md:p-8">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="rounded-xl bg-muted p-2.5 text-muted-foreground">
                                <List size={22} />
                            </div>
                            <h2 className="text-xl font-bold">Daftar Quiz</h2>
                        </div>

                        <div className="space-y-4">
                            {filteredQuizzes.length > 0 ? (
                                filteredQuizzes.map((quiz) => (
                                    <Card
                                        key={quiz.id}
                                        className="group overflow-hidden rounded-2xl border-border shadow-none transition-all hover:border-primary/50 hover:bg-muted/30"
                                    >
                                        <CardContent className="p-4 md:p-6">
                                            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                                                <div className="flex w-full items-center gap-4 md:gap-6">
                                                    {/* Thumbnail Placeholder - Hidden on mobile for space */}
                                                    <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted transition-colors group-hover:bg-card sm:flex md:h-20 md:w-20">
                                                        <BookOpen className="h-8 w-8 text-muted-foreground/40" />
                                                    </div>

                                                    <div className="min-w-0 flex-1 space-y-3">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <h3 className="max-w-[200px] truncate text-lg font-bold tracking-tight text-foreground md:max-w-full">
                                                                {quiz.title}
                                                            </h3>

                                                            <Badge
                                                                variant={
                                                                    quiz.status ===
                                                                    'selesai'
                                                                        ? 'success'
                                                                        : 'secondary'
                                                                }
                                                                className="px-2 py-0.5 text-[9px] font-bold uppercase"
                                                            >
                                                                {quiz.status ===
                                                                'selesai'
                                                                    ? 'Sudah dinilai'
                                                                    : 'Belum dikerjakan'}
                                                            </Badge>

                                                            {quiz.is_urgent &&
                                                                quiz.status !==
                                                                    'selesai' && (
                                                                    <Badge
                                                                        variant="destructive"
                                                                        className="animate-pulse px-2 py-0.5 text-[9px] font-bold uppercase"
                                                                    >
                                                                        Segera
                                                                        Berakhir
                                                                    </Badge>
                                                                )}
                                                        </div>

                                                        {/* Metadata Row */}
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            {[
                                                                {
                                                                    icon: (
                                                                        <BookOpen
                                                                            size={
                                                                                12
                                                                            }
                                                                        />
                                                                    ),
                                                                    text: quiz.mapel,
                                                                },
                                                                {
                                                                    icon: (
                                                                        <User
                                                                            size={
                                                                                12
                                                                            }
                                                                        />
                                                                    ),
                                                                    text: quiz.guru,
                                                                },
                                                                {
                                                                    icon: (
                                                                        <List
                                                                            size={
                                                                                12
                                                                            }
                                                                        />
                                                                    ),
                                                                    text: `${quiz.jumlah_soal} Soal`,
                                                                },
                                                                {
                                                                    icon: (
                                                                        <Calendar
                                                                            size={
                                                                                12
                                                                            }
                                                                        />
                                                                    ),
                                                                    text:
                                                                        quiz.status ===
                                                                        'selesai'
                                                                            ? `Skor: ${quiz.score}/100`
                                                                            : quiz.deadline,
                                                                    highlight:
                                                                        quiz.is_urgent &&
                                                                        quiz.status !==
                                                                            'selesai',
                                                                },
                                                            ].map(
                                                                (info, idx) => (
                                                                    <div
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className={`flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/50 px-2.5 py-1 text-[11px] font-medium ${
                                                                            info.highlight
                                                                                ? 'border-destructive/20 bg-destructive/5 text-destructive'
                                                                                : 'text-muted-foreground'
                                                                        }`}
                                                                    >
                                                                        <span className="opacity-70">
                                                                            {
                                                                                info.icon
                                                                            }
                                                                        </span>
                                                                        <span className="max-w-[100px] truncate md:max-w-[150px]">
                                                                            {
                                                                                info.text
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    asChild
                                                    variant={
                                                        quiz.status ===
                                                        'selesai'
                                                            ? 'outline'
                                                            : 'default'
                                                    }
                                                    className={`h-12 w-full rounded-xl px-8 font-bold shadow-sm transition-all md:w-auto ${
                                                        quiz.status !==
                                                        'selesai'
                                                            ? 'bg-primary hover:bg-primary/90'
                                                            : 'hover:bg-muted'
                                                    }`}
                                                >
                                                    <Link
                                                        href={`/quiz/${quiz.id}`}
                                                    >
                                                        {quiz.status ===
                                                        'selesai'
                                                            ? 'Lihat Hasil'
                                                            : 'Kerjakan Quiz'}
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                /* Empty State */
                                <div className="flex flex-col items-center justify-center space-y-4 py-20 text-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground/40">
                                        <SearchX size={40} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-lg font-bold">
                                            Tidak ada kuis ditemukan
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Coba ganti kategori filter atau
                                            hubungi guru pengajar.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {quizzes.links?.length > 3 && (
                            <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
                                <p className="text-xs font-medium text-muted-foreground">
                                    Halaman {quizzes.current_page} dari{' '}
                                    {quizzes.last_page}
                                </p>
                                <div className="flex flex-wrap justify-center gap-1">
                                    {quizzes.links.map((link, idx) => (
                                        <Button
                                            key={idx}
                                            asChild
                                            variant={
                                                link.active
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            className={`h-9 min-w-[36px] rounded-lg px-3 ${
                                                !link.url
                                                    ? 'pointer-events-none opacity-50'
                                                    : ''
                                            }`}
                                        >
                                            <Link
                                                href={link.url || '#'}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
