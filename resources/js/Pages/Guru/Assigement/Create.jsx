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
    Lightbulb,
    Paperclip,
    Save,
    Settings,
    UploadCloud,
    X,
} from 'lucide-react';
import { toast } from 'sonner';

export default function Create({ classrooms, materials }) {
    const { data, setData, post, processing, errors } = useForm({
        class_id: '',
        material_id: '',
        title: '',
        description: '',
        deadline: '',
        allow_date: false,
        notif_parents: true,
        submission_types: ['text', 'file'],
        attachment: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('guru.assigments.store'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Tugas berhasil disimpan');
            },
            onError: () => {
                toast.error('Tugas gagal disimpan', {
                    description: 'Terjadi kesalahan saat menyimpan tugas',
                });
            },
            onFinish: () => {
                toast.dismiss();
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title="Buat Tugas" />
            <form
                onSubmit={handleSubmit}
                className="min-h-screen pb-40 lg:pb-12"
            >
                {/* Navigation & Header Area */}
                <div className="space-y-6 py-6 md:space-y-10 md:py-10">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2 md:space-y-4">
                            <Link
                                href={route('guru.assigments.index')}
                                className="group flex w-fit items-center gap-2 text-xs font-bold text-slate-400 transition-colors hover:text-primary md:text-sm"
                            >
                                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 md:h-5 md:w-5" />
                                Kembali ke Daftar Tugas
                            </Link>
                            <div>
                                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
                                    Buat Tugas Baru
                                </h1>
                                <p className="mt-1 text-xs font-medium text-slate-500 md:mt-2 md:text-base lg:text-lg">
                                    Rancang penugasan yang interaktif untuk
                                    meningkatkan kualitas belajar siswa.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        {/* Main Content: Judul & Instruksi (8 columns on the LEFT) */}
                        <div className="space-y-6 lg:order-1 lg:col-span-8">
                            <Card className="overflow-hidden border-none shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100">
                                <div className="space-y-8 p-6 md:space-y-12 md:p-12 lg:p-16">
                                    {/* Judul Input */}
                                    <div className="space-y-3 md:space-y-4">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 md:text-xs">
                                            Judul Utama
                                        </Label>
                                        <Input
                                            placeholder="Tulis judul tugas..."
                                            className="h-auto border-none bg-transparent p-0 text-lg font-black placeholder:text-slate-200 focus-visible:ring-0 md:text-2xl lg:text-3xl"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData('title', e.target.value)
                                            }
                                        />
                                        <div className="h-1 w-8 rounded-full bg-primary/20 md:w-16" />
                                    </div>

                                    {/* Deskripsi/Instruksi Input */}
                                    <div className="space-y-3 md:space-y-4">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 md:text-xs">
                                            Panduan Instruksi
                                        </Label>
                                        <Textarea
                                            placeholder="Tuliskan misi tugas ini..."
                                            className="min-h-[250px] resize-none border-none bg-transparent p-0 text-sm font-medium leading-relaxed text-slate-700 placeholder:text-slate-100 focus-visible:ring-0 md:min-h-[400px] md:text-lg lg:text-xl lg:leading-loose"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Dropzone Area */}
                                <div className="border-t border-slate-50 bg-slate-50/20 p-6 md:p-12 lg:p-16">
                                    <div className="mb-6 flex flex-col items-start justify-between gap-4 md:mb-10 md:flex-row md:items-center">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary md:h-12 md:w-12">
                                                <Paperclip className="h-5 w-5 md:h-6 md:w-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-slate-800 md:text-2xl">
                                                    Lampiran
                                                </h3>
                                                <p className="text-xs font-medium text-slate-500 md:text-sm">
                                                    Modul atau Soal
                                                </p>
                                            </div>
                                        </div>
                                        <span className="hidden rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-500 sm:block">
                                            MAKS. 25MB
                                        </span>
                                    </div>

                                    <Label className="group flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-100 bg-white p-8 transition-all hover:border-primary hover:bg-primary/5 hover:shadow-2xl md:rounded-[3rem] md:border-4 md:p-16 lg:p-20">
                                        <div className="mb-4 rounded-2xl bg-slate-50 p-4 transition-all group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary md:mb-8 md:rounded-[2rem] md:p-8">
                                            <UploadCloud className="h-10 w-10 text-slate-300 md:h-16 md:w-16" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-base font-black text-slate-800 md:text-xl">
                                                Unggah Berkas
                                            </p>
                                            <p className="mt-1 text-xs font-medium text-slate-400 md:mt-2 md:text-base">
                                                atau ketuk untuk{' '}
                                                <span className="text-primary underline underline-offset-4 md:underline-offset-4">
                                                    pilih file
                                                </span>
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) =>
                                                setData(
                                                    'attachment',
                                                    e.target.files[0],
                                                )
                                            }
                                        />
                                    </Label>

                                    {data.attachment && (
                                        <div className="mt-6 flex items-center justify-between rounded-2xl border-2 border-primary/10 bg-white p-4 shadow-xl shadow-slate-100 md:mt-10 md:rounded-[2rem] md:p-8">
                                            <div className="flex items-center gap-3 md:gap-6">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg md:h-16 md:w-16 md:rounded-2xl">
                                                    <FileText className="h-6 w-6 md:h-8 md:w-8" />
                                                </div>
                                                <div className="max-w-[150px] truncate sm:max-w-xs md:max-w-none">
                                                    <p className="truncate text-sm font-black text-slate-900 md:text-xl">
                                                        {data.attachment.name}
                                                    </p>
                                                    <p className="mt-0.5 text-[10px] font-bold text-slate-400 md:mt-1 md:text-sm">
                                                        {(
                                                            data.attachment
                                                                .size /
                                                            1024 /
                                                            1024
                                                        ).toFixed(2)}{' '}
                                                        MB
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    setData('attachment', null)
                                                }
                                                className="h-10 w-10 text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500 md:h-14 md:w-14"
                                            >
                                                <X className="h-5 w-5 md:h-8 md:w-8" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Sidebar: Konfigurasi (4 columns on the RIGHT) */}
                        <div className="space-y-8 lg:order-2 lg:col-span-4">
                            <Card className="overflow-hidden border-none shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100">
                                <div className="border-b border-slate-50 bg-slate-50/30 p-6 text-center md:p-8 lg:text-left">
                                    <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-center lg:gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary md:h-12 md:w-12 md:rounded-2xl">
                                            <Settings className="h-5 w-5 md:h-6 md:w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 md:text-xl">
                                                Pengaturan
                                            </h3>
                                            <p className="text-xs font-medium text-slate-500 md:text-sm">
                                                Konfigurasi target tugas
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 p-6 md:space-y-10 md:p-10">
                                    {/* Kelas */}
                                    <div className="space-y-2 md:space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 md:text-xs md:tracking-[0.2em]">
                                            Pilih Kelas
                                        </Label>
                                        <Select
                                            onValueChange={(v) =>
                                                setData('class_id', v)
                                            }
                                        >
                                            <SelectTrigger className="h-14 rounded-xl border-slate-100 bg-slate-50/50 px-5 text-sm font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-primary/20 md:h-16 md:rounded-[1.25rem] md:px-6 md:text-base">
                                                <SelectValue placeholder="Pilih kelas" />
                                            </SelectTrigger>
                                            <SelectContent className="border-slate-200 bg-white p-1 shadow-2xl ring-1 ring-slate-200/50 md:rounded-2xl md:p-2">
                                                {classrooms.map((c) => (
                                                    <SelectItem
                                                        key={c.id}
                                                        value={c.id.toString()}
                                                        className="rounded-lg py-3 text-slate-600 transition-colors focus:bg-primary/10 focus:text-primary md:rounded-xl md:py-4"
                                                    >
                                                        <span className="font-bold">
                                                            {c.name}
                                                        </span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.class_id && (
                                            <p className="text-xs font-bold text-red-500 md:text-sm">
                                                {errors.class_id}
                                            </p>
                                        )}
                                    </div>

                                    {/* Materi */}
                                    <div className="space-y-2 md:space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 md:text-xs md:tracking-[0.2em]">
                                            Modul Materi{' '}
                                            <span className="font-bold text-slate-300">
                                                (Opsional)
                                            </span>
                                        </Label>
                                        <Select
                                            onValueChange={(v) =>
                                                setData('material_id', v)
                                            }
                                        >
                                            <SelectTrigger className="h-14 rounded-xl border-slate-100 bg-slate-50/50 px-5 text-sm font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-primary/20 md:h-16 md:rounded-[1.25rem] md:px-6 md:text-base">
                                                <SelectValue placeholder="Pilih materi" />
                                            </SelectTrigger>
                                            <SelectContent className="border-slate-200 bg-white p-1 shadow-2xl ring-1 ring-slate-200/50 md:rounded-2xl md:p-2">
                                                {materials
                                                    .filter(
                                                        (m) =>
                                                            m.class_id.toString() ===
                                                            data.class_id,
                                                    )
                                                    .map((m) => (
                                                        <SelectItem
                                                            key={m.id}
                                                            value={m.id.toString()}
                                                            className="rounded-lg py-3 text-slate-600 transition-colors focus:bg-primary/10 focus:text-primary md:rounded-xl md:py-4"
                                                        >
                                                            <span className="font-bold">
                                                                {m.title}
                                                            </span>
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Deadline */}
                                    <div className="space-y-2 md:space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 md:text-xs md:tracking-[0.2em]">
                                            Tenggat Waktu
                                        </Label>
                                        <Input
                                            type="datetime-local"
                                            className="h-14 rounded-xl border-slate-100 bg-slate-50/50 px-5 text-sm font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-primary/20 md:h-16 md:rounded-[1.25rem] md:px-6 md:text-base"
                                            onChange={(e) =>
                                                setData(
                                                    'deadline',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.deadline && (
                                            <p className="text-xs font-bold text-red-500 md:text-sm">
                                                {errors.deadline}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submission Types */}
                                    <div className="space-y-4 pt-2 md:space-y-6 md:pt-4">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 md:text-xs md:tracking-[0.2em]">
                                            Pengumpulan
                                        </Label>
                                        <div className="grid grid-cols-1 gap-3 md:gap-4">
                                            {['text', 'file'].map((type) => (
                                                <div
                                                    key={type}
                                                    className={`group relative flex cursor-pointer items-center space-x-4 rounded-xl border-2 p-4 transition-all active:scale-[0.98] md:space-x-5 md:rounded-[1.5rem] md:p-6 ${data.submission_types.includes(type) ? 'border-primary bg-primary/5 shadow-inner' : 'border-slate-50 bg-white shadow-sm hover:border-slate-200'}`}
                                                    onClick={() => {
                                                        const isChecked =
                                                            data.submission_types.includes(
                                                                type,
                                                            );
                                                        const newTypes =
                                                            !isChecked
                                                                ? [
                                                                      ...data.submission_types,
                                                                      type,
                                                                  ]
                                                                : data.submission_types.filter(
                                                                      (t) =>
                                                                          t !==
                                                                          type,
                                                                  );
                                                        setData(
                                                            'submission_types',
                                                            newTypes,
                                                        );
                                                    }}
                                                >
                                                    <div
                                                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border-2 transition-all ${data.submission_types.includes(type) ? 'scale-110 border-primary bg-primary text-white shadow-lg' : 'border-slate-200 bg-white'} md:h-7 md:w-7 md:rounded-xl md:border-2`}
                                                    >
                                                        {data.submission_types.includes(
                                                            type,
                                                        ) && (
                                                            <Save className="h-2.5 w-2.5 fill-current md:h-3 md:w-3" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="block text-sm font-black text-slate-800 md:text-lg">
                                                            {type === 'text'
                                                                ? 'Teks Jawaban'
                                                                : 'Unggah File'}
                                                        </span>
                                                        <span className="text-[10px] font-medium text-slate-500 md:text-sm">
                                                            {type === 'text'
                                                                ? 'Ketik langsung'
                                                                : 'PDF, Word, Image'}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Tips Area */}
                            <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-6 text-white shadow-2xl md:rounded-[2.5rem] md:p-10">
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-3xl md:-right-10 md:-top-10 md:h-40 md:w-40" />
                                <div className="relative space-y-4 md:space-y-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-white/10 backdrop-blur-xl md:h-16 md:w-16 md:rounded-3xl">
                                        <Lightbulb className="h-6 w-6 text-primary md:h-8 md:w-8" />
                                    </div>
                                    <div className="space-y-2 md:space-y-4">
                                        <h3 className="text-lg font-black italic md:text-2xl">
                                            Tips Pro
                                        </h3>
                                        <p className="text-sm leading-relaxed text-slate-400 md:text-lg">
                                            "Tugas yang baik memiliki instruksi
                                            yang eksplisit. Gunakan poin-poin
                                            untuk memandu siswa."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fixed Action Footer */}
                <div className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-slate-100 bg-white/80 p-4 backdrop-blur-2xl md:p-6 lg:static lg:z-auto lg:mt-12 lg:border-none lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
                    <div className="flex items-center justify-between gap-4 md:gap-8">
                        <div className="hidden items-center gap-6 xl:flex">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                                <Save className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black leading-tight text-slate-900">
                                    Sudah Selesai?
                                </h4>
                                <p className="text-sm font-medium text-slate-500">
                                    Simpan perubahan dan umumkan ke siswa
                                    sekarang.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-1 items-center gap-2 md:gap-4 lg:flex-none">
                            <Link
                                href={route('guru.assigments.index')}
                                className="hidden h-12 items-center px-4 font-bold text-slate-400 hover:text-slate-600 sm:flex md:h-14 md:px-8"
                            >
                                Batal
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-12 w-full rounded-xl bg-primary px-6 text-sm font-black text-white shadow-[0_10px_20px_rgba(79,70,229,0.2)] transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] md:h-14 md:rounded-2xl md:px-10 md:text-lg lg:h-16 lg:w-auto lg:px-12 lg:text-xl"
                            >
                                <Save className="mr-2 h-4 w-4 md:mr-3 md:h-5 md:w-5 lg:mr-4 lg:h-6 lg:w-6" />
                                Simpan & Terbitkan
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </DashboardLayout>
    );
}
