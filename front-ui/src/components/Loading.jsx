import { Row, Col } from "react-bootstrap"

export const Loading = () => {
    return <Row>
        <Col className="text-center my-3" >
            <i className="fa-solid fa-spinner fa-spin me-2"></i> Loading....
        </Col>
    </Row>
}