import React from 'react'
import './Profile.css'
import threeDot from "../images/Three dot menu.png";
import leftArrow from "../images/arrow-left.svg";
import { Link } from 'react-router-dom';
import nobuImg from "../images/nobu.png";
import { Footer } from './Footer';
const Profile = () => {
  return (
    <div className='profile'>
        <div className="profile-header-outer">
        <div className="profile-header">
          <Link to="/" className="left-arrow">
            <img src={leftArrow} alt="left-arrow" />
          </Link>
          <div className="three-dot">
            <img src={threeDot} alt="" />
          </div>
          <div className="logout-btn">
            <span>Logout</span>
          </div>
        </div>
        </div>
        <div className="user-profile-details">
          <div className="profile-img">
            <img src={nobuImg} alt="" />
          </div>
          <div className="profile-user-info">
          <div className="profile-username">
            <span>Nobu</span>
          </div>
          <div className="profile-stats">
          <span>14 comics</span>
            <div></div>
            <span>1.3k Members</span>
            </div>           
          </div>
          <div className="join-btn">
            <span>Joined</span>
          </div>
          <div className="profile-caption">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean pharetra magna</span>
          </div>
        </div>
        <div className="profile-main">
        <div className="profile-member">
          <div  className="member-text">
            <span>Members</span>
          </div>
          <div className="see-all-text">
            <span>See all</span>
          </div>
        </div>
          <div className="users-to-follow">
            <div className="users">
                <div className="user-img">
                  <img src={nobuImg} alt="" />
                </div>
                <div className="user-info">
                  <div className="username">
                    <span>Nobu</span>
                  </div>
                  <div className="user-status">
                    <span>Stand up for what you believe..</span>
                  </div>
                </div>
            </div>
            <div className="follow-btn">
                <span>Follow</span>
            </div>
          </div>
          <div className="users-to-follow">
            <div className="users">
                <div className="user-img">
                  <img src={nobuImg} alt="" />
                </div>
                <div className="user-info">
                  <div className="username">
                    <span>Haley James</span>
                  </div>
                  <div className="user-status">
                    <span>Stand up for what you believe..</span>
                  </div>
                </div>
            </div>
            <div className="follow-btn">
                <span>follow</span>
            </div>
          </div>
          <div className="users-to-follow">
            <div className="users">
                <div className="user-img">
                  <img src={nobuImg} alt="" />
                </div>
                <div className="user-info">
                  <div className="username">
                    <span>Trina Wilson</span>
                  </div>
                  <div className="user-status">
                    <span>Stand up for what you believe..</span>
                  </div>
                </div>
            </div>
            <div className="follow-btn">
                <span>follow</span>
            </div>
          </div>
          <div className="users-to-follow">
            <div className="users">
                <div className="user-img">
                  <img src={nobuImg} alt="" />
                </div>
                <div className="user-info">
                  <div className="username">
                    <span>Trina Wilson</span>
                  </div>
                  <div className="user-status">
                    <span>Stand up for what you believe..</span>
                  </div>
                </div>
            </div>
            <div className="follow-btn">
                <span>follow</span>
            </div>
          </div>
          <div className="users-to-follow">
            <div className="users">
                <div className="user-img">
                  <img src={nobuImg} alt="" />
                </div>
                <div className="user-info">
                  <div className="username">
                    <span>Trina Wilson</span>
                  </div>
                  <div className="user-status">
                    <span>Stand up for what you believe..</span>
                  </div>
                </div>
            </div>
            <div className="follow-btn">
                <span>follow</span>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default Profile