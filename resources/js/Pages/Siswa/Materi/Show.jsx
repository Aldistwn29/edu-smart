import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    ChevronLeft,
    Download,
    FileText,
    Folder,
    Loader2,
    User,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const getYoutubeId = (url) => {
    if (!url) return '';
    const regExp =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
};

export default function Show({ material, nextMaterial, isCompleted }) {
    const [isLoading, setIsLoading] = useState(false);

    // Handler untuk menandai materi sudah selesai di baca
    const handleMarkAsCompleted = () => {
        if (isCompleted) return;

        router.post(
            route('siswa.materies.completed', material.id),
            {},
            {
                preserveScroll: true,
                onStart: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
                onSuccess: () => {
                    toast.success('Materi berhasil ditandai selesai');
                },
                onError: () => {
                    toast.error('Gagal menandai materi selesai');
                },
            },
        );
    };
    return (
        <DashboardLayout>
            <Head title={`Materi ${material.title}`} />
            <div className="animate-fade-in-up space-y-6">
                {/* Top Navigation */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <Link
                        href={route('siswa.materies.index')}
                        className="group flex items-center gap-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-sm ring-1 ring-border/50 transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
                            <ChevronLeft className="h-6 w-6" />
                        </div>
                        Kembali ke Daftar Materi
                    </Link>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Konten Kiri */}
                    <div className="space-y-6 lg:col-span-8">
                        {material.type === 'video' && (
                            <div className="shadow-glow overflow-hidden rounded-[2.5rem] border-4 border-card bg-slate-900 transition-all hover:scale-[1.01]">
                                <div className="aspect-video w-full">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${getYoutubeId(material.content)}`}
                                        title={material.title}
                                        allowFullScreen
                                        className="h-full w-full"
                                    ></iframe>
                                </div>
                            </div>
                        )}
                        {/* Area details */}
                        <Card className="relative overflow-hidden rounded-[2.5rem] border-none bg-card shadow-md">
                            {/* Dekorasi Background */}
                            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
                            <CardContent className="relative z-10 p-8 md:p-12">
                                <div className="space-y-6">
                                    {/* Header */}
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge
                                                variant="secondary"
                                                className="rounded-full px-4 py-1 text-xs font-black uppercase tracking-wider"
                                            >
                                                {material.classroom.name ||
                                                    'Mata Pelajaran'}
                                            </Badge>
                                            <span className="rounded-full bg-primary/10 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                                                {material.type}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
                                            {material.title}
                                        </h1>
                                        <p className="text-sm font-medium text-muted-foreground md:text-base">
                                            {material.description}
                                        </p>
                                        <div className="flex items-center gap-2 pt-2 text-muted-foreground">
                                            <User className="h-4 w-4 text-primary" />
                                            <span className="text-xs font-bold uppercase tracking-tight">
                                                Guru : {material.teacher.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-6 h-px w-full bg-border/50" />
                                {/* Isi konten materi */}
                                <article className="prose prose-slate dark:prose-invert max-w-none">
                                    <h3 className="text-xl font-bold text-primary">
                                        Materi pembelajaran
                                    </h3>
                                    {material.type === 'text' ? (
                                        <div
                                            className="leading-loose text-foreground/80"
                                            dangerouslySetInnerHTML={{
                                                __html: material.content,
                                            }}
                                        />
                                    ) : (
                                        <p className="italic text-muted-foreground">
                                            Silahkan pelajari materi
                                            selengkapnya
                                        </p>
                                    )}
                                </article>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Kolom konten */}
                    <div className="space-y-6 lg:col-span-4">
                        {/* Tombol mark complate */}
                        <Button
                            onClick={handleMarkAsCompleted}
                            disabled={isCompleted || isLoading}
                            className={`w-full rounded-2xl py-8 text-sm font-black uppercase tracking-wider shadow-md transition-all ${
                                isCompleted
                                    ? 'cursor-default bg-success text-success-foreground hover:bg-success'
                                    : 'shadow-glow bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95'
                            } `}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : isCompleted ? (
                                <CheckCircle2 className="mr-2 h-5 w-5" />
                            ) : (
                                <CheckCircle2 className="mr-2 h-5 w-5" />
                            )}

                            {isCompleted
                                ? 'Materi Selesai'
                                : 'Tandai Materi Selesai'}
                        </Button>

                        {/* Card resouce materi */}
                        <Card className="glass overflow-hidden rounded-[2rem] border-none shadow-sm">
                            <div className="flex items-center gap-3 border-b border-border/50 bg-muted/30 p-5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Folder size={18} />
                                </div>
                                <span className="text-sm font-black uppercase tracking-wider text-foreground/80">
                                    Resource Materi
                                </span>
                            </div>
                            <CardContent className="space-y-4 p-5">
                                {material.file_path ? (
                                    <div className="flex items-center justify-between rounded-2xl border border-border bg-card/50 p-4 transition-all hover:border-primary/50 hover:bg-card">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase text-foreground">
                                                    Modul Ajaran
                                                </p>
                                                <p className="text-[10px] font-medium text-muted-foreground">
                                                    File Document
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full hover:bg-primary hover:text-white"
                                            asChild
                                        >
                                            <a
                                                href={`/storage/${material.file_path}`}
                                                download
                                            >
                                                <Download size={18} />
                                            </a>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="py-6 text-center text-xs italic text-muted-foreground">
                                        Tidak ada resource materi
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Card next lesson */}
                        {nextMaterial ? (
                            <Link 
                                href={route('siswa.materies.show', nextMaterial.id)} 
                                className="group block"
                            >
                                <Card className="rounded-[2rem] border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                                Materi Selanjutnya
                                            </span>
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                        <h4 className="text-lg font-bold leading-tight text-foreground">
                                            {nextMaterial.title}
                                        </h4>
                                    </div>
                                </Card>
                            </Link>
                        ) : (
                            <div className="flex items-center justify-center rounded-[2rem] border border-dashed border-border bg-muted/20 p-8 text-center shadow-sm">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Semua materi telah diselesaikan
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
