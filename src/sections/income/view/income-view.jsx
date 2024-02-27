
import { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getIncome } from 'src/redux/income/incomeSlice';

import Table from 'src/components/Table/Table';

import AddIncome from '../add-income';


// ----------------------------------------------------------------------

export default function IncomePage() {
  
 

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getIncome())
  },[dispatch])

  const incomes = useSelector((state)=>(state.income.income))
  console.log(incomes)


  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: true,
      flex: true
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
      <img alt="icon" src="/assets/icons/glass/income.png" width="80px" />
        <Typography variant="h3">Incomes</Typography>
        

        <AddIncome
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        />

       
      </Stack>
      <Table
        rows={incomes}
        columns={columns}
        />
    </Container>
  );
}
