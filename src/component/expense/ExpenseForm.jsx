import { FieldArray, Form, Formik } from "formik";
import * as Yup from 'yup';

const ExpenseForm = ({initialValues,onSubmit,mode})=> {

    const validationSchema = Yup.object({
        date: Yup.date().required('Date is Required'),
        expenses: Yup.array().of(
            Yup.object({
                amount: Yup.number().required('Amount is required'),
                expenseOn: Yup.string().required('Expense on is required')
            })
        )
    });

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.date}
                                />
                                {errors.date && touched.date ? (
                                    <div className="text-danger">{errors.date}</div>
                                ) : null}
                            </div>
                            <div className="col-md-8 d-flex align-items-end flex-row-reverse">
                                <button
                                    type="button"
                                    className="btn btn-primary mt-1"
                                    onClick={() => setFieldValue('expenses', [...values.expenses, { amount: '', expenseOn: '' }])}
                                >
                                    Add More
                                </button>
                            </div>
                        </div>

                        <FieldArray name="expenses">
                            {({ remove }) => (
                                <div className="expenseItem">
                                    {values.expenses.map((expense, index) => (
                                        <div className="row mb-3" key={index}>
                                            <div className="col-md-4">
                                                <label className="form-label">Amount</label>
                                                <input
                                                    type="number"
                                                    name={`expenses[${index}].amount`}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={expense.amount}
                                                    className="form-control"
                                                />
                                                {errors.expenses?.[index]?.amount && touched.expenses?.[index]?.amount ? (
                                                    <div className="text-danger">{errors.expenses[index].amount}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label">Expense on</label>
                                                <input
                                                    type="text"
                                                    name={`expenses[${index}].expenseOn`}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={expense.expenseOn}
                                                    className="form-control"
                                                />
                                                {errors.expenses?.[index]?.expenseOn && touched.expenses?.[index]?.expenseOn ? (
                                                    <div className="text-danger">{errors.expenses[index].expenseOn}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-2  d-flex align-items-end">
                                                <button type="button" className="btn btn-danger align-middle" onClick={() => remove(index)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FieldArray>

                        <div className="row mb-3">
                            <div className="col-md-12">
                                <label htmlFor="note" className="form-label">Note</label>
                                <textarea
                                    id="note"
                                    name="note"
                                    rows="2"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.note}
                                ></textarea>
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-success">{mode==='create' ? "Create" : "Update" } Expense</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )

}
export default ExpenseForm;