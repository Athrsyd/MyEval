import React, { useState } from 'react'
import BottomBar from '../Components/Global/BottomBar'
import { Plus, Trash2, ChevronLeft, ChevronRight, CheckCircle2, Circle, X, Clock } from 'lucide-react'

const TodoList = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showAddModal, setShowAddModal] = useState(false)
    const [newTodo, setNewTodo] = useState({ title: '', category: 'Kerja', startTime: '', endTime: '' })
    const [todos, setTodos] = useState({
        '2026-05-09': [
            { id: 1, title: 'Subuh + Tadarus', completed: true, category: 'Ibadah', startTime: '05:30', endTime: '06:00' },
            { id: 2, title: 'Review Project', completed: false, category: 'Kerja', startTime: '09:00', endTime: '11:00' },
            { id: 3, title: 'Dhuhur + Istirahat', completed: false, category: 'Ibadah', startTime: '12:00', endTime: '13:00' },
            { id: 4, title: 'Exercise 30 menit', completed: true, category: 'Kesehatan', startTime: '16:00', endTime: '16:30' },
        ],
        '2026-05-08': [
            { id: 1, title: 'Subuh', completed: true, category: 'Ibadah', startTime: '05:30', endTime: '06:00' },
            { id: 2, title: 'Meeting Tim', completed: true, category: 'Kerja', startTime: '10:00', endTime: '11:30' },
        ]
    })

    const dateString = selectedDate.toISOString().split('T')[0]
    const dayTodos = (todos[dateString] || []).sort((a, b) => a.startTime.localeCompare(b.startTime))

    const handlePrevDay = () => {
        const newDate = new Date(selectedDate)
        newDate.setDate(newDate.getDate() - 1)
        setSelectedDate(newDate)
    }

    const handleNextDay = () => {
        const newDate = new Date(selectedDate)
        newDate.setDate(newDate.getDate() + 1)
        setSelectedDate(newDate)
    }

    const toggleTodo = (id) => {
        const updated = dayTodos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        setTodos({ ...todos, [dateString]: updated })
    }

    const deleteTodo = (id) => {
        const updated = dayTodos.filter(todo => todo.id !== id)
        setTodos({ ...todos, [dateString]: updated })
    }

    const handleAddTodo = () => {
        if (newTodo.title.trim() && newTodo.startTime && newTodo.endTime) {
            const todo = {
                id: Math.max(...dayTodos.map(t => t.id), 0) + 1,
                title: newTodo.title,
                category: newTodo.category,
                startTime: newTodo.startTime,
                endTime: newTodo.endTime,
                completed: false
            }
            const updatedTodos = [...dayTodos, todo].sort((a, b) => a.startTime.localeCompare(b.startTime))
            setTodos({
                ...todos,
                [dateString]: updatedTodos
            })
            setNewTodo({ title: '', category: 'Kerja', startTime: '', endTime: '' })
            setShowAddModal(false)
        }
    }

    const getCategoryColor = (category) => {
        const colors = {
            'Ibadah': 'from-indigo-500/20 to-indigo-600/10 border-indigo-400/30 text-indigo-300',
            'Kerja': 'from-purple-500/20 to-purple-600/10 border-purple-400/30 text-purple-300',
            'Kesehatan': 'from-violet-500/20 to-violet-600/10 border-violet-400/30 text-violet-300',
        }
        return colors[category] || colors['Kerja']
    }

    const completedCount = dayTodos.filter(t => t.completed).length
    const completedPercent = dayTodos.length > 0 ? (completedCount / dayTodos.length) * 100 : 0

    const calculateDuration = (startTime, endTime) => {
        const [startH, startM] = startTime.split(':').map(Number)
        const [endH, endM] = endTime.split(':').map(Number)
        const duration = (endH * 60 + endM) - (startH * 60 + startM)
        const hours = Math.floor(duration / 60)
        const minutes = duration % 60
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    }

    return (
        <div className="w-full min-h-screen bg-linear-to-br from-[#0F172A] via-[#1a1f3a] to-[#0F172A] pb-24">
            
            {/* Header */}
            <div className="sticky top-0 z-40 px-4 py-4 backdrop-blur-xl border-b border-indigo-500/10 bg-[#0F172A]/40">
                <h1 className="text-white font-bold text-xl mb-4">Rundown Harian</h1>
                
                {/* Date Selector */}
                <div className="flex items-center justify-between gap-3">
                    <button onClick={handlePrevDay} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <div className="text-center flex-1">
                        <p className="text-white font-semibold text-sm">
                            {selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}
                        </p>
                        <p className="text-gray-500 text-xs">{completedCount} dari {dayTodos.length} kegiatan selesai</p>
                    </div>

                    <button onClick={handleNextDay} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="px-4 py-4">
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${completedPercent}%` }}
                    ></div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-6 space-y-4">
                
                {dayTodos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <Circle className="w-12 h-12 text-gray-600 mb-3" />
                        <p className="text-gray-400 text-sm">Tidak ada kegiatan untuk hari ini</p>
                    </div>
                ) : (
                    dayTodos.map((todo) => (
                        <div 
                            key={todo.id}
                            className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:border-indigo-400/30 hover:bg-white/8 transition-all duration-300"
                        >
                            <div className="flex items-start gap-3">
                                <button 
                                    onClick={() => toggleTodo(todo.id)}
                                    className="mt-1 shrink-0"
                                >
                                    {todo.completed ? (
                                        <CheckCircle2 className="w-6 h-6 text-indigo-500" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-gray-500 hover:text-indigo-400 transition-colors" />
                                    )}
                                </button>

                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-semibold transition-all ${
                                        todo.completed 
                                            ? 'text-gray-400 line-through' 
                                            : 'text-white'
                                    }`}>
                                        {todo.title}
                                    </h3>
                                    
                                    {/* Time & Duration */}
                                    <div className="flex items-center gap-3 mt-2 mb-2">
                                        <div className="flex items-center gap-1 text-indigo-400 text-sm">
                                            <Clock className="w-4 h-4" />
                                            <span className="font-semibold">{todo.startTime}</span>
                                            <span className="text-gray-500">-</span>
                                            <span className="font-semibold">{todo.endTime}</span>
                                        </div>
                                        <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-lg">
                                            {calculateDuration(todo.startTime, todo.endTime)}
                                        </span>
                                    </div>

                                    {/* Category */}
                                    <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium bg-linear-to-r ${getCategoryColor(todo.category)} border`}>
                                        {todo.category}
                                    </span>
                                </div>

                                <button 
                                    onClick={() => deleteTodo(todo.id)}
                                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                                >
                                    <Trash2 className="w-5 h-5 text-red-400" />
                                </button>
                            </div>
                        </div>
                    ))
                )}

                {/* Add Todo Button */}
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="w-full bg-linear-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 border border-indigo-400/30 rounded-2xl py-4 text-indigo-300 font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-6">
                    <Plus className="w-5 h-5" />
                    <span>Tambah Kegiatan</span>
                </button>

            </div>

            {/* Add Todo Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
                    <div className="w-full bg-linear-to-br from-[#0F172A] via-[#1a1f3a] to-[#0F172A] border-t border-indigo-500/20 rounded-3xl p-6 max-h-[80vh] overflow-y-auto">
                        
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-white font-bold text-lg">Tambah Kegiatan Baru</h2>
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
                                <label className="text-gray-400 text-xs font-semibold block mb-2">KEGIATAN</label>
                                <input 
                                    type="text" 
                                    placeholder="Deskripsi kegiatan..."
                                    value={newTodo.title}
                                    onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400/50 transition-colors"
                                    autoFocus
                                />
                            </div>

                            {/* Time Inputs */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-gray-400 text-xs font-semibold block mb-2">JAM MULAI</label>
                                    <input 
                                        type="time" 
                                        value={newTodo.startTime}
                                        onChange={(e) => setNewTodo({...newTodo, startTime: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-400/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs font-semibold block mb-2">JAM SELESAI</label>
                                    <input 
                                        type="time" 
                                        value={newTodo.endTime}
                                        onChange={(e) => setNewTodo({...newTodo, endTime: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-400/50 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Category Select */}
                            <div>
                                <label className="text-gray-400 text-xs font-semibold block mb-2">KATEGORI</label>
                                <select 
                                    value={newTodo.category}
                                    onChange={(e) => setNewTodo({...newTodo, category: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-400/50 transition-colors"
                                >
                                    <option value="Ibadah">🤲 Ibadah</option>
                                    <option value="Kerja">💼 Kerja</option>
                                    <option value="Kesehatan">💪 Kesehatan</option>
                                </select>
                            </div>

                            {/* Duration Display */}
                            {newTodo.startTime && newTodo.endTime && (
                                <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-xl px-4 py-3">
                                    <p className="text-sm text-indigo-300">
                                        ⏱️ Durasi: <span className="font-semibold">{calculateDuration(newTodo.startTime, newTodo.endTime)}</span>
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button 
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl py-3 text-gray-300 font-semibold transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    onClick={handleAddTodo}
                                    className="flex-1 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl py-3 text-white font-semibold transition-all disabled:opacity-50"
                                    disabled={!newTodo.title || !newTodo.startTime || !newTodo.endTime}
                                >
                                    Tambah Kegiatan
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            )}

            <BottomBar />
        </div>
    )
}

export default TodoList