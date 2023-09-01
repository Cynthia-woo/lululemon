import "./Navigator.scss"
import {useEffect, useState} from "react";
import {menuMouseHover} from "../actions/headerActions";
import {useDispatch, useSelector} from "react-redux";
import React from 'react';
import {useLocation, useParams} from "react-router-dom";

export const Navigator = () => {

    const productInfo = useSelector(state => state?.productInfoReducer?.realProductInfo)
    const selectSize = useSelector(state => state?.productInfoReducer?.selectSize)
    const selectColorId = useSelector(state => state?.productInfoReducer?.selectColorId)
    const selectedColorSwatch = productInfo?.rs?.swatches.find((swatch) => swatch?.colorId === selectColorId)
    let signposting = document.querySelector('.signposting_container');


    let imageCarousel = document.querySelector('.product-image-carousel');
    // if (imageCarousel && signposting) {
    //     window.addEventListener('scroll', function () {
    //         let floatingDiv = document.querySelector('.nav-desktop');
    //         let floatingMenu = document.querySelector('.nav-details');
    //         let signposting = document.querySelector('.signposting_container');
    //         let scrollTop = window.scrollY || document.documentElement.scrollTop;
    //
    //         if ( scrollTop < 72) {
    //             floatingDiv.style.position = "static";
    //             floatingDiv.style.top = "72px";
    //             floatingMenu.style.position = "fixed";
    //             floatingMenu.style.top = "145px";
    //             signposting.style.top = "-70px";
    //         } else if (scrollTop >= 72 && scrollTop < 800) {
    //             floatingDiv.style.position = "fixed";
    //             floatingDiv.style.top = '0';
    //             floatingMenu.style.position = "fixed";
    //             floatingMenu.style.top = '76px';
    //             signposting.style.top = "-70px";
    //         } else if (scrollTop >= 800 && scrollTop <= 876) {
    //             floatingDiv.style.position = "fixed";
    //             floatingDiv.style.top = '0';
    //             floatingMenu.style.position = "fixed";
    //             floatingMenu.style.top = '76px';
    //             signposting.style.top = "76px";
    //         } else {
    //             floatingDiv.style.position = "static";
    //             floatingMenu.style.position = 'fixed';
    //             signposting.style.top = "0";
    //             floatingMenu.style.top = signposting ? '65px' : '0';
    //         }
    //
    //         if (scrollTop >= 72 && scrollTop <= 850) {
    //             imageCarousel.style.position = "static";
    //             imageCarousel.style.transform = `translateY(${0.35 * scrollTop - 72}px)`;
    //         } else if (scrollTop < 72) {
    //             imageCarousel.style.transform = `translateY(0)`;
    //         } else if (scrollTop > 850 && scrollTop <= 1200) {
    //             imageCarousel.style.transform = `translateY(220px)`;
    //         }
    //     });
    // }


    const dispatch = useDispatch()

    const [promo, updatePromo] = useState(true)
    const [navDetails, updateNavDetails] = useState("")
    const [menuHeight, updateMenuHeight] = useState({height: "0px"})
    const HandleMouseEnter = (opt) => {
        console.log("function")
        updateMenuHeight({height: "425px"})
        dispatch(menuMouseHover(true))
        updateNavDetails(opt)
    }

    const HandleMouseLeave = () => {
        // console.log("exit")
        updateMenuHeight({height: "0px"})
        dispatch(menuMouseHover(false))
        updateNavDetails("")
    }

    const NaviDetails = () => {
        switch (navDetails) {
            case "women":
                return <WomenDetails/>
            case "men":
                return <MenDetails/>
            default:
                return <></>
        }
    }

    const WomenDetails = () => {
        return <>
            <div className="nav-details-inner">
                <div className="main-detail-warpper">
                    <ul className="unorderedList mainDetail">
                        <li>
                            <button>
                                What's New
                            </button>
                        </li>
                        <li>
                            <button>
                                Bestsellers
                            </button>
                        </li>
                        <li>
                            <button>
                                Align Shop
                            </button>
                        </li>
                        <li>
                            <button>
                                Back to School
                            </button>
                        </li>
                        <li>
                            <button>
                                Matching Sets
                            </button>
                        </li>
                        <li>
                            <button>
                                Pink Clothes Shop
                            </button>
                        </li>
                        <li>
                            <button>
                                Summer Clothes Shop
                            </button>
                        </li>
                        <li>
                            <button>
                                Plus Size Clothes
                            </button>
                        </li>
                        <li>
                            <button>
                                We Made Too Much
                            </button>
                        </li>
                    </ul>
                    <ul className="unorderedList mainDetail">
                        <li>
                            <a href="/en-ca/c/women/_/N-7z5"
                               className="anchor-anchor detail">Women's Clothes
                                <svg height="16" width="16" viewBox="0 0 16 16"
                                     xmlns="http://www.w3.org/2000/svg" focusable="false" role="img"
                                     aria-labelledby="icon_:rj4:" aria-hidden="false"><title
                                    id="icon_:rj4:">rightLinkArrowIcon</title>
                                    <path
                                        d="m10.53 2.47 5 5a.75.75 0 0 1 .01 1.04l-5 5-.35-.35a1 1 0 0 1 0-1.42l3-3H5a1 1 0 0 1-1-1v-.5h9.18l-3-3a1 1 0 0 1 0-1.42l.35-.35ZM2 7.25a1 1 0 0 1 1 1v.5H1a1 1 0 0 1-1-1v-.5Z"
                                        fill="currentColor" fillRule="evenodd"></path>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <button>
                                Short
                            </button>
                        </li>
                        <li>
                            <button>
                                Capris
                            </button>
                        </li>
                        <li>
                            <button>
                                Coats & Jackets
                            </button>
                        </li>
                        <li>
                            <button>
                                Dresses
                            </button>
                        </li>
                        <li>
                            <button>
                                Hoodies & Sweatshirts
                            </button>
                        </li>
                        <li>
                            <button>
                                Leggings
                            </button>
                        </li>
                        <li>
                            <button>
                                Pants
                            </button>
                        </li>
                        <li>
                            <button>
                                Shirts
                            </button>
                        </li>
                    </ul>
                    <ul className="unorderedList mainDetail">
                        <li>
                        </li>
                        <li>
                            <button>
                                Shoes
                            </button>
                        </li>
                        <li>
                            <button>
                                Skirts
                            </button>
                        </li>
                        <li>
                            <button>
                                Socks
                            </button>
                        </li>
                        <li>
                            <button>
                                Sport Bras
                            </button>
                        </li>
                        <li>
                            <button>
                                Sweaters
                            </button>
                        </li>
                        <li>
                            <button>
                                Swimsuits
                            </button>
                        </li>
                        <li>
                            <button>
                                Tank Tops
                            </button>
                        </li>
                        <li>
                            <button>
                                Underwear
                            </button>
                        </li>
                    </ul>
                    <ul className="unorderedList mainDetail">
                        <li>
                            <a href="https://shop.lululemon.com/en-ca/c/accessories/_/N-1z0xcuuZ8ok"
                               className="anchor-anchor detail">Accessories
                                <svg height="16" width="16" viewBox="0 0 16 16"
                                     xmlns="http://www.w3.org/2000/svg" focusable="false" role="img"
                                     aria-labelledby="icon_:rj4:" aria-hidden="false"><title
                                    id="icon_:rj4:">rightLinkArrowIcon</title>
                                    <path
                                        d="m10.53 2.47 5 5a.75.75 0 0 1 .01 1.04l-5 5-.35-.35a1 1 0 0 1 0-1.42l3-3H5a1 1 0 0 1-1-1v-.5h9.18l-3-3a1 1 0 0 1 0-1.42l.35-.35ZM2 7.25a1 1 0 0 1 1 1v.5H1a1 1 0 0 1-1-1v-.5Z"
                                        fill="currentColor" fillRule="evenodd"></path>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <button>
                                Belt Bags
                            </button>
                        </li>
                        <li>
                            <button>
                                Backpacks
                            </button>
                        </li>
                        <li>
                            <button>
                                Bags
                            </button>
                        </li>
                        <li>
                            <button>
                                Crossbody Bags
                            </button>
                        </li>
                        <li>
                            <button>
                                Hair Accessories
                            </button>
                        </li>
                        <li>
                            <button>
                                Hats
                            </button>
                        </li>
                        <li>
                            <button>
                                Water Bottles
                            </button>
                        </li>
                        <li>
                            <button>
                                Yoga Mats
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="promo-block">
                    <div className="image-container"></div>
                    <p className="head-line"> Easy does it.</p>
                    <p>Drapey. Dreamy. Daily Discover peices designed to elvate the everyday.</p>
                    <a href="/"
                       className="anchor-anchor detail">Shop Matching Sets
                        <svg height="16" width="16" viewBox="0 0 16 16"
                             xmlns="http://www.w3.org/2000/svg" focusable="false" role="img"
                             aria-labelledby="icon_:rj4:" aria-hidden="false"><title
                            id="icon_:rj4:">rightLinkArrowIcon</title>
                            <path
                                d="m10.53 2.47 5 5a.75.75 0 0 1 .01 1.04l-5 5-.35-.35a1 1 0 0 1 0-1.42l3-3H5a1 1 0 0 1-1-1v-.5h9.18l-3-3a1 1 0 0 1 0-1.42l.35-.35ZM2 7.25a1 1 0 0 1 1 1v.5H1a1 1 0 0 1-1-1v-.5Z"
                                fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </a>
                </div>
                <div className="active-bar">
                    <p className="label">
                        ACTIVITY
                    </p>
                    <ul className="unorderedList active-bar-list">
                        <li>Casual</li>
                        <li>Running</li>
                        <li>Golf</li>
                        <li>Tennis</li>
                        <li>Workout</li>
                        <li>Yoga</li>
                        <a href="/">Shop All Women
                            <svg height="16" width="16" viewBox="0 0 16 16"
                                 xmlns="http://www.w3.org/2000/svg" focusable="false" role="img"
                                 aria-labelledby="icon_:rj4:" aria-hidden="false"><title
                                id="icon_:rj4:">rightLinkArrowIcon</title>
                                <path
                                    d="m10.53 2.47 5 5a.75.75 0 0 1 .01 1.04l-5 5-.35-.35a1 1 0 0 1 0-1.42l3-3H5a1 1 0 0 1-1-1v-.5h9.18l-3-3a1 1 0 0 1 0-1.42l.35-.35ZM2 7.25a1 1 0 0 1 1 1v.5H1a1 1 0 0 1-1-1v-.5Z"
                                    fill="currentColor" fillRule="evenodd"></path>
                            </svg></a>
                    </ul>
                </div>
            </div>
        </>
    }
    const MenDetails = () => {
        return <>
            <div className="nav-details-inner">
                <div className="main-detail-warpper">
                    <ul className="unorderedList mainDetail">
                        <li>
                            <button>
                                What's New
                            </button>
                        </li>
                        <li>
                            <button>
                                Bestsellers
                            </button>
                        </li>
                        <li>
                            <button>
                                Align Shop
                            </button>
                        </li>
                        <li>
                            <button>
                                Back to School
                            </button>
                        </li>
                        <li>
                            <button>
                                Business Casual Clothes
                            </button>
                        </li>
                        <li>
                            <button>
                                Best Workout Gear
                            </button>
                        </li>
                        <li>
                            <button>
                                Golf Clothes
                            </button>
                        </li>
                        <li>
                            <button>
                                5" Shorts Shop
                            </button>
                        </li>
                        <li>
                            <button>
                                We Made Too Much
                            </button>
                        </li>
                    </ul>
                    <ul className="unorderedList mainDetail">
                        <li>
                            <a href="/en-ca/c/women/_/N-7z5"
                               className="anchor-anchor detail">Men's Clothes
                                <svg height="16" width="16" viewBox="0 0 16 16"
                                     xmlns="http://www.w3.org/2000/svg" focusable="false" role="img"
                                     aria-labelledby="icon_:rj4:" aria-hidden="false"><title
                                    id="icon_:rj4:">rightLinkArrowIcon</title>
                                    <path
                                        d="m10.53 2.47 5 5a.75.75 0 0 1 .01 1.04l-5 5-.35-.35a1 1 0 0 1 0-1.42l3-3H5a1 1 0 0 1-1-1v-.5h9.18l-3-3a1 1 0 0 1 0-1.42l.35-.35ZM2 7.25a1 1 0 0 1 1 1v.5H1a1 1 0 0 1-1-1v-.5Z"
                                        fill="currentColor" fillRule="evenodd"></path>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <button>
                                Shorts
                            </button>
                        </li>
                        <li>
                            <button>
                                Button Down Shirts
                            </button>
                        </li>
                        <li>
                            <button>
                                Coats & Jackets
                            </button>
                        </li>
                        <li>
                            <button>
                                Hoodies & Sweatshirts
                            </button>
                        </li>
                        <li>
                            <button>
                                Joggers
                            </button>
                        </li>
                        <li>
                            <button>
                                Pants
                            </button>
                        </li>
                        <li>
                            <button>
                                Polo Shirts
                            </button>
                        </li>
                        <li>
                            <button>
                                Shirts
                            </button>
                        </li>
                    </ul>
                    <ul className="unorderedList mainDetail">
                        <li>
                        </li>
                        <li>
                            <button>
                                Shoes
                            </button>
                        </li>
                        <li>
                            <button>
                                Sweaters
                            </button>
                        </li>
                        <li>
                            <button>
                                Socks
                            </button>
                        </li>
                        <li>
                            <button>
                                Swim Trunks
                            </button>
                        </li>
                        <li>
                            <button>
                                Tank Tops
                            </button>
                        </li>
                        <li>
                            <button>
                                Trousers
                            </button>
                        </li>
                        <li>
                            <button>
                                T-Shrits
                            </button>
                        </li>
                        <li>
                            <button>
                                Underwear
                            </button>
                        </li>
                    </ul>
                    <ul className="unorderedList mainDetail">
                        <li>
                            <a href="https://shop.lululemon.com/en-ca/c/accessories/_/N-1z0xcuuZ8ok"
                               className="anchor-anchor detail">Accessories
                                <svg height="16" width="16" viewBox="0 0 16 16"
                                     xmlns="http://www.w3.org/2000/svg" focusable="false" role="img"
                                     aria-labelledby="icon_:rj4:" aria-hidden="false"><title
                                    id="icon_:rj4:">rightLinkArrowIcon</title>
                                    <path
                                        d="m10.53 2.47 5 5a.75.75 0 0 1 .01 1.04l-5 5-.35-.35a1 1 0 0 1 0-1.42l3-3H5a1 1 0 0 1-1-1v-.5h9.18l-3-3a1 1 0 0 1 0-1.42l.35-.35ZM2 7.25a1 1 0 0 1 1 1v.5H1a1 1 0 0 1-1-1v-.5Z"
                                        fill="currentColor" fillRule="evenodd"></path>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <button>
                                Bags
                            </button>
                        </li>
                        <li>
                            <button>
                                Backpacks
                            </button>
                        </li>
                        <li>
                            <button>
                                Belt Bags
                            </button>
                        </li>
                        <li>
                            <button>
                                Crossbody Bags
                            </button>
                        </li>
                        <li>
                            <button>
                                Hair Accessories
                            </button>
                        </li>
                        <li>
                            <button>
                                Hats
                            </button>
                        </li>
                        <li>
                            <button>
                                Water Bottles
                            </button>
                        </li>
                        <li>
                            <button>
                                Yoga Mats
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="promo-block">
                    <div className="image-container-men"></div>
                    <p className="head-line"> Comfortable aces ahead</p>
                    <p>Get out there with golf wear that’s breathable, high-stretch, and stacked with game-changing
                        details.</p>
                    <a href="/"
                       className="anchor-anchor detail">Shop Golf
                        <svg height="16" width="16" viewBox="0 0 16 16"
                             xmlns="http://www.w3.org/2000/svg" focusable="false" role="img"
                             aria-labelledby="icon_:rj4:" aria-hidden="false"><title
                            id="icon_:rj4:">rightLinkArrowIcon</title>
                            <path
                                d="m10.53 2.47 5 5a.75.75 0 0 1 .01 1.04l-5 5-.35-.35a1 1 0 0 1 0-1.42l3-3H5a1 1 0 0 1-1-1v-.5h9.18l-3-3a1 1 0 0 1 0-1.42l.35-.35ZM2 7.25a1 1 0 0 1 1 1v.5H1a1 1 0 0 1-1-1v-.5Z"
                                fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </a>
                </div>
                <div className="active-bar">
                    <p className="label">
                        ACTIVITY
                    </p>
                    <ul className="unorderedList active-bar-list">
                        <li>Casual</li>
                        <li>Running</li>
                        <li>Golf</li>
                        <li>Tennis</li>
                        <li>Workout</li>
                        <li>Yoga</li>
                        <a href="/">Shop All Men
                            <svg height="16" width="16" viewBox="0 0 16 16"
                                 xmlns="http://www.w3.org/2000/svg" focusable="false" role="img"
                                 aria-labelledby="icon_:rj4:" aria-hidden="false"><title
                                id="icon_:rj4:">rightLinkArrowIcon</title>
                                <path
                                    d="m10.53 2.47 5 5a.75.75 0 0 1 .01 1.04l-5 5-.35-.35a1 1 0 0 1 0-1.42l3-3H5a1 1 0 0 1-1-1v-.5h9.18l-3-3a1 1 0 0 1 0-1.42l.35-.35ZM2 7.25a1 1 0 0 1 1 1v.5H1a1 1 0 0 1-1-1v-.5Z"
                                    fill="currentColor" fillRule="evenodd"></path>
                            </svg></a>
                    </ul>
                </div>
            </div>
        </>
    }


    return <>
        {promo && <div className="promo-outer">
            <div className="promo-inner">
                <p className="promo-banner">
                    Fit check: pocketed pants, super-soft hoodie, buttery-soft tank. Go time.
                    <span className="promo-banner_bannerDefaultText">
                    <button>Shop Women’s Back to School</button></span></p>
                <button className="button-clear" type="button" onClick={() => updatePromo(false)}>
                    <svg height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                         className="promo-banner_bannerCloseIcon__2qMDR" focusable="false" role="img"
                         aria-labelledby="icon_:r15:" aria-hidden="false"><title id="icon_:r15:">closeIcon</title>
                        <path
                            d="m13.82 1.82-.35-.35L8 6.94 3.24 2.18a1 1 0 0 0-1.42 0l-.35.35L6.94 8l-4.76 4.76a1 1 0 0 0 0 1.42l.35.35L8 9.06l4.76 4.76a1 1 0 0 0 1.42 0l.35-.35L9.06 8l4.76-4.76a1 1 0 0 0 0-1.42Z"
                            fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>}

        <header className="mega-nav" onMouseLeave={() => HandleMouseLeave()}>
            <nav>
                <div className="topnav-warpper">
                    <div className="topnav-desktop">
                        <div className="siteTopNav">
                            <div className="navContainer">
                                <button>
                                    <svg height="24" width="18" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg"
                                         className="mega-nav_icon" focusable="false" role="img"
                                         aria-labelledby="icon_:r8c:" aria-hidden="false">
                                        <title id="icon_:r8c:">
                                            <svg height="24" width="18" viewBox="0 0 18 24"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M9 20.88a.73.73 0 0 1-.72-.72c0-1.306-1.594-3.149-2.765-4.502l-.355-.452c-1.555-1.824-3.485-4.09-3.485-7.45A7.133 7.133 0 0 1 9 .903a7.133 7.133 0 0 1 7.363 6.855c0 3.36-1.92 5.625-3.485 7.45l-.393.45c-1.171 1.354-2.765 3.197-2.765 4.503a.73.73 0 0 1-.72.72ZM9 2.342a5.693 5.693 0 0 0-5.923 5.415c0 2.803 1.593 4.723 3.139 6.509l.394.45A21.398 21.398 0 0 1 9 17.867a21.398 21.398 0 0 1 2.39-3.15l.394-.45c1.546-1.786 3.14-3.706 3.14-6.51A5.693 5.693 0 0 0 9 2.343Zm0 8.938a3.12 3.12 0 1 1 3.12-3.12A3.13 3.13 0 0 1 9 11.28Zm0-4.8a1.68 1.68 0 1 0 1.68 1.68A1.69 1.69 0 0 0 9 6.48Zm8.4 13.68c0-1.325-1.411-2.438-3.84-3.062a.96.96 0 0 0-1.19.758l-.077.442c2.371.432 3.657 1.286 3.657 1.862 0 .883-2.707 2.16-6.96 2.16-4.252 0-6.95-1.277-6.95-2.16 0-.576 1.286-1.43 3.658-1.862l-.077-.442a.96.96 0 0 0-1.19-.758C2.01 17.722.59 18.835.59 20.16c0 2.362 4.223 3.6 8.4 3.6 4.175 0 8.409-1.238 8.409-3.6Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                        </title>
                                        <path
                                            d="M9 20.88a.73.73 0 0 1-.72-.72c0-1.306-1.594-3.149-2.765-4.502l-.355-.452c-1.555-1.824-3.485-4.09-3.485-7.45A7.133 7.133 0 0 1 9 .903a7.133 7.133 0 0 1 7.363 6.855c0 3.36-1.92 5.625-3.485 7.45l-.393.45c-1.171 1.354-2.765 3.197-2.765 4.503a.73.73 0 0 1-.72.72ZM9 2.342a5.693 5.693 0 0 0-5.923 5.415c0 2.803 1.593 4.723 3.139 6.509l.394.45A21.398 21.398 0 0 1 9 17.867a21.398 21.398 0 0 1 2.39-3.15l.394-.45c1.546-1.786 3.14-3.706 3.14-6.51A5.693 5.693 0 0 0 9 2.343Zm0 8.938a3.12 3.12 0 1 1 3.12-3.12A3.13 3.13 0 0 1 9 11.28Zm0-4.8a1.68 1.68 0 1 0 1.68 1.68A1.69 1.69 0 0 0 9 6.48Zm8.4 13.68c0-1.325-1.411-2.438-3.84-3.062a.96.96 0 0 0-1.19.758l-.077.442c2.371.432 3.657 1.286 3.657 1.862 0 .883-2.707 2.16-6.96 2.16-4.252 0-6.95-1.277-6.95-2.16 0-.576 1.286-1.43 3.658-1.862l-.077-.442a.96.96 0 0 0-1.19-.758C2.01 17.722.59 18.835.59 20.16c0 2.362 4.223 3.6 8.4 3.6 4.175 0 8.409-1.238 8.409-3.6Z"
                                            fill="currentColor"></path>
                                    </svg>
                                    <span className="mega-nav_underline">Store Locator</span>
                                </button>
                            </div>
                            <div className="navContainer">
                                <button>
                                    <svg height="21" width="24" viewBox="0 0 24 21" xmlns="http://www.w3.org/2000/svg"
                                         className="mega-nav_icon" focusable="false" role="img"
                                         aria-labelledby="icon_:R1eamll6:" aria-hidden="false"><title
                                        id="icon_:R1eamll6:">wish list icon</title>
                                        <path
                                            d="M12 20.75a.72.72 0 0 1-.42-.13c-.32-.21-7.79-5.27-10.24-9.76C-.12 8.18-.45 4.4 2.09 2a6.48 6.48 0 0 1 8.82 0L12 3l1.08-1a6.48 6.48 0 0 1 8.82 0c2.54 2.41 2.21 6.19.75 8.87-2.45 4.49-9.9 9.55-10.22 9.76a.72.72 0 0 1-.43.12zm-5.5-19a4.89 4.89 0 0 0-3.37 1.32c-2 1.87-1.66 4.9-.47 7.07 2 3.59 7.73 7.82 9.34 9 1.6-1.14 7.36-5.36 9.32-8.95 1.28-2.34 1.54-5.68-1-7.49a5.07 5.07 0 0 0-6.32.52l-.88.84 1.45 1.4-.35.36a1 1 0 0 1-1.41 0L9.87 3.07A4.89 4.89 0 0 0 6.5 1.75z"
                                            fill="currentColor" fillRule="evenodd"></path>
                                    </svg>
                                    <span className="iconComponents_underline">Wish List</span>
                                </button>

                            </div>
                            <div className="navContainer">
                                <button>
                                    <svg height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                                         className="mega-nav_icon" focusable="false" role="img"
                                         aria-labelledby="icon_:R1iamll6:" aria-hidden="false"><title
                                        id="icon_:R1iamll6:">gift cards icon</title>
                                        <g fill="currentColor" fillRule="evenodd">
                                            <path
                                                d="M14.5 2.75a.5.5 0 0 1 .5.5v9.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9.5a.5.5 0 0 1 .5-.5h13m0-1h-13A1.5 1.5 0 0 0 0 3.25v9.5a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-9.5a1.5 1.5 0 0 0-1.5-1.5Z"></path>
                                            <path d="M0 8.36h16v1H0z"></path>
                                            <path d="M7.49 2h1v12h-1z"></path>
                                            <path
                                                d="M7.32 8.79h-.08c-.5-.08-3-.54-3.72-1.28a2.22 2.22 0 0 1 0-3.08 2.18 2.18 0 0 1 3.05 0c.71.73 1.16 3.28 1.24 3.79a.46.46 0 0 1-.14.43.47.47 0 0 1-.35.14ZM5 4.77a1.08 1.08 0 0 0-.8.35 1.2 1.2 0 0 0 0 1.68 7 7 0 0 0 2.45.85 7.23 7.23 0 0 0-.84-2.53A1.1 1.1 0 0 0 5 4.77Zm3.66 4.02a.47.47 0 0 1-.35-.15.46.46 0 0 1-.14-.43c.08-.51.53-3.06 1.25-3.79a2.17 2.17 0 0 1 3 0 2.22 2.22 0 0 1 0 3.08c-.72.74-3.22 1.2-3.71 1.28Zm2.28-4a1.1 1.1 0 0 0-.81.35 7.44 7.44 0 0 0-.84 2.54 7.12 7.12 0 0 0 2.46-.86 1.21 1.21 0 0 0 0-1.68 1.11 1.11 0 0 0-.81-.37Z"></path>
                                            <path
                                                d="m8.25 9-2.74 2.8-.36.36-.23-.24a.68.68 0 0 1 0-1l2.62-2.68a.5.5 0 0 1 .71 0 .54.54 0 0 1 0 .76Z"></path>
                                            <path
                                                d="m7.73 9 2.74 2.8.36.36.23-.24a.7.7 0 0 0 0-1L8.44 8.24a.5.5 0 0 0-.71 0 .54.54 0 0 0 0 .76Z"></path>
                                        </g>
                                    </svg>
                                    <span className="iconComponents_underline">Gift Cards</span>
                                </button>

                            </div>
                            <div className="navContainer">
                                <button>
                                    <svg height="16" width="16" version="1.1" viewBox="0 0 16 16"
                                         xmlns="http://www.w3.org/2000/svg"
                                         x="0px" y="0px" className="mega-nav_icon"
                                         focusable="false" role="img" aria-labelledby="icon_:R1mamll6:"
                                         aria-hidden="false"><title id="icon_:R1mamll6:">region selector icon</title>
                                        <path
                                            d="M8.5,0.1c-0.2,0-0.3,0-0.5,0c-0.2,0-0.3,0-0.5,0C3.3,0.3,0.1,3.8,0.1,8c0,4.1,3.1,7.5,7.1,7.9h0c0.3,0,0.5,0,0.8,0 c0.3,0,0.6,0,0.8,0c4-0.4,7.1-3.8,7.1-7.9C15.9,3.8,12.7,0.3,8.5,0.1z M5.2,1.6C4.2,3,3.6,5,3.5,7.4H1.1C1.3,4.8,3,2.6,5.2,1.6z M1.1,8.6h2.4c0.1,2.3,0.7,4.4,1.7,5.7C2.9,13.3,1.3,11.2,1.1,8.6z M7.4,14.7c-1.5-0.5-2.6-3.1-2.7-6.1h2.7V14.7z M7.4,7.4H4.7 c0.1-3,1.3-5.5,2.7-6.1V7.4z M14.9,7.4h-2.4C12.4,5,11.8,3,10.8,1.6C13.1,2.6,14.7,4.8,14.9,7.4z M8.6,1.3c1.4,0.5,2.6,3.1,2.7,6.1 H8.6V1.3z M8.6,14.7V8.6h2.7C11.2,11.6,10.1,14.2,8.6,14.7z M10.8,14.3c1-1.4,1.6-3.4,1.7-5.7h2.4C14.7,11.1,13.1,13.3,10.8,14.3z"
                                            fill="currentColor"></path>
                                    </svg>
                                    <span className="iconComponents_underline__37kK3">CAN</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-desktop">
                    <div className="nav-desktop_container">
                        <div className="mega-nav-logo">
                            <a href="/" className="anchor_anchor__1pPYT"
                               data-lulu-attributes="{&quot;type&quot;:&quot;link&quot;,&quot;link&quot;:{&quot;type&quot;:&quot;hdr-mn&quot;,&quot;name&quot;:&quot;home&quot;,&quot;id&quot;:&quot;home&quot;},&quot;version&quot;:&quot;1.0&quot;}"
                               data-lulu-track="nav-link">
                                <svg viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg" width="34" height="34">
                                    <path
                                        d="M13.499 0C20.956 0 27 6.045 27 13.5 27 20.957 20.956 27 13.499 27 6.044 27 0 20.958 0 13.5 0 6.044 6.044 0 13.499 0zm7.076 20.18c-.425 0-.825-.127-1.22-.391-2.184-1.454-1.438-3.198.053-5.897.63-1.145 1.282-2.324 1.572-3.542.311-1.31.594-3.22-.542-4.664-.534-.677-1.347-1.2-2.413-1.554-1.112-.367-2.54-.566-4.25-.589l-.118-.003-.434.003c-1.709.023-3.139.222-4.248.589-1.068.354-1.88.876-2.415 1.554-1.136 1.445-.853 3.354-.54 4.664.288 1.218.941 2.4 1.57 3.541 1.491 2.7 2.238 4.444.052 5.898-.394.264-.792.39-1.218.39-.85 0-1.83-.425-2.352-.685l.127.223c1.08 1.621 2.468 2.483 4.01 2.483.676 0 1.39-.164 2.12-.488.775-.343 1.455-.971 1.917-1.769.46-.798.643-1.657.512-2.421-.158-.685-.516-1.606-.927-2.673-1.077-2.783-2.548-6.588-1.278-8.449.536-.785 1.5-1.169 2.945-1.174 1.447.005 2.41.389 2.946 1.174 1.272 1.861-.2 5.666-1.275 8.445-.413 1.068-.77 1.99-.928 2.67-.132.771.05 1.63.512 2.428s1.142 1.426 1.917 1.77c.73.323 1.444.487 2.12.487 1.542 0 2.93-.862 4.015-2.49l.122-.216c-.52.26-1.5.686-2.352.686z"
                                        id="Combined-Shape" fillRule="nonzero" fill="#d31334"></path>
                                </svg>
                            </a>
                        </div>
                        <div className="primary-nav">
                            <ul className="ulStyle">
                                <li>
                                    <a href="/en-ca/story/women"
                                       className="anchor" onMouseEnter={() => HandleMouseEnter("women")}>WOMEN</a>
                                </li>
                                <li>
                                    <a href="/en-ca/story/men"
                                       className="anchor" onMouseEnter={() => HandleMouseEnter("men")}>MEN</a>
                                </li>
                                <li>
                                    <a href="en-ca/c/accessories"
                                       className="anchor">ACCESSORIES</a>
                                </li>
                                <li>
                                    <a href="/en-ca/story/shoes"
                                       className="anchor">SHOES</a>
                                </li>
                                <li>
                                    <a href="/en-ca/story/lululemon-studio"
                                       className="anchor">STUDIO</a>
                                </li>
                                <li>
                                    <a href="/en-ca/story/shop-outfits"
                                       className="anchor hl">BACK TO SCHOOL</a>
                                </li>
                            </ul>
                        </div>
                        <div className="secondary-nav">
                            <div className="secondary-nav-desktop">
                                <div className="search-box">
                                    <div className="search-mask"></div>
                                    <div className="search-formwarpper">
                                        <form autoComplete="off" action="https://shop.lululemon.com/en-ca/search"
                                              className="search-form">
                                            <svg height="16" width="16" viewBox="0 0 16 16"
                                                 xmlns="http://www.w3.org/2000/svg" className="search-searchIcon"
                                                 focusable="false" role="img" aria-labelledby="icon_:R57emll6:"
                                                 aria-hidden="false"><title id="icon_:R57emll6:">Search</title>
                                                <path
                                                    d="m15.53 14.47-4-4a5.82 5.82 0 1 0-1.07 1.06l3.27 3.26a1 1 0 0 0 1.42 0l.38-.32ZM7 11.25A4.25 4.25 0 1 1 11.25 7 4.26 4.26 0 0 1 7 11.25Z"
                                                    fill="currentColor" fillRule="evenodd"></path>
                                            </svg>
                                            <input autoComplete="off" placeholder="Search"
                                                   className="search-input" name="Ntt"
                                                   type="search"/>
                                        </form>
                                    </div>
                                </div>
                                <div className="sign-in-button">
                                    <div className="sign-in-profile">
                                        <div className="navContainer">
                                            <button>
                                                <svg height="24" width="24" viewBox="0 0 24 24"
                                                     className="iconComponents_icon__2vPA3 iconComponents_signinABStyleIcon__A8h8q"
                                                     focusable="false" role="img" aria-labelledby="icon_:Rbbemll6:"
                                                     aria-hidden="false"><title id="icon_:Rbbemll6:">account menu
                                                    icon</title>
                                                    <path
                                                        d="M12 13.75c-2.34 0-4.23-2.8-4.23-5.12A4.17 4.17 0 0 1 12 4.25a4.17 4.17 0 0 1 4.24 4.38c0 2.37-1.89 5.12-4.24 5.12Zm0-1.5c1.41 0 2.74-2 2.74-3.62a2.74 2.74 0 0 0-5.48 0c0 1.58 1.33 3.62 2.74 3.62ZM23.75 12A11.76 11.76 0 0 0 11.3.27C4.88.735.001 6.23.3 12.66a11.65 11.65 0 0 0 2.33 6.44l.44-.33a1 1 0 0 0 .25-1.3A10.16 10.16 0 0 1 1.75 12a10.25 10.25 0 1 1 18.92 5.48 1 1 0 0 0 .26 1.29l.44.33a11.611 11.611 0 0 0 2.38-7.1ZM12 23.75a11.74 11.74 0 0 1-7.79-3l-.06-.05a.77.77 0 0 1-.1-.88 8.14 8.14 0 0 1 1.81-2.73 6.49 6.49 0 0 1 4.78-1.88h2.72a6.49 6.49 0 0 1 4.78 1.88 8 8 0 0 1 1.74 2.56.78.78 0 0 1 0 1 .68.68 0 0 1-.12.12A11.78 11.78 0 0 1 12 23.75ZM5.62 20a10.24 10.24 0 0 0 12.76 0 6.28 6.28 0 0 0-1.3-1.83 5 5 0 0 0-3.72-1.44h-2.72a5 5 0 0 0-3.72 1.44A6.42 6.42 0 0 0 5.62 20Z"
                                                        fill="currentColor" fillRule="evenodd"></path>
                                                </svg>
                                                <span className="mega-nav_underline">Sign In</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="shopping-icon">
                                    <a href="https://shop.lululemon.com/shop/mybag"
                                       className="anchor_anchor__1pPYT cart-icon_shoppingCartIcon__3_Ab7" rel="nofollow"
                                       title="0 items" aria-label="0 items in the bag, click to view the bag"
                                       data-lulu-track="nav-link"
                                       data-lulu-attributes="{&quot;type&quot;:&quot;link&quot;,&quot;link&quot;:{&quot;type&quot;:&quot;hdr-cart&quot;,&quot;name&quot;:&quot;My%20Bag&quot;,&quot;id&quot;:&quot;my-bag&quot;},&quot;version&quot;:&quot;1.0&quot;}"
                                       data-testid="cart-icon">
                                        <svg height="24" width="24" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg"
                                             focusable="false" role="img" aria-labelledby="icon_:Ravemll6:"
                                             aria-hidden="false"><title id="icon_:Ravemll6:">bagIcon</title>
                                            <path
                                                d="M20 6.25h-3.25c-.68-3.62-2.53-6-4.75-6s-4.07 2.38-4.75 6H4a.76.76 0 0 0-.75.75v12A4.75 4.75 0 0 0 8 23.75h8A4.75 4.75 0 0 0 20.75 19V7a.76.76 0 0 0-.75-.75zm-8-4.5c1.38 0 2.66 1.84 3.22 4.5H8.78c.56-2.66 1.84-4.5 3.22-4.5zM19.25 19A3.26 3.26 0 0 1 16 22.25H8A3.26 3.26 0 0 1 4.75 19V7.75H7l-.24 2.16.49.06a1 1 0 0 0 1.12-.87l.17-1.35h6.92l.17 1.35a1 1 0 0 0 1.12.87l.49-.06L17 7.75h2.28L19.25 19z"
                                                fill="currentColor" fillRule="evenodd"></path>
                                        </svg>
                                        <span id="cart-total" className="cart-icon">0</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="detail-locator">
                    <div className="nav-details" style={menuHeight}>
                        <NaviDetails/>
                    </div>
                </div>


                {/*{imageCarousel?*/}
                {/*    <div className="signposting">*/}
                {/*        <div className="signposting_container">*/}
                {/*            <div className="signposting_wrapper">*/}
                {/*                <div>*/}
                {/*                    <h3 className="signposting_title">{productInfo?.rs?.name}</h3>*/}
                {/*                </div>*/}
                {/*                <div className="signposting_rightSide">*/}
                {/*                    <span className="signposting_rightSideLabel_colour">Colour:&nbsp;</span>*/}
                {/*                    <img className="signposting_rightSideLabel_colour_picture" src={selectedColorSwatch?.swatch} alt=""/>*/}
                {/*                    { selectSize ? (*/}
                {/*                        <React.Fragment>*/}
                {/*                            <span className="signposting_rightSideLabel">Size:&nbsp;</span>*/}
                {/*                            <span className="signposting_rightSideValue">{selectSize}</span>*/}
                {/*                            <button className="signposting_actionButton">ADD TO BAG</button>*/}
                {/*                        </React.Fragment>*/}
                {/*                    ) : (*/}
                {/*                        <button className="signposting_actionButton">SELECT SIZE</button>*/}
                {/*                    )}*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    :*/}
                {/*    <div></div>*/}
                {/*}*/}


            </nav>
        </header>
    </>
}