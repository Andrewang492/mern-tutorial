import { Outlet } from "react-router-dom"
import DashHeader from "./DashHeader"
import { DashFooter } from "./DashFooter"

// Dash is 'protected' part of th page. When people have logged in. 
export const DashLayout = () => {
  return (
    <>
        <DashHeader/>
        <div className="dash-container">
            <Outlet/>
        </div>
        <DashFooter/>
    </>
  )
}
