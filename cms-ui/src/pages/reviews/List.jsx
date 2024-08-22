import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/lib"
import { useEffect, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"

export const List = () => {

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        http.get('/cms/reviews')
            .then(({data}) => setReviews(data))
            .catch(() => {})
            .finally(() => setLoading(false))
      }, [])

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this review?',
            buttons: [
                {
                    label: 'Yes',
                    className: 'text-bg-danger ',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`/cms/reviews/${id}`)
                            .then(() => http.get('/cms/reviews'))
                            .then(({data}) => setReviews(data))
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
                    <h1>Reviews</h1>
                </Col>
                
                <Col xs="12">
                   <DataTable searchables={['Product', 'User', 'Comment', 'Rating']} sortables={['Product', 'User', 'Comment', 'Rating']} data={reviews.map(review => {
                    return {
                        // 'Product': review.product.name,
                        // 'User': review.user.name,
                        'Comment': review.comment,
                        'Rating': review.rating,
                        'Created At': dtFormat(review.createdAt),
                        'Updated At': dtFormat(review.updatedAt),
                        'Action': <Button variant="danger" size="sm" onClick={() => handleDelete(review._id)}>
                                <i className="fa-solid fa-trash-can me-2" ></i> Delete
                            </Button>
                        
                    }
                   })} />
                </Col>
            </Row>}
        </Container>
}