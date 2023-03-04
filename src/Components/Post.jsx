import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import threeDot from "../images/Three dot menu.png";
import arrowUp from "../images/arrow-up.png";
import arrowDown from "../images/arrow-down.png";
import message from "../images/message.png";
import exportImg from "../images/export.png";
import line from "../images/Line.png";
import nobuImg from "../images/nobu.png";
import {
  downvotePost,
  getAllPost,
  upvotePost,
  getPostById,
} from "../helper/post";
import { AuthContext } from "../context/AuthContext";
import { formatDate } from "./utils/FormatDate";
import { useNavigate } from "react-router-dom";
const Post = ({setPopUp, popUp}) => {
  const Comment = Object.freeze({
    reply: "comment",
  });
  const { userDetails } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await getAllPost();
      setData(response?.items);
    };

    fetchAllPosts();
  }, []);
  const handleUpVote = async (postId) => {
    upvotePost(postId, userDetails?.token).then((res) => {});
  };

  const handleDownVote = async (postId) => {
    downvotePost(postId, userDetails?.token).then((res) => {});
  };

  const showSinglePost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const showComment = (reply, username) => {
    navigate(`/comment/${reply}`, { state: { id: 1, name: username } });
  };

  return (
    <>
      {data &&
        data.map((post, i) => {
          return (
            <div className="post" key={i}>
              <div onClick={() => showSinglePost(post?.id)} className="post-u">
                <div className="post-u-header">
                  <div className="user-details">
                    <div className="user-pic">
                      <img src={nobuImg} alt="" />
                    </div>
                    <div className="user-name">
                      <span>{post?.author?.full_name}</span>{" "}
                      {post?.author?.username?.toLowerCase() === "nobu" && (
                        <span id="author">Author</span>
                      )}
                    </div>
                  </div>
                  <div className="post-h-time">
                    <span>{formatDate(post?.created)}</span>
                    <img onClick={()=> {setPopUp(!popUp)}} src={threeDot} alt="" />
                  </div>
                </div>
                <div className="post-info">
                  <div className="post-u-title">
                    <span>{post.title} </span>
                  </div>
                  <div className="post-u-content">
                    <p>{post.caption}</p>
                  </div>
                </div>
              </div>
              <div className="post-l">
                <img
                  className="u-item"
                  src={arrowUp}
                  alt=""
                  onClick={() => handleUpVote(post?.id)}
                />
                <span>{post?.votes?.score}</span>
                <img
                  className="u-item"
                  src={arrowDown}
                  alt=""
                  onClick={() => handleDownVote(post?.id)}
                />
                <img src={line} alt="" className="line" />
                <img
                  src={message}
                  alt=""
                  className="u-item"
                  onClick={() => {
                    showComment(Comment.reply, post?.author?.username);
                  }}
                />
                <img src={line} alt="" className="line" />
                <img className="u-item" src={exportImg} alt="" />
                <span>2</span>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Post;
