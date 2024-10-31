import React, { useCallback, useEffect } from 'react';
import {useAuthContext} from "../hooks";
import {useRouter} from "../../routes/hooks";

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
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

    const check = useCallback(() => {
        if (authenticated) router.replace("/dashboard");
    }, [authenticated, router]);

    useEffect(() => {
        check();
    }, [check]);

    return <>{children}</>;
}
