import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { ThornsNRoses } from "./components/ThornsNRoses"
import React from "react"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <ThornsNRoses />
    </BrowserRouter>
)

