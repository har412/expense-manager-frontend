import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { RegisterUser } from 'src/redux/auth/authSlice';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RegisterView() {
    const theme = useTheme();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            // console.log('Form submitted with values:', values);
            try {
                const data = await dispatch(RegisterUser(values));
                if (!data.error) {
                    router.push('/')
                }
            } catch (error) {
                console.error('Register failed:', error.message);
            }
        },
    });

    const handleClick = () => {
        formik.handleSubmit();
    };

    const handleLoginClick = () => {
        router.push('/')
    }

    const renderForm = (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    name="name"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    name="email"
                    label="Email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <Link variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleClick}
                loading={formik.isSubmitting}
            >
                Register
            </LoadingButton>
        </form>
    )

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: '/assets/background/overlay_4.jpg',
                }),
                height: 1,
            }}
        >


            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img src="assets/icons/glass/logor.png" alt="" width="100px" />
                    </div>
                    <Typography variant="h4">Sign Up for Expense Manager</Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                        ALready have an account?
                        <Link variant="subtitle2" sx={{ ml: 0.5, cursor: "pointer" }} onClick={handleLoginClick}  >
                            Login
                        </Link>
                    </Typography>



                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
