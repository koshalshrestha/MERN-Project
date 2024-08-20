import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/lib"
import { useEffect, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"

export const List = () => {

    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        http.get('/cms/brands')
            .then(({data}) => setBrands(data))
            .catch(() => {})
            .finally(() => setLoading(false))
      }, [])

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this brand?',
            buttons: [
                {
                    label: 'Yes',
                    className: 'text-bg-danger ',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`/cms/brands/${id}`)
                            .then(() => http.get('/cms/brands'))
                            .then(({data}) => setBrands(data))
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
                    <h1>Brands</h1>
                </Col>
                <Col xs="auto">
                    <Link to="/brands/create" className="btn btn-dark">
                        <i className="fa-solid fa-plus"></i> Add Brand
                    </Link>
                </Col>
                <Col xs="12">
                   <DataTable searchables={['Name']} sortables={['Name']} data={brands.map(brand => {
                    return {
                        'Name': brand.name,
                        'Status': brand.status ? 'Active' : 'Inactive',
                        'Created At': dtFormat(brand.createdAt),
                        'Updated At': dtFormat(brand.updatedAt),
                        'Action': <>
                            <Link to={`/brands/${brand._id}`} className="btn btn-dark btn-sm me-2">
                                <i className="fa-solid fa-pen-to-square me-2" ></i> Edit
                            </Link>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(brand._id)}>
                                <i className="fa-solid fa-trash-can me-2" ></i> Delete
                            </Button>
                        </>
                    }
                   })} />
                </Col>
            </Row>}
        </Container>
}