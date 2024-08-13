import { Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/lib"
import { useEffect, useState } from "react"
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export const List = () => {

    const [staffs, setStaffs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        http.get('/cms/staffs')
            .then(({data}) => setStaffs(data))
            .catch(() => {})
            .finally(() => setLoading(false))
      }, [])

    return <Container className="bg-white my-2 py-3 rounded-3 shadow">
            {loading ? <Loading /> : <Row>
                <Col>
                    <h1>Staffs</h1>
                </Col>
                <Col xs="auto">
                    <Link to="/staffs/create" className="btn btn-dark">
                        <i className="fa-solid fa-user-plus"></i> Add Staff
                    </Link>
                </Col>
                <Col xs="12">
                    {staffs.length ? 
                    <Table bordered hover striped size="sm" >
                        <thead className="table-dark" >
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffs.map((staff, i) => <tr key={i}>
                                    <td>{staff.name}</td>
                                    <td>{staff.email}</td>
                                    <td>{staff.phone}</td>
                                    <td>{staff.address}</td>
                                    <td>{staff.status ? 'Active' : 'Inactive'}</td>
                                    <td>{dtFormat(staff.createdAt)}</td>
                                    <td>{dtFormat(staff.updatedAt)}</td>
                                    <td>
                                        <Link to='' className="btn btn-sm btn-dark me-2" >
                                            <i className="fa-solid fa-pen-to-square"></i> Edit
                                        </Link>
                                        <Button size="sm" variant="danger" >
                                            <i className="fa-solid fa-trash-can me-1"></i>Delete
                                        </Button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table> : 
                    <h5 className="text-muted" >No data found</h5>}
                </Col>
            </Row>}
        </Container>
}