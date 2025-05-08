import React from 'react';
import styled from 'styled-components';

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

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  updatedAt: string;
  bannerUrl?: string;
  like: number;
}

interface BlogDetailsPresenterProps {
  blog?: Blog;
  loading: boolean;
  error?: string;
  theme: 'light' | 'dark';
}

const BlogDetailsPresenter: React.FC<BlogDetailsPresenterProps> = ({
  blog,
  loading,
  error,
  theme,
}) => {
  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (error) {
    return <Container>Sorry: Something went wrong</Container>;
  }

  if (!blog) {
    return <Container>No blog found.</Container>;
  }

  return (
    <Container color={theme === 'light' ? '#000' : '#fff'}>
      <Title>{blog.title}</Title>
      <Metadata>
        By {blog.author} • Last updated on {new Date(blog.updatedAt).toLocaleDateString()}
      </Metadata>
      {blog.bannerUrl && <Banner src={blog.bannerUrl} alt="Banner" />}
      <Content dangerouslySetInnerHTML={{ __html: blog.content }} />
    </Container>
  );
};

export default BlogDetailsPresenter;