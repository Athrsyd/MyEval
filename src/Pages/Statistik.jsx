import React, { useState } from 'react'
import BottomBar from '../Components/Global/BottomBar'
import { TrendingUp, Calendar, CheckCircle2, AlertCircle } from 'lucide-react'

const Statistik = () => {
    const [selectedMonth, setSelectedMonth] = useState(4) // May = 4
    const [year] = useState(2026)

    const ibadahData = {
        'Salat': { completed: 24, target: 28, color: 'from-indigo-500 to-indigo-600', icon: '🤲' },
        'Tadarus': { completed: 20, target: 28, color: 'from-purple-500 to-purple-600', icon: '📖' },
        'Dhuha': { completed: 18, target: 28, color: 'from-violet-500 to-violet-600', icon: '☀️' },
        'Sedekah': { completed: 12, target: 20, color: 'from-pink-500 to-pink-600', icon: '❤️' },
    }

    const weeklyData = [
        { day: 'Sen', salat: 5, tadarus: 4, dhuha: 3 },
        { day: 'Sel', salat: 5, tadarus: 5, dhuha: 4 },
        { day: 'Rab', salat: 4, tadarus: 3, dhuha: 2 },
        { day: 'Kam', salat: 5, tadarus: 5, dhuha: 4 },
        { day: 'Jum', salat: 5, tadarus: 4, dhuha: 3 },
        { day: 'Sab', salat: 5, tadarus: 5, dhuha: 4 },
        { day: 'Min', salat: 4, tadarus: 4, dhuha: 2 },
    ]

    const getMonthName = (month) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
        return months[month]
    }

    const getPercentage = (completed, target) => Math.round((completed / target) * 100)

    return (
        <div className="w-full min-h-screen bg-linear-to-br from-[#0F172A] via-[#1a1f3a] to-[#0F172A] pb-24">
            
            {/* Header */}
            <div className="sticky top-0 z-40 px-4 py-4 backdrop-blur-xl border-b border-indigo-500/10 bg-[#0F172A]/40">
                <h1 className="text-white font-bold text-xl mb-4">Statistik Ibadah</h1>
                
                {/* Month Selector */}
                <div className="flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2">
                    <button onClick={() => setSelectedMonth(Math.max(0, selectedMonth - 1))} className="p-1 hover:bg-white/10 rounded transition-colors">
                        <Calendar className="w-4 h-4 text-gray-400" />
                    </button>
                    <span className="text-white font-semibold text-sm">{getMonthName(selectedMonth)} {year}</span>
                    <button onClick={() => setSelectedMonth(Math.min(11, selectedMonth + 1))} className="p-1 hover:bg-white/10 rounded transition-colors">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 py-6 space-y-6">
                
                {/* Ibadah Cards */}
                <div className="space-y-3">
                    <h2 className="text-white font-semibold text-sm px-1">Capaian Bulan Ini</h2>
                    {Object.entries(ibadahData).map(([name, data]) => {
                        const percent = getPercentage(data.completed, data.target)
                        const isCompleted = percent >= 100
                        
                        return (
                            <div key={name} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:border-indigo-400/30 hover:bg-white/8 transition-all duration-300">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{data.icon}</span>
                                        <div>
                                            <h3 className="text-white font-semibold text-sm">{name}</h3>
                                            <p className="text-gray-400 text-xs">{data.completed} dari {data.target}</p>
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-1 ${isCompleted ? 'text-green-400' : 'text-yellow-400'}`}>
                                        {isCompleted ? (
                                            <CheckCircle2 className="w-5 h-5" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5" />
                                        )}
                                        <span className="font-bold text-sm">{percent}%</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full bg-linear-to-r ${data.color} transition-all duration-500`}
                                        style={{ width: `${Math.min(percent, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Weekly Chart */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                    <h2 className="text-white font-semibold text-sm mb-4">Grafik Minggu Ini</h2>
                    
                    <div className="space-y-4">
                        {/* Salat Chart */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-400 text-xs font-semibold">SALAT</span>
                                <span className="text-gray-400 text-xs">Rata-rata: 4.7/hari</span>
                            </div>
                            <div className="flex items-end justify-between h-20 gap-1.5">
                                {weeklyData.map((data, idx) => (
                                    <div key={idx} className="flex flex-col items-center flex-1">
                                        <div 
                                            className="w-full bg-linear-to-t from-indigo-500 to-indigo-400 rounded-t transition-all hover:opacity-80"
                                            style={{ height: `${(data.salat / 5) * 100}%` }}
                                        />
                                        <span className="text-gray-500 text-xs mt-1">{data.day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tadarus Chart */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-400 text-xs font-semibold">TADARUS</span>
                                <span className="text-gray-400 text-xs">Rata-rata: 4.3/hari</span>
                            </div>
                            <div className="flex items-end justify-between h-20 gap-1.5">
                                {weeklyData.map((data, idx) => (
                                    <div key={idx} className="flex flex-col items-center flex-1">
                                        <div 
                                            className="w-full bg-linear-to-t from-purple-500 to-purple-400 rounded-t transition-all hover:opacity-80"
                                            style={{ height: `${(data.tadarus / 5) * 100}%` }}
                                        />
                                        <span className="text-gray-500 text-xs mt-1">{data.day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Insights */}
                <div className="bg-linear-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/30 rounded-2xl p-4">
                    <h3 className="text-white font-semibold text-sm mb-2">Insight</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">Alhamdulillah, konsistensi Anda dalam ibadah semakin meningkat! Pertahankan momentum dengan terus berusaha mencapai target harian. 💪</p>
                </div>

            </div>

            <BottomBar />
        </div>
    )
}

export default Statistik