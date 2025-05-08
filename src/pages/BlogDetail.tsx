import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { GET_BLOG_BY_ID } from '../graphql/queries';
import BlogDetailsContainer from '../components/containers/BlogDetailsContainer';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 40px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, sans-serif;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 15px;
  line-height: 1.3;
`;

const Metadata = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.secondaryText};
  margin-bottom: 30px;
`;

const Banner = styled.img`
  width: 100%;
  height: auto;
  border-radius: 6px;
  margin-bottom: 30px;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 30px;
  p {
    margin-bottom: 1.5em;
  }
`;

const Spinner = styled.div`
  border: 4px solid ${props => props.theme.border};
  border-left-color: ${props => props.theme.text};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Likes = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.secondaryText};
  padding-top: 20px;
  border-top: 1px solid ${props => props.theme.border};
`;

// BlogDetails Component
const BlogDetails: React.FC = () => {
  // const { id } = useParams();
  // const { theme } = useTheme();
  // const { data, loading, error } = useQuery(GET_BLOG_BY_ID, {
  //   variables: { Id: id },
  // });

  // if (loading) return <Container>Loading...</Container>;
  // if (error) return <Container>Error: {error.message}</Container>;

  // const blog = data.getBlogById;

  return (
    <BlogDetailsContainer/>
  );
};

export default BlogDetails;