import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/lib"
import { useEffect, useState } from "react"
import { Container, Row, Col, Button, Form, } from "react-bootstrap"
import { confirmAlert } from "react-confirm-alert"


export const List = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        http.get('/cms/orders')
            .then(({data}) => setOrders(data))
            .catch(() => {})
            .finally(() => setLoading(false))
      }, [])

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this order?',
            buttons: [
                {
                    label: 'Yes',
                    className: 'text-bg-danger ',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`/cms/orders/${id}`)
                            .then(() => http.get('/cms/orders'))
                            .then(({data}) => setOrders(data))
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

    const handleUpdate = (id, status) => {
        setLoading(true)
        http.put(`/cms/orders/${id}`, {status})
            .then(() => http.get('/cms/orders'))
            .then(({data}) => setOrders(data))
            .catch(() => {})
            .finally(() => setLoading(false))

    }

    return <Container className="bg-white my-2 py-3 rounded-3 shadow">
            {loading ? <Loading /> : <Row>
                <Col>
                    <h1>Orders</h1>
                </Col>
                
                <Col xs="12">
                   <DataTable searchables={['Product', 'User', 'Comment', 'Rating']} sortables={['Product', 'User', 'Comment', 'Rating']} data={orders.map(order => {
                    return {
                        'Details': <ul>
                            {order.details.map(detail => <li key={detail._id} >{detail.qty} x {detail.product?.name || "deleted product"}
                                @ Rs {detail.price} = Rs. {detail.total}
                            </li>)}
                        </ul>,
                        'User': order.user?.name,
                        'Status': <Form.Select value={order.status} onChange={({target}) => handleUpdate(order._id, target.value)} >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </Form.Select>  ,
                        'Created At': dtFormat(order.createdAt),
                        'Updated At': dtFormat(order.updatedAt),
                        'Action': <Button variant="danger" size="sm" onClick={() => handleDelete(order._id)}>
                                <i className="fa-solid fa-trash-can me-2" ></i> Delete
                            </Button>
                        
                    }
                   })} />
                </Col>
            </Row>}
        </Container>
}