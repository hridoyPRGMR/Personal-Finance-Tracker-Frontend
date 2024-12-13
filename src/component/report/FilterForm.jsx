import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { months } from '../helpers/CommonData';
import { useEffect, useState } from 'react';
import Api from '../../api/Api';

export default function FilterForm({onSubmit, initialValues}) {

    const [incomeSources, setIncomeSources] = useState([]);

    const validationSchema = Yup.object({

    })

    useEffect(() => {
        getIncomeSources();
    }, []);

    const getIncomeSources = () => {
        Api.get("/income-sources/filter")
            .then(response => {
                setIncomeSources(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ setFieledValue, values }) => (
                    <Form>
                        <div className="row">
                            <div className="col-md-3">
                                <label htmlFor="year">Year</label>
                                <Field
                                    type='number'
                                    name='year'
                                    className='form-control'
                                    id='year'
                                />
                                <ErrorMessage name='year' component='div' className="text-danger" />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="incomeSource">Income Source</label>
                                <Field
                                    as='select'
                                    name='incomeSource'
                                    className='form-select'
                                    id='incomeSource'
                                >
                                    <option value={0} key={0}>Select</option>
                                    {incomeSources.map(incomeSource => (
                                        <option value={incomeSource.id} key={incomeSource.id}>{incomeSource.incomeSource}</option>
                                    ))}
                                </Field>
                            </div>
                            <div className="col-md-3 mt-2">
                                <button type="submit" className="btn btn-primary mt-3">Apply</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

        </>
    )

}
