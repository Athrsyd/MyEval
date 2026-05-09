import React, { useState } from 'react'
import BottomBar from '../Components/Global/BottomBar'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const Evaluation = () => {
    const [currentWeek, setCurrentWeek] = useState(0)
    const [weeklyEntries, setWeeklyEntries] = useState({
        0: {
            date: '24 Mei',
            satisfaction: 4,
            satisfactionQuote: 'Mingguan yang produktif dengan beberapa tantangan baru.',
            achievement: '',
            improvement: '',
            nextFocus: ''
        }
    })

    const handlePrevWeek = () => {
        setCurrentWeek(currentWeek - 1)
    }

    const handleNextWeek = () => {
        setCurrentWeek(currentWeek + 1)
    }

    const handleRatingClick = (rating) => {
        const entry = weeklyEntries[currentWeek] || { date: `${currentWeek} Mei`, satisfaction: 0, satisfactionQuote: '', achievement: '', improvement: '', nextFocus: '' }
        setWeeklyEntries({
            ...weeklyEntries,
            [currentWeek]: { ...entry, satisfaction: rating }
        })
    }

    const handleInputChange = (field, value) => {
        const entry = weeklyEntries[currentWeek] || { date: `${currentWeek} Mei`, satisfaction: 0, satisfactionQuote: '', achievement: '', improvement: '', nextFocus: '' }
        setWeeklyEntries({
            ...weeklyEntries,
            [currentWeek]: { ...entry, [field]: value }
        })
    }

    const currentEntry = weeklyEntries[currentWeek] || { date: 'Mei', satisfaction: 0, satisfactionQuote: '', achievement: '', improvement: '', nextFocus: '' }

    return (
        <div className="w-full min-h-screen bg-linear-to-br from-[#0F172A] via-[#1a1f3a] to-[#0F172A] pb-24">
            
            {/* Header */}
            <div className="sticky top-0 z-40 px-4 py-4 backdrop-blur-xl border-b border-indigo-500/10 bg-[#0F172A]/40">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-cyan-400 text-xs font-semibold">SESI EVALUASI</p>
                    <button className="text-gray-400 text-sm font-semibold hover:text-gray-300 transition-colors">
                        Riwayat
                    </button>
                </div>
                <h1 className="text-white font-bold text-2xl">Jurnal Mingguan {currentEntry.date}</h1>
            </div>

            {/* Content */}
            <div className="px-4 py-6 space-y-4">
                
                {/* Satisfaction Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <p className="text-white font-semibold mb-4">Kepuasan Minggu Ini</p>
                    <div className="flex justify-center gap-3 mb-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <button
                                key={i}
                                onClick={() => handleRatingClick(i)}
                                className="transition-transform duration-200 hover:scale-110"
                            >
                                <Star
                                    className={`w-10 h-10 ${
                                        i <= currentEntry.satisfaction
                                            ? 'fill-white text-white'
                                            : 'text-gray-600'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                    <p className="text-gray-300 text-sm text-center italic">"{currentEntry.satisfactionQuote}"</p>
                </div>

                {/* Achievement Section */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <p className="text-cyan-400 text-xs font-semibold mb-3 tracking-wide">PENCAPAIAN</p>
                    <h3 className="text-white font-semibold mb-4">Apa pencapaian terbesarmu minggu ini?</h3>
                    <textarea
                        value={currentEntry.achievement}
                        onChange={(e) => handleInputChange('achievement', e.target.value)}
                        placeholder="Tuliskan keberhasilan atau momen berharga..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400/50 transition-colors resize-none h-24"
                    />
                </div>

                {/* Improvement Section */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <p className="text-cyan-400 text-xs font-semibold mb-3 tracking-wide">PENINGKATAN</p>
                    <h3 className="text-white font-semibold mb-4">Apa yang bisa ditingkatkan?</h3>
                    <textarea
                        value={currentEntry.improvement}
                        onChange={(e) => handleInputChange('improvement', e.target.value)}
                        placeholder="Identifikasi area untuk pertumbuhan lebih lanjut..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400/50 transition-colors resize-none h-24"
                    />
                </div>

                {/* Next Focus Section */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <p className="text-cyan-400 text-xs font-semibold mb-3 tracking-wide">FOKUS MENDATANG</p>
                    <h3 className="text-white font-semibold mb-4">Satu hal yang ingin difokuskan minggu depan?</h3>
                    <textarea
                        value={currentEntry.nextFocus}
                        onChange={(e) => handleInputChange('nextFocus', e.target.value)}
                        placeholder="Tentukan prioritas utamamu..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400/50 transition-colors resize-none h-24"
                    />
                </div>

                {/* Save Button */}
                <button className="w-full bg-linear-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 rounded-2xl py-4 text-white font-semibold transition-all duration-300 mt-6">
                    Simpan Jurnal Mingguan
                </button>

            </div>

            <BottomBar />
        </div>
    )
}

export default Evaluation