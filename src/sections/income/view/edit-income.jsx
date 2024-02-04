import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { topFilms } from 'src/_mock/category';
import { getIncome,updateIncome, getSingleIncome,  } from 'src/redux/income/incomeSlice';

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

export default function EditIncome({
    open,
    handleClose,
    handleOpen,
    incomeId
}) {

    const [searchOpen, setSearchOpen] = useState(false)
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch()
    const loading = searchOpen && options.length === 0;

    function sleep(duration) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, duration);
        });
    }

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3);

            if (active) {
                setOptions([...topFilms]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!searchOpen) {
            setOptions([]);
        }
    }, [searchOpen]);

    useEffect(() => {
        console.log(incomeId)
        dispatch(getSingleIncome(incomeId))
    }, [dispatch, incomeId])

    const singleIncome = useSelector((state) => (state.income.singleIncome))
    console.log(singleIncome)



    const formik = useFormik({
        initialValues: {
            amount: '',
            category: null,
            description: '',
            date: '',
            time: '',
        },
        validate,
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
            const data = values
            data.category = values.category.title
            const response = await dispatch(updateIncome({data,incomeId}))
            if (response) {
                dispatch(getIncome())
            }
            resetForm()
            handleClose();
        },
    });

    useEffect(() => {
        if (singleIncome && singleIncome[0]) {
            formik.setFieldValue('amount', singleIncome[0].amount);
            formik.setFieldValue('category', {title:singleIncome[0].category});
            formik.setFieldValue('description', singleIncome[0].description);
            formik.setFieldValue('date', singleIncome[0].date);
            formik.setFieldValue('time', singleIncome[0].time);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [incomeId, singleIncome]);

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
                            Edit Income
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                id="amount"
                                name="amount"
                                label="Income Amount"
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
                                isOptionEqualToValue={(option, value) => option.title === value.title}
                                getOptionLabel={(option) => (option.title && typeof option.title === 'string') ? option.title : ''}
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
                                label="Income Description"
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
        </>
    );
}

EditIncome.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleOpen: PropTypes.func,
    incomeId: PropTypes.any,
};
