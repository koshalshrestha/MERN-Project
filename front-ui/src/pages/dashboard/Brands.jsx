import { Loading, ProductSection } from "@/components"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "@/http"

export const Brands = () => {
    const [brands, setBrands] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const params = useParams()

    useEffect(() => {
        setLoading(true)
        Promise.all([
            http.get(`/brands/${params.id}`),
            http.get(`/brands/${params.id}/products`)
        ])
            .then(([{ data: bran }, { data: prod }]) => {
                setBrands(bran)
                setProducts(prod)
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [params.id])

    return loading ? <Loading /> : <ProductSection title={brands.name} products={products} size="sm"/>
}