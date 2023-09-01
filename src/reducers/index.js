import {combineReducers} from "redux";
import {filterReducer} from "./filterReducer";
import {choseReducer} from "./choseReducer";
import {productContentReducer} from "./productContentReducer";
import {productListItemReducer} from "./productListItemReducer";
import {headerReducers} from "./headerReducers";
import {accordionItemReducer} from "./accordionItemReducer";
import {productInfoReducer} from "./productInfoReducer";
import {checkoutReducer} from "./checkoutReducer";

export default combineReducers({
        filterReducer,
        choseReducer,
        productContentReducer,
        productListItemReducer,
        headerReducers,
        accordionItemReducer,
        productInfoReducer,
        checkoutReducer
})

