import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets/frontend_assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus maiores sunt odit ipsum quod ea provident perspiciatis dolorem nesciunt obcaecati. Eligendi, suscipit! Ullam aliquam natus inventore cupiditate rerum, voluptatibus dicta.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div className='footer-content-right'>
                 <h2>GET IN TOUCH</h2>
                 <ul>
                    <li>+918329265691</li>
                    <li>kedarmane321@gmail.com</li>
                 </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>
           Copyright 2025 @ 2025 sktech.com - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer