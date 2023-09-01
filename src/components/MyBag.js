import "./MyBag.scss"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductInfo} from "../actions/productInfoAction";
import {Link} from "react-router-dom";

export const MyBag = () => {

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

    const ProductGroup = (data) => {
        if (data.data.length === 0) {
            return <h1>Your cart is empty!</h1>
        }
        return <>
            {data.data && data.data.map && data.data.map((item, ind) => (
                <ProductContainer key={ind} productData={item}/>
            ))}
        </>

    }

    const ProductContainer = (productData) => {
        const dispatch = useDispatch()
        useEffect(() => dispatch(fetchProductInfo(productData?.productData?.id, productData?.productData?.color)), [])
        const productInfo = useSelector(state => state?.productInfoReducer?.realProductInfo)
        const selectedColorImages = productInfo?.rs?.images.find((image) => image?.colorId === productData?.productData?.color)
        const selectedColorSwatch = productInfo?.rs?.swatches.find((swatch) => swatch?.colorId === productData?.productData?.color)
        let singlePrice = parseFloat(productInfo?.rs?.price.match(/\d+/));
        console.log("singlePrice",singlePrice);

        return <div className="product-container">
            <div className="product">
                <div className="product-primary">
                    <div className="product-image-container">
                        <button className="img-button">
                            <img src={selectedColorImages?.whyWeMadeThis[0]} alt=""/>
                        </button>
                    </div>

                    <div className="product-detail">
                        <h3 className="detail-text">{productData.productData ? productData?.productData?.productName : "Product name"}</h3>
                        <p className="product-detail-info">{productData.productData ? selectedColorSwatch?.swatchAlt : "Product color name"}</p>
                        <p className="product-detail-info">{productData.productData ? productData?.productData?.size : "Product size"}</p>
                        <div className="detail-container">
                            <div className="edit-button">
                                <button>
                                    <span className="link-primary">
                                        Edit
                                    </span>
                                </button>
                            </div>
                            <div className="item-price">
                                <span className="price-label"> Item Price</span>
                                <span className="price-layout"> {singlePrice} CAD</span>
                            </div>
                            <div className="product-row-wrapper">
                                <div className="select-quantity">
                                    <label htmlFor="quantity"><span>Quantity</span></label>
                                    <div className="input-warpper">
                                        <div className="tag-warpper">
                                            <input type="text"
                                                   value={productData.productData ? productData?.productData?.quantity : "0"}/>
                                            <svg height="8" width="14" fill="currentColor"
                                                 stroke="currentColor" viewBox="0 0 14 8"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 className="iconCarat-25RjA" focusable="false"
                                                 role="img" aria-hidden="true">
                                                <path
                                                    d="m13 .99-6.47 6.5a.74.74 0 0 1-1.06 0L-1 .99l.35-.35a1 1 0 0 1 1.41 0L6 5.86 11.24.6a1 1 0 0 1 1.41 0z"
                                                    fillRule="evenodd" stroke="none"></path>
                                            </svg>
                                        </div>

                                    </div>

                                </div>

                            </div>
                            <div className="item-price">
                                <span className="price-label"> Total Price</span>
                                <span
                                    className="price-layout"> {singlePrice * parseFloat(productData?.productData?.quantity)} CAD</span>
                            </div>

                        </div>
                        <div className="mybag-product-info">
                            <div className="message-shipping">
                                <span className="">Free Shipping + Free Returns</span>
                            </div>
                            <div className="save-for-later">
                                <a aria-hidden="true" className="link-primary"
                                   data-testid="sfl-signin-link"
                                   href="/">Save for Later</a>
                            </div>
                            <div className="remove-item">
                                <div className="link-primary">Remove
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    const [cart, setCart] = useState([])
    useEffect(() => setCart(getCookie("shoppingCart")), [])

    return <div className="site-container">
        <header className="simple-header">
            <nav className="simple-nav">
                <a href="/" className="simple-anchor">
                    <svg viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg" width="34" height="34">
                        <path
                            d="M13.499 0C20.956 0 27 6.045 27 13.5 27 20.957 20.956 27 13.499 27 6.044 27 0 20.958 0 13.5 0 6.044 6.044 0 13.499 0zm7.076 20.18c-.425 0-.825-.127-1.22-.391-2.184-1.454-1.438-3.198.053-5.897.63-1.145 1.282-2.324 1.572-3.542.311-1.31.594-3.22-.542-4.664-.534-.677-1.347-1.2-2.413-1.554-1.112-.367-2.54-.566-4.25-.589l-.118-.003-.434.003c-1.709.023-3.139.222-4.248.589-1.068.354-1.88.876-2.415 1.554-1.136 1.445-.853 3.354-.54 4.664.288 1.218.941 2.4 1.57 3.541 1.491 2.7 2.238 4.444.052 5.898-.394.264-.792.39-1.218.39-.85 0-1.83-.425-2.352-.685l.127.223c1.08 1.621 2.468 2.483 4.01 2.483.676 0 1.39-.164 2.12-.488.775-.343 1.455-.971 1.917-1.769.46-.798.643-1.657.512-2.421-.158-.685-.516-1.606-.927-2.673-1.077-2.783-2.548-6.588-1.278-8.449.536-.785 1.5-1.169 2.945-1.174 1.447.005 2.41.389 2.946 1.174 1.272 1.861-.2 5.666-1.275 8.445-.413 1.068-.77 1.99-.928 2.67-.132.771.05 1.63.512 2.428s1.142 1.426 1.917 1.77c.73.323 1.444.487 2.12.487 1.542 0 2.93-.862 4.015-2.49l.122-.216c-.52.26-1.5.686-2.352.686z"
                            id="Combined-Shape" fillRule="nonzero" fill="#d31334"></path>
                    </svg>
                </a>
            </nav>
        </header>
        <div className="layout-container">
            <div className="main-content">
                <div className="grid-padding">
                    <div className="mybag-primaryContent">
                        <div className="mybag-header">
                            <h1 className="text-small">My Bag</h1>
                            <div className="text-small weight-regular"> (HC Items)</div>
                        </div>
                        <div className="notification-block">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                 className="icon-block" focusable="false" role="img" aria-hidden="true">
                                <path
                                    d="M20 6.25h-3.25c-.68-3.62-2.53-6-4.75-6s-4.07 2.38-4.75 6H4a.76.76 0 0 0-.75.75v12A4.75 4.75 0 0 0 8 23.75h8A4.75 4.75 0 0 0 20.75 19V7a.76.76 0 0 0-.75-.75zm-8-4.5c1.38 0 2.66 1.84 3.22 4.5H8.78c.56-2.66 1.84-4.5 3.22-4.5zM19.25 19A3.26 3.26 0 0 1 16 22.25H8A3.26 3.26 0 0 1 4.75 19V7.75H7l-.24 2.16.49.06a1 1 0 0 0 1.12-.87l.17-1.35h6.92l.17 1.35a1 1 0 0 0 1.12.87l.49-.06L17 7.75h2.28L19.25 19z"
                                    fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                            <div>Items in bag are not reserved. Checkout now to get your gear.</div>

                        </div>
                        <div className="product-group">
                            {cart ? <ProductGroup data={cart}/> : <p>loading</p>}
                        </div>

                        <div className="save-item-holder">
                            <h2 className="lll-text-small">Save for Later</h2>
                            <div className="saved-text-body">
                                <a className="my-saved-items-section lll-font-weight-semibold"
                                   href="/">Sign in</a>
                                <span>
                                                <span> or <a data-testid="sfl-create-account"
                                                             className="my-saved-items-section lll-font-weight-semibold"
                                                             href="/">create a member account</a> to view your saved items.</span>
                                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="order-summary">
                        <h2 className="text-small">Order Summary</h2>
                        <div className="line-item">
                            <span>Subtotal</span>
                            <span>$hc.00</span>
                        </div>
                        <div className="line-item">
                            <span>Shipping
                                <div className="item-tooltip">
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                         className="tooltip-icon" focusable="false" role="img" aria-hidden="true"><g
                                        fill="none" fillRule="evenodd" stroke="currentColor"><circle
                                        cx="12" cy="12" r="11" strokeWidth="2"></circle><path
                                        d="M13.55 7.15a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0zm-1.232 8.735h1.163v.538c0 .595-.482 1.077-1.077 1.077h-1.077a.818.818 0 0 1-.625-.29.862.862 0 0 1-.172-.68l.883-4.415H10.25v-.538c0-.595.482-1.077 1.077-1.077h1.077c.24 0 .47.107.624.29a.865.865 0 0 1 .173.68z"
                                        fill="currentColor"></path></g>
                                    </svg>
                                </div>
                            </span>
                            <span>FREE</span>
                        </div>
                        <div className="line-item">
                            <span>Tax
                                <div className="item-tooltip">
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                         className="tooltip-icon" focusable="false" role="img" aria-hidden="true"><g
                                        fill="none" fillRule="evenodd" stroke="currentColor"><circle
                                        cx="12" cy="12" r="11" strokeWidth="2"></circle><path
                                        d="M13.55 7.15a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0zm-1.232 8.735h1.163v.538c0 .595-.482 1.077-1.077 1.077h-1.077a.818.818 0 0 1-.625-.29.862.862 0 0 1-.172-.68l.883-4.415H10.25v-.538c0-.595.482-1.077 1.077-1.077h1.077c.24 0 .47.107.624.29a.865.865 0 0 1 .173.68z"
                                        fill="currentColor"></path></g>
                                    </svg>
                                </div></span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="line-item-borderless">
                            <span className="">Estimated Total</span>
                            <span className="price-1jnQj price">CAD $HC.00</span>
                        </div>
                        <div className="pay-promo-message text-body">
                            <span>or 4 payments of <span className="price-1jnQj price"><span
                                className="OneLinkNoTx">$--.--</span></span> with </span>
                            <svg height="24" viewBox="360.6 308.93 1148.88 220.83"
                                 className="promo-logo"
                                 focusable="false" role="img"
                                 aria-labelledby="icon_de0130fa-d9db-46eb-bdbc-12cb93b1bdfa" aria-hidden="false"><title
                                id="icon_de0130fa-d9db-46eb-bdbc-12cb93b1bdfa">Afterpay</title>
                                <path
                                    d="m1492 353.5-34.6-19.8-35.1-20.1c-23.2-13.3-52.2 3.4-52.2 30.2v4.5c0 2.5 1.3 4.8 3.5 6l16.3 9.3c4.5 2.6 10.1-.7 10.1-5.9V347c0-5.3 5.7-8.6 10.3-6l32 18.4 31.9 18.3c4.6 2.6 4.6 9.3 0 11.9l-31.9 18.3-32 18.4c-4.6 2.6-10.3-.7-10.3-6V415c0-26.8-29-43.6-52.2-30.2l-35.1 20.1-34.6 19.8c-23.3 13.4-23.3 47.1 0 60.5l34.6 19.8 35.1 20.1c23.2 13.3 52.2-3.4 52.2-30.2v-4.5c0-2.5-1.3-4.8-3.5-6l-16.3-9.3c-4.5-2.6-10.1.7-10.1 5.9v10.7c0 5.3-5.7 8.6-10.3 6l-32-18.4-31.9-18.3c-4.6-2.6-4.6-9.3 0-11.9l31.9-18.3 32-18.4c4.6-2.6 10.3.7 10.3 6v5.3c0 26.8 29 43.6 52.2 30.2l35.1-20.1L1492 414c23.3-13.5 23.3-47.1 0-60.5zm-227 6.6-81 167.3h-33.6l30.3-62.5-47.7-104.8h34.5l30.6 70.2 33.4-70.2h33.5zm-809.9 59.4c0-20-14.5-34-32.3-34s-32.3 14.3-32.3 34c0 19.5 14.5 34 32.3 34s32.3-14 32.3-34m.3 59.4v-15.4c-8.8 10.7-21.9 17.3-37.5 17.3-32.6 0-57.3-26.1-57.3-61.3 0-34.9 25.7-61.5 58-61.5 15.2 0 28 6.7 36.8 17.1v-15h29.2v118.8h-29.2zm171.2-26.4c-10.2 0-13.1-3.8-13.1-13.8V386h18.8v-25.9h-18.8v-29h-29.9v29H545v-11.8c0-10 3.8-13.8 14.3-13.8h6.6v-23h-14.4c-24.7 0-36.4 8.1-36.4 32.8v15.9h-16.6V386h16.6v92.9H545V386h38.6v58.2c0 24.2 9.3 34.7 33.5 34.7h15.4v-26.4h-5.9zM734 408.8c-2.1-15.4-14.7-24.7-29.5-24.7-14.7 0-26.9 9-29.9 24.7H734zm-59.7 18.5c2.1 17.6 14.7 27.6 30.7 27.6 12.6 0 22.3-5.9 28-15.4h30.7c-7.1 25.2-29.7 41.3-59.4 41.3-35.9 0-61.1-25.2-61.1-61.1 0-35.9 26.6-61.8 61.8-61.8 35.4 0 61.1 26.1 61.1 61.8 0 2.6-.2 5.2-.7 7.6h-91.1zm282.2-7.8c0-19.2-14.5-34-32.3-34-17.8 0-32.3 14.3-32.3 34 0 19.5 14.5 34 32.3 34 17.8 0 32.3-14.7 32.3-34m-94.1 107.9V360.1h29.2v15.4c8.8-10.9 21.9-17.6 37.5-17.6 32.1 0 57.3 26.4 57.3 61.3s-25.7 61.5-58 61.5c-15 0-27.3-5.9-35.9-15.9v62.5h-30.1zm229.3-107.9c0-20-14.5-34-32.3-34-17.8 0-32.3 14.3-32.3 34 0 19.5 14.5 34 32.3 34 17.8 0 32.3-14 32.3-34m.3 59.4v-15.4c-8.8 10.7-21.9 17.3-37.5 17.3-32.6 0-57.3-26.1-57.3-61.3 0-34.9 25.7-61.5 58-61.5 15.2 0 28 6.7 36.8 17.1v-15h29.2v118.8H1092zM809.7 371.7s7.4-13.8 25.7-13.8c7.8 0 12.8 2.7 12.8 2.7v30.3s-11-6.8-21.1-5.4c-10.1 1.4-16.5 10.6-16.5 23v70.3h-30.2V360.1h29.2v11.6z"></path>
                            </svg>
                            <span className="pay-later-promo-message">or</span>
                            <svg height="24" width="80.52" viewBox="0 0 452.9 101.1" xmlns="http://www.w3.org/2000/svg"
                                 className="promo-logo"
                                 focusable="false" role="img"
                                 aria-labelledby="icon_65653014-fc98-45d6-bdaf-8e86cb4e9335" aria-hidden="false"><title
                                id="icon_65653014-fc98-45d6-bdaf-8e86cb4e9335">Klarna</title>
                                <path
                                    d="M79.7 0H57.4c0 18.3-8.4 35-23 46l-8.8 6.6 34.2 46.6h28.1L56.4 56.3C71.3 41.5 79.7 21.5 79.7 0zM0 0h22.8v99.2H0zm94.5 0H116v99.2H94.5zm210.1 28.7c-8.2 0-16 2.5-21.2 9.6v-7.7H263v68.6h20.7v-36c0-10.4 7-15.5 15.4-15.5 9 0 14.2 5.4 14.2 15.4v36.2h20.5V55.6c0-16-12.7-26.9-29.2-26.9zM181 30.6V35c-5.8-4-12.8-6.3-20.4-6.3-20 0-36.2 16.2-36.2 36.2s16.2 36.2 36.2 36.2c7.6 0 14.6-2.3 20.4-6.3v4.4h20.5V30.6H181zm-18.7 51.9c-10.3 0-18.6-7.9-18.6-17.6s8.3-17.6 18.6-17.6 18.6 7.9 18.6 17.6-8.3 17.6-18.6 17.6zm71-43v-8.9h-21v68.6h21.1v-32c0-10.8 11.7-16.6 19.8-16.6h.2v-20c-8.3 0-16 3.6-20.1 8.9zm164.3-8.9V35c-5.8-4-12.8-6.3-20.4-6.3-20 0-36.2 16.2-36.2 36.2s16.2 36.2 36.2 36.2c7.6 0 14.6-2.3 20.4-6.3v4.4h20.5V30.6h-20.5zm-18.7 51.9c-10.3 0-18.6-7.9-18.6-17.6s8.3-17.6 18.6-17.6 18.6 7.9 18.6 17.6c.1 9.7-8.3 17.6-18.6 17.6zM434 32.6c0-1-.7-1.6-1.8-1.6h-1.9v5.2h.9v-1.9h1l.8 1.9h1l-.9-2.1c.6-.3.9-.8.9-1.5zm-1.8.8h-1v-1.6h1c.6 0 .9.3.9.8s-.2.8-.9.8z"></path>
                                <path
                                    d="M431.9 28.8c-2.7 0-4.9 2.2-4.9 4.9.1 2.7 2.2 4.9 4.9 4.9s4.9-2.2 4.9-4.9-2.2-4.9-4.9-4.9zm0 8.9c-2.2 0-3.9-1.8-3.9-4s1.8-4 3.9-4c2.2 0 3.9 1.8 3.9 4s-1.8 4-3.9 4zm8.1 37.2c-7.1 0-12.9 5.8-12.9 12.9 0 7.1 5.8 12.9 12.9 12.9 7.1 0 12.9-5.8 12.9-12.9 0-7.2-5.8-12.9-12.9-12.9z"></path>
                            </svg>
                        </div>
                        <button className="payment-button checkout-button">
                            <span className="icon-content">
                                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                     className="iconButtonIcon" focusable="false" role="img" aria-hidden="true"><path
                                    d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.69 19.733a3.953 3.953 0 0 1-3.947-3.96 6.2 6.2 0 0 1 .55-2.183c.19-.511.378-1.019.567-1.523.476-1.194.83-2.433 1.06-3.697.157-1 .14-2.227-.623-3-.584-.587-1.487-.703-2.297-.723s-1.713.136-2.297.726c-.763.77-.78 2-.623 3 .23 1.264.585 2.5 1.06 3.694.187.506.376 1.014.567 1.523a6.2 6.2 0 0 1 .55 2.183 3.943 3.943 0 0 1-7.61 1.474 2.573 2.573 0 0 0 3.77-.31c.532-.72.693-1.65.433-2.507-.257-.93-.82-1.667-1.27-2.547-1.463-2.5-1.403-4.37-1.403-4.37 0-3.73 3.56-4.363 6.823-4.363 3.263 0 6.823.633 6.823 4.363 0 0 .06 1.87-1.403 4.37-.45.864-1 1.617-1.27 2.547-.26.857-.1 1.787.433 2.507a2.573 2.573 0 0 0 3.77.31 3.947 3.947 0 0 1-3.663 2.486z"
                                    fill="currentColor"></path></svg>
                                <Link to='/shop/checkout'><span>checkout</span></Link>
                            </span>
                        </button>
                        <div className="orderctas" data-testid="checkout-quickly-with">or checkout quickly with
                        </div>
                        <button className="payment-button paypal-button">
                            <span className="icon-content">
                                <img
                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4"
                                    alt="paypal"/>
                            </span>
                        </button>
                        <div className="edd-panel">
                            <div className="location-line">
                                <svg height="18" width="18" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg"
                                     className="edd-panel_locationIcon__fwLL_" focusable="false" role="img"
                                     aria-hidden="true">
                                    <path
                                        d="M9 20.88a.73.73 0 0 1-.72-.72c0-1.306-1.594-3.149-2.765-4.502l-.355-.452c-1.555-1.824-3.485-4.09-3.485-7.45A7.133 7.133 0 0 1 9 .903a7.133 7.133 0 0 1 7.363 6.855c0 3.36-1.92 5.625-3.485 7.45l-.393.45c-1.171 1.354-2.765 3.197-2.765 4.503a.73.73 0 0 1-.72.72ZM9 2.342a5.693 5.693 0 0 0-5.923 5.415c0 2.803 1.593 4.723 3.139 6.509l.394.45A21.398 21.398 0 0 1 9 17.867a21.398 21.398 0 0 1 2.39-3.15l.394-.45c1.546-1.786 3.14-3.706 3.14-6.51A5.693 5.693 0 0 0 9 2.343Zm0 8.938a3.12 3.12 0 1 1 3.12-3.12A3.13 3.13 0 0 1 9 11.28Zm0-4.8a1.68 1.68 0 1 0 1.68 1.68A1.69 1.69 0 0 0 9 6.48Zm8.4 13.68c0-1.325-1.411-2.438-3.84-3.062a.96.96 0 0 0-1.19.758l-.077.442c2.371.432 3.657 1.286 3.657 1.862 0 .883-2.707 2.16-6.96 2.16-4.252 0-6.95-1.277-6.95-2.16 0-.576 1.286-1.43 3.658-1.862l-.077-.442a.96.96 0 0 0-1.19-.758C2.01 17.722.59 18.835.59 20.16c0 2.362 4.223 3.6 8.4 3.6 4.175 0 8.409-1.238 8.409-3.6Z"
                                        fill="currentColor" fillRule="evenodd"></path>
                                </svg>
                                <span>For delivery dates, enter a<button data-testid="toggle-button"
                                                                         className="toggle-button"
                                                                         type="button" tabIndex="0"><span
                                    className="postal-zip-trans_noTextTransform__VbT9K">postal code</span></button><svg
                                    height="8" width="14" fill="currentColor" stroke="currentColor" viewBox="0 0 14 8"
                                    xmlns="http://www.w3.org/2000/svg" className="toggle-button_arrowDown__78php"
                                    focusable="false" role="img" aria-hidden="true"><path
                                    d="m13 .99-6.47 6.5a.74.74 0 0 1-1.06 0L-1 .99l.35-.35a1 1 0 0 1 1.41 0L6 5.86 11.24.6a1 1 0 0 1 1.41 0z"
                                    fillRule="evenodd" stroke="none"></path></svg></span>
                                <div className="edd-no-location-found">Most orders will arrive in 2-7
                                    business days
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div className="simple-footer">
            <div className="simple-contact">
                <a href="/"
                   className="simple-anchor-anchor simple-anchor-underline" target="_blank">
                    Contact Us</a>
                <a href="/"
                   className="simple-anchor-anchor simple-anchor-underline" target="_blank">
                    Live Chat</a>
                <a href="/"
                   className="simple-anchor-anchor simple-anchor-underline" target="_blank">
                    1.877.263.9300</a>
            </div>
            <div className="simple-legal-menu">
                <div>© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</div>
                <div className="legal-links">
                    <a href="/"
                       className="simple-anchor-underline" target="_blank">
                        Shipping Policy</a>
                    <a href="/"
                       className="simple-anchor-underline" target="_blank">
                        Privacy Policy (Last Updated: 1/23/23)</a>
                    <a href="/"
                       className="simple-anchor-underline" target="_blank">
                        Terms of Use (Last Updated: 10/5/22)</a>
                    <a href="/"
                       className="simple-anchor-underline" target="_blank">
                        Accessibility Statement</a>

                </div>
            </div>
        </div>
    </div>
}