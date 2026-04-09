import { HashRouter, Routes, Route } from 'react-router-dom'
import { useWorkoutLog } from './hooks/useWorkoutLog'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { LogPage } from './pages/LogPage'
import { HistoryPage } from './pages/HistoryPage'
import { CalendarPage } from './pages/CalendarPage'
import { ManageWorkoutsPage } from './pages/ManageWorkoutsPage'

export default function App() {
  const {
    sessions,
    saveNew,
    remove,
    allTemplates,
    saveTemplate,
    editTemplate,
    removeTemplate,
  } = useWorkoutLog()

  return (
    <HashRouter>
      <div className="min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage sessions={sessions} allTemplates={allTemplates} />} />
            <Route
              path="/log/:slug"
              element={<LogPage onSave={saveNew} allTemplates={allTemplates} />}
            />
            <Route
              path="/history"
              element={<HistoryPage sessions={sessions} onDelete={remove} allTemplates={allTemplates} />}
            />
            <Route
              path="/calendar"
              element={<CalendarPage sessions={sessions} allTemplates={allTemplates} />}
            />
            <Route
              path="/workouts"
              element={
                <ManageWorkoutsPage
                  allTemplates={allTemplates}
                  onSave={saveTemplate}
                  onEdit={editTemplate}
                  onDelete={removeTemplate}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
