import "./Review.scss"
import localData from "../local.json"
import {useEffect, useState} from "react";

export const Review = () => {
    const [jsonData, setJsonData] = useState(null)
    const [dropDown, setDropDown] = useState(false)
    const dropDownStyle = dropDown ? {maxHeight:"36vh"} : {maxHeight:"0px"}
    const dropDownArrow = dropDown ? {
        transform: "rotate(180deg)"} : {
        transform: "rotate(0deg)"}

    useEffect(()=>{
        setJsonData(localData)
    },[])

    const HandleDropDownButton = () =>{
        setDropDown(!dropDown)
    }

    const sortDataById = () => {
        console.log(jsonData)
        const sorted  = [...jsonData].sort((a,b)=>a.id - b.id)
        console.log(sorted)
        setJsonData(sorted)

        // setJsonData(sortedData);
    };

    const Star = ({percent = "100%"}) => {

        const starPercentage = {
            width: percent
        }

        return <div className="star">
        <span className="shadow-star">
                            <svg height="24" width="24" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" aria-hidden="true">
                                <path
                                    d="M6.8.5 7.9 3c.1.3.4.4.6.5l2.7.4c.7.1 1 .9.5 1.4l-2 2.1c-.1.2-.2.5-.2.7L10 11c.1.7-.6 1.2-1.2.9l-2.3-1.3c-.3-.1-.6-.1-.8 0l-2.3 1.3c-.8.3-1.5-.2-1.4-.9l.5-2.9c0-.3 0-.5-.2-.7l-2-2.1C-.2 4.8 0 4 .7 3.9l2.7-.4c.3 0 .5-.2.6-.5L5.2.5c.3-.7 1.3-.7 1.6 0z"
                                    fill="currentColor"></path>
                            </svg></span>
            <span className="rate-star" style={starPercentage}>
                            <svg height="24" width="24" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" aria-hidden="true">
                                <path
                                    d="M6.8.5 7.9 3c.1.3.4.4.6.5l2.7.4c.7.1 1 .9.5 1.4l-2 2.1c-.1.2-.2.5-.2.7L10 11c.1.7-.6 1.2-1.2.9l-2.3-1.3c-.3-.1-.6-.1-.8 0l-2.3 1.3c-.8.3-1.5-.2-1.4-.9l.5-2.9c0-.3 0-.5-.2-.7l-2-2.1C-.2 4.8 0 4 .7 3.9l2.7-.4c.3 0 .5-.2.6-.5L5.2.5c.3-.7 1.3-.7 1.6 0z"
                                    fill="currentColor"></path>
                            </svg></span>
        </div>
    }

    const StarsRender = ({rating = 0}) => {
        const stars = []
        console.log("star ",rating)
        for (let i = 0; i < 5; i++){
            stars.push(rating>i ? <Star key={i}/> : <Star key={i} percent="0%"/>)
        }
        return stars
    }

    const Comment = (commentData) => {
      return <div>
            <div className="review">
                <div className="review-header-info">
                    <div className="review-header-info-center">
                        <div className="user-icon"></div>
                        <h3 className="user-name">{commentData ? commentData?.commentData?.name : "name error"}</h3>
                    </div>
                    <h3 className="review-time"> hc days ago</h3>
                </div>
                <div className="review-star-rating">
                    <StarsRender rating={commentData ? JSON.parse(commentData?.commentData?.rating) : 0}/>
                </div>
                <h3 className="lll-font-weight-medium lll-text-small">{commentData ? commentData?.commentData?.title : "name title"}</h3>
                <div className="review-comment">
                    {commentData ? commentData?.commentData?.comment : "comment error"}
                </div>
                <div className="review-action">
                    <button type="button"
                            className="reviewActionButton">
                        <svg height="24" width="24" viewBox="0 0 13.75 13.7" xmlns="http://www.w3.org/2000/svg"
                             className="" focusable="false" role="img" aria-hidden="true" data-testid="review-action-icon">
                            <path d="M13.67 6.94a2 2 0 0 0-1.93-1.74H9c.45-1.27.79-3.05 0-4.2a2.53 2.53 0 0 0-2.23-1 .51.51 0 0 0-.5.43S5.71 4.22 4 6H.5a.5.5 0 0 0-.5.5v6.7a.5.5 0 0 0 .5.5h9.06c2.3 0 3.21-1.65 3.75-3.09a7.46 7.46 0 0 0 .36-3.67ZM3.75 12.7H1V7h2.75Zm8.62-2.44c-.65 1.74-1.46 2.44-2.81 2.44H4.75V6.55A12 12 0 0 0 7.19 1a1.32 1.32 0 0 1 1 .54c.57.84.21 2.59-.33 3.95A.5.5 0 0 0 7.9 6a.51.51 0 0 0 .42.22h3.42a1 1 0 0 1 .94.87 6.5 6.5 0 0 1-.31 3.17Z"
                                  fill="currentColor"></path>
                        </svg>
                    </button>
                    <button type="button"
                            className="reviewActionButton">
                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                             className="review-container_commentIcon__XL3iX" focusable="false" role="img"
                             aria-hidden="true" data-testid="review-action-icon">
                            <path d="M20.39 7.52a1 1 0 0 0-1.39.92v.31A2.25 2.25 0 0 1 21.25 11v9.19l-1.84-1.84a3.76 3.76 0 0 0-2.65-1.1H12A2.25 2.25 0 0 1 9.75 15v-.25H14A3.75 3.75 0 0 0 17.75 11V5A3.75 3.75 0 0 0 14 1.25H5A3.75 3.75 0 0 0 1.25 5v13a.74.74 0 0 0 .46.69.74.74 0 0 0 .82-.16l3.12-3.12a2.27 2.27 0 0 1 1.59-.66h1V15A3.75 3.75 0 0 0 12 18.75h4.76a2.27 2.27 0 0 1 1.59.66l3.12 3.12a.74.74 0 0 0 .82.16.74.74 0 0 0 .46-.69V11a3.75 3.75 0 0 0-2.36-3.48Zm-15.8 6.83-1.84 1.84V5A2.25 2.25 0 0 1 5 2.75h9A2.25 2.25 0 0 1 16.25 5v6A2.25 2.25 0 0 1 14 13.25H7.24a3.76 3.76 0 0 0-2.65 1.1Z"
                                  fill="currentColor"></path>
                        </svg>
                        <span>Leave a comment</span>
                    </button>

                </div>
            </div>
        </div>
    }

    return <div className="review-container">
        <div className="review-part">
            <div className="review-header">
                <h2>Reviews</h2>
                <div className="rating-container">
                    <span className="lll-text-small lll-font-weight-medium"><span aria-hidden="true">4.4</span></span>
                    <span>
                    <div className="star-rating-container">
                        <div className="stars">
                            <Star/>
                            <Star/>
                            <Star/>
                            <Star/>
                            <Star percent="40%"/>
                        </div>
                    </div>
                </span>
                    <div className="text-body">
                        Based on HARD CODE
                    </div>

                </div>
                <div className="fit-range-container">
                    <span className="lll-text-small lll-font-weight-medium">Fits true to size</span>
                    <div className="fit-range">
                    <span className="text-body">
                        Smaller
                    </span>
                        <div className="review-box-container">
                            <div className="review-tooltip">
                                <input className="box-selector" type="radio" id="small"/>
                                <span aria-hidden="true"
                                      className="text-body tooltip-text">Small</span>
                            </div>
                            <div className="review-tooltip">
                                <input className="box-selector" type="radio" id="small"/>
                                <span aria-hidden="true"
                                      className="text-body tooltip-text">Small</span>
                            </div>
                            <div className="review-tooltip">
                                <input className="box-selector" type="radio" id="small"/>
                                <span aria-hidden="true"
                                      className="text-body tooltip-text">Small</span>
                            </div>
                            <div className="review-tooltip">
                                <input className="box-selector" type="radio" id="small"/>
                                <span aria-hidden="true"
                                      className="text-body tooltip-text">Small</span>
                            </div>
                            <div className="review-tooltip">
                                <input className="box-selector" type="radio" id="small"/>
                                <span aria-hidden="true"
                                      className="text-body tooltip-text">Small</span>
                            </div>
                        </div>
                        <span className="text-body">
                        Larger
                    </span>

                    </div>
                </div>
                <button className="lll-font-weight-medium write-a-review">Write a review</button>
            </div>
            <div className="review-container">
                <div className="review-filter">
                    <div className="review-sub-header lll-font-weight-medium">
                        Filter Reviews
                    </div>
                    <div className="review-search-box">
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
                    <div className="filters-container">
                        <div className="filer-sections">
                            <div className="section-header">
                                Rating
                            </div>
                            <div className="filter-option">
                                <div className="filter-checkbox">
                                    <input type="checkbox" className="lll-hidden-visually"/>
                                    <label htmlFor="rating_filter_0" className="checkbox-label">
                                        <span className="checkbox-icon"/>
                                        <span className="label-wrapper">5 stars</span>
                                    </label>
                                    <span className="num-of-match">123</span>
                                </div>
                                <div className="filter-checkbox">
                                    <input type="checkbox" className="lll-hidden-visually"/>
                                    <label htmlFor="rating_filter_1" className="checkbox-label">
                                        <span className="checkbox-icon"/>
                                        <span className="label-wrapper">4 stars</span>
                                    </label>
                                    <span className="num-of-match">hc</span>
                                </div>
                                <div className="filter-checkbox">
                                    <input type="checkbox" className="lll-hidden-visually"/>
                                    <label htmlFor="rating_filter_2" className="checkbox-label">
                                        <span className="checkbox-icon"/>
                                        <span className="label-wrapper">3 stars</span>
                                    </label>
                                    <span className="num-of-match">hc</span>
                                </div>
                                <div className="filter-checkbox">
                                    <input type="checkbox" className="lll-hidden-visually"/>
                                    <label htmlFor="rating_filter_3" className="checkbox-label">
                                        <span className="checkbox-icon"/>
                                        <span className="label-wrapper">2 stars</span>
                                    </label>
                                    <span className="num-of-match">hc</span>
                                </div>
                                <div className="filter-checkbox">
                                    <input type="checkbox" className="lll-hidden-visually"/>
                                    <label htmlFor="rating_filter_4" className="checkbox-label">
                                        <span className="checkbox-icon"/>
                                        <span className="label-wrapper">1 stars</span>
                                    </label>
                                    <span className="num-of-match">hc</span>
                                </div>
                            </div>

                        </div>
                        <div className="filer-sections">
                            <div className="section-header">
                                Photos
                            </div>
                            <div className="filter-option">
                                <div className="filter-checkbox">
                                    <input type="checkbox" className="lll-hidden-visually"/>
                                    <label htmlFor="rating_filter_5" className="checkbox-label">
                                        <span className="checkbox-icon"/>
                                        <span className="label-wrapper">Only show posts with images</span>
                                    </label>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="reviews">
                    <div className="review-section-subheader lll-font-weight-medium">
                        <div className="showing-result">
                            Showing hc of hc results
                        </div>
                        <div className="review-dropdown">
                            <button className="review-dropdown-button" onClick={()=> HandleDropDownButton()}>
                                Sort by:<strong>hard code</strong>
                                <svg height="8" width="14" fill="currentColor" stroke="currentColor" viewBox="0 0 14 8"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="dropdown-arrow" style={dropDownArrow} focusable="false" role="img"
                                     aria-hidden="true">
                                    <path
                                        d="m13 .99-6.47 6.5a.74.74 0 0 1-1.06 0L-1 .99l.35-.35a1 1 0 0 1 1.41 0L6 5.86 11.24.6a1 1 0 0 1 1.41 0z"
                                        fillRule="evenodd" stroke="none"></path>
                                </svg>
                            </button>
                            <div className="context-menu">
                                <ul className="active-menu" style={dropDownStyle}>
                                    <li role="option" aria-selected="false" id="downshift-0-item-0"
                                        className="context-menu-menuItem">
                                        <div className="context-menu_menuRipple">
                                            <div className="context-menu-selectItem context-menu-selectItemCurrent" onClick={()=>sortDataById()}>
                                                Most Recent
                                            </div>
                                        </div>
                                    </li>

                                    <li role="option" aria-selected="false" id="downshift-0-item-1"
                                        className="context-menu-menuItem">
                                        <div className="context-menu_menuRipple">
                                            <div className="context-menu-selectItem">
                                                Most Helpful
                                            </div>
                                        </div>
                                    </li>

                                    <li role="option" aria-selected="false" id="downshift-0-item-2"
                                        className="context-menu-menuItem">
                                        <div className="context-menu_menuRipple">
                                            <div className="context-menu-selectItem">
                                                Highest to Lowest Rating
                                            </div>
                                        </div>
                                    </li>

                                    <li role="option" aria-selected="false" id="downshift-0-item-3"
                                        className="context-menu-menuItem">
                                        <div className="context-menu_menuRipple">
                                            <div className="context-menu-selectItem">
                                                Lowest to Highest Rating
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        {jsonData ? jsonData.map((item, index) => (
                            <div key={index}>
                                <Comment commentData={item}/>
                            </div>
                        )) : <p>Loading Reviews...</p>}
                    </div>
                </div>
            </div>
        </div>


    </div>

}