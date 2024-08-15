import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/lib"
import { useEffect, useState } from "react"
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"

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

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this staff?',
            buttons: [
                {
                    label: 'Yes',
                    className: 'text-bg-danger ',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`/cms/staffs/${id}`)
                            .then(() => http.get('/cms/staffs'))
                            .then(({data}) => setStaffs(data))
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
                    <h1>Staffs</h1>
                </Col>
                <Col xs="auto">
                    <Link to="/staffs/create" className="btn btn-dark">
                        <i className="fa-solid fa-user-plus"></i> Add Staff
                    </Link>
                </Col>
                <Col xs="12">
                   <DataTable searchables={['Name', 'Email','Phone', 'Address']} data={staffs.map(staff => {
                    return {
                        'Name': staff.name,
                        'Email': staff.email,
                        'Phone': staff.phone,
                        'Address': staff.address,
                        'Status': staff.status ? 'Active' : 'Inactive',
                        'Created At': dtFormat(staff.createdAt),
                        'Updated At': dtFormat(staff.updatedAt),
                        'Action': <>
                            <Link to={`/staffs/${staff._id}`} className="btn btn-dark btn-sm me-2">
                                <i className="fa-solid fa-pen-to-square me-2" ></i> Edit
                            </Link>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(staff._id)}>
                                <i className="fa-solid fa-trash-can me-2" ></i> Delete
                            </Button>
                        </>
                    }
                   })} />
                </Col>
            </Row>}
        </Container>
}