import { Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    BookOpen,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/Components/ui/alert-dialog';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';

export default function Exam({ quiz, initialTime, attemptId }) {
    const [currentSoal, setCurrentSoal] = useState(0);
    const [answers, setAnswers] = useState(() => {
        const saved = localStorage.getItem(
            `quiz_${quiz.id}_attempt_${attemptId}`,
        );
        return saved ? JSON.parse(saved) : {};
    });

    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // 1. Logic Timer
    useEffect(() => {
        if (timeLeft <= 0) {
            handleAutoSubmit();
            return;
        }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // 2. Persistensi Jawaban
    useEffect(() => {
        localStorage.setItem(
            `quiz_${quiz.id}_attempt_${attemptId}`,
            JSON.stringify(answers),
        );
    }, [answers]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSelectOption = (questionId, optionId) => {
        if (isSubmitting) return;
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    };

    const submitQuiz = () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        setShowConfirm(false);
        router.post(
            route('siswa.quizzes.submit', quiz.id),
            {
                answers: answers,
                time_left: timeLeft,
            },
            {
                onSuccess: () =>
                    localStorage.removeItem(
                        `quiz_${quiz.id}_attempt_${attemptId}`,
                    ),
                onError: () => setIsSubmitting(false),
            },
        );
    };

    const handleAutoSubmit = useCallback(() => {
        if (!isSubmitting) submitQuiz();
    }, [isSubmitting, answers]);

    const currentQuestion = quiz.questions[currentSoal];

    return (
        <div className="min-h-screen bg-background">
            <Head title={`Ujian: ${quiz.title}`} />

            {/* Navbar Khusus Ujian (No Sidebar) */}
            <nav className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border-b bg-card px-4 shadow-sm md:px-12">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="rounded-xl bg-primary p-2 text-primary-foreground md:p-2.5">
                        <BookOpen size={20} className="md:size-6" />
                    </div>
                    <div className="max-w-[120px] overflow-hidden sm:max-w-none">
                        <h1 className="mb-0.5 truncate text-sm font-bold leading-none text-foreground md:mb-1 md:text-lg">
                            {quiz.title}
                        </h1>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Ujian Terpantau
                        </p>
                    </div>
                </div>

                <div className="mx-4 hidden max-w-md flex-1 items-center gap-6 md:flex lg:mx-20 lg:gap-10">
                    <div className="w-full">
                        <div className="mb-1.5 flex justify-between md:mb-2">
                            <span className="text-[9px] font-bold uppercase text-muted-foreground md:text-[10px]">
                                Progres
                            </span>
                            <span className="text-[9px] font-bold uppercase text-primary md:text-[10px]">
                                {Math.round(
                                    (Object.keys(answers).length /
                                        quiz.questions.length) *
                                        100,
                                )}
                                %
                            </span>
                        </div>
                        <Progress
                            value={
                                (Object.keys(answers).length /
                                    quiz.questions.length) *
                                100
                            }
                            className="h-1 md:h-1.5"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <div
                        className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 transition-all md:gap-3 md:rounded-2xl md:px-5 md:py-2.5 ${
                            timeLeft < 300
                                ? 'animate-pulse border-destructive bg-destructive/10 text-destructive'
                                : 'border-border bg-muted/50'
                        }`}
                    >
                        <Clock
                            size={16}
                            className={
                                timeLeft < 300
                                    ? 'text-destructive'
                                    : 'text-primary'
                            }
                        />
                        <span className="font-mono text-base font-black tracking-tighter md:text-xl">
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-[1400px] p-4 sm:p-6 md:p-10">
                <div className="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-12">
                    {/* Panel Kiri: Pertanyaan & Opsi */}
                    <div className="space-y-6 lg:col-span-8 lg:space-y-8">
                        <Card className="overflow-hidden rounded-[2rem] border-none bg-card shadow-2xl shadow-primary/5 md:rounded-[2.5rem]">
                            <CardContent className="p-6 sm:p-10 md:p-16">
                                <div className="space-y-10">
                                    <div className="space-y-4 md:space-y-6">
                                        <Badge className="rounded-full border-none bg-primary/10 px-4 py-1.5 text-[10px] font-bold text-primary hover:bg-primary/20 md:px-5 md:py-1.5 md:text-xs">
                                            PERTANYAAN NOMOR {currentSoal + 1}
                                        </Badge>
                                        <h2 className="text-xl font-bold leading-relaxed text-foreground sm:text-2xl md:text-3xl">
                                            {currentQuestion.question}
                                        </h2>
                                    </div>

                                    <div className="grid gap-4">
                                        {currentQuestion.options.map(
                                            (option, idx) => {
                                                const optionVal =
                                                    option.id ??
                                                    (typeof option === 'object'
                                                        ? option.option_text
                                                        : option);
                                                const optionText =
                                                    option.option_text ??
                                                    option;
                                                const label =
                                                    String.fromCharCode(
                                                        65 + idx,
                                                    );
                                                const isSelected =
                                                    answers[
                                                        currentQuestion.id
                                                    ] == optionVal;

                                                return (
                                                    <button
                                                        key={`${currentQuestion.id}-${idx}`}
                                                        onClick={() =>
                                                            handleSelectOption(
                                                                currentQuestion.id,
                                                                optionVal,
                                                            )
                                                        }
                                                        className={`group flex w-full items-center rounded-2xl border-2 p-4 text-left transition-all md:rounded-[2rem] md:p-6 ${
                                                            isSelected
                                                                ? 'border-primary bg-primary/5 ring-4 ring-primary/10'
                                                                : 'border-border bg-transparent hover:border-primary/30'
                                                        }`}
                                                    >
                                                        <div
                                                            className={`mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-black transition-all md:mr-6 md:h-14 md:w-14 md:rounded-2xl md:text-lg ${
                                                                isSelected
                                                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                                                    : 'border-2 border-border bg-transparent text-muted-foreground'
                                                            }`}
                                                        >
                                                            {label}
                                                        </div>
                                                        <span
                                                            className={`flex-1 text-base font-bold md:text-lg ${isSelected ? 'text-primary' : 'text-foreground/80'}`}
                                                        >
                                                            {optionText}
                                                        </span>
                                                        {isSelected && (
                                                            <CheckCircle2
                                                                size={24}
                                                                className="ml-3 text-primary md:ml-4 md:size-7"
                                                            />
                                                        )}
                                                    </button>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Navigasi Bawah */}
                        <div className="flex items-center justify-between px-2 md:px-4">
                            <Button
                                variant="ghost"
                                className="h-12 rounded-xl px-4 font-bold text-muted-foreground transition-all hover:bg-card hover:text-primary sm:h-16 sm:rounded-2xl sm:px-10"
                                onClick={() =>
                                    setCurrentSoal((prev) =>
                                        Math.max(0, prev - 1),
                                    )
                                }
                                disabled={currentSoal === 0}
                            >
                                <ChevronLeft
                                    className="mr-1 md:mr-2"
                                    size={18}
                                />{' '}
                                <span className="text-sm sm:text-base">
                                    Sebelumnya
                                </span>
                            </Button>

                            <div className="flex gap-2 sm:gap-4">
                                {currentSoal === quiz.questions.length - 1 ? (
                                    <Button
                                        className="h-12 rounded-xl bg-primary px-6 font-black text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90 sm:h-16 sm:rounded-2xl sm:px-14 sm:text-base"
                                        onClick={() => setShowConfirm(true)}
                                        disabled={isSubmitting}
                                    >
                                        <span className="text-sm sm:text-base">
                                            {isSubmitting
                                                ? 'MENGIRIM...'
                                                : 'KIRIM JAWABAN'}
                                        </span>
                                    </Button>
                                ) : (
                                    <Button
                                        className="h-12 rounded-xl border border-border bg-card px-6 font-bold text-foreground/80 shadow-sm transition-all hover:border-primary hover:text-primary sm:h-16 sm:rounded-2xl sm:px-12"
                                        onClick={() =>
                                            setCurrentSoal((prev) =>
                                                Math.min(
                                                    quiz.questions.length - 1,
                                                    prev + 1,
                                                ),
                                            )
                                        }
                                    >
                                        <span className="text-sm sm:text-base">
                                            Selanjutnya
                                        </span>{' '}
                                        <ChevronRight
                                            className="ml-1 md:ml-2"
                                            size={18}
                                        />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 lg:col-span-4">
                        <Card className="rounded-[2rem] border-none bg-card shadow-2xl shadow-primary/5 lg:sticky lg:top-28 lg:rounded-[2.5rem]">
                            <CardContent className="p-6 md:p-10">
                                <h4 className="mb-6 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-foreground md:mb-10 md:text-xs">
                                    Navigasi Nomor
                                    <Badge className="border-none bg-muted text-[10px] text-muted-foreground">
                                        {quiz.questions.length} Soal
                                    </Badge>
                                </h4>

                                <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-5 lg:gap-3">
                                    {quiz.questions.map((q, index) => (
                                        <button
                                            key={q.id}
                                            onClick={() =>
                                                setCurrentSoal(index)
                                            }
                                            className={`h-12 rounded-2xl border-2 text-sm font-black transition-all ${
                                                currentSoal === index
                                                    ? 'z-10 scale-110 border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                                    : answers[q.id]
                                                      ? 'border-primary/20 bg-primary/5 text-primary'
                                                      : 'border-muted bg-muted text-muted-foreground hover:border-primary/30'
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-8 space-y-3 md:mt-12 md:space-y-4">
                                    <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3 md:rounded-2xl md:p-4">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="h-2 w-2 rounded-full bg-primary md:h-3 md:w-3" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:text-xs">
                                                Sudah Dijawab
                                            </span>
                                        </div>
                                        <span className="font-black text-primary">
                                            {Object.keys(answers).length}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3 md:rounded-2xl md:p-4">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="h-2 w-2 rounded-full bg-muted-foreground/30 md:h-3 md:w-3" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:text-xs">
                                                Belum Dijawab
                                            </span>
                                        </div>
                                        <span className="font-black text-muted-foreground">
                                            {quiz.questions.length -
                                                Object.keys(answers).length}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="rounded-[2rem] bg-foreground p-6 text-background shadow-2xl shadow-primary/10 md:rounded-[2.5rem] md:p-8">
                            <div className="flex gap-4 md:gap-5">
                                <AlertCircle
                                    className="shrink-0 text-warning md:h-8 md:w-8"
                                    size={24}
                                />
                                <div className="space-y-1.5 md:space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-warning md:text-xs">
                                        Peringatan Keamanan
                                    </p>
                                    <p className="text-[10px] font-medium leading-relaxed opacity-80 md:text-xs">
                                        Data jawaban dikirimkan secara otomatis
                                        jika waktu habis. Hindari membuka tab
                                        lain demi kelancaran ujian.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                <AlertDialogContent className="max-w-[90vw] rounded-[2rem] border-none p-6 sm:max-w-lg md:rounded-[2.5rem] md:p-12">
                    <AlertDialogHeader className="space-y-4 text-center md:space-y-6 md:text-left">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary md:h-20 md:w-20 md:rounded-[2rem]">
                            <AlertCircle size={32} className="md:size-10" />
                        </div>
                        <div className="space-y-2">
                            <AlertDialogTitle className="text-xl font-black tracking-tight text-foreground md:text-3xl">
                                Selesaikan Ujian?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-xs font-medium leading-relaxed text-muted-foreground md:text-base">
                                Pastikan semua jawaban telah terisi dengan
                                benar. Kamu tidak dapat mengubah jawaban setelah
                                ujian dikirimkan.
                            </AlertDialogDescription>
                        </div>
                        <div className="rounded-xl bg-muted/50 p-4 md:rounded-2xl md:p-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:text-xs">
                                    Total Jawaban Terisi
                                </span>
                                <span className="text-base font-black text-primary md:text-lg">
                                    {Object.keys(answers).length} /{' '}
                                    {quiz.questions.length}
                                </span>
                            </div>
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-10 flex-col gap-4 sm:flex-row sm:justify-end sm:gap-4">
                        <AlertDialogCancel className="h-14 rounded-2xl border-2 border-border font-bold transition-all hover:bg-muted">
                            Lanjutkan Mengerjakan
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={submitQuiz}
                            className="h-14 rounded-2xl bg-primary px-8 font-black text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90"
                        >
                            Iya, Kirim Sekarang
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
