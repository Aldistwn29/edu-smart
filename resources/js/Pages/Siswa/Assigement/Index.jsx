import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    Calendar,
    Check,
    Clock,
    Download,
    FileText,
    User,
} from 'lucide-react';
import { useState } from 'react';

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

export default function Index({ assigement, stats, auth }) {
    // 1. State untuk menyimpan filter yang dipilih
    const [activeTab, setActiveTab] = useState('Semua');

    // 2. Logika memfilter data berdasarkan status dari backend
    const filteredTasks = assigement.filter((task) => {
        if (activeTab === 'Semua') return true;
        const statusText = resolveStatus(task.status).text;
        return statusText === activeTab;
    });

    return (
        <DashboardLayout>
            <Head title="Management Tugas Siswa" />
            <div className="w-full animate-fade-in-up space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-black text-foreground">
                        Halaman Management Tugas Siswa
                    </h1>
                    <p className="text-sm font-medium text-muted-foreground">
                        Semangat untuk mengerjakan tugas, {auth.user.name}
                    </p>
                </div>

                {/* Hero Card */}
                <Card className="relative overflow-hidden rounded-[2.5rem] border-none bg-slate-50/50 shadow-none ring-1 ring-slate-200/60 w-full">
                    <CardContent className="p-10 md:p-12">
                        {/* Konten Utama */}
                        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 w-full">
                            {/* Sisi Kiri: Pesan Sapaan & Stat Box */}
                            <div className="space-y-10 lg:col-span-8">
                                <div className="space-y-3 text-center md:text-left">
                                    <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl">
                                        Keep the momentum, {auth.user.name}
                                    </h2>
                                    <p className="max-w-xl text-lg font-medium text-slate-500">
                                        You have{' '}
                                        <span className="font-bold text-teal-600">
                                            {stats.total_active}
                                        </span>{' '}
                                        due this week. Ayo selesaikan biar tidur
                                        mu nyaman ✨
                                    </p>
                                </div>

                                {/* Box Statistik Statis */}
                                <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                                    <StatItem
                                        icon={<Clock size={24} />}
                                        label="Sudah terlewat"
                                        value={stats.total_late}
                                        color="destructive"
                                    />
                                    <StatItem
                                        icon={<FileText size={24} />}
                                        label="Sudah dikumpulkan"
                                        value={stats.total_submitted}
                                        color="primary"
                                    />
                                    <StatItem
                                        icon={<Check size={24} />}
                                        label="Sudah dinilai"
                                        value={stats.total_graded}
                                        color="success"
                                    />
                                </div>
                            </div>

                            {/* Sisi Kanan: Ilustrasi Dekoratif Besar */}
                            <div className="relative hidden h-full min-h-[150px] lg:col-span-4 lg:block">
                                {/* Book icon diposisikan absolute untuk melayang di pojok kanan bawah */}
                                <div className="pointer-events-none absolute -bottom-24 -right-8 rotate-12 select-none opacity-5">
                                    <BookOpen
                                        size={320}
                                        className="text-slate-900"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Filter */}
                <div className="flex flex-wrap items-center gap-3">
                    {['Semua', 'Belum di kumpulkan', 'Sudah di kumpulkan', 'Sudah di nilai', 'Sudah lewat'].map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            variant={activeTab === tab ? 'default' : 'ghost'}
                            className={`rounded-full px-5 text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeTab === tab
                                    ? 'shadow-glow bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground'
                            }`}
                        >
                            {tab}
                        </Button>
                    ))}
                </div>

                {/* Assigment Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 w-full">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <AssigementCard key={task.id} task={task} />
                        ))
                    ) : (
                        <div className="col-span-full flex animate-fade-in flex-col items-center justify-center py-20 text-center">
                            <div className="mb-6 rounded-[2.5rem] bg-slate-100 p-8">
                                <BookOpen
                                    size={64}
                                    className="text-slate-300"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">
                                Hore! Tidak ada tugas
                            </h3>
                            <p className="mt-2 max-w-xs text-slate-500">
                                Sepertinya untuk kategori{' '}
                                <strong>{activeTab}</strong> belum ada tugas.
                                Waktunya istirahat atau cek kategori lainnya! ✨
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

// function sub component
function StatItem({ icon, label, value, color }) {
    const colorClasses = {
        primary: 'bg-primary/10 text-primary',
        destructive: 'bg-destructive/10 text-destructive',
        success: 'bg-emerald-100 text-emerald-700',
    };

    return (
        <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-muted/30 px-5 py-3">
            <div className={`rounded-xl p-2 ${colorClasses[color]}`}>{icon}</div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                    {label}
                </p>
                <p className="text-lg font-black">{value}</p>
            </div>
        </div>
    );
}

function AssigementCard({ task }) {
    const badgeStatus = resolveStatus(task.status);
    const isPendingSubmission = ['Belum di kumpulkan', 'Sudah lewat'].includes(badgeStatus.text);
    const isOverdue = badgeStatus.text === 'Sudah lewat';
    const actionLabel = isPendingSubmission ? 'Kerjakan tugas' : 'Preview nilai';
    const actionHref = isPendingSubmission
        ? route('siswa.assigements.show', task.id)
        : route('siswa.assigements.success', task.id);
    const actionClassName = isOverdue
        ? 'w-full rounded-[1.75rem] bg-slate-300 text-slate-700 hover:bg-slate-300'
        : 'w-full rounded-[1.75rem] bg-primary text-primary-foreground hover:bg-primary/90';

    return (
        <Card className="h-full overflow-hidden rounded-[2rem] border-none shadow-sm ring-1 ring-border/50 transition-all hover:shadow-glow hover:ring-primary/20">
            <CardContent className="space-y-5 p-6 flex flex-col h-full">
                {/* Badge Header */}
                <div className="flex items-center justify-between">
                    <Badge
                        className={`rounded-full px-3 py-0.5 text-[10px] font-black uppercase ${badgeStatus.className}`}
                    >
                        {badgeStatus.text}
                    </Badge>
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:rotate-45">
                        <ArrowUpRight size={16} />
                    </div>
                </div>
                {/* Body */}
                <div className="space-y-2 flex-grow">
                    <Badge
                        variant="outline"
                        className="tracking-widest border-primary/20 text-[9px] font-black uppercase text-primary"
                    >
                        {task.type}
                    </Badge>
                    <h3 className="text-base font-bold leading-tight text-slate-900 pt-1">
                        {task.title}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground pt-1">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                            <User
                                size={12}
                                className="text-muted-foreground"
                            />
                        </div>
                        <span className="text-xs font-semibold">
                            {task.teacher}
                        </span>
                    </div>
                </div>
                {/* Footer info */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4 border-t border-border/50 pt-4 text-[11px] font-bold text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-primary" />
                            {task.deadline}
                        </div>
                    </div>

                    {badgeStatus.text !== 'Sudah lewat' && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                            </div>

                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary shadow-[0_0_10px_hsl(187_85%_43%/0.5)] transition-all duration-1000"
                                    style={{ width: `${task.progress}%` }}
                                />
                            </div>
                            <div className="flex items-center justify-between pt-1 opacity-0 hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-medium italic text-muted-foreground flex items-center gap-1">
                                    Lihat Detail <ArrowRight size={10} />
                                </span>
                            </div>
                        </div>
                    )}

                    <Button asChild className={actionClassName}>
                        <Link href={actionHref}>{actionLabel}</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

