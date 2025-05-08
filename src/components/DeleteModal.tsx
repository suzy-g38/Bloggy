import React from 'react';
import styled from 'styled-components';

// Styled Components for the Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent backdrop */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it appears above other content */
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.background};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%; /* Responsive width for smaller screens */
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${props => props.theme.text};
`;

const ModalText = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
  color: ${props => props.theme.secondaryText};
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CancelButton = styled(ModalButton)`
  background-color: ${props => props.theme.secondaryText};
  color: ${props => props.theme.text};
  &:hover {
    background-color: ${props => props.theme.border};
  }
`;

const DeleteButton = styled(ModalButton)`
  background-color: #ff4444;
  color: white;
  &:hover {
    background-color: #cc0000;
  }
`;

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Confirm Deletion</ModalTitle>
        <ModalText>Are you sure you want to delete this blog post? This action cannot be undone.</ModalText>
        <ModalButtons>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <DeleteButton onClick={onConfirm}>Delete</DeleteButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteModal;