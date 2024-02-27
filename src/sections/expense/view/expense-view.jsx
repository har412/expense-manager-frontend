import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getExpense } from 'src/redux/expense/expenseSlice';

import Table from 'src/components/Table/Table';

import AddExpense from '../add-expense';


// ----------------------------------------------------------------------

export default function ExpensePage() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch()
  const expenses = useSelector((state) => (state.expense.expense))

  useEffect(() => {
    const fetchExpense = async () => {
      await dispatch(getExpense())
    }
    fetchExpense()
  }, [dispatch])

  console.log(expenses, "ex")


  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: true,
      flex:true
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 110,
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 160,
    }
  ];


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <img alt="icon" src="/assets/icons/glass/expense.png" width="80px" />
        <Typography variant="h3">Expenses</Typography>

        <AddExpense
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />


      </Stack>
      <Table
        rows={expenses}
        columns={columns}
      />
   
    </Container >
  );
}
