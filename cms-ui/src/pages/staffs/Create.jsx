import { Container, Row, Col, Form } from "react-bootstrap"
import { InputField, SelectField, SubmitBtn } from "@/components"
import { useFormik } from "formik"
import { setUser } from "@/store"
import { handleValidationError } from "@/lib"
import http from "@/http"
import * as Yup from "yup"
import YupPassword from "yup-password"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

YupPassword(Yup)

export const Create = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: ' ',
            email: ' ',
            password: ' ',
            confirmPassword: ' ',
            phone: ' ',
            address: ' ',
            status: true
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1).min(8),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('password')], 'Should match with password'),
            phone: Yup.string().required().max(30),
            address: Yup.string().required(),
            status: Yup.boolean().required()
        }),
        onSubmit: (data, { setSubmitting}) => {
            http.post('/cms/staffs', data)
                .then( () => navigate('/staffs'))
                .then(({data}) => dispatch(setUser(data)))
                .catch(({response }) => handleValidationError(formik, response.data))
                .finally(() => setSubmitting(false))
        }

    })

    return <Container className="bg-white my-2 py-3 rounded-3 shadow">
            <Row>
                <Col>
                    <h1>Add Staff</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} name="name" label="Name" />
                        <InputField formik={formik} name="email" label="Email" type="email" />
                        <InputField formik={formik} name="password" label="Password" type="password" />
                        <InputField formik={formik} name="confirmPassword" label="Confirm Password" type="password" />
                        <InputField formik={formik} name="phone" label="Phone" />
                        <InputField formik={formik} name="address" label="Address" as='textarea' />

                        <SelectField formik={formik} name= "status" label="Status" options={{'Active': true, 'Inactive': false}} 
                        onChange={({target}) => formik.setFieldValue('status', target.value == 'true')} />

                        <div className="mt-3">
                            <SubmitBtn loading={formik.isSubmitting}  />
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>

}