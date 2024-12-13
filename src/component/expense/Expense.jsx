import { FieldArray, Formik, Form } from "formik";
import * as Yup from 'yup';
import Breadcrumbs from "../Breadcrumbs";
import Api from "../../api/Api";
import './expense.css';
import CustomeAlert from '../helpers/CustomeAlert';
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from "../helpers/Pagination";
import { Button, Card, ListGroup, Modal, Table } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";

export default function Expense() {

    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ message: '', severity: '' });
    const handleAlertClose = () => {
        setAlert({ message: '', severity: '' });
    };

    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [size] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    const [expenses, setExpenses] = useState([]);

    //modal
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [expense, setExpense] = useState(null);

    // Fetch expenses when page or size changes
    useEffect(() => {
        getExpenses(currentPage);
    }, [currentPage, size]);


    //create expense
    const initialValues = {
        expenses: [{ amount: '', expenseOn: '' }],
        date: '',
        note: '',
    };

    const onSubmit = (values, { resetForm }) => {
        Api.post("/expense", values)
            .then(response => {
                resetForm();
                setAlert({ message: 'Expense saved successfully!', severity: 'success', duration: 3000 });
            })
            .catch(error => {
                console.log(error);
                setErrors({ global: 'An error occurred while saving the expense' });
            })
    };

    //edit expense
    const editInitialValues = expense;

    const onEdit = (values) => {
        Api.put('/expense', values)
            .then(response => {
                setAlert({ message: 'Expense Updated successfully!', severity: 'success', duration: 3000 });
            })
            .catch(error => {
                console.log(error);
                setErrors({ global: 'An error occurred while  the expense' });
            })

    }

    const getExpenses = (page = 1) => {
        const pageIndex = page - 1;

        Api.get(`/expense?page=${pageIndex}&size=${size}`)
            .then(response => {
                setExpenses(response.content);
                setTotalPages(response.totalPages);
                setCurrentPage(page);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleView = (data) => {
        setShowModal(!showModal);
        setExpense(data);
    };

    const handleEditModal = (data) => {
        setShowEditModal(!showEditModal);
        setExpense(data);
    };

    const handleDelete = (id) => {

        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        if (isConfirmed) {
            Api.delete(`/expense/${id}`)
                .then(response => {
                    setAlert({ message: 'Expense Deleted successfully!', severity: 'success', duration: 3000 });
                })
                .catch(error => {
                    console.log(error);
                    setErrors({ global: 'An error occurred while Deleted the expense' });
                })
        }

    };


    //modal
    const handleClose = () => {
        setShowModal(false);
    }

    const handleEditModalClose = () => {
        setShowEditModal(false);
    }


    return (
        <div className="Expense">
            <div className="row p-3">
                <CustomeAlert
                    message={alert.message}
                    severity={alert.severity}
                    duration={alert.duration}
                    onClose={handleAlertClose}
                />
                <div className="col-md-6 p-2">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Expense</h4>
                        </div>
                        <div className="card-body">
                            <ExpenseForm
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                                mode="create"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 p-2">
                    <div className="card">
                        <div className="card-header">
                            <h4> Expenses</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-hover">
                                <thead>
                                    <tr className="text-center ">
                                        <th scope="col">#</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.map(item => (
                                        <tr key={item.id} className="text-center align-middle">
                                            <td>{item.id}</td>
                                            <td>{item.date}</td>
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
                            </table>
                            <div className="d-flex justify-content-end">
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* view modal */}

            <Modal
                size="lg"
                show={showModal} onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title>Expense: {expense && expense.date}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        <ListGroup.Item>Note: {expense && expense.note}</ListGroup.Item>
                        <ListGroup.Item>
                            Expense Item:
                            <br />
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Amount</th>
                                        <th>Expense On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expense &&
                                        expense.expenses.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.expenseOn}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button varient="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* edit modal */}

            <Modal
                size="lg"
                show={showEditModal} onHide={handleEditModalClose}
            >
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <ExpenseForm
                                initialValues={editInitialValues}
                                onSubmit={onEdit}
                                mode="update"
                            />
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button varient="secondary" onClick={handleEditModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
