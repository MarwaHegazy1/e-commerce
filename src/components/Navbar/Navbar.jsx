import React, { useContext } from 'react'
import Style from './Navbar.module.css'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { useSelector } from 'react-redux'


export default function Navbar() {
  let {userToken ,setUserToken,userData, setUserData,setUserEmail}=useContext(UserContext);
  let {cartNum}=useContext(CartContext)  
  let navigate = useNavigate()


  function logout(){
    localStorage.removeItem('userToken');
    setUserToken(null)

    //localStorage.removeItem('userData');
    
    localStorage.removeItem('userName');
    setUserData(null)

   localStorage.removeItem('userEmail');
   setUserEmail(null)

    navigate('/login')
  }
  return <>
<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top py-3">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="" /> 
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {userToken!==null?<>  <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link> 
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/allorders">MyOrder</Link>
        </li>
       </>:''}
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {userToken!==null?<>  
          <li className="nav-item">
            <span className="nav-link fw-bold text-success me-3 ">Happy Shopping, {userData}</span>
          </li>
          <li className="nav-item">
            <Link className="nav-link position-relative" to="/cart">
              <i className="fa-solid fa-cart-shopping fa-xl "></i>
              <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger">
                {cartNum?cartNum:0}
              </span>
            </Link>
          </li>
          <li className="nav-item ms-2">
              <Link className="nav-link" to="/wishlist">
              <i className="fa-regular fa-heart text-black fa-xl"></i>
              </Link>
            </li>
          <li className="nav-item cursor-pointer ms-2">
            <span onClick={()=>logout()} className="nav-link cursor-pointer" >Logout</span>
          </li>
        </> 
        :<>
          <li className="nav-item">
            <Link className="nav-link" to="/login"> Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
        </>}
        
      </ul>

    </div>
  </div>
</nav>
  </>
  
}
