import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/lib"
import { useEffect, useState } from "react"
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"

export const List = () => {

    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        http.get('/cms/customers')
            .then(({data}) => setCustomers(data))
            .catch(() => {})
            .finally(() => setLoading(false))
      }, [])

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this customer?',
            buttons: [
                {
                    label: 'Yes',
                    className: 'text-bg-danger ',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`/cms/customers/${id}`)
                            .then(() => http.get('/cms/customers'))
                            .then(({data}) => setCustomers(data))
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
                    <h1>Customers</h1>
                </Col>
                <Col xs="auto">
                    <Link to="/customers/create" className="btn btn-dark">
                        <i className="fa-solid fa-user-plus"></i> Add Customer
                    </Link>
                </Col>
                <Col xs="12">
                   <DataTable searchables={['Name', 'Email','Phone', 'Address']} sortables={['Name', 'Email','Phone', 'Address']} data={customers.map(customer => {
                    return {
                        'Name': customer.name,
                        'Email': customer.email,
                        'Phone': customer.phone,
                        'Address': customer.address,
                        'Status': customer.status ? 'Active' : 'Inactive',
                        'Created At': dtFormat(customer.createdAt),
                        'Updated At': dtFormat(customer.updatedAt),
                        'Action': <>
                            <Link to={`/customers/${customer._id}`} className="btn btn-dark btn-sm me-2">
                                <i className="fa-solid fa-pen-to-square me-2" ></i> Edit
                            </Link>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(customer._id)}>
                                <i className="fa-solid fa-trash-can me-2" ></i> Delete
                            </Button>
                        </>
                    }
                   })} />
                </Col>
            </Row>}
        </Container>
}