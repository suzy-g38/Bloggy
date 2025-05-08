import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import DeleteModal from '../DeleteModal';

// Styled Components
const BlogListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px; /* Reduce padding on smaller screens */
  }
`;

const BlogListStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

  @media (max-width: 1024px) {
    gap: 20px; /* Reduce gap on tablets */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column on mobile */
    gap: 15px; /* Further reduce gap on mobile */
  }
`;

const BlogItem = styled.article`
  background-color: ${props => props.theme.background};
  padding: 15px; /* Reduced padding for a more compact look */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.text};
  height: 350px; /* Fixed height for consistency */
  overflow: hidden; /* Prevent content from overflowing */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    height: 300px; /* Slightly smaller on mobile */
    padding: 10px;
  }
`;

const Banner = styled.div<{ src?: string }>`
  width: 100%;
  height: 150px; /* Reduced height for better proportion */
  background-color: ${props => props.theme.border};
  border-radius: 6px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem; /* Reduced font size */
  color: ${props => props.theme.secondaryText};
  background-image: url(${props => props.src || ''});
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    height: 120px; /* Smaller banner on mobile */
    font-size: 0.9rem;
  }
`;

const Title = styled.h2`
  font-size: 1.3rem; /* Slightly smaller font size */
  margin-bottom: 8px;
  white-space: normal; /* Allow wrapping */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  line-height: 1.4; /* Adjust line height for better spacing */

  @media (max-width: 768px) {
    font-size: 1.1rem; /* Smaller on mobile */
  }
`;

const Excerpt = styled.div`
  font-size: 0.9rem; /* Smaller font size */
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  color: ${props => props.theme.text};
  flex: 1; /* Grow to fill remaining space, ensuring consistent height */

  @media (max-width: 768px) {
    font-size: 0.85rem;
    -webkit-line-clamp: 2; /* Reduce to 2 lines on mobile */
  }
`;

const Metadata = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${props => props.theme.secondaryText};
  margin-bottom: 10px;
`;

const ReadMore = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.buttonBackground};
  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.buttonHover};
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

const PageHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin: 30px 0;
  color: ${props => props.theme.text};
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 20px 0;
  }
`;

const EditButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.theme.buttonBackground};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: ${props => props.theme.buttonHover};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #cc0000;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 10px;
`;

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  updatedAt: string;
  bannerUrl?: string;
  userId: string;
}

interface BlogsPagePresenterProps {
  blogs: Blog[];
  userId: string;
  isDashboard: boolean;
  loading: boolean;
  hasMore: boolean;
  fetchMoreBlogs: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  deleteModalOpen: boolean;
  setDeleteModalOpen: (open: boolean) => void;
  blogToDelete: string | null;
  confirmDelete: () => void;
}

const BlogsPresenter: React.FC<BlogsPagePresenterProps> = ({
  blogs,
  userId,
  isDashboard,
  loading,
  hasMore,
  fetchMoreBlogs,
  onEdit,
  onDelete,
  deleteModalOpen,
  setDeleteModalOpen,
  blogToDelete,
  confirmDelete,
}) => {
  return (
    <InfiniteScroll
      dataLength={blogs.length}
      next={fetchMoreBlogs}
      hasMore={hasMore}
      loader={<Spinner />}
    >
      <BlogListContainer>
        {isDashboard && <PageHeading>Your Blogs</PageHeading>}
        {blogs.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', flex: 1 }}>
            No blogs available.
          </p>
        ) : (
          <BlogListStyled>
            {!loading &&
              blogs.map(blog => (
                <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <BlogItem key={blog.id}>
                    <Banner src={blog.bannerUrl || ''}>
                      {!blog.bannerUrl && 'No Banner'}
                    </Banner>
                    <Title>{blog.title}</Title>
                    <Excerpt dangerouslySetInnerHTML={{ __html: blog.content }} />
                    {isDashboard && blog.userId === userId && (
                      <ActionButtons>
                        <EditButton
                          onClick={(e) => {
                            e.preventDefault(); // Prevent Link navigation
                            e.stopPropagation(); // Stop event bubbling
                            onEdit(blog.id);
                          }}
                        >
                          Edit
                        </EditButton>
                        <DeleteButton
                          onClick={(e) => {
                            e.preventDefault(); // Prevent Link navigation
                            e.stopPropagation(); // Stop event bubbling
                            onDelete(blog.id);
                          }}
                        >
                          Delete
                        </DeleteButton>
                      </ActionButtons>
                    )}
                  </BlogItem>
                </Link>
              ))}
          </BlogListStyled>
        )}
      </BlogListContainer>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </InfiniteScroll>
  );
};

export default BlogsPresenter;