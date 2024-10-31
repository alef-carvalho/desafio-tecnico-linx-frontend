import React, {memo, useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {HttpError} from "../../../infra/Api";
import {Link, useNavigate} from "react-router-dom";
import {IoMdAdd, IoMdArrowBack} from "react-icons/io";
import {enqueueSnackbar} from "notistack";
import {useFarmer} from "../../../contexts/FarmerContext";
import {useFarms} from "../../../contexts/FarmContext";
import {FaEdit, FaTrash} from "react-icons/fa";
import {Farm} from "../../../infra/Entities/farm.entity.ts";
import FarmCreateModal from "../FarmCreateModal";
import FarmEditModal from "../FarmEditModal";

interface FarmListProps {}

const FarmList: React.FC<FarmListProps> = ({}) => {

    const { farmer } = useFarmer();
    const {
        farm,
        farms,
        setFarm,
        getFarms,
        createFarm,
        updateFarm,
        deleteFarm
    } = useFarms();

    const [ isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [ isEditModalOpen, setIsEditModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!farmer) navigate("/");
    }, [farmer]);


    const handleCreateFarm = (farm: Farm) => {
        createFarm(farm).then(() => {
            enqueueSnackbar({
                message: "Propriedade cadastrada com sucesso",
                variant: "success"
            });
            setIsCreateModalOpen(false)
        }).catch((error: HttpError) => {
            enqueueSnackbar({ message: error.message, variant: "error" });
        }).finally(() => {
            getFarms();
        });
    };

    const handleEditFarm = async (data: Farm) => {
        updateFarm(farm!.id, data).then(() => {
            enqueueSnackbar({
                message: "Propriedade atualizada com sucesso",
                variant: "success"
            });
            setIsEditModalOpen(false)
        }).catch((error: HttpError) => {
            enqueueSnackbar({ message: error.message, variant: "error" });
        }).finally(() => {
            getFarms();
        });
    };

    const handleDeleteFarm = ({ id }: Farm) => {
        deleteFarm(id).then(() => {
            enqueueSnackbar({ message: "Propriedade removida com sucesso", variant: "success" });
        }).catch((error: HttpError) => {
            enqueueSnackbar({ message: error.message, variant: "error" });
        }).finally(() => {
            getFarms();
        });
    };

    const renderFarms = () => {

        if (farms.length > 0) {
            return farms.map(farm => (
                <tr key={farm.id}>
                    <td>{ farm.name }</td>
                    <td>{ farm.total_area }Ha</td>
                    <td>{ farm.total_agriculture_area }Ha</td>
                    <td>{ farm.total_vegetation_area }Ha</td>
                    <td>
                        <ul>
                            { farm.cultures?.map(culture => (
                                <li key={culture.id}>{ culture.name }</li>
                            ))}
                        </ul>
                    </td>
                    <td>
                        <div className="d-flex justify-content-center gap-1">
                            <Button variant="primary" size="sm" onClick={() => {
                                setFarm(farm);
                                setIsEditModalOpen(true);
                            }}>
                                <FaEdit/> Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteFarm(farm)}>
                                <FaTrash/> Excluir</Button>
                        </div>
                    </td>
                </tr>
            ));
        }

        return (
            <>
                <tr>
                    <td colSpan={5} style={{textAlign: "center"}}>Nenhuma cobrança encontrada.</td>
                </tr>
            </>
        )
    };

    return (
        <>
            <Table striped bordered responsive hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Área Total</th>
                        <th>Área Agricultável</th>
                        <th>Área de Vegetação</th>
                        <th>Culturas</th>
                        <th style={{ width: "120px", textAlign: "center"}}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                { renderFarms() }
                </tbody>
            </Table>
            <div className="d-flex justify-content-between">
                <Link className="btn btn-light" to="/">
                    <IoMdArrowBack/> Voltar
                </Link>
                <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
                    <IoMdAdd/> Nova Propriedade</Button>
            </div>
            <FarmCreateModal
                isOpen={isCreateModalOpen}
                onConfirm={handleCreateFarm}
                onClose={() => setIsCreateModalOpen(false)}/>

            { farmer && farm && (
                <FarmEditModal
                    farm={farm}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onConfirm={handleEditFarm} />
            )}
        </>
    );
};

export default memo(FarmList);
