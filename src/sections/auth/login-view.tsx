import * as yup from "yup";
import { useAuthContext } from '../../auth/hooks';
import {Formik} from "formik";
import {useRouter} from "../../routes/hooks";
import {enqueueSnackbar} from "notistack";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    CssBaseline
} from '@mui/material';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .required("O e-mail é obrigatório")
        .email("O e-mail é inválido"),
    password: yup
        .string()
        .required("O senha é obrigatória"),
});

export default function LoginView() {
    const router = useRouter();
    const { login } = useAuthContext();

    const initialValues = {
        email: "",
        password: ""
    };

    const onSubmit = async ({ email, password }: { email: string, password: string }) => {
        try {
            await login?.(email, password).then(() => router.push("/dashboard"));
        } catch (error) {
            enqueueSnackbar({ message: error?.message, variant: "error" });
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
                <Typography component="h1" variant="h5" align="center">
                    Login
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}>
                        {({ errors, touched, handleChange, handleSubmit }) => (
                            <>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={handleChange("email")}
                                />
                                { errors.email && touched.email && (<small className="form-text text-danger">{errors.email}</small>) }
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={handleChange("password")}
                                />
                                { errors.password && touched.password && (<small className="form-text text-danger">{errors.password}</small>) }
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => handleSubmit()}>
                                    Entrar
                                </Button>
                            </>
                        )}
                    </Formik>
                </Box>
            </Paper>
        </Container>
    );
}
