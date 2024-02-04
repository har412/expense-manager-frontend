import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { addExpenseCategory, getExpenseCategory } from 'src/redux/expenseCategory/expenseCategorySlice';

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

  if (!values.name) {
    errors.name = 'Required';
  }


  return errors;
};

export default function AddExpenseCategory({
  open,
  handleClose,
  handleOpen,
}) {

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const newData = {
        name: values.name,
        description: values.description,
      };
      const response = await dispatch(addExpenseCategory(newData))
      if (response) {
        dispatch(getExpenseCategory())
      }
      resetForm()
      handleClose();
    },
  });

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
        New ExpenseCategory
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
              Add New ExpenseCategory
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                id="description"
                name="description"
                label="ExpenseCategory Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
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

AddExpenseCategory.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleOpen: PropTypes.func,
};
