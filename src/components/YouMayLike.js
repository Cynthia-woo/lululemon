import "./YouMayLike.scss"
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import "../actions/setLikeList"
import {setLikeList} from "../actions/setLikeList";

export const YouMayLike = (props) =>{

    const currentUrl = new URL(window.location.href);
    const productId = currentUrl.pathname.slice(10);

    const uniqueItemList = JSON.parse(sessionStorage.getItem('productList'));

    setLikeList(uniqueItemList);

    return <div className="you-may-like">
        <div className="product-recommendation">
            <h4 className="product-recommendation_title">
            You May Like
            </h4>

            {uniqueItemList.slice(1,5).map((item,index)=>
                <Link to={`/products/${item.productId}?color=${item.swatches[0].colorId}`} key={index}><div className="product-recommendation_image" key={index}>
                <img src={item.images[0].mainCarousel.media.split(" | ")[0]} alt="dag"/>
                        <span>{item.name}</span>
            </div></Link>
            )}
        </div>
    </div>
}