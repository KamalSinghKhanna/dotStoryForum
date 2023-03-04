import { React, useState, useContext, useEffect } from "react";
import rightSide from "../images/Right Side.png";
import cancelImg from "../images/cancel.png";
import gallery from "../images/gallery.png";
import gif from "../images/GIF.png";
import video from "../images/video-play.png";
import document from "../images/document-text.png";
import { Link } from "react-router-dom";
import nobuImg from "../images/nobu.png";
import Axios from "axios";
import PopUp from "./PopUp";
import google from "../images/google.svg";
import { AuthContext } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../config/firebase";
import { authenticate } from "../helper/auth";
import { USER_LOGIN } from "../constants/constants";
import { useNavigate, useParams, useLocation } from "react-router-dom";
const Comment = () => {
  const location = useLocation();
  const [popup, setPopup] = useState(false)
  const navigate = useNavigate();
  const { userDetails, loading, dispatch } = useContext(AuthContext);
  const { reply } = useParams();
  console.log(reply);
  const [color, setColor] = useState(false);
  const url = "http://localhost:3001/comment";
  const [data, setData] = useState({
    comment: "",
  });
  function submit(e) {
    Axios.post(url, {
      comment: data.comment,
    }).then((res) => {});
    navigate("/");
  }
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    if (e.target.value !== "") {
      setColor(true);
    } else {
      setColor(false);
    }
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
      showPopUp();
  };
  const showPopUp = () => {
    userDetails && userDetails.token === undefined && setPopup(true)
}
useEffect(() => {
    
  showPopUp()
  }, [])
  return (
    <>
      <div className="add-post">
        <div className="add-post-header">
          <Link to={-1} className="cancel-img">
            <img src={cancelImg} alt="cancel-img" />
          </Link>
          <div
            onClick={(e) => submit(e)}
            className={color ? "add-post-btn yellow" : "add-post-btn"}
          >
            <span>Add</span>
          </div>
        </div>
        <div className="add-post-auth">
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
        <div className="add-comment-main">
          <div className="reply-user">
            <span>
              Replying to <span>{location.state.name}</span>{" "}
            </span>
          </div>
          <div className="add-comment">
            <div className="user-pic">
              <img src={nobuImg} alt="" />
            </div>
            <textarea
              onChange={(e) => handle(e)}
              id="comment"
              value={data.comment}
              type="text"
              placeholder={"Add your " + reply}
            />
          </div>
        </div>
        <div className="add-post-attachement add-comment-attachement">
          <span>Add</span>
          <img src={gallery} alt="" />
          <img src={video} alt="" />
          <img src={document} alt="" />
          <img src={gif} alt="" />
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            popup && <PopUp />
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
