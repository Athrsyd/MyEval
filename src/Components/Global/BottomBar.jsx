import { ChartLine, Home, List, ListCheck, Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const BottomBar = () => {
    //   const { isOpen, setPathBefore } = useNavbar();
    const location = useLocation();
    const pathname = location.pathname;

    // Tentukan halaman aktif berdasarkan URL
    const getActivePage = () => {
        if (pathname === '/') return 'home';
        if (pathname.startsWith('/todo')) return 'todo';
        if (pathname.startsWith('/evaluasi')) return 'eval';
        if (pathname.startsWith('/statistik')) return 'stat';
    }

    const activePage = getActivePage();


    const navItems = [
        { id: 'home', to: '/', icon: Home, label: 'Home' },
        { id: 'todo', to: '/todo', icon: ListCheck, label: 'Todo List' },
        { id: 'eval', to: '/evaluasi', icon: Star, label: 'Evaluasi' },
        { id: 'stat', to: '/statistik', icon: ChartLine, label: 'Statistik' },
    ]

    return (
        <header className="w-full fixed -bottom-5 left-0 z-50 px-4 pb-5">
            <nav className="bg-blue-500/30 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/10 rounded-t-2xl px-2 ">
                <div className="flex flex-row items-center justify-around">
                    {navItems.map((item) => {
                        const isActive = activePage === item.id;
                        const Icon = item.icon;
                        return (
                            <Link key={item.id} to={item.to} className="flex-1 flex justify-center">
                                <div className={`flex flex-col items-center px-3 rounded-xl transition-all duration-300 ease-in-out relative
                  ${isActive ? 'text-white -translate-y-4' : 'text-gray-400 py-2'}`}>
                                    <div className={`p-3 rounded-full transition-all duration-300 
                    ${isActive ? 'bg-violet-500 shadow-lg shadow-violet-500/40 scale-110' : ''}`}>
                                        <Icon size={isActive ? 22 : 20} />
                                    </div>
                                    <span className={`text-[12px] mt-1 font-semibold tracking-wide transition-all duration-300
                    ${isActive ? 'text-violet-600' : 'text-gray-400'}`}>
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