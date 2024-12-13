import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { days, debtTypes, installmentTypes, interestTypes, months } from '../helpers/CommonData';

export default function DebtForm({ initialValues, onSubmit, mode }) {

    const validationSchema = Yup.object({
        debtType: Yup.string().required('Debt type is required'),
        creditor: Yup.string().required('Creditor name is required'),
        outstandingBalance: Yup.number()
            .required('Outstanding balance is required')
            .positive('Balance must be positive'),
        borrowingDate: Yup.date()
            .required('Borrowing date is required')
            .typeError('Borrowing date must be a valid date'),
        loanTenure: Yup.number().required('Loan Tenure is required.').positive('Loan Tenure must be positive.'),
        interestRate: Yup.number().required('Interest Rate is required.').positive('Interest Rate must be positive.'),
        interestType: Yup.string().required('Interest type is required.'),
        installmentType: Yup.string().required('Installment type is required.'),
        day: Yup.number()
            .nullable()
            .when('installmentType', (installmentType, schema) =>
                installmentType === '1'
                    ? schema.required('Day is required for a weekly due date.')
                    : schema
            ),
        date: Yup.number()
            .nullable()
            .when('installmentType', (installmentType, schema) =>
                installmentType === '2'
                    ? schema.required('Date is required for a monthly due date.')
                    : schema
            ),
        month: Yup.number()
            .nullable()
            .when('installmentType', (installmentType, schema) =>
                installmentType === '3'
                    ? schema.required('Month is required for a yearly due date.')
                    : schema
            ),
        minimumPayment: Yup.number()
            .required('Minimum payment is required.')
            .positive('Minimum payment must be positive.'),
        note: Yup.string().max(500, 'Note cannot exceed 500 characters.'),
    });



    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ setFieldValue, values }) => (
                <Form>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="debtType">Debt Type</label>
                            <Field
                                as="select"
                                name="debtType"
                                id="debtType"
                                className="form-select"
                            >
                                <option key={0} value={0}>Select</option>
                                {Array.from(debtTypes).map(([key, val]) => (
                                    <option key={key} value={key}>{val}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="debtType" component="div" className="text-danger" />
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="creditor">Creditor Name/Institution</label>
                            <Field
                                type="text"
                                name="creditor"
                                id="creditor"
                                className="form-control"
                            />
                            <ErrorMessage name="creditor" component="div" className="text-danger" />
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="outstandingBalance">Outstanding Balance</label>
                            <Field
                                type="number"
                                name="outstandingBalance"
                                id="outstandingBalance"
                                className="form-control"
                            />
                            <ErrorMessage name="outstandingBalance" component="div" className="text-danger" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="brrowingDate">Borrowing Date</label>
                            <Field
                                type='date'
                                name="borrowingDate"
                                id="brrowingDate"
                                className='form-control'
                            />
                            <ErrorMessage name='borrowingDate' component="div" className='text-danger' />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="loanTenure">Loan Tenure</label>
                            <Field
                                type='number'
                                name='loanTenure'
                                id='loanTenure'
                                className='form-control'
                                placeholder="Loan tenure in month"
                            />
                            <ErrorMessage name='loanTenure' component="div" className='text-danger' />
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label htmlFor="interestRate">Interest Rate</label>
                                    <Field
                                        type='number'
                                        id='interestRate'
                                        name='interestRate'
                                        className='form-control'
                                    />
                                    <ErrorMessage name='interestRate' component="div" className='text-danger' />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="interestType">Interest Type</label>
                                    <Field
                                        as='select'
                                        id='interestType'
                                        name='interestType'
                                        className='form-select'
                                    >
                                        <option key={0} value={0}>Select</option>
                                        {Array.from(interestTypes).map(([key, val]) => (
                                            <option key={key} value={key}>{val}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name='interestType' component="div" className='text-danger' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label htmlFor="installmentType">Installment Type</label>
                                    <Field
                                        as='select'
                                        id='installmentType'
                                        name='installmentType'
                                        className='form-select'
                                    >

                                        {Array.from(installmentTypes).map(([key, val]) => (
                                            <option key={key} value={key}>{val}</option>
                                        ))}

                                    </Field>
                                    <ErrorMessage name="installmentType" component="div" className="text-danger" />
                                </div>
                                <div className="col-sm-6">
                                    {(values.installmentType === '1' || values.installmentType === '' || initialValues.installmentType === 1) && (
                                        <div className="week">
                                            <label htmlFor="day">Day</label>
                                            <Field
                                                as="select"
                                                className="form-select"
                                                name="day"
                                                id="day"
                                            >
                                                <option value={0}>Select</option>
                                                {Object.entries(days).map(([key, val]) => (
                                                    <option key={key} value={key}>{val}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="day" component="div" className="text-danger" />
                                        </div>
                                    )}

                                    {(values.installmentType === '2' || initialValues.installmentType === 2) && (
                                        <div className="date">
                                            <label htmlFor="date">Date</label>
                                            <Field
                                                as="select"
                                                className="form-select"
                                                name="date"
                                                id="date"
                                            >
                                                <option value={0}>Select</option>
                                                {Array.from({ length: 31 }, (_, i) => (
                                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="date" component="div" className="text-danger" />
                                        </div>
                                    )}

                                    {(values.installmentType === '3' || initialValues.installmentType === 3) && (
                                        <div className="month">
                                            <label htmlFor="month">Month</label>
                                            <Field
                                                as="select"
                                                className="form-select"
                                                name="month"
                                                id="month"
                                            >
                                                <option value={0}>Select</option>
                                                {Object.entries(months).map(([key, val]) => (
                                                    <option key={key} value={key}>{val}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="month" component="div" className="text-danger" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="minimumPayment">Minimum Payment</label>
                            <Field
                                type='number'
                                name='minimumPayment'
                                id='minimumPayment'
                                className='form-control'
                            />
                            <ErrorMessage name="minimumPayment" component="div" className="text-danger" />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="note">Note</label>
                            <Field
                                as='textarea'
                                rows='1'
                                name='note'
                                id='note'
                                className='form-control'
                            />
                            <ErrorMessage name="note" component="div" className="text-danger" />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">{mode === 'create' ? "Create" : "Update"}Debt</button>
                </Form>
            )}
        </Formik>
    );
}
