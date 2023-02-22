import axios from 'axios';
import { DEV_API } from '../constants/constants';

export const createPost = async (reqData, idToken) => {
  console.log(reqData);
  const response = await fetch(`${DEV_API}/communities/1/post/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: idToken,
    },
    body: JSON.stringify(reqData),
  });
  if (response.status !== 204) {
    throw new Error('Failed to create a post!');
  }
  return 'Posts Created Success!';
};

export const getAllPost = async () => {
  const response = await fetch(`${DEV_API}/communities/1/posts/`);
  const data = await response.json();
  console.log(data);
  return data;
};
export const getPostById = async (postId, idToken) => {
  const response = await fetch(
    `${DEV_API}/communities/post/${postId}/`
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const upvotePost = async (postId, idToken) => {
  const response = await fetch(
    `${DEV_API}/communities/post/${postId}/vote/up/`,
    {
      method: 'POST',
      headers: {
        Authorization: idToken,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const downvotePost = async (postId, idToken) => {
  const response = await fetch(
    `${DEV_API}/communities/post/${postId}/vote/down/`,
    {
      method: 'POST',
      headers: {
        Authorization: idToken,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};
