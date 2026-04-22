import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, CalendarCheck, CheckCircle2, Download, FileText } from "lucide-react";

export default function Success({ submission }) {
    return (
        <DashboardLayout>
            <Head title="Halaman Pengumpulan Tugas" />

            <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-6 rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 md:flex-row md:items-center md:justify-between md:p-10">
                    <div className="space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                            Status Pengumpulan
                        </p>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                            Tugas berhasil dikumpulkan
                        </h1>
                    </div>

                    <Badge className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
                        {submission.status}
                    </Badge>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                    <Card className="overflow-hidden rounded-[2.5rem] border-none bg-slate-950/5 shadow-lg">
                        <CardContent className="p-8 sm:p-10">
                            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
                                <div className="flex h-20 w-20 items-center justify-center rounded-[2.25rem] bg-emerald-500/10 text-emerald-700 shadow-sm">
                                    <CheckCircle2 size={34} />
                                </div>

                                <div className="space-y-4">
                                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
                                        Pengiriman Tugas
                                    </p>
                                    <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                                        Terima kasih! Berhasil dikirim.
                                    </h2>
                                    <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                        File tugas Anda sudah masuk ke sistem. Pengajar akan segera melakukan penilaian dan memberi umpan balik.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                                        Nama Tugas
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
                                            <FileText size={20} />
                                        </div>
                                        <p className="max-w-[220px] truncate text-sm font-semibold text-slate-900 sm:text-base">
                                            {submission.taskName}
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                                        Waktu Pengumpulan
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-50 text-amber-600">
                                            <CalendarCheck size={20} />
                                        </div>
                                        <p className="text-sm font-semibold text-slate-900 sm:text-base">
                                            {submission.submissionTime}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-lg">
                        <CardContent className="p-6 sm:p-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                                        Berkas yang Dikirim
                                    </p>
                                    <p className="text-base font-semibold text-slate-900 sm:text-lg">
                                        {submission.fileName}
                                    </p>
                                </div>
                                <Badge className="rounded-full bg-slate-100 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                                    {submission.status}
                                </Badge>
                            </div>

                            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-4 sm:p-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                                            <FileText size={26} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                {submission.fileName}
                                            </p>
                                            <p className="text-xs uppercase tracking-[0.24em] text-slate-400 sm:text-sm">
                                                PDF Document
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                                    >
                                        <Download size={18} />
                                    </Button>
                                </div>

                                <div className="mt-6 rounded-[1.75rem] bg-white p-4 text-center text-sm font-semibold text-slate-700 shadow-sm sm:p-5">
                                    {submission.score !== null ? (
                                        <span>
                                            Nilai Anda: <span className="text-slate-900">{submission.score}</span>
                                        </span>
                                    ) : (
                                        <span className="text-amber-700">
                                            Sedang direview oleh guru
                                        </span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 flex justify-center lg:justify-end">
                    <Button
                        asChild
                        className="w-full rounded-[2rem] bg-slate-900 px-6 py-4 text-sm font-black uppercase tracking-[0.15em] text-white shadow-glow transition duration-200 hover:-translate-y-0.5 sm:w-auto"
                    >
                        <Link href={route('siswa.assigements.index')}>
                            <span className="inline-flex items-center gap-3">
                                <ArrowLeft size={18} />
                                Kembali ke Daftar Tugas
                            </span>
                        </Link>
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
