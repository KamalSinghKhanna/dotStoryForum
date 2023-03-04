import React, { useContext, useState, useEffect } from "react";
import "./AddPost.css";
import { Link, useNavigate } from "react-router-dom";
import cancelImg from "../images/cancel.png";
import gallery from "../images/gallery.png";
import gif from "../images/GIF.png";
import video from "../images/video-play.png";
import document from "../images/document-text.png";
import google from "../images/google.svg";
import { AuthContext } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../config/firebase";
import { authenticate } from "../helper/auth";
import { USER_LOGIN } from "../constants/constants";
import { createPost } from "../helper/post";
import { toast } from "react-hot-toast";
import PopUp from "./PopUp";
import { Footer } from "./Footer";
import ReactGiphySearchbox from 'react-giphy-searchbox'
import Report from "./Report";

const AddPost = () => {
  const navigate = useNavigate();
  // const [popUp, setPopUp] = useState(false)
  const [showGif, setShowGif] = useState(false)
  const { userDetails, loading, dispatch } = useContext(AuthContext);
  console.log(userDetails);
  const [data, setData] = useState({
    title: "",
    caption: "",
  });

  const submit = async () => {
    try {
      const res = await createPost(data, userDetails?.token);
      toast("Post created successfully!", {
        duration: 2000,
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast("Failed to create post, try again!", {
        duration: 2000,
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  function handleFile(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.files[0]
    setData(newdata)
    console.log(e.target.id)
  }

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((data) => {
        let userObj = {};
        authenticate(data?.user?.accessToken)
          .then((data) => {
            userObj = {
              ...data,
              token: data?.user?.accessToken,
            };
            dispatch({
              type: USER_LOGIN,
              payload: userObj,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log({ errorMessage });
      });
  };

  return (
    <>
      <div className="add-post">
        <div className="add-post-header-outer">
        <div className="add-post-header">
          <Link to="/" className="cancel-img">
            <img src={cancelImg} alt="cancel-img" />
          </Link>
          <button
            onClick={(e) => submit(e)}
            className={userDetails ? "add-post-btn yellow" : "add-post-btn"}
            disabled={!userDetails}
          >
            <span>Post</span>
          </button>
        </div>
        </div>
        <div className="add-post-auth-outer">
          {loading ? (
            <p>Loading...</p>
          ) : (
            !userDetails && (
              <div className="add-post-auth">
                <button className="signin-btn" onClick={handleGoogleLogin}>
                  <img src={google} alt="Sign in with Google" />
                  <p>Sign in with Google</p>
                </button>
              </div>
            )
          )}
        </div>

      <div className="add-post-main-outer">
      <div className="add-post-main">
          <div className="add-post-body">
            {/* {userDetails && (
              <button onClick={() => auth.signOut()}>logout</button>
            )} */}
            <div className="add-post-title">
              <input
                onChange={(e) => handle(e)}
                id="title"
                value={data.title}
                type="text"
                placeholder="Title"
                disabled={!userDetails}
                autoFocus
              />
            </div>
            <div className="add-post-content">
              <textarea
                id="caption"
                onChange={(e) => handle(e)}
                type="text"
                value={data.caption}
                placeholder="Add description (Optional)"
                disabled={!userDetails}
              />
            </div>
          </div>

          <div className={`add-post-attachement ${!userDetails && `disabled`}`}>
            <span>Add</span>
            <label htmlFor="img">
              <img src={gallery} alt="" />
            </label>
            <input type="file" id="img"  value={data.img} style={{ display: "none" }} accept="image/*" />
            <label htmlFor="video">
            <img src={video} alt="" />
            </label>
            <input type="file" id="video"  value={data.video} style={{ display: "none" }} accept="video/*" />
            <label htmlFor="document">
            <img src={document} alt="" />
            </label>
            <input type="file" id="document"  value={data.document} style={{ display: "none" }} accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf" />
            <img onClick={()=>{setShowGif(!showGif)}} src={gif} alt="" />
          </div>
          {showGif ? <div className="gif-box"><ReactGiphySearchbox poweredByGiphy={false} apiKey="OMAiJnkMFgyLyd5JmhGNEnfSyziecGNY" 
          onSelect={(item)=> console.log(item)} 
          masonryConfig={[
            { columns:4, imageWidth:120,gutter:13},
            {mq:"550px",columns:7,imageWidth:120, gutter:13}
          ]} /></div> : null}
        </div>
      </div>
        <div>
          {
            userDetails && userDetails.token === undefined ? <PopUp /> : null
          }
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AddPost;
