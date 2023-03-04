import {React, useState} from "react";
import "./Dashboard.css";
import infoCircle from "../images/info-circle.png";
import catImg from "../images/cat-img.png";
import nobuImg from "../images/nobu.png";
import Post from "./Post";
import createPost from "../images/create-post.svg";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import Report from "./Report"
const Dashboard = () => {
  const [popUp, setPopUp] = useState(false)
  return (
    <div className="dashboard">
      <div className="header">
        <div className="user">
          <div className="user-left">
           
            <div className="user-info">
              <span>Nobu</span>
              <div className="active-user">
                <span>1.4k members, 120 online</span>
              </div>
            </div>
          </div>
          <div className="info">
            <img src={infoCircle} alt="" />
            <Link to="/profile" className="nobu-img">
              <img src={nobuImg} alt="Nobu" />
            </Link>
          </div>
        </div>
        <div className="cat-img">
          <img src={catImg} alt="" />
        </div>
      </div>
      <div className="posts">
        <Post setPopUp={setPopUp} popUp={popUp} />
      </div>
      <div className="create-post-handler">
        <Link to="/createpost">
          <img src={createPost} alt="Create Post" />
        </Link>
      </div>
      <div>
          {
            popUp ? <Report /> : null
          }
        </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
