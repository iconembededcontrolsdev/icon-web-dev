'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Only update styles if mounted to avoid hydration errors accessing document
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      if (theme === 'dark') {
        // Dark theme colors
        root.style.setProperty('--background', '#0a0e27');
        root.style.setProperty('--foreground', '#e8edf4');
        root.style.setProperty('--card', '#141b2d');
        root.style.setProperty('--card-light', '#f5f7fa');
        root.style.setProperty('--card-foreground', '#f0f4f8');
        root.style.setProperty('--primary', '#4f8fff');
        root.style.setProperty('--primary-foreground', '#ffffff');
        root.style.setProperty('--accent', '#ff6b35');
        root.style.setProperty('--accent-hover', '#ff5722');
        root.style.setProperty('--muted', '#8b96a8');
        root.style.setProperty('--border', '#1e2842');
      } else {
        // Light theme colors
        root.style.setProperty('--background', '#f0f4f8');
        root.style.setProperty('--foreground', '#1a1f2e');
        root.style.setProperty('--card', '#ffffff');
        root.style.setProperty('--card-light', '#f8fafc');
        root.style.setProperty('--card-foreground', '#1a1f2e');
        root.style.setProperty('--primary', '#2563eb');
        root.style.setProperty('--primary-foreground', '#ffffff');
        root.style.setProperty('--accent', '#ea580c');
        root.style.setProperty('--accent-hover', '#dc2626');
        root.style.setProperty('--muted', '#64748b');
        root.style.setProperty('--border', '#e2e8f0');
      }
      
      if (mounted) {
        localStorage.setItem('theme', theme);
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
