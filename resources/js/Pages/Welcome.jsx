import { Button } from '@/Components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Brain,
    GraduationCap,
    LineChart,
    MessageSquare,
    Sparkles,
    Target,
    Users,
} from 'lucide-react';

export default function Welcome({ auth }) {
    const features = [
        {
            icon: BookOpen,
            title: 'Materi Interaktif',
            description:
                'Akses materi pembelajaran yang dirancang khusus untuk meningkatkan pemahaman siswa',
        },
        {
            icon: Target,
            title: 'Quiz & Penugasan',
            description:
                'Evaluasi pembelajaran dengan quiz dan penugasan yang terstruktur',
        },
        {
            icon: Brain,
            title: 'Asisten AI',
            description:
                'Chatbot AI yang membantu siswa belajar dengan pendekatan reflektif',
        },
        {
            icon: LineChart,
            title: 'Analisis Pembelajaran',
            description:
                'Pantau progress dan analisis pembelajaran siswa secara real-time',
        },
        {
            icon: Users,
            title: 'Manajemen Kelas',
            description:
                'Kelola kelas dan siswa dengan mudah dalam satu platform',
        },
        {
            icon: MessageSquare,
            title: 'Kolaborasi',
            description:
                'Komunikasi efektif antara guru dan siswa dalam proses pembelajaran',
        },
    ];

    const stats = [
        { value: '100+', label: 'Materi Pembelajaran' },
        { value: '50+', label: 'Quiz Interaktif' },
        { value: '24/7', label: 'Asisten AI' },
        { value: '∞', label: 'Kemungkinan Belajar' },
    ];

    return (
        <>
            <Head title="Selamat Datang" />
            <div className="min-h-screen bg-background">
                {/* Navigation */}
                <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
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
                <section className="relative overflow-hidden pt-32 pb-20">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,hsl(187_85%_43%/0.1),transparent_50%)]" />
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_80%,hsl(162_73%_46%/0.1),transparent_50%)]" />

                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                                    <Sparkles className="h-4 w-4" />
                                    Platform Pembelajaran Digital
                                </div>
                                <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
                                    Belajar Lebih{' '}
                                    <span className="text-gradient">
                                        Cerdas
                                    </span>{' '}
                                    dengan AI
                                </h1>
                                <p className="mb-8 text-lg text-muted-foreground">
                                    Platform pembelajaran digital yang
                                    menggabungkan teknologi AI untuk membantu
                                    guru dan siswa mencapai hasil pembelajaran
                                    yang optimal dengan pendekatan reflektif.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href={route('register')}>
                                        <Button
                                            size="lg"
                                            className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                                        >
                                            Mulai Belajar Gratis
                                        </Button>
                                    </Link>
                                    <Link href={route('login')}>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="h-12 px-8 text-base"
                                        >
                                            Masuk
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Right Content - Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative"
                            >
                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    className="glass relative rounded-3xl p-8 shadow-xl"
                                >
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
                                            <Brain className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">
                                                Asisten AI
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Siap membantu 24/7
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="rounded-xl bg-primary/5 p-4">
                                            <p className="text-sm text-muted-foreground">
                                                "Bagaimana cara memahami konsep
                                                ini?"
                                            </p>
                                        </div>
                                        <div className="rounded-xl bg-accent/5 p-4">
                                            <p className="text-sm">
                                                Mari kita bahas bersama dengan
                                                pendekatan yang mudah dipahami...
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2">
                                        <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
                                        <span className="text-xs text-muted-foreground">
                                            AI sedang mengetik...
                                        </span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="border-y border-border/40 bg-muted/30 py-16">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    className="text-center"
                                >
                                    <div className="mb-2 text-4xl font-bold text-primary">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16 text-center"
                        >
                            <h2 className="mb-4 text-4xl font-bold">
                                Fitur Unggulan
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                Semua yang Anda butuhkan untuk pengalaman
                                pembelajaran yang efektif dan menyenangkan
                            </p>
                        </motion.div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    <div className="relative">
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="mb-2 text-xl font-semibold">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative overflow-hidden py-20">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-accent to-primary opacity-10" />
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mb-4 text-4xl font-bold">
                                Siap Memulai Perjalanan Belajar?
                            </h2>
                            <p className="mb-8 text-lg text-muted-foreground">
                                Bergabunglah dengan ribuan siswa dan guru yang
                                telah merasakan pengalaman pembelajaran yang
                                lebih baik
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href={route('register')}>
                                    <Button
                                        size="lg"
                                        className="h-14 px-10 text-lg shadow-xl shadow-primary/25"
                                    >
                                        Daftar Gratis Sekarang
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-border/40 bg-muted/30 py-12">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
                                    <GraduationCap className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <div>
                                    <span className="text-lg font-bold">
                                        Edusmart
                                    </span>
                                    <p className="text-xs text-muted-foreground">
                                        Platform Belajar Digital
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                © 2026 Edusmart. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
