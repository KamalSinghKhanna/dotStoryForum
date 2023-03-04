import { React, useEffect, useState, useContext } from "react";
import "./SinglePost.css";
import threeDot from "../images/Three dot menu.png";
import arrowUp from "../images/arrow-up.png";
import arrowDown from "../images/arrow-down.png";
import message from "../images/message.png";
import exportImg from "../images/export.png";
import line from "../images/Line.png";
import nobuImg from "../images/nobu.png";
import leftArrow from "../images/arrow-left.svg";
import addIcon from "../images/add.svg";
import group from "../images/Group.svg";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import { formatDate } from "./utils/FormatDate";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import {
  downvotePost,
  getAllPost,
  upvotePost,
  getPostById,
} from "../helper/post";
import { useParams, useNavigate } from "react-router-dom";
const SinglePost = () => {
  const navigate = useNavigate();
  const Comment = Object.freeze({
    reply: "reply",
    comment: "comment",
  });
  const { userDetails } = useContext(AuthContext);
  const { postId } = useParams();
  console.log(postId);
  const [post, setPost] = useState();
  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPostById(postId);
      console.log(response);
      setPost(response);
    };

    fetchPost();
  }, []);
  const handleUpVote = async (postId) => {
    upvotePost(postId, userDetails?.token).then((res) => {
      console.log(res);
    });
  };

  const handleDownVote = async (postId) => {
    downvotePost(postId, userDetails?.token).then((res) => {
      console.log(res);
    });
  };
  const showComment = (reply, username) => {
    navigate(`/comment/${reply}`, { state: { id: 1, name: username } });
  };
  return (
    <div className="single-post">
      <div className="single-post-header">
        <div className="left-arrow-icon">
          <Link to="/">
            <img src={leftArrow} alt="" />
          </Link>
        </div>
        <div className="s-post-h-text">
          <span>Post</span>
        </div>
      </div>
      {post && (
        <div className="post-s-outer">
          <div className="post-s">
            <div className="post-u">
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
                  <img src={threeDot} alt="" />
                </div>
              </div>
              <div className="post-info">
                <div className="post-s-title">
                  <span>{post.title} </span>
                </div>
                <div className="post-s-content">
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
                  showComment(Comment.comment, post?.author?.username);
                }}
              />
              <img src={line} alt="" className="line" />
              <img className="u-item" src={exportImg} alt="" />
              <span>2</span>
            </div>
          </div>
         <div className="comments">
         <div className="write-comment">
            <input type="text" placeholder="Write comment in this post.." />
            <div className="input-icons">
              <img className="add-icon" src={addIcon} alt="" />
              <img
                onClick={() => {
                  showComment(Comment.comment, post?.author?.username);
                }}
                className="group-icon"
                src={group}
                alt=""
              />
            </div>
          </div>
         </div>
          <div className="total-comments">
            <span>Comments (14)</span>
          </div>
          <div className="show-comment">
            <div className="post-u-header">
              <div className="user-details">
                <div className="user-pic">
                  <img src={nobuImg} alt="" />
                </div>
                <div className="user-name">
                  <span>Connie Carter</span>
                </div>
              </div>
            </div>
            <div className="comment-content">
              <span>
                Fringilla est ullamcorper eget nulla facilisi etiam dignissim
                diam quis. Risus pretium quam vulputate dignissim suspendisse in
                est ante.
              </span>
            </div>
            <div className="post-l">
              <img
                className="u-item"
                src={arrowUp}
                alt=""
                onClick={() => handleUpVote(post?.id)}
              />
              <span>12</span>
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
            </div>
            <div className="view-replies">
              <span>View more 3 replies</span>
            </div>
            <div className="comment-reply-user-info">
              <img src={nobuImg} alt="" />
              <span>
                Matthew :<span> Ut enim blandit volutpat maecenas...</span>{" "}
              </span>
            </div>
            <div className="comment-reply-time">
              <span>10 min ago</span>
              <span
                onClick={() => {
                  showComment(Comment.reply, post?.author?.username);
                }}
              >
                Reply
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SinglePost;
