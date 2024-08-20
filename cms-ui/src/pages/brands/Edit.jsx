import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import http from "@/http"
import { handleValidationError } from "@/lib"
import { Container, Row, Col, Form } from "react-bootstrap"
import { InputField, SubmitBtn, SelectField, Loading } from "@/components"
import { useEffect, useState } from "react"


export const Edit = () => {
    const [brand, setBrand] = useState({})
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            status: true
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            status: Yup.boolean().required()
        }),
        onSubmit: (data, { setSubmitting}) => {
            http.put(`/cms/brands/${params.id}`, data)
                .then( () => navigate('/brands'))
                .catch(({response }) => handleValidationError(formik, response.data))
                .finally(() => setSubmitting(false))
        }


    })

    useEffect( () => {
        setLoading(true)
        http.get(`/cms/brands/${params.id}`)
            .then(({data}) => setBrand(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    useEffect( () => {
        formik.setValues({
            name: brand?.name,
            status: brand?.status
        })
    }, [brand])

    return <Container className="bg-white my-2 py-3 rounded-3 shadow">
            {loading ? <Loading /> : <>
                <Row>
                <Col>
                    <h1>Edit Brand</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} name="name" label="Name"/>

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
