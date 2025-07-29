import React, { createContext, useState, useEffect } from 'react';

export const ModeContext = createContext();

const Mode = ({ children }) => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const element = document.documentElement;

    if (theme === 'dark') {
      element.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      element.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Listen for changes in system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const themeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ModeContext.Provider value={{ theme, themeToggle }}>
      {children}
    </ModeContext.Provider>
  );
};

export default Mode;
