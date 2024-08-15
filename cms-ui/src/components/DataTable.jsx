import { useEffect, useState } from "react"
import {Row, Col, Table, Form } from "react-bootstrap"

export const DataTable = ({ data = [], searchables = []}) => {

    const [allData, setAllData] = useState([])
    const [filtered, setFiltered] = useState([])
    const [term, setTerm] = useState('')

    useEffect(() => {
        setAllData(data)
    }, [data])

    useEffect(() => {
        if(term.length){
            let temp = allData.filter(item => {

                for(let k of searchables){
                    if(item[k].toLowerCase().includes(term.toLocaleLowerCase())){
                        return true
                    }
                }

                return false
            })

            setFiltered(temp)
        }else{
            setFiltered(allData)
        }
    }, [allData, term, searchables])

    return <Row>
        <Col xs='4' className="ms-auto mb-3">
            <Form.Control type="search" placeholder="Search..." value={term} onChange={({target}) => setTerm(target.value)} />
        
        </ Col>
        <Col xs='12'>
            {filtered.length ? <Table striped bordered hover size="sm">
            <thead className="table-dark">
                <tr>
                    {Object.keys(filtered[0]).map((k, i) => <th key={i}>{k}</th>)}
                </tr>
            </thead>
            <tbody>
                {filtered.map((item, i) => <tr key= {i}>
                    {Object.values(item).map((value, j) => <td key={j}>{value}</td>)}
                </tr>)}
            </tbody>
            </Table> : 
            <h4 className="text-muted"> No Data Found</h4>}
        </Col>
    </Row>
}