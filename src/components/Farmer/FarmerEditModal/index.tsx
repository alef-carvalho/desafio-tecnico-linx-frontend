import * as yup from "yup";
import React, {memo} from "react";
import {Button, Col, FormGroup, Modal, Row} from "react-bootstrap";
import {Formik} from "formik";
import {ADDRESS_STATES} from "../../../common/constants/address.constants.ts";
import {Farmer} from "../../../infra/Entities/farmer.entity.ts";

interface FarmerEditModalProps {
    farmer: Farmer;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: Farmer) => void;
}

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required("O nome do cliente é obrigatório")
        .max(100, "O nome do cliente possuir no máximo 100 caracteres"),
    cpf_cnpj: yup
        .string()
        .required("O CPF/CNPJ é obrigatório")
        .max(15, "O CPF/CNPJ deve possuir no máximo 15 caracteres"),
    city: yup
        .string()
        .required("A cidade é obrigatória")
        .max(50, "A cidade deve possuir no máximo 50 caracteres"),
    state: yup
        .string()
        .required("O estádo é obrigatório")
        .max(2, "O estádo deve possuir no máximo 2 caracteres"),
});

const FarmerEditModal: React.FC<FarmerEditModalProps> = ({ isOpen, onClose, farmer, onConfirm }) => {

    const initialValues = {
        name: farmer.name,
        cpf_cnpj: farmer.cpf_cnpj,
        city: farmer.city,
        state: farmer.state,
    };

    return (
        <>
            <Modal show={isOpen} onHide={onClose} backdrop={"static"}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Produtor</Modal.Title>
                </Modal.Header>
                <Formik
                    onSubmit={onConfirm}
                    // @ts-ignore
                    initialValues={initialValues}
                    validationSchema={validationSchema}>
                    {({ errors, touched, handleChange, handleSubmit, values }) => (
                        <>
                            <Modal.Body>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <label htmlFor="name">Nome</label>
                                            <input
                                                id="name"
                                                type="text"
                                                className="form-control"
                                                value={values.name}
                                                onChange={handleChange("name")}/>
                                            {errors.name && touched.name && (
                                                <small className="form-text text-danger">{errors.name}</small>)}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "1rem" }}>
                                    <Col>
                                        <FormGroup>
                                            <label htmlFor="cpf_cnpj">CPF/CNPJ</label>
                                            <input
                                                id="cpf_cnpj"
                                                type="text"
                                                className="form-control"
                                                value={values.cpf_cnpj}
                                                onChange={handleChange("cpf_cnpj")}/>
                                            {errors.cpf_cnpj && touched.cpf_cnpj && (
                                                <small className="form-text text-danger">{errors.cpf_cnpj}</small>)}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "1rem" }}>
                                    <Col lg={6} xs={12}>
                                        <label htmlFor="city">Cidade</label>
                                        <input
                                            id="city"
                                            type="text"
                                            className="form-control"
                                            value={values.city}
                                            onChange={handleChange("city")}/>
                                        {errors.city && touched.city && (
                                            <small className="form-text text-danger">{errors.city}</small>)}
                                    </Col>
                                    <Col lg={6} xs={12}>
                                        <label htmlFor="state">Estado</label>
                                        <select
                                            id="state"
                                            className="form-control"
                                            onChange={handleChange("state")}>
                                            <option value="">Selecione</option>
                                            { ADDRESS_STATES.map((state) => <option key={state} value={state} selected={state == values.state}>{state}</option>)}
                                        </select>
                                        {errors.state && touched.state && (
                                            <small className="form-text text-danger">{errors.state}</small>)}
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={onClose}>
                                    Fechar
                                </Button>
                                <Button
                                    //disabled={!isValid}
                                    onClick={() => handleSubmit()}
                                    variant="primary">
                                    Confirmar
                                </Button>
                            </Modal.Footer>
                        </>
                    )}
                </Formik>

            </Modal>
        </>
    );
};

export default memo(FarmerEditModal)
