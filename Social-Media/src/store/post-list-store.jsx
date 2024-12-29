import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;

  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai",
    body: "Hi Friends, I am going to Mumbai for my vacations. Hope to enjoy a lot. Peace out.",
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "Mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "Exploring the Mountains",
    body: "Hey everyone, I just reached the Himalayas. The view here is breathtaking. Can't wait to go hiking!",
    reactions: 5,
    userId: "user-7",
    tags: ["mountains", "travel", "hiking"],
  },
  {
    id: "3",
    title: "Beach Adventures",
    body: "Relaxing on the beaches of Goa. The waves are soothing, and the seafood is amazing. Loving every moment here!",
    reactions: 8,
    userId: "user-12",
    tags: ["beach", "Goa", "relaxation"],
  },
  {
    id: "4",
    title: "Culinary Journey",
    body: "Just had the most delicious pasta in Italy. Every bite was heavenly. Foodies, you must visit this place!",
    reactions: 10,
    userId: "user-4",
    tags: ["food", "Italy", "travel"],
  },
  {
    id: "5",
    title: "Desert Safari",
    body: "The deserts of Rajasthan are mesmerizing. The camel ride and sunset were unforgettable experiences. Highly recommend it!",
    reactions: 6,
    userId: "user-8",
    tags: ["desert", "Rajasthan", "adventure"],
  },
];

export default PostListProvider;
