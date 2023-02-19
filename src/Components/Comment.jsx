import { React, useState } from 'react';
import rightSide from '../images/Right Side.png';
import cancelImg from '../images/cancel.png';
import gallery from '../images/gallery.png';
import gif from '../images/GIF.png';
import video from '../images/video-play.png';
import document from '../images/document-text.png';
import { Link } from 'react-router-dom';
import nobuImg from '../images/nobu.png';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Comment = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState(false);
  const url = 'http://localhost:3001/comment';
  const [data, setData] = useState({
    comment: '',
  });
  function submit(e) {
    Axios.post(url, {
      comment: data.comment,
    }).then(res => {
      console.log(res.data);
    });
    navigate('/');
  }
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
    if (e.target.value !== '') {
      setColor(true);
    } else {
      setColor(false);
    }
  }
  return (
    <>
      <div className="add-post">
        <div className="add-post-header">
          <Link to="/" className="cancel-img">
            <img src={cancelImg} alt="cancel-img" />
          </Link>
          <div
            onClick={e => submit(e)}
            className={color ? 'add-post-btn yellow' : 'add-post-btn'}
          >
            <span>Add</span>
          </div>
        </div>
        <div className="add-comment-main">
          <div className="reply-user">
            <span>
              Replying to <span>@Guadalupe</span>{' '}
            </span>
          </div>
          <div className="add-comment">
            <div className="user-pic">
              <img src={nobuImg} alt="" />
            </div>
            <textarea
              onChange={e => handle(e)}
              id="comment"
              value={data.comment}
              type="text"
              placeholder="Add your comment"
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
      </div>
    </>
  );
};

export default Comment;
