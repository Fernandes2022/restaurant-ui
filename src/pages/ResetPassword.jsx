import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../connect/state/auth/actions'
import { CircularProgress } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function useQuery() {
  const location = useLocation()
  return useMemo(() => new URLSearchParams(location.search), [location.search])
}

const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, success, error } = useSelector(state => state.auth.resetPassword)

  const query = useQuery()
  const tokenFromQuery = query.get('token') || ''
  const emailFromQuery = query.get('email') || ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [token, setToken] = useState(tokenFromQuery)

  useEffect(() => {
    setToken(tokenFromQuery)
  }, [tokenFromQuery])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token || !password || password !== confirm) return
    try {
      await dispatch(resetPassword(token, password))
    } catch (err) {}
  }

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => navigate('/'), 1500)
      return () => clearTimeout(t)
    }
  }, [success, navigate])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white dark:bg-black w-full max-w-md rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-2 text-center">Reset Password</h1>
        {emailFromQuery && (
          <p className="text-xs text-gray-600 dark:text-gray-300 text-center mb-4">for {emailFromQuery}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!tokenFromQuery && (
            <input
              type="text"
              placeholder="Reset Token"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          )}
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm">Password reset successful. Redirecting to home...</p>
          )}

          <button
            type="submit"
            disabled={loading || !password || password !== confirm}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-orange-500 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword


