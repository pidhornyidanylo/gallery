import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogContent from '@mui/joy/DialogContent';
import { Dispatch, SetStateAction } from 'react';

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
          <ModalClose />
          <DialogContent></DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default LayoutModalDialog;
