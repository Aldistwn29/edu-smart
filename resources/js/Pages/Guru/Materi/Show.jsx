import { Badge } from '@/Components/ui/badge';
import { Card, CardContent } from '@/Components/ui/card';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, FileText, CheckCircle2, XCircle } from 'lucide-react';

export default function Show({ materi, students }) {
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const d = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(d);
    };

    return (
        <DashboardLayout>
            <Head title={`Progress - ${materi.title}`} />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('guru.materies.index')}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-border/50 transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Progress Siswa</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Pantau siapa saja yang sudah selesai membaca materi
                        </p>
                    </div>
                </div>

                {/* Materi Info Card */}
                <Card className="overflow-hidden rounded-[1.5rem] border-none shadow-sm">
                    <CardContent className="bg-primary/5 p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">
                                    {materi.title}
                                </h3>
                                <p className="mt-1 text-sm font-medium text-slate-500">
                                    Kelas:{' '}
                                    <span className="font-bold text-primary">
                                        {materi.classroom?.name || 'Umum'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Students Table */}
                <Card className="overflow-hidden rounded-[1.5rem] border-none shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-500">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-700">
                                <tr>
                                    <th className="px-6 py-4">Siswa</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Waktu Selesai</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {students.length > 0 ? (
                                    students.map((student) => (
                                        <tr
                                            key={student.id}
                                            className="hover:bg-slate-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900">
                                                    {student.name}
                                                </div>
                                                <div className="font-medium text-slate-500">
                                                    {student.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.is_completed ? (
                                                    <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">
                                                        <CheckCircle2 className="mr-1.5 h-3 w-3" />
                                                        Sudah Selesai
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                    >
                                                        <XCircle className="mr-1.5 h-3 w-3" />
                                                        Belum Selesai
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.completed_at ? (
                                                    <span className="font-medium text-slate-600">
                                                        {formatDate(
                                                            student.completed_at
                                                        )}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400">
                                                        -
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-6 py-8 text-center text-slate-500 font-medium"
                                        >
                                            Belum ada siswa yang tergabung di
                                            kelas ini.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
