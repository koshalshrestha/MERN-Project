import { InputField, SubmitBtn } from "@/components"
import { handleValidationError } from "@/lib"
import { useFormik } from "formik"
import { Container, Row, Col, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/store"
import http from "@/http"
import * as Yup from "yup"


export const Edit = () => {

    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: user.name,
            phone: user.phone,
            address: user.address
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            phone: Yup.string().required().max(30),
            address: Yup.string().required()
        }),
        onSubmit: (data, { setSubmitting}) => {
            http.put('/profile/update', data)
                .then( () => http.get('/profile/detail'))
                .then(({data}) => dispatch(setUser(data)))
                .catch(({response }) => handleValidationError(formik, response.data))
                .finally(() => setSubmitting(false))
        }

    })

    return <Container className="bg-white my-2 py-3 rounded-3 shadow">
            <Row>
                <Col>
                    <h1>Edit Profile</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} name="name" label="Name"/>
                        <InputField formik={formik} name="phone" label="Phone"/>
                        <InputField formik={formik} name="address" as="textarea" label="Address"/>

                        <div className="mt-3">
                            <SubmitBtn loading={formik.isSubmitting}  />
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
}