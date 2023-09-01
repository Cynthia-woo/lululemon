import "./OrderSummary.scss"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductInfo} from "../actions/productInfoAction";

export const OrderSummary = () =>{

    const [subtotal, setSubtotal] = useState(0)
    const [cart, setCart] = useState([])
    useEffect(() => setCart(getCookie("shoppingCart")), [])
    const timer = setTimeout(()=> CalcSubtotal(),1000)
    let tempTotal = 0

    const CalcSubtotal = () =>{
        if (subtotal !== 0) return
        let elements = document.getElementsByClassName("total-price")
        for (let i = 0; i < elements.length; i++){
            let price = parseFloat(elements[i].outerText.replace(/[^\d.]/g, ''))
            tempTotal += price
        }
        clearTimeout(timer)
        setSubtotal(tempTotal)
    }

    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return JSON.parse(cookieValue);
            }
        }
        return [];
    }

    const ItemSummary = (data) =>{
        if (data.data === null){
            return <></>
        }
        return <>
            {data.data && data.data.map && data.data.map((item, index) => (
                <BagItem productData={item} key={index}/>
            ))}
        </>


    }

    const BagItem = (productData) =>{
        const dispatch = useDispatch()
        useEffect(() => dispatch(fetchProductInfo(productData?.productData?.id, productData?.productData?.color)), [])
        const productInfo = useSelector(state => state?.productInfoReducer?.realProductInfo)
        const selectedColorImages = productInfo?.rs?.images.find((image) => image?.colorId === productData?.productData?.color)
        const selectedColorSwatch = productInfo?.rs?.swatches.find((swatch) => swatch?.colorId === productData?.productData?.color)
        let singlePrice = parseFloat(productInfo?.rs?.price.replace(/[^\d.]/g, ''))
        let totalPrice = singlePrice * parseFloat(productData?.productData?.quantity)

        return <div className="checkout-bagitems">
            <div className="item-image">
                <img src={selectedColorImages?.whyWeMadeThis[0]} alt=""/>
            </div>
            <div className="checkout-itemdetails">
                <p>{productData.productData ? productData?.productData?.productName : "Product name"}</p>
                <p className="product-detail-info">{productData.productData ? selectedColorSwatch?.swatchAlt : "Product color name"}</p>
                <p className="product-detail-info">Size: {productData.productData ? productData?.productData?.size : "Product size"}</p>
                <div className="quan-total">
                    <p>Quantity: {productData.productData ? productData?.productData?.quantity : "0"}</p>
                    <p className="total-price">{totalPrice} CAD</p>
                    {/*<p className="total-price">3 CAD</p>*/}
                </div>

            </div>
        </div>
    }


    return <div className="order-summary">
        <div className="summary-panel">
            <h2>Order summary</h2>
            <div className="bag-summary">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                     className="bag-summary_bagIcon__KfM7O" focusable="false" role="img" aria-hidden="true">
                    <path
                        d="M20 6.25h-3.25c-.68-3.62-2.53-6-4.75-6s-4.07 2.38-4.75 6H4a.76.76 0 0 0-.75.75v12A4.75 4.75 0 0 0 8 23.75h8A4.75 4.75 0 0 0 20.75 19V7a.76.76 0 0 0-.75-.75zm-8-4.5c1.38 0 2.66 1.84 3.22 4.5H8.78c.56-2.66 1.84-4.5 3.22-4.5zM19.25 19A3.26 3.26 0 0 1 16 22.25H8A3.26 3.26 0 0 1 4.75 19V7.75H7l-.24 2.16.49.06a1 1 0 0 0 1.12-.87l.17-1.35h6.92l.17 1.35a1 1 0 0 0 1.12.87l.49-.06L17 7.75h2.28L19.25 19z"
                        fill="currentColor" fillRule="evenodd"></path>
                </svg>
                <p>items</p>
                <span className="bag-summary-total">${subtotal}</span>
            </div>
            <ItemSummary data = {cart}/>
            <div className="price-summary">
                <div className="line-item">
                    <p>Subtotal</p>
                    <p>${subtotal}</p>
                </div>
                <div className="line-item">
                    <p>Shipping</p>
                    <p>FREE</p>
                </div>
                <div className="line-item">
                    <p>Tax</p>
                    <p>Calculated at next step</p>
                </div>
                <div className="line-item heavy">
                    <p>Order total</p>
                    <p>CAD ${subtotal}</p>
                </div>
            </div>


        </div>
    </div>
}
