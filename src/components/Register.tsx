import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useRegisterMutation } from '../services/api'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [register, { isLoading }] = useRegisterMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    try {
      await register({ email, password }).unwrap()
      navigate('/login')
    } catch (err) {
      setError('Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      backgroundImage: theme === 'dark'
        ? 'radial-gradient(circle at 10% 20%, rgba(66, 120, 255, 0.28), transparent 55%), radial-gradient(circle at 85% 15%, rgba(255, 76, 247, 0.18), transparent 45%), radial-gradient(circle at 15% 80%, rgba(35, 255, 185, 0.18), transparent 55%), linear-gradient(135deg, #050713, #0a1034 45%, #061d4a 100%)'
        : 'linear-gradient(135deg, #f8fbff, #ecf2ff 45%, #dde5ff 100%)'
    }}>
      <div className="glass-panel glow-ring p-8 rounded-[32px] w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="glass-button w-full text-white p-2 rounded-2xl font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
