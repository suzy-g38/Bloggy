import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled Components
const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;

  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

const WelcomeHeading = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: ${props => props.theme.text};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const WelcomeMessage = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.secondaryText};
  margin-bottom: 30px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ExploreButton = styled.button`
  padding: 12px 30px;
  background-color: ${props => props.theme.buttonBackground};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: ${props => props.theme.buttonHover};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 10px 25px;
    font-size: 0.9rem;
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <WelcomeHeading>Welcome to Bloggy!</WelcomeHeading>
      <WelcomeMessage>
        Discover a world of ideas, stories, and insights. Join our community of writers and readers to explore, create, and share blogs that matter.
      </WelcomeMessage>
      <ExploreButton onClick={() => navigate('/blogs')}>
        Explore Blogs
      </ExploreButton>
    </HomeContainer>
  );
};

export default Home;