import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { debtTypes, installmentTypes } from "../helpers/CommonData";


export default function FilterForm({onSubmit,initialValues}){

    const validationSchema = Yup.object({

    })


    return(
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({setFieldValue, values})=>(
                    <Form>
                        <div className="row">
                            <div className="col-md-3">
                                <label htmlFor="borrowingDate">Borrowing Date</label>
                                <Field
                                    as='select'
                                    name='borrowingDate'
                                    id='borrowingDate'
                                    className='form-select'
                                >   
                                    <option key={0} value={0}>Select</option>
                                    <option key={1} value={1}>Asending</option>
                                    <option key={2} value={2}>Desending</option>

                                </Field>
                                <ErrorMessage name='borrowingDate' component='div' className="text-danger"/>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="creditor">Creditor</label>
                                <Field
                                    type='text'
                                    id='creditor'
                                    name='creditor'
                                    className='form-control'
                                />
                                <ErrorMessage name='creditor' component='div' className="text-danger"/>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="debtType">Debt Type</label>
                                <Field
                                    as='select'
                                    name='debtType'
                                    id='debtType'
                                    className='form-select'
                                >   
                                    <option key={0} value={0}>Select</option>
                                    {Array.from(debtTypes).map(([key,val])=>(
                                        <option key={key} value={key}>{val}</option>
                                    ))}

                                </Field>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="installmentType">Installment Type</label>
                                <Field
                                    as='select'
                                    name='installmentType'
                                    id='installmentType'
                                    className='form-select'
                                >   
                                    <option key={0} value={0}>Select</option>
                                    {Array.from(installmentTypes).map(([key,val])=>(
                                        <option key={key} value={key}>{val}</option>
                                    ))}

                                </Field>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Search</button>
                    </Form>
                )}
            </Formik>
        </>
    )

}