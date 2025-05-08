import React from 'react';
import styled from 'styled-components';

// Styled Components
const FooterContainer = styled.footer`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.secondaryText};
  padding: 30px;
  text-align: center;
  border-top: 1px solid ${props => props.theme.border};
  width: 100%;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const FooterContent = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>© {new Date().getFullYear()} Bloggy. All rights reserved.</FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;