import React, {useState} from "react";
import { useAuthContext } from '../../auth/hooks';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    CssBaseline
} from '@mui/material';
import {useRouter} from "../../routes/hooks";
import {enqueueSnackbar} from "notistack";

export default function LoginView() {
    const router = useRouter();
    const { login } = useAuthContext();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSubmit = async () => {
        try {
            await login?.(email, password).then(() => router.push("/dashboard"));
        } catch (error) {
            enqueueSnackbar({ message: error?.message ?? "Erro ao realizar login", variant: "error" });
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
                <Typography component="h1" variant="h5" align="center">
                    Login
                </Typography>
                <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={onSubmit}
                    >
                        Entrar
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
