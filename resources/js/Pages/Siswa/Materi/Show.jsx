import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    ChevronLeft,
    Download,
    FileText,
    Folder,
    User,
} from 'lucide-react';

const getYoutubeId = (url) => {
    if (!url) return '';
    const regExp =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
};

export default function Show({ material, nextMaterial }) {
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
                                                {material.classroom.name || 'Mata Pelajaran'}
                                            </Badge>
                                            <span className="tracking-widest rounded-full bg-primary/10 px-4 py-1 text-[10px] font-black uppercase text-primary">
                                                {material.type}
                                            </span>
                                        </div>
                                        <h1 className="uppercase text-3xl font-black tracking-tight text-foreground md:text-4xl">
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
                                            Silahkan pelajari materi selengkapnya
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
                            variant="default"
                            className="w-full rounded-full px-4 py-1 text-sm font-black uppercase tracking-wider"
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Tandai Selesai
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
                                            <div className="bg-priamry/10 flex h-12 w-12 items-center justify-center rounded-xl text-primary">
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
                        <Card className="rounded-[2rem] border border-none border-border/40 bg-card p-6 shadow-sm">
                            <div className="space-y-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                    Materi Selanjutnya
                                </span>
                                <h4 className="text-lg font-bold leading-tight text-foreground">
                                    {nextMaterial ? nextMaterial.title : 'Coming Soon'}
                                </h4>
                                {nextMaterial ? (
                                    <Button
                                        variant="outline"
                                        className="h-auto p-0 text-xs font-black uppercase tracking-wider text-primary"
                                        asChild
                                    >
                                        <Link href={route('siswa.materies.show', nextMaterial.id)}>
                                            Pelajari Sekarang
                                            <ArrowRight
                                                size={18}
                                                className="ml-1"
                                            />
                                        </Link>
                                    </Button>
                                ) : (
                                    <p className="text-xs font-medium text-muted-foreground">
                                        Belum tersedia.
                                    </p>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
