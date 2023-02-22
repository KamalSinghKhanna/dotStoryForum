import React from 'react';
import './Dashboard.css';
import arrowLeft from '../images/arrow-left.png';
import infoCircle from '../images/info-circle.png';
import catImg from '../images/cat-img.png';
import nobuImg from '../images/nobu.png';
import gallery from '../images/gallery.png';
import gif from '../images/GIF.png';
import video from '../images/video-play.png';
import document from '../images/document-text.png';
import Post from './Post';
import createPost from '../images/create-post.svg';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="header">
        <div className="user">
          <div className="user-left">
            <div className="left-arrow">
              <img src={nobuImg} alt="Nobu" />
            </div>
            <div className="user-info">
              <span>Nobu</span>
              <div className="active-user">
                <span>1.4k members, 120 online</span>
              </div>
            </div>
          </div>
          <div className="info">
            <img src={infoCircle} alt="" />
          </div>
        </div>
        <div className="cat-img">
          <img src={catImg} alt="" />
        </div>
      </div>
      {/* <div className="create-post">
        <div className="create-post-u">
          <div className="nobu-img">
            <img src={nobuImg} alt="" />
          </div>
          <Link to="/createpost" className="btn">
            <span>Start a post</span>
          </Link>
        </div>
        <div className="create-post-l">
          <button className="upload-item">
            <img src={gallery} alt="" />
            <span>Photo</span>
          </button>
          <button className="upload-item">
            <img src={video} alt="" />
            <span>Video</span>
          </button>
          <button className="upload-item">
            <img src={document} alt="" />
            <span>Article</span>
          </button>
          <button className="upload-item">
            <img src={gif} alt="" />
            <span>GIF</span>
          </button>
        </div>
      </div> */}
      <div className="posts">
        <Post />
      </div>
      <div className="create-post-handler">
        <Link to="/createpost">
          <img src={createPost} alt="Create Post" />
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
