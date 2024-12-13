import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup';
import { months } from "../helpers/CommonData"

export default function ExpenseFilter({ onSubmit, initialValues }) {

    const validationSchema = Yup.object({

    })


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ setFieldValue, values }) => (
                <Form>
                    <div className="row">
                        <div className="col-md-3">
                            <label htmlFor="">Filter By</label>
                            <Field
                                as='select'
                                className='form-select'
                                id='filterby'
                                name='filterby'
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setFieldValue("filterby", value);

                                    if (value === "1") {
                                        setFieldValue("month", new Date().getMonth() + 1);
                                    } else if (value === "2") {
                                        setFieldValue("month", '');
                                        setFieldValue("year", new Date().getFullYear());
                                    }
                                }}
                            >
                                <option key={1} value={1}>Month</option>
                                <option key={2} value={2}>Year</option>
                            </Field>
                        </div>
                        {values.filterby === "1" &&
                            <div className="col-md-3">
                                <label htmlFor="month">Month</label>
                                <Field
                                    as='select'
                                    name='month'
                                    className='form-select'
                                    id='month'
                                >
                                    {Array.from(months).map(([key, val]) => (
                                        <option key={key} value={key}>{val}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name='month' component='div' className="text-danger" />
                            </div>
                        }

                        <div className="col-md-3">
                            <label htmlFor="year">Year</label>
                            <Field
                                type='number'
                                className='form-control'
                                name='year'
                                id='year'
                            />
                            <ErrorMessage name='year' component='div' className="text-danger" />
                        </div>

                        <div className="col-md-3 mt-2">
                            <button type="submit" className="btn btn-primary mt-3">Apply</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}