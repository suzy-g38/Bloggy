import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the theme type
type Theme = 'light' | 'dark';

// Define the context shape
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the ThemeContext with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the ThemeProvider props
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialTheme = 'light' }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for saved theme, fallback to initialTheme
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme && ['light', 'dark'].includes(savedTheme) ? savedTheme : initialTheme;
  });

  // Persist theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};