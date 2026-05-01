import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    BookOpen,
    Eye,
    EyeOff,
    GraduationCap,
    Lock,
    User,
} from 'lucide-react';
import { useState } from 'react';

export default function LoginRegistrasi() {
    const [showPassword, setShowPassword] = useState(false);
    const [mode, setMode] = useState('login');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // From untuk mengirim data dari inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role: 'siswa',
        password: '',
        password_confirmation: '',
        remember: true,
    });

    // untuk handle sumbit dari form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === 'signup') {
            post(route('register'), {
                onFinish: () => reset('password'),
            });
        } else {
            post(route('login'), {
                onFinish: () => reset('password'),
            });
        }
    };

    return (
        <div className="flex min-h-screen">
            <Head title="Login & Registrasi" />
            {/* Leaft side - Form */}
            <div className="flex flex-1 items-center justify-center bg-background p-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {/* Button */}
                    <Link
                        href="/"
                        className="mb-8 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Kembali</span>
                    </Link>
                    {/* Logo */}
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-md">
                            <GraduationCap className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <span className="text-2xl font-bold">Edusmart</span>
                            <p className="text-sm text-muted-foreground">
                                Platform Belajar Digital Dengan Bantuan AI
                            </p>
                        </div>
                    </div>
                    {/* Role selection - Show for BOTH login and register */}
                    <div className="mb-6">
                        <Label className="mb-3 block text-sm font-medium">
                            {mode === 'login'
                                ? 'Masuk Sebagai'
                                : 'Daftar Sebagai'}
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                            {/* Siswa */}
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => setData('role', 'siswa')}
                                className={`h-auto flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all ${
                                    data.role === 'siswa'
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-border text-muted-foreground hover:border-primary/50'
                                }`}
                            >
                                <User className="h-8 w-8" />
                                <span className="text-base font-medium">
                                    Siswa
                                </span>
                            </Button>
                            {/* Guru */}
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => setData('role', 'guru')}
                                className={`h-auto flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all ${
                                    data.role === 'guru'
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-border text-muted-foreground hover:border-primary/50'
                                }`}
                            >
                                <BookOpen className="h-8 w-8" />
                                <span className="text-base font-medium">
                                    Guru
                                </span>
                            </Button>
                        </div>
                    </div>
                    {/* Tabs */}
                    <Tabs
                        value={mode}
                        onValueChange={(val) => {
                            setMode(val);
                            // Reset role to siswa when switching modes
                            setData('role', 'siswa');
                        }}
                    >
                        <TabsList className="mb-6 grid grid-cols-2">
                            <TabsTrigger value="login">Masuk</TabsTrigger>
                            <TabsTrigger value="signup">Daftar</TabsTrigger>
                        </TabsList>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === 'signup' && (
                                // Nama Lengkap
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Masukkan nama lengkap"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                            )}
                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Masukkan email anda"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="Masukkan password anda"
                                        className="pl-10 pr-10"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        required
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-destructive">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            {/* Confirm Password */}
                            {mode === 'signup' && (
                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">
                                        Konfirmasi Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password_confirmation"
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Konfirmasi password anda"
                                            className="pl-10 pr-10"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    'password_confirmation',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword,
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="text-sm text-destructive">
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </div>
                            )}
                            {/* Button sumbit */}
                            <Button
                                type="submit"
                                className="w-full py-6 text-lg"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Memproses...'
                                    : mode === 'login'
                                      ? 'Masuk'
                                      : 'Daftar'}
                            </Button>
                        </form>
                    </Tabs>
                </motion.div>
            </div>
            {/* Right Side - informasition statistics */}
            <div className="gradient-hero hidden flex-1 items-center justify-center p-8 lg:flex">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-lg text-center text-white"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 backdrop-blur"
                    >
                        <GraduationCap className="h-12 w-12 text-white" />
                    </motion.div>
                    <h2 className="mb-4 text-3xl font-bold">
                        Selamat Datang Edusmart
                    </h2>
                    <p className="mb-8 text-primary-foreground/80">
                        Platform pembelajaran untuk membantu guru dan siswa
                        dengan pendekatan pembelajaran replektif untuk siswa
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        {[
                            { value: '10+', label: 'Materi' },
                            { value: '10+', label: 'Quiz' },
                            { value: 'Ai', label: 'Asisten AI' },
                        ].map((stat, i) => (
                            <div
                                className="rounded-xl bg-primary-foreground/10 p-4 backdrop-blur"
                                key={i}
                            >
                                <div className="text-2xl font-bold">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-primary-foreground/70">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
