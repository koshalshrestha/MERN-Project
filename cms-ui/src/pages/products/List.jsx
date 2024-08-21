import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat, imgUrl } from "@/lib"
import { useEffect, useState } from "react"
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"

export const List = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        http.get('/cms/products')
            .then(({data}) => setProducts(data))
            .catch(() => {})
            .finally(() => setLoading(false))
      }, [])

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    label: 'Yes',
                    className: 'text-bg-danger ',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`/cms/products/${id}`)
                            .then(() => http.get('/cms/products'))
                            .then(({data}) => setProducts(data))
                            .catch(() => {})
                            .finally(() => setLoading(false))
                    }

                },
                {
                    label: 'No',
                }
            ]
        })
    }

    return <Container className="bg-white my-2 py-3 rounded-3 shadow">
            {loading ? <Loading /> : <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col xs="auto">
                    <Link to="/products/create" className="btn btn-dark">
                        <i className="fa-solid fa-user-plus"></i> Add Product
                    </Link>
                </Col>
                <Col xs="12">
                   <DataTable searchables={['Name']} sortables={['Name']} data={products.map(product => {
                    return {
                        'Name': product.name,
                        'Image':<a href={imgUrl(product.images[0])} target="_blank"><img className="img-sm" src={imgUrl(product.images[0])} /> </a>,
                        'Price': product.price,
                        'Disc. Price': product.discountedPrice ?? 0,
                        'Category': product.category.name,
                        'Brand': product.brand.name,
                        'Status': product.status ? 'Active' : 'Inactive',
                        'Created At': dtFormat(product.createdAt),
                        'Updated At': dtFormat(product.updatedAt),
                        'Action': <>
                            <Link to={`/products/${product._id}`} className="btn btn-dark btn-sm me-2">
                                <i className="fa-solid fa-pen-to-square me-2" ></i> Edit
                            </Link>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>
                                <i className="fa-solid fa-trash-can me-2" ></i> Delete
                            </Button>
                        </>
                    }
                   })} />
                </Col>
            </Row>}
        </Container>
}