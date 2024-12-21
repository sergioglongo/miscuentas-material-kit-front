import React from 'react';
// import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function ModalConfirm(props:any) {
  const {
    openmodal, titulo, children, buttonPrimaryAction, buttonSecondaryAction, loading,
    buttonPrimaryText, buttonSecondaryText, buttonPrimaryShow, buttonSecondaryShow
  } = props;
  const handleClose = () => {
    buttonSecondaryAction();
  };

  const handleConfirm = () => {
    buttonPrimaryAction();
  };

  return (
    <div>
      <Dialog
        open={openmodal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {titulo}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {buttonSecondaryShow
                        && <Button onClick={handleClose} color="primary">
                          {buttonSecondaryText}
                        </Button>
          }
          {buttonPrimaryShow
                        && <Button onClick={handleConfirm} color="primary" variant="contained" autoFocus disabled={loading}>
                          {buttonPrimaryText}
                        </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}

// ModalConfirm.propTypes = {
//   openmodal: PropTypes.bool.isRequired,
//   setOpenmodal: PropTypes.func.isRequired,
//   titulo: PropTypes.string.isRequired,
//   mensaje: PropTypes.string.isRequired,
//   buttonPrimaryAction: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
//   buttonSecondaryAction: PropTypes.func.isRequired,
//   buttonPrimaryText: PropTypes.string,
//   buttonSecondaryText: PropTypes.string,
//   buttonPrimaryShow: PropTypes.bool,
//   buttonSecondaryShow: PropTypes.bool
// };

export default ModalConfirm;
