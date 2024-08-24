import { Loading, ProductSection } from "@/components"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import http from "@/http"


export const Search = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const [query] = useSearchParams()

    useEffect(() => {
        setLoading(true)

        http.post(`/products/search?term=${query.get('term')}`)
            .then(({data}) => {
                setProducts(data)
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [query.get('term')])

    return loading ? <Loading /> : <ProductSection title={`Search: ${query.get('term')}`} products={products} size="sm" />
}