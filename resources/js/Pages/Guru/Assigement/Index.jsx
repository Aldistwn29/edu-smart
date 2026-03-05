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
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    BarChart3,
    ClipboardList,
    Clock,
    LayoutList,
    Pencil,
    Trash,
    UserCheck,
} from 'lucide-react';
import { toast } from 'sonner';

export default function Index({ stats, assigements }) {
    const calculatedProgress = (completed, total) => {
        if (!total || total === 0) return 0;
        return (completed / total) * 100;
    };

    const handleDelete = (id) => {
        router.delete(route('guru.assigments.destroy', id), {
            onSuccess: () => {
                toast.success('Tugas berhasil dihapus');
            },
            onError: () => {
                toast.error('Gagal menghapus tugas');
            },
        });
    };

    const isDeadlinePassed = (deadline) => {
        return new Date(deadline) < new Date();
    };

    const getRemainingDays = (deadline) => {
        const diff = new Date(deadline) - new Date();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 0;
    };

    return (
        <DashboardLayout>
            <Head title="Manajemen Penugasan" />
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                            Manajemen Penugasan
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                            Pantau dan kelola pengerjaan tugas oleh siswa Anda
                        </p>
                    </div>
                    <Link href={route('guru.assigments.create')}>
                        <Button size="xl" className="w-full sm:w-auto">
                            Buat Tugas
                        </Button>
                    </Link>
                </div>

                {/* KPI Card */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
                    {/* Total Tugas */}
                    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 md:text-xs">
                                Total Tugas
                            </p>
                            <p className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
                                {stats.total_assigements}
                            </p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-2.5 text-slate-400 md:p-3">
                            <ClipboardList className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                    </div>
                    {/* Total Pengumpulan */}
                    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 md:text-xs">
                                Total Pengumpulan
                            </p>
                            <p className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
                                {stats.total_submissions}
                            </p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-2.5 text-slate-400 md:p-3">
                            <UserCheck className="h-5 w-5 md:h-6 md:w-6" />
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

                {/* Daftar Tugas */}
                <div className="space-y-4">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="rounded-xl bg-slate-50 p-3">
                            <LayoutList className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Daftar Tugas
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {assigements.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center space-y-4 rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
                                <div className="rounded-full bg-slate-100 p-4">
                                    <ClipboardList className="h-8 w-8 text-slate-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">
                                        Tugas belum ada
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Buat tugas untuk mulai menguji pemahaman
                                        siswa.
                                    </p>
                                </div>
                                <Link href={route('guru.assigments.create')}>
                                    <Button className="mt-2" variant="outline">
                                        Buat Tugas Pertama
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            assigements.data.map((task) => (
                                <div
                                    key={task.id}
                                    className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-primary/20 hover:bg-primary/5"
                                >
                                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary sm:text-xs">
                                                    {task.classroom?.name}
                                                </span>
                                                <h3 className="line-clamp-1 text-lg font-bold text-slate-800">
                                                    {task.title}
                                                </h3>
                                            </div>
                                            <p className="line-clamp-2 max-w-2xl text-xs font-medium leading-relaxed text-slate-500 sm:text-sm">
                                                {task.description}
                                            </p>
                                        </div>

                                        <div className="flex shrink-0 flex-col items-end gap-2">
                                            <div className="flex items-center text-xs font-bold text-slate-400 sm:text-sm">
                                                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                                                <span className="ml-1 sm:ml-2">
                                                    {!isDeadlinePassed(
                                                        task.deadline,
                                                    )
                                                        ? `${getRemainingDays(task.deadline)} hari lagi`
                                                        : 'Batas waktu berakhir'}
                                                </span>
                                            </div>
                                            {!isDeadlinePassed(
                                                task.deadline,
                                            ) ? (
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
                                                Progres Pengumpulan
                                            </span>
                                            <span className="text-slate-700">
                                                {task.submissions_count} /{' '}
                                                {task.classroom
                                                    ?.students_count || 0}{' '}
                                                Siswa
                                            </span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500"
                                                style={{
                                                    width: `${calculatedProgress(task.submissions_count, task.classroom?.students_count)}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-3 border-t border-slate-50 pt-2 sm:flex-row sm:justify-end">
                                        <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                                            <Link
                                                href={route(
                                                    'guru.assigments.submissions',
                                                    task.id,
                                                )}
                                                className={buttonVariants({
                                                    variant: 'default',
                                                    size: 'sm',
                                                    className:
                                                        'flex-1 rounded-xl sm:w-32',
                                                })}
                                            >
                                                <UserCheck className="mr-2 h-4 w-4" />
                                                Penilaian
                                            </Link>

                                            <Link
                                                href={route(
                                                    'guru.assigments.edit',
                                                    task.id,
                                                )}
                                                className={buttonVariants({
                                                    variant: 'outline',
                                                    size: 'sm',
                                                    className:
                                                        'flex-1 rounded-xl sm:w-32',
                                                })}
                                            >
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </Link>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        className="flex-1 rounded-xl sm:w-32"
                                                    >
                                                        <Trash className="mr-2 h-4 w-4" />
                                                        Hapus
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="text-xl font-semibold text-slate-900">
                                                            Hapus Tugas?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription className="text-slate-500">
                                                            Tindakan ini tidak
                                                            dapat dibatalkan.
                                                            Seluruh data
                                                            pengumpulan siswa
                                                            untuk tugas ini akan
                                                            dihapus.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter className="gap-2">
                                                        <AlertDialogCancel className="rounded-xl border-slate-200 font-semibold hover:bg-slate-50">
                                                            Batal
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                handleDelete(
                                                                    task.id,
                                                                )
                                                            }
                                                            className="rounded-xl bg-rose-500 text-white hover:bg-rose-600"
                                                        >
                                                            Ya, Hapus
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {assigements.data.length > 0 && (
                    <div className="pt-8">
                        <Pagination>
                            <PaginationContent>
                                {assigements.links.map((link, index) => (
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
        </DashboardLayout>
    );
}
