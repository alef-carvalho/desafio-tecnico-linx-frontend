import * as yup from "yup";
import React, {memo} from "react";
import {Button, Col, FormGroup, Modal, Row} from "react-bootstrap";
import Select from "react-select";
import {Formik} from "formik";
import {useCultures} from "../../../contexts/CultureContext";
import {Farm} from "../../../infra/Entities/farm.entity.ts";

interface FarmEditModalProps {
    farm: Farm;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: any) => void;
}

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required("O campo nome é obrigatório")
        .max(100, "O nome do cliente possuir no máximo 100 caracteres"),
    total_area: yup
        .number()
        .required("O campo área total é obrigatório")
        .min(1, "A área total deve ser maior que zero"),
    total_agriculture_area: yup
        .number()
        .required("O campo área agricultável é obrigatório")
        .min(1,"A área agricultável deve ser maior que zero"),
    total_vegetation_area: yup
        .number()
        .required("O campo área de vegetação é obrigatório")
        .min(1,"A área de vegetação deve ser maior que zero"),
    cultures: yup
        .array()
        .required("O campo cultura(s) é obrigatório")
        .min(1,"Você deve selecionar pelo menos uma cultura")
});

const FarmEditModal: React.FC<FarmEditModalProps> = ({ farm, isOpen, onClose, onConfirm }) => {

    const { cultures } = useCultures();

    const initialValues = {
        name: farm.name,
        total_area: farm.total_area,
        total_agriculture_area: farm.total_agriculture_area,
        total_vegetation_area: farm.total_vegetation_area,
        cultures: farm.cultures
    };

    return (
        <>
            <Modal show={isOpen} onHide={onClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Propriedade</Modal.Title>
                </Modal.Header>
                <Formik
                    onSubmit={onConfirm}
                    initialValues={initialValues}
                    validationSchema={validationSchema}>
                    {({ errors, touched, handleChange, handleSubmit, setFieldValue, values }) => (
                        <>
                            <Modal.Body>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <label htmlFor="name">Nome</label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={values.name}
                                                className="form-control"
                                                onChange={handleChange("name")}/>
                                            { errors.name && touched.name && (<small className="form-text text-danger">{errors.name}</small>) }
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <label htmlFor="name">Área Total</label>
                                            <input
                                                id="total_area"
                                                type="number"
                                                min={1}
                                                value={values.total_area}
                                                className="form-control"
                                                onChange={handleChange("total_area")}/>
                                            { errors.total_area && touched.total_area && (<small className="form-text text-danger">{errors.total_area}</small>)}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <label htmlFor="name">Área Agricultável (Ha)</label>
                                            <input
                                                id="total_agriculture_area"
                                                type="number"
                                                min={1}
                                                value={values.total_agriculture_area}
                                                className="form-control"
                                                onChange={handleChange("total_agriculture_area")}/>
                                            { errors.total_agriculture_area && touched.total_agriculture_area && (<small className="form-text text-danger">{errors.total_agriculture_area}</small>)}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <label htmlFor="name">Área de Vegetação (Ha)</label>
                                            <input
                                                id="total_vegetation_area"
                                                type="number"
                                                className="form-control"
                                                min={1}
                                                value={values.total_vegetation_area}
                                                onChange={handleChange("total_vegetation_area")}/>
                                            { errors.total_vegetation_area && touched.total_vegetation_area && (<small className="form-text text-danger">{errors.total_vegetation_area}</small>)}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <label htmlFor="cultures">Cultura(s)</label>
                                            <Select
                                                id="cultures"
                                                isMulti={true}
                                                placeholder="Selecione..."
                                                defaultValue={values.cultures.map(culture => ({ value: culture.id, label: culture.name }))}
                                                options={cultures.map(culture => ({ value: culture.id, label: culture.name }))}
                                                onChange={values => {
                                                    setFieldValue("cultures", values.map(({ value }) => value))
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={onClose}>
                                    Fechar
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => handleSubmit()}>
                                    Cadastrar
                                </Button>
                            </Modal.Footer>
                        </>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default memo(FarmEditModal)
