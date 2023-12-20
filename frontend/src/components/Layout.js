import { Outlet } from "react-router-dom";

//use rafce in VSCdoe
const Layout = () => {
  return (
    <Outlet/>
  )
}
// if we want a banner on all public and private pages, (everything) we do it here. It's a parent for every component.
export default Layout