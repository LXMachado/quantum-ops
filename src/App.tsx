import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { usePingQuery } from './services/api'
import Layout from './components/Layout'
import Login from './components/Login'
import Register from './components/Register'
import { Suspense, lazy } from 'react'

// Dynamic imports for code splitting
const Dashboard = lazy(() => import('./components/Dashboard'))
const Calendar = lazy(() => import('./components/Calendar'))
const Clients = lazy(() => import('./components/Clients'))
const Jobs = lazy(() => import('./components/Jobs'))
const Projects = lazy(() => import('./components/Projects'))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
)

function App() {
  const { data, isFetching } = usePingQuery()

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="clients" element={<Clients />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="projects" element={<Projects />} />
          </Route>
        </Routes>
      </Suspense>
      {/* API Status for smoke test */}
      <div className="fixed bottom-4 right-4 bg-slate-800 text-slate-100 p-2 rounded">
        API status: {isFetching ? 'checking…' : data ? 'healthy' : 'not connected'}
      </div>
    </Router>
  )
}

export default App
