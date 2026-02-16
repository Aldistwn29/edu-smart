import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function SiswaDashboard() {
    return (
        <DashboardLayout>
            <Head title="Dashboard Siswa" />
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800">
                    Hallo Aldi Setiawan
                </h1>
                <p className="text-muted-foreground">
                    Yuk lanjutkan belajarmu hari ini!
                </p>
            </div>
        </DashboardLayout>
    );
}
