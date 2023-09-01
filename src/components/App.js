import './App.scss';
import {Navigator} from './Navigator'
import {Filter} from "./Filter";
import {ProductContent} from "./ProductContent";
import {Footer} from "./Footer";
import {MyBag} from "./MyBag";
import {useSelector} from "react-redux";
import {Route, Routes, Link, useParams, useNavigate, useLocation, Outlet, BrowserRouter} from "react-router-dom";
import {Products} from "./Products";
import {Checkout} from "./Checkout";



function App() {

    return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SharedLayout/>}>
                    <Route index element={<WhatsNew/>}/>
                    <Route path={"/products/:productId"} element={<Products/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
                <Route path="/shop/mybag" element={<MyBag/>}/>
                <Route path="/shop/checkout" element={<Checkout/>}/>
            </Routes>
        </BrowserRouter>


    </div>
  );
}

const NoMatch = () =>{
    return <>
        <p>404 not found</p>
    </>
}


const SharedLayout = () =>{
    const location = useLocation()
    return<>
        <Navigator/>
        <Outlet/>
        <Footer/>
    </>
}

const WhatsNew = () =>{

    const menuHover = useSelector(state => state?.headerReducers?.isHover)
    const mask = menuHover? {
        position:"absolute",
        width:"100%",
        height:"100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex:2
    } : {
        backgroundColor: "rgba(0, 0, 0, 0)"
    }

    return <section className='category-page'>
        <div style={mask}/>
        <div className="category-container">
            <Filter/>
            <ProductContent/>
        </div>
    </section>
}

export default App;
