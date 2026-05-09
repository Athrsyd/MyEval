import React, { useState } from 'react'
import BottomBar from '../Components/Global/BottomBar'
import { CheckCircle2, Target, BookOpen, Activity, TrendingUp, Calendar } from 'lucide-react'
import Favicon from '../assets/Favicon_MyEval.png'

const Dashboard = () => {
    const [todayDate] = useState(new Date().toLocaleDateString('id-ID', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
    }))

    const taskCompleted = 8
    const taskTotal = 12
    const progressPercent = (taskCompleted / taskTotal) * 100

    const stats = [
        { label: 'Tugas Hari Ini', value: `${taskCompleted}/${taskTotal}`, icon: CheckCircle2, color: 'from-indigo-500 to-indigo-600' },
        { label: 'Target Mingguan', value: '3/5', icon: Target, color: 'from-purple-500 to-purple-600' },
        { label: 'Jurnal Minggu', value: '4/7', icon: BookOpen, color: 'from-violet-500 to-violet-600' },
    ]

    const recentActivities = [
        { time: '08:00', activity: 'Subuh + Tadarus' },
        { time: '12:30', activity: 'Dhuhur + Makan Siang' },
        { time: '15:45', activity: 'Ashar + Review Pekerjaan' },
    ]

    return (
        <div className="w-full min-h-screen bg-linear-to-br from-[#0F172A] via-[#1a1f3a] to-[#0F172A] pb-24">
            
            {/* Header */}
            <div className="sticky top-0 z-40 px-4 py-5 backdrop-blur-xl border-b border-indigo-500/10 bg-[#0F172A]/40">
                <div className="flex items-center justify-between mb-2">
                    <img src={Favicon} alt="Logo" className="w-8 h-8" />
                    <Calendar className="w-5 h-5 text-indigo-400" />
                </div>
                <p className="text-gray-400 text-xs">{todayDate}</p>
            </div>

            {/* Main Content */}
            <div className="px-4 py-6 space-y-5">
                
                {/* Progress Card - Glassmorphism */}
                <div className="group relative">
                    <div className="absolute inset-0 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-indigo-500/10 to-transparent rounded-full -mr-20 -mt-20"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Progress Hari Ini</p>
                                    <h2 className="text-white font-bold text-2xl">{progressPercent.toFixed(0)}%</h2>
                                </div>
                                <div className="w-16 h-16">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="4" />
                                        <circle 
                                            cx="50" cy="50" r="45" fill="none" 
                                            stroke="url(#grad1)" 
                                            strokeWidth="4" 
                                            strokeDasharray={`${(progressPercent / 100) * 283} 283`}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000"
                                        />
                                        <defs>
                                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#6366f1" />
                                                <stop offset="100%" stopColor="#8b5cf6" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">Selesaikan {taskTotal - taskCompleted} tugas lagi untuk mencapai 100%</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon
                        return (
                            <div key={idx} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 hover:border-indigo-400/30 transition-all duration-300 hover:bg-white/8">
                                <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
                                <p className="text-white font-bold text-sm">{stat.value}</p>
                            </div>
                        )
                    })}
                </div>

                {/* Quick Actions */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                    <h3 className="text-white font-semibold text-sm mb-3">Aksi Cepat</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button className="bg-linear-to-br from-indigo-500/20 to-indigo-600/10 hover:from-indigo-500/30 hover:to-indigo-600/20 border border-indigo-400/30 rounded-xl py-3 px-3 text-indigo-300 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Input Todo</span>
                        </button>
                        <button className="bg-linear-to-br from-purple-500/20 to-purple-600/10 hover:from-purple-500/30 hover:to-purple-600/20 border border-purple-400/30 rounded-xl py-3 px-3 text-purple-300 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2">
                            <Activity className="w-4 h-4" />
                            <span>Aktivitas</span>
                        </button>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                    <h3 className="text-white font-semibold text-sm mb-3">Aktivitas Hari Ini</h3>
                    <div className="space-y-2">
                        {recentActivities.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 pb-2 border-b border-white/5 last:border-0">
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                                    <span className="text-indigo-400 font-semibold text-xs">{item.time}</span>
                                </div>
                                <p className="text-gray-300 text-sm flex-1">{item.activity}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <BottomBar />
        </div>
    )
}

export default Dashboard