import { useEffect, useState } from "react";
import { Accordion, Button, Card, ListGroup, ListGroupItem, Modal, Table } from "react-bootstrap";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomeAlert from '../helpers/CustomeAlert';
import Api from "../../api/Api";
import { days, debtTypes, installmentTypes, months } from "../helpers/CommonData";
import Pagination from "../helpers/Pagination";
import DebtForm from "./DebtForm";
import FilterForm from "./FilterForm";

export default function DebtList() {

    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ message: '', severity: '' });
    const handleAlertClose = () => {
        setAlert({ message: '', severity: '' });
    };
    
    const [debts, setDebts] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [show, setShow] = useState(false);
    const [viewModal, setViewModal] = useState(false)
    const [initialValues, setInitialValues] = useState({});
    const [trigger,setTrigger] = useState(false);

    useEffect(() => {
        getDebts();
    }, [size,trigger])

    const filteriInitialValues = {
        borrowingDate:'',
        creditor:'',
        debtType:'',
        installmentType:''
    }

    const handleEditSubmit = (values) =>{
        Api.put("/debt",values)
            .then(response=>{
                setAlert({ message: 'Debt Updated successfully!', severity: 'success', duration: 3000 });
                setShow(false);
                setTrigger(!trigger);
            })
            .catch(error=>{
                console.log(error);
            })
    }

    const onSubmit = (values) => {
        Api.post("/debt/filter",{ ...values, page: 0, size: 10 })
            .then(response=>{
                setDebts(response.content);
            })
            .catch(error=>{
                console.log(error);
            })
    }

    const getDebts = (page = 1) => {
        const pageIndex = page - 1;

        Api.get(`/debt?page=${pageIndex}&size=${size}`)
            .then(response => {
                setDebts(response.content);
                setTotalPages(response.totalPages);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleView = (values) => {
        setViewModal(!viewModal);
        setInitialValues(values);
    }

    const handleEditModal = (values) => {
        setShow(!show);
        const updatedValues = { ...values };
        delete updatedValues.user;
        setInitialValues(updatedValues);
    };

    const handleDelete = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        if (isConfirmed) {
            Api.delete(`/debt/${id}`)
                .then(response => {
                    setAlert({ message: 'Debt Deleted successfully!', severity: 'success', duration: 3000 });
                })
                .catch(error => {
                    console.log(error);
                    setErrors({ global: 'An error occurred while Deleted the Debt' });
                })
        }
    }

    const handleClose = () => {
        setShow(!show);
    }

    const handleViewClose = () => {
        setViewModal(false);
    }

    return (
        <>
            <CustomeAlert
                message={alert.message}
                severity={alert.severity}
                duration={alert.duration}
                onClose={handleAlertClose}
            />
            <Card>
                <Card.Body>
                    <Accordion defaultActiveKey={['0']} className="mb-2">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Filter</Accordion.Header>
                            <Accordion.Body>
                                <FilterForm
                                    onSubmit={onSubmit}
                                    initialValues={filteriInitialValues}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center ">
                                <th>#</th>
                                <th>Borrowing Date</th>
                                <th>Creditor</th>
                                <th>Debt Type</th>
                                <th>Installment Day</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {debts.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.borrowingDate}</td>
                                    <td>{item.creditor}</td>
                                    <td>{debtTypes.get(item.debtType)}</td>
                                    <td>
                                        {(() => {
                                            switch (item.installmentType) {
                                                case 1:
                                                    return days.get(item.day);
                                                case 2:
                                                    return item.date;
                                                case 3:
                                                    return months.get(item.month);
                                                default:
                                                    return null;
                                            }
                                        })()}
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <button
                                                className="btn btn-outline-secondary me-2"
                                                onClick={() => handleView(item)}
                                            >
                                                <VisibilityIcon />
                                            </button>
                                            <button
                                                className="btn btn-outline-secondary me-2"
                                                onClick={() => handleEditModal(item)}
                                            >
                                                <EditIcon />
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </Card.Body>
            </Card>

            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    <DebtForm
                        initialValues={initialValues}
                        onSubmit={handleEditSubmit}
                        mode="update"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button varient="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal size="xl" show={viewModal} onHide={handleViewClose}>
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    <ListGroup variant="flush">
                        <ListGroupItem>Id : {initialValues.id}</ListGroupItem>
                        <ListGroupItem>Borrowing Date: {initialValues.borrowingDate}</ListGroupItem>
                        <ListGroupItem>Creditor: {initialValues.creditor}</ListGroupItem>
                        <ListGroupItem>Debt Type: {debtTypes.get(initialValues.debtType)}</ListGroupItem>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button varient="secondary" onClick={handleViewClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}