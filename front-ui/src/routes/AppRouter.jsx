import { Layout } from "@/components"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import * as Pages from "@/pages"
import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element = {<Layout/>} >
                <Route index element= {<Pages.Dashboard.Home />} />

                <Route path="categories/:id" element={<Pages.Dashboard.Categories />} />
                
                <Route path="brands/:id" element={<Pages.Dashboard.Brands />} />

                <Route path="search" element={<Pages.Dashboard.Search />} />

                <Route path="products/:id" element={<Pages.Dashboard.Detail />} />

                <Route path="login" element={<Pages.Auth.Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
}