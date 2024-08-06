import { InputField } from "@/components"
import { useFormik } from "formik"
import {Col, Row, Container, Form, Button } from "react-bootstrap"
import * as Yup from 'yup'
import { useState } from "react"

export const Login = () => {

    const [remember, setRemember] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required().email("Invalid email address"),
            password: Yup.string().required()
        }),
        onSubmit: (values) => {
            
        }
    })

    return  <Container className="">
    <Row className="vh-100 d-flex justify-content-center align-items-center" >
        <Col lg="4" className="bg-white my-2 py-3 rounded-3 mx-auto shadow" >
            <Row>
                <Col className="text-center">
                    <h1>Login</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit} >
                        <InputField formik= {formik} name="email" label="Email" type="email" />
                        <InputField formik= {formik} name="password" label="Password" type="password" />

                        <Form.Check className="mb-3">
                            <Form.Check.Input name="remember" id="remember" checked={remember} onChange={() => setRemember(!remember)} />
                            <Form.Check.Label htmlFor="remember">Remember me</Form.Check.Label>
                        </Form.Check>

                        <div className="mb-3 d-grid">
                            <Button type="submit" variant="dark" >
                                <i className="fa-solid fa-right-to-bracket me-2"></i> Log In
                                </Button>
                        </div>
            
                    </Form>
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}