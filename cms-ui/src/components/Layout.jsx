import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css"
import "react-toastify/dist/ReactToastify.min.css"
import "./Layout.css"

import { useSelector } from "react-redux"
import { Outlet} from "react-router-dom"
import { MenuBar } from "./MenuBar"
import { useEffect, useState } from "react"
import http from "@/http"
import { useDispatch } from "react-redux"
import { removeStorage, fromStorage } from "@/lib"
import { Loading } from "./Loading"
import { setUser } from "@/store"


export const Layout = () => {

    const user = useSelector(state => state.user.value)
    const [loading, setLoading] = useState(true)
    
    const dispatch = useDispatch()

    useEffect( () => {
        if(!user){
            setLoading(true)

            const token = fromStorage('cms_token')

            if( token ) {
                http.get('/profile/detail')
                    .then(({data}) => {
                        dispatch(setUser(data))
                    })
                    .catch(() => {
                        removeStorage('cms_token')
                    })
                    .finally(()=> setLoading(false))
            } else{
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }, [user])

    return loading ? <Loading /> : <>
        <MenuBar />

        <Outlet />
    </>
}