import React from 'react';
import { Loader2 } from 'lucide-react';

interface AuthFormProps {
  isSignIn: boolean;
  isLoading: boolean;
  formData: {
    username: string;
    password: string;
    location: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  isSignIn,
  isLoading,
  formData,
  onChange,
  onSubmit,
}) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
          disabled={isLoading}
        />
      </div>
      {!isSignIn && (
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            disabled={isLoading}
            placeholder="Enter your location"
          />
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin mr-2" />
            Processing...
          </>
        ) : (
          isSignIn ? 'Sign In' : 'Sign Up'
        )}
      </button>
    </form>
  );
};