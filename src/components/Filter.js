import './Filter.scss'
import {blockDropDown, isClick, setGender, viewMore} from "../actions/filterAction";
import {useDispatch, useSelector} from "react-redux";
import {choseReducer} from "../reducers/choseReducer";
import {useEffect} from "react";
import productContentAction from "../actions/productContentAction";

export const Filter = () => {
    const dispatch = useDispatch()
    const isBlockDropDown = useSelector(state => state?.filterReducer?.isBlockDropDown)
    const gender = useSelector(state => state?.filterReducer?.gender)
    const sentState = useSelector(state => state?.choseReducer)

    const genderIsExpand = useSelector(state => state?.filterReducer?.genderIsExpand)
    const categoryIsExpand = useSelector(state => state?.filterReducer?.categoryIsExpand)
    const typeIsExpand = useSelector(state => state?.filterReducer?.typeIsExpand)
    const activityIsExpand = useSelector(state => state?.filterReducer?.activityIsExpand)
    const sizeIsExpand = useSelector(state => state?.filterReducer?.sizeIsExpand)
    const sizeTypeIsExpand = useSelector(state => state?.filterReducer?.sizeTypeIsExpand)
    const colourIsExpand = useSelector(state => state?.filterReducer?.colourIsExpand)
    const collectionIsExpand = useSelector(state => state?.filterReducer?.collectionIsExpand)
    const featuresIsExpand = useSelector(state => state?.filterReducer?.featuresIsExpand)
    const fabricIsExpand = useSelector(state => state?.filterReducer?.fabricIsExpand)


    const category = ['Leggings', 'Shirts', 'Coats & Jackets', 'Joggers', 'Hoodies & Sweatshirts', 'Accessories', 'Bags', 'Bodysuits', 'Button Down Shirts', 'Capris', 'Dresses', 'Hair Accessories', 'Hats', 'Long Sleeve Shirts', 'Pants', 'Polo Shirts', 'Shoes', 'Short Sleeve Shirts', 'Shorts', 'Socks', 'Sports Bras', 'Sweaters', 'Sweatpants','T-Shirts', 'Tank Tops', 'Team Canada', 'Track Pants', 'Trousers', 'Underwear','Water Bottles', 'Yoga Accessories', 'Yoga Mats', 'Hoodies']
    const type = ['Athletic Jackets', 'Athletic Shorts', 'Bomber Jackets', 'Bucket Hats', 'Cardigans', 'Chino Shorts', 'Crewneck Sweatshirts', 'Half Zip Sweatshirts', 'High Neck Bras', 'Hoodies', 'Keychains', 'Liner Shorts', 'Longline Bras', 'Onesies', 'Puffer Jackets', 'Pullover Sweaters', 'Racerback Bras', 'Rain Jackets', 'Rompers', 'Strappy Bras', 'Sweat Shorts']
    const activity = ['On the Move', 'Bike', 'Casual', 'Dance', 'Golf', 'Hiking', 'Running', 'Swim', 'Tennis', 'Thermal', 'Training', 'Travel', 'Work', 'Workout', 'Yoga']
    const size = ['0', '2','4','5','5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12', '14', '16', '18', '20', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '42', '44', '46', 'sizeDivider', 'XS', 'XS/S', 'S', 'S/M', 'M', 'M/L','L','L/XL','XL','XL/XXL','XXL','XXXL','sizeDivider','ONE SIZE']
    const sizeType = ['Plus Size','Tall', 'Short']
    const colour = ['Red','Yellow','Pink']
    const collection = ['ABC', 'Align', 'All Yours', 'Always In Motion', 'At Ease', 'City Sweat', 'Commission', 'Dance Studio', 'Define', 'Drysense', 'Energy', 'Engineered Warmth', 'Fast & Free', 'Free to Be', 'Fundamental']
    const features = ['Seamless', 'Anti Stink', 'Waterproof', 'Lightweight', 'Insulated', 'Reflective', 'Down', 'Primaloft', 'ABC Technology']
    const fabric = ['Everlux™', 'Nulu™', 'Nulux™', 'Luxtreme™', 'Ultralu™', 'Warpstreme™', 'Warpstreme™', 'Luon™', 'Wool', 'Cotton', 'Pima Cotton', 'French Terry', 'Swift', 'Fleece', 'Ripstop', 'Softstreme™', 'Utilitech™']

    const categoryIsViewMore = useSelector(state => state?.filterReducer?.categoryIsViewMore)
    const typeIsViewMore = useSelector(state => state?.filterReducer?.typeIsViewMore)
    const activityIsViewMore = useSelector(state => state?.filterReducer?.activityIsViewMore)
    const sizeIsViewMore = useSelector(state => state?.filterReducer?.sizeIsViewMore)
    const colourIsViewMore = useSelector(state => state?.filterReducer?.colourIsViewMore)
    const collectionIsViewMore = useSelector(state => state?.filterReducer?.collectionIsViewMore)
    const featuresIsViewMore = useSelector(state => state?.filterReducer?.featuresIsViewMore)
    const fabricIsViewMore = useSelector(state => state?.filterReducer?.fabricIsViewMore)

    const clickedIndexes = useSelector(state => state?.filterReducer?.clickedIndexes)
    // console.log(clickedIndexes)
    const filterClick = useSelector(state => state?.choseReducer)

    // useEffect(()=>console.log("filterClick state change=====>",filterClick),[filterClick])


    useEffect(() => {dispatch(productContentAction.fetchData(filterClick));}, [filterClick]);

    const filterList = useSelector(state => state?.choseReducer)
    const isHeaderExpand = useSelector(state => state?.filterReducer?.isHeaderExpand)
    const filterRenderArray = [];

    // for (const key in filterList) {
    //     // Checks whether an object contains specific properties
    //     if (filterList.hasOwnProperty(key)) {
    //         // eg: key = "Gender",
    //         // filterList["Gender"] = [{ "name": "Men", "isChecked": false },{ "name": "Women", "isChecked": false }]
    //         // eg: item = { "name": "Men", "isChecked": false }
    //         // item.name  => extracts the "name" property from each object, eg: "Men"
    //         const arrayValues = filterList[key];
    //         const namesArray = arrayValues.map(item => item.name);
    //         // object form in an array
    //         filterRenderArray.push({ [key]: namesArray });
    //     }
    // }


    return <div className='filter'>

        <div className='filterInside'>

            <div className='filter-header'>
                <h1 className='whatsNew'>
                    {clickedIndexes.includes('Men')
                        ? clickedIndexes.includes('Women')
                            ? "What's New"
                            : "Men's What's New"
                        : clickedIndexes.includes('Women')
                            ? "Women's What's New"
                            : "What's New"}
                </h1>
            </div>

            <nav>
                <div className='selectPage'>

                    {/*{filterRenderArray.map((item,index)=>{*/}
                    {/*    const moduleName = Object.keys(item)[0];*/}
                    {/*    const isModuleExpand = isHeaderExpand[moduleName];*/}
                    {/*    return <div className={`module ${moduleName}`} key={index}>*/}
                    {/*        <div className={`module-header ${moduleName}`} onClick={()=>dispatch(blockDropDown(`${moduleName}`))}>*/}
                    {/*            <h2>{moduleName}</h2>*/}
                    {/*            <div className='icon'>*/}
                    {/*                <svg height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"*/}
                    {/*                     className="accordionItemToggleIcon-2RhVn" focusable="false" role="presentation"*/}
                    {/*                     aria-hidden="true">*/}
                    {/*                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"*/}
                    {/*                          xmlns="http://www.w3.org/2000/svg"></path>*/}
                    {/*                </svg>*/}
                    {/*                <svg*/}
                    {/*                    className={`change ${isModuleExpand ? 'rotate-90' : ''}`}*/}
                    {/*                    height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"*/}
                    {/*                    focusable="false" role="presentation"*/}
                    {/*                    aria-hidden="true">*/}
                    {/*                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"*/}
                    {/*                          xmlns="http://www.w3.org/2000/svg"></path>*/}
                    {/*                </svg>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        <div className= {`module-select ${moduleName}`}*/}
                    {/*             style={{*/}
                    {/*                 opacity: isModuleExpand ? 1 : 0,*/}
                    {/*                 visibility: isModuleExpand ? 'visible' : 'hidden',*/}
                    {/*                 height: isModuleExpand ? 'auto' : 0,*/}
                    {/*                 paddingBottom: isModuleExpand ? '6px' : 0,*/}
                    {/*                 boxSizing: 'border-box',*/}
                    {/*                 overflow: 'hidden',*/}
                    {/*                 transition: 'all 0.3s ease-in, over',*/}
                    {/*             }}*/}
                    {/*        >*/}
                    {/*            <ul>*/}
                    {/*                <li className={moduleName}>*/}
                    {/*                    <span className={`${moduleName} selectBtn ${clickedIndexes.includes({moduleName}) ? 'clicked' : ''}`} onClick={()=>{dispatch(isClick({moduleName}))}}></span>*/}
                    {/*                    <div className="Men listItem">Men</div>*/}
                    {/*                </li>*/}
                    {/*                /!*<li className="Women">*!/*/}
                    {/*                /!*    <span className={`Women selectBtn ${clickedIndexes.includes('Women') ? 'clicked' : ''}`} onClick={()=>{dispatch(isClick('Women')); dispatch(setGender('women')); }}></span>*!/*/}
                    {/*                /!*    <div className="Women listIem">Women</div>*!/*/}
                    {/*                /!*</li>*!/*/}
                    {/*            </ul>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*})}*/}


                    {/*只有男女*/}
                    <div className='module gender'>
                        <div className='module-header gender' onClick={()=>dispatch(blockDropDown('gender'))}>
                            <h2>Gender</h2>
                            <div className='icon'>
                                <svg height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                     className="accordionItemToggleIcon-2RhVn" focusable="false" role="presentation"
                                     aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                                <svg
                                    className={`change ${genderIsExpand ? 'rotate-90' : ''}`}
                                    height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                      focusable="false" role="presentation"
                                     aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                            </div>
                        </div>
                        <div className='module-select gender'
                             style={{
                                 opacity: genderIsExpand ? 1 : 0,
                                 visibility: genderIsExpand ? 'visible' : 'hidden',
                                 height: genderIsExpand ? 'auto' : 0,
                                 paddingBottom: genderIsExpand ? '6px' : 0,
                                 boxSizing: 'border-box',
                                 overflow: 'hidden',
                                 transition: 'all 0.3s ease-in, over',
                             }}
                        >
                            <ul>
                                <li className="Men">
                                    <span className={`Men selectBtn ${clickedIndexes.includes('Men') ? 'clicked' : ''}`} onClick={()=>{dispatch(isClick('Men')); dispatch(setGender('men')); }}></span>

                                    <div className="Men listItem">Men</div>
                                </li>
                                <li className="Women">
                                    <span className={`Women selectBtn ${clickedIndexes.includes('Women') ? 'clicked' : ''}`} onClick={()=>{dispatch(isClick('Women')); dispatch(setGender('women')); }}></span>
                                    <div className="Women listIem">Women</div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/*Category*/}
                    <div className='module category'>
                        <div className='module-header category' onClick={()=>dispatch(blockDropDown('category'))}>
                            <h2>Category</h2>
                            <div className='icon'>
                                <svg height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                     className="accordionItemToggleIcon-2RhVn" focusable="false" role="presentation"
                                     aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                                <svg
                                    className={`change ${categoryIsExpand  ? 'rotate-90' : ''}`}
                                    height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                    focusable="false" role="presentation"
                                    aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                            </div>
                        </div>
                        <div className='module-select category'
                             style={{
                                 opacity: categoryIsExpand ? 1 : 0,
                                 visibility: categoryIsExpand ? 'visible' : 'hidden',
                                 height: categoryIsExpand ? 'auto' : 0,
                                 paddingBottom: categoryIsExpand ? '6px' : 0,
                                 boxSizing: 'border-box',
                                 overflow: 'hidden',
                                 transition: 'all 0.3s ease-in',
                             }}
                        >
                            <ul style={{
                                height : categoryIsViewMore ? '990px': '150px',
                                transition: 'all 0.3s ease-in',
                                overflow: 'hidden'
                            }}>
                                {category.map((item, index) => (
                                    <li className={item} key={index}>
                                        <span className={`${item} selectBtn ${clickedIndexes.includes(item) ? 'clicked' : ''}`} onClick={() => dispatch(isClick(item)) }></span>
                                        <div className={`${item} listItem`}>{item}</div>
                                    </li>
                                ))}
                            </ul>

                            <div className='viewMore' onClick={() => dispatch(viewMore('category'))}>
                                <p className='viewMoreFont'>{categoryIsViewMore ? 'View Less': 'View More'}</p>
                                <p className={categoryIsViewMore ? 'viewLessIcon': 'viewMoreIcon'}>{categoryIsViewMore ? '一': '+'}</p>
                            </div>
                        </div>
                    </div>

                    {/*Type*/}
                    <div className='module type'>
                        <div className='module-header type' onClick={()=>dispatch(blockDropDown('type'))}>
                            <h2>Type</h2>
                            <div className='icon'>
                                <svg height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                     className="accordionItemToggleIcon-2RhVn" focusable="false" role="presentation"
                                     aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                                <svg
                                    className={`change ${typeIsExpand  ? 'rotate-90' : ''}`}
                                    height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                    focusable="false" role="presentation"
                                    aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                            </div>
                        </div>
                        <div className='module-select type'
                             style={{
                                 opacity: typeIsExpand ? 1 : 0,
                                 visibility: typeIsExpand ? 'visible' : 'hidden',
                                 height: typeIsExpand ? 'auto' : 0,
                                 paddingBottom: typeIsExpand ? '6px' : 0,
                                 boxSizing: 'border-box',
                                 overflow: 'hidden',
                                 transition: 'all 0.3s ease-in, over',
                             }}
                        >
                            <ul style={{
                                height : typeIsViewMore ? '630px': '150px',
                                transition: 'all 0.3s ease-in',
                                overflow: 'hidden'
                            }}>
                                {type.map((item, index) => (
                                    <li className={item} key={index}>
                                        <span className={`${item} selectBtn ${clickedIndexes.includes(item) ? 'clicked' : ''}`} onClick={() => dispatch(isClick(item)) }></span>
                                        <div className={`${item} listItem`}>{item}</div>
                                    </li>
                                ))}
                            </ul>

                            <div className='viewMore' onClick={() => dispatch(viewMore('type'))}>
                                <p className='viewMoreFont'>{typeIsViewMore ? 'View Less': 'View More'}</p>
                                <p className={typeIsViewMore ? 'viewLessIcon': 'viewMoreIcon'}>{typeIsViewMore ? '一': '+'}</p>
                            </div>
                        </div>
                    </div>

                    {/*Activity*/}
                    <div className='module activity'>
                        <div className='module-header activity' onClick={()=>dispatch(blockDropDown('activity'))}>
                            <h2>Activity</h2>
                            <div className='icon'>
                                <svg height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                     className="accordionItemToggleIcon-2RhVn" focusable="false" role="presentation"
                                     aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                                <svg
                                    className={`change ${activityIsExpand  ? 'rotate-90' : ''}`}
                                    height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                    focusable="false" role="presentation"
                                    aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>

                            </div>
                        </div>
                        <div className='module-select activity'
                             style={{
                                 opacity: activityIsExpand ? 1 : 0,
                                 visibility: activityIsExpand ? 'visible' : 'hidden',
                                 height: activityIsExpand ? 'auto' : 0,
                                 paddingBottom: activityIsExpand ? '6px' : 0,
                                 boxSizing: 'border-box',
                                 overflow: 'hidden',
                                 transition: 'all 0.3s ease-in, over',
                             }}
                        >
                            <ul style={{
                                height : activityIsViewMore ? '440px': '150px',
                                transition: 'all 0.3s ease-in',
                                overflow: 'hidden'
                            }}>
                                {activity.map((item, index) => (
                                    <li className={item} key={index}>
                                        <span className={`${item} selectBtn ${clickedIndexes.includes(item) ? 'clicked' : ''}`} onClick={() => dispatch(isClick(item)) }></span>
                                        <div className={`${item} listItem`}>{item}</div>
                                    </li>
                                ))}
                            </ul>

                            <div className='viewMore' onClick={() => dispatch(viewMore('activity'))}>
                                <p className='viewMoreFont'>{activityIsViewMore ? 'View Less': 'View More'}</p>
                                <p className={activityIsViewMore ? 'viewLessIcon': 'viewMoreIcon'}>{activityIsViewMore ? '一': '+'}</p>
                            </div>
                        </div>
                    </div>

                    {/*Size*/}
                    <div className='module size'>
                        <div className='module-header size' onClick={()=>dispatch(blockDropDown('size'))}>
                            <h2>Size</h2>
                            <div className='icon'>
                                <svg height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                     className="accordionItemToggleIcon-2RhVn" focusable="false" role="presentation"
                                     aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                                <svg
                                    className={`change ${sizeIsExpand  ? 'rotate-90' : ''}`}
                                    height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                    focusable="false" role="presentation"
                                    aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                            </div>
                        </div>
                        <div className='module-select size'
                             style={{
                                 opacity: sizeIsExpand ? 1 : 0,
                                 visibility: sizeIsExpand ? 'visible' : 'hidden',
                                 height: sizeIsExpand ? 'auto' : 0,
                                 paddingBottom: sizeIsExpand ? '6px' : 0,
                                 boxSizing: 'border-box',
                                 overflow: 'hidden',
                                 transition: 'all 0.3s ease-in, over',
                             }}
                        >
                            <ul style={{
                                height : sizeIsViewMore ? '1610px': '150px',
                                transition: 'all 0.3s ease-in',
                                overflow: 'hidden'
                            }}>
                                {size.map((item, index) => (
                                    <li className={item} key={index}>
                                        <span className={`${item} selectBtn ${clickedIndexes.includes(item) ? 'clicked' : ''}`} onClick={() => dispatch(isClick(item)) }></span>
                                        <div className={`${item} listItem`}>{item}</div>
                                    </li>
                                ))}
                            </ul>

                            <div className='viewMore' onClick={() => dispatch(viewMore('size'))}>
                                <p className='viewMoreFont'>{sizeIsViewMore ? 'View Less': 'View More'}</p>
                                <p className={sizeIsViewMore ? 'viewLessIcon': 'viewMoreIcon'}>{sizeIsViewMore ? '一': '+'}</p>
                            </div>
                        </div>
                    </div>

                    {/*Size Type*/}
                    <div className='module sizeType'>
                        <div className='module-header sizeType' onClick={()=>dispatch(blockDropDown('sizeType'))}>
                            <h2>Size Type</h2>
                            <div className='icon'>
                                <svg height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                     className="accordionItemToggleIcon-2RhVn" focusable="false" role="presentation"
                                     aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                                <svg
                                    className={`change ${sizeTypeIsExpand  ? 'rotate-90' : ''}`}
                                    height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                    focusable="false" role="presentation"
                                    aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                            </div>
                        </div>
                        <div className='module-select sizeType'
                             style={{
                                 opacity: sizeTypeIsExpand ? 1 : 0,
                                 visibility: sizeTypeIsExpand ? 'visible' : 'hidden',
                                 height: sizeTypeIsExpand ? 'auto' : 0,
                                 paddingBottom: sizeTypeIsExpand ? '6px' : 0,
                                 boxSizing: 'border-box',
                                 overflow: 'hidden',
                                 transition: 'all 0.3s ease-in, over',
                             }}
                        >
                            <ul>
                                {sizeType.map((item, index) => (
                                    <li className={item} key={index}>
                                        <span className={`${item} selectBtn ${clickedIndexes.includes(item) ? 'clicked' : ''}`} onClick={() => dispatch(isClick(item)) }></span>
                                        <div className={`${item} listItem`}>{item}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/*Colour*/}
                    <div className='module colour'>
                        <div className='module-header colour' onClick={()=>dispatch(blockDropDown('colour'))}>
                            <h2>Colour</h2>
                            <div className='icon'>
                                <svg height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                     className="accordionItemToggleIcon-2RhVn" focusable="false" role="presentation"
                                     aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                                <svg
                                    className={`change ${colourIsExpand  ? 'rotate-90' : ''}`}
                                    height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                    focusable="false" role="presentation"
                                    aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                            </div>
                        </div>
                        <div className='module-select colour'
                             style={{
                                 opacity: colourIsExpand ? 1 : 0,
                                 visibility: colourIsExpand ? 'visible' : 'hidden',
                                 height: colourIsExpand ? 'auto' : 0,
                                 paddingBottom: colourIsExpand ? '6px' : 0,
                                 boxSizing: 'border-box',
                                 overflow: 'hidden',
                                 transition: 'all 0.3s ease-in, over',
                             }}
                        >
                            <ul>
                                {colour.map((item, index) => (
                                    <li className={item} key={index}>
                                        <span className={`${item} selectBtn ${clickedIndexes.includes(item) ? 'clicked' : ''}`} onClick={() => dispatch(isClick(item)) }></span>
                                        <div className={`${item} listItem`}>{item}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/*Collection*/}
                    <div className='module collection'>
                        <div className='module-header collection' onClick={()=>dispatch(blockDropDown('collection'))}>
                            <h2>Collection</h2>
                            <div className='icon'>
                                <svg height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                     className="accordionItemToggleIcon-2RhVn" focusable="false" role="presentation"
                                     aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                                <svg
                                    className={`change ${collectionIsExpand  ? 'rotate-90' : ''}`}
                                    height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                    focusable="false" role="presentation"
                                    aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                            </div>
                        </div>
                        <div className='module-select collection'
                             style={{
                                 opacity: collectionIsExpand ? 1 : 0,
                                 visibility: collectionIsExpand ? 'visible' : 'hidden',
                                 height: collectionIsExpand ? 'auto' : 0,
                                 paddingBottom: collectionIsExpand ? '6px' : 0,
                                 boxSizing: 'border-box',
                                 overflow: 'hidden',
                                 transition: 'all 0.3s ease-in, over',
                             }}
                        >
                            <ul style={{
                                height : collectionIsViewMore ? '450px': '150px',
                                transition: 'all 0.3s ease-in',
                                overflow: 'hidden'
                            }}>
                                {collection.map((item, index) => (
                                    <li className={item} key={index}>
                                        <span className={`${item} selectBtn ${clickedIndexes.includes(item) ? 'clicked' : ''}`} onClick={() => dispatch(isClick(item)) }></span>
                                        <div className={`${item} listItem`}>{item}</div>
                                    </li>
                                ))}
                            </ul>

                            <div className='viewMore' onClick={() => dispatch(viewMore('collection'))}>
                                <p className='viewMoreFont'>{collectionIsViewMore ? 'View Less': 'View More'}</p>
                                <p className={collectionIsViewMore ? 'viewLessIcon': 'viewMoreIcon'}>{collectionIsViewMore ? '一': '+'}</p>
                            </div>
                        </div>
                    </div>

                    {/*Features*/}
                    <div className='module features'>
                        <div className='module-header features' onClick={()=>dispatch(blockDropDown('features'))}>
                            <h2>Features</h2>
                            <div className='icon'>
                                <svg height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                     className="accordionItemToggleIcon-2RhVn" focusable="false" role="presentation"
                                     aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                                <svg
                                    className={`change ${featuresIsExpand  ? 'rotate-90' : ''}`}
                                    height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                    focusable="false" role="presentation"
                                    aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                            </div>
                        </div>
                        <div className='module-select features'
                             style={{
                                 opacity: featuresIsExpand ? 1 : 0,
                                 visibility: featuresIsExpand ? 'visible' : 'hidden',
                                 height: featuresIsExpand ? 'auto' : 0,
                                 paddingBottom: featuresIsExpand ? '6px' : 0,
                                 boxSizing: 'border-box',
                                 overflow: 'hidden',
                                 transition: 'all 0.3s ease-in, over',
                             }}
                        >
                            <ul style={{
                                height : featuresIsViewMore ? '270px': '150px',
                                transition: 'all 0.3s ease-in',
                                overflow: 'hidden'
                            }}>
                                {features.map((item, index) => (
                                    <li className={item} key={index}>
                                        <span className={`${item} selectBtn ${clickedIndexes.includes(item) ? 'clicked' : ''}`} onClick={() => dispatch(isClick(item)) }></span>
                                        <div className={`${item} listItem`}>{item}</div>
                                    </li>
                                ))}
                            </ul>

                            <div className='viewMore' onClick={() => dispatch(viewMore('features'))}>
                                <p className='viewMoreFont'>{featuresIsViewMore ? 'View Less': 'View More'}</p>
                                <p className={featuresIsViewMore ? 'viewLessIcon': 'viewMoreIcon'}>{featuresIsViewMore ? '一': '+'}</p>
                            </div>
                        </div>
                    </div>

                    {/*Fabric*/}
                    <div className='module fabric' style={{ borderBottom: '0.0625rem solid #e5e6e7'}}>
                        <div className='module-header fabric' onClick={()=>dispatch(blockDropDown('fabric'))}>
                            <h2>Fabric</h2>
                            <div className='icon'>
                                <svg height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                     className="accordionItemToggleIcon-2RhVn" focusable="false" role="presentation"
                                     aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                                <svg
                                    className={`change ${fabricIsExpand  ? 'rotate-90' : ''}`}
                                    height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                    focusable="false" role="presentation"
                                    aria-hidden="true">
                                    <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"></path>
                                </svg>
                            </div>
                        </div>
                        <div className='module-select fabric'
                             style={{
                                 opacity: fabricIsExpand ? 1 : 0,
                                 visibility: fabricIsExpand ? 'visible' : 'hidden',
                                 height: fabricIsExpand ? 'auto' : 0,
                                 paddingBottom: fabricIsExpand ? '6px' : 0,
                                 boxSizing: 'border-box',
                                 overflow: 'hidden',
                                 transition: 'all 0.3s ease-in, over',
                             }}
                        >
                            <ul style={{
                                height : fabricIsViewMore ? '510px': '150px',
                                transition: 'all 0.3s ease-in',
                                overflow: 'hidden'
                            }}>
                                {fabric.map((item, index) => (
                                    <li className={item} key={index}>
                                        <span className={`${item} selectBtn ${clickedIndexes.includes(item) ? 'clicked' : ''}`} onClick={() => dispatch(isClick(item)) }></span>
                                        <div className={`${item} listItem`}>{item}</div>
                                    </li>
                                ))}
                            </ul>

                            <div className='viewMore' onClick={() => dispatch(viewMore('fabric'))}>
                                <p className='viewMoreFont'>{fabricIsViewMore ? 'View Less': 'View More'}</p>
                                <p className={fabricIsViewMore ? 'viewLessIcon': 'viewMoreIcon'}>{fabricIsViewMore ? '一': '+'}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    </div>
}
