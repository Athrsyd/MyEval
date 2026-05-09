import React, { useState } from 'react'
import BottomBar from '../Components/Global/BottomBar'
import { Plus, Trash2, TrendingUp, Target as TargetIcon, Award } from 'lucide-react'

const Target = () => {
    const [targets, setTargets] = useState([
        {
            id: 1,
            title: 'Membaca 30 menit setiap hari',
            category: 'Pembelajaran',
            progress: 65,
            deadline: '30 Juni 2026',
            priority: 'high',
            startDate: '1 Mei 2026'
        },
        {
            id: 2,
            title: 'Olahraga 5x seminggu',
            category: 'Kesehatan',
            progress: 80,
            deadline: '31 Mei 2026',
            priority: 'high',
            startDate: '1 Mei 2026'
        },
        {
            id: 3,
            title: 'Menyelesaikan 3 project personal',
            category: 'Pengembangan Karir',
            progress: 33,
            deadline: '31 Desember 2026',
            priority: 'medium',
            startDate: '1 Mei 2026'
        },
        {
            id: 4,
            title: 'Belajar skill baru (Web Dev)',
            category: 'Pembelajaran',
            progress: 45,
            deadline: '31 Agustus 2026',
            priority: 'medium',
            startDate: '1 Mei 2026'
        }
    ])

    const getPriorityColor = (priority) => {
        const colors = {
            'high': 'from-red-500/20 to-red-600/10 border-red-400/30 text-red-300',
            'medium': 'from-yellow-500/20 to-yellow-600/10 border-yellow-400/30 text-yellow-300',
            'low': 'from-green-500/20 to-green-600/10 border-green-400/30 text-green-300',
        }
        return colors[priority] || colors['medium']
    }

    const getCategoryIcon = (category) => {
        const icons = {
            'Pembelajaran': '📚',
            'Kesehatan': '💪',
            'Pengembangan Karir': '🚀',
            'Spiritual': '🕌',
        }
        return icons[category] || '🎯'
    }

    const deleteTarget = (id) => {
        setTargets(targets.filter(t => t.id !== id))
    }

    const updateProgress = (id, newProgress) => {
        setTargets(targets.map(t => 
            t.id === id ? { ...t, progress: Math.min(newProgress, 100) } : t
        ))
    }

    const totalTargets = targets.length
    const completedTargets = targets.filter(t => t.progress === 100).length
    const averageProgress = targets.length > 0 
        ? Math.round(targets.reduce((sum, t) => sum + t.progress, 0) / targets.length)
        : 0

    return (
        <div className="w-full min-h-screen bg-linear-to-br from-[#0F172A] via-[#1a1f3a] to-[#0F172A] pb-24">
            
            {/* Header */}
            <div className="sticky top-0 z-40 px-4 py-4 backdrop-blur-xl border-b border-indigo-500/10 bg-[#0F172A]/40">
                <h1 className="text-white font-bold text-xl mb-4">Target Pengembangan</h1>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-2 py-2">
                        <p className="text-gray-400 text-xs mb-1">Total Target</p>
                        <p className="text-white font-bold text-lg">{totalTargets}</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-2 py-2">
                        <p className="text-gray-400 text-xs mb-1">Selesai</p>
                        <p className="text-white font-bold text-lg">{completedTargets}</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-2 py-2">
                        <p className="text-gray-400 text-xs mb-1">Rata-rata</p>
                        <p className="text-white font-bold text-lg">{averageProgress}%</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 py-6 space-y-4">
                
                {/* Overall Progress */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-indigo-400" />
                            <span className="text-white font-semibold text-sm">Progress Keseluruhan</span>
                        </div>
                        <span className="text-indigo-400 font-bold">{averageProgress}%</span>
                    </div>
                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${averageProgress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Targets List */}
                <div className="space-y-3">
                    {targets.map((target) => (
                        <div 
                            key={target.id}
                            className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:border-purple-400/30 hover:bg-white/8 transition-all duration-300"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-3 flex-1">
                                    <span className="text-2xl">{getCategoryIcon(target.category)}</span>
                                    <div className="flex-1">
                                        <h3 className="text-white font-semibold text-sm mb-1">{target.title}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium bg-linear-to-r ${getPriorityColor(target.priority)} border`}>
                                                {target.priority === 'high' ? 'Prioritas Tinggi' : target.priority === 'medium' ? 'Prioritas Sedang' : 'Prioritas Rendah'}
                                            </span>
                                            <span className="text-gray-500 text-xs">{target.category}</span>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => deleteTarget(target.id)}
                                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-5 h-5 text-red-400" />
                                </button>
                            </div>

                            {/* Progress */}
                            <div className="mb-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-gray-400 text-xs">Progres</span>
                                    <span className="text-white font-semibold text-sm">{target.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-linear-to-r from-purple-500 to-violet-500 transition-all duration-300"
                                        style={{ width: `${target.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Quick Progress Buttons */}
                            <div className="flex items-center gap-2 mb-3">
                                <button 
                                    onClick={() => updateProgress(target.id, target.progress - 10)}
                                    className="text-xs px-2 py-1 bg-white/5 hover:bg-white/10 text-gray-400 rounded transition-colors"
                                >
                                    -10%
                                </button>
                                <button 
                                    onClick={() => updateProgress(target.id, target.progress + 10)}
                                    className="text-xs px-2 py-1 bg-white/5 hover:bg-white/10 text-gray-400 rounded transition-colors"
                                >
                                    +10%
                                </button>
                                <span className="text-xs text-gray-500 ml-auto">Target: {target.deadline}</span>
                            </div>

                            {/* Status */}
                            {target.progress === 100 && (
                                <div className="flex items-center gap-2 text-green-400 text-xs">
                                    <Award className="w-4 h-4" />
                                    <span>Target tercapai! ✨</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Add Target Button */}
                <button className="w-full bg-linear-to-r from-purple-500/20 to-violet-500/20 hover:from-purple-500/30 hover:to-violet-500/30 border border-purple-400/30 rounded-2xl py-4 text-purple-300 font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-6">
                    <Plus className="w-5 h-5" />
                    <span>Tambah Target</span>
                </button>

            </div>

            <BottomBar />
        </div>
    )
}

export default Target
