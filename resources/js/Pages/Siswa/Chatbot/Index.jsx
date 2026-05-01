import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { ScrollArea } from '@/Components/ui/scroll-area';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/Components/ui/tooltip';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import {
    Book,
    Bot,
    ChartLine,
    LayoutGrid,
    SendHorizonal,
    Target,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ChatbotAi() {
    const { props } = usePage();
    const user = props.auth.user;

    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isLoading]);

    const handleSendMessage = async (text) => {
        if (!text.trim() || isLoading) return;

        const userMessage = { role: 'user', content: text };
        setChatHistory((prev) => [...prev, userMessage]);
        setMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post(
                route('siswa.chatbotai.generate'),
                {
                    message: text,
                },
            );

            const aiMessage = { role: 'ai', content: response.data.message };
            setChatHistory((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage = {
                role: 'ai',
                content:
                    'Maaf, terjadi kesalahan saat menghubungi server. Pastikan API key kamu valid.',
            };
            setChatHistory((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(message);
        }
    };

    const suggestion = [
        {
            title: 'Analisis Performa',
            desc: 'Analisis performa belajar siswa satu minggu',
            icon: <ChartLine className="h-6 w-6 md:h-8 md:w-8" />,
            delay: '100ms',
            query: 'Tolong analisis performa belajar saya berdasarkan nilai quiz dan tugas yang telah saya kerjakan.',
        },
        {
            title: 'Diagnosis',
            desc: 'Diagnosis Kelemahan dan Kekuatan Mata Pelajaran Siswa',
            icon: <Book className="h-6 w-6 md:h-8 md:w-8" />,
            delay: '200ms',
            query: 'Berdasarkan nilai-nilai saya, apa saja kelemahan dan kekuatan saya dalam belajar?',
        },
        {
            title: 'Action Plan',
            desc: 'Tips Kak AI untuk strategi belajar',
            icon: <Target className="h-6 w-6 md:h-8 md:w-8" />,
            delay: '300ms',
            query: 'Berikan saya strategi belajar dan action plan yang tepat agar nilai saya meningkat.',
        },
    ];

    return (
        <DashboardLayout>
            <Head title="Chatbot AI" />
            <div className="flex h-[calc(100vh-100px)] w-full flex-col px-4 py-4 sm:px-6 md:h-[calc(100vh-120px)] md:py-0 lg:px-8">
                {/* Header */}
                <div className="mb-6 mt-4 flex animate-fade-in items-center gap-3 md:mb-8 md:mt-0 md:gap-4">
                    <div className="rounded-2xl border border-border bg-card p-2.5 shadow-sm md:p-3">
                        <LayoutGrid className="h-5 w-5 text-muted-foreground md:h-6 md:w-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                            Ai Chatbot Pembelajaran
                        </h1>
                        <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground md:text-xs">
                            Analisis performa belajarmu dan dapatkan insight
                            yang menarik
                        </p>
                    </div>
                </div>

                {/* Main viewport */}
                <ScrollArea className="flex-1 pr-2 md:pr-4">
                    {chatHistory.length === 0 ? (
                        <div className="flex min-h-[400px] flex-col items-center justify-center py-6 md:min-h-[500px] md:py-8">
                            {/* KAK AI */}
                            <div className="mb-12 animate-fade-in-up text-center md:mb-16">
                                <div className="relative mb-5 inline-block md:mb-6">
                                    <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/20 blur-2xl md:blur-3xl" />
                                    <Avatar className="gradient-primary shadow-glow h-20 w-20 animate-float rounded-3xl border-none md:h-24 md:w-24">
                                        <AvatarFallback className="bg-transparent">
                                            <Bot
                                                className="h-10 w-10 text-white md:h-14 md:w-14"
                                                strokeWidth={1.5}
                                            />
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                <h2 className="mb-3 text-3xl font-medium tracking-tighter text-foreground md:mb-4 md:text-4xl">
                                    Hello Saya{' '}
                                    <span className="text-gradient font-bold">
                                        KAK AI
                                    </span>
                                </h2>

                                <p className="mx-auto max-w-xs text-xs font-semibold italic leading-relaxed text-muted-foreground md:max-w-lg md:text-sm">
                                    Saya akan membantu menganalisis performa
                                    belajar dan memberikan rekomendasi
                                    pembelajaran yang sesuai dengan kebutuhanmu
                                </p>
                            </div>

                            {/* Suggestion Grid */}
                            <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                                {suggestion.map((item, index) => (
                                    <Card
                                        key={index}
                                        onClick={() =>
                                            handleSendMessage(item.query)
                                        }
                                        className="group animate-fade-in-up cursor-pointer overflow-hidden rounded-[2rem] border border-border/50 bg-card shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:bg-card/50"
                                        style={{ animationDelay: item.delay }}
                                    >
                                        <CardContent className="relative flex flex-col items-center p-6 text-center md:p-10">
                                            <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                            <div className="mb-4 rounded-2xl bg-muted p-3 text-muted-foreground shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md md:mb-6 md:p-4">
                                                {item.icon}
                                            </div>
                                            <CardTitle className="mb-2 text-base font-bold tracking-tight transition-colors group-hover:text-primary md:mb-3 md:text-lg">
                                                {item.title}
                                            </CardTitle>
                                            <CardDescription className="text-xs leading-relaxed text-muted-foreground group-hover:text-foreground/80 md:text-sm">
                                                {item.desc}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="mx-auto flex w-full max-w-4xl flex-col space-y-6 px-2 py-6 md:py-8">
                            {chatHistory.map((chat, idx) => (
                                <div
                                    key={idx}
                                    className={`flex w-full animate-fade-in-up ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`flex max-w-[85%] gap-3 md:max-w-[80%] md:gap-4 ${chat.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <Avatar
                                            className={`h-8 w-8 flex-shrink-0 md:h-10 md:w-10 ${chat.role === 'ai' ? 'gradient-primary shadow-sm' : 'bg-muted'}`}
                                        >
                                            {chat.role === 'ai' ? (
                                                <Bot className="m-auto h-5 w-5 text-white md:h-6 md:w-6" />
                                            ) : (
                                                <AvatarFallback className="text-xs font-bold uppercase">
                                                    {user?.name?.substring(
                                                        0,
                                                        2,
                                                    ) || 'ME'}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                        <div
                                            className={`rounded-2xl px-4 py-3 shadow-sm md:px-5 md:py-3.5 ${chat.role === 'user' ? 'rounded-tr-sm bg-primary text-primary-foreground' : 'rounded-tl-sm border border-border bg-card'}`}
                                        >
                                            <div className="text-[13px] leading-relaxed md:text-sm prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-0">
                                                {chat.role === 'ai' ? (
                                                    <ReactMarkdown>{chat.content}</ReactMarkdown>
                                                ) : (
                                                    <div className="whitespace-pre-wrap">{chat.content}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex w-full animate-fade-in justify-start">
                                    <div className="flex max-w-[80%] flex-row gap-3 md:gap-4">
                                        <Avatar className="gradient-primary h-8 w-8 flex-shrink-0 shadow-sm md:h-10 md:w-10">
                                            <Bot className="m-auto h-5 w-5 animate-pulse text-white md:h-6 md:w-6" />
                                        </Avatar>
                                        <div className="flex h-12 items-center rounded-2xl rounded-tl-sm border border-border bg-card px-5 py-4 shadow-sm">
                                            <div className="flex space-x-1.5">
                                                <div
                                                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 md:h-2 md:w-2"
                                                    style={{
                                                        animationDelay: '0ms',
                                                    }}
                                                />
                                                <div
                                                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 md:h-2 md:w-2"
                                                    style={{
                                                        animationDelay: '150ms',
                                                    }}
                                                />
                                                <div
                                                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/80 md:h-2 md:w-2"
                                                    style={{
                                                        animationDelay: '300ms',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Remaining Suggestions (Prompt Sisa) */}
                            {!isLoading && chatHistory.length > 0 && (
                                <div className="mt-6 flex animate-fade-in-up flex-wrap gap-2">
                                    {suggestion
                                        .filter(
                                            (s) =>
                                                !chatHistory.some(
                                                    (chat) =>
                                                        chat.role === 'user' &&
                                                        chat.content ===
                                                            s.query,
                                                ),
                                        )
                                        .map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() =>
                                                    handleSendMessage(
                                                        item.query,
                                                    )
                                                }
                                                className="flex cursor-pointer items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-medium text-primary transition-all hover:bg-primary/10 hover:shadow-sm"
                                            >
                                                {item.icon && (
                                                    <span className="[&>svg]:h-4 [&>svg]:w-4">
                                                        {item.icon}
                                                    </span>
                                                )}
                                                {item.title}
                                            </div>
                                        ))}
                                </div>
                            )}

                            <div ref={scrollRef} className="h-2" />
                        </div>
                    )}
                </ScrollArea>

                {/* Chat Input Area */}
                <div className="mx-auto w-full max-w-4xl animate-fade-in-up pb-4 pt-4 md:pb-8">
                    <div className="group relative flex items-center">
                        <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl transition-colors group-focus-within:bg-primary/10 md:blur-2xl" />
                        <Input
                            placeholder="Ketik Pertanyaanmu disini..."
                            className="h-14 rounded-full border-border/50 bg-background/80 pl-6 pr-16 text-sm shadow-lg backdrop-blur-md transition-all duration-300 placeholder:italic focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30 md:h-16 md:pl-8 md:pr-20 md:text-base md:shadow-2xl"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        onClick={() =>
                                            handleSendMessage(message)
                                        }
                                        className="gradient-primary group-hover:shadow-glow absolute right-2 h-10 w-10 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 md:right-2.5 md:h-12 md:w-12"
                                        disabled={!message.trim() || isLoading}
                                    >
                                        <SendHorizonal className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-12 group-active:rotate-0 md:h-6 md:w-6" />
                                    </Button>
                                </TooltipTrigger>

                                <TooltipContent side="top" className="mb-2">
                                    Kirim Pesan
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
