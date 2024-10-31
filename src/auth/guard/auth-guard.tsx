import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from '../../routes/hooks';
import { useAuthContext } from '../hooks';

type Props = {
    children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
    const { loading } = useAuthContext();

    if (loading) {
        return <>Carregando...</>;
    }

    return (
        <Container>{children}</Container>
    );
}


function Container({ children }: Props) {
    const router = useRouter();

    const { authenticated } = useAuthContext();

    const [checked, setChecked] = useState(false);

    const check = useCallback(() => {
        if (!authenticated) {
            router.replace(`/auth/login`);
        } else {
            setChecked(true);
        }
    }, [authenticated, router]);

    useEffect(() => {
        check();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!checked) {
        return null;
    }

    return <>{children}</>;
}
