import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authservice';
import { AuthForm } from '../components/auth/Authform';


export const Auth = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    location: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (isSignIn) {
        const response = await authService.login(formData);
        if (response.token) {
          navigate('/dashboard');
        }
      } else {
        await authService.register(formData);
        setSuccessMessage('Registration successful! Please sign in with your credentials.');
        setTimeout(() => {
          setIsSignIn(true);
          setFormData({
            username: '',
            password: '',
            location: '',
          });
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    setFormData({
      username: '',
      password: '',
      location: '',
    });
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-md mx-auto mt-16 px-4">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}
          <AuthForm
            isSignIn={isSignIn}
            isLoading={isLoading}
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={toggleAuthMode}
              disabled={isLoading}
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium disabled:opacity-50"
            >
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};