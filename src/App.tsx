import { HashRouter, Routes, Route } from 'react-router-dom'
import { useWorkoutLog } from './hooks/useWorkoutLog'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { LogPage } from './pages/LogPage'
import { HistoryPage } from './pages/HistoryPage'

export default function App() {
  const { sessions, saveNew, remove } = useWorkoutLog()

  return (
    <HashRouter>
      <div className="min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage sessions={sessions} />} />
            <Route path="/log/:slug" element={<LogPage onSave={saveNew} />} />
            <Route path="/history" element={<HistoryPage sessions={sessions} onDelete={remove} />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
