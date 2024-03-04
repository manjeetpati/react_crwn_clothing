import { Fragment, useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg'
import './navigation.styles.scss'
import { UserContext } from "../../context/user.context"

const NavigationBar = () => {
    const {currentUser} = useContext(UserContext)
    console.log(currentUser)
    return (
        <Fragment>
        <div className="navigation">
            <Link className="logo-container" to={'/'}>
                <CrwnLogo className="logo"/>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to={'/shop'}>
                    Shop
                </Link>
                <Link className="nav-link" to={'/auth'}>
                    Sign In
                </Link>
            </div>
            
        </div>
        <Outlet />
        </Fragment>
      
    )
  }

  export default NavigationBar