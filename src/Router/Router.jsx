import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import Evaluation from '../Pages/Evaluation'
import Statistik from '../Pages/Statistik'
import TodoList from '../Pages/TodoList'
import BottomBar from '../Components/Global/BottomBar'
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/evaluasi" element={<Evaluation />} />
                <Route path="/statistik" element={<Statistik />} />
                <Route path="/todo" element={<TodoList />} />
            </Routes>
            <BottomBar />
        </BrowserRouter>
    )
}

export default Router