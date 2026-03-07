import { Head, Link } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Clock,
    Home,
    Trophy,
    XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';

// Shadcn UI Components
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';

export default function Result({ quiz, attempt }) {
    const [showReview, setShowReview] = useState(false);

    // Hitung Stats
    const stats = useMemo(() => {
        const questions = quiz?.questions || [];
        const answers = attempt?.answers || [];

        const total = questions.length;
        const correct = answers.filter((a) => a.is_correct).length;
        const wrong = answers.filter(
            (a) =>
                a.student_answer !== '' &&
                a.student_answer !== null &&
                !a.is_correct,
        ).length;
        const empty =
            total -
            answers.filter(
                (a) => a.student_answer !== '' && a.student_answer !== null,
            ).length;

        // Menghitung waktu pengerjaan
        const start = attempt?.start_date
            ? new Date(attempt.start_date)
            : new Date();
        const end = attempt?.end_date ? new Date(attempt.end_date) : new Date();
        const diffMs = Math.max(0, end - start);
        const diffMins = Math.floor(diffMs / 60000);
        const diffSecs = Math.floor((diffMs % 60000) / 1000);

        return {
            total,
            correct,
            wrong,
            empty,
            time: `${diffMins} mnt ${diffSecs} dtk`,
            score: Math.round(attempt?.score || 0),
        };
    }, [quiz, attempt]);

    if (!quiz || !attempt) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="animate-pulse text-muted-foreground">
                    Memuat data hasil...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <Head title={`Hasil: ${quiz.title}`} />

            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-card px-6 py-4 shadow-sm md:px-12">
                <div className="mx-auto flex max-w-[1400px] items-center gap-4">
                    {/* Left: Button */}
                    <div className="flex-none lg:flex-1">
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="rounded-xl font-bold text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                        >
                            <Link href={route('siswa.quizzes.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />{' '}
                                <span className="hidden sm:inline">
                                    Kembali
                                </span>
                            </Link>
                        </Button>
                    </div>

                    {/* Center: Title & Logo */}
                    <div className="flex flex-1 items-center justify-center gap-2 lg:flex-none lg:gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary lg:h-10 lg:w-10 lg:rounded-xl">
                            <Trophy size={16} className="lg:hidden" />
                            <Trophy size={20} className="hidden lg:block" />
                        </div>
                        <h1 className="truncate text-base font-bold tracking-tight text-foreground sm:text-lg md:text-xl lg:text-2xl">
                            Hasil Kuis
                        </h1>
                    </div>

                    {/* Right: Spacer for balance */}
                    <div className="flex-none lg:flex-1" />
                </div>
            </header>

            <main className="mx-auto max-w-[1100px] px-4 py-10 md:px-8 md:py-16">
                <div className="flex flex-col items-center">
                    {/* Hero Section - Centered */}
                    <div className="flex flex-col items-center text-center">
                        {/* Icon Section */}
                        <div className="relative mb-8">
                            <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 opacity-20" />
                            <div className="relative flex h-32 w-48 items-center justify-center rounded-[3rem] bg-secondary shadow-2xl shadow-primary/10 ring-8 ring-background">
                                <Trophy size={64} className="text-primary" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                                Kerja Bagus!
                            </h2>
                            <p className="max-w-2xl text-base font-medium text-muted-foreground sm:text-lg md:text-xl">
                                Kamu sudah mengerjakan kuis{' '}
                                <span className="font-bold text-foreground">
                                    "{quiz.title}"
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Score Card Section */}
                    <Card className="mt-12 w-full overflow-hidden rounded-[3rem] border-none bg-card shadow-2xl shadow-primary/10">
                        <CardContent className="p-10 md:p-14">
                            <div className="flex flex-col items-center gap-12 lg:flex-row">
                                <div className="flex flex-col items-center gap-8 lg:w-1/2 lg:gap-12">
                                    {/* Score Circle */}
                                    <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[6px] border-primary/5 bg-primary/5 shadow-inner sm:h-56 sm:w-56 md:h-64 md:w-64 md:border-8">
                                        <div className="flex flex-col items-center">
                                            <span className="text-6xl font-black tracking-tighter text-primary sm:text-7xl md:text-8xl">
                                                {stats.score}
                                            </span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 sm:text-xs">
                                                DARI 100
                                            </span>
                                        </div>
                                        {/* Score Ring Progress */}
                                        <svg
                                            className="absolute inset-0 -rotate-90"
                                            viewBox="0 0 256 256"
                                        >
                                            <circle
                                                cx="128"
                                                cy="128"
                                                r="114"
                                                fill="transparent"
                                                stroke="currentColor"
                                                strokeWidth="12"
                                                strokeDasharray={
                                                    (stats.score / 100) *
                                                        716.28 +
                                                    ' 716.28'
                                                }
                                                className="text-primary transition-all duration-1000 ease-out"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <Badge className="bg-success/10 px-4 py-1.5 text-[10px] font-black uppercase text-success ring-1 ring-success/20 sm:px-6 sm:py-2 sm:text-xs">
                                        Selamat! Kamu berhasil
                                    </Badge>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid w-full grid-cols-2 gap-3 sm:gap-6 lg:w-1/2">
                                    <div className="rounded-2xl border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50 sm:rounded-[2rem] sm:p-6">
                                        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-success/10 text-success sm:mb-4 sm:h-10 sm:w-10 sm:rounded-xl">
                                            <CheckCircle2
                                                size={18}
                                                className="sm:size-6"
                                            />
                                        </div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-foreground sm:text-[10px] sm:tracking-[0.2em]">
                                            Benar
                                        </p>
                                        <p className="mt-1 text-2xl font-black text-foreground sm:text-3xl">
                                            {stats.correct}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50 sm:rounded-[2rem] sm:p-6">
                                        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive sm:mb-4 sm:h-10 sm:w-10 sm:rounded-xl">
                                            <XCircle
                                                size={18}
                                                className="sm:size-6"
                                            />
                                        </div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-foreground sm:text-[10px] sm:tracking-[0.2em]">
                                            Salah
                                        </p>
                                        <p className="mt-1 text-2xl font-black text-foreground sm:text-3xl">
                                            {stats.wrong}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50 sm:rounded-[2rem] sm:p-6">
                                        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-muted/20 text-muted-foreground sm:mb-4 sm:h-10 sm:w-10 sm:rounded-xl">
                                            <AlertCircle
                                                size={18}
                                                className="sm:size-6"
                                            />
                                        </div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-foreground sm:text-[10px] sm:tracking-[0.2em]">
                                            Kosong
                                        </p>
                                        <p className="mt-1 text-2xl font-black text-foreground sm:text-3xl">
                                            {stats.empty}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50 sm:rounded-[2rem] sm:p-6">
                                        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary sm:mb-4 sm:h-10 sm:w-10 sm:rounded-xl">
                                            <Clock
                                                size={18}
                                                className="sm:size-6"
                                            />
                                        </div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.1em] text-muted-foreground sm:text-[10px] sm:tracking-[0.2em]">
                                            Waktu
                                        </p>
                                        <p className="mt-1 text-base font-black text-foreground sm:text-xl">
                                            {stats.time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Review Section */}
                    <div className="mt-12 w-full space-y-6">
                        <div className="flex flex-col items-start justify-between gap-4 px-2 sm:flex-row sm:items-center sm:px-4">
                            <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                                <span>Review Jawaban</span>
                                <Badge
                                    variant="outline"
                                    className="text-[9px] font-bold opacity-60 sm:text-[10px]"
                                >
                                    {quiz.questions.length} SOAL
                                </Badge>
                            </h3>
                            <Button
                                variant="ghost"
                                onClick={() => setShowReview(!showReview)}
                                className="h-auto p-0 font-bold text-primary hover:bg-transparent"
                            >
                                {showReview ? 'Tutup Review' : 'Lihat Detail'}
                                {showReview ? (
                                    <ChevronUp className="ml-2 h-4 w-4" />
                                ) : (
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                )}
                            </Button>
                        </div>

                        {showReview && (
                            <div className="space-y-4">
                                {quiz.questions.map((q, idx) => {
                                    const userAnswer = (
                                        attempt.answers || []
                                    ).find((a) => a.question_id == q.id);
                                    const isCorrect = userAnswer?.is_correct;
                                    const studentOptionId =
                                        userAnswer?.student_answer;
                                    const correctOptionId = q.answer;

                                    const studentOption = (
                                        q.options || []
                                    ).find(
                                        (o) => (o.id ?? o) == studentOptionId,
                                    );
                                    const correctOption = (
                                        q.options || []
                                    ).find(
                                        (o) => (o.id ?? o) == correctOptionId,
                                    );

                                    const renderAnswerText = (val) => {
                                        if (!val) return null;
                                        try {
                                            if (
                                                typeof val === 'string' &&
                                                (val.startsWith('{') ||
                                                    val.startsWith('['))
                                            ) {
                                                const parsed = JSON.parse(val);
                                                return typeof parsed ===
                                                    'object'
                                                    ? parsed.option_text ||
                                                          parsed.text
                                                    : parsed;
                                            }
                                            return val;
                                        } catch (e) {
                                            return val;
                                        }
                                    };

                                    const studentOptionText =
                                        typeof studentOption === 'object' &&
                                        studentOption !== null
                                            ? studentOption?.option_text
                                            : renderAnswerText(
                                                  studentOption ||
                                                      studentOptionId,
                                              );

                                    const correctOptionText =
                                        typeof correctOption === 'object' &&
                                        correctOption !== null
                                            ? correctOption?.option_text
                                            : renderAnswerText(
                                                  correctOption ||
                                                      correctOptionId,
                                              );

                                    return (
                                        <Card
                                            key={q.id}
                                            className="rounded-[2rem] border-none bg-card shadow-lg shadow-slate-200/50"
                                        >
                                            <CardContent className="p-8">
                                                <div className="mb-6 flex items-start justify-between gap-4">
                                                    <div className="space-y-2">
                                                        <Badge
                                                            variant="outline"
                                                            className="text-[10px] font-black uppercase opacity-60"
                                                        >
                                                            NO. {idx + 1}
                                                        </Badge>
                                                        <h4 className="text-lg font-bold leading-relaxed text-foreground">
                                                            {q.question}
                                                        </h4>
                                                    </div>
                                                    {isCorrect ? (
                                                        <div className="rounded-full bg-success/10 p-2 text-success">
                                                            <CheckCircle2
                                                                size={24}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="rounded-full bg-destructive/10 p-2 text-destructive">
                                                            <XCircle
                                                                size={24}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <div
                                                        className={`space-y-2 rounded-2xl p-4 transition-all ${isCorrect ? 'border border-success/20 bg-success/5' : 'border border-destructive/20 bg-destructive/5'}`}
                                                    >
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                                            Jawaban Kamu
                                                        </p>
                                                        <p
                                                            className={`font-bold ${isCorrect ? 'text-success' : 'text-destructive'}`}
                                                        >
                                                            {studentOptionText &&
                                                            studentOptionText !==
                                                                ''
                                                                ? studentOptionText
                                                                : 'Tidak Menjawab'}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-2 rounded-2xl border border-border/50 bg-muted/20 p-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                                            Jawaban Benar
                                                        </p>
                                                        <p className="font-bold text-foreground">
                                                            {correctOptionText}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-16 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Button
                            asChild
                            className="h-14 w-full rounded-2xl bg-primary px-10 font-black text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:bg-primary/90 sm:h-16 sm:w-auto sm:rounded-[2rem]"
                        >
                            <Link href={route('siswa.quizzes.index')}>
                                <Home className="mr-3 h-5 w-5" /> KEMBALI KE
                                DASHBOARD
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            className="h-14 w-full rounded-2xl px-10 font-bold text-muted-foreground transition-all hover:bg-muted hover:text-primary sm:h-16 sm:w-auto sm:rounded-[2rem]"
                        >
                            Lihat Pembahasan Materi
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
