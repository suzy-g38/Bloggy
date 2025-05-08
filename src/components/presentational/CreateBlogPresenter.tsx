import React from 'react';
import styled from 'styled-components';
import { EditorContent, Editor } from '@tiptap/react';
import { FaBold, FaItalic, FaHeading, FaListUl } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled Components
const Container = styled.div`
  padding: 30px 20px;
  max-width: 900px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
`;

const Banner = styled.div`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 30px;
  text-align: center;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    color: ${props => props.theme.secondaryText};
  }
`;

const TitleInput = styled.input`
  width: 97%;
  padding: 15px;
  font-size: 1.8rem;
  font-weight: 500;
  border: 1px solid ${props => props.theme.border};
  border-radius: 6px;
  margin-bottom: 15px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: ${props => props.theme.buttonBackground};
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
  }

  &::placeholder {
    color: ${props => props.theme.secondaryText};
  }
`;

const BannerUrlInput = styled.input`
  width: 98%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 6px;
  margin-bottom: 30px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: ${props => props.theme.buttonBackground};
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
  }

  &::placeholder {
    color: ${props => props.theme.secondaryText};
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => (props.active ? props.theme.buttonBackground : props.theme.secondaryText)};
  border-bottom: ${props => (props.active ? `2px solid ${props.theme.buttonBackground}` : 'none')};
  transition: color 0.2s ease, border-bottom 0.2s ease;

  &:hover {
    color: ${props => props.theme.buttonHover};
  }
`;

const EditorContainer = styled.div`
  margin-bottom: 30px;

  .ProseMirror {
    padding: 20px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 6px;
    min-height: 400px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    line-height: 1.6;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.buttonBackground};
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
    }
  }
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.border};
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const ToolbarButton = styled.button`
  padding: 8px;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: ${props => props.theme.text};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.border};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PreviewContainer = styled.div`
  padding: 30px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  min-height: 400px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  line-height: 1.6;
  font-size: 1rem;

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const PreviewBanner = styled.div<{ src?: string }>`
  width: 100%;
  height: 200px;
  background-color: ${props => props.theme.border};
  background-image: url(${props => props.src || ''});
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  margin-bottom: 20px;
`;

const WordCount = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.secondaryText};
  margin-top: 10px;
  text-align: right;
`;

const SubmitButton = styled.button`
  padding: 12px 30px;
  background-color: ${props => props.theme.buttonBackground};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:disabled {
    background-color: ${props => props.theme.secondaryText};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.buttonHover};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  padding: 12px 30px;
  background-color: ${props => props.theme.secondaryText};
  color: ${props => props.theme.text};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.border};
  }

  @media (max-width: 768px) {
    padding: 10px 25px;
    font-size: 0.9rem;
  }
`;

interface CreateBlogPresenterProps {
  isEditMode: boolean;
  title: string;
  setTitle: (title: string) => void;
  bannerUrl: string;
  setBannerUrl: (url: string) => void;
  selectedTab: 'write' | 'preview';
  setSelectedTab: (tab: 'write' | 'preview') => void;
  editor: Editor | null;
  wordCount: number;
  isSubmitting: boolean;
  fetchLoading: boolean;
  fetchError?: string;
  onSubmit: () => void;
  onCancel: () => void;
  toggleBold: () => void;
  canToggleBold: () => boolean;
  toggleItalic: () => void;
  canToggleItalic: () => boolean;
  toggleHeading: () => void;
  canToggleHeading: () => boolean;
  toggleBulletList: () => void;
  canToggleBulletList: () => boolean;
}

const CreateBlogPresenter: React.FC<CreateBlogPresenterProps> = ({
  isEditMode,
  title,
  setTitle,
  bannerUrl,
  setBannerUrl,
  selectedTab,
  setSelectedTab,
  editor,
  wordCount,
  isSubmitting,
  fetchLoading,
  fetchError,
  onSubmit,
  onCancel,
  toggleBold,
  canToggleBold,
  toggleItalic,
  canToggleItalic,
  toggleHeading,
  canToggleHeading,
  toggleBulletList,
  canToggleBulletList,
}) => {
  // Show loading or error state while fetching blog data
  if (isEditMode && fetchLoading) {
    return <Container>Loading blog data...</Container>;
  }

  if (isEditMode && fetchError) {
    toast.error('Failed to load blog data.');
    return <Container>Error loading blog data: {fetchError}</Container>;
  }

  return (
    <Container>
      <Banner>
        <h1>{isEditMode ? 'Edit Blog Post' : 'Create a New Blog Post'}</h1>
        <p>{isEditMode ? 'Update your blog post' : 'Share your thoughts and ideas with the world'}</p>
      </Banner>
      <TitleInput
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter your blog post title..."
      />
      <BannerUrlInput
        type="text"
        value={bannerUrl}
        onChange={e => setBannerUrl(e.target.value)}
        placeholder="Enter banner image URL..."
      />
      <Tabs>
        <TabButton active={selectedTab === 'write'} onClick={() => setSelectedTab('write')}>
          Write
        </TabButton>
        <TabButton active={selectedTab === 'preview'} onClick={() => setSelectedTab('preview')}>
          Preview
        </TabButton>
      </Tabs>
      {selectedTab === 'write' && editor ? (
        <EditorContainer>
          <Toolbar>
            <ToolbarButton onClick={toggleBold} disabled={!canToggleBold()}>
              <>{<FaBold size={16} />}</>
            </ToolbarButton>
            <ToolbarButton onClick={toggleItalic} disabled={!canToggleItalic()}>
              <>{<FaItalic size={16} />}</>
            </ToolbarButton>
            <ToolbarButton onClick={toggleHeading} disabled={!canToggleHeading()}>
              <>{<FaHeading size={16} />}</>
            </ToolbarButton>
            <ToolbarButton onClick={toggleBulletList} disabled={!canToggleBulletList()}>
              <>{<FaListUl size={16} />}</>
            </ToolbarButton>
          </Toolbar>
          <EditorContent editor={editor} />
          <WordCount>{wordCount} words</WordCount>
        </EditorContainer>
      ) : (
        <PreviewContainer>
          <PreviewBanner src={bannerUrl} />
          <h2>{title || 'Your Title Here'}</h2>
          <div dangerouslySetInnerHTML={{ __html: editor ? editor.getHTML() : '' }} />
        </PreviewContainer>
      )}
      <ButtonContainer>
        <CancelButton onClick={onCancel}>
          Cancel
        </CancelButton>
        <SubmitButton
          disabled={!title.trim() || !editor || editor.isEmpty || isSubmitting}
          onClick={onSubmit}
        >
          {isSubmitting
            ? isEditMode
              ? 'Updating...'
              : 'Publishing...'
            : isEditMode
            ? 'Update'
            : 'Publish'}
        </SubmitButton>
      </ButtonContainer>
      <ToastContainer />
    </Container>
  );
};

export default CreateBlogPresenter;