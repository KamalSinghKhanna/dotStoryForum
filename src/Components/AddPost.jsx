import React, { useContext, useState } from 'react';
import './AddPost.css';
import { Link, useNavigate } from 'react-router-dom';
import rightSide from '../images/Right Side.png';
import cancelImg from '../images/cancel.png';
import gallery from '../images/gallery.png';
import gif from '../images/GIF.png';
import video from '../images/video-play.png';
import document from '../images/document-text.png';
import google from '../images/google.svg';
import Axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../config/firebase';
import { authenticate } from '../helper/auth';
import { USER_LOGIN } from '../constants/constants';
import { createPost } from '../helper/post';
import { toast } from 'react-hot-toast';

const AddPost = () => {
  const navigate = useNavigate();
  const { userDetails, loading, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({
    title: '',
    caption: '',
  });

  const submit = async () => {
    try {
      console.log(data);
      const res = await createPost(data, userDetails?.token);
      console.log({ res });
      toast('Post created successfully!', {
        duration: 2000,
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      navigate('/');
    } catch (error) {
      console.log(error);
      toast('Failed to create post, try again!', {
        duration: 2000,
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(data => {
        // console.log({ user });
        // console.log(user?.accessToken);
        let userObj = {};
        authenticate(data?.user?.accessToken)
          .then(data => {
            userObj = {
              ...data,
              token: data?.user?.accessToken,
            };
            dispatch({
              type: USER_LOGIN,
              payload: userObj,
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        const errorMessage = error.message;
        console.log({ errorMessage });
      });
  };

  return (
    <>
      <div className="add-post">
        <div className="add-post-header">
          <Link to="/" className="cancel-img">
            <img src={cancelImg} alt="cancel-img" />
          </Link>
          <button
            onClick={e => submit(e)}
            className={userDetails ? 'add-post-btn yellow' : 'add-post-btn'}
            disabled={!userDetails}
          >
            <span>Post</span>
          </button>
        </div>
        <div>
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
        <div className="add-post-main">
          <div className="add-post-body">
            {userDetails && (
              <button onClick={() => auth.signOut()}>logout</button>
            )}
            <div className="add-post-title">
              <input
                onChange={e => handle(e)}
                id="title"
                value={data.title}
                type="text"
                placeholder="Title"
                disabled={!userDetails}
              />
            </div>
            <div className="add-post-content">
              <textarea
                id="caption"
                onChange={e => handle(e)}
                type="text"
                value={data.caption}
                placeholder="Add description (Optional)"
                disabled={!userDetails}
              />
            </div>
          </div>
          <div className={`add-post-attachement ${!userDetails && `disabled`}`}>
            <span>Add</span>
            <img src={gallery} alt="" />
            <img src={video} alt="" />
            <img src={document} alt="" />
            <img src={gif} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
