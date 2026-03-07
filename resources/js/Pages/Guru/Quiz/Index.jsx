import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { Button, buttonVariants } from '@/Components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/ui/pagination';
import DashbordLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    BarChart3,
    BookOpen,
    Clock,
    LayoutList,
    Pencil,
    Trash,
    User,
} from 'lucide-react';
import { toast } from 'sonner';
export default function Index({ stats, quizzes }) {
    const calculatedProgress = (completed, total) => {
        if (total === 0) return 0;
        return (completed / total) * 100;
    };

    const handleDelete = (id) => {
        router.delete(route('guru.quizes.destroy', id), {
            onStart: () => {},
            onSuccess: () => {
                toast.success('Quiz berhasil dihapus');
            },
            onError: () => {
                toast.error('Quiz gagal dihapus', {
                    description: 'Terjadi kesalahan saat menghapus quiz',
                });
            },
            onFinish: () => {
                toast.dismiss();
            },
        });
    };
    return (
        <DashbordLayout>
            <Head title="Management Quiz" />
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                            Manajemen quiz
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                            Ayo lanjutkan progres untuk membangun generasi
                            bangsa
                        </p>
                    </div>
                    <Link href={route('guru.quizes.create')}>
                        <Button size="xl" className="w-full sm:w-auto">
                            Buat Quiz
                        </Button>
                    </Link>
                </div>
                {/* KPI Card */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
                    {/* Total quiz */}
                    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 md:text-xs">
                                Total Quiz yang dibuat
                            </p>
                            <p className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
                                {stats.total_quizes}
                            </p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-2.5 text-slate-400 md:p-3">
                            <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                    </div>
                    {/* Siswa Belum Mengerjakan */}
                    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 md:text-xs">
                                Siswa Belum Mengerjakan
                            </p>
                            <p className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
                                {stats.unsubmitted_students}
                            </p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-2.5 text-slate-400 md:p-3">
                            <User className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                    </div>
                    {/* Rata-rata Nilai */}
                    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 md:text-xs">
                                Rata-rata Nilai
                            </p>
                            <p className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
                                {stats.avg_score}
                            </p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-2.5 text-slate-400 md:p-3">
                            <BarChart3 className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                    </div>
                </div>

                {/* Daftar quiz */}
                <div className="space-y-4">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="rounded-xl bg-slate-50 p-3">
                            <LayoutList className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Daftar Quiz
                        </h2>
                    </div>
                    {/* Container list quiz */}
                    <div className="space-y-6 rounded-2xl border border-slate-100 shadow-sm">
                        {quizzes.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center space-y-4 rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
                                <div className="rounded-full bg-slate-100 p-4">
                                    <BookOpen className="h-8 w-8 text-slate-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">
                                        Quiz belum ada
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Coba buat quiz baru untuk memulai
                                        pembelajaran dengan riang gembira.
                                    </p>
                                </div>
                                <Link href={route('guru.quizes.create')}>
                                    <Button className="mt-2" variant="outline">
                                        Buat Quiz Pertama
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            quizzes.data.map((quiz, id) => (
                                <div
                                    key={id}
                                    className="group/card relative overflow-hidden rounded-3xl border border-slate-200 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                                >
                                    <Link
                                        href={route(
                                            'guru.quizes.show',
                                            quiz.id,
                                        )}
                                        className="block p-6 transition-colors hover:bg-slate-50/50"
                                    >
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary sm:text-xs">
                                                        {quiz.classroom_name}
                                                    </span>
                                                    <h3 className="line-clamp-1 text-base font-bold text-slate-800 transition-colors group-hover/card:text-primary">
                                                        {quiz.title}
                                                    </h3>
                                                </div>
                                                <p className="line-clamp-2 max-w-2xl text-xs font-medium leading-relaxed text-slate-500 sm:text-sm">
                                                    {quiz.description}
                                                </p>
                                            </div>

                                            <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-end">
                                                <div className="flex items-center text-xs font-bold text-slate-400 sm:text-sm">
                                                    <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    <span className="ml-1 sm:ml-2">
                                                        {quiz.is_active
                                                            ? `${quiz.remaining_days} hari lagi`
                                                            : 'Batas waktu sudah lewat'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {quiz.is_active ? (
                                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-600 sm:text-xs">
                                                            Aktif
                                                        </span>
                                                    ) : (
                                                        <span className="rounded-full bg-rose-50 px-3 py-1 text-[10px] font-bold text-rose-600 sm:text-xs">
                                                            Berakhir
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Bar Progress */}
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-xs font-bold sm:text-sm">
                                                    <span className="uppercase tracking-tighter text-slate-400">
                                                        Progres Pengerjaan
                                                    </span>
                                                    <span className="text-slate-700">
                                                        {quiz.completed_count} /{' '}
                                                        {quiz.total_students}{' '}
                                                        Selesai
                                                    </span>
                                                </div>
                                                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500"
                                                        style={{
                                                            width: `${calculatedProgress(quiz.completed_count, quiz.total_students)}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Footer: Tombol Aksi - Keep outside of Link to avoid nested links */}
                                    <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 p-6 pt-2 sm:flex-row sm:justify-end">
                                        {/* Tombol Edit */}
                                        <Link
                                            href={route(
                                                'guru.quizes.edit',
                                                quiz.id,
                                            )}
                                            className={buttonVariants({
                                                variant: 'outline',
                                                size: 'sm',
                                                className:
                                                    'w-full rounded-xl sm:w-32',
                                            })}
                                        >
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </Link>

                                        {/* Tombol Hapus */}
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="w-full rounded-xl sm:w-32"
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Hapus
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-xl font-semibold text-slate-900">
                                                        Hapus Kuis?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription className="text-slate-500">
                                                        Tindakan ini tidak dapat
                                                        dibatalkan. semua data
                                                        siswa akan hilang
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter className="gap-2">
                                                    <AlertDialogCancel className="rounded-xl border-slate-200 font-semibold hover:bg-slate-50">
                                                        Batal
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            handleDelete(
                                                                quiz.id,
                                                            )
                                                        }
                                                        className="rounded-xl bg-rose-500 text-white hover:bg-rose-600"
                                                    >
                                                        Ya, Hapus Sekarang
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {quizzes.data.length > 0 && (
                    <div className="pt-8">
                        <Pagination>
                            <PaginationContent>
                                {quizzes.links.map((link, index) => (
                                    <PaginationItem key={index}>
                                        {link.label.includes('Previous') ? (
                                            <PaginationPrevious
                                                href={link.url}
                                                className={
                                                    !link.url
                                                        ? 'pointer-events-none opacity-50'
                                                        : 'cursor-pointer'
                                                }
                                            />
                                        ) : link.label.includes('Next') ? (
                                            <PaginationNext
                                                href={link.url}
                                                className={
                                                    !link.url
                                                        ? 'pointer-events-none opacity-50'
                                                        : 'cursor-pointer'
                                                }
                                            />
                                        ) : (
                                            <PaginationLink
                                                href={link.url}
                                                isActive={link.active}
                                                className={
                                                    link.active
                                                        ? 'bg-primary text-white hover:bg-primary/90'
                                                        : ''
                                                }
                                            >
                                                {link.label
                                                    .replace('&laquo; ', '')
                                                    .replace(' &raquo;', '')}
                                            </PaginationLink>
                                        )}
                                    </PaginationItem>
                                ))}
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </DashbordLayout>
    );
}
