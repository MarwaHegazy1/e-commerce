import logo from './logo.svg';
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import Register from './components/Register/Register'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Notfound from './components/Notfound/Notfound'
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { CartContextProvider } from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Address from './components/Address/Address';
import Allorders from './components/Allorders/Allorders';
import { OrdersContextProvider } from './Context/OrdersContext';
import BrandDetails from './components/BrandDetails/BrandDetails';
import CategoryDetails from './components/CategoryDetails/CategoryDetails';
import WishList from './components/WishList/WishList';
import { WishListContextProvider } from './Context/WishListContext';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode';
import { Provider } from 'react-redux';
import {store} from './Redux/Store'


let routers = createBrowserRouter([
 // {index:true,element:<Login/>},
  {path:'/',element:<Layout/>,children:[
    {path:'/',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'login',element:<Login/>},
    {path:'forgetpassword',element:<ForgetPassword/>},
    {path:'verifyresetCode',element:<VerifyResetCode/>},
    {path:'resetpassword',element:<ResetPassword/>},
    {path:'register',element:<Register/>},
    {path:'products',element:<ProtectedRoute><FeaturedProducts/></ProtectedRoute>},
    {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'profile',element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'address',element:<ProtectedRoute><Address/></ProtectedRoute>},
    {path:'allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:'productdetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'branddetails/:id',element:<ProtectedRoute><BrandDetails/></ProtectedRoute>},
    {path:'categorydetails/:id',element:<ProtectedRoute><CategoryDetails/></ProtectedRoute>},


    {path:'*',element:<Notfound/>},
  ]}
])



function App() {

  return <>
 <div className="py-5 my-4">

    <CartContextProvider>
      <WishListContextProvider>
        <OrdersContextProvider>
          <UserContextProvider >
            <Provider store={store}>
              <RouterProvider router={routers}></RouterProvider>
           </Provider>
          </UserContextProvider>
        <Toaster/>
        </OrdersContextProvider>
      </WishListContextProvider>
    </CartContextProvider>
  
  </div> 
  </>
}

export default App;
