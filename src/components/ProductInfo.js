import "./ProductInfo.scss"
import {Link, useLocation, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchProductInfo,
    getSelectColorId,
    getSelectImgId,
    getSelectSize,
    moveLeft,
    moveRight
} from "../actions/productInfoAction";
import actions from "../actions";
import {productInfoReducer} from "../reducers/productInfoReducer";


export const ProductInfo = () => {


    const dispatch = useDispatch()

    // get initial productID
    const realProductId = useParams().productId


    // get initial colorID
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const colorId = queryParams.get('color')

    // fetch real product information todo uncomment
    useEffect(() => dispatch(fetchProductInfo(realProductId,colorId)),[realProductId])

    // get product data from reducer
    const productInfo = useSelector(state => state?.productInfoReducer?.realProductInfo)
    const productInfoColourArray = productInfo?.rs?.swatches
    const productInfoSizesArray = productInfo?.rs?.sizes[0].details
    const productInfoDetailsArray = productInfo?.rs?.featureTitles

    // set original selected colorID
    useEffect(()=> {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch(getSelectColorId(colorId))
    }, [])

    // set original selected colorID
    useEffect(()=> {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch(getSelectSize())
    }, [realProductId])

    // get selectColorId
    const selectColorId = useSelector(state => state?.productInfoReducer?.selectColorId)

    // get selectSizeId
    const selectSize = useSelector(state => state?.productInfoReducer?.selectSize)
    const singlePrice = parseFloat(productInfo?.rs?.price.match(/\d+/));

    // change url colorId
    const currentUrl = new URL(window.location.href)
    currentUrl.searchParams.set('color', selectColorId)
    window.history.replaceState({}, '', currentUrl)


    // use selectColorId to get object from swatches
    const selectedColorSwatch = productInfo?.rs?.swatches.find((swatch) => swatch?.colorId === selectColorId)

    // use selectColorId to get object from images
    const selectedColorImages = productInfo?.rs?.images.find((image) => image?.colorId === selectColorId)


    // use selectColor to get corresponding pictures
    const getMainCarouselImages = (selectedColorImages) => {
        if (selectedColorImages && selectedColorImages.mainCarousel) {
            return selectedColorImages.mainCarousel.media.split(' | ')
        } else {
            return []
        }
    }
    const mainCarouselImages = getMainCarouselImages(selectedColorImages)
    const mainCarouselImagesLength = mainCarouselImages.length

    // get selectImage id
    const selectImgId = useSelector(state => state?.productInfoReducer?.selectImgId)
    // console.log("selectImgId===>",selectImgId)

    // when color change, set selected image id = 0
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch(getSelectImgId(0))
    },[selectColorId])


    // set carousel first to last / last to first
    const animationRef = useRef()
    const transitionEnd = () => {
        if (selectImgId === -1) {
            animationRef.current.style.transition = 'all 0.001s ease'
            animationRef.current.style.transform = `translateX(${-648.5 -648.5 * (mainCarouselImagesLength - 1)}px)`
            dispatch(getSelectImgId(mainCarouselImagesLength - 1))
        } else if (selectImgId === mainCarouselImagesLength) {
            animationRef.current.style.transition = 'all 0.001s ease'
            dispatch(getSelectImgId(0))
        } else {
            animationRef.current.style.transition = 'all 0.5s ease'
        }
    }

    const scrollToSection = (index) => {
        const targetElement = document.getElementById(`feature${index}`);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        dispatch(actions?.accordionItemAction?.expandItem(index))
        // useEffect(()=>{dispatch(actions?.accordionItemAction?.expandItem(expandIndex))},[expandIndex])
    };

    // expand warning if size isn't chose
    const [isSized, setIsSized] = useState(false);
    const [checkedIsSized,setCheckIsSized] = useState(false);

    const addToBag = () => {
        setCheckIsSized(true);
        addCartObject(productInfo?.rs?.name,selectedColorSwatch?.swatchAlt,selectColorId,selectSize,singlePrice)
        console.log("[ADD]product: {", productInfo?.rs?.name,selectedColorSwatch?.swatchAlt,selectColorId,selectSize,singlePrice,"}");
        // setCookie("shoppingCart", JSON.stringify(shoppingCart), 1);
        const shoppingCart1 = getCookie("shoppingCart");
        console.log("[READ]shoppingCart: ", shoppingCart1);
    }

    // zoom larger images
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomIndex, setZoomIndex] = useState(0);



    let validatedObj;
    // todo:
    // const shoppingCart = getCookie("shoppingCart");

    useEffect(()=> {
        if (getCookie("shoppingCart") === []){
            setCookie("shoppingCart", JSON.stringify([]), 1)
        }
    },[])


    const validateAndAdjustObject = (obj) => {
        // set default value if any attribute is unset
        const defaultObj = {
            "id":null,
            "productName":'',
            "image":'',
            "color":'',
            "size":'',
            "quantity":null,
            "price":'',
        };
        // verify the obj
        validatedObj = {...defaultObj, ...obj};
        return validatedObj;
    }
    const addCartObject =(productName,image,color,size,price) => {
        const shoppingCartTemp = getCookie("shoppingCart");
        if(productName && image && color && size && price){
        const inCart = shoppingCartTemp.find(item=> item.productName === productName && item.color === color && item.size === size && item.price === price);
        if (inCart){
           inCart.quantity += 1;
        }
        else{
            const adjustedObj = validateAndAdjustObject({
                "id":realProductId,
                "productName":productName,
                "image":image,
                "color":color,
                "size":size,
                "quantity":1,
                "price":price,
            });
            shoppingCartTemp.push(adjustedObj);
        }}
        setCookie("shoppingCart", JSON.stringify(shoppingCartTemp), 1);
    }

    const deleteCartObject = (id,productName,image,color,size) => {
        const shoppingCartTemp = getCookie("shoppingCart");
        const inCart = shoppingCartTemp.find(item=> item.productName === productName && item.color === color && item.size === size);
        if (inCart){
            shoppingCartTemp.filter(item=> item.productName !== productName && item.color !== color && item.size !== size)
        }
        else{
            console.log('Object is not in the shopping cart')
        }
    }

    // set cookie
    const setCookie = (name, value, days) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    // read cookie
    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            console.log("name: ",cookieName)
            console.log("value:", cookieValue)
            if (cookieName === name) {
                return JSON.parse(cookieValue);
            }
        }
        return [];
    }

    // show shopCart
    const [isShown,setShowShopCart] = useState(false);

    // get cookie information
    const userShopCart = getCookie("shoppingCart");
    console.log("shopCart",userShopCart);

    // calculate quantity
    let totalQuantity = 0;
    for (let i = 0; i < userShopCart.length; i++) {
        totalQuantity += userShopCart[i].quantity;
    }
    console.log("Total Quantity:", totalQuantity);



    return <div className="product-info">
        <div className="product-image-carousel">

            <div className="product-image-carousel_big-image-container">
                <a href={`#zoom${zoomIndex}`}>
                <div className="product-image-carousel_big-image-container_pictures">
                    <div className="product-image-carousel_big-image-container_pictures_holder"
                        ref={animationRef}
                        style={{
                            // transform: `translateX(${-648.5 -648.5* selectImgId}px)`,
                            transform: `translateX(${-593 -593* selectImgId}px)`,
                            transition: 'all 0.5s ease'}}
                            onTransitionEnd={transitionEnd}
                    >
                        <img src={mainCarouselImages[mainCarouselImagesLength-1]} alt="" className={`big-picture -1`}/>
                        {mainCarouselImages?.map((item,index)=>
                            <img key={index} src={item} alt="" className={`big-picture ${index}`}
                            onClick={()=>{setIsZoomed(true);setZoomIndex(index)}}
                            />
                        )}
                        <img src={mainCarouselImages[0]} alt="" className={`big-picture ${mainCarouselImagesLength}`}/>
                    </div>
                </div>
                </a>
                <button type="button" className="button-left"
                        data-testid="carousel-button-left" aria-label="Previous Slide"
                        onClick={() => dispatch(moveLeft(selectImgId, mainCarouselImagesLength))}
                >
                    <svg height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                         focusable="false" role="img" aria-hidden="true">
                        <path
                            d="M11 15 4.54 8.53a.74.74 0 0 1 0-1.06L11 1l.35.35a1 1 0 0 1 0 1.41L6.13 8l5.26 5.24a1 1 0 0 1 0 1.41L11 15Z"
                            fill="currentColor" ></path>
                    </svg>
                </button>
                <button type="button" className="button-right"
                        data-testid="carousel-button-right" aria-label="Next Slide"
                        onClick={() => dispatch(moveRight(selectImgId, mainCarouselImagesLength))}
                >
                    <svg height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                         focusable="false" role="img" aria-hidden="true">
                        <path
                            d="m5 15 6.5-6.47a.74.74 0 0 0 0-1.06L5 1l-.35.35a1 1 0 0 0 0 1.41L9.87 8l-5.26 5.24a1 1 0 0 0 0 1.41L5 15Z"
                            fill="currentColor" ></path>
                    </svg>
                </button>

                <button type="button" data-testid="zoom-button" aria-label="Click to Zoom Image"
                        className="zoomButton" data-lulu-track="" tabIndex="0" onClick={()=>setIsZoomed(true)}><img
                    className="product-media-carousel_zoomIcon____qZ1"
                    src="https://shop.lululemon.com/static/ecom-web-app/_next/static/images/sprite-7973d6.svg#zoom-usage"
                    title="Click to Zoom Image" aria-label="Click to Zoom Image" alt=''/></button>

            </div>

            <div className="product-image-carousel_small-image-select">
                {mainCarouselImages?.map((item,index)=>
                    <div key={index} className={`product-image-carousel_small-image-select_container${selectImgId === index? "_selected" : ""}`}>
                        <img src={item} alt=""
                             className={`product-image-carousel_small-image-select_container_small-picture ${index}`}
                             onClick={()=>dispatch(getSelectImgId(index))}
                        />
                    </div>
                )}
            </div>
            <div className="product-image-carousel_model-info">Lizzy is 5’9" and wears a size 6</div>

        </div>

        <div className="product-summary">
            <div className="product-summary_container" >
                <div className="product-summary_container_belongs">
                    <ul className="product-summary_container_belongs_container">
                        <li>
                            <a href="" data-slash="/">Clothes</a>
                        </li>
                        <li>
                            <a href="">{productInfo?.rs?.name}</a>
                        </li>
                    </ul>
                </div>

                <div className="product-summary_container_name">{productInfo?.rs?.name}</div>

                <div className="product-summary_container_price">{productInfo?.rs?.price}</div>

                <div className="product-summary_container_colours" >
                    <div className="product-summary_container_colours_head">
                        Colour
                        <div className="product-summary_container_colours_head_colour-name">{selectedColorSwatch?.swatchAlt}</div>
                    </div>
                    <div className="product-summary_container_colours_colour-render">
                        {productInfoColourArray?.map((item,index)=>
                            <div key={index}
                                 className={`product-summary_container_colours_colour-render_image-container ${item.colorId} ${selectColorId === item.colorId ? "selected" : "unselected"}`}
                                 onClick={()=>dispatch(getSelectColorId(item.colorId))}>
                                <img key={index} className={`img-select ${item.colorId}`} src={item.swatch} alt={item.swatchAlt}/>
                            </div>
                        )}
                    </div>
                </div>

                {/*check if size has been set*/}
                <div className="product-summary_container_unsized"
                    style={{display:isSized?'none':(checkedIsSized?'flex':'none')}}>
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                         className="iconBlock-1wZMf" focusable="false" role="img" aria-hidden="true">
                        <g fill="none" fillRule="evenodd">
                            <path
                                d="M13.17 17.15a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0zM10.893 6.138c.347-.086 1.51-.204 1.79-.033a.984.984 0 0 1 .457.776l.09 7.95c-.347.086-1.64.207-1.92.036a.984.984 0 0 1-.457-.776z"
                                fill="currentColor"></path>
                            <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2"></circle>
                        </g>
                    </svg>
                    <span>Please select a size.</span>
                </div>

                <div className="product-summary_container_sizes">
                    <div className="product-summary_container_sizes_head">
                        <div className="product-summary_container_sizes_head_left">
                            Size
                            <span>{selectSize}</span>
                        </div>

                        <div className="product-summary_container_sizes_head_size-guide">
                            Size Guide
                        </div>
                    </div>
                    <div className="product-summary_container_sizes_size-render">
                        {productInfoSizesArray?.map((item,index)=>
                            <div key={index}
                                 className={`size-container${selectSize === item ? "_selected" : ""}`}
                                 onClick={()=>{dispatch(getSelectSize(item));setIsSized(true);}}
                            >
                                {item}
                            </div>
                        )}
                    </div>
                </div>
                <div className="product-summary_container_shopit">
                    <div className="product-summary_container_shopit_tome">
                        <div className="product-summary_container_shopit_tome_head">
                            <div className="product-summary_container_shopit_tome_head_icon"></div>
                            Ship it to me
                        </div>
                        <div className="product-summary_container_shopit_tome_des">
                            Free shipping and returns
                        </div>
                    </div>
                    <div className="product-summary_container_shopit_pickup">
                        <div className="product-summary_container_shopit_pickup_left">
                            <svg height="24" width="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                                 className="accordionItemHeadingIcon-3fkWR" focusable="false" role="img"
                                 aria-hidden="true">
                                <path
                                    d="M14.667 14.167h-.834v-8.62l.667.246a.5.5 0 0 0 .667-.46V2.667a.5.5 0 0 0-.307-.46 17.68 17.68 0 0 0-13.72 0 .5.5 0 0 0-.307.46v2.666a.5.5 0 0 0 .667.46s.667-.253.667-.246v8.62h-.834a.667.667 0 0 0-.666.666v.334h14.666v-.334a.667.667 0 0 0-.666-.666Zm-8.834 0V9.833H7.5v4.334H5.833Zm3.667 0h-1V9.833h1.667v4.334H9.5Zm3.333 0h-1.666V9.333a.507.507 0 0 0-.5-.5H5.333a.507.507 0 0 0-.5.5v4.834H3.167V5.213a17.393 17.393 0 0 1 9.666 0v8.954Zm-11-9.567V3a17.18 17.18 0 0 1 12.334 0v1.6a18.147 18.147 0 0 0-12.334 0Z"
                                    fill="currentColor"></path>
                            </svg>
                            Pick up in-store
                        </div>
                        <div className="product-summary_container_shopit_pickup_right">
                            +
                        </div>
                    </div>
                    <div className="product-summary_container_shopit_addtobag">
                        <div className="product-summary_container_shopit_addtobag_button"
                             onClick={()=>{!isSized&&setIsSized(false);addToBag();isSized&&setShowShopCart(true)}}>
                            ADD TO BAG
                        </div>
                        <div className="product-summary_container_shopit_addtobag_link">
                            Check All Store Inventory
                        </div>
                    </div>
                </div>

                <div className="shopbag-dialog"
                     style={{display:isShown && isSized ?'block':'none'}}>
                    <div className="shopbag-dialog_background"
                         onClick={()=>{setShowShopCart(false)}}>
                    </div>

                    <div className="shopbag-dialog_container">
                        <div className="shopbag-dialog_container_productpage">
                            <div className="shopbag-dialog_container_productpage_upper">
                                <div className="shopbag-dialog_container_productpage_upper_left">
                                    <h2>Nice Pick!</h2>
                                    <svg height="32" width="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                         className="bag-icon" focusable="false" role="img" aria-hidden="true">
                                        <path
                                            d="M20 6.25h-3.25c-.68-3.62-2.53-6-4.75-6s-4.07 2.38-4.75 6H4a.76.76 0 0 0-.75.75v12A4.75 4.75 0 0 0 8 23.75h8A4.75 4.75 0 0 0 20.75 19V7a.76.76 0 0 0-.75-.75zm-8-4.5c1.38 0 2.66 1.84 3.22 4.5H8.78c.56-2.66 1.84-4.5 3.22-4.5zM19.25 19A3.26 3.26 0 0 1 16 22.25H8A3.26 3.26 0 0 1 4.75 19V7.75H7l-.24 2.16.49.06a1 1 0 0 0 1.12-.87l.17-1.35h6.92l.17 1.35a1 1 0 0 0 1.12.87l.49-.06L17 7.75h2.28L19.25 19z"
                                            fill="currentColor" fill-rule="evenodd"></path>
                                    </svg>
                                    <div className="shopbag-dialog_container_productpage_upper_left_allitemnum">{`${totalQuantity} ${totalQuantity > 1 ? "Items" : "Item"}`}</div>
                                </div>
                                <img className="shopbag-dialog_container_productpage_upper_right_button"
                                     src="https://shop.lululemon.com/static/ecom-web-app/_next/static/images/sprite-7973d6.svg#close-nav-usage"
                                     title="Close"
                                     onClick={()=>{setShowShopCart(false)}}
                                />
                            </div>

                            <div className="shopbag-dialog_container_productpage_main">
                                <div className="shopbag-dialog_container_productpage_main_left">
                                    <img className="shopbag-dialog_container_productpage_main_left_picture" src={mainCarouselImages[0]} alt=""/>
                                    <div className="shopbag-dialog_container_productpage_main_left_itemInfo">
                                        <div className="shopbag-dialog_container_productpage_main_left_itemInfo_name">{productInfo?.rs?.name}</div>
                                        <div className="shopbag-dialog_container_productpage_main_left_itemInfo_size">{`Size: ${selectSize}`}</div>
                                        <div className="shopbag-dialog_container_productpage_main_left_itemInfo_price">{productInfo?.rs?.price}</div>
                                    </div>
                                </div>
                                <div className="shopbag-dialog_container_productpage_main_right">
                                    <div className="shopbag-dialog_container_productpage_main_right_subtotal">
                                        <span className="shopbag-dialog_container_productpage_main_right_subtotal_text">Subtotal</span>
                                        <span className="shopbag-dialog_container_productpage_main_right_subtotal_price">{productInfo?.rs?.price}</span>
                                    </div>
                                    <Link to="/shop/mybag">
                                        <div className="shopbag-dialog_container_productpage_main_right_button">VIEW BAG & CHECKOUT</div></Link>
                                    <div
                                        className="shopbag-dialog_container_productpage_main_right_continueshop"
                                        onClick={()=>{setShowShopCart(false)}}
                                    >
                                        CONTINUE SHOPPING
                                        <svg height="16" width="16" viewBox="0 0 16 16"
                                             xmlns="http://www.w3.org/2000/svg" className="icon-wkjLc" focusable="false"
                                             role="img" aria-hidden="true">
                                            <path
                                                d="m10.53 2.47 5 5a.75.75 0 0 1 .01 1.04l-5 5-.35-.35a1 1 0 0 1 0-1.42l3-3H5a1 1 0 0 1-1-1v-.5h9.18l-3-3a1 1 0 0 1 0-1.42l.35-.35ZM2 7.25a1 1 0 0 1 1 1v.5H1a1 1 0 0 1-1-1v-.5Z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>




                </div>

                <div className="product-summary_container_available">
                    <span>4 payments of $32.00 available with</span>
                    <svg height="24" width="124.87" viewBox="360.6 308.93 1148.88 220.83"
                         className="afterpayIcon" focusable="false" role="img"
                         aria-hidden="false" aria-label="afterpay">
                        <path
                            d="m1492 353.5-34.6-19.8-35.1-20.1c-23.2-13.3-52.2 3.4-52.2 30.2v4.5c0 2.5 1.3 4.8 3.5 6l16.3 9.3c4.5 2.6 10.1-.7 10.1-5.9V347c0-5.3 5.7-8.6 10.3-6l32 18.4 31.9 18.3c4.6 2.6 4.6 9.3 0 11.9l-31.9 18.3-32 18.4c-4.6 2.6-10.3-.7-10.3-6V415c0-26.8-29-43.6-52.2-30.2l-35.1 20.1-34.6 19.8c-23.3 13.4-23.3 47.1 0 60.5l34.6 19.8 35.1 20.1c23.2 13.3 52.2-3.4 52.2-30.2v-4.5c0-2.5-1.3-4.8-3.5-6l-16.3-9.3c-4.5-2.6-10.1.7-10.1 5.9v10.7c0 5.3-5.7 8.6-10.3 6l-32-18.4-31.9-18.3c-4.6-2.6-4.6-9.3 0-11.9l31.9-18.3 32-18.4c4.6-2.6 10.3.7 10.3 6v5.3c0 26.8 29 43.6 52.2 30.2l35.1-20.1L1492 414c23.3-13.5 23.3-47.1 0-60.5zm-227 6.6-81 167.3h-33.6l30.3-62.5-47.7-104.8h34.5l30.6 70.2 33.4-70.2h33.5zm-809.9 59.4c0-20-14.5-34-32.3-34s-32.3 14.3-32.3 34c0 19.5 14.5 34 32.3 34s32.3-14 32.3-34m.3 59.4v-15.4c-8.8 10.7-21.9 17.3-37.5 17.3-32.6 0-57.3-26.1-57.3-61.3 0-34.9 25.7-61.5 58-61.5 15.2 0 28 6.7 36.8 17.1v-15h29.2v118.8h-29.2zm171.2-26.4c-10.2 0-13.1-3.8-13.1-13.8V386h18.8v-25.9h-18.8v-29h-29.9v29H545v-11.8c0-10 3.8-13.8 14.3-13.8h6.6v-23h-14.4c-24.7 0-36.4 8.1-36.4 32.8v15.9h-16.6V386h16.6v92.9H545V386h38.6v58.2c0 24.2 9.3 34.7 33.5 34.7h15.4v-26.4h-5.9zM734 408.8c-2.1-15.4-14.7-24.7-29.5-24.7-14.7 0-26.9 9-29.9 24.7H734zm-59.7 18.5c2.1 17.6 14.7 27.6 30.7 27.6 12.6 0 22.3-5.9 28-15.4h30.7c-7.1 25.2-29.7 41.3-59.4 41.3-35.9 0-61.1-25.2-61.1-61.1 0-35.9 26.6-61.8 61.8-61.8 35.4 0 61.1 26.1 61.1 61.8 0 2.6-.2 5.2-.7 7.6h-91.1zm282.2-7.8c0-19.2-14.5-34-32.3-34-17.8 0-32.3 14.3-32.3 34 0 19.5 14.5 34 32.3 34 17.8 0 32.3-14.7 32.3-34m-94.1 107.9V360.1h29.2v15.4c8.8-10.9 21.9-17.6 37.5-17.6 32.1 0 57.3 26.4 57.3 61.3s-25.7 61.5-58 61.5c-15 0-27.3-5.9-35.9-15.9v62.5h-30.1zm229.3-107.9c0-20-14.5-34-32.3-34-17.8 0-32.3 14.3-32.3 34 0 19.5 14.5 34 32.3 34 17.8 0 32.3-14 32.3-34m.3 59.4v-15.4c-8.8 10.7-21.9 17.3-37.5 17.3-32.6 0-57.3-26.1-57.3-61.3 0-34.9 25.7-61.5 58-61.5 15.2 0 28 6.7 36.8 17.1v-15h29.2v118.8H1092zM809.7 371.7s7.4-13.8 25.7-13.8c7.8 0 12.8 2.7 12.8 2.7v30.3s-11-6.8-21.1-5.4c-10.1 1.4-16.5 10.6-16.5 23v70.3h-30.2V360.1h29.2v11.6z"></path>
                    </svg>
                    <span>or</span>
                    <svg height="24" width="107.52" viewBox="0 0 452.9 101.1" xmlns="http://www.w3.org/2000/svg"
                         className="klarnaIcon" focusable="false" role="img"
                         aria-hidden="false" aria-label="klarna">
                        <path
                            d="M79.7 0H57.4c0 18.3-8.4 35-23 46l-8.8 6.6 34.2 46.6h28.1L56.4 56.3C71.3 41.5 79.7 21.5 79.7 0zM0 0h22.8v99.2H0zm94.5 0H116v99.2H94.5zm210.1 28.7c-8.2 0-16 2.5-21.2 9.6v-7.7H263v68.6h20.7v-36c0-10.4 7-15.5 15.4-15.5 9 0 14.2 5.4 14.2 15.4v36.2h20.5V55.6c0-16-12.7-26.9-29.2-26.9zM181 30.6V35c-5.8-4-12.8-6.3-20.4-6.3-20 0-36.2 16.2-36.2 36.2s16.2 36.2 36.2 36.2c7.6 0 14.6-2.3 20.4-6.3v4.4h20.5V30.6H181zm-18.7 51.9c-10.3 0-18.6-7.9-18.6-17.6s8.3-17.6 18.6-17.6 18.6 7.9 18.6 17.6-8.3 17.6-18.6 17.6zm71-43v-8.9h-21v68.6h21.1v-32c0-10.8 11.7-16.6 19.8-16.6h.2v-20c-8.3 0-16 3.6-20.1 8.9zm164.3-8.9V35c-5.8-4-12.8-6.3-20.4-6.3-20 0-36.2 16.2-36.2 36.2s16.2 36.2 36.2 36.2c7.6 0 14.6-2.3 20.4-6.3v4.4h20.5V30.6h-20.5zm-18.7 51.9c-10.3 0-18.6-7.9-18.6-17.6s8.3-17.6 18.6-17.6 18.6 7.9 18.6 17.6c.1 9.7-8.3 17.6-18.6 17.6zM434 32.6c0-1-.7-1.6-1.8-1.6h-1.9v5.2h.9v-1.9h1l.8 1.9h1l-.9-2.1c.6-.3.9-.8.9-1.5zm-1.8.8h-1v-1.6h1c.6 0 .9.3.9.8s-.2.8-.9.8z"></path>
                        <path
                            d="M431.9 28.8c-2.7 0-4.9 2.2-4.9 4.9.1 2.7 2.2 4.9 4.9 4.9s4.9-2.2 4.9-4.9-2.2-4.9-4.9-4.9zm0 8.9c-2.2 0-3.9-1.8-3.9-4s1.8-4 3.9-4c2.2 0 3.9 1.8 3.9 4s-1.8 4-3.9 4zm8.1 37.2c-7.1 0-12.9 5.8-12.9 12.9 0 7.1 5.8 12.9 12.9 12.9 7.1 0 12.9-5.8 12.9-12.9 0-7.2-5.8-12.9-12.9-12.9z"></path>
                    </svg>
                </div>

                <div className="product-summary_container_SKU">0001 | SKU: 145452205</div>

                <div className="product-summary_container_wishlist-review">
                    <div className="product-summary_container_wishlist-review_left">
                        <svg height="21" width="24" viewBox="0 0 24 21" xmlns="http://www.w3.org/2000/svg" className="icon wishlist-icon" focusable="false" role="img" aria-labelledby="icon_:rl3:" aria-hidden="false" style={{ width: '24px', height: '24px' }}>
                            <title id="icon_:rl3:">Add to Wish List</title>
                            <path d="M12 20.75a.72.72 0 0 1-.42-.13c-.32-.21-7.79-5.27-10.24-9.76C-.12 8.18-.45 4.4 2.09 2a6.48 6.48 0 0 1 8.82 0L12 3l1.08-1a6.48 6.48 0 0 1 8.82 0c2.54 2.41 2.21 6.19.75 8.87-2.45 4.49-9.9 9.55-10.22 9.76a.72.72 0 0 1-.43.12zm-5.5-19a4.89 4.89 0 0 0-3.37 1.32c-2 1.87-1.66 4.9-.47 7.07 2 3.59 7.73 7.82 9.34 9 1.6-1.14 7.36-5.36 9.32-8.95 1.28-2.34 1.54-5.68-1-7.49a5.07 5.07 0 0 0-6.32.52l-.88.84 1.45 1.4-.35.36a1 1 0 0 1-1.41 0L9.87 3.07A4.89 4.89 0 0 0 6.5 1.75z" fill="currentColor" ></path>
                        </svg>
                        <span>Add to Wish List</span>
                    </div>
                    <div className="product-summary_container_wishlist-review_right">
                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                             className="icon reviews-icon" focusable="false" role="img" aria-labelledby="icon_:rl4:"
                             aria-hidden="false"><title id="icon_:rl4:">Reviews</title>
                            <path
                                d="M22.4 11.4c.4-.4.6-1 .6-1.5s-.2-1-.5-1.4c-.3-.4-.8-.7-1.3-.8L16.4 7c-.2 0-.3-.2-.4-.3l-2.1-4.5C13.5 1.4 12.7 1 12 1c-.8 0-1.5.4-1.9 1.2L8 6.7c-.1.2-.3.3-.4.4l-4.8.7c-.6.1-1 .4-1.3.8-.3.3-.5.8-.5 1.3s.2 1.1.6 1.5L5 14.9c.1.1.2.3.2.5v.1l-.8 4.9v.4c0 1.2 1 2.1 2.1 2.1.3 0 .7-.1 1-.3l4.3-2.3.3-.1.3.1 4.3 2.3c.3.2.7.3 1 .3 1.1 0 2.1-.9 2.1-2.1v-.4l-.8-4.9v-.1c0-.2.1-.4.2-.5l3.2-3.5zm-5.1 4.4.8 4.9v.1c0 .2-.1.3-.2.5-.1.1-.3.2-.4.2-.1 0-.2 0-.3-.1L13 19.1c-.3-.2-.6-.2-1-.2-.3 0-.7.1-1 .2l-4.3 2.3c-.1.1-.2.1-.3.1-.1 0-.3-.1-.4-.2-.1-.1-.2-.3-.2-.5v-.1l.8-4.9v-.4c0-.6-.2-1.1-.6-1.5l-3.5-3.5c-.1-.1-.2-.3-.2-.5s.1-.3.2-.4c.2-.1.4-.2.5-.2l4.8-.7c.7-.2 1.3-.6 1.6-1.2l2.1-4.5c.1-.3.3-.3.5-.3s.4.1.5.3l2.1 4.5c.4.6.9 1 1.6 1.1l4.8.8c.2 0 .3.1.4.2.1.1.1.3.1.4 0 .2-.1.3-.2.5l-3.4 3.5c-.4.4-.6 1-.6 1.5-.1.1 0 .3 0 .4z"
                                fill="currentColor"></path>
                        </svg>
                        <span>Reviews (4629)</span>
                    </div>
                </div>

                <div className="product-summary_container_details">
                    <div className="product-summary_container_details_head">Details</div>
                    <div className="product-summary_container_details_details-render">
                        {productInfoDetailsArray?.map((item,index) =>
                            <div key={index} className="product-summary_container_details_details-render_container">

                                <img className="product-summary_container_details_details-render_container_icon"
                                     src={item.iconPath}
                                     aria-hidden="true"/>
                                <a href={`#feature${index}`} onClick={()=>scrollToSection(index)}><span>{item.title}</span></a>
                            </div>)}
                    </div>
                </div>

                <div className="product-summary_container_question">
                    <div className="product-summary_container_question_left">
                        <div className="product-summary_container_question_left_head">
                            Questions? Bring them on (all of them)
                        </div>
                        <div className="product-summary_container_question_left_des">
                            Virtual shop with one of our educators
                        </div>
                    </div>
                    <div className="product-summary_container_question_right">
                        <svg height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                             className="icon-wkjLc" focusable="false" role="img" aria-hidden="true">
                            <path
                                d="m10.53 2.47 5 5a.75.75 0 0 1 .01 1.04l-5 5-.35-.35a1 1 0 0 1 0-1.42l3-3H5a1 1 0 0 1-1-1v-.5h9.18l-3-3a1 1 0 0 1 0-1.42l.35-.35ZM2 7.25a1 1 0 0 1 1 1v.5H1a1 1 0 0 1-1-1v-.5Z"
                                fill="currentColor">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        {
            // imageCarousel?
            <div className="signposting">
                <div className="signposting_container">
                    <div className="signposting_wrapper">
                        <div>
                            <h3 className="signposting_title">{productInfo?.rs?.name}</h3>
                        </div>
                        <div className="signposting_rightSide">
                            <span className="signposting_rightSideLabel_colour">Colour:&nbsp;</span>
                            <img className="signposting_rightSideLabel_colour_picture" src={selectedColorSwatch?.swatch} alt=""/>
                            { selectSize ? (
                                <React.Fragment>
                                    <span className="signposting_rightSideLabel">Size:&nbsp;</span>
                                    <span className="signposting_rightSideValue">{selectSize}</span>
                                    <button className="signposting_actionButton"
                                            onClick={()=>{!isSized&&setIsSized(false);
                                                addToBag()}}>ADD TO BAG</button>
                                </React.Fragment>
                            ) : (
                                <button className="signposting_actionButton"
                                                      onClick={()=>{setCheckIsSized(true);
                                                          document.body.scrollTop = 0;
                                                          document.documentElement.scrollTop = 0;
                                                      }}
                                >SELECT SIZE</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            // :
            // <div></div>
        }

        <div className="image-carousel_zoom"
             style={{display:isZoomed?'block':'none'}}
        >
            <div className="image-carousel_zoom_title">
                <div className="image-carousel_zoom_title_backBtn"
                     onClick={()=>setIsZoomed(false)}
                >
                    <svg height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                         className="zoom-modal_zoomModalButtonCloseIcon__lPg76" focusable="false" role="img"
                         aria-hidden="true">
                        <path
                            d="M11 15 4.54 8.53a.74.74 0 0 1 0-1.06L11 1l.35.35a1 1 0 0 1 0 1.41L6.13 8l5.26 5.24a1 1 0 0 1 0 1.41L11 15Z"
                            fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                    <span>Back to Product</span>
                </div>
                <div className="image-carousel_zoom_title_name">{productInfo?.rs?.name}</div>
                <div className="image-carousel_zoom_title_closeBtn"
                     onClick={()=>setIsZoomed(false)}
                >
                    <img className="svg-icon"
                         src="https://shop.lululemon.com/static/ecom-web-app/_next/static/images/sprite-7973d6.svg#close-nav-usage"
                         title="Close" alt='Close'/>
                </div>

            </div>
            <div className="image-carousel_zoom_images">
                {mainCarouselImages?.map((item,index)=>
                        <img src={item} key={index} alt=""
                             className={`image-carousel_zoom_images_image`}
                             onClick={()=>setIsZoomed(false)}
                             id={`zoom${index}`}
                        />
                )}
            </div>
        </div>
    </div>
}

