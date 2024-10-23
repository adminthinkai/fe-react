import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 5,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '100vh',
  overflow: 'auto',
};

type BasicModalProps = {
  children: React.ReactElement;
  isOpen: boolean;
  onClose: () => void;
};

export const BasicModal: React.FC<BasicModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <div>
      <Modal
        size
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
