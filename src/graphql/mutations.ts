import { gql } from '@apollo/client';

export const CREATE_BLOG = gql`
  mutation CreateBlog($title: String!, $content: String!, $bannerUrl: String) {
    createBlog(title: $title, content: $content, bannerUrl: $bannerUrl) {
      id
      title
      content
      author
      updatedAt
      bannerUrl
      userId
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id)
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($id: ID!, $title: String!, $content: String!) {
    updateBlog(id: $id, title: $title, content: $content) {
      id
      title
      content
      updatedAt
      userId
    }
  }
`;