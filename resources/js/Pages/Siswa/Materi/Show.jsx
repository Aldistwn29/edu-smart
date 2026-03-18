import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Download, FileText, User } from 'lucide-react';

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
                    {/* Tombol aksi */}
                    {/* Button Complete */}
                    <Button
                        variant="default"
                        className="rounded-full px-4 py-1 text-sm font-black uppercase tracking-wider"
                    >
                        Tandai Selesai
                    </Button>
                </div>

                {/* Header section */}
                <div className="relative overflow-hidden rounded-sm border border-border/50 bg-card p-6 shadow-sm md:p-10">
                    <div className="relative z-10 space-y-3">
                        <Badge
                            variant="secondary"
                            className="rounded-full px-4 py-1 text-sm font-black uppercase tracking-wider"
                        >
                            {material.classroom.name || 'Mata Pelajaran'}
                        </Badge>
                        <h1 className="text-2xl font-bold uppercase leading-tight tracking-tight text-foreground md:text-4xl">
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
                    {/* Dekorasi Background */}
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
                </div>

                {/* Content */}
                <div className="max-w-5xl space-y-8">
                    {material.type === 'video' && (
                        <div className="shadow-glow group overflow-hidden rounded-[2em] border-4 border-card bg-slate-900 transition-all">
                            <div className="aspect-video w-full">
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYoutubeId(material.content)}`}
                                    title={material.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="h-full w-full"
                                ></iframe>
                            </div>
                            {material.file_path && (
                                <div className="flex items-center justify-between border-t border-border bg-card p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                            Video Source Available
                                        </span>
                                    </div>
                                    <Button
                                        variant="default"
                                        className="shadow-glow rounded-xl font-bold"
                                        asChild
                                    >
                                        <a
                                            href={`/storage/${material.file_path}`}
                                            download
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    {material.type === 'text' && (
                        <Card className="overflow-hidden rounded-[2.5rem] border-none bg-card shadow-sm">
                            <CardContent className="p-8 md:p-12">
                                {/* Render Body dari Database jika ada, jika tidak tampilkan state kosong */}
                                {material.content ? (
                                    <article className="prose prose-slate prose-headings:font-black prose-headings:uppercase prose-headings:text-primary prose-p:font-medium prose-p:leading-relaxed max-w-none">
                                        <div
                                            className="leading-loose text-foreground/90"
                                            dangerouslySetInnerHTML={{
                                                __html: material.content,
                                            }}
                                        />
                                    </article>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/5">
                                            <FileText className="h-10 w-10 text-primary/40" />
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground">
                                            Materi Belum Ada
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Teks materi belum ditambahkan atau hanya berupa lampiran dokumen.
                                        </p>
                                    </div>
                                )}

                                {/* Jika disertai file tambahan */}
                                {material.file_path && (
                                    <div
                                        className={`${material.content ? 'mt-10 border-t border-border/50 pt-8' : ''} flex items-center justify-between`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                                Dokumen Lampiran Tersedia
                                            </span>
                                        </div>
                                        <Button
                                            variant="default"
                                            className="shadow-glow rounded-xl font-bold"
                                            asChild
                                        >
                                            <a
                                                href={`/storage/${material.file_path}`}
                                                download
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {material.type === 'file' && (
                        <div className="space-y-6 rounded-[2.5rem] border-2 border-dashed border-primary/20 bg-primary/5 p-10 text-center">
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-card shadow-sm ring-1 ring-primary/10">
                                <FileText className="text-primary" size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black uppercase text-foreground">
                                    {material.title}
                                </h3>
                                <p className="font-medium italic text-muted-foreground">
                                    {material.description}
                                </p>
                            </div>
                            <Button
                                variant="default"
                                size="xl"
                                className="shadow-glow rounded-2xl px-12 font-black"
                                asChild
                            >
                                <a
                                    href={`/storage/${material.file_path}`}
                                    target="_blank"
                                >
                                    <Download className="mr-3 h-6 w-6" />{' '}
                                    Download Materi Lengkap
                                </a>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
