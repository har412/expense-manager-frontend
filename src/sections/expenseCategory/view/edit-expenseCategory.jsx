import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { getExpenseCategory,updateExpenseCategory, getSingleExpenseCategory,  } from 'src/redux/expenseCategory/expenseCategorySlice';

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

export default function EditExpenseCategory({
    open,
    handleClose,
    handleOpen,
    expenseCategoryId
}) {

   
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(expenseCategoryId)
        dispatch(getSingleExpenseCategory(expenseCategoryId))
    }, [dispatch, expenseCategoryId])

    const singleExpenseCategory = useSelector((state) => (state.expenseCategory.singleExpenseCategory))
    console.log(singleExpenseCategory)



    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validate,
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
            const data = {
                name:values.name,
                description:values.description
            }
            const response = await dispatch(updateExpenseCategory({data,expenseCategoryId}))
            if (response) {
                dispatch(getExpenseCategory())
            }
            resetForm()
            handleClose();
        },
    });

    useEffect(() => {
        if (singleExpenseCategory && singleExpenseCategory[0]) {
            formik.setFieldValue('name', singleExpenseCategory[0].name);
            formik.setFieldValue('description', singleExpenseCategory[0].description);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expenseCategoryId, singleExpenseCategory]);

    return (
        <>
            <MenuItem onClick={handleOpen}>
                <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} /> Edit
            </MenuItem>

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
                            Edit ExpenseCategory
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="ExpenseCategory Amount"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.amount && Boolean(formik.errors.amount)}
                                helperText={formik.touched.amount && formik.errors.amount}
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
        </>
    );
}

EditExpenseCategory.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleOpen: PropTypes.func,
    expenseCategoryId: PropTypes.any,
};
