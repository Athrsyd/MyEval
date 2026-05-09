import { ChartLine, Home, ListCheck, BookOpen, Target as TargetIcon, Activity } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const BottomBar = () => {
    const location = useLocation();
    const pathname = location.pathname;

    // Tentukan halaman aktif berdasarkan URL
    const getActivePage = () => {
        if (pathname === '/') return 'home';
        if (pathname.startsWith('/todo')) return 'todo';
        if (pathname.startsWith('/aktivitas')) return 'activities';
        if (pathname.startsWith('/target')) return 'target';
        if (pathname.startsWith('/evaluasi')) return 'eval';
        if (pathname.startsWith('/statistik')) return 'stat';
    }

    const activePage = getActivePage();

    const navItems = [
        { id: 'home', to: '/', icon: Home, label: 'Home' },
        { id: 'todo', to: '/todo', icon: ListCheck, label: 'Todo' },
        { id: 'activities', to: '/aktivitas', icon: Activity, label: 'Log' },
        { id: 'target', to: '/target', icon: TargetIcon, label: 'Target' },
        { id: 'eval', to: '/evaluasi', icon: BookOpen, label: 'Jurnal' },
    ]

    return (
        <header className="w-full fixed bottom-0 left-0 z-50 px-4 ">
            <nav className="bg-indigo-500/10 backdrop-blur-2xl border border-white/15 shadow-lg shadow-indigo-500/20 rounded-t-3xl px-3 ">
                <div className="flex flex-row items-center justify-around">
                    {navItems.map((item) => {
                        const isActive = activePage === item.id;
                        const Icon = item.icon;
                        return (
                            <Link key={item.id} to={item.to} className="flex-1 flex justify-center">
                                <div className={`flex flex-col items-center px-2 py-2 rounded-2xl transition-all duration-500 ease-out relative will-change-transform
                  ${isActive ? 'text-white -translate-y-3' : 'text-gray-500 py-2'}`}>
                                    <div className={`p-3 rounded-full transition-all duration-500 will-change-transform
                    ${isActive ? 'bg-indigo-500 shadow-lg shadow-indigo-500/40 scale-110' : 'scale-100'}`}>
                                        <Icon size={isActive ? 22 : 20} className="transition-all duration-500" />
                                    </div>
                                    <span className={`text-[11px] mt-1 font-semibold tracking-wide transition-all duration-500
                    ${isActive ? 'text-indigo-300 opacity-100' : 'text-gray-500 opacity-75'}`}>
                                        {item.label}
                                    </span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </header>
    )
}

export default BottomBar