import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup
} from 'firebase/auth';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { auth, googleProvider } from '../firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

  const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      document.body.classList.add('signup-page');

      return () => {
        document.body.classList.remove('signup-page');
      };
    }, []);

    const signUpHandler = async (e) => {
      e.preventDefault();

      if (!name || !email || !password) {
        toast.warning('Please fill out all fields');
        return;
      }

      try {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(userCred.user, {
          displayName: name
        });

        toast.success('Account created successfully!');

        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } catch (err) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            toast.warning(
              'This email is already registered. Please login.'
            );
            break;

          case 'auth/weak-password':
            toast.warning(
              'Password should be at least 6 characters.'
            );
            break;

          case 'auth/invalid-email':
            toast.warning(
              'Please enter a valid email address.'
            );
            break;

          default:
            toast.error(
              'Something went wrong. Please try again.'
            );
        }
      }
    };

    const googleSignupHandler = async () => {
      try {
        const result = await signInWithPopup(
          auth,
          googleProvider
        );

        const isNewUser =
          result?._tokenResponse?.isNewUser;

        if (isNewUser) {
          toast.success(
            `Account created successfully! Welcome ${result.user.displayName}`
          );
        } else {
          toast.info(
            'You already have an account. Logged in successfully.'
          );
        }

        setTimeout(() => {
          navigate('/homestore');
        }, 1500);
      } catch (err) {
        switch (err.code) {
          case 'auth/popup-closed-by-user':
            toast.warning(
              'Google sign-in was cancelled.'
            );
            break;

          case 'auth/popup-blocked':
            toast.warning(
              'Popup blocked. Please allow popups and try again.'
            );
            break;

          default:
            toast.error(
              'Google sign-in failed. Please try again.'
            );
        }
      }
    };

    return (
      <div className="signup-container">
        <h1 className="signup-title">
          Your online store is open 24/7—make every second count
        </h1>

        <form
          onSubmit={signUpHandler}
          className="signup-form"
        >
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-container">
  <input
    type={showPassword ? 'text' : 'password'}
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  <span
    className="password-toggle"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

          <button type="submit">
            Sign Up
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-btn"
            onClick={googleSignupHandler}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
            />
            Continue with Google
          </button>

          <p>
            Already have an account?{' '}
            <Link to="/login">
              Login
            </Link>
          </p>
        </form>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
      </div>
    );
  };

  export default Signup;
