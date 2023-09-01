import "./AccordionItem.scss"
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";


const FeaturePanel = (props) => {
    const { features, count, length} = props;
    // console.log('isPanel?', features.features.isPanel);
    const dispatch = useDispatch();

    const expandStateStore = useSelector(state => state?.accordionItemReducer?.expandingList);
    const isExpandingStore = expandStateStore[count];

    const expandCallback = () => {
        isExpandingStore!== true
            ? dispatch(actions?.accordionItemAction?.expandItem(count))
            : dispatch(actions?.accordionItemAction?.defaultExpanding(length))
        ;
    }

    return <>
        <div className="accordion-item_module_featurePanel">
            <div className="accordion-item_module_featurePanel_wrapper" id={`feature${count}`} onClick={expandCallback}>
                <div className="accordion-item_module_featurePanel_wrapper_left">
                    <img src={features.iconPath} alt=""/>
                    <span
                        className="accordion-item_module_featurePanel_wrapper_title">{features.isPanel ? (features.title.slice(0, -17)) : (features.title)}</span>
                </div>

                <div className="accordion-item_module_featurePanel_wrapper_icon iconExpanded"
                     style={{display: features.isPanel ? 'block' : 'none'}}>
                    <svg height="36" width="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                         className="accordionItemToggleIcon-2RhVn" focusable="false" role="presentation"
                         aria-hidden="true">
                        <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                              xmlns="http://www.w3.org/2000/svg"></path>
                    </svg>
                    <svg height="36" width="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                         className={`${isExpandingStore ? "isRotated" : 'change'}`} focusable="false" role="presentation"
                         aria-hidden="true">
                        <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z" stroke="currentColor"
                              xmlns="http://www.w3.org/2000/svg"></path>
                    </svg>
                </div>
            </div>

            {features.isPanel && <div className={`accordion-item_module_featurePanel_details${isExpandingStore?'':'_close'}`}>
                { features?.content.filter(item => typeof item === 'string').map((item,index)=>
                    <div className="accordion-item_module_featurePanel_details_detail" key={index}>
                    {item}
                </div>)}
            </div>
            }
        </div>
    </>
}

export const AccordionItem = () => {
    const currentUrl = new URL(window.location.href);
    const productId = currentUrl.pathname.slice(10);
    const itemList = JSON.parse(sessionStorage.getItem('productList'));

    // console.log(JSON.parse(itemList));
    let accordionItem = undefined;
    let featurePanels = undefined;

    itemList.forEach((item, index) => {
        if (item.productId === productId) {
            accordionItem = item;
            featurePanels = item.featurePanels;
        }
    })

    const dispatch = useDispatch();
    dispatch(actions?.accordionItemAction?.defaultExpanding(featurePanels.length))


    return <div className="accordion-item">
        <div className="accordion-item_module">
            <div className="accordion-item_module">

                {featurePanels.map((item, index) => <FeaturePanel features={item} key={index} count={index} length={featurePanels.length}/>)}

            </div>
        </div>
    </div>
}