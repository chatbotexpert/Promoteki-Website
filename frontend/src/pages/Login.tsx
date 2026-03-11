import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock auth for demonstration
    if (password === 'admin123') {
      localStorage.setItem('promoteki_admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 border border-black/10 shadow-sm"
      >
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-tighter display-font mb-2">Admin Access</h1>
          <p className="text-gray-500 text-sm font-medium">Please enter your credentials to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3">Master Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F4F4F0] border-none px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all font-mono"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold tracking-tight">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-black text-[#D4FF3F] py-5 uppercase font-bold tracking-widest text-sm hover:bg-[#D4FF3F] hover:text-black transition-all"
          >
            Authenticate ↵
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
