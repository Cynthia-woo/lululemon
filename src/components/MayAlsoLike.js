import "./MayAlsoLike.scss"
import {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";



const RecommendItem = (props) => {



    const {item} = props;
    const [selectedSwatch, setSelectedSwatch] = useState(0)
    // const [media, setMedia] = useState(item.images[selectedSwatch].mainCarousel.media.split(' | ') );
    // console.log(media)
    const [detailLink, setDetailLink] = useState(item.images[selectedSwatch].mainCarousel.media.split(' | ')[0]);
    const [isHovering, setIsHovering] = useState(false);
    const mouseEnterCb = () => {
        setDetailLink(item.images[selectedSwatch].mainCarousel.media.split(' | ')[1]);
    }
    const mouseLeaveCb = () => {
        setDetailLink(item.images[selectedSwatch].mainCarousel.media.split(' | ')[0]);
    }

    // loading prev&nextPage with styled arrow
    const [page, setPage] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);

    const prevPage = () => {
        if(page>1){
            mouseEnterPanel(page*7-7);
            setPage(state=> state-1);
            setIsLastPage(false);}
        if(page===1){
            mouseEnterPanel(0);
            setPage(state=> state-1);
            setIsFirstPage(true); setIsLastPage(false);}
        if(page===0){ setIsFirstPage(true); setIsLastPage(false);}
    }
    const nextPage = () => {
        if(page < (Math.floor(item.swatches.length/7)-1)){
            mouseEnterPanel(page*7+7);
            setPage(state=> state+1);
            setIsFirstPage(false);}
        if(page === (Math.floor(item.swatches.length/7)-1) && page !== (item.swatches.length/7-1)){
            mouseEnterPanel(page*7+7);
            setPage(state=> state+1);
            setIsLastPage(true);setIsFirstPage(false);}
        if(page === (item.swatches.length/7-2)){
            setIsLastPage(true);
            setIsFirstPage(false);
        }
        if(page === (Math.floor(item.swatches.length/7))){
            setIsLastPage(true);
            setIsFirstPage(false);}
    }

    // set selected color panel
    const initialSelectedArray = new Array(item.swatches.length).fill(false);
    initialSelectedArray[0] = true;
    const [isSelected, setIsSelected] = useState(initialSelectedArray);

    // re-render productPage when hovering on different color panel
    const mouseEnterPanel = (index) => {
        setSelectedSwatch(index);
        // setMedia(item.images[index].mainCarousel.media.split(' | '));
        setDetailLink(item.images[index].mainCarousel.media.split(' | ')[0]);
        let newArray = new Array(item.swatches.length).fill(false);
        newArray[index] = true;
        setIsSelected(newArray);
    }


    return <>
        <div className="storyCarousel_items_recommendItem"
             onMouseEnter={()=>setIsHovering(true)}
             onMouseLeave={()=>setIsHovering(false)} >
            <Link to= {`/products/${item.productId}?color=${item.swatches[selectedSwatch].colorId}`}><img src={detailLink} alt="" onMouseEnter={mouseEnterCb} onMouseLeave={mouseLeaveCb}/></Link>

            <div className="storyCarousel_items_recommendItem_colorPanels"
                 style={{opacity:isHovering?'1':'0'}}>
                <button data-testid="prev-button" aria-hidden="true" className="nav-prev grayed-nav-icon"
                        type="button" tabIndex="-1"
                        style={{display:(item.swatches.length > 7) ?'inline-block':'none',opacity:isFirstPage?'0.3':'1'}}
                        onClick={prevPage}>
                    <img className="prev-next-icon" src="https://shop.lululemon.com/static/ecom-web-app/_next/static/images/sprite-7973d6.svg#nav-prev-usage" title="Prev Carousel"/>
                </button>


                {item.swatches.length < 7
                    ? item.swatches.map((color,index)=>
                        <ColorPanel item={color} key={index} isSelected={isSelected[index]}
                                    productId={item.productId} onMouseEnter={ ()=> mouseEnterPanel(index)}
                        />)
                    : item.swatches.slice(page*7,(page*7+7)).map((color,index)=>
                            <ColorPanel item={color} key={index} isSelected={isSelected[page*7+index]}
                                        productId={item.productId} onMouseEnter={ ()=> mouseEnterPanel(page*7+index)}
                            />
                    )}


                <button data-testid="next-button" aria-hidden="true" className="nav-next"
                        type="button" tabIndex="-1"
                        style={{display:(item.swatches.length > 7) ?'inline-block':'none',opacity:isLastPage?'0.3':'1',position:'absolute',right:"1px"}}
                        onClick={nextPage}>
                    <img className="prev-next-icon" src="https://shop.lululemon.com/static/ecom-web-app/_next/static/images/sprite-7973d6.svg#nav-next-usage" title="Next Carousel"/>
                </button>
            </div>
            <Link to= {`/products/${item.productId}?color=${item.swatches[selectedSwatch].colorId}`}>
                <div className="storyCarousel_items_recommendItem_name">{item.name}</div>
            </Link>
            <div className="storyCarousel_items_recommendItem_price">{item.price.slice(0,-4)} <span>CAD</span></div>
        </div>
    </>
}

const ColorPanel = (props) => {
    const {item,index,isSelected,productId,...rest} = props;
    return <>
        <div className="storyCarousel_items_recommendItem_colorPanels_wrapper" style={{border:"none"}} {...rest}>
            <Link to= {`/products/${productId}?color=${item.colorId}`}>
                <div className="storyCarousel_items_recommendItem_colorPanels_wrapper_inner"
                 style={isSelected?{border:"1.5px black solid"} : {border: "1.5px rgb(0, 0, 0, 0) solid"}} {...rest}>
                <div className="storyCarousel_items_recommendItem_colorPanels_wrapper_inner_img"  {...rest}>
                    <img src={item.swatch} alt={item.swatchAlt} title={item.swatchAlt}/>
                </div>
                </div>
            </Link>
        </div>
    </>
}

export const MayAlsoLike = () =>{

    const moreItemList = JSON.parse(sessionStorage.getItem('uniqueItemList'));
    return <div className="may-also-like">
        <div className="storyCarousel">
            <div className="storyCarousel_title">
                You may also like
            </div>
            <div className="storyCarousel_items">
                {moreItemList.slice(5,9).map((item,index)=><RecommendItem item={item} key={index}/>)}
            </div>
        </div>
    </div>
}