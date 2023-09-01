import "./Checkout.scss"
import React, {useEffect, useState} from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import {Payment} from "./Payment";
import {OrderSummary} from "./OrderSummary";

export const Checkout = () => {


    // get email and password input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEventOutput, setIsEventOutput] = useState(false);
    const [isEventOutput2, setIsEventOutput2] = useState(false);
    const [emailClicked, setEmailClicked] = useState(false);
    const [passwordClicked, setPasswordClicked] = useState(false);


    useEffect(() => {
        const validateResult = document.getElementById('validateResult');
        if (!isEventOutput) {
            const emailInput = document.getElementById("inputEmail");
            if (emailInput) {
                emailInput.focus();
                emailInput.addEventListener("keyup", (e) => {
                    // console.log(e.target.value);
                    setEmail(e.target.value);
                    setEmailClicked(true);
                })
            } else {
                console.log('email undefined')
            }
            setIsEventOutput(true);
        }
        if (email === null || email === "" || email === undefined) {
            // console.log('Please enter an email address');
            validateResult.innerText = 'Please enter an email address'
        } else {
            if (validateEmail(email)) {
                // console.log('[validate:]true');
                validateResult.innerText = ''
                setEmailClicked(false);
            } else {
                // console.log('[validate:]wrong')
                validateResult.innerText = 'Email address is not in the correct format (xxx@yyy.zzz). Please correct the email address';
                setEmailClicked(true);
            }
        }


        const validateResult2 = document.getElementById('validateResult_pwd');
        if (!isEventOutput2) {
            const passwordInput = document.getElementById("inputPassword");
            if (passwordInput) {
                passwordInput.focus();
                passwordInput.addEventListener("keyup", (e) => {
                    // console.log(e.target.value);
                    setPassword(e.target.value);
                    setPasswordClicked(true);
                })
            } else {
                console.log('pwd undefined')
            }
            setIsEventOutput2(true);
        }
        if (password === null || password === "" || password === undefined) {
            validateResult2.innerText = 'Please enter your password'
            // setPasswordClicked(true);
        } else {
            validateResult2.innerText = ''
            setPasswordClicked(false);
        }

    }, [email, password])

    // validate email pattern
    const validateEmail = email => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        // console.log(emailPattern.test(email));
        return emailPattern.test(email);
    }
    // validate valid password
    const validatePassword = password => {
        if (password === null || password === "" || password === undefined) {
            return false;
        } else {
            return true;
        }
    }

    // standardize phone pattern
    const standardizePhone = phone => {
        if (1 <= phone.length && phone.length < 3) {
            return `(${phone}`
        } else if (3 <= phone.length && phone.length < 6) {
            return `(${phone.substring(0, 3)})${phone.substring(3, 7)}`
        } else if (6 <= phone.length && phone.length < 10) {
            return `(${phone.substring(0, 3)})${phone.substring(3, 6)}-${phone.substring(6, 10)}`
        } else if (phone.length >= 10) {
            return `(${phone.substring(0, 3)})${phone.substring(3, 6)}-${phone.substring(6, 10)}`
        } else {
            return ''
        }
    }
    // validate phone pattern
    const validatePhone = phone => {
        const phonePattern = /^\d{10}$/;
        // console.log(emailPattern.test(email));
        return phonePattern.test(phone);
    }

    // log in submit
    const dispatch = useDispatch();
    const signIn = useSelector(state => state?.checkoutReducer?.signIn);
    const token = useSelector(state => state?.checkoutReducer?.token);
    // const token = sessionStorage.getItem('token');
    const signInState = useSelector(state => state?.checkoutReducer?.signInState);
    const useLogIn = () => {
        if (validateEmail(email) && validatePassword(password)) {
            dispatch(actions?.checkoutAction?.signIn(`{
                "email":"${email}",
                "password":"${password}"
            }`))
        }
    }

    // get contact email input
    const [emailContact, setEmailContact] = useState("");
    const [isEventOutputContact, setIsEventOutputContact] = useState(false);
    const [emailContactClicked, setEmailContactClicked] = useState(false);


    // validate contact email
    useEffect(() => {
        const validateResult_contactEmail = document.getElementById('validateResult_contactEmail');
        if (!isEventOutputContact) {
            const emailContactInput = document.getElementById("inputContactEmail");
            if (emailContactInput) {
                emailContactInput.focus();
                emailContactInput.addEventListener("keyup", (e) => {
                    // console.log(e.target.value);
                    setEmailContact(e.target.value);
                    setEmailContactClicked(true);
                })
            } else {
                console.log('contact email undefined')
            }
            setIsEventOutputContact(true);
        }
        if (emailContact === null || emailContact === "" || emailContact === undefined) {
            // console.log('Please enter an email address');
            validateResult_contactEmail.innerText = 'Please enter an email address';
        } else {
            if (validateEmail(emailContact)) {
                // console.log('[validate:]true');
                validateResult_contactEmail.innerText = ''
                setEmailContactClicked(false);
            } else {
                // console.log('[validate:]wrong')
                validateResult_contactEmail.innerText = 'Email address is not in the correct format (xxx@yyy.zzz). Please correct the email address'
                setEmailContactClicked(true);
            }
        }
    }, [emailContact])

    // contact policy clicked
    const [contactPolicyIsHovered, setContactPolicyIsHovered] = useState(false);
    const [contactPolicyIsClicked, setContactPolicyIsClicked] = useState(false);


    // get shipping phone input
    const [phoneShipping, setPhoneShipping] = useState("");
    const [isEventOutputShipping, setIsEventOutputShipping] = useState(false);
    const [phoneShippingClicked, setPhoneShippingClicked] = useState(false);


    const validatePhoneDetails = phoneShipping => {
        const validateResult_phoneShipping = document.getElementById('validateResult_phoneShipping');

        if (phoneShipping === null || phoneShipping === "" || phoneShipping === undefined) {
            // console.log('Please enter an email address');
            validateResult_phoneShipping.innerText = 'Please enter your phone number.';
        } else {
            if (validatePhone(phoneShipping)) {
                // console.log('[validate:]true');
                validateResult_phoneShipping.innerText = ''
                setPhoneShippingClicked(false);
            } else {
                // console.log('[validate:]wrong')
                validateResult_phoneShipping.innerText = 'Please enter a valid 10-digit phone number.'
                setPhoneShippingClicked(true);
            }
        }

    }


    // validate shipping phone pattern
    const setPhone = () => {
        if (!isEventOutputShipping) {
            const phoneShippingInput = document.getElementById("inputPhoneShipping");
            if (phoneShippingInput) {
                phoneShippingInput.focus();
                phoneShippingInput.addEventListener("keyup", (e) => {
                    console.log(e)
                    if (e.key === "Backspace") {
                        if (isNaN(e.target.value.charAt(-1))) {
                            e.target.value = e.target.value.slice(0, -1);
                        }
                    }

                    setPhoneShipping(e.target.value.replace(/\D/g, '').substring(0, 10));
                    e.target.value = standardizePhone(e.target.value.replace(/\D/g, ''));
                    if (e.key === "Backspace") {
                        // if (isNaN(e.target.value.charAt(-1))) {
                        //     e.target.value = e.target.value.slice(0,-1);
                        // }
                        if (e.target.value.length === 5 || e.target.value.length === 9) {
                            e.target.value = e.target.value.slice(0, -1);
                        }
                    }
                    console.log('phone shipping is ', e.target.value)
                    setPhoneShippingClicked(true);
                    validatePhoneDetails(e.target.value.replace(/\D/g, '').substring(0, 10))
                })
            } else {
                console.log('shipping phone undefined')
            }
            setIsEventOutputShipping(true);
        }
    }


    return <div className='checkout-container'>
        <header>

            <div className="simple-header">
                <nav className="simple-nav">
                    <a href="/" className="simple-anchor">
                        <svg viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg" width="34" height="34">
                            <path
                                d="M13.499 0C20.956 0 27 6.045 27 13.5 27 20.957 20.956 27 13.499 27 6.044 27 0 20.958 0 13.5 0 6.044 6.044 0 13.499 0zm7.076 20.18c-.425 0-.825-.127-1.22-.391-2.184-1.454-1.438-3.198.053-5.897.63-1.145 1.282-2.324 1.572-3.542.311-1.31.594-3.22-.542-4.664-.534-.677-1.347-1.2-2.413-1.554-1.112-.367-2.54-.566-4.25-.589l-.118-.003-.434.003c-1.709.023-3.139.222-4.248.589-1.068.354-1.88.876-2.415 1.554-1.136 1.445-.853 3.354-.54 4.664.288 1.218.941 2.4 1.57 3.541 1.491 2.7 2.238 4.444.052 5.898-.394.264-.792.39-1.218.39-.85 0-1.83-.425-2.352-.685l.127.223c1.08 1.621 2.468 2.483 4.01 2.483.676 0 1.39-.164 2.12-.488.775-.343 1.455-.971 1.917-1.769.46-.798.643-1.657.512-2.421-.158-.685-.516-1.606-.927-2.673-1.077-2.783-2.548-6.588-1.278-8.449.536-.785 1.5-1.169 2.945-1.174 1.447.005 2.41.389 2.946 1.174 1.272 1.861-.2 5.666-1.275 8.445-.413 1.068-.77 1.99-.928 2.67-.132.771.05 1.63.512 2.428s1.142 1.426 1.917 1.77c.73.323 1.444.487 2.12.487 1.542 0 2.93-.862 4.015-2.49l.122-.216c-.52.26-1.5.686-2.352.686z"
                                id="Combined-Shape" fillRule="nonzero" fill="#d31334"></path>
                        </svg>
                    </a>

                </nav>
                <div className="shoppingIcon">
                    <a href="https://shop.lululemon.com/shop/mybag"
                       className="anchor_anchor__1pPYT cart-icon_shoppingCartIcon__3_Ab7" rel="nofollow"
                       title="0 items" aria-label="0 items in the bag, click to view the bag"
                       data-lulu-track="nav-link"
                       data-lulu-attributes="{&quot;type&quot;:&quot;link&quot;,&quot;link&quot;:{&quot;type&quot;:&quot;hdr-cart&quot;,&quot;name&quot;:&quot;My%20Bag&quot;,&quot;id&quot;:&quot;my-bag&quot;},&quot;version&quot;:&quot;1.0&quot;}"
                       data-testid="cart-icon">
                        <svg height="24" width="24" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg"
                             focusable="false" role="img" aria-labelledby="icon_:Ravemll6:"
                             aria-hidden="false"><title id="icon_:Ravemll6:">bagIcon</title>
                            <path
                                d="M20 6.25h-3.25c-.68-3.62-2.53-6-4.75-6s-4.07 2.38-4.75 6H4a.76.76 0 0 0-.75.75v12A4.75 4.75 0 0 0 8 23.75h8A4.75 4.75 0 0 0 20.75 19V7a.76.76 0 0 0-.75-.75zm-8-4.5c1.38 0 2.66 1.84 3.22 4.5H8.78c.56-2.66 1.84-4.5 3.22-4.5zM19.25 19A3.26 3.26 0 0 1 16 22.25H8A3.26 3.26 0 0 1 4.75 19V7.75H7l-.24 2.16.49.06a1 1 0 0 0 1.12-.87l.17-1.35h6.92l.17 1.35a1 1 0 0 0 1.12.87l.49-.06L17 7.75h2.28L19.25 19z"
                                fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                        <span id="cart-total" className="cart-icon">0</span></a>
                </div>

            </div>
        </header>


        <div className="layout">
            <h1 className="layout_header">
                Checkout
            </h1>
            <div className="layout_timeOut"
                 style={{display: 'none'}}
            >
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                     className="iconBlock-1wZMf" focusable="false" role="img" aria-hidden="true">
                    <g fill="none" fillRule="evenodd">
                        <path d="M12 3.088 1.685 22h20.63z" stroke="currentColor" strokeWidth="2"></path>
                        <path
                            d="M13.284 18.65a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0zm-2.4-8.973c.34-.11 1.48-.344 1.756-.242.271.11.435.314.45.56l.114 6.289c-.34.11-1.608.362-1.884.26-.271-.111-.435-.315-.45-.56z"
                            fill="currentColor"></path>
                    </g>
                </svg>
                <span>To protect your personal information, your session has automatically timed out. Please begin checkout again.</span>
            </div>
            <div className="layout_mainContent">

                <div className="layout_mainContent_checkoutInfo">
                    <div className="layout_mainContent_checkoutInfo_logInSuccess"
                         style={{display: token ? 'block' : 'none'}}>
                        <h2>
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                 className="checkout-block_onChangeSummaryIcon__TFV9M" focusable="false" role="img"
                                 aria-hidden="true" data-testid="icon"
                                 style={{display: signInState ? "inline-block" : "none"}}
                        >
                            <g fill="none" fillRule="evenodd" stroke="currentColor">
                                <circle cx="12" cy="12" r="11" strokeWidth="2"></circle>
                                <path
                                    d="M9.837 17.6a.623.623 0 0 1-.4-.153L6 14.393l.264-.298a.8.8 0 0 1 1.138-.073l2.403 2.112 6.761-7.857a.798.798 0 0 1 1.13-.08l.304.266-7.666 8.928a.591.591 0 0 1-.417.2l-.08.009z"
                                    fill="currentColor" fillRule="nonzero"></path>
                            </g>
                        </svg>
                            Log in Successfully.</h2>
                        <img src="https://www.alpha-cat.org/wp-content/uploads/2020/03/payment_successful.gif"
                             alt="log in successfully"/>
                    </div>
                    <div className="layout_mainContent_checkoutInfo_logIn"
                         style={{display: token ? 'none' : 'block'}}
                    >
                        <h2>Have an account?</h2>
                        <div className="layout_mainContent_checkoutInfo_logIn_title"><span className="logIn_underline">Log in</span> to
                            checkout more quickly and easily
                            <div className="logIn_icon">
                                <KeyboardArrowDownIcon fontSize="medium"/>
                            </div>
                        </div>
                        <div className="layout_mainContent_checkoutInfo_logIn_wrong"
                             style={{display: signIn ? "none" : "block"}}>
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                 className="iconBlock-1wZMf" focusable="false" role="img" aria-hidden="true">
                                <g fill="none" fillRule="evenodd">
                                    <path
                                        d="M13.17 17.15a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0zM10.893 6.138c.347-.086 1.51-.204 1.79-.033a.984.984 0 0 1 .457.776l.09 7.95c-.347.086-1.64.207-1.92.036a.984.984 0 0 1-.457-.776z"
                                        fill="currentColor"></path>
                                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2"></circle>
                                </g>
                            </svg>
                            <span>Something's not right with your email address or password</span>
                        </div>

                        <div className="layout_mainContent_checkoutInfo_logIn_inputs">
                            <div className="logIn_user">
                                <div className="logIn_user_label">Email address</div>
                                <input type="email" id="inputEmail"
                                       autocomplete="off"
                                       onClick={() => setEmailClicked(!validateEmail(email))}
                                       style={{border: emailClicked ? "0.0625rem solid red" : "0.0625rem solid black"}}
                                />
                                <div className="logIn_user_alert" id="validateResult"
                                     style={{display: emailClicked ? "block" : "none"}}
                                >
                                    {/*Please enter an email address*/}
                                </div>
                            </div>
                            <div className="logIn_pwd">
                                <div className="logIn_pwd_label">Password</div>
                                <input type="password" id="inputPassword"
                                       autocomplete="off"
                                       onClick={() => setPasswordClicked(!password)}
                                       style={{border: passwordClicked ? "0.0625rem solid red" : "0.0625rem solid black"}}
                                />
                                <div className="logIn_pwd_alert" id="validateResult_pwd"
                                     style={{display: passwordClicked ? "block" : "none"}}
                                >
                                    {/*Please enter your password*/}
                                </div>
                                <div className="logIn_pwd_forget">
                                    Forgot your password?
                                </div>
                            </div>
                        </div>
                        <button className="layout_mainContent_checkoutInfo_logIn_submit"
                            // aria-disabled="true"
                                type="submit"
                                onClick={useLogIn}
                        >SIGN IN
                        </button>
                        <div className="layout_mainContent_checkoutInfo_logIn_policy">
                            By signing in, you agree to the <span>Terms of Use</span> and acknowledge the <span>Privacy Policy</span>.
                            California consumers, see our <span>Notice of Financial Incentives.</span>
                        </div>


                    </div>


                    <div className="layout_mainContent_checkoutInfo_contact"
                         style={{display: signInState ? 'none' : 'block'}}
                    >
                        <h2>
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                 className="checkout-block_onChangeSummaryIcon__TFV9M" focusable="false" role="img"
                                 aria-hidden="true" data-testid="icon"
                                 style={{display: validateEmail(emailContact) ? "inline-block" : "none"}}
                            >
                                <g fill="none" fillRule="evenodd" stroke="currentColor">
                                    <circle cx="12" cy="12" r="11" strokeWidth="2"></circle>
                                    <path
                                        d="M9.837 17.6a.623.623 0 0 1-.4-.153L6 14.393l.264-.298a.8.8 0 0 1 1.138-.073l2.403 2.112 6.761-7.857a.798.798 0 0 1 1.13-.08l.304.266-7.666 8.928a.591.591 0 0 1-.417.2l-.08.009z"
                                        fill="currentColor" fillRule="nonzero"></path>
                                </g>
                            </svg>
                            Contact information
                        </h2>
                        <div className="contact_email">
                            <div className="contact_email_label">Email address (for order notification)</div>
                            <input type="email" id="inputContactEmail"
                                   autocomplete="off"
                                   onClick={() => setEmailContactClicked(!validateEmail(emailContact))}
                                   style={{border: emailContactClicked ? "0.0625rem solid red" : "0.0625rem solid black"}}
                            />
                            <div className="contact_email_alert" id="validateResult_contactEmail"
                                 style={{display: emailContactClicked ? "block" : "none"}}
                            >
                                {/*Please enter an email address*/}
                            </div>
                        </div>
                        <div className="contact_policy">
                            <div className="contact_policy_icon"
                                 onMouseEnter={() => setContactPolicyIsHovered(true)}
                                 onMouseLeave={() => setContactPolicyIsHovered(false)}
                                 onClick={() => setContactPolicyIsClicked(state => !state)}
                            >
                                <CheckBoxOutlineBlankOutlinedIcon
                                    style={{display: contactPolicyIsClicked || contactPolicyIsHovered ? 'none' : 'inline-block'}}/>
                                <CheckBoxOutlinedIcon
                                    style={{display: contactPolicyIsClicked || contactPolicyIsHovered ? 'inline-block' : 'none'}}
                                />
                            </div>
                            <div className="contact_policy_details">
                        <span className="utils_bccContent__Ryxxa OneLinkNoTx">Sign me up for lululemon emails (you can unsubscribe at any time). See our <a
                            href="https://info.lululemon.com/legal/privacy-policy" target="_blank">privacy policy</a> for details.</span>
                            </div>
                        </div>

                    </div>

                    <div className="layout_mainContent_checkoutInfo_shippingAddress"
                         style={{display: signInState ? 'none' : 'block'}}
                    >
                        <h2>
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                 className="checkout-block_onChangeSummaryIcon__TFV9M" focusable="false" role="img"
                                 aria-hidden="true" data-testid="icon"
                                 style={{display: validatePhone(phoneShipping) ? "inline-block" : "none"}}
                            >
                                <g fill="none" fillRule="evenodd" stroke="currentColor">
                                    <circle cx="12" cy="12" r="11" strokeWidth="2"></circle>
                                    <path
                                        d="M9.837 17.6a.623.623 0 0 1-.4-.153L6 14.393l.264-.298a.8.8 0 0 1 1.138-.073l2.403 2.112 6.761-7.857a.798.798 0 0 1 1.13-.08l.304.266-7.666 8.928a.591.591 0 0 1-.417.2l-.08.009z"
                                        fill="currentColor" fillRule="nonzero"></path>
                                </g>
                            </svg>
                            Shipping address
                        </h2>
                        <div className="shipping_phone">
                            <div className="shipping_phone_label">Phone number</div>
                            <input type="text" id="inputPhoneShipping"
                                   autocomplete="off"
                                   onClick={() => setPhoneShippingClicked(true)}
                                   onChange={setPhone}
                                   style={{border: phoneShippingClicked ? "0.0625rem solid red" : "0.0625rem solid black",}}
                            />
                            <div className="shipping_phone_alert" id="validateResult_phoneShipping"
                                 style={{
                                     display: phoneShippingClicked ? "block" : "none"
                                 }}
                            >
                                Please enter your phone number.
                            </div>
                        </div>
                    </div>

                    {/*<div className="layout_mainContent_checkoutInfo_shippingGift"*/}
                    {/*     style={{display:signInState?'none':'block'}}*/}
                    {/*>*/}
                    {/*    <h2>Shipping & gift options</h2>*/}
                    {/*</div>*/}

                    <div className="layout_mainContent_checkoutInfo_payment"
                         style={{display: signInState ? 'block' : 'none'}}
                    >
                        <h2>
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                 className="checkout-block_onChangeSummaryIcon__TFV9M" focusable="false" role="img"
                                 aria-hidden="true" data-testid="icon"
                                 style={{display: signInState ? "inline-block" : "none"}}
                            >
                                <g fill="none" fillRule="evenodd" stroke="currentColor">
                                    <circle cx="12" cy="12" r="11" strokeWidth="2"></circle>
                                    <path
                                        d="M9.837 17.6a.623.623 0 0 1-.4-.153L6 14.393l.264-.298a.8.8 0 0 1 1.138-.073l2.403 2.112 6.761-7.857a.798.798 0 0 1 1.13-.08l.304.266-7.666 8.928a.591.591 0 0 1-.417.2l-.08.009z"
                                        fill="currentColor" fillRule="nonzero"></path>
                                </g>
                            </svg>
                            Payment method
                        </h2>
                        <div
                        >
                            <Payment/>
                        </div>
                    </div>


                </div>

                <OrderSummary/>

            </div>
        </div>


        <footer className="simple-footer">
            <div className="simple-contact">
                <a href="/"
                   className="simple-anchor-anchor simple-anchor-underline" target="_blank">
                    Contact Us</a>
                <a href="/"
                   className="simple-anchor-anchor simple-anchor-underline" target="_blank">
                    Live Chat</a>
                <a href="/"
                   className="simple-anchor-anchor simple-anchor-underline" target="_blank">
                    1.877.263.9300</a>
            </div>
            <div className="simple-legal-menu">
                <div>© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</div>
                <div className="legal-links">
                    <a href="/"
                       className="simple-anchor-underline" target="_blank">
                        Shipping Policy</a>
                    <a href="/"
                       className="simple-anchor-underline" target="_blank">
                        Privacy Policy (Last Updated: 1/23/23)</a>
                    <a href="/"
                       className="simple-anchor-underline" target="_blank">
                        Terms of Use (Last Updated: 10/5/22)</a>
                    <a href="/"
                       className="simple-anchor-underline" target="_blank">
                        Accessibility Statement</a>

                </div>
            </div>
        </footer>

    </div>
}