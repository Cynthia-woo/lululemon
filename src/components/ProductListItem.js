import './ProductListItem.scss'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import {useEffect, useState} from "react";
import actions from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, Link, useParams, useNavigate, useLocation, Outlet, BrowserRouter} from "react-router-dom";

const ColorPattern = ({color,...rest}) => {
    const [isHovering,updateIsHovering]= useState(false);
    let timeId;
    const mouseEnterDetail =  ()=>{
        // TODO: state does not match, need to be fixed
        timeId = setTimeout(()=> updateIsHovering(true),1000);
    }
    const mouseLeaveDetail = () => {
        // console.log("end")
        updateIsHovering(false);
        clearTimeout(timeId);
    }

    return <>
        <div className="productItem_colorPatterns_inner" {...rest}>
            {/*<img src="https://images.lululemon.com/is/image/lululemon/27597?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" alt=""/>*/}
            <div className="productItem_colorPatterns_inner_img"
                // onMouseEnter={()=> {updateIsHovering(true);}}
                 onMouseEnter={mouseEnterDetail}
                // onMouseLeave={()=> {updateIsHovering(false);}}
                 onMouseLeave={mouseLeaveDetail}

            >
                <img src={color.swatch} alt={color.swatchAlt} title={color.swatchAlt}/>
            </div>
            {/*<div className="productItem_colorPatterns_inner_des"*/}
            {/*     style={isHovering ?{display:"block"} :{display:"none"}}>*/}
            {/*    {color.swatchAlt}</div>*/}
        </div>
    </>
}

const GradientRendering = () => {
    return <div className="gradient">
    </div>
}

export const ProductListItem = ({product,number,...rest}) => {
    let productList = useSelector(state => state?.productContentReducer?.rawProductList);
    let sortingId = useSelector(state => state?.productContentReducer?.sortingId)

    const selectedId = useSelector(state => state?.productListItemReducer?.selectedId)[number]??0;
    const isLoading = useSelector(state => state?.productListItemReducer?.isLoading);
    const dispatch = useDispatch();


    // make colorPatterns carousel when patterns >= 7
    const shouldDisplayCarousel = product.swatches.length > 7;
    const [detailLink, setDetailLink] = useState(product.images[selectedId].mainCarousel.media.split(' | ')[0]);

    // render images when filtering && sorting
    useEffect(()=> setDetailLink(product.images[selectedId].mainCarousel.media.split(' | ')[0]),[])
    useEffect(()=> setDetailLink(product.images[selectedId].mainCarousel.media.split(' | ')[0]),[productList,sortingId])

    const initialSelectedArray = new Array(product.swatches.length).fill(false);
    initialSelectedArray[0] = true;
    const [isSelected, setIsSelected] = useState(initialSelectedArray);


    // render the first seven items
    const [startIndex, setStartIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0)

    // click prevBtn & nextBtn to render the rest items
    const handlePrevButtonClick = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 7);
            let newArray = new Array(product.swatches.length).fill(false);
            newArray[startIndex-7] = true;
            setIsSelected(newArray);
        }
    };
    const handleNextButtonClick = () => {
        if (startIndex + 7 < product.swatches.length) {
            setStartIndex(startIndex + 7);
            let newArray = new Array(product.swatches.length).fill(false);
            newArray[startIndex+7] = true;
            setIsSelected(newArray);
        }
    };

    // interaction when mouse hover onto the product image
    const handleMouseEnter = () => {
        setDetailLink(product?.images[selectedIndex]?.mainCarousel.media.split(' | ')[1]);

    };
    const handleMouseOut = () => {
        setDetailLink(product?.images[selectedIndex]?.mainCarousel.media.split(' | ')[0]);
    };

    // select product swatches and id when hovering
    const setDetailLinks = () => {
        dispatch(actions?.productListAction?.fetchDetails(product.images))
    }

    const setSelectedId = index => {
        setSelectedIndex(index)
        dispatch(actions?.productListAction?.selectColorPattern(number,index));
        setDetailLink(product.images[index].mainCarousel.media.split(' | ')[0]);
        let newArray = new Array(product.swatches.length).fill(false);
        newArray[index] = true;
        setIsSelected(newArray);
    }

    const LinkToProduct = (prop) =>{
        console.log(prop.swatches[selectedIndex].colorId)
    }


    return <>
        <div className="productItem"  onLoad={setDetailLinks} {...rest}>
            <div className="productItem_image">
                {isLoading? <GradientRendering/>
                    :<Link to= {`/products/${product.productId}?color=${product.swatches[selectedIndex].colorId}`}>
                        <img src={detailLink} alt="" onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut}/>
                    </Link>}

            </div>
            <div className="productItem_colorPatterns" >
                {shouldDisplayCarousel
                    ? (
                        <div className="productItem_colorPatterns_wrapper">
                            <button className="btn_prev" type="button" onClick={handlePrevButtonClick}>
                                <ArrowBackIosNewOutlinedIcon fontSize="16px"/>
                            </button>
                            <div className="productItem_colorPatterns_wrapper_border">
                                {product.swatches.slice(startIndex, startIndex + 7).map((item, index) => (
                                    <Link to= {`/products/${product.productId}?color=${product.swatches[selectedIndex].colorId}`} key={index}>
                                        <ColorPattern color={item} key={index}
                                                  onMouseEnter={()=> setSelectedId(startIndex+index)}
                                                  style={isSelected[startIndex+index]?{border:"2px black solid"}:{border:"2px #fafafa solid"}}
                                    />
                                        </Link>))}
                            </div>
                            <button className="btn_next" type="button" onClick={handleNextButtonClick}>
                                <ArrowForwardIosOutlinedIcon fontSize="16px"/>
                            </button>
                        </div>
                    )
                    : (product.swatches.map((item, index) => (
                        <Link to= {`/products/${product.productId}?color=${product.swatches[selectedIndex].colorId}`} key={index}>
                        <ColorPattern color={item} key={index}
                                      onMouseEnter={()=> setSelectedId(index+startIndex)}
                                      style={isSelected[startIndex+index]?{border:"2px black solid"}:{border:"2px #fafafa solid"}}
                        />
                        </Link>
                    )))
                }
                {/*<ColorPattern swatch={product.swatch}/>*/}
            </div>
            <div className="productItem_des">
                <h3 className="productItem_des_name">{product.name}</h3>
                <span className="productItem_des_price">{product.price.substring(0, product.price.length - 4)}</span>
            </div>
        </div>
    </>
}