// import React from 'react'
import Router from './Router/Router'
import { AlertCircle, Smartphone } from 'lucide-react'

function App() {

  if (window.innerWidth > 850) {
    return (
      <div className='flex flex-col justify-center items-center h-screen bg-linear-to-br from-red-50 to-orange-50'>
        <AlertCircle size={80} className='text-red-500 mb-6' />
        <Smartphone size={60} className='text-orange-500 mb-6 animate-bounce' />
        <h1 className='text-3xl font-bold mb-4 text-gray-800'>Aplikasi ini hanya dapat digunakan pada perangkat mobile.</h1>
        <p className='text-center text-gray-600 max-w-md'>Silakan buka aplikasi ini pada perangkat dengan layar lebih kecil untuk pengalaman terbaik.</p>
      </div>
    )
  }

  return (
    <div className="App">
      <Router />
    </div>
    )
}

export default App
