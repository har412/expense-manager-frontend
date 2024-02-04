import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

// import { topFilms } from 'src/_mock/category';
import { addExpense, getExpense } from 'src/redux/expense/expenseSlice';
import { getExpenseCategory } from 'src/redux/expenseCategory/expenseCategorySlice';

import Iconify from 'src/components/iconify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: "10px"
};

const validate = (values) => {
  const errors = {};

  if (!values.amount) {
    errors.amount = 'Required';
  } else if (Number.isNaN(values.amount)) {
    errors.amount = 'Must be a number';
  }

  if (!values.category) {
    errors.category = 'Required';
  }

  if (!values.date) {
    errors.date = 'Required';
  }

  return errors;
};

export default function AddExpense({
  open,
  handleClose,
  handleOpen,
}) {

  const [searchOpen, setSearchOpen] = useState(false)
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch()
  const loading = searchOpen && options.length === 0;

  useEffect(()=>{
     dispatch(getExpenseCategory())
  },[dispatch])
  const expenseCategory = useSelector((state)=>(state.expenseCategory.expenseCategory))


  const formik = useFormik({
    initialValues: {
      amount: '',
      category: null,
      description: '',
      date: '',
      time: '',
    },
    validate,
    onSubmit:async (values, { resetForm }) => {
      console.log(values);
      const newData = values
      newData.category = values.category.name
     const response = await dispatch(addExpense(newData))
     if(response){
      dispatch(getExpense())
     }
      resetForm()
      handleClose();
    },
  });

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {

      if (active && expenseCategory) {
        setOptions(expenseCategory);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading  , expenseCategory]);

  useEffect(() => {
    if (!searchOpen) {
      setOptions([]);
    }
  }, [searchOpen]);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
        New Expense
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography sx={{ mb: 2 }} id="transition-modal-title" variant="h6" component="h2">
              Add New Expense
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="amount"
                name="amount"
                label="Expense Amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
                sx={{ mb: 2 }}
              />
              <Autocomplete
                id="category"
                open={searchOpen}
                onOpen={() => {
                  setSearchOpen(true);
                }}
                sx={{ mb: 2 }}
                onClose={() => {
                  setSearchOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                getOptionLabel={(option) => (option.name && typeof option.name === 'string') ? option.name : ''}
                options={options}
                loading={loading}
                value={formik.values.category}
                onChange={(event, newValue) => {
                  formik.setFieldValue('category', newValue)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type and Select Category"
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    helperText={formik.touched.category && formik.errors.category}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Expense Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                id="date"
                name="date"
                type="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                id="time"
                name="time"
                type="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button type="submit" variant="contained" color="primary" sx={{ padding: "10px 40px" }}>
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

AddExpense.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleOpen: PropTypes.func,
};
