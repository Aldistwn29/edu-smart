import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
export default function GuruDashboard() {
    return (
        <DashboardLayout>
            <Head title="Dashboard Guru" />
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800">
                    Dashboard Guru
                </h1>
                <p className="text-muted-foreground">
                    Selamat datang kembali! Berikut ringkasan aktivitas kelas
                    Anda.
                </p>
            </div>
        </DashboardLayout>
    );
}
