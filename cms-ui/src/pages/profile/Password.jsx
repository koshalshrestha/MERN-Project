import { InputField, SubmitBtn } from "@/components"
import { handleValidationError } from "@/lib"
import { useFormik } from "formik"
import { Container, Row, Col, Form } from "react-bootstrap"
import { setUser } from "@/store"
import http from "@/http"
import * as Yup from "yup"
import YupPassword from "yup-password"

YupPassword(Yup)

export const Password = () => {

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required(),
            newPassword: Yup.string().required().minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1).min(8),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('newPassword')], 'Should match with new password')
        }),
        onSubmit: (data, { setSubmitting}) => {
            http.patch('/profile/password', data)
                .then( () => {})
                .catch(({response }) => handleValidationError(formik, response.data))
                .finally(() => setSubmitting(false))
        }

    })

    return <Container className="bg-white my-2 py-3 rounded-3 shadow">
            <Row>
                <Col>
                    <h1>Change Password</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} type="password" name="oldPassword" label="Old Password"/>
                        <InputField formik={formik} type="password" name="newPassword" label="New Password"/>
                        <InputField formik={formik} type="password" name="confirmPassword" label="Confirm Password"/>

                        <div className="mt-3">
                            <SubmitBtn loading={formik.isSubmitting}  />
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
}