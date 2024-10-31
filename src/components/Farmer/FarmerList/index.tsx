import React, {memo, useState} from "react";
import {Button, Table} from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {enqueueSnackbar} from "notistack";
import {HttpError} from "../../../infra/Api";
import {useFarmer} from "../../../contexts/FarmerContext";
import FarmerCreateModal from "../FarmerCreateModal";
import {Farmer} from "../../../infra/Entities/farmer.entity.ts";
import FarmerEditModal from "../FarmerEditModal";

interface FarmerListProps {}

const FarmerList: React.FC<FarmerListProps> = ({}) => {

    const { farmer, farmers, fetchFarmers, setFarmer,
        createFarmer,
        updateFarmer,
        deleteFarmer
    } = useFarmer();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleCreateFarmer = (farmer: Farmer) => {
        createFarmer(farmer).then(() => {
            enqueueSnackbar({
                message: "Produtor cadastrado com sucesso",
                variant: "success"
            });
            setIsCreateModalOpen(false)
        }).catch((error: HttpError) => {
            enqueueSnackbar({ message: error.message, variant: "error" });
        }).finally(() => {
            fetchFarmers();
        });
    };

    const handleEditFarmer = (data: Farmer) => {
        updateFarmer(farmer!.id, data).then(() => {
            enqueueSnackbar({
                message: "Produtor atualizado com sucesso",
                variant: "success"
            });
            setIsEditModalOpen(false)
        }).catch((error: HttpError) => {
            enqueueSnackbar({ message: error.message, variant: "error" });
        }).finally(() => {
            fetchFarmers();
        });
    };

    const handleDeleteFarmer = ({ id }: Farmer) => {
        deleteFarmer(id).then(() => {
            enqueueSnackbar({
                message: "Produtor removido com sucesso",
                variant: "success"
            });
        }).catch((error: HttpError) => {
            enqueueSnackbar({ message: error.message, variant: "error" });
        }).finally(() => {
            fetchFarmers();
        });
    };

    return (
        <>
            <Table striped bordered responsive hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF/CNPJ</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                { farmers.map(farmer => (
                    <tr key={farmer.id}>
                        <td>{ farmer.name }</td>
                        <td>{ farmer.cpf_cnpj }</td>
                        <td>{ farmer.city }</td>
                        <td>{ farmer.state }</td>
                        <td>
                            <div className="d-flex justify-content-center gap-1">
                                <Button variant="primary" size="sm" onClick={() => {
                                    setFarmer(farmer);
                                    navigate(`/farmers/${farmer.id}`);
                                }}>
                                    <FaEye/> Visualizar </Button>
                                <Button variant="primary" size="sm" onClick={() => {
                                    setFarmer(farmer);
                                    setIsEditModalOpen(true);
                                }}>
                                    <FaEdit/> Editar</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteFarmer(farmer)}>
                                    <FaTrash/> Excluir</Button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
                <IoMdAdd/> Novo Produtor</Button>
            <FarmerCreateModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onConfirm={handleCreateFarmer} />

            { farmer && (
                <FarmerEditModal
                    farmer={farmer}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onConfirm={handleEditFarmer} />
            )}
        </>
    );
};

export default memo(FarmerList);
