import './ProductContent.scss'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {ProductListItem} from "./ProductListItem";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import {useEffect, useState} from "react";
import {isClick} from "../actions/filterAction";

export const ProductContent = () => {


    const dispatch = useDispatch();
    let productList = useSelector(state => state?.productContentReducer?.sortedList);
    let isLoading = useSelector(state => state?.productContentReducer?.isLoading);
    let sortListChoices = useSelector(state => state?.productContentReducer?.sortList);
    let sortingId = useSelector(state => state?.productContentReducer?.sortingId);
    const [sortListIsHidden, setSortListIsHidden] = useState(true);


    // hover to see the detailed sort list
    const setHoverStyle = () => {setSortListIsHidden(!sortListIsHidden);};

    // render the first 60 product
    const [endIndex, setEndIndex] = useState(productList.length>60 ? 59 : (productList.length -1));
    const handleNextButtonClick = () => {
        if (endIndex + 60 < productList.length) {
            setEndIndex(endIndex + 70);
        }
    };

    // load product list according to the filter
    // useEffect(() => {
    //     dispatch(actions.productContentAction.fetchData());
    // }, []);


    const sortList = ['Featured', 'New Arrivals', 'Top Rated', 'Price: High to Low' , 'Price: Low to High']
    const [sortSelected, setSortSelected] = useState(sortList[0])

    // const selectSort = index => {
    //     setSortSelected(sortList[index]);
    //     console.log("selectId",index+1)
    //     dispatch(actions.productContentAction.sortDataId(index+1));
    // }
    //


    return <div className='product-content'>
        {/*top banner section*/}
        <div className="product-content_banner">
            <div className="product-content_banner_image">
                <img
                    src="https://images.lululemon.com/is/image/lululemon/na_jul23_wk3_D_BTS_CDP_Hero_D_Accessories?$cdp-hero$&wid=1970&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
                    alt=""/>
                <p className="product-content_banner_image_des">Daily basis basics.</p>
            </div>
            <div className="product-content_banner_mainNav">
                <ul className="navNewContainer">
                    <li className="navNew navNew_selected">
                        <a href="https://shop.lululemon.com/en-ca/c/whats-new/_/N-8tc">All What's New</a>
                    </li>
                    <li className="navNew">
                        <a href="https://shop.lululemon.com/en-ca/c/whats-new/_/N-1z0xcuuZ8tc">
                            Women's What's New</a>
                    </li>
                    <li className="navNew">
                        <a href="https://shop.lululemon.com/en-ca/c/whats-new/_/N-1z0xcmkZ8tc">Men's What's New</a>
                    </li>
                    <li className="navNew">
                        <a href="https://shop.lululemon.com/en-ca/c/whats-new/_/N-1z0xb9pZ8tc">Accessories What's
                            New</a>
                    </li>
                </ul>
            </div>
        </div>


        {/*main item filter section*/}
        <div className="product-content_allItems">

            <div className="product-content_allItems_header">
                <div className="product-content_allItems_header_filterItem">
                    <div className="product-content_allItems_header_filterItem_countItem">
                        <div className="count">All Items ({productList.length})</div>
                    </div>

                    <div className="product-content_allItems_header_filterItem_nearItem">
                        <div className="available">Available Near You</div>
                        <div className="icon"><KeyboardArrowRightOutlinedIcon/></div>
                    </div>
                </div>

                <div className="product-content_allItems_header_sortItem"
                     onClick={setHoverStyle}
                     onMouseLeave={setHoverStyle}
                >
                    <div className="sortItem">
                        Sort by
                        <span>{sortList[sortingId]}</span>
                    </div>
                    <div className="icon">
                        <ExpandMoreOutlinedIcon/>
                    </div>

                    {sortListIsHidden? null : (<ul className="sortList">
                        {sortList.map((item,index)=><li key={index} onClick={()=>dispatch(actions.productContentAction.clickSorting(index,productList))}>{item}</li>)}
                        {/*<li value="featured">Featured</li>*/}
                        {/*<li value="newArrivals">New Arrivals</li>*/}
                        {/*<li value="topRated">Top Rated</li>*/}
                        {/*<li value="priceHighLow">Price: High to Low</li>*/}
                        {/*<li value="priceLowHigh">Price: Low to High</li>*/}
                    </ul>)}

                </div>
            </div>

            <div className="product-content_allItems_options">
                {sortListChoices.map((item,index)=><div className="product-content_allItems_options_option" key={index}  onClick={() => dispatch(isClick(item)) }>
                    {item}
                    <span className="icon">
                        <CloseOutlinedIcon fontSize="12px"/>
                    </span>
                </div>)}


            </div>

            {/*render when data loaded*/}
            {isLoading && <div className="product-content_allItems_itemList">
                {productList.slice(0,endIndex).map((item,index)=><ProductListItem key={index} product={item} number={index}/>)}

            </div>}

        </div>


        {/*view more product section*/}

    </div>
}