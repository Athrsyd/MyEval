import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import Evaluation from '../Pages/Evaluation'
import Statistik from '../Pages/Statistik'
import TodoList from '../Pages/TodoList'
import Target from '../Pages/Target'
import Activities from '../Pages/Activities'
import BottomBar from '../Components/Global/BottomBar'
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/evaluasi" element={<Evaluation />} />
                <Route path="/statistik" element={<Statistik />} />
                <Route path="/todo" element={<TodoList />} />
                <Route path="/target" element={<Target />} />
                <Route path="/aktivitas" element={<Activities />} />
            </Routes>
            <BottomBar />
        </BrowserRouter>
    )
}

export default Router