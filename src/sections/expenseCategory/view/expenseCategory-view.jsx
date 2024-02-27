import { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getExpenseCategory } from 'src/redux/expenseCategory/expenseCategorySlice';

import Table from 'src/components/Table/Table';

import AddExpenseCategory from '../add-expenseCategory';


// ----------------------------------------------------------------------

export default function ExpenseCategoryPage() {
  

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch()
  const expenseCategorys = useSelector((state)=>(state.expenseCategory.expenseCategory))

  useEffect(() => {
    const fetchExpense = async () => {
      await dispatch(getExpenseCategory())
    }
    fetchExpense()
  }, [dispatch])

  console.log(expenseCategorys)



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

       
      </Stack>

    <Table
    rows={expenseCategorys}
    columns={columns}
    />

    </Container>
  );
}
