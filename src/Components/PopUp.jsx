import React from "react";
import { Link } from "react-router-dom";
import leftArrow from "../images/arrow-left.svg";
import mail from "../images/mail.svg";
const PopUp = () => {
  return (
    // <div className="d-post">
      <div className="popup-outer">
        <div className="popup">
        <div className="left-arrow-p-outer">
          <div className="left-arrow-p">
            <Link to="/">
              {" "}
              <img src={leftArrow} alt="" />{" "}
            </Link>
          </div>
          </div>
          <div className="heading-t-p">
            <span>Sorry, Your account is not eligible for early access!</span>
          </div>
          <div className="text-p">
            <span>
              Join waitlist and We'll let you know when your spot is ready
            </span>
          </div>
        <div className="input-p-outer">
        <div className="input-p">
            <img src={mail} alt="" />
            <input type="text" placeholder="Enter your email" />
          </div>
        </div>
          <div className="btn-p">
            <span>Join the waitlist</span>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default PopUp;
