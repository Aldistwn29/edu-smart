import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import DashbordLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock,
    Eye,
    FileText,
    HelpCircle,
    Info,
    Trophy,
    User,
    Users,
    XCircle,
} from 'lucide-react';
import { useMemo } from 'react';

export default function Show({ quiz, attempts, unsubmitted_students }) {
    const stats = useMemo(() => {
        const total = quiz.classroom.students.length;
        const sub = attempts.length;
        const avg =
            attempts.length > 0
                ? Math.round(
                      attempts.reduce((acc, curr) => acc + curr.score, 0) /
                          attempts.length,
                  )
                : 0;

        return {
            total,
            submitted: sub,
            average: avg,
            percentage: total > 0 ? Math.round((sub / total) * 100) : 0,
        };
    }, [quiz, attempts]);

    const renderAnswerText = (val) => {
        if (!val) return 'Kosong';
        try {
            if (
                typeof val === 'string' &&
                (val.startsWith('{') || val.startsWith('['))
            ) {
                const parsed = JSON.parse(val);
                return typeof parsed === 'object'
                    ? parsed.option_text || parsed.text
                    : parsed;
            }
            return val;
        } catch (e) {
            return val;
        }
    };

    return (
        <DashbordLayout>
            <Head title={`Detail Hasil: ${quiz.title}`} />

            <div className="space-y-8 pb-20">
                {/* Header Section */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <Link
                            href={route('guru.quizes.index')}
                            className="group flex items-center text-sm font-bold text-muted-foreground transition-all hover:text-primary"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Kembali ke Daftar
                        </Link>
                        <h1 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
                            {quiz.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Badge
                                variant="secondary"
                                className="rounded-xl px-3 py-1 text-xs font-black uppercase tracking-wider"
                            >
                                {quiz.classroom.name}
                            </Badge>
                            <div className="flex items-center text-sm font-medium text-muted-foreground">
                                <FileText size={16} className="mr-2" />
                                {quiz.questions.length} Pertanyaan
                            </div>
                            <div className="flex items-center text-sm font-medium text-muted-foreground">
                                <Clock size={16} className="mr-2" />
                                {quiz.duration_minutes} Menit
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="rounded-[2rem] border-none bg-white shadow-xl shadow-slate-200/50 transition-all hover:shadow-2xl hover:shadow-primary/5">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                        Rata-rata Nilai
                                    </p>
                                    <h3 className="text-3xl font-black text-primary">
                                        {stats.average}
                                    </h3>
                                </div>
                                <div className="rounded-2xl bg-primary/10 p-4 text-primary">
                                    <Trophy size={28} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2rem] border-none bg-white shadow-xl shadow-slate-200/50 transition-all hover:shadow-2xl hover:shadow-primary/5">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                        Sudah Mengerjakan
                                    </p>
                                    <h3 className="text-3xl font-black text-slate-800">
                                        {stats.submitted}
                                    </h3>
                                </div>
                                <div className="rounded-2xl bg-emerald-100 p-4 text-emerald-600">
                                    <Users size={28} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2rem] border-none bg-white shadow-xl shadow-slate-200/50 transition-all hover:shadow-2xl hover:shadow-primary/5">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                        Total Siswa
                                    </p>
                                    <h3 className="text-3xl font-black text-slate-800">
                                        {stats.total}
                                    </h3>
                                </div>
                                <div className="rounded-2xl bg-slate-100 p-4 text-slate-600">
                                    <Users size={28} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2rem] border-none bg-white shadow-xl shadow-slate-200/50 transition-all hover:shadow-2xl hover:shadow-primary/5">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                        Progres Kelas
                                    </p>
                                    <h3 className="text-3xl font-black text-slate-800">
                                        {stats.percentage}%
                                    </h3>
                                </div>
                                <div className="rounded-2xl bg-amber-100 p-4 text-amber-600">
                                    <CheckCircle2 size={28} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Tabs Style */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* List Attempts */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-primary/10 p-2 text-primary">
                                <Trophy size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">
                                Daftar Nilai Siswa
                            </h2>
                        </div>

                        <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-xl shadow-slate-200/50">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="py-6 pl-8 text-[10px] font-black uppercase tracking-widest">
                                            Siswa
                                        </TableHead>
                                        <TableHead className="text-[10px] font-black uppercase tracking-widest">
                                            Waktu Selesai
                                        </TableHead>
                                        <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">
                                            Skor
                                        </TableHead>
                                        <TableHead className="py-6 pr-8 text-right text-[10px] font-black uppercase tracking-widest">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {attempts.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="h-64 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center space-y-3 opacity-40">
                                                    <Info size={48} />
                                                    <p className="font-bold">
                                                        Belum ada siswa yang
                                                        mengerjakan
                                                    </p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        attempts.map((attempt) => (
                                            <TableRow
                                                key={attempt.id}
                                                className="group transition-colors hover:bg-slate-50/50"
                                            >
                                                <TableCell className="py-5 pl-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-600">
                                                            {attempt.student.name.charAt(
                                                                0,
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-800">
                                                                {
                                                                    attempt
                                                                        .student
                                                                        .name
                                                                }
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {
                                                                    attempt
                                                                        .student
                                                                        .email
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center text-xs font-medium text-slate-500">
                                                        <Calendar
                                                            size={14}
                                                            className="mr-2"
                                                        />
                                                        {new Date(
                                                            attempt.end_date,
                                                        ).toLocaleDateString()}
                                                        <span className="mx-2">
                                                            •
                                                        </span>
                                                        <Clock
                                                            size={14}
                                                            className="mr-1"
                                                        />
                                                        {new Date(
                                                            attempt.end_date,
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            },
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge
                                                        className={`rounded-xl px-4 py-1.5 text-sm font-black shadow-sm ${
                                                            attempt.score >= 75
                                                                ? 'bg-emerald-500 hover:bg-emerald-600'
                                                                : 'bg-amber-500 hover:bg-amber-600'
                                                        }`}
                                                    >
                                                        {attempt.score}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="pr-8 text-right">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="rounded-xl font-bold text-primary hover:bg-primary/5"
                                                            >
                                                                <Eye
                                                                    size={16}
                                                                    className="mr-2"
                                                                />{' '}
                                                                Detail Jawaban
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-[2.5rem] border-none p-10">
                                                            <DialogHeader className="mb-8">
                                                                <DialogTitle className="text-2xl font-black">
                                                                    Jawaban:{' '}
                                                                    {
                                                                        attempt
                                                                            .student
                                                                            .name
                                                                    }
                                                                </DialogTitle>
                                                                <DialogDescription className="font-medium text-muted-foreground">
                                                                    Review
                                                                    detail
                                                                    jawaban
                                                                    siswa untuk
                                                                    kuis ini.
                                                                </DialogDescription>
                                                            </DialogHeader>

                                                            <div className="space-y-6">
                                                                {(
                                                                    attempt.answers ||
                                                                    []
                                                                ).map(
                                                                    (
                                                                        ans,
                                                                        idx,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                ans.id
                                                                            }
                                                                            className="space-y-3 rounded-2xl border-2 border-slate-100 p-6"
                                                                        >
                                                                            <div className="flex items-start justify-between gap-4">
                                                                                <div className="space-y-1">
                                                                                    <Badge
                                                                                        variant="outline"
                                                                                        className="text-[10px] font-black uppercase opacity-60"
                                                                                    >
                                                                                        NO.{' '}
                                                                                        {idx +
                                                                                            1}
                                                                                    </Badge>
                                                                                    <p className="font-bold leading-relaxed text-slate-800">
                                                                                        {
                                                                                            ans
                                                                                                .question
                                                                                                .question
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                                {ans.is_correct ? (
                                                                                    <div className="shrink-0 rounded-full bg-emerald-100 p-1.5 text-emerald-600">
                                                                                        <CheckCircle2
                                                                                            size={
                                                                                                24
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="shrink-0 rounded-full bg-rose-100 p-1.5 text-rose-600">
                                                                                        <XCircle
                                                                                            size={
                                                                                                24
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            </div>

                                                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                                                <div
                                                                                    className={`rounded-xl border-2 p-4 ${ans.is_correct ? 'border-emerald-100 bg-emerald-50/30' : 'border-rose-100 bg-rose-50/30'}`}
                                                                                >
                                                                                    <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                                                                        Jawaban
                                                                                        Siswa
                                                                                    </p>
                                                                                    <p
                                                                                        className={`font-bold ${ans.is_correct ? 'text-emerald-700' : 'text-rose-700'}`}
                                                                                    >
                                                                                        {renderAnswerText(
                                                                                            ans.student_answer,
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                                {!ans.is_correct && (
                                                                                    <div className="rounded-xl border-2 border-slate-100 bg-slate-50 p-4">
                                                                                        <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                                                                            Kunci
                                                                                            Jawaban
                                                                                        </p>
                                                                                        <p className="font-bold text-slate-800">
                                                                                            {renderAnswerText(
                                                                                                ans
                                                                                                    .question
                                                                                                    .answer,
                                                                                            )}
                                                                                        </p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>

                    {/* Pending Students */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-amber-100 p-2 text-amber-600">
                                <Users size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">
                                Belum Mengerjakan
                            </h2>
                        </div>

                        <Card className="rounded-[2.5rem] border-none bg-white shadow-xl shadow-slate-200/50">
                            <CardContent className="p-8">
                                <div className="space-y-4">
                                    {unsubmitted_students.length === 0 ? (
                                        <div className="py-6 text-center">
                                            <p className="text-sm font-bold text-emerald-600">
                                                Semua siswa sudah mengerjakan 🎉
                                            </p>
                                        </div>
                                    ) : (
                                        unsubmitted_students.map((student) => (
                                            <div
                                                key={student.id}
                                                className="group flex items-center gap-4"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 font-bold text-slate-400 transition-colors group-hover:bg-amber-50 group-hover:text-amber-600">
                                                    <User size={18} />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="truncate font-bold text-slate-800">
                                                        {student.name}
                                                    </p>
                                                    <p className="truncate text-xs text-muted-foreground">
                                                        Menunggu submission...
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quiz Info */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">
                                Info Singkat
                            </h3>
                            <div className="space-y-4 rounded-3xl border border-slate-100 bg-slate-50 p-6">
                                <div className="flex items-center gap-3">
                                    <Clock size={18} className="text-primary" />
                                    <div>
                                        <p className="text-xs font-bold text-muted-foreground">
                                            Durasi Ujian
                                        </p>
                                        <p className="text-sm font-black">
                                            {quiz.duration_minutes} Menit
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar
                                        size={18}
                                        className="text-primary"
                                    />
                                    <div>
                                        <p className="text-xs font-bold text-muted-foreground">
                                            Batas Akhir
                                        </p>
                                        <p className="text-sm font-black">
                                            {new Date(
                                                quiz.deadline,
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <HelpCircle
                                        size={18}
                                        className="text-primary"
                                    />
                                    <div>
                                        <p className="text-xs font-bold text-muted-foreground">
                                            Total Soal
                                        </p>
                                        <p className="text-sm font-black">
                                            {quiz.questions.length} Butir
                                            Pertanyaan
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashbordLayout>
    );
}
