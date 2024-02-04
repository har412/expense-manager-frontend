import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button, Dialog , DialogTitle  ,DialogContent, DialogActions, DialogContentText } from '@mui/material';

import { getIncomeCategory, deleteIncomeCategory } from 'src/redux/incomeCategory/incomeCategorySlice';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import EditIncomeCategory from './view/edit-incomeCategory';


// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  amount,
  avatarUrl,
  category,
  description,
  date,
  status,
  incomeCategoryId,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [openEditBox, setOpenEditBox] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const dispatch = useDispatch()
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
    handleCloseMenu();
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDeleteIncomeCategory = () =>{
    handleCloseConfirmation();
   const response = dispatch(deleteIncomeCategory(incomeCategoryId))
   if(response)
   {
    dispatch(getIncomeCategory())
   }
  }

  
  const handleCloseEditBox =()=>{
    setOpenEditBox(false)
  }

  const handleOpenEditBox =()=>{
    setOpenEditBox(true)
  }


  return (
    <>
   
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" sx={{paddingLeft:"20px"}} spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            <Typography variant="subtitle2" noWrap >
              {amount}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{description}</TableCell>

  
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this incomeCategory?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button onClick={handleDeleteIncomeCategory} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
       
          <EditIncomeCategory open={openEditBox} handleClose={handleCloseEditBox} handleOpen={handleOpenEditBox} incomeCategoryId={incomeCategoryId} />
        

        <MenuItem onClick={handleOpenConfirmation} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  description: PropTypes.any,
  handleClick: PropTypes.func,
  date: PropTypes.any,
  amount: PropTypes.any,
  category: PropTypes.any,
  incomeCategoryId: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
