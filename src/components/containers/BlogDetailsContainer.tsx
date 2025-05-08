import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_BLOG_BY_ID } from '../../graphql/queries';
import BlogDetailsPresenter from '../presentational/BlogDetailsPresenter';
import { useTheme } from '../../hooks/useTheme';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  updatedAt: string;
  bannerUrl?: string;
  like: number;
}

const BlogDetailsContainer: React.FC= () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();

  const { data, loading, error } = useQuery<{ getBlogById: Blog }>(GET_BLOG_BY_ID, {
    variables: { Id: id },
  });

  return (
    <BlogDetailsPresenter
      blog={data?.getBlogById}
      loading={loading}
      error={error?.message}
      theme={theme}
    />
  );
};

export default BlogDetailsContainer;