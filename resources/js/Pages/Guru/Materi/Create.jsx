import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft,
    FileText,
    LayoutGrid,
    Plus,
    Save,
    VideoIcon,
} from 'lucide-react';
import { toast } from 'sonner';

export default function Create({ classrooms }) {
    const { data, setData, post, processing, errors } = useForm({
        class_id: '',
        title: '',
        type: 'video',
        description: '',
        content: '',
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('guru.materies.store'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Materi berhasil disimpan');
            },
            onError: () => {
                toast.error('Materi gagal disimpan', {
                    description: 'Terjadi kesalahan saat menyimpan materi',
                });
            },
            onFinish: () => {
                toast.dismiss();
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title="Buat Materi Baru" />

            <div className="min-h-screen pb-12">
                {/* Navigation & Header */}
                <div className="space-y-6 px-4 py-6 md:px-6">
                    <Link
                        href={route('guru.materies.index')}
                        className="group flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-card shadow-sm ring-1 ring-border/50 transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
                            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                        </div>
                        Kembali ke Daftar Materi
                    </Link>

                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                                Buat Materi Baru
                            </h1>
                            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                                Tambahkan bahan ajaran yang berkualitas untuk
                                mempersiapkan generasi emas.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="h-12 w-full rounded-full bg-primary px-10 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] sm:w-auto"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Simpan Materi
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Form content */}
                <Card className="mx-4 overflow-hidden border-none shadow-2xl shadow-slate-200/50 md:mx-6">
                    <div className="grid grid-cols-1 md:grid-cols-12">
                        {/* Sidebar Info: Klasifikasi */}
                        <div className="border-b border-slate-100 p-6 md:col-span-4 md:border-b-0 md:border-r">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="flex items-center gap-2 font-semibold text-slate-800">
                                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                            <LayoutGrid className="h-5 w-5" />
                                        </div>
                                        Klasifikasi Materi
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        Pilih kelas target untuk materi ini agar
                                        siswa dapat mengaksesnya dengan mudah.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {/* Pilih Kelas */}
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-wider text-slate-400">
                                            Pilih Kelas
                                        </Label>
                                        <Select
                                            onValueChange={(v) =>
                                                setData('class_id', v)
                                            }
                                        >
                                            <SelectTrigger className="h-12 rounded-xl shadow-sm focus:ring-primary">
                                                <SelectValue placeholder="Pilih Kelas Target" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {classrooms.map((classroom) => (
                                                    <SelectItem
                                                        key={classroom.id}
                                                        value={classroom.id.toString()}
                                                    >
                                                        {classroom.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.class_id && (
                                            <p className="text-xs font-medium text-red-500">
                                                {errors.class_id}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Form Fields */}
                        <div className="p-6 md:col-span-8 md:p-8">
                            <div className="space-y-8">
                                {/* Judul Materi */}
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-wider text-slate-400">
                                        Judul Materi
                                    </Label>
                                    <Input
                                        placeholder="Masukkan judul materi yang menarik"
                                        className="h-auto border-none bg-transparent px-1 text-xl font-semibold placeholder:text-slate-300 focus-visible:ring-0 md:text-2xl"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                    />
                                    <div className="h-px w-full bg-slate-100" />
                                    {errors.title && (
                                        <p className="text-xs font-medium text-red-500">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                {/* Deskripsi */}
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-wider text-slate-400">
                                        Deksripsi Singkat
                                    </Label>
                                    <Textarea
                                        placeholder="Jelaskan yang akan dipelajari oleh siswa dengan narasi yang memotivasi dan mudah dimengerti."
                                        className="min-h-[150px] rounded-2xl border-slate-100 bg-slate-50/50 p-4 placeholder:text-slate-300 focus:ring-primary"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.description && (
                                        <p className="text-xs font-medium text-red-500">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Tipe Konten */}
                                <div className="space-y-6">
                                    <Label className="text-xs font-black uppercase tracking-wider text-slate-400">
                                        Tipe Konten
                                    </Label>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {[
                                            {
                                                id: 'video',
                                                label: 'Video Link',
                                                icon: VideoIcon,
                                                color: 'bg-blue-500',
                                            },
                                            {
                                                id: 'file',
                                                label: 'Word/PDF/PPT',
                                                icon: FileText,
                                                color: 'bg-orange-500',
                                            },
                                        ].map((t) => (
                                            <button
                                                key={t.id}
                                                type="button"
                                                onClick={() =>
                                                    setData('type', t.id)
                                                }
                                                className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 transition-all ${
                                                    data.type === t.id
                                                        ? 'border-primary bg-primary/5 shadow-inner'
                                                        : 'border-slate-50 bg-slate-50/30 hover:border-slate-200'
                                                }`}
                                            >
                                                <div
                                                    className={`rounded-xl p-3 text-slate-100 ${t.color}`}
                                                >
                                                    <t.icon className="h-6 w-6" />
                                                </div>
                                                <span className="font-bold text-slate-700">
                                                    {t.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Dynamic Input */}
                                {data.type === 'video' ? (
                                    <div className="slide-in-form-top-2 space-y-2 transition-all duration-300 animate-in">
                                        <Label className="text-xs font-black uppercase tracking-wider text-slate-400">
                                            URL Video (YouTube / GDrive)
                                        </Label>
                                        <div className="relative">
                                            <VideoIcon className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                                            <Input
                                                placeholder="https://youtube.com/watch?v=..."
                                                className="h-14 rounded-2xl border-slate-100 bg-slate-50 pl-12 focus:ring-primary"
                                                value={data.content}
                                                onChange={(e) =>
                                                    setData(
                                                        'content',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        {errors.content && (
                                            <p className="text-xs font-medium text-red-500">
                                                {errors.content}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="slide-in-form-top-2 space-y-2 transition-all duration-300 animate-in">
                                        <Label className="text-xs font-black uppercase tracking-wider text-slate-400">
                                            Unggah File Materi
                                        </Label>
                                        <div className="flex h-32 w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 transition-colors hover:border-primary">
                                            <Label className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 px-4 py-8">
                                                <Plus className="h-8 w-8 text-slate-400" />
                                                <span className="text-center text-sm font-medium text-slate-500">
                                                    {data.file
                                                        ? data.file.name
                                                        : 'Klik untuk pilih file materi'}
                                                </span>
                                                <Input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        setData(
                                                            'file',
                                                            e.target.files[0],
                                                        )
                                                    }
                                                />
                                            </Label>
                                        </div>
                                        {errors.file && (
                                            <p className="text-xs font-medium text-red-500">
                                                {errors.file}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
