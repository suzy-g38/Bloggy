import { gql } from '@apollo/client';

export const GET_BLOGS = gql`
  query GetBlogs($page: Int, $limit: Int) {
    getBlogs(page: $page, limit: $limit) {
      blogs {
        id
        title
        content
        author
        like
        updatedAt,
        bannerUrl
      }
      hasMore
    }
  }
`;

export const GET_BLOG_BY_ID = gql`
  query GetBlogById($Id: ID!) {
    getBlogById(Id: $Id) {
      id
      title
      content
      author
      like
      updatedAt
      bannerUrl
    }
  }
`;

export const GET_BLOGS_BY_USER_ID = gql`
  query GetBlogByUserId($page: Int!, $limit: Int!) {
    getBlogByUserId(page: $page, limit: $limit) {
      blogs {
        id
        title
        content
        author
        updatedAt
        bannerUrl
        userId
      }
      hasMore
    }
  }
`;

