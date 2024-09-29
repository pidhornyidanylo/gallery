import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import modalClose from '/src/assets/content/modalClose.svg';
import DialogContent from '@mui/joy/DialogContent';
import { Dispatch, SetStateAction } from 'react';
import './Modal.scss';

type LayoutModalDialogProps = {
  layout: boolean;
  setLayout: Dispatch<SetStateAction<boolean>>;
};

const LayoutModalDialog: React.FC<LayoutModalDialogProps> = ({
  setLayout,
  layout,
}: LayoutModalDialogProps) => {
  return (
    <>
      <Stack direction="row" spacing={1}></Stack>
      <Modal open={layout} onClose={() => setLayout(false)}>
        <ModalDialog
          layout="fullscreen"
          sx={{ backgroundColor: 'transparent' }}
        >
          <button
            className="modal-buttonClose"
            onClick={() => setLayout(false)}
          >
            <img src={modalClose} alt="modal-close" />
          </button>
          <DialogContent></DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default LayoutModalDialog;
