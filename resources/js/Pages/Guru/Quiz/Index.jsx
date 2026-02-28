import { Button } from '@/Components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/ui/pagination';
import DashbordLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import {
    BarChart3,
    BookOpen,
    Clock,
    LayoutList,
    Trash,
    User,
} from 'lucide-react';
export default function Index({ stats, quizzes }) {
    const getProgressWidth = (completed, total) => {
        if (total === 0) return 0;
        return (completed / total) * 100;
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
                                    className="space-y-4 rounded-3xl border border-slate-200 p-6 transition-colors hover:border-slate-300"
                                >
                                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-full border border-slate-300 px-2 py-1 text-[10px] font-bold uppercase text-slate-400 sm:text-xs">
                                                    Quiz
                                                </span>
                                                <h3 className="line-clamp-1 text-base font-bold text-slate-800">
                                                    {quiz.title}
                                                </h3>
                                            </div>
                                            <p className="line-clamp-2 max-w-2xl text-xs font-medium leading-relaxed text-slate-500 sm:text-sm">
                                                {quiz.description}
                                            </p>
                                        </div>
                                        {/* Info kanan : waktu, status, hapus */}
                                        <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-end">
                                            <div className="flex items-center text-xs font-bold text-slate-400 sm:text-sm">
                                                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                                                <span className="ml-1 sm:ml-2">
                                                    {quiz.remaining_days} hari
                                                    lagi
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold text-emerald-700 sm:text-xs">
                                                    Aktif
                                                </span>
                                                <Button
                                                    size="icon"
                                                    className="h-8 w-8 rounded-xl sm:h-9 sm:w-9"
                                                >
                                                    <Trash className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bar Progress */}
                                    <div className="space-y-2">
                                        <div className="flex justify-end text-xs font-bold text-slate-500">
                                            {quiz.completed_count} /{' '}
                                            {quiz.total_students} selesai
                                        </div>
                                        <div className="w-full bg-cyan-400 transition-all duration-300">
                                            <div
                                                className="h-full bg-cyan-400 transition-all duration-500"
                                                style={{
                                                    width: `${calculatedProgress(quiz.completed_count, quiz.total_students)}%`,
                                                }}
                                            ></div>
                                        </div>
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
                                {/* Tombol sebelumnya */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={quizzes.links.prev}
                                        className="cursor-pointer rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                    />
                                </PaginationItem>

                                {/* Halaman aktif 1 */}
                                <PaginationItem>
                                    <PaginationLink
                                        href={quizzes.links.first}
                                        className="rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                    >
                                        1
                                    </PaginationLink>
                                </PaginationItem>

                                {/* Halaman aktif 2 */}
                                <PaginationItem>
                                    <PaginationLink
                                        href={quizzes.links.second}
                                        className="rounded-xl border-slate-900 bg-slate-900 text-white hover:bg-slate-800"
                                    >
                                        2
                                    </PaginationLink>
                                </PaginationItem>

                                {/* Halaman aktif 3 */}
                                <PaginationItem>
                                    <PaginationLink
                                        href={quizzes.links.last}
                                        className="rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                    >
                                        3
                                    </PaginationLink>
                                </PaginationItem>

                                {/* Titik-titik jika halaman sangat banyak */}
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>

                                {/* Tombol selanjutnya */}
                                <PaginationItem>
                                    <PaginationNext
                                        href={quizzes.links.next}
                                        className="cursor-pointer rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </DashbordLayout>
    );
}
