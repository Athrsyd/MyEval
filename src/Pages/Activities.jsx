import React, { useState } from 'react'
import BottomBar from '../Components/Global/BottomBar'
import { Plus, X, Trash2, AlertCircle } from 'lucide-react'

const Activities = () => {
    const currentDate = new Date(2026, 4, 9) // May 9, 2026
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const monthName = new Date(currentYear, currentMonth).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    
    const [showAddModal, setShowAddModal] = useState(false)
    const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '', priority: 'medium' })
    
    const [importantThings, setImportantThings] = useState([
        { id: 1, title: 'Project Deadline', date: '2026-05-05', priority: 'high', description: 'Selesaikan project X' },
        { id: 2, title: 'Team Meeting', date: '2026-05-09', priority: 'medium', description: 'Meeting dengan tim development' },
        { id: 3, title: 'Birthday', date: '2026-05-09', priority: 'low', description: 'Hari ulang tahun' },
        { id: 4, title: 'Submission', date: '2026-05-15', priority: 'high', description: 'Submit dokumentasi' },
        { id: 5, title: 'Code Review', date: '2026-05-20', priority: 'medium', description: 'Code review dengan mentor' }
    ])

    const handleAddEvent = () => {
        if (newEvent.title.trim() && newEvent.date) {
            const event = {
                id: Math.max(...importantThings.map(e => e.id), 0) + 1,
                title: newEvent.title,
                date: newEvent.date,
                description: newEvent.description,
                priority: newEvent.priority
            }
            setImportantThings([...importantThings, event])
            setNewEvent({ title: '', date: '', description: '', priority: 'medium' })
            setShowAddModal(false)
        }
    }

    const deleteEvent = (eventId) => {
        setImportantThings(importantThings.filter(e => e.id !== eventId))
    }

    const getPriorityColor = (priority) => {
        const colors = {
            'high': 'bg-red-500/20 border-red-400/30 text-red-300',
            'medium': 'bg-yellow-500/20 border-yellow-400/30 text-yellow-300',
            'low': 'bg-green-500/20 border-green-400/30 text-green-300',
        }
        return colors[priority] || colors['medium']
    }

    const getPriorityLabel = (priority) => {
        const labels = { 'high': '⚠️ Penting', 'medium': '📌 Sedang', 'low': '✓ Rendah' }
        return labels[priority]
    }

    const sortedThings = [...importantThings].sort((a, b) => new Date(a.date) - new Date(b.date))

    return (
        <div className="w-full min-h-screen bg-linear-to-br from-[#0F172A] via-[#1a1f3a] to-[#0F172A] pb-24">
            
            {/* Header */}
            <div className="sticky top-0 z-40 px-4 py-4 backdrop-blur-xl border-b border-indigo-500/10 bg-[#0F172A]/40">
                <h1 className="text-white font-bold text-xl">Hal Penting</h1>
                <p className="text-gray-400 text-sm mt-1">📅 {monthName}</p>
            </div>

            {/* Content */}
            <div className="px-4 py-6 space-y-3">
                {sortedThings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <AlertCircle className="w-12 h-12 text-gray-600 mb-4" />
                        <p className="text-gray-400 text-sm">Tidak ada hal penting bulan ini</p>
                        <p className="text-gray-500 text-xs mt-1">Klik tombol + untuk menambah</p>
                    </div>
                ) : (
                    sortedThings.map((thing) => (
                        <div
                            key={thing.id}
                            className={`border border-white/10 rounded-xl p-4 backdrop-blur-xl bg-linear-to-r ${getPriorityColor(thing.priority)} group hover:border-white/20 transition-all duration-300`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-white text-sm">{thing.title}</h3>
                                        <span className="text-xs whitespace-nowrap">{getPriorityLabel(thing.priority)}</span>
                                    </div>
                                    <p className="text-xs text-white/60 mb-2">
                                        📅 {new Date(thing.date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                                    </p>
                                    {thing.description && (
                                        <p className="text-xs opacity-75">{thing.description}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => deleteEvent(thing.id)}
                                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Event Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
                    <div className="w-full bg-linear-to-br from-[#0F172A] via-[#1a1f3a] to-[#0F172A] border-t border-indigo-500/20 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
                        
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-white font-bold text-lg">Tambah Hal Penting</h2>
                                <p className="text-gray-400 text-sm mt-1">Untuk bulan ini</p>
                            </div>
                            <button 
                                onClick={() => setShowAddModal(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                            
                            {/* Title Input */}
                            <div>
                                <label className="text-gray-400 text-xs font-semibold block mb-2">JUDUL HAL PENTING</label>
                                <input 
                                    type="text" 
                                    placeholder="Nama hal penting..."
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400/50 transition-colors"
                                    autoFocus
                                />
                            </div>

                            {/* Date Input */}
                            <div>
                                <label className="text-gray-400 text-xs font-semibold block mb-2">TANGGAL</label>
                                <input 
                                    type="date"
                                    value={newEvent.date}
                                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-400/50 transition-colors"
                                />
                            </div>

                            {/* Description Input */}
                            <div>
                                <label className="text-gray-400 text-xs font-semibold block mb-2">DESKRIPSI</label>
                                <textarea 
                                    placeholder="Deskripsi detail (opsional)..."
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400/50 transition-colors resize-none h-24"
                                />
                            </div>

                            {/* Priority Select */}
                            <div>
                                <label className="text-gray-400 text-xs font-semibold block mb-2">PRIORITAS</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['low', 'medium', 'high'].map((priority) => (
                                        <button
                                            key={priority}
                                            onClick={() => setNewEvent({...newEvent, priority})}
                                            className={`py-3 px-2 rounded-lg text-sm font-semibold transition-all border ${
                                                newEvent.priority === priority
                                                    ? `bg-linear-to-r ${getPriorityColor(priority)} border-opacity-100`
                                                    : `bg-white/5 border-white/10 text-gray-400 hover:bg-white/10`
                                            }`}
                                        >
                                            {getPriorityLabel(priority)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button 
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl py-3 text-gray-300 font-semibold transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    onClick={handleAddEvent}
                                    className="flex-1 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl py-3 text-white font-semibold transition-all disabled:opacity-50"
                                    disabled={!newEvent.title || !newEvent.date}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Plus className="w-5 h-5" />
                                        <span>Tambah</span>
                                    </div>
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => {
                    setShowAddModal(true)
                    setNewEvent({ title: '', date: '', description: '', priority: 'medium' })
                }}
                className="fixed bottom-24 right-4 w-14 h-14 bg-linear-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/50 hover:scale-110 transition-transform z-30"
            >
                <Plus className="w-6 h-6" />
            </button>

            <BottomBar />
        </div>
    )
}

export default Activities
