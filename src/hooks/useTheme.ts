import { useOutletContext } from 'react-router-dom';

// Define the context shape
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Custom hook to access the theme context
export const useTheme = (): ThemeContextType => {
  const context = useOutletContext<ThemeContextType>();
  if (!context) {
    throw new Error('useTheme must be used within a Layout component with Outlet context');
  }
  return context;
};
