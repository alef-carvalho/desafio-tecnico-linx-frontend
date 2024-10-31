import React, {memo} from "react";
import {Container, Navbar} from "react-bootstrap";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({  }) => {
    return (
        <Navbar expand="lg" className="bg-body-secondary">
            <Container>
                <Navbar.Brand href="#home">Pagamentos</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default memo(Header)