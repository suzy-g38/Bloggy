import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Navbar from '../components/Navbar';
import { useTheme as useAppTheme } from '../context/ThemeContext';
import Footer from '../components/Footer';

// Define the theme objects
const lightTheme = {
    background: '#fff',
    text: '#000',
    secondaryText: '#666',
    border: '#ddd',
    buttonBackground: '#007bff',
    buttonHover: '#0056b3',
};

const darkTheme = {
    background: '#333',
    text: '#fff',
    secondaryText: '#aaa',
    border: '#555',
    buttonBackground: '#0056b3',
    buttonHover: '#003d82',
};

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;


// Styled Components for Layout
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the page takes up the full viewport height */
  width: 100%;
background-color: ${props => (props.theme as any === 'light' ? '#f7f7f7' : '#1a1a1a')};
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1500px; /* Constrain the maximum width for larger screens */
`;

const MainContent = styled.main`
  flex: 1; /* Grow to fill available space, pushing the footer to the bottom */
  padding:0 16px; /* Consistent base padding for mobile */

  @media (min-width: 640px) {
    padding: 24px; /* sm:px-6 */
  }
  @media (min-width: 768px) {
    padding: 32px; /* md:px-8 */
  }
  @media (min-width: 1024px) {
    padding: 40px; /* lg:px-10 */
  }
  @media (min-width: 1280px) {
    padding: 48px; /* xl:px-12 */
  }
`;

const Layout: React.FC = () => {
  const { theme, toggleTheme } = useAppTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeProvider theme={currentTheme as any}>
       <GlobalStyles /> 
      <PageWrapper theme={theme as any}>
        <Navbar/>
        <MainContent>
            <Outlet context={{ theme, toggleTheme }} />
        </MainContent>
        <Footer />
      </PageWrapper>
    </ThemeProvider>
  );
};

export default Layout;