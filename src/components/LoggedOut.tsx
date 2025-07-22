import React, { useCallback } from "react";
import Home from "./Home";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-slate-600 font-medium">Authenticating...</p>
    </div>
  </div>
);

const Navigation = ({ onLogin, onRegister, isLoginLoading }) => (
  <header className="bg-white/90 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
    <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 py-4">
      <div className="flex items-center">
        <h1 className="text-slate-800 font-bold text-xl sm:text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Your App
        </h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-3">
        <button
          onClick={onLogin}
          disabled={isLoginLoading}
          className="relative px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base text-slate-700 font-medium rounded-xl border border-slate-300 bg-white/70 hover:bg-white hover:border-slate-400 hover:shadow-lg active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Sign in to your account"
        >
          {isLoginLoading ? (
            <div className="w-4 h-4 border-2 border-slate-400 border-t-slate-700 rounded-full animate-spin mx-auto"></div>
          ) : (
            "Sign In"
          )}
        </button>
        <button
          onClick={onRegister}
          disabled={isLoginLoading}
          className="relative px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base text-white font-semibold rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Create a new account"
        >
          {isLoginLoading ? (
            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin mx-auto"></div>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="bg-white/90 backdrop-blur-lg border-t border-slate-200/60 py-6 sm:py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center space-y-4">
        <p className="text-slate-600 text-sm font-medium">
          &copy; {new Date().getFullYear()} Your App. All rights reserved.
        </p>
        <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500">
          <a 
            href="/privacy" 
            className="hover:text-slate-700 hover:underline transition-all duration-200 focus:outline-none focus:text-slate-700"
            aria-label="View privacy policy"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms" 
            className="hover:text-slate-700 hover:underline transition-all duration-200 focus:outline-none focus:text-slate-700"
            aria-label="View terms of service"
          >
            Terms of Service
          </a>
          <a 
            href="/contact" 
            className="hover:text-slate-700 hover:underline transition-all duration-200 focus:outline-none focus:text-slate-700"
            aria-label="Contact us"
          >
            Contact
          </a>
        </nav>
      </div>
    </div>
  </footer>
);

export default function LoggedOut() {
  const { isLoading, isLoginLoading, login, register } = useKindeAuth();

  const handleLogin = useCallback(() => {
    if (!isLoginLoading) {
      login();
    }
  }, [login, isLoginLoading]);

  const handleRegister = useCallback(() => {
    if (!isLoginLoading) {
      register();
    }
  }, [register, isLoginLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <Navigation 
        onLogin={handleLogin}
        onRegister={handleRegister}
        isLoginLoading={isLoginLoading}
      />

      <main className="flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-6xl">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/80 p-6 sm:p-8">
            <Home />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}