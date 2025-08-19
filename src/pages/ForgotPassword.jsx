import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../connect/state/auth/actions'
import { CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector(state => state.auth.forgotPassword)

  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    try {
      await dispatch(forgotPassword(email))
    } catch (err) {}
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white dark:bg-black w-full max-w-md rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-2 text-center">Forgot Password</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
          Enter your email and we will send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm">If an account exists for this email, a reset link has been sent.</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-orange-500 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword


