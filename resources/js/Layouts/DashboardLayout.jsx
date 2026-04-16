import { Button } from '@/Components/ui/button';
import { Link, router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    BookOpen,
    ClipboardList,
    DoorOpen,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Notebook,
    Settings,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DashbordLayout({ children }) {
    const { url, props } = usePage();
    const { auth } = props;
    const role = auth.user.role;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileMenuOpen, setmobileMenuOpen] = useState(false);

    // menu role
    const menuItems =
        role === 'guru'
            ? [
                  {
                      icon: LayoutDashboard,
                      label: 'Dashboard',
                      href: route('guru.dashboard'),
                  },
                  {
                      icon: DoorOpen,
                      label: 'Kelas',
                      href: route('guru.classroom.index'),
                  },
                  {
                      icon: BookOpen,
                      label: 'Mata Pelajaran',
                      href: route('guru.materies.index'),
                  },
                  {
                      icon: ClipboardList,
                      label: 'Quiz',
                      href: route('guru.quizes.index'),
                  },
                  {
                      icon: Notebook,
                      label: 'Penugasan',
                      href: route('guru.assigments.index'),
                  },
              ]
            : [
                  {
                      icon: LayoutDashboard,
                      label: 'Dashboard',
                      href: route('siswa.dashboard'),
                  },
                  {
                      icon: DoorOpen,
                      label: 'Kelas',
                      href: route('siswa.classroom.index'),
                  },
                  {
                      icon: BookOpen,
                      label: 'Mata Pelajaran',
                      href: route('siswa.materies.index'),
                  },
                  {
                      icon: ClipboardList,
                      label: 'Quiz',
                      href: route('siswa.quizzes.index'),
                  },
                  {
                      icon: Notebook,
                      label: 'Penugasan',
                      href: route('siswa.assigements.index'),
                  },
                  { icon: MessageSquare, label: 'Ai Chatbot', href: '#' },
                  { icon: Settings, label: 'Pengaturan', href: '#' },
              ];

    const logout = () => {
        router.post(
            route('logout'),
            {},
            {
                onSuccess: () => toast.success('Logout berhasil'),
            },
        );
    };
    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar - Desktop */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarOpen ? 280 : 80 }}
                className="fixed z-40 hidden h-screen flex-col border-r border-border bg-card lg:flex"
            >
                <div className="flex items-center gap-3 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary">
                        <GraduationCap className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="truncate text-xl font-bold"
                            >
                                Edusmart
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
                {/* Toggle button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                >
                    <Menu className="h-3 w-3" />
                </Button>
                {/* Navabar */}
                <nav className="mt-2 flex-1 space-y-1 px-2">
                    {menuItems.map((item) => {
                        let isActive = false;
                        if (item.href && item.href !== '#') {
                            try {
                                const itemPath = new URL(item.href).pathname;
                                isActive =
                                    url === itemPath ||
                                    url.startsWith(itemPath + '/');
                            } catch (error) {
                                isActive = false;
                            }
                        }
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex w-full items-center rounded-xl px-2 py-3 transition-all ${
                                    sidebarOpen
                                        ? 'justify-start gap-3'
                                        : 'justify-center'
                                } ${
                                    isActive
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                {sidebarOpen && (
                                    <span className="truncate text-sm font-medium">
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
                <div className="border-t border-border p-4">
                    <Button
                        variant="ghost"
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
                    >
                        <LogOut className="h-5 w-5 flex-shrink-0" />
                        {sidebarOpen && (
                            <span className="text-sm font-medium">Logout</span>
                        )}
                    </Button>
                </div>
            </motion.aside>
            {/* Sidebar - Menu Mobile */}
            <div className="fixed left-0 top-0 z-50 w-full border-b border-border bg-card px-4 py-3 lg:hidden">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <GraduationCap className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-bold">Edusmart</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setmobileMenuOpen(!mobileMenuOpen)}
                        className="rounded-md p-2 text-foreground transition-colors hover:bg-transparent hover:text-primary"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>
                {/* mobile navigation Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute left-0 right-0 top-full flex flex-col space-y-2 border-b border-border bg-card p-4 shadow-xl"
                        >
                            {menuItems.map((item) => {
                                let isActive = false;
                                if (item.href && item.href !== '#') {
                                    try {
                                        const itemPath = new URL(item.href)
                                            .pathname;
                                        isActive =
                                            url === itemPath ||
                                            url.startsWith(itemPath + '/');
                                    } catch (error) {
                                        isActive = false;
                                    }
                                }
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setmobileMenuOpen(false)}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                                            isActive
                                                ? 'bg-primary text-primary-foreground shadow-md'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        <item.icon size={20} />
                                        <span className="font-medium">
                                            {item.label}
                                        </span>
                                    </Link>
                                );
                            })}
                            <hr className="my-2 border-border" />
                            <Button
                                variant="ghost"
                                onClick={logout}
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-destructive hover:bg-destructive/10"
                            >
                                <LogOut size={20} />
                                <span className="font-bold">Logout</span>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* Main content */}
            <main
                className={`flex w-full flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[80px]'} pt-[72px] lg:pt-0`}
            >
                <div className="p-6">{children}</div>
            </main>
        </div>
    );
}
