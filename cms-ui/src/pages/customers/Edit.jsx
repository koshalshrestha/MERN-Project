import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import http from "@/http"
import { handleValidationError } from "@/lib"
import { Container, Row, Col, Form } from "react-bootstrap"
import { InputField, SubmitBtn, SelectField, Loading } from "@/components"
import { useEffect, useState } from "react"


export const Edit = () => {
    const [customer, setCustomer] = useState({})
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            phone:'',
            address: '',
            status: true
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            phone: Yup.string().required().max(30),
            address: Yup.string().required(),
            status: Yup.boolean().required()
        }),
        onSubmit: (data, { setSubmitting}) => {
            http.put(`/cms/customers/${params.id}`, data)
                .then( () => navigate('/customers'))
                .catch(({response }) => handleValidationError(formik, response.data))
                .finally(() => setSubmitting(false))
        }


    })

    useEffect( () => {
        setLoading(true)
        http.get(`/cms/customers/${params.id}`)
            .then(({data}) => setCustomer(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    useEffect( () => {
        formik.setValues({
            name: customer?.name,
            phone: customer?.phone,
            address: customer?.address,
            status: customer?.status
        })
    }, [customer])

    return <Container className="bg-white my-2 py-3 rounded-3 shadow">
            {loading ? <Loading /> : <>
                <Row>
                <Col>
                    <h1>Edit Customer</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} name="name" label="Name"/>
                        <InputField formik={formik} name="phone" label="Phone"/>
                        <InputField formik={formik} name="address" as="textarea" label="Address"/>

                        <SelectField formik={formik} name= "status" label="Status" options={{'Active': true, 'Inactive': false}} 
                        onChange={({target}) => formik.setFieldValue('status', target.value == 'true')} />

                        <div className="mt-3">
                            <SubmitBtn loading={formik.isSubmitting}  />
                        </div>
                    </Form>
                </Col>
            </Row>
            </>}
        </Container>
}
