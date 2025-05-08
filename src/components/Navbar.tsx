import React from 'react';
import styled from 'styled-components';
import { FaUser, FaSun, FaMoon, FaPlus } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';

// Styled Components
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px; /* Increased height for a bigger navbar */
  padding: 0 30px; /* Increased padding for more internal space */
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  position: sticky; /* Makes the navbar stick to the top like dev.to */
  top: 0;
  z-index: 1000; /* Ensures navbar stays above other content */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Shadow for visual distinction */
  border-bottom: 1px solid ${props => props.theme.border}; /* Border for separation */

  @media (max-width: 768px) {
    padding: 0 15px; /* Adjusted padding for mobile */
  }
`;

const Logo = styled.h1`
  font-size: 28px; /* Larger brand name */
  font-weight: bold;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* Increased spacing between buttons */
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const CreateButtonDesktop = styled.button`
  padding: 12px 24px; /* Larger padding for a bigger button */
  background-color: ${props => props.theme.buttonBackground};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px; /* Larger text */
  &:hover {
    background-color: ${props => props.theme.buttonHover};
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const CreateButtonMobile = styled.button`
  padding: 12px; /* Larger padding */
  background-color: ${props => props.theme.buttonBackground};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: none;
  &:hover {
    background-color: ${props => props.theme.buttonHover};
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px; /* Larger clickable area */
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.8;
  }
`;


// Navbar Component
const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavbarContainer>
      <Logo onClick={()=>navigate('blogs')}>Bloggy</Logo>
      <ButtonsContainer>
      {!location.pathname.includes('create') && 
      <>
      <CreateButtonDesktop onClick={()=>navigate('create')}>Create Post</CreateButtonDesktop>  
      <CreateButtonMobile onClick={()=>navigate('create')}>
        <FaPlus size={24} color="#fff" /> 
      </CreateButtonMobile></>}
        <IconButton onClick={()=>navigate('dashboard')}>
          <FaUser size={24} color={theme === 'light' ? '#000' : '#fff'} />
        </IconButton>
        <IconButton onClick={toggleTheme}>
          {theme === 'light' ? (
            <FaMoon size={24} color="#000" /> 
          ) : (
            <FaSun size={24} color="#fff" /> 
          )}
        </IconButton>
      </ButtonsContainer>
    </NavbarContainer>
  );
};

export default Navbar;