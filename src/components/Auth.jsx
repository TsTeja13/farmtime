import React, { useState, useEffect } from 'react';
import { Sprout, LogIn, UserPlus, ShieldAlert, Award } from 'lucide-react';

export default function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); // 'buyer' or 'farmer'
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Prepopulate demo credentials if empty
  useEffect(() => {
    const users = localStorage.getItem('farmtime_users');
    if (!users) {
      const demoUsers = [
        { id: 'demo_farmer', name: 'Rajesh Farmer', email: 'farmer@farm.com', password: 'farmer123', role: 'farmer' },
        { id: 'demo_buyer', name: 'Anand Buyer', email: 'buyer@shop.com', password: 'buyer123', role: 'buyer' }
      ];
      localStorage.setItem('farmtime_users', JSON.stringify(demoUsers));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validate inputs
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter email and password.');
      return;
    }
    if (!isLogin && !name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('farmtime_users') || '[]');

    if (isLogin) {
      // Login flow
      const user = storedUsers.find(u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password);
      if (user) {
        localStorage.setItem('farmtime_session', JSON.stringify(user));
        setSuccessMsg('Login successful! Redirecting...');
        setTimeout(() => {
          setUser(user);
        }, 800);
      } else {
        setErrorMsg('Invalid email or password.');
      }
    } else {
      // Registration flow
      const userExists = storedUsers.some(u => u.email.toLowerCase() === email.toLowerCase().trim());
      if (userExists) {
        setErrorMsg('User with this email already exists.');
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password,
        role: role
      };

      storedUsers.push(newUser);
      localStorage.setItem('farmtime_users', JSON.stringify(storedUsers));
      localStorage.setItem('farmtime_session', JSON.stringify(newUser));
      setSuccessMsg('Registration successful! Redirecting...');
      setTimeout(() => {
        setUser(newUser);
      }, 800);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-card glass-card">
        {/* Branding */}
        <div className="auth-header">
          <div className="icon-wrapper bg-primary-10 mx-auto mb-2">
            <Sprout className="logo-icon text-primary animate-pulse" />
          </div>
          <h2 className="auth-logo-text">FARMTIME</h2>
          <p className="auth-subtitle">Sustainable Agriculture Companion & Marketplace</p>
        </div>

        {/* Success/Error Alerts */}
        {errorMsg && (
          <div className="alert alert-danger flex gap-2 p-3 mb-4 text-left">
            <ShieldAlert className="icon-sm shrink-0 mt-0.5" />
            <span className="text-xs">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="alert alert-info flex gap-2 p-3 mb-4 text-left">
            <Award className="icon-sm shrink-0 mt-0.5" />
            <span className="text-xs">{successMsg}</span>
          </div>
        )}

        {/* Tab Headers */}
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(true); setErrorMsg(null); }}
          >
            <LogIn className="icon-xs" /> Sign In
          </button>
          <button 
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(false); setErrorMsg(null); }}
          >
            <UserPlus className="icon-xs" /> Sign Up
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="flex-col gap-4 mt-2">
          {!isLogin && (
            <div>
              <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="form-input text-xs"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="form-input text-xs"
              required
            />
          </div>

          <div>
            <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="form-input text-xs"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mb-2">I want to...</label>
              <div className="flex gap-4 justify-around">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input 
                    type="radio" 
                    name="role" 
                    value="buyer" 
                    checked={role === 'buyer'}
                    onChange={() => setRole('buyer')}
                    className="accent-primary"
                  />
                  <span>Buy Produce</span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input 
                    type="radio" 
                    name="role" 
                    value="farmer" 
                    checked={role === 'farmer'}
                    onChange={() => setRole('farmer')}
                    className="accent-primary"
                  />
                  <span>Sell Crops / Inputs</span>
                </label>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full mt-2">
            {isLogin ? 'Sign In to Farmtime' : 'Create Account'}
          </button>
        </form>

        {/* Demo Credentials */}
        {isLogin && (
          <div className="mt-4 border-t pt-3 text-[10px] text-muted leading-relaxed">
            <span className="font-semibold block mb-1">Demo Credentials:</span>
            • Farmer: <strong>farmer@farm.com</strong> / Password: <strong>farmer123</strong><br/>
            • Buyer: <strong>buyer@shop.com</strong> / Password: <strong>buyer123</strong>
          </div>
        )}
      </div>
    </div>
  );
}
