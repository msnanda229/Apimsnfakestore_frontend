import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase'
import { useNavigate, Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning('Please enter both email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('Login successful');
      setTimeout(() => navigate('/homestore'), 1000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('Login successful');
      setTimeout(() => navigate('/homestore'), 1000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={login} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={loginWithGoogle} className="google-btn">
          Login with Google
        </button>

        <p>Don't have an account? <Link to="/">Sign up</Link></p>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Login;
