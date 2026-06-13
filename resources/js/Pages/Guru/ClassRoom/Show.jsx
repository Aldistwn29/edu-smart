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
    BookOpen,
    Calendar,
    ChevronLeft,
    ClipboardList,
    Clock,
    Download,
    FileText,
    MoreVertical,
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

    const filteredMaterials =
        materials?.filter(
            (m) =>
                m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.description?.toLowerCase().includes(searchTerm.toLowerCase()),
        ) || [];

    const filteredQuizzes =
        quizzes?.filter((q) =>
            q.title.toLowerCase().includes(searchTerm.toLowerCase()),
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
                {/* Top Navigation */}
                <div className="flex items-center">
                    <Link
                        href={route('guru.classroom.index')}
                        className="flex items-center gap-2 text-sm font-semibold transition-colors group text-muted-foreground hover:text-primary"
                    >
                        <div className="flex items-center justify-center w-10 h-10 transition-all shadow-sm rounded-xl bg-card ring-1 ring-border/50 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
                            <ChevronLeft className="w-6 h-6" />
                        </div>
                        Kembali ke Daftar Kelas
                    </Link>
                </div>

                {/* Header Section */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-border/50 p-8 shadow-xl shadow-primary/5 md:p-12">
                    <div className="absolute w-64 h-64 rounded-full -right-20 -top-20 bg-primary/5 blur-3xl" />
                    <div className="absolute w-64 h-64 rounded-full -bottom-20 -left-20 bg-primary/10 blur-3xl" />

                    <div className="relative z-10">
                        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant="outline"
                                        className="text-xs font-bold tracking-widest uppercase rounded-lg border-primary/20 bg-primary/5 text-primary"
                                    >
                                        {classroom.subject}
                                    </Badge>
                                    <span className="w-1 h-1 rounded-full bg-border" />
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {classroom.academic_year}
                                    </span>
                                </div>
                                <h1 className="text-5xl font-black tracking-tight text-foreground md:text-7xl">
                                    {classroom.name}
                                </h1>
                                <p className="flex items-center gap-2 text-lg font-medium text-muted-foreground">
                                    Kode Kelas:
                                    <span className="px-3 py-1 font-mono text-xl transition-colors rounded-lg cursor-pointer select-all bg-muted text-primary hover:bg-primary/5">
                                        {classroom.code}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Left: Students Sidebar */}
                    <div className="lg:col-span-4 lg:row-span-2">
                        <Card className="flex h-full flex-col overflow-hidden rounded-[2rem] border-none bg-card/50 shadow-xl backdrop-blur-sm">
                            <CardHeader className="pt-8 pb-6 space-y-4 border-b bg-muted/30">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-3 text-2xl font-black">
                                        <Users className="w-6 h-6 text-primary" />
                                        Siswa
                                    </CardTitle>
                                    <Badge className="px-3 py-1 text-sm rounded-xl">
                                        {classroom.students?.length || 0} Total
                                    </Badge>
                                </div>
                                <div className="relative">
                                    <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Cari siswa..."
                                        className="w-full h-10 pl-10 pr-4 text-sm border-none rounded-xl bg-background/50 ring-1 ring-border focus:ring-2 focus:ring-primary"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </div>
                            </CardHeader>
                            <ScrollArea className="flex-1 px-2 py-4">
                                <div className="px-4 space-y-1">
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
                                                    className="flex items-center gap-4 p-3 transition-all cursor-pointer group rounded-2xl hover:bg-primary/5 hover:pl-4"
                                                >
                                                    <Avatar className="w-12 h-12 transition-all border-2 border-transparent group-hover:border-primary/20">
                                                        <AvatarFallback className="font-bold bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                                                            {student.name.charAt(
                                                                0,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-sm font-bold tracking-tight truncate">
                                                            {student.name}
                                                        </p>
                                                        <p className="text-xs truncate text-muted-foreground">
                                                            {student.email}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="transition-opacity opacity-0 group-hover:opacity-100"
                                                    >
                                                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                                    </Button>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="py-20 text-center">
                                                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-muted">
                                                    <Users className="w-8 h-8 text-muted-foreground/50" />
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
                                <TabsList className="items-center p-1 shadow-sm h-14 w-fit rounded-2xl bg-card/50 backdrop-blur-md">
                                    <TabsTrigger
                                        value="materials"
                                        className="h-full gap-2 rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        Materi
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="quizzes"
                                        className="h-full gap-2 rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                                    >
                                        <ClipboardList className="w-4 h-4" />
                                        Quiz
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="materials" className="mt-0">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
                                    <AnimatePresence mode="popLayout">
                                        {filteredMaterials.length > 0 ? (
                                            filteredMaterials.map((m, i) => (
                                                <motion.div
                                                    key={m.id}
                                                    variants={itemVariants}
                                                    custom={i}
                                                    initial="hidden"
                                                    animate="visible"
                                                    layout
                                                >
                                                    <Card className="relative p-6 overflow-hidden transition-all border-none group rounded-3xl bg-card/50 hover:bg-card hover:shadow-2xl hover:shadow-primary/5">
                                                        <div className="flex items-start gap-5">
                                                            <div className="flex items-center justify-center transition-colors h-14 w-14 shrink-0 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white">
                                                                <FileText className="h-7 w-7" />
                                                            </div>
                                                            <div className="flex-1 space-y-1">
                                                                <div className="flex items-start justify-between">
                                                                    <h3 className="text-lg font-black transition-colors line-clamp-1 group-hover:text-primary">
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
                                                                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent
                                                                            align="end"
                                                                            className="rounded-2xl"
                                                                        >
                                                                            <DropdownMenuItem className="gap-2">
                                                                                <Download className="w-4 h-4" />
                                                                                Download
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem className="gap-2 text-destructive">
                                                                                <Trash2 className="w-4 h-4" />
                                                                                Hapus
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </div>
                                                                <p className="text-sm line-clamp-2 text-muted-foreground">
                                                                    {m.description ||
                                                                        'Tidak ada deskripsi untuk materi ini.'}
                                                                </p>
                                                                <div className="flex items-center gap-4 pt-2 mt-4">
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="text-xs rounded-lg"
                                                                    >
                                                                        {m.type ||
                                                                            'FILE'}
                                                                    </Badge>
                                                                    <span className="text-xs text-muted-foreground">
                                                                        Ditambahkan{' '}
                                                                        {
                                                                            m.created_at_human
                                                                        }
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
                                                <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full shadow-inner bg-background">
                                                    <BookOpen className="w-12 h-12 text-muted-foreground/30" />
                                                </div>
                                                <h3 className="text-2xl font-black">
                                                    Belum ada materi
                                                </h3>
                                                <p className="max-w-sm mt-2 font-medium text-center text-muted-foreground">
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
                                        {filteredQuizzes.length > 0 ? (
                                            filteredQuizzes.map((q, i) => (
                                                <motion.div
                                                    key={q.id}
                                                    variants={itemVariants}
                                                    custom={i}
                                                    initial="hidden"
                                                    animate="visible"
                                                    layout
                                                >
                                                    <Card className="relative p-6 overflow-hidden transition-all border-none group rounded-3xl bg-card/50 hover:bg-card hover:shadow-2xl hover:shadow-primary/5">
                                                        <div className="flex items-start gap-5">
                                                            <div className="flex items-center justify-center transition-colors h-14 w-14 shrink-0 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white">
                                                                <ClipboardList className="h-7 w-7" />
                                                            </div>
                                                            <div className="flex-1 space-y-2">
                                                                <div className="flex items-start justify-between">
                                                                    <div>
                                                                        <h3 className="text-lg font-black transition-colors line-clamp-1 group-hover:text-primary">
                                                                            {
                                                                                q.title
                                                                            }
                                                                        </h3>
                                                                        <div className="flex items-center gap-3 mt-1">
                                                                            <Badge
                                                                                variant="secondary"
                                                                                className="border-none bg-primary/5 text-[10px] font-bold text-primary"
                                                                            >
                                                                                {q.questions_count ||
                                                                                    0}{' '}
                                                                                Soal
                                                                            </Badge>
                                                                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                                <Clock className="w-3 h-3" />
                                                                                {q.duration_minutes ||
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
                                                                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent
                                                                            align="end"
                                                                            className="rounded-2xl"
                                                                        >
                                                                            <DropdownMenuItem className="gap-2">
                                                                                <FileText className="w-4 h-4" />{' '}
                                                                                Detail
                                                                                Quiz
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem className="gap-2 text-destructive">
                                                                                <Trash2 className="w-4 h-4" />{' '}
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
                                                                            {q.deadline ||
                                                                                'Tidak ada'}
                                                                        </span>
                                                                    </div>
                                                                    <Link href={route('guru.quizes.show', q.id)}>
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
                                                <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full shadow-inner bg-background">
                                                    <ClipboardList className="w-12 h-12 text-muted-foreground/30" />
                                                </div>
                                                <h3 className="text-2xl font-black text-muted-foreground/60">
                                                    Belum ada Quiz
                                                </h3>
                                                <p className="max-w-sm mt-2 font-medium text-muted-foreground">
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
