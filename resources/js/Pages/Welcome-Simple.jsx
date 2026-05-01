import { Button } from '@/Components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';

export default function WelcomeSimple({ auth }) {
    return (
        <>
            <Head title="Selamat Datang" />
            <div className="min-h-screen bg-background">
                {/* Navigation */}
                <nav className="border-b border-border bg-background">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                                <GraduationCap className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">Edusmart</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link href={route('dashboard')}>
                                    <Button>Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')}>
                                        <Button variant="ghost">Masuk</Button>
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button>Daftar Sekarang</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <h1 className="mb-6 text-5xl font-bold">
                            Belajar Lebih Cerdas dengan AI
                        </h1>
                        <p className="mb-8 text-lg text-muted-foreground">
                            Platform pembelajaran digital yang menggabungkan
                            teknologi AI untuk membantu guru dan siswa mencapai
                            hasil pembelajaran yang optimal.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href={route('register')}>
                                <Button size="lg">Mulai Belajar Gratis</Button>
                            </Link>
                            <Link href={route('login')}>
                                <Button size="lg" variant="outline">
                                    Masuk
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
