import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/lib"
import { useEffect, useState } from "react"
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"

export const List = () => {

    const [categories, setCatagories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        http.get('/cms/categories')
            .then(({data}) => setCatagories(data))
            .catch(() => {})
            .finally(() => setLoading(false))
      }, [])

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this category?',
            buttons: [
                {
                    label: 'Yes',
                    className: 'text-bg-danger ',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`/cms/categories/${id}`)
                            .then(() => http.get('/cms/categories'))
                            .then(({data}) => setCatagories(data))
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
                    <h1>Categories</h1>
                </Col>
                <Col xs="auto">
                    <Link to="/categories/create" className="btn btn-dark">
                        <i className="fa-solid fa-plus "></i> Add Category
                    </Link>
                </Col>
                <Col xs="12">
                   <DataTable searchables={['Name']} sortables={['Name']} data={categories.map(category => {
                    return {
                        'Name': category.name,
                        'Status': category.status ? 'Active' : 'Inactive',
                        'Created At': dtFormat(category.createdAt),
                        'Updated At': dtFormat(category.updatedAt),
                        'Action': <>
                            <Link to={`/categories/${category._id}`} className="btn btn-dark btn-sm me-2">
                                <i className="fa-solid fa-pen-to-square me-2" ></i> Edit
                            </Link>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(category._id)}>
                                <i className="fa-solid fa-trash-can me-2" ></i> Delete
                            </Button>
                        </>
                    }
                   })} />
                </Col>
            </Row>}
        </Container>
}