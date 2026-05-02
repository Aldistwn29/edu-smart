import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import DashbordLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { CheckCircle2, ChevronLeft, Plus, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function QuizBuilder({ classrooms }) {
    const { data, setData, post, processing, errors } = useForm({
        class_id: '',
        title: '',
        description: '',
        duration_minutes: 60,
        deadline_date: '',
        deadline_time: '',
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
                points: 10,
            },
        ],
    });

    const addQuestion = () => {
        setData('questions', [
            ...data.questions,
            {
                id: Date.now(),
                text: '',
                type: 'multiple_choice',
                options: Array(4)
                    .fill(0)
                    .map((_, i) => ({ option_text: '', is_correct: i === 0 })),
                points: 10,
            },
        ]);
    };

    const toggleType = (index, type) => {
        const updated = [...data.questions];
        updated[index] = {
            ...updated[index],
            type: type,
            options:
                type === 'true_false'
                    ? [
                          { option_text: 'Benar', is_correct: true },
                          { option_text: 'Salah', is_correct: false },
                      ]
                    : Array(4)
                          .fill(0)
                          .map((_, i) => ({
                              option_text: '',
                              is_correct: i === 0,
                          })),
        };
        setData('questions', updated);
    };

    const removeQuestion = (index) => {
        const updated = data.questions.filter((_, i) => i !== index);
        setData('questions', updated);
    };

    const updateQuestion = (index, updates) => {
        const updated = [...data.questions];
        updated[index] = { ...updated[index], ...updates };
        setData('questions', updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.loading('Menyimpan quiz...');
        post(route('guru.quizes.store'), {
            onSuccess: () => {
                toast.success('Quiz berhasil disimpan');
            },
            onError: () => {
                toast.error('Quiz gagal disimpan', {
                    description: 'Terjadi kesalahan saat menyimpan quiz',
                });
            },
            onFinish: () => {
                toast.dismiss();
            },
        });
    };

    const totalPoints = data.questions.reduce(
        (acc, q) => acc + parseInt(q.points || 0),
        0,
    );

    return (
        <DashbordLayout>
            <Head title="Buat Quiz Baru" />

            <form onSubmit={handleSubmit} className="space-y-8 pb-20">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <Link
                        href={route('guru.quizes.index')}
                        className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-sm ring-1 ring-border/50 transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
                            <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
                        </div>
                        Kembali ke Daftar Quiz
                    </Link>
                </div>

                <div className="mt-6">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Buat Quiz Baru
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Ayo mulai bangun generasi bangsa dengan kuis yang
                        interaktif
                    </p>
                </div>

                {/* Section 1: Quiz Details */}
                <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    {/* Judul Quiz */}
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase text-slate-400">
                            Judul Quiz
                        </Label>
                        <Input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Contoh: Ulangan Harian Matematika"
                            className="h-12 rounded-xl border-slate-200 bg-white text-lg font-semibold text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary"
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Deskripsi */}
                    <div className="space-y-2 border-t border-slate-50 pt-4">
                        <Label className="text-xs font-black uppercase text-slate-400">
                            Deskripsi
                        </Label>
                        <textarea
                            className="w-full rounded-2xl border-none bg-slate-50 p-4 text-lg font-semibold text-slate-900 transition-all focus:border-primary focus:ring-2 focus:ring-primary"
                            placeholder="Apa tujuan quiz ini?"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Kelas */}
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase text-slate-400">
                                Pilih Kelas
                            </Label>
                            <select
                                className="w-full rounded-xl border-slate-200 font-semibold focus:border-primary focus:ring-primary"
                                value={data.class_id}
                                onChange={(e) =>
                                    setData('class_id', e.target.value)
                                }
                            >
                                <option value="">Pilih Kelas</option>
                                {classrooms.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {errors.class_id && (
                                <p className="text-sm text-red-500">
                                    {errors.class_id}
                                </p>
                            )}
                        </div>

                        {/* Durasi */}
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase text-slate-400">
                                Durasi (Menit)
                            </Label>
                            <Input
                                type="number"
                                value={data.duration_minutes}
                                onChange={(e) =>
                                    setData('duration_minutes', e.target.value)
                                }
                                className="h-11 rounded-xl border-slate-200 font-semibold"
                            />
                        </div>
                    </div>

                    {/* Deadline */}
                    <div className="space-y-4 border-t border-slate-50 pt-4">
                        <Label className="text-xs font-black uppercase text-slate-400">
                            Batas Waktu
                        </Label>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Input
                                type="date"
                                value={data.deadline_date}
                                onChange={(e) =>
                                    setData('deadline_date', e.target.value)
                                }
                                className="rounded-2xl border-slate-200 font-black"
                            />
                            <Input
                                type="time"
                                value={data.deadline_time}
                                onChange={(e) =>
                                    setData('deadline_time', e.target.value)
                                }
                                className="rounded-2xl border-slate-200 font-black"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 2: Question Builder */}
                <div className="space-y-6">
                    <h2 className="px-2 text-xl font-bold text-slate-800">
                        Daftar Soal
                    </h2>
                    {data.questions.map((q, index) => (
                        <div
                            key={index}
                            className="relative space-y-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-black text-white">
                                        {index + 1}
                                    </span>
                                    <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1">
                                        <Button
                                            type="button"
                                            variant={
                                                q.type === 'multiple_choice'
                                                    ? 'default'
                                                    : 'ghost'
                                            }
                                            size="sm"
                                            onClick={() =>
                                                toggleType(
                                                    index,
                                                    'multiple_choice',
                                                )
                                            }
                                            className={`rounded-lg px-4 py-3 text-xs font-bold transition-all ${q.type === 'multiple_choice' ? 'bg-white text-slate-900 shadow-sm hover:bg-slate-50' : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-700'}`}
                                        >
                                            Pilihan Ganda
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={
                                                q.type === 'true_false'
                                                    ? 'default'
                                                    : 'ghost'
                                            }
                                            size="sm"
                                            onClick={() =>
                                                toggleType(index, 'true_false')
                                            }
                                            className={`rounded-lg px-4 py-3 text-xs font-bold transition-all ${q.type === 'true_false' ? 'bg-white text-slate-900 shadow-sm hover:bg-slate-50' : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-700'}`}
                                        >
                                            Benar Salah
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 rounded-xl border bg-slate-50 px-3 py-1">
                                        <span className="text-sm font-black uppercase text-slate-400">
                                            Poin
                                        </span>
                                        <input
                                            type="number"
                                            className="w-8 border-none bg-transparent p-0 text-sm font-bold focus:ring-0"
                                            value={q.points}
                                            onChange={(e) =>
                                                updateQuestion(index, {
                                                    points: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={() => removeQuestion(index)}
                                        variant="ghost"
                                        className="p-2 text-slate-300 transition-colors hover:bg-red-200 hover:text-red-500"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <textarea
                                className="w-full rounded-2xl border-none bg-slate-50 p-4 text-lg font-medium transition-all focus:border-primary focus:ring-2 focus:ring-primary"
                                placeholder="Tuliskan pertanyaan..."
                                value={q.text}
                                onChange={(e) => {
                                    const updated = [...data.questions];
                                    updated[index] = {
                                        ...updated[index],
                                        text: e.target.value,
                                    };
                                    setData('questions', updated);
                                }}
                            />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {q.options.map((opt, optIndex) => (
                                    <div
                                        key={optIndex}
                                        onClick={() => {
                                            const updatedQuestions = [
                                                ...data.questions,
                                            ];
                                            const updatedOptions =
                                                updatedQuestions[
                                                    index
                                                ].options.map((o, i) => ({
                                                    ...o,
                                                    is_correct: i === optIndex,
                                                }));
                                            updatedQuestions[index] = {
                                                ...updatedQuestions[index],
                                                options: updatedOptions,
                                            };
                                            setData(
                                                'questions',
                                                updatedQuestions,
                                            );
                                        }}
                                        className={`flex cursor-pointer items-center rounded-2xl border-2 p-4 transition-all ${opt.is_correct ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                                    >
                                        <div
                                            className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full transition-colors ${opt.is_correct ? 'bg-emerald-500 text-white' : 'text-slate-200 hover:bg-slate-100'}`}
                                        >
                                            <CheckCircle2 className="h-5 w-5" />
                                        </div>
                                        <Input
                                            type="text"
                                            className="w-full border-none bg-transparent font-bold focus:ring-0"
                                            placeholder={`Opsi ${optIndex + 1}`}
                                            value={opt.option_text}
                                            disabled={q.type === 'true_false'}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => {
                                                const updatedQuestions = [
                                                    ...data.questions,
                                                ];
                                                const updatedOptions = [
                                                    ...updatedQuestions[index]
                                                        .options,
                                                ];
                                                updatedOptions[optIndex] = {
                                                    ...updatedOptions[optIndex],
                                                    option_text: e.target.value,
                                                };
                                                updatedQuestions[index] = {
                                                    ...updatedQuestions[index],
                                                    options: updatedOptions,
                                                };
                                                setData(
                                                    'questions',
                                                    updatedQuestions,
                                                );
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <Button
                        variant="ghost"
                        type="button"
                        onClick={addQuestion}
                        className="group flex w-full items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-slate-200 py-10 transition-all hover:border-primary hover:bg-primary/5"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 transition-all group-hover:bg-primary group-hover:text-white">
                            <Plus className="h-6 w-6" strokeWidth={3} />
                        </div>
                        <span className="text-lg font-bold text-slate-400 transition-colors group-hover:text-primary">
                            Tambah Pertanyaan Baru
                        </span>
                    </Button>
                </div>

                {/* Bottom Action Footer (Floating on Mobile/Tablet) */}
                <div className="sticky bottom-6 z-30 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-md lg:static lg:border-slate-100 lg:bg-slate-50 lg:p-8 lg:shadow-none">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center justify-between gap-6 lg:justify-start">
                            <div className="flex-1 lg:flex-none">
                                <p className="text-[10px] font-black uppercase tracking-wider text-primary lg:text-xs">
                                    Total Point
                                </p>
                                <h3
                                    className={`text-xl font-black lg:text-3xl ${totalPoints === 100 ? 'text-primary' : 'text-amber-500'}`}
                                >
                                    {totalPoints}/100
                                </h3>
                            </div>
                            <div className="hidden h-10 w-px bg-slate-200 lg:block"></div>
                            <div className="text-right lg:text-left">
                                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 lg:text-xs">
                                    Total Soal
                                </p>
                                <p className="text-xs font-bold text-slate-600 lg:text-sm">
                                    {data.questions.length} Soal
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="default"
                            size="lg"
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-2xl shadow-lg shadow-primary/20 lg:h-14 lg:w-auto lg:px-12"
                        >
                            <Save className="mr-2 h-5 w-5" />
                            <span className="font-bold">Buat Quiz Baru</span>
                        </Button>
                    </div>
                </div>
            </form>
        </DashbordLayout>
    );
}
