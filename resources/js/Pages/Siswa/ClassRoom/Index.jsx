import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, BookOpen, LayoutGrid, Search, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Index({ classrooms }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        code: '',
    });

    const handleJoin = (e) => {
        e.preventDefault();
        post(route('siswa.classroom.join'), {
            onSuccess: () => {
                (reset(), toast.success('Berhasil bergabung ke kelas'));
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title="Kelas Saya" />
            {/* Header */}
            <div className="mb-10 flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter text-slate-900">
                        Eksplorasi Kelas
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Massukan code kelas yang diberikan oleh guru untuk
                        bergabung ke dalam kelas
                    </p>
                </div>

                {/* Card Gabung kelas */}
                <Card className="max-w-2xl overflow-hidden rounded-3xl border-primary/20 bg-card/50 shadow-sm backdrop-blur-sm">
                    <CardContent className="space-y-5 p-4 md:p-6">
                        <form
                            id="join-class-form"
                            onSubmit={handleJoin}
                            className="flex flex-col"
                        >
                            <div className="group relative">
                                <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                <Input
                                    className="h-16 rounded-2xl border-2 border-muted bg-background/50 pl-14 text-xl font-semibold tracking-[0.2em] text-foreground shadow-none transition-all duration-300 placeholder:tracking-normal placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:bg-background focus-visible:ring-0"
                                    placeholder="MASUKKAN KODE KELAS"
                                    value={data.code}
                                    onChange={(e) =>
                                        setData(
                                            'code',
                                            e.target.value.toUpperCase(),
                                        )
                                    }
                                    required
                                />
                            </div>

                            {errors.code && (
                                <p className="ml-2 mt-2 text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                                    {errors.code}
                                </p>
                            )}
                        </form>

                        <Button
                            form="join-class-form"
                            type="submit"
                            disabled={processing}
                            className="h-14 w-full rounded-2xl bg-primary text-lg font-bold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
                        >
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                    <span>Memproses...</span>
                                </div>
                            ) : (
                                'Gabung ke Kelas'
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Grid daftar kelas */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                        <LayoutGrid className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold">
                        Kelas yang saya ikuti
                    </h2>
                </div>
                {classrooms.length === 0 ? (
                    <div className="rounded-sm border-2 border-dashed border-muted-foreground/20 bg-muted/20 py-24 text-center">
                        <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
                        <p className="font-medium text-muted-foreground">
                            Belum ada kelas yang diikuti <br />
                            Ayo bergabung sekarang
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {classrooms.map((cls) => (
                            <Card
                                key={cls.id}
                                className="group relative overflow-hidden rounded-sm border-border/50 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
                            >
                                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />
                                <CardHeader className="pb-4">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex h-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner transition-transform duration-500 group-hover:rotate-12">
                                            <BookOpen className="h-6 w-6" />
                                        </div>
                                        <h1 className="rounded-xl bg-muted/50 px-3 py-1 text-sm font-semibold text-muted-foreground">
                                            {cls.academic_year}
                                        </h1>
                                    </div>
                                    <div className="space-y-1">
                                        <CardTitle className="font-semibol line-clamp-1 text-xl tracking-tight transition-colors group-hover:text-primary">
                                            {cls.name}
                                        </CardTitle>
                                        <CardDescription className="font-medium text-primary/80">
                                            {cls.subject}
                                        </CardDescription>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4 pt-2">
                                    <div className="flex items-center gap-3 rounded-2xl bg-muted/30 p-3 transition-colors group-hover:bg-muted/50">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-background shadow-sm">
                                            <User className="h-4 w-4 text-primary" />
                                        </div>

                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm font-medium uppercase tracking-tighter text-muted-foreground">
                                                Guru mata pelajaran
                                            </span>
                                            <span className="truncate text-sm font-bold">
                                                {cls.teacher?.name}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Link */}
                                    <Link
                                        href={route(
                                            'siswa.classroom.show',
                                            cls.id,
                                        )}
                                        className="block w-full"
                                    >
                                        <Button
                                            variant="default"
                                            className="h-11 w-full gap-2 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                            Masuk Kela
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
