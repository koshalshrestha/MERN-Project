import { configureStore } from "@reduxjs/toolkit";
import userReducer, { clearUser, setUser } from "./user.slice"

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store

export { setUser, clearUser }