import { removeStorage } from "@/lib"
import { clearUser } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const MenuBar = () => {

    const user = useSelector(state => state.user.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        removeStorage('front_token')
        dispatch(clearUser())
        navigate('/login')}


    return user && <> </>
}
