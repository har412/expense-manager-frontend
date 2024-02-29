import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { Button, Dialog, IconButton,DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';

import { getExpenseCategory , deleteExpenseCategory } from 'src/redux/expenseCategory/expenseCategorySlice';

import Iconify from 'src/components/iconify';
import Table from 'src/components/Table/Table';

import AddExpenseCategory from '../add-expenseCategory';
import EditExpenseCategory from './edit-expenseCategory';


// ----------------------------------------------------------------------

export default function ExpenseCategoryPage() {


  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const [editId, setEditId] = useState(null)
  const [openEditBox, setOpenEditBox] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const dispatch = useDispatch()
  const expenseCategorys = useSelector((state) => (state.expenseCategory.expenseCategory))

  useEffect(() => {
    const fetchExpense = async () => {
      await dispatch(getExpenseCategory())
    }
    fetchExpense()
  }, [dispatch])


  const handleCloseEditBox = () => {
    setOpenEditBox(false)
  }

  const handleOpenEditBox = () => {
    setOpenEditBox(true)
  }
  const handleEdit = async (id) => {
    await setEditId(id)
    await setOpenEditBox(true)
  }

  const handleOpenConfirmation = (id) => {
    console.log(id)
    setDeleteId(id)
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleDeleteExpense = async () => {
    handleCloseConfirmation();
    const response = await dispatch(deleteExpenseCategory(deleteId))
    if (response) {
      await dispatch(getExpenseCategory())
    }
  }
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
      flex: true
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 110,
      editable: true,
    },
    {
      headerName: 'Actions',
      width: 160,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => handleOpenConfirmation(params.id)}
          >
            <GridDeleteIcon />
          </IconButton>
          <IconButton
            aria-label="update"
            color="primary"
            onClick={() => handleEdit(params.id)}
          >
            <Iconify icon="eva:edit-2-fill" />
          </IconButton>
        </div>
      )
    }
  ];

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <img alt="icon" src="/assets/icons/glass/expense.png" width="80px" />
        <Typography variant="h3">Expense Category</Typography>

        <AddExpenseCategory
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />
        <EditExpenseCategory
          open={openEditBox}
          handleClose={handleCloseEditBox}
          handleOpen={handleOpenEditBox}
          expenseCategoryId={editId}
        />

      </Stack>

      <Table
        rows={expenseCategorys}
        columns={columns}
      />
      <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this expense?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button onClick={handleDeleteExpense} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
