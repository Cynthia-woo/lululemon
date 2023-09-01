import {useLocation, useParams} from "react-router-dom";
import {ProductInfo} from "./ProductInfo";
import {YouMayLike} from "./YouMayLike";
import {WhyWeMadeThis} from "./WhyWeMadeThis";
import {AccordionItem} from "./AccordionItem";
import {MayAlsoLike} from "./MayAlsoLike";
import {Review} from "./Review";
import {Brand} from "./Brand";
import "./Products.scss"
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


export const Products = () =>{

    let valuePassed = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const colorId = queryParams.get('color')

    // scroll to the top when url have changed
    const currentUrl = new URL(window.location.href);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentUrl]);

    return <>
        <div className="product-wrapper">
            <div className="product-container">
                <ProductInfo/>
                <YouMayLike/>
            </div>
            <WhyWeMadeThis/>
        </div>
            <AccordionItem/>
            <MayAlsoLike/>
            <Review/>
            <Brand/>
    </>
}