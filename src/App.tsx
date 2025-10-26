import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { usePingQuery } from './services/api'
import Calendar from './components/Calendar'
import Clients from './components/Clients'
import Dashboard from './components/Dashboard'
import Jobs from './components/Jobs'
import Layout from './components/Layout'
import Login from './components/Login'
import Projects from './components/Projects'
import Register from './components/Register'

function App() {
  const { data, isFetching } = usePingQuery()

  return (
    <Router>
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
      {/* API Status for smoke test */}
      <div className="fixed bottom-4 right-4 bg-slate-800 text-slate-100 p-2 rounded">
        API status: {isFetching ? 'checking…' : data ? 'healthy' : 'not connected'}
      </div>
    </Router>
  )
}

export default App
