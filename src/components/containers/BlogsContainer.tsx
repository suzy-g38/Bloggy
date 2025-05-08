import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GET_BLOGS, GET_BLOGS_BY_USER_ID } from '../../graphql/queries';
import { DELETE_BLOG } from '../../graphql/mutations';
import { getUserId } from '../../utils/user';
import BlogsPagePresenter from '../presentational/BlogsPresenter';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  updatedAt: string;
  bannerUrl?: string;
  userId: string;
}

const BlogsPageContainer: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const userId = getUserId();
  const LIMIT = 5;

  const isDashboard = location.pathname === '/dashboard';

  const [fetchAllBlogs, { loading: loadingAll }] = useLazyQuery(GET_BLOGS, {
    onCompleted: data => {
      const newBlogs = data.getBlogs.blogs;
      setBlogs(prev => [...prev, ...newBlogs]);
      setHasMore(data.getBlogs.hasMore);
      setInitialLoadComplete(true);
    },
    onError: error => {
      console.error('Error fetching all blogs:', error);
      setHasMore(false);
      toast.error('Failed to load blogs.');
    },
    fetchPolicy: 'network-only',
  });

  const [fetchUserBlogs, { loading: loadingUser }] = useLazyQuery(GET_BLOGS_BY_USER_ID, {
    onCompleted: data => {
      const newBlogs = data.getBlogByUserId.blogs;
      setBlogs(prev => [...prev, ...newBlogs]);
      setHasMore(data.getBlogByUserId.hasMore);
      setInitialLoadComplete(true);
    },
    onError: error => {
      console.error('Error fetching user blogs:', error);
      setHasMore(false);
      toast.error('Failed to load blogs.');
    },
    fetchPolicy: 'network-only',
  });

  const [deleteBlog] = useMutation(DELETE_BLOG, {
    onCompleted: () => {
      setBlogs(prev => prev.filter(blog => blog.id !== blogToDelete));
      setDeleteModalOpen(false);
      setBlogToDelete(null);
      toast.success('Blog deleted successfully!');
    },
    onError: error => {
      console.error('Error deleting blog:', error);
      toast.error(error.message);
    },
  });

  const loading = loadingAll || loadingUser;

  // Reset state when the path changes
  useEffect(() => {
    setBlogs([]);
    setPage(1);
    setHasMore(true);
    setInitialLoadComplete(false);
  }, [location.pathname]);

  // Fetch blogs based on the path
  useEffect(() => {
    if (isDashboard) {
      fetchUserBlogs({ variables: { page, limit: LIMIT } });
    } else {
      fetchAllBlogs({ variables: { page, limit: LIMIT } });
    }
  }, [fetchAllBlogs, fetchUserBlogs, page, isDashboard]);

  const fetchMoreBlogs = () => {
    if (initialLoadComplete) {
      const nextPage = page + 1;
      setPage(nextPage);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setBlogToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (blogToDelete) {
      deleteBlog({ variables: { id: blogToDelete } });
    }
  };

  return (
    <BlogsPagePresenter
      blogs={blogs}
      userId={userId}
      isDashboard={isDashboard}
      loading={loading}
      hasMore={hasMore}
      fetchMoreBlogs={fetchMoreBlogs}
      onEdit={handleEdit}
      onDelete={handleDelete}
      deleteModalOpen={deleteModalOpen}
      setDeleteModalOpen={setDeleteModalOpen}
      blogToDelete={blogToDelete}
      confirmDelete={confirmDelete}
    />
  );
};

export default BlogsPageContainer;