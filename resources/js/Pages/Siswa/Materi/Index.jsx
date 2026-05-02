import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
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
import { ChevronRight, FileText, Search, User, Video } from 'lucide-react';

export default function Index({ materials, filters = {} }) {
    const handleFilter = (type) => {
        router.get(
            route('siswa.materies.index'),
            { ...filters, type: type === 'Semua' ? '' : type.toLowerCase() },
            { preserveState: true },
        );
    };
    return (
        <DashboardLayout>
            <Head title="Mangement Materi Siswa" />
            <div className="mx-w-7xl mx-auto animate-fade-in space-y-8">
                {/* Header section */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Management Materi Pembelajaran Siswa
                    </h1>
                    <p className="max-w-2xl text-sm font-medium text-muted-foreground md:text-base">
                        Eksplorasi modul pembelajaran interkatif, video materi
                        dan dokumen lainnya untuk mendukung perjalanan akademik
                        anda
                    </p>
                </div>

                {/* Filter and button */}
                <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-12">
                    <div className="group relative lg:col-span-8">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus:text-primary"
                            size={20}
                        />
                        <Input
                            placeholder="Cari Berdasarkan nama mata pelajaran..."
                            className="h-12 rounded-full border-border bg-card pl-12 shadow-sm transition-all focus-visible:ring-primary"
                            defaultValue={filters.search}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    router.get(
                                        route('siswa.materies.index'),
                                        { ...filters, search: e.target.value },
                                        { preserveState: true },
                                    );
                                }
                            }}
                        />
                    </div>

                    <div className="flex justify-start lg:col-span-4 lg:justify-end">
                        <div className="border-boder no-scrollbar inline-flex max-w-full overflow-x-auto rounded-full border bg-muted/50 p-1 backdrop-blur-sm">
                            {['Semua', 'Video', 'Text'].map((type) => {
                                const isActive =
                                    filters.type === type.toLowerCase() ||
                                    (!filters.type && type === 'Semua');
                                return (
                                    <Button
                                        key={type}
                                        onClick={() => handleFilter(type)}
                                        variant={isActive ? 'default' : 'ghost'}
                                        size="sm"
                                        className="rounded-xl px-6 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                                    >
                                        {type}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Materi list */}
                <div className="grid gap-5">
                    {materials.data.length > 0 ? (
                        materials.data.map((item) => (
                            <Card
                                key={item.id}
                                className="rounded-2xl border-border bg-card"
                            >
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                                        {/* Icon Area */}
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 md:h-20 md:w-20">
                                            {item.type === 'video' ? (
                                                <Video
                                                    className="text-primary"
                                                    size={24}
                                                />
                                            ) : (
                                                <FileText
                                                    className="text-primary"
                                                    size={24}
                                                />
                                            )}
                                        </div>

                                        {/* Content & Action Area */}
                                        <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge className="rounded-full border-none bg-secondary px-3 text-[10px] font-black uppercase tracking-wider text-secondary-foreground">
                                                            {item.classroom
                                                                ? (item.classroom.subject ? `${item.classroom.subject} - ${item.classroom.name}` : item.classroom.name)
                                                                : 'Umum'}
                                                        </Badge>
                                                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                                            • {item.type}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-semibold uppercase leading-tight tracking-tight text-foreground">
                                                        {item.title}
                                                    </h3>

                                                    <p className="line-clamp-2 text-sm font-medium italic text-muted-foreground">
                                                        {item.description ||
                                                            'Klik detail untuk melihat isi materi lengkap.'}
                                                    </p>
                                                </div>

                                                {/* Guru Info - Now below description */}
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                                                        <User
                                                            className="text-primary"
                                                            size={12}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">
                                                        Guru :{' '}
                                                        {item.teacher?.name ||
                                                            'Pengajar'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Button - Also below/aligned for easy reach */}
                                            <div className="shrink-0">
                                                <Button
                                                    asChild
                                                    size="xl"
                                                    className="group/btn w-full rounded-[1.25rem] border-primary/20 text-sm font-bold shadow-sm hover:border-primary/50 lg:w-auto"
                                                >
                                                    <Link
                                                        href={route(
                                                            'siswa.materies.show',
                                                            item.id,
                                                        )}
                                                    >
                                                        Details Materi
                                                        <ChevronRight
                                                            size={20}
                                                            className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1.5"
                                                        />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-muted/20 p-12 text-center text-muted-foreground">
                            <div className="mb-4 rounded-full bg-muted p-6">
                                <Search size={40} className="opacity-20" />
                            </div>
                            <h3 className="text-xl font-bold">
                                Materi tidak ditemukan
                            </h3>
                            <p className="max-w-xs text-sm">
                                Tidak ada materi yang sesuai dengan pencarian
                                atau kategori ini. Coba kata kunci lain atau
                                kategori yang berbeda.
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {materials.links?.length > 3 && (
                    <div className="flex justify-center pt-10 md:justify-end">
                        <Pagination>
                            <PaginationContent className="gap-2">
                                {materials.links.map((link, index) => (
                                    <PaginationItem key={index}>
                                        {link.label.includes('Previous') ? (
                                            <PaginationPrevious
                                                href={link.url || '#'}
                                                className={`rounded-xl border-border font-bold transition-all hover:bg-primary/5 ${
                                                    !link.url
                                                        ? 'pointer-events-none opacity-50'
                                                        : 'cursor-pointer hover:text-primary'
                                                }`}
                                            />
                                        ) : link.label.includes('Next') ? (
                                            <PaginationNext
                                                href={link.url || '#'}
                                                className={`rounded-xl border-border font-bold transition-all hover:bg-primary/5 ${
                                                    !link.url
                                                        ? 'pointer-events-none opacity-50'
                                                        : 'cursor-pointer text-primary'
                                                }`}
                                            />
                                        ) : (
                                            <PaginationLink
                                                href={link.url || '#'}
                                                isActive={link.active}
                                                className={`h-10 w-10 rounded-xl font-bold transition-all ${
                                                    link.active
                                                        ? 'shadow-glow border-none bg-primary text-primary-foreground hover:bg-primary/90'
                                                        : 'border-border hover:bg-primary/5 hover:text-primary'
                                                } ${!link.url ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
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
