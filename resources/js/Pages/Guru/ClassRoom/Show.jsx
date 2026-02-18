import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle } from '@/Components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import DashbordLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft,
    BookOpen,
    Calendar,
    ClipboardList,
    Clock,
    Download,
    FileText,
    MoreVertical,
    Plus,
    Search,
    Trash2,
    Users,
} from 'lucide-react';
import { useState } from 'react';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

export default function Show({ classroom, materials, quizzes = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents =
        classroom.students?.filter((student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ) || [];

    return (
        <DashbordLayout>
            <Head title={`Kelas ${classroom.name}`} />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-8"
            >
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-card p-8 text-card-foreground shadow-xl shadow-primary/5 md:p-12">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

                    <div className="relative z-10">
                        <div className="mb-7 flex items-center justify-start md:justify-end">
                            <Link href={route('guru.classroom.index')}>
                                <Button
                                    variant="outline"
                                    className="group rounded-2xl bg-background/50 px-4 backdrop-blur-md hover:bg-muted"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                    Kembali
                                </Button>
                            </Link>
                        </div>

                        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant="outline"
                                        className="rounded-lg border-primary/20 bg-primary/5 text-xs font-bold uppercase tracking-widest text-primary"
                                    >
                                        {classroom.subject}
                                    </Badge>
                                    <span className="h-1 w-1 rounded-full bg-border" />
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {classroom.academic_year}
                                    </span>
                                </div>
                                <h1 className="text-4xl font-black tracking-tight text-foreground md:text-6xl">
                                    {classroom.name}
                                </h1>
                                <p className="flex items-center gap-2 text-lg font-medium text-muted-foreground">
                                    Kode Kelas:
                                    <span className="cursor-pointer select-all rounded-lg bg-muted px-3 py-1 font-mono text-xl text-primary transition-colors hover:bg-primary/5">
                                        {classroom.code}
                                    </span>
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex -space-x-4 overflow-hidden">
                                    {classroom.students
                                        ?.slice(0, 4)
                                        .map((student, i) => (
                                            <Avatar
                                                key={i}
                                                className="h-12 w-12 border-4 border-card ring-2 ring-primary/10 transition-transform hover:z-20 hover:scale-110"
                                            >
                                                <AvatarFallback className="bg-primary/10 font-bold text-primary">
                                                    {student.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        ))}
                                    {classroom.students?.length > 4 && (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-card bg-muted font-bold text-muted-foreground">
                                            +{classroom.students.length - 4}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Left: Students Sidebar */}
                    <div className="lg:col-span-4 lg:row-span-2">
                        <Card className="flex h-full flex-col overflow-hidden rounded-[2rem] border-none bg-card/50 shadow-xl backdrop-blur-sm">
                            <CardHeader className="space-y-4 border-b bg-muted/30 pb-6 pt-8">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-3 text-2xl font-black">
                                        <Users className="h-6 w-6 text-primary" />
                                        Siswa
                                    </CardTitle>
                                    <Badge className="rounded-xl px-3 py-1 text-sm">
                                        {classroom.students?.length || 0} Total
                                    </Badge>
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Cari siswa..."
                                        className="h-10 w-full rounded-xl border-none bg-background/50 pl-10 pr-4 text-sm ring-1 ring-border focus:ring-2 focus:ring-primary"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </div>
                            </CardHeader>
                            <ScrollArea className="flex-1 px-2 py-4">
                                <div className="space-y-1 px-4">
                                    <AnimatePresence mode="popLayout">
                                        {filteredStudents.length > 0 ? (
                                            filteredStudents.map((student) => (
                                                <motion.div
                                                    layout
                                                    key={student.id}
                                                    variants={itemVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit={{
                                                        opacity: 0,
                                                        scale: 0.9,
                                                    }}
                                                    className="group flex cursor-pointer items-center gap-4 rounded-2xl p-3 transition-all hover:bg-primary/5 hover:pl-4"
                                                >
                                                    <Avatar className="h-12 w-12 border-2 border-transparent transition-all group-hover:border-primary/20">
                                                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 font-bold text-primary">
                                                            {student.name.charAt(
                                                                0,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="truncate text-sm font-bold tracking-tight">
                                                            {student.name}
                                                        </p>
                                                        <p className="truncate text-xs text-muted-foreground">
                                                            {student.email}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                                    </Button>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="py-20 text-center">
                                                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                                    <Users className="h-8 w-8 text-muted-foreground/50" />
                                                </div>
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    Tidak ada siswa ditemukan
                                                </p>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </ScrollArea>
                        </Card>
                    </div>

                    {/* Right: Content Tabs */}
                    <div className="lg:col-span-8">
                        <Tabs defaultValue="materials" className="space-y-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <TabsList className="h-14 w-fit items-center rounded-2xl bg-card/50 p-1 shadow-sm backdrop-blur-md">
                                    <TabsTrigger
                                        value="materials"
                                        className="h-full gap-2 rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                                    >
                                        <BookOpen className="h-4 w-4" />
                                        Materi
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="quizzes"
                                        className="h-full gap-2 rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                                    >
                                        <ClipboardList className="h-4 w-4" />
                                        Quiz
                                    </TabsTrigger>
                                </TabsList>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="h-14 items-center gap-2 rounded-2xl px-6 font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                            <Plus className="h-5 w-5" />
                                            Buat Baru
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-56 rounded-2xl p-2"
                                    >
                                        <Link href="#" className="w-full">
                                            <DropdownMenuItem className="cursor-pointer gap-2 rounded-xl py-3">
                                                <FileText className="h-4 w-4 text-primary" />
                                                Buat Materi
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link href="#" className="w-full">
                                            <DropdownMenuItem className="cursor-pointer gap-2 rounded-xl py-3">
                                                <ClipboardList className="h-4 w-4 text-primary" />
                                                Buat Quiz
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <TabsContent value="materials" className="mt-0">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
                                    <AnimatePresence mode="popLayout">
                                        {materials.length > 0 ? (
                                            materials.map((m, i) => (
                                                <motion.div
                                                    key={m.id}
                                                    variants={itemVariants}
                                                    custom={i}
                                                    initial="hidden"
                                                    animate="visible"
                                                    layout
                                                >
                                                    <Card className="group relative overflow-hidden rounded-3xl border-none bg-card/50 p-6 transition-all hover:bg-card hover:shadow-2xl hover:shadow-primary/5">
                                                        <div className="flex items-start gap-5">
                                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                                                <FileText className="h-7 w-7" />
                                                            </div>
                                                            <div className="flex-1 space-y-1">
                                                                <div className="flex items-start justify-between">
                                                                    <h3 className="line-clamp-1 text-lg font-black transition-colors group-hover:text-primary">
                                                                        {
                                                                            m.title
                                                                        }
                                                                    </h3>
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger
                                                                            asChild
                                                                        >
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="rounded-full"
                                                                            >
                                                                                <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent
                                                                            align="end"
                                                                            className="rounded-2xl"
                                                                        >
                                                                            <DropdownMenuItem className="gap-2">
                                                                                <Download className="h-4 w-4" />
                                                                                Download
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem className="gap-2 text-destructive">
                                                                                <Trash2 className="h-4 w-4" />
                                                                                Hapus
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </div>
                                                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                                                    {m.description ||
                                                                        'Tidak ada deskripsi untuk materi ini.'}
                                                                </p>
                                                                <div className="mt-4 flex items-center gap-4 pt-2">
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="rounded-lg text-xs"
                                                                    >
                                                                        PDF
                                                                    </Badge>
                                                                    <span className="text-xs text-muted-foreground">
                                                                        Ditambahkan
                                                                        2 hari
                                                                        lalu
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-border/50 bg-muted/20 py-24"
                                            >
                                                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-background shadow-inner">
                                                    <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                                                </div>
                                                <h3 className="text-2xl font-black">
                                                    Belum ada materi
                                                </h3>
                                                <p className="mt-2 max-w-sm text-center font-medium text-muted-foreground">
                                                    Bagikan modul atau bahan
                                                    ajar untuk mulai belajar
                                                    bersama siswa di kelas ini.
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </TabsContent>

                            <TabsContent value="quizzes" className="mt-0">
                                <div className="grid grid-cols-1 gap-4">
                                    <AnimatePresence mode="popLayout">
                                        {quizzes.length > 0 ? (
                                            quizzes.map((q, i) => (
                                                <motion.div
                                                    key={q.id}
                                                    variants={itemVariants}
                                                    custom={i}
                                                    initial="hidden"
                                                    animate="visible"
                                                    layout
                                                >
                                                    <Card className="group relative overflow-hidden rounded-3xl border-none bg-card/50 p-6 transition-all hover:bg-card hover:shadow-2xl hover:shadow-primary/5">
                                                        <div className="flex items-start gap-5">
                                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                                                <ClipboardList className="h-7 w-7" />
                                                            </div>
                                                            <div className="flex-1 space-y-2">
                                                                <div className="flex items-start justify-between">
                                                                    <div>
                                                                        <h3 className="line-clamp-1 text-lg font-black transition-colors group-hover:text-primary">
                                                                            {
                                                                                q.title
                                                                            }
                                                                        </h3>
                                                                        <div className="mt-1 flex items-center gap-3">
                                                                            <Badge
                                                                                variant="secondary"
                                                                                className="border-none bg-primary/5 text-[10px] font-bold text-primary"
                                                                            >
                                                                                {q.questions_count ||
                                                                                    0}{' '}
                                                                                Soal
                                                                            </Badge>
                                                                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                                <Clock className="h-3 w-3" />
                                                                                {q.duration ||
                                                                                    60}{' '}
                                                                                Menit
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger
                                                                            asChild
                                                                        >
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="rounded-full"
                                                                            >
                                                                                <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent
                                                                            align="end"
                                                                            className="rounded-2xl"
                                                                        >
                                                                            <DropdownMenuItem className="gap-2">
                                                                                <FileText className="h-4 w-4" />{' '}
                                                                                Detail
                                                                                Quiz
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem className="gap-2 text-destructive">
                                                                                <Trash2 className="h-4 w-4" />{' '}
                                                                                Hapus
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </div>

                                                                <div className="flex items-center justify-between pt-2">
                                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                        <Calendar className="h-3.5 w-3.5" />
                                                                        Deadline:{' '}
                                                                        <span className="font-medium text-foreground">
                                                                            {q.due_date ||
                                                                                'Tidak ada'}
                                                                        </span>
                                                                    </div>
                                                                    <Link href="#">
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline"
                                                                            className="h-8 rounded-xl border-primary/20 text-primary hover:bg-primary hover:text-white"
                                                                        >
                                                                            Lihat
                                                                            Hasil
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-border/50 bg-muted/20 py-24 text-center"
                                            >
                                                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-background shadow-inner">
                                                    <ClipboardList className="h-12 w-12 text-muted-foreground/30" />
                                                </div>
                                                <h3 className="text-2xl font-black text-muted-foreground/60">
                                                    Belum ada Quiz
                                                </h3>
                                                <p className="mt-2 max-w-sm font-medium text-muted-foreground">
                                                    Evaluasi kemampuan siswa
                                                    dengan membuat quiz
                                                    interaktif.
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </motion.div>
        </DashbordLayout>
    );
}
