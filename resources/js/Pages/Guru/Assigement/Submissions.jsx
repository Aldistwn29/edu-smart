import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/ui/sheet';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Textarea } from '@/Components/ui/textarea';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    CheckCircle2,
    ChevronLeft,
    Clock,
    Download,
    FileText,
    MessageSquare,
    Search,
    Star,
    UserCircle2,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Submissions({ assigment, submissions }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const filteredSubmissions = submissions.filter((s) =>
        s.student.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const { data, setData, post, processing, reset } = useForm({
        score: '',
        feedback: '',
    });

    const handleGradeOpen = (item) => {
        setSelectedSubmission(item);
        setData({
            score: item.submission?.score || '',
            feedback: item.submission?.feedback || '',
        });
    };

    const handleGradeSubmit = (e) => {
        e.preventDefault();
        post(route('guru.assigments.grade', selectedSubmission.submission.id), {
            onSuccess: () => {
                toast.success('Penilaian berhasil disimpan');
                setSelectedSubmission(null);
                reset();
            },
            onError: () => {
                toast.error('Gagal menyimpan penilaian');
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title={`Penilaian - ${assigment.title}`} />
            <div className="space-y-8 py-8">
                {/* Header Section */}
                <div className="space-y-4">
                    <Link
                        href={route('guru.assigments.index')}
                        className="group flex w-fit items-center gap-2 text-sm font-bold text-slate-400 transition-colors hover:text-primary"
                    >
                        <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        Kembali ke Daftar Tugas
                    </Link>
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-black text-slate-900 md:text-4xl">
                                Penilaian Siswa
                            </h1>
                            <p className="text-sm font-medium text-slate-500 md:text-lg">
                                Kelola dan beri feedback pada pengerjaan tugas:{' '}
                                <span className="font-bold text-slate-900">
                                    {assigment.title}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-2 shadow-sm">
                            <div className="flex -space-x-3">
                                {submissions.slice(0, 3).map((s, i) => (
                                    <Avatar
                                        key={i}
                                        className="h-10 w-10 border-4 border-white shadow-sm"
                                    >
                                        <AvatarImage
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.student.name}`}
                                        />
                                        <AvatarFallback>
                                            {s.student.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <div className="px-3 py-1">
                                <p className="text-xs font-black text-slate-900">
                                    {
                                        submissions.filter((s) => s.submission)
                                            .length
                                    }{' '}
                                    / {submissions.length}
                                </p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Sudah Mengumpulkan
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submissions Table Section */}
                <Card className="overflow-hidden border-none shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100">
                    <div className="border-b border-slate-50 bg-slate-50/30 p-4 md:p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <h3 className="text-lg font-bold text-slate-800">
                                Daftar Siswa & Pengumpulan
                            </h3>
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    placeholder="Cari nama siswa..."
                                    className="h-11 rounded-xl border-slate-200 bg-white pl-11 font-medium transition-all focus:ring-primary/20"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="border-slate-100 hover:bg-transparent">
                                    <TableHead className="py-5 pl-8 text-[10px] font-black uppercase tracking-wider text-slate-400">
                                        Siswa
                                    </TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                        Status
                                    </TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                        Waktu Kumpul
                                    </TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                        Nilai
                                    </TableHead>
                                    <TableHead className="pr-8 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSubmissions.map((item, index) => {
                                    const { student, submission } = item;
                                    const isSubmitted = !!submission;
                                    const isGraded =
                                        submission && submission.graded_at;

                                    return (
                                        <TableRow
                                            key={index}
                                            className="group border-slate-50 transition-colors hover:bg-slate-50/50"
                                        >
                                            <TableCell className="py-4 pl-8">
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-10 w-10 shadow-sm ring-2 ring-white transition-transform group-hover:scale-110">
                                                        <AvatarImage
                                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                                                        />
                                                        <AvatarFallback>
                                                            {student.name.charAt(
                                                                0,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900">
                                                            {student.name}
                                                        </p>
                                                        <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
                                                            {student.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {!isSubmitted ? (
                                                    <Badge
                                                        variant="outline"
                                                        className="rounded-lg border-slate-200 bg-white px-3 py-1 font-bold text-slate-400"
                                                    >
                                                        Belum Kumpul
                                                    </Badge>
                                                ) : !isGraded ? (
                                                    <Badge
                                                        variant="outline"
                                                        className="rounded-lg border-amber-200 bg-amber-50 px-3 py-1 font-bold text-amber-600"
                                                    >
                                                        Perlu Dinilai
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="outline"
                                                        className="rounded-lg border-emerald-200 bg-emerald-50 px-3 py-1 font-bold text-emerald-600"
                                                    >
                                                        Selesai Dinilai
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {isSubmitted ? (
                                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        {new Date(
                                                            submission.created_at,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            },
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs font-bold text-slate-300">
                                                        -
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`flex h-9 w-9 items-center justify-center rounded-xl font-black shadow-sm ${isGraded ? 'bg-primary text-white' : 'bg-slate-100 text-slate-300'}`}
                                                    >
                                                        {submission?.score || 0}
                                                    </div>
                                                    <div className="h-0.5 w-4 rounded-full bg-slate-100" />
                                                    <span className="text-[10px] font-bold text-slate-400">
                                                        / 100
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="pr-8 text-right">
                                                {isSubmitted ? (
                                                    <Sheet>
                                                        <SheetTrigger asChild>
                                                            <Button
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleGradeOpen(
                                                                        item,
                                                                    )
                                                                }
                                                                className="rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
                                                            >
                                                                Beri Nilai
                                                            </Button>
                                                        </SheetTrigger>
                                                        <SheetContent className="border-none shadow-2xl sm:max-w-[540px]">
                                                            <SheetHeader className="mb-8 space-y-4">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                                        <UserCircle2 className="h-7 w-7" />
                                                                    </div>
                                                                    <div className="text-left">
                                                                        <SheetTitle className="text-2xl font-black text-slate-900">
                                                                            Penilaian
                                                                            Siswa
                                                                        </SheetTitle>
                                                                        <SheetDescription className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                                                            Student
                                                                            Evaluation
                                                                            &
                                                                            Feedback
                                                                        </SheetDescription>
                                                                    </div>
                                                                </div>
                                                            </SheetHeader>

                                                            <div className="space-y-10">
                                                                {/* Student Summary */}
                                                                <div className="flex items-center gap-4 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-100">
                                                                    <Avatar className="h-16 w-16 shadow-xl shadow-primary/20 ring-4 ring-white">
                                                                        <AvatarImage
                                                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                                                                        />
                                                                        <AvatarFallback>
                                                                            {student.name.charAt(
                                                                                0,
                                                                            )}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div className="space-y-1">
                                                                        <h4 className="text-xl font-black text-slate-900">
                                                                            {
                                                                                student.name
                                                                            }
                                                                        </h4>
                                                                        <p className="text-xs font-bold leading-none text-slate-400">
                                                                            {
                                                                                student.email
                                                                            }
                                                                        </p>
                                                                        <div className="flex items-center gap-2 pt-2">
                                                                            <Badge className="border-none bg-emerald-500/10 px-2 text-[10px] font-black uppercase text-emerald-600">
                                                                                Aktif
                                                                            </Badge>
                                                                            <span className="text-[10px] font-bold text-slate-300">
                                                                                •
                                                                            </span>
                                                                            <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">
                                                                                Joined
                                                                                2024
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Submission Content */}
                                                                <Card className="overflow-hidden border-none bg-slate-50 shadow-inner ring-1 ring-slate-100">
                                                                    <div className="space-y-6 p-6 md:p-8">
                                                                        <div className="flex items-center justify-between">
                                                                            <h5 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                                                                Konten
                                                                                Jawaban
                                                                            </h5>
                                                                            <div className="flex items-center gap-2 text-[10px] font-bold italic text-slate-400">
                                                                                <Clock className="h-3 w-3" />
                                                                                Dikirim
                                                                                pada{' '}
                                                                                {new Date(
                                                                                    submission.created_at,
                                                                                ).toLocaleDateString()}
                                                                            </div>
                                                                        </div>

                                                                        <div className="rounded-2xl border border-slate-100 bg-white p-6 text-sm font-medium leading-relaxed text-slate-700 shadow-sm md:text-base">
                                                                            {submission.content || (
                                                                                <span className="italic text-slate-300">
                                                                                    Tidak
                                                                                    ada
                                                                                    jawaban
                                                                                    teks.
                                                                                </span>
                                                                            )}
                                                                        </div>

                                                                        {submission.file_path && (
                                                                            <div className="space-y-3">
                                                                                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                                                                    Lampiran
                                                                                    File
                                                                                </p>
                                                                                <a
                                                                                    href={`/storage/${submission.file_path}`}
                                                                                    target="_blank"
                                                                                    className="group flex items-center justify-between rounded-2xl bg-white p-4 transition-all hover:bg-primary/5 hover:ring-1 hover:ring-primary/20"
                                                                                >
                                                                                    <div className="flex items-center gap-4">
                                                                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
                                                                                            <FileText className="h-5 w-5" />
                                                                                        </div>
                                                                                        <div>
                                                                                            <p className="max-w-[150px] truncate text-sm font-black text-slate-900">
                                                                                                {submission.file_path
                                                                                                    .split(
                                                                                                        '/',
                                                                                                    )
                                                                                                    .pop()}
                                                                                            </p>
                                                                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                                                                PDF
                                                                                                /
                                                                                                Document
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <Download className="h-5 w-5 text-slate-300 transition-transform group-hover:scale-110 group-hover:text-primary" />
                                                                                </a>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </Card>

                                                                {/* Grading Form */}
                                                                <form
                                                                    onSubmit={
                                                                        handleGradeSubmit
                                                                    }
                                                                    className="space-y-8"
                                                                >
                                                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                                                        <div className="space-y-3">
                                                                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                                                                Berikan
                                                                                Nilai
                                                                            </Label>
                                                                            <div className="relative">
                                                                                <Input
                                                                                    type="number"
                                                                                    max="100"
                                                                                    min="0"
                                                                                    placeholder="0 - 100"
                                                                                    className="h-16 rounded-[1.25rem] border-slate-200 bg-white px-6 pr-16 text-2xl font-black text-primary transition-all focus:ring-4 focus:ring-primary/10"
                                                                                    value={
                                                                                        data.score
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) =>
                                                                                        setData(
                                                                                            'score',
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-lg font-black text-slate-200">
                                                                                    /
                                                                                    100
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex flex-col justify-end pb-2">
                                                                            <div className="flex items-center gap-2">
                                                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                                                                    <Star className="h-3 w-3 fill-current" />
                                                                                </div>
                                                                                <p className="text-[10px] font-bold italic text-slate-400">
                                                                                    Nilai
                                                                                    otomatis
                                                                                    dikonversi
                                                                                    ke
                                                                                    sistem
                                                                                    akademik
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-3">
                                                                        <Label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                                                            <MessageSquare className="h-3 w-3" />
                                                                            Feedback
                                                                            /
                                                                            Catatan
                                                                            Guru
                                                                        </Label>
                                                                        <Textarea
                                                                            placeholder="Tuliskan saran atau apresiasi untuk siswa..."
                                                                            className="min-h-[120px] rounded-3xl border-slate-200 bg-white p-6 font-medium leading-relaxed transition-all focus:ring-4 focus:ring-primary/10"
                                                                            value={
                                                                                data.feedback
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                setData(
                                                                                    'feedback',
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <Button
                                                                        type="submit"
                                                                        disabled={
                                                                            processing
                                                                        }
                                                                        className="h-16 w-full rounded-[1.25rem] bg-slate-900 text-lg font-black text-white shadow-2xl transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98]"
                                                                    >
                                                                        <CheckCircle2 className="mr-3 h-6 w-6 text-primary" />
                                                                        Simpan
                                                                        Penilaian
                                                                    </Button>
                                                                </form>
                                                            </div>
                                                        </SheetContent>
                                                    </Sheet>
                                                ) : (
                                                    <Button
                                                        disabled
                                                        size="sm"
                                                        variant="ghost"
                                                        className="rounded-xl font-bold italic text-slate-300"
                                                    >
                                                        Belum Ada Data
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>

                    {filteredSubmissions.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
                                <Search className="h-10 w-10 text-slate-200" />
                            </div>
                            <h4 className="text-xl font-black text-slate-800">
                                Siswa tidak ditemukan
                            </h4>
                            <p className="text-sm font-medium text-slate-400">
                                Cobalah kata kunci pencarian yang lain.
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </DashboardLayout>
    );
}
