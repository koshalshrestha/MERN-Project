import { useEffect, useState } from "react"
import {Row, Col, Table, Form } from "react-bootstrap"

export const DataTable = ({ data = [], searchables = [], sortables=[]}) => {

    const [filtered, setFiltered] = useState([])
    const [term, setTerm] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [direction, setDirection] = useState('desc')

    useEffect(() => {
        if(term.length){
            let temp = data.filter(item => {

                for(let k of searchables){
                    if(item[k].toLowerCase().includes(term.toLocaleLowerCase())){
                        return true
                    }
                }

                return false
            })

            setFiltered(temp)
            setSortBy('')
        }else{
            setFiltered(data)
            setSortBy('')
        }
    }, [ term])

    useEffect( () => {
        if(sortBy.length){
            let temp = [...filtered]
            temp.sort( (a, b) => {
                if(isNaN(parseFloat(a[sortBy])) || isNaN(parseFloat(b[sortBy]))) {
                    let x = a[sortBy].toLowerCase();
                    let y = b[sortBy].toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                }else {
                    return a[sortBy] - b[sortBy]
                }
            })
    
            if(direction == 'desc'){
                temp.reverse()
            }
    
            setFiltered(temp)
        }
    }, [sortBy, direction])

    const handleSort = k => {
        if(sortables.includes(k)){
            if(k == sortBy){
                setDirection(direction == 'asc' ? 'desc' : 'asc')
            } else {
                setSortBy(k)
                setDirection('desc')
            }
        }
    }

    return <Row>
        <Col xs='4' className="ms-auto mb-3">
            <Form.Control type="search" placeholder="Search..." value={term} onChange={({target}) => setTerm(target.value)} />
        
        </ Col>
        <Col xs='12'>
            {filtered.length ? <Table striped bordered hover size="sm">
            <thead className="table-dark">
                <tr>
                    {Object.keys(filtered[0]).map((k, i) => <th key={i} className={sortables.includes(k) && 'sortable'}
                    onClick={() => handleSort(k)}>
                        {k}
                        {k == sortBy && <i className={`fa-solid fa-sort-${direction == 'asc' ? 'up' : 'down'} ms-2`} ></i>}
                    </th>)}
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