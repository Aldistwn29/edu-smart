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
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { BookOpen, Copy, PlusCircle, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Index({ classrooms }) {
    const [open, setOpen] = useState(false);
    const [selectedClassroom, setSelectedClassroom] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        subject: '',
        academic_year: '2025/2026',
        description: '',
    });

    const { delete: destroy, processing: deleting } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('guru.classroom.store'), {
            onSuccess: () => {
                setOpen(false);
                reset();
                toast.success('Kelas berhasil dibuat');
            },
        });
    };

    const handleDelete = () => {
        if (!selectedClassroom) return;

        destroy(
            route('guru.classroom.destroy', {
                classRoom: selectedClassroom.id,
            }),
            {
                onSuccess: () => {
                    toast.success(
                        `Kelas ${selectedClassroom.name} berhasil dihapus`,
                    );
                    setSelectedClassroom(null);
                },
                onError: (errors) => {
                    console.error('Delete error:', errors);
                    toast.error('Gagal menghapus kelas. Silakan coba lagi.');
                },
                onFinish: () => {
                    // Jangan tutup otomatis jika ada error supaya user bisa lihat,
                    // tapi di sini kita tutup demi UX yang bersih jika terpancing onSuccess
                },
                preserveScroll: true,
            },
        );
    };

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        toast.success('Kode berhasil disalin: ' + code);
    };

    return (
        <DashboardLayout>
            <Head title="Daftar Kelas" />

            {/* Header Halaman */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-3xl font-bold tracking-tighter">
                        Kelas Saya
                    </p>
                    <p className="text-muted-foreground">
                        Kelola semua kelas dan siswa anda di sini.
                    </p>
                </div>
                {/* Model tambah kelas */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <PlusCircle className="h-4 w-4" />
                            Buat Kelas Baru
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle>Buat Kelas Baru</DialogTitle>
                                <DialogDescription>
                                    Lengkapi detail dibawah ini dengan generate
                                    code otomatis
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                {/* Nama Kelas */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Kelas</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="Kelas 7A"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Subject */}
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) =>
                                            setData('subject', e.target.value)
                                        }
                                        placeholder="Matematika"
                                        required
                                    />
                                    {errors.subject && (
                                        <p className="text-sm text-red-500">
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                {/* Deskripsi */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Deskripsi
                                    </Label>
                                    <Input
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Deskripsi Kelas"
                                        required
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Tahun Ajaran */}
                                <div className="space-y-2">
                                    <Label htmlFor="academic_year">
                                        Tahun Ajaran
                                    </Label>
                                    <Input
                                        id="academic_year"
                                        value={data.academic_year}
                                        onChange={(e) =>
                                            setData(
                                                'academic_year',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.academic_year && (
                                        <p className="text-sm text-red-500">
                                            {errors.academic_year}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    variant="default"
                                    disabled={processing}
                                >
                                    {processing ? 'Membuat...' : 'Simpan Kelas'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Empaty jika kelas kosong */}
            {classrooms.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-muted/30">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full">
                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="tex-xl font-semibold text-foreground">
                        Belum ada Kelas
                    </h3>
                    <p className="mb-6 text-muted-foreground">
                        Mulai dengan kelas pertama anda
                    </p>
                    <Button variant="default" onClick={() => setOpen(true)}>
                        Buat Kelas Sekarang
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {classrooms.map((cls) => (
                        <Card
                            key={cls.id}
                            className="group relative overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
                        >
                            {/* Decorative background element */}
                            <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />

                            <CardHeader className="pb-4">
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner transition-transform duration-500 group-hover:rotate-12">
                                        <BookOpen className="h-6 w-6" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyCode(cls.code)}
                                            className="h-8 select-none gap-2 rounded-xl bg-muted/50 px-3 text-xs font-bold transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
                                            title="Klik untuk salin kode kelas"
                                        >
                                            <span className="font-mono tracking-wider">
                                                {cls.code}
                                            </span>
                                            <Copy className="h-3.5 w-3.5 opacity-60" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                setSelectedClassroom(cls)
                                            }
                                            className="h-8 w-8 rounded-xl text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                                            title="Hapus Kelas"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="line-clamp-1 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                                        {cls.name}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-2 font-medium">
                                        <span className="text-primary/80">
                                            {cls.subject}
                                        </span>
                                        <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                                        <span>{cls.academic_year}</span>
                                    </CardDescription>
                                    <CardDescription className="line-clamp-1 font-medium text-muted-foreground">
                                        {cls.description}
                                    </CardDescription>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6 pt-2">
                                {/* Stats section */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 rounded-2xl bg-muted/30 p-3 transition-colors group-hover:bg-muted/50">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-background shadow-sm">
                                            <User className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-muted-foreground">
                                                Siswa
                                            </span>
                                            <span className="text-sm font-bold">
                                                {cls.students_count || 0}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-2xl bg-muted/30 p-3 transition-colors group-hover:bg-muted/50">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-background shadow-sm">
                                            <PlusCircle className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-muted-foreground">
                                                Status
                                            </span>
                                            <span className="text-sm font-bold">
                                                Aktif
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href={route('guru.classroom.show', cls.id)}
                                    className="w-full"
                                >
                                    <Button
                                        variant="default"
                                        className="h-11 w-full gap-2 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Kelola Kelas
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={!!selectedClassroom}
                onOpenChange={(open) => !open && setSelectedClassroom(null)}
            >
                <AlertDialogContent className="rounded-3xl border-none">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-bold tracking-tight">
                            Hapus Kelas?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-base font-medium">
                            Anda akan menghapus kelas{' '}
                            <span className="font-bold text-foreground">
                                {selectedClassroom?.name}
                            </span>
                            . Tindakan ini akan menghapus semua data materi,
                            tugas, dan quiz di dalamnya secara permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4 gap-3">
                        <AlertDialogCancel
                            disabled={deleting}
                            className="h-12 rounded-2xl border-2 px-6 font-bold"
                        >
                            Batalkan
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault(); // Mencegah dialog tertutup instan
                                    handleDelete();
                                }}
                                disabled={deleting}
                                className="h-12 rounded-2xl bg-destructive px-6 font-bold text-white hover:bg-destructive/90"
                            >
                                {deleting ? 'Menghapus...' : 'Ya, Hapus Kelas'}
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DashboardLayout>
    );
}
