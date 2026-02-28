import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import DashbordLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
export default function QuizBuilder({ quiz, classrooms }) {
    const { data, setData, post, processing, errors } = useForm({
        class_id: '',
        title: '',
        description: '',
        duration_minutes: 60,
        deadline: '',
        questions: [
            {
                id: Date.now(),
                text: '',
                type: 'multiple_choice',
                options: [
                    { option_text: '', is_correct: true },
                    { option_text: '', is_correct: false },
                    { option_text: '', is_correct: false },
                    { option_text: '', is_correct: false },
                ],
                correct_answer: '',
                points: 10,
            },
        ],
    });

    const handleSumbit = (e) => {
        e.preventDefault();
        post(route('guru.quizes.store'));
    };
    return (
        <DashbordLayout>
            <Head title="Buat Quiz" />
            <div className="mb-6">
                {/* Top Navigation */}
                <div className="flex items-center">
                    <Link
                        href={route('guru.quizes.index')}
                        className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-sm ring-1 ring-border/50 transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
                            <ChevronLeft className="h-6 w-6" />
                        </div>
                        Kembali ke Daftar Quiz
                    </Link>
                </div>
                {/* Header */}
                <div className="mt-6">
                    <h1 className="text-3xl font-bold text-foreground">
                        Buat Quiz
                    </h1>
                    <p className="text-muted-foreground">
                        Halaman untuk membuat quiz baru
                    </p>
                </div>
                <form
                    onSubmit={handleSumbit}
                    className="mx-auto max-w-5xl space-y-8 pb-20"
                >
                    {/* Input nama quiz */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="space-y-6 md:col-span-2">
                            <div className="space-y-4 rounded-2xl border border-slate-200 p-8 shadow-sm">
                                {/* Judul Quiz */}
                                <div className="space-y-2">
                                    <Label className="ml-1 text-sm font-bold uppercase text-slate-900">
                                        Judul Quiz
                                    </Label>
                                    <Input
                                        type="text"
                                        className="w-full border-none p-1 text-2xl placeholder:text-slate-300 focus:ring-0"
                                        placeholder="Masukkan judul quiz"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label className="ml-1 text-sm font-bold uppercase text-slate-900">
                                        Deskripsi
                                    </Label>
                                    <Input
                                        type="text"
                                        className="w-full border-none p-1 text-2xl placeholder:text-slate-300 focus:ring-0"
                                        placeholder="Masukkan deskripsi yang menyenangkan dan tidak menakutkan"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Deadline Section */}
                                <div className="space-y-3">
                                    <Label className="ml-1 text-sm font-black uppercase tracking-wider text-slate-900">
                                        Batas Waktu Pengerjaan
                                    </Label>

                                    {/* Tanggal Berakhir */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2 rounded-2xl border border-transparent bg-slate-50 p-4">
                                            <Label className="ml-1 text-sm font-black uppercase tracking-wider text-slate-900">
                                                Tanggal Berakhir
                                            </Label>
                                            <Input
                                                type="date"
                                                className="w-full border-none bg-transparent p-0 text-xl font-semibold focus:ring-0"
                                                value={data.deadline_date || ''}
                                                onChange={(e) =>
                                                    setData(
                                                        'deadline_date',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        {/* Kolom Waktu */}
                                        <div className="space-y-2 rounded-2xl border border-transparent bg-slate-50 p-4">
                                            <Label className="ml-1 text-sm font-black uppercase tracking-wider text-slate-900">
                                                Jam (WIB)
                                            </Label>
                                            <Input
                                                type="time"
                                                className="w-full border-none bg-transparent p-0 text-xl font-semibold focus:ring-0"
                                                value={data.deadline_time || ''}
                                                onChange={(e) =>
                                                    setData(
                                                        'deadline_time',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    {errors.deadline && (
                                        <p className="text-sm text-red-500">
                                            * {errors.deadline}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </DashbordLayout>
    );
}
