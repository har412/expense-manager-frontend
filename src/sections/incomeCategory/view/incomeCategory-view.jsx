import { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getIncomeCategory } from 'src/redux/incomeCategory/incomeCategorySlice';

import Table from 'src/components/Table/Table';

import AddIncomeCategory from '../add-incomeCategory';

// ----------------------------------------------------------------------

export default function IncomeCategoryPage() {
  
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getIncomeCategory())
  },[dispatch])

  const incomeCategorys = useSelector((state)=>(state.incomeCategory.incomeCategory))
  console.log(incomeCategorys)


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
      <img alt="icon" src="/assets/icons/glass/income.png" width="80px" />
        <Typography variant="h3">Income Category</Typography>
        
        <AddIncomeCategory
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        />

       
      </Stack>
    <Table
    rows={incomeCategorys}
    columns={columns}
    />
    </Container>
  );
}
