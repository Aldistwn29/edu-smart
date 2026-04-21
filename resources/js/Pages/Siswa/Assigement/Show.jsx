import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Download, Paperclip, Send, Upload } from 'lucide-react';
import { useRef } from 'react';

export default function Show({ assigement, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        file: null,
        note: '',
    });

    const fileInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('siswa.assigment.submit', assigement.id));
    };

    const resolveStatus = (status) => {
        switch (status) {
            case 'Mampu di kerjakan':
            case 'Belum di kumpulkan':
                return { text: 'Belum di kumpulkan', className: 'bg-red-100 text-red-700' };
            case 'Sedang dinilai':
            case 'Sudah di kumpulkan':
                return { text: 'Sudah di kumpulkan', className: 'bg-amber-100 text-amber-700' };
            case 'Sudah dinilai':
            case 'Sudah di nilai':
                return { text: 'Sudah di nilai', className: 'bg-green-100 text-green-700' };
            case 'Sudah lewat':
                return { text: 'Sudah lewat', className: 'bg-slate-100 text-slate-700' };
            default:
                return { text: status, className: 'bg-primary/10 text-primary' };
        }
    };
    
    const badgeStatus = resolveStatus(assigement.status);

    return (
        <DashboardLayout>
            <Head title={`Tugas - ${assigement.title}`} />
            <div className="w-full animate-fade-in space-y-10">
                <Link
                    href={route('siswa.assigements.index')}
                    className="group flex w-fit items-center gap-2 text-xs font-bold text-slate-400 transition-colors hover:text-primary md:text-sm"
                >
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 md:h-5 md:w-5" />
                    Kembali ke Daftar Tugas
                </Link>
                {/* Header */}
                <div className="flex w-full flex-col justify-between gap-6 md:flex-row md:items-start">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-black tracking-tight text-slate-900">
                            Halaman Pengumpulan Tugas
                        </h1>
                        <p className="max-w-2xl text-sm font-medium italic leading-relaxed text-slate-500">
                            Semangat untuk mengerjakan tugas, aktualisasi dari
                            materi yang sudah di pelajari
                        </p>
                    </div>

                    <div className="mt-4 flex flex-col items-end gap-3 md:mt-0">
                        <Badge
                            className={`rounded-full border-none px-5 py-2 text-[10px] font-black uppercase tracking-[1.5] ${badgeStatus.className}`}
                        >
                            {badgeStatus.text}
                        </Badge>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                Tanggal Pengumpulan
                            </span>
                            <span className="text-sm font-medium text-slate-900">
                                {assigement.deadline}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-12">
                    {/* Left */}
                    <div className="space-y-8 lg:col-span-8">
                        <div className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-sm">
                            <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-sm">
                                <CardContent className="p-10">
                                    <div className="mb-8 flex items-center gap-3">
                                        <div className="h-6 w-2 rounded-full bg-primary" />
                                        <h3 className="text-xl font-black text-slate-900">
                                            Task Overview
                                        </h3>
                                    </div>
                                    <div className="prose prose-slate max-w-none">
                                        <p className="mb-6 font-medium leading-relaxed text-slate-600">
                                            {assigement.description ||
                                                'Tidak ada deskripsi'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                            {/* Dokumen Tambahan */}
                            <Card className="overflow-hidden rounded-[2rem] border-none bg-white shadow-sm">
                                <CardContent className="p-10">
                                    <div className="mb-8 flex items-center gap-3">
                                        <Paperclip
                                            className="text-primary"
                                            size={20}
                                        />
                                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                                            Dokumen Tambahan
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        {[
                                            {
                                                name: 'File_tugas.PDF',
                                                type: 'PDF',
                                                color: 'text-red-500',
                                            },
                                            {
                                                name: 'File_tugas.WORD',
                                                type: 'WORD',
                                                color: 'text-blue-500',
                                            },
                                        ].map((file, idx) => (
                                            <div
                                                key={idx}
                                                className="group flex cursor-pointer items-center justify-between rounded-3xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-primary/50"
                                            >
                                                <div className="rounded-2xl bg-white p-3 shadow-sm">
                                                    <span
                                                        className={`text-[10px] font-black ${file.color}`}
                                                    >
                                                        {file.type}
                                                    </span>
                                                </div>
                                                <Download
                                                    className="text-slate-400 transition-colors group-hover:text-primary"
                                                    size={18}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    {/* Right */}
                    <div className="space-y-6 lg:col-span-4">
                        <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-sm">
                            <CardContent className="p-10">
                                <h4 className="mb-8 text-xl font-black text-slate-900">
                                    Kumpulkan Tugas
                                </h4>

                                <form
                                    className="space-y-8"
                                    onSubmit={handleSubmit}
                                >
                                    {/* Drag & Drop Area */}
                                    <div className="space-y-3">
                                        <Label className="ml-1 text-[10px] uppercase tracking-[0.2rem] text-slate-400">
                                            Upload Document
                                        </Label>

                                        <div
                                            className="group relative flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-[2.5rem] border-2 border-dashed border-primary/20 bg-primary/10 p-12 transition-all"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                        >
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-md transition-transform duration-500 group-hover:scale-110">
                                                <Upload size={48} />
                                            </div>
                                            <div className="space-y-1 text-center">
                                                <p className="text-[11px] font-black uppercase leading-tight tracking-widest text-slate-800">
                                                    {data.file
                                                        ? data.file.name
                                                        : 'Drag & Drop File'}
                                                </p>
                                                <p className="text-[9px] font-bold uppercase tracking-tighter text-slate-400">
                                                    PDF, WORD or Zip Max 100 MB
                                                </p>
                                            </div>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                onChange={(e) =>
                                                    setData(
                                                        'file',
                                                        e.target.files[0],
                                                    )
                                                }
                                            />
                                        </div>
                                        {errors.file && (
                                            <p className="text-xs font-medium text-red-500">
                                                {errors.file}
                                            </p>
                                        )}
                                    </div>

                                    {/* Note Area */}
                                    <div className="space-y-3">
                                        <Label className="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                            Catatan Tambahan
                                        </Label>
                                        <Textarea
                                            placeholder="Tambahkan pesan"
                                            className="min-h-[120px] rounded-[1.5rem] border-slate-200 bg-slate-50 p-5 text-sm font-medium shadow-none transition-all focus:ring-primary"
                                            value={data.note}
                                            onChange={(e) =>
                                                setData('note', e.target.value)
                                            }
                                        />
                                        {errors.note && (
                                            <p className="text-xs font-medium text-red-500">
                                                {errors.note}
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        size="xl"
                                        disabled={processing || !data.file}
                                        className="shadow-glow flex w-full items-center justify-center gap-3"
                                    >
                                        <Send size={20} />
                                        <span className="text-xs font-black uppercase tracking-[0.2em]">
                                            Kumpulkan Tugas
                                        </span>
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
