import React, { useEffect, useState } from 'react';
import './Income.css';
import Breadcrumbs from '../Breadcrumbs'
import Pagination from '../Pagination'
import CustomeAlert from '../helpers/CustomeAlert';
import { useAuth } from '../../security/AuthContext';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Api from '../../api/Api';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';

export default function IncomeSources(){


    const authContext = useAuth();

    const [alert, setAlert] = useState({ message: '', severity: '' });
    // Function to close the alert manually or after timeout
    const handleAlertClose = () => {
        setAlert({ message: '', severity: '' });
    };

    const [icomeSourceData, setIcomeSourceData] = useState([]);
    const [triggerFetch, setTriggerFetch] = useState(false);

    useEffect(() => {
        Api.get('/income-sources')
            .then(response => {
                setIcomeSourceData(response);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [triggerFetch]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 4;

    //calculate total page
    const totalPages = Math.ceil(icomeSourceData.length / itemPerPage);

    //get current page data
    const indexofLastItem = currentPage * itemPerPage;
    const indexofFirstItem = indexofLastItem - itemPerPage;
    const currentItems = icomeSourceData.slice(indexofFirstItem, indexofLastItem);

    //handle page chnage
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleLogout = async (e) => {
        e.preventDefault();

        await authContext.logout();
    }

    const [incomeType, setIncomeType] = useState('');
    const [incomeSource, setIncomeSource] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const validationErrors = {};
        if (!incomeType) validationErrors.incomeType = 'Income Type is required'
        if (!incomeSource) validationErrors.incomeSource = 'Income Source is required'

        return validationErrors;
    }

    const [alertProps, setAlertProps] = useState({ message: '', severity: 'success' });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const data = {
            income_type: incomeType,
            income_source: incomeSource,
            description: description,
        };

        Api.post('/income-sources', data)
            .then(response => {
                setIncomeType('');
                setIncomeSource('');
                setDescription('');
                setAlert({ message: 'Income Source saved successfully!', severity: 'success', duration: 3000 })
                setTriggerFetch(!triggerFetch);
            })
            .catch(error => {
                setAlert({ message: 'An error occurred while saving the income source.', severity: 'error', duration: 3000 });
                setErrors({ global: 'An error occurred while saving the income source.' });
            })
    }

    const [selectedIncomeSource, setSelectedIncomeSource] = useState(null);

    const handleView = (id) => {

        Api.get(`/income-sources/${id}`)
            .then(response => {
                setSelectedIncomeSource(response)
                setAlert({ message: 'Income Source fetch successfully!', severity: 'success', duration: 3000 })
            })
            .catch(error => {
                setAlert({ message: 'An error occurred while fetching the income source.', severity: 'error', duration: 3000 });
            })
    }


    //for edit
    const [editModal, showEditModal] = useState(false);
    const [editItem, setEditItem] = useState(null);


    const handleEditModal = (item) => {
        setEditItem(item);
        showEditModal(!editModal);
    }

    const editModalClose = () => {
        showEditModal(!editModal);
    }

    const handleEditSubmission = () => {
        Api.put('/income-sources', editItem)
            .then(response => {
                showEditModal(!editModal);
                setTriggerFetch(!triggerFetch);
                setAlert({ message: `Income Source Updated successfully! Id:${editItem.id}`, severity: 'success', duration: 3000 })
            })
            .catch(error => {
                setAlert({ message: `An error occurred while updating the income source. Id:${editItem.id}`, severity: 'error', duration: 3000 });
            })
    }

    const handleDelete = (id) => {

        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        if (isConfirmed) {
            Api.delete(`/income-sources/${id}`)
                .then(response => {
                    setTriggerFetch(!triggerFetch);
                    setAlert({ message: `Income Source Deleted successfully! Id:${id}`, severity: 'success', duration: 3000 })
                })
                .catch(error => {
                    setAlert({ message: `An error occurred while deleting the income source. Id:${id}`, severity: 'error', duration: 3000 });
                })
        }

    }

    return (
        <div className="">
            <div className="">
                <div className="row gx-5">
                    <CustomeAlert
                        message={alert.message}
                        severity={alert.severity}
                        duration={alert.duration}
                        onClose={handleAlertClose}
                    />
                    {/* Income Sources Section */}
                    <div className="col-12 col-lg-6">
                        <div className="row justify-content-between align-items-center my-3">
                            <div className="col-12 col-md-8">
                                <h3 className="fw-bold text-dark">Income Sources</h3>
                            </div>
                        </div>

                        <div className="table-responsive shadow-sm rounded">
                            <table className="table table-hover table-striped">
                                <thead className="table-dark">
                                    <tr className='text-center'>
                                        <th>Sl. No.</th>
                                        <th>Income Type</th>
                                        <th>Source</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item) => (
                                        <tr key={item.id} className='text-center'>
                                            <td>{item['id']}</td>
                                            <td>{item['incomeType']}</td>
                                            <td>{item['incomeSource']}</td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <div>
                                                        <button onClick={() => handleView(item['id'])}
                                                            type='button' className='btn btn-outline p-0 m-0'>
                                                            <VisibilityIcon />
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => handleEditModal(item)}
                                                            type='button' className='btn btn-outline p-0 m-0 mx-2'>
                                                            <EditIcon />
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => handleDelete(item['id'])}
                                                            type='button' className='btn btn-outline p-0 m-0'>
                                                            <DeleteIcon />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* edit modal */}


                            <div>
                                <Modal show={editModal} onHide={editModalClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modal heading</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group>
                                            <Form.Label>Income Type</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={editItem?.income_type ?? ''}
                                                onChange={(e) => setEditItem({ ...editItem, income_type: e.target.value })}  // Update state on change
                                            />
                                            {/* Display validation error if any */}
                                            {errors.incomeType && <span style={{ color: 'red' }}>{errors.incomeType}</span>}
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Income Source</Form.Label>
                                            <Form.Control type="text"
                                                value={editItem?.income_source ?? ''}
                                                onChange={(e) => setEditItem({ ...editItem, income_source: e.target.value })}
                                            />
                                            {errors.incomeSource && <span style={{ color: 'red' }}>{errors.incomeSource}</span>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={2}
                                                value={editItem?.description ?? ''}
                                                onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={editModalClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleEditSubmission}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>

                        </div>

                        {/* Pagination */}
                        <div className="row mt-2">
                            <Pagination
                                currentPage={currentPage}
                                totalPage={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>

                    {/* Create Income Sources Section */}
                    <div className="col-12 col-lg-6">
                        <div className="row d-flex justify-content-start pt-4 mb-2">
                            <h3 className="fw-bold text-dark">Create Income Sources</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="form">
                            <div className="row mb-3">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="" className="form-label">Income Type</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={incomeType}
                                        onChange={(e) => setIncomeType(e.target.value)}
                                    />
                                    {errors.incomeType && <span style={{ color: 'red' }}>{errors.incomeType}</span>}
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="" className="form-label">Income Source</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={incomeSource}
                                        onChange={(e) => setIncomeSource(e.target.value)}
                                    />
                                    {errors.incomeSource && <span style={{ color: 'red' }}>{errors.incomeSource}</span>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <label htmlFor="" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows={2}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-md btn-outline-secondary">
                                Save Income Source
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row gx-5 pt-2">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                View
                            </div>
                            <div className="card-body">
                                {selectedIncomeSource ? (
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h5>Income Type</h5>
                                            <hr />
                                            <p>{selectedIncomeSource.income_type}</p>
                                        </div>
                                        <div className="col-md-3">
                                            <h5>Income Source</h5>
                                            <hr />
                                            <p>{selectedIncomeSource.income_source}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Description</h5>
                                            <hr />
                                            <p>{selectedIncomeSource.description}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p>No data selected</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}