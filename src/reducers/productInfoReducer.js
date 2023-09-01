import {colorId} from "../components/ProductInfo";
import {moveRight} from "../actions/productInfoAction";

const init = {
    selectColorId:"",
    selectImgId : "0",
    selectSize: "",
    realProductInfo:[],
    // realProductInfo: {
    //     "version": "LU_API_v1.1.0",
    //     "author": "ItLabPro data source for internal bootcamp use only! Copyright @ http://itlabpro.io/",
    //     "status": "Success",
    //     "rs": {
    //         "productId": "prod9820681",
    //         "swatches": [
    //             {
    //                 "colorId": "47824",
    //                 "swatch": "http://api-lulu.hibitbyte.com/static/images/swatches/Water_Drop_47824.jpg",
    //                 "swatchAlt": "Water Drop"
    //             },
    //             {
    //                 "colorId": "26375",
    //                 "swatch": "http://api-lulu.hibitbyte.com/static/images/swatches/Moonlit_Magenta_26375.jpg",
    //                 "swatchAlt": "Moonlit Magenta"
    //             },
    //             {
    //                 "colorId": "43635",
    //                 "swatch": "http://api-lulu.hibitbyte.com/static/images/swatches/Tidewater_Teal_43635.jpg",
    //                 "swatchAlt": "Tidewater Teal"
    //             },
    //             {
    //                 "colorId": "45772",
    //                 "swatch": "http://api-lulu.hibitbyte.com/static/images/swatches/Brier_Rose_45772.jpg",
    //                 "swatchAlt": "Brier Rose"
    //             },
    //             {
    //                 "colorId": "0001",
    //                 "swatch": "http://api-lulu.hibitbyte.com/static/images/swatches/Black_0001.jpg",
    //                 "swatchAlt": "Black"
    //             },
    //             {
    //                 "colorId": "45609",
    //                 "swatch": "http://api-lulu.hibitbyte.com/static/images/swatches/Ancient_Copper_45609.jpg",
    //                 "swatchAlt": "Ancient Copper"
    //             },
    //             {
    //                 "colorId": "47809",
    //                 "swatch": "http://api-lulu.hibitbyte.com/static/images/swatches/Red_Merlot_47809.jpg",
    //                 "swatchAlt": "Red Merlot"
    //             },
    //             {
    //                 "colorId": "47184",
    //                 "swatch": "http://api-lulu.hibitbyte.com/static/images/swatches/Heritage_365_Camo_Deep_Coal_Multi_47184.jpg",
    //                 "swatchAlt": "Heritage 365 Camo Deep Coal Multi"
    //             },
    //             {
    //                 "colorId": "26083",
    //                 "swatch": "http://api-lulu.hibitbyte.com/static/images/swatches/Dark_Olive_26083.jpg",
    //                 "swatchAlt": "Dark Olive"
    //             },
    //             {
    //                 "colorId": "43990",
    //                 "swatch": "http://api-lulu.hibitbyte.com/static/images/swatches/Diamond_Dye_Pitch_Grey_Graphite_Grey_43990.jpg",
    //                 "swatchAlt": "Diamond Dye Pitch Grey Graphite Grey"
    //             },
    //             {
    //                 "colorId": "31382",
    //                 "swatch": "http://api-lulu.hibitbyte.com/static/images/swatches/True_Navy_31382.jpg",
    //                 "swatchAlt": "True Navy"
    //             }
    //         ],
    //         "images": [
    //             {
    //                 "colorId": "47824",
    //                 "colorAlt": "Water Drop",
    //                 "mainCarousel": {
    //                     "media": "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47824/prod9820681_47824_img0.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47824/prod9820681_47824_img1.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47824/prod9820681_47824_img2.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47824/prod9820681_47824_img3.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47824/prod9820681_47824_img4.jpg",
    //                     "alt": "Water Drop Groove Super-High-Rise Flared Pant Nulu"
    //                 },
    //                 "whyWeMadeThis": [
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47824/prod9820681_47824_whyWeMadeThis_img0.jpg",
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47824/prod9820681_47824_whyWeMadeThis_img1.jpg"
    //                 ]
    //             },
    //             {
    //                 "colorId": "26375",
    //                 "colorAlt": "Moonlit Magenta",
    //                 "mainCarousel": {
    //                     "media": "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26375/prod9820681_26375_img0.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26375/prod9820681_26375_img1.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26375/prod9820681_26375_img2.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26375/prod9820681_26375_img3.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26375/prod9820681_26375_img4.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26375/prod9820681_26375_img5.jpg",
    //                     "alt": "moonlit magenta Groove Super-High-Rise Flared Pant Nulu"
    //                 },
    //                 "whyWeMadeThis": [
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26375/prod9820681_26375_whyWeMadeThis_img0.jpg",
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26375/prod9820681_26375_whyWeMadeThis_img1.jpg"
    //                 ]
    //             },
    //             {
    //                 "colorId": "43635",
    //                 "colorAlt": "Tidewater Teal",
    //                 "mainCarousel": {
    //                     "media": "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43635/prod9820681_43635_img0.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43635/prod9820681_43635_img1.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43635/prod9820681_43635_img2.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43635/prod9820681_43635_img3.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43635/prod9820681_43635_img4.jpg",
    //                     "alt": "Tidewater Teal Groove Super-High-Rise Flared Pant Nulu"
    //                 },
    //                 "whyWeMadeThis": [
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43635/prod9820681_43635_whyWeMadeThis_img0.jpg",
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43635/prod9820681_43635_whyWeMadeThis_img1.jpg"
    //                 ]
    //             },
    //             {
    //                 "colorId": "45772",
    //                 "colorAlt": "Brier Rose",
    //                 "mainCarousel": {
    //                     "media": "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45772/prod9820681_45772_img0.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45772/prod9820681_45772_img1.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45772/prod9820681_45772_img2.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45772/prod9820681_45772_img3.jpg",
    //                     "alt": "Brier Rose Groove Super-High-Rise Flared Pant Nulu"
    //                 },
    //                 "whyWeMadeThis": [
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45772/prod9820681_45772_whyWeMadeThis_img0.jpg",
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45772/prod9820681_45772_whyWeMadeThis_img1.jpg"
    //                 ]
    //             },
    //             {
    //                 "colorId": "0001",
    //                 "colorAlt": "Black",
    //                 "mainCarousel": {
    //                     "media": "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/0001/prod9820681_0001_img0.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/0001/prod9820681_0001_img1.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/0001/prod9820681_0001_img2.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/0001/prod9820681_0001_img3.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/0001/prod9820681_0001_img4.jpg",
    //                     "alt": "Black Groove Super-High-Rise Flared Pant Nulu"
    //                 },
    //                 "whyWeMadeThis": [
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/0001/prod9820681_0001_whyWeMadeThis_img0.jpg",
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/0001/prod9820681_0001_whyWeMadeThis_img1.jpg"
    //                 ]
    //             },
    //             {
    //                 "colorId": "45609",
    //                 "colorAlt": "Ancient Copper",
    //                 "mainCarousel": {
    //                     "media": "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45609/prod9820681_45609_img0.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45609/prod9820681_45609_img1.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45609/prod9820681_45609_img2.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45609/prod9820681_45609_img3.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45609/prod9820681_45609_img4.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45609/prod9820681_45609_img5.jpg",
    //                     "alt": "Ancient Copper Groove Super-High-Rise Flared Pant Nulu"
    //                 },
    //                 "whyWeMadeThis": [
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45609/prod9820681_45609_whyWeMadeThis_img0.jpg",
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/45609/prod9820681_45609_whyWeMadeThis_img1.jpg"
    //                 ]
    //             },
    //             {
    //                 "colorId": "47809",
    //                 "colorAlt": "Red Merlot",
    //                 "mainCarousel": {
    //                     "media": "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47809/prod9820681_47809_img0.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47809/prod9820681_47809_img1.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47809/prod9820681_47809_img2.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47809/prod9820681_47809_img3.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47809/prod9820681_47809_img4.jpg",
    //                     "alt": "Red Merlot Groove Super-High-Rise Flared Pant Nulu"
    //                 },
    //                 "whyWeMadeThis": [
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47809/prod9820681_47809_whyWeMadeThis_img0.jpg",
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47809/prod9820681_47809_whyWeMadeThis_img1.jpg"
    //                 ]
    //             },
    //             {
    //                 "colorId": "47184",
    //                 "colorAlt": "Heritage 365 Camo Deep Coal Multi",
    //                 "mainCarousel": {
    //                     "media": "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47184/prod9820681_47184_img0.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47184/prod9820681_47184_img1.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47184/prod9820681_47184_img2.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47184/prod9820681_47184_img3.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47184/prod9820681_47184_img4.jpg",
    //                     "alt": "Heritage 365 Camo Deep Coal Multi Groove Super-High-Rise Flared Pant Nulu"
    //                 },
    //                 "whyWeMadeThis": [
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47184/prod9820681_47184_whyWeMadeThis_img0.jpg",
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/47184/prod9820681_47184_whyWeMadeThis_img1.jpg"
    //                 ]
    //             },
    //             {
    //                 "colorId": "26083",
    //                 "colorAlt": "Dark Olive",
    //                 "mainCarousel": {
    //                     "media": "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26083/prod9820681_26083_img0.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26083/prod9820681_26083_img1.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26083/prod9820681_26083_img2.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26083/prod9820681_26083_img3.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26083/prod9820681_26083_img4.jpg",
    //                     "alt": "dark olive Groove Super-High-Rise Flared Pant Nulu"
    //                 },
    //                 "whyWeMadeThis": [
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26083/prod9820681_26083_whyWeMadeThis_img0.jpg",
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/26083/prod9820681_26083_whyWeMadeThis_img1.jpg"
    //                 ]
    //             },
    //             {
    //                 "colorId": "43990",
    //                 "colorAlt": "Diamond Dye Pitch Grey Graphite Grey",
    //                 "mainCarousel": {
    //                     "media": "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43990/prod9820681_43990_img0.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43990/prod9820681_43990_img1.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43990/prod9820681_43990_img2.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43990/prod9820681_43990_img3.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43990/prod9820681_43990_img4.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43990/prod9820681_43990_img5.jpg",
    //                     "alt": "Diamond Dye Pitch Grey Graphite Grey Groove Super-High-Rise Flared Pant Nulu"
    //                 },
    //                 "whyWeMadeThis": [
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43990/prod9820681_43990_whyWeMadeThis_img0.jpg",
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/43990/prod9820681_43990_whyWeMadeThis_img1.jpg"
    //                 ]
    //             },
    //             {
    //                 "colorId": "31382",
    //                 "colorAlt": "True Navy",
    //                 "mainCarousel": {
    //                     "media": "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/31382/prod9820681_31382_img0.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/31382/prod9820681_31382_img1.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/31382/prod9820681_31382_img2.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/31382/prod9820681_31382_img3.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/31382/prod9820681_31382_img4.jpg | http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/31382/prod9820681_31382_img5.jpg",
    //                     "alt": "True Navy Groove Super-High-Rise Flared Pant Nulu"
    //                 },
    //                 "whyWeMadeThis": [
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/31382/prod9820681_31382_whyWeMadeThis_img0.jpg",
    //                     "http://api-lulu.hibitbyte.com/static/images/productImages/prod9820681/31382/prod9820681_31382_whyWeMadeThis_img1.jpg"
    //                 ]
    //             }
    //         ],
    //         "name": "Groove Super-High-Rise Flared Pant Nulu",
    //         "price": "$128 CAD",
    //         "sizes": [
    //             {
    //                 "title": "Select Size",
    //                 "details": [
    //                     "0",
    //                     "2",
    //                     "4",
    //                     "6",
    //                     "8",
    //                     "10",
    //                     "12",
    //                     "14",
    //                     "16",
    //                     "18",
    //                     "20"
    //                 ]
    //             }
    //         ],
    //         "featureTitles": [
    //             {
    //                 "iconPath": "http://api-lulu.hibitbyte.com/static/images/icons/Designed_for_Yoga_and_On_the_Move.svg",
    //                 "title": "Designed for Yoga and On the Move",
    //                 "isLink": true
    //             },
    //             {
    //                 "iconPath": "http://api-lulu.hibitbyte.com/static/images/icons/Feels_Buttery-Soft_and_Weightless_Nulu™_Fabric.svg",
    //                 "title": "Feels Buttery-Soft and Weightless, Nulu™ Fabric",
    //                 "isLink": true
    //             },
    //             {
    //                 "iconPath": "http://api-lulu.hibitbyte.com/static/images/icons/Super-High_Rise_32.5_Length.svg",
    //                 "title": "Super-High Rise, 32.5\" Length",
    //                 "isLink": true
    //             },
    //             {
    //                 "iconPath": "http://api-lulu.hibitbyte.com/static/images/icons/Product_Features.svg",
    //                 "title": "Product Features",
    //                 "isLink": true
    //             }
    //         ],
    //         "whyWeMadeThis": "A coveted classic. These flared pants are perfect for your practice and beyond.",
    //         "featurePanels": [
    //             {
    //                 "iconPath": "http://api-lulu.hibitbyte.com/static/images/icons/Designed_for_Yoga_and_On_the_Move.svg",
    //                 "title": "Designed for Yoga and On the Move",
    //                 "isPanel": false
    //             },
    //             {
    //                 "iconPath": "http://api-lulu.hibitbyte.com/static/images/icons/Feels_Buttery-Soft_and_Weightless_Nulu™_Fabric(Click_to_Expand).svg",
    //                 "title": "Feels Buttery-Soft and Weightless, Nulu™ Fabric(Click to Expand)",
    //                 "isPanel": true,
    //                 "content": [
    //                     "So buttery-soft, it feels weightless",
    //                     "Four-way stretch",
    //                     "Sweat-wicking",
    //                     "Breathable",
    //                     "Added Lycra® fibre for stretch and shape retention"
    //                 ]
    //             },
    //             {
    //                 "iconPath": "http://api-lulu.hibitbyte.com/static/images/icons/Super-High_Rise_32.5_Length(Click_to_Expand).svg",
    //                 "title": "Super-High Rise, 32.5\" Length(Click to Expand)",
    //                 "isPanel": true,
    //                 "content": [
    //                     "Hugs your body from waist to hem",
    //                     "Flares out from the knee to hem",
    //                     "Full length intended to sit just off the ground",
    //                     "Super-high rise"
    //                 ]
    //             },
    //             {
    //                 "iconPath": "http://api-lulu.hibitbyte.com/static/images/icons/Product_Features(Click_to_Expand).svg",
    //                 "title": "Product Features(Click to Expand)",
    //                 "isPanel": true,
    //                 "content": [
    //                     "Back drop-in waistband pocket holds a card, key, or cell phone",
    //                     "This collection’s great for low-impact workouts like yoga or whenever you want to feel really, really comfortable"
    //                 ]
    //             },
    //             {
    //                 "iconPath": "http://api-lulu.hibitbyte.com/static/images/icons/Material_and_care(Click_to_Expand).svg",
    //                 "title": "Material and care(Click to Expand)",
    //                 "isPanel": true,
    //                 "content": [
    //                     "Pocket lining: 82% Nylon, 18% Lycra® elastane",
    //                     "Gusset: 56% Polyester, 33% Coolmax® polyester, 11% Lycra® elastane",
    //                     "Body: 81% Nylon, 19% Lycra® elastane",
    //                     "Wash with like colours",
    //                     "Machine wash cold",
    //                     "Do not bleach",
    //                     "Tumble dry low",
    //                     "Do not iron",
    //                     "Do not dry clean",
    //                     "Imported"
    //                 ]
    //             }
    //         ]
    //     },
    //     "message": "ItLabPro data source for internal bootcamp use only! Copyright @ http://itlabpro.io/"
    // },

}

export const productInfoReducer = (state = init, action) => {
    switch (action.type) {
        case 'fetchProductInformation':
            return {...state,realProductInfo:action?.payload,selectColorId: action?.payload2}
        case 'getSelectColorId':
            return {...state,selectColorId:action?.payload}
        case 'getSelectSize':
            return {...state,selectSize:action?.payload}
        case 'getSelectImgId':
            return {...state,selectImgId:action?.payload}
        case 'moveRight':
            const newSelectImgId = action.payload
            console.log("from===reducer",action.payload)
            const mainCarouselImagesLength = action.payload2
            let updatedSelectImgId
            if (newSelectImgId < mainCarouselImagesLength) {
                updatedSelectImgId = newSelectImgId + 1
            } else {
                updatedSelectImgId = 0
            }
            return { ...state, selectImgId: updatedSelectImgId }
        case 'moveLeft':
            const newSelectImgId2 = action.payload
            const mainCarouselImagesLength2 = action.payload2
            let updatedSelectImgId2
            if (newSelectImgId2 > -1 ) {
                updatedSelectImgId2 = newSelectImgId2 - 1
            } else {
                updatedSelectImgId2 = mainCarouselImagesLength2 - 1
            }
            console.log("from reducer",updatedSelectImgId2)
            return { ...state, selectImgId: updatedSelectImgId2 }
        default:
            return state
    }
}