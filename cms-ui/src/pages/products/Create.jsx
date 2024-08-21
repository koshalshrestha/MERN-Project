import { Container, Row, Col, Form } from "react-bootstrap"
import { InputField, Loading, SelectField, SubmitBtn } from "@/components"
import { useFormik } from "formik"
import { setUser } from "@/store"
import { handleValidationError } from "@/lib"
import http from "@/http"
import * as Yup from "yup"
import YupPassword from "yup-password"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"

YupPassword(Yup)

export const Create = () => {

    const [categories, setCategories] = useState([{}])
    const [brands, setBrands] = useState([{}])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: '',
            summary: '',
            description: '',
            price: '',
            discountedPrice: '0',
            categoryId: '',
            brandId: '',
            status: true,
            featured: false,
            images: []
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            summary: Yup.string().required(),
            description: Yup.string().nullable(),
            price: Yup.number().required(),
            discountedPrice: Yup.number().required(),
            categoryId: Yup.string().required(),
            brandId: Yup.string().required(),
            status: Yup.boolean().required(),
            featured: Yup.boolean().required(),


        }),
        onSubmit: (data, { setSubmitting}) => {
            http.post('/cms/products', data)
                .then( () => navigate('/products'))
                .then(({data}) => dispatch(setUser(data)))
                .catch(({response }) => handleValidationError(formik, response.data))
                .finally(() => setSubmitting(false))
        }

    })

    useEffect(() => {
        setLoading(true)
        Promise.all([
            http.get('/cms/categories'),
            http.get('/cms/brands')
        ])
        .then(([{data : catDtat},{data : brandData}]) => {
            let temp = {}

            for(let category of catDtat){
                temp[category.name] = category._id
            }
            setCategories(temp)

            temp = {}
            for(let brand of brandData){
                temp[brand.name] = brand._id
            }
            setBrands(temp)

        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }, [])
    return <Container className="bg-white my-2 py-3 rounded-3 shadow">
            {loading ? <Loading /> : <>
            <Row>
                <Col>
                    <h1>Add Products</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} name="name" label="Name" />
                        <InputField formik={formik} name="summary" label="Summary" as="textarea" />
                        <InputField formik={formik} name="description" label="Description" as="textarea" />
                        <InputField formik={formik} name="price" label="Price" />
                        <InputField formik={formik} name="discountedprice" label="Discounted Price"  />

                        <SelectField formik={formik} name= "categoryId" label="Category" options={categories} />
                        <SelectField formik={formik} name= "brandId" label="Brand" options={brands} />

                        <SelectField formik={formik} name= "status" label="Status" options={{'Active': true, 'Inactive': false}} 
                        onChange={({target}) => formik.setFieldValue('status', target.value == 'true')} />
                        <SelectField formik={formik} name= "featured" label="Featured" options={{'Yes': true, 'No': false}} 
                        onChange={({target}) => formik.setFieldValue('featured', target.value == 'true')} />

                        <div className="mt-3">
                            <SubmitBtn loading={formik.isSubmitting}  />
                        </div>
                    </Form>
                </Col>
            </Row></>}
        </Container>

}