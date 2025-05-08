import React, { useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CREATE_BLOG, UPDATE_BLOG } from '../../graphql/mutations';
import { GET_BLOG_BY_ID } from '../../graphql/queries';
import CreateBlogPresenter from '../presentational/CreateBlogPresenter';

interface CreateBlogContainerProps {}

const CreateBlogContainer: React.FC<CreateBlogContainerProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const isEditMode = location.pathname.startsWith('/edit') && !!id;

  // Form state
  const [title, setTitle] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

  // Initialize the editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  // Fetch blog data if in edit mode
  const { data, loading: fetchLoading, error: fetchError } = useQuery(GET_BLOG_BY_ID, {
    variables: { Id: id },
    skip: !isEditMode,
    onCompleted: (data) => {
      setTitle(data.getBlogById.title);
      setBannerUrl(data.getBlogById.bannerUrl || '');
      if (editor && data.getBlogById.content) {
        editor.commands.setContent(data.getBlogById.content);
      }
    },
  });

  // Mutations for create and update
  const [createBlog, { loading: createLoading }] = useMutation(CREATE_BLOG, {
    onCompleted: () => {
      toast.success('Blog created successfully!');
      navigate('/blogs');
    },
    onError: (error) => {
      console.error('Error creating blog:', error);
      toast.error('Failed to create blog.');
    },
  });

  const [updateBlog, { loading: updateLoading }] = useMutation(UPDATE_BLOG, {
    onCompleted: () => {
      toast.success('Blog updated successfully!');
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog.');
    },
  });

  // Handle form submission
  const handleSubmit = async () => {
    if (title.trim() && editor && !editor.isEmpty) {
      const content = editor.getHTML();
      if (isEditMode) {
        await updateBlog({
          variables: { id, title, content, bannerUrl },
        });
      } else {
        await createBlog({
          variables: { title, content, bannerUrl },
        });
      }
    } else {
      toast.error('Please provide a title and content.');
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate(isEditMode ? '/dashboard' : '/blogs');
  };

  // Word count for the editor
  const wordCount = editor
    ? editor.getText().split(/\s+/).filter(word => word.length > 0).length
    : 0;

  // Loading state for the submit button
  const isSubmitting = createLoading || updateLoading || fetchLoading;

  return (
    <CreateBlogPresenter
      isEditMode={isEditMode}
      title={title}
      setTitle={setTitle}
      bannerUrl={bannerUrl}
      setBannerUrl={setBannerUrl}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      editor={editor}
      wordCount={wordCount}
      isSubmitting={isSubmitting}
      fetchLoading={fetchLoading}
      fetchError={fetchError?.message}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      toggleBold={() => editor?.chain().focus().toggleBold().run()}
      canToggleBold={() => editor?.can().chain().focus().toggleBold().run() ?? false}
      toggleItalic={() => editor?.chain().focus().toggleItalic().run()}
      canToggleItalic={() => editor?.can().chain().focus().toggleItalic().run() ?? false}
      toggleHeading={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
      canToggleHeading={() => editor?.can().chain().focus().toggleHeading({ level: 2 }).run() ?? false}
      toggleBulletList={() => editor?.chain().focus().toggleBulletList().run()}
      canToggleBulletList={() => editor?.can().chain().focus().toggleBulletList().run() ?? false}
    />
  );
};

export default CreateBlogContainer;