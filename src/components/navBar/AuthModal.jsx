import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, login, forgotPassword, resetPassword } from '../../connect/state/auth/actions';
import { Modal, CircularProgress } from '@mui/material';

const AuthModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { loading, error, token, forgotPassword: forgot, resetPassword: reset } = useSelector(state => state.auth);

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetToken, setResetToken] = useState('');

  useEffect(() => {
    if (token && open) {
      handleClose();
      setMode('login');
      setEmail('');
      setPassword('');
      setName('');
    }
  }, [token, open, handleClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'signup') {
        await dispatch(signup({ fullName: name, email, password }));
      } else if (mode === 'login') {
        await dispatch(login({ email, password }));
      } else if (mode === 'forgot') {
        await dispatch(forgotPassword(email));
      } else if (mode === 'reset') {
        await dispatch(resetPassword(resetToken, password));
      }
    } catch (err) {}
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setEmail('');
    setPassword('');
    setName('');
    setResetToken('');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal"
      className="flex items-center justify-center"
      sx={{ zIndex: 1400 }}
    >
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-xl w-full max-w-sm mx-4">
        <h2 className="text-xl font-bold text-center mb-4">
          {mode === 'login' && 'Login'}
          {mode === 'signup' && 'Sign Up'}
          {mode === 'forgot' && 'Forgot Password'}
          {mode === 'reset' && 'Reset Password'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          {(mode === 'login' || mode === 'signup' || mode === 'forgot') && (
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          {(mode === 'login' || mode === 'signup' || mode === 'reset') && (
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}
          {mode === 'reset' && (
            <input
              type="text"
              placeholder="Reset Token"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              required
            />
          )}

          {error && mode !== 'forgot' && <p className="text-red-500 text-sm">{error}</p>}
          {mode === 'forgot' && forgot?.error && <p className="text-red-500 text-sm">{forgot.error}</p>}
          {mode === 'forgot' && forgot?.success && (
            <p className="text-green-500 text-sm">Reset email sent successfully!</p>
          )}
          {mode === 'reset' && reset?.error && <p className="text-red-500 text-sm">{reset.error}</p>}
          {mode === 'reset' && reset?.success && (
            <p className="text-green-500 text-sm">Password reset successful! Please log in.</p>
          )}

          <button
            type="submit"
            disabled={loading || forgot.loading || reset.loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
          >
            {loading || forgot.loading || reset.loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              (mode === 'signup' && 'Sign Up') ||
              (mode === 'login' && 'Login') ||
              (mode === 'forgot' && 'Send Reset Email') ||
              (mode === 'reset' && 'Reset Password')
            )}
          </button>
        </form>

        <div className="mt-4 text-center space-y-2">
          {mode === 'login' && (
            <>
              <button
                onClick={() => switchMode('signup')}
                className="block text-sm text-orange-500 hover:underline w-full"
              >
                Don’t have an account? Sign Up
              </button>
              <button
                onClick={() => switchMode('forgot')}
                className="block text-sm text-orange-500 hover:underline w-full"
              >
                Forgot Password?
              </button>
            </>
          )}
          {mode !== 'login' && (
            <button
              onClick={() => switchMode('login')}
              className="block text-sm text-orange-500 hover:underline w-full"
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
