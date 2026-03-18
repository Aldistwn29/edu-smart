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
import { Input } from '@/Components/ui/input';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { FileText, Pencil, Search, Trash, Video } from 'lucide-react';

export default function Index({ materials, filters }) {
    const handleFilter = (type) => {
        router.get(
            route('guru.materies.index'),
            { ...filters, type },
            {
                preserveState: true,
            },
        );
    };

    const handleDelete = (id) => {
        router.delete(route('guru.materies.destroy', id), {
            onStart: () => {},
            onSuccess: () => {
                toast.success('Materi berhasil dihapus');
            },
            onError: () => {
                toast.error('Materi gagal dihapus', {
                    description: 'Terjadi kesalahan saat menghapus materi',
                });
            },
            onFinish: () => {
                toast.dismiss();
            },
        });
    };
    return (
        <DashboardLayout>
            <Head title="Halaman Management Materi Guru" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Halaman Mangement Materi
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Kelola materi untuk bahan ajaran siswa
                        </p>
                    </div>

                    {/* Tombol Tambah Materi */}
                    <Link href={route('guru.materies.create')}>
                        <Button size="xl" className="w-full sm:w-auto">
                            Buat Materi
                        </Button>
                    </Link>
                </div>

                {/* Content: Search & Filter */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:w-1/3">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Cari Materi..."
                            className="pl-10"
                            defaultValue={filters.search}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    router.get(
                                        route('guru.materies.index'),
                                        { ...filters, search: e.target.value },
                                        { preserveState: true },
                                    );
                                }
                            }}
                        />
                    </div>

                    <div className="flex w-full items-center justify-center rounded-lg bg-gray-100 p-1 sm:w-auto">
                        {['all', 'video', 'text'].map((t) => (
                            <Button
                                key={t}
                                onClick={() => handleFilter(t)}
                                variant="ghost"
                                className={`flex-1 rounded-md px-4 py-2 text-sm capitalize sm:flex-none ${(filters.type || 'all') === t ? 'bg-white font-medium shadow-sm hover:bg-white' : 'text-gray-500 hover:bg-gray-200'}`}
                            >
                                {t === 'all' ? 'Semua' : t}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Card Materi */}
                {materials.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {materials.map((material, id) => (
                            <div
                                key={id}
                                className="group relative rounded-xl border p-5 transition-all hover:border-blue-200 hover:shadow-lg"
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div
                                        className={`rounded-lg p-2.5 ${
                                            material.type === 'video'
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-orange-100 text-orange-600'
                                        }`}
                                    >
                                        {material.type === 'video' ? (
                                            <Video className="h-5 w-5" />
                                        ) : (
                                            <FileText className="h-5 w-5" />
                                        )}
                                    </div>
                                    <span className="rounded-md bg-gray-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                                        {material.classroom?.name || 'Umum'}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="line-clamp-2 min-h-[3rem] text-lg font-bold leading-tight group-hover:text-blue-600">
                                        {material.title}
                                    </h3>
                                    <p className="line-clamp-2 text-sm text-muted-foreground">
                                        {material.description ||
                                            'Tidak ada deskripsi'}
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-6 space-y-2">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-muted-foreground">
                                            Progres Siswa
                                        </span>
                                        <span className="text-blue-600">
                                            {material.completed_at_count} /{' '}
                                            {material.classroom
                                                ?.students_count || 0}{' '}
                                            Selesai
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full bg-blue-500 transition-all duration-500"
                                            style={{
                                                width: `${
                                                    material.classroom
                                                        ?.students_count > 0
                                                        ? Math.min(
                                                              (material.completed_at_count /
                                                                  material
                                                                      .classroom
                                                                      .students_count) *
                                                                  100,
                                                              100,
                                                          )
                                                        : 0
                                                }%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Footer: Tombol Aksi */}
                                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                    {/* Tombol Edit */}
                                    <Link
                                        href={route(
                                            'guru.materies.edit',
                                            material.id,
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
                                                    Hapus Materi?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription className="text-slate-500">
                                                    Tindakan ini tidak dapat
                                                    dibatalkan. Seluruh progres
                                                    siswa pada materi ini akan
                                                    terhapus.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className="gap-2">
                                                <AlertDialogCancel className="rounded-xl border-slate-200 font-semibold hover:bg-slate-50">
                                                    Batal
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() =>
                                                        handleDelete(
                                                            material.id,
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
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-gray-50 p-12 text-center">
                        <div className="mb-4 rounded-full bg-gray-100 p-6">
                            <FileText className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                            Belum Ada Materi
                        </h3>
                        <p className="mt-2 max-w-sm text-muted-foreground">
                            Anda belum membuat materi apapun. Mulailah membuat
                            materi untuk dibagikan kepada siswa Anda.
                        </p>
                        <Link
                            href={route('guru.materies.create')}
                            className="mt-6"
                        >
                            <Button size="lg" className="rounded-full px-8">
                                Buat Materi Pertama
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
