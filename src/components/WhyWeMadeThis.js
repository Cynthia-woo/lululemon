import "./WhyWeMadeThis.scss"
import {useSelector} from "react-redux";

export const WhyWeMadeThis = () =>{
    const productInfo = useSelector(state => state?.productInfoReducer?.realProductInfo)
    const selectColorId = useSelector(state => state?.productInfoReducer?.selectColorId)
    const selectedColorImages = productInfo?.rs?.images.find((image) => image?.colorId === selectColorId)

    return <div className="why-we-made-this">
        <div className="why-we-made-this_text-container">
            <div className="why-we-made-this_text-inner">
                <h2 className="why-we-made-this_heading">
                    Why we
                    <br/>
                    made this
                </h2>
                <p className="why-we-made-this_description">
                    {productInfo?.rs?.whyWeMadeThis}
                </p>
            </div>
        </div>
        <div className="why-we-made-this_img-container">
            <img src={selectedColorImages?.whyWeMadeThis[0]} alt=""/>
            <img src={selectedColorImages?.whyWeMadeThis[1]} alt=""/>
        </div>
    </div>
}