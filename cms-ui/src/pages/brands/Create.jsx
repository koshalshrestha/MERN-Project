import { useFormik } from "formik"
import http from "@/http"
import { useNavigate } from "react-router-dom"
import { handleValidationError } from "@/lib"
import * as Yup from "yup"
import { Container, Row, Col, Form } from "react-bootstrap"
import { InputField, SelectField, SubmitBtn } from "@/components"


export const Create = () => {

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
        onSubmit: (data,{setSubmitting}) => {
            http.post('/cms/brands', data)
                .then(() => navigate('/brands'))
                .then((data) => dispatch(setUser(data)))
                .catch((response) => {handleValidationError(formik, response.data)})
                .finally(() => {setSubmitting(false)})
        }
    })

    return <Container className="bg-white my-2 py-3 shadow rounded-3  " >
        <Row>
            <Col>
                <h1> Add Brand</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form onSubmit={formik.handleSubmit} >
                    <InputField formik={formik} name='name' label='Name' />
                    <SelectField formik={formik} name='status' label='Status' options ={{'Active' : true, 'Inactive': false}}
                        onChange={({target}) => {
                            formik.setFieldValue('status', target.value == 'true')
                        } } 
                    />
                    <div className="mt-3">
                        <SubmitBtn loading={formik.isSubmitting}  />
                    </div>

                </Form>
            </Col>
        </Row>
    </Container>

 }