import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./home.css";
const baseUrl = "http://localhost:3000";

const PostCard = ({ post, children }) => {
  return (
    <div className="my-data" id={`post-${post?.id}`}>
      {children}
    </div>
  );
};

const Post = () => {
  const postInputRef = useRef();
  const bodyInputRef = useRef();
  const updatePostInputRef = useRef();
  const updateBodyInputRef = useRef();
  const searchInputRef = useRef();
  const [mydata, setMyData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  // const Api_KEY = "a26dc0b7cab148668f6744215b44550c";

  useEffect(() => {
    postInputRef.current.value = "";
    bodyInputRef.current.value = "";
    setIsloading(true);
    let myFunction = async () => {
      try {
        let response = await axios.get(`${baseUrl}/api/v1/post`);
        setMyData([...response.data]);
        console.log(response.data);
        setIsloading(false);
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      } catch (error) {
        console.log(error);
        setIsloading(false);
      }
    };
    myFunction();
  }, [toggleRefresh]);

  const updateHandler = async (id) => {
    let title = updatePostInputRef.current.value;
    let text = updateBodyInputRef.current.value;
    setIsloading(true);
    try {
      let response = await axios.put(`${baseUrl}/api/v1/post/${id}`, {
        title: title,
        text: text,
      });
      setAlert(response.data);
      console.log(response.data);
      setToggleRefresh(!toggleRefresh);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    setIsloading(true);

    try {
      let response = await axios.delete(`${baseUrl}/api/v1/post/${id}`);
      setAlert(response.data);
      console.log(response.data);
      setToggleRefresh(!toggleRefresh);
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    let query = searchInputRef.current.value;
    setIsloading(true);
    try {
      let response = await axios.get(
        `${baseUrl}/api/v1/post/search/?q=${query}`
      );
      setMyData([...response.data]);
      console.log(response.data);
      setIsloading(false);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      let response = await axios.post(`${baseUrl}/api/v1/post`, {
        title: postInputRef.current.value,
        text: bodyInputRef.current.value,
      });
      setAlert(response.data);
      console.log(response.data);
      setIsloading(false);
      setToggleRefresh(!toggleRefresh);
      e.target.reset();
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
    // console.log("hello world");
  };

  return (
    <div className="post-title-form">
      <div className="form-header">
        <form action="" onSubmit={submitHandler}>
          <label htmlFor="post-title">Post Title</label>
          <input
            type="text"
            id="post-title"
            ref={postInputRef}
            required
            minLength={2}
            maxLength={20}
          />
          <br />
          <label htmlFor="text-body">Post text</label>
          <textarea
            type="text"
            id="text-body"
            ref={bodyInputRef}
            required
            minLength={2}
          ></textarea>
          <br />
          <button className="form-btn" type="submit">
            Get Data
          </button>
        </form>
        <div className="search-input">
          <form onSubmit={searchHandler}>
            <input type="search" placeholder="Search" ref={searchInputRef} />
            <button type="submit" hidden>
              Search
            </button>
          </form>
        </div>
      </div>
      <p className="alert-msg">
        {isLoading && "loading..."}
        <br />
        {alert && alert}
      </p>

      {mydata.map((post, index) => {
        return (
          <PostCard post={post} key={index}>
            {!post.isEdit ? (
              <div className="post-card">
                <h1 className="data-title">{post?.title}</h1>
                <p>{post?.text}</p>
                <button
                  className="delete-btn"
                  onClick={() => {
                    deleteHandler(post.id);
                  }}
                >
                  Delete
                </button>
                <button
                  id={`edit-${post.id}`}
                  className="edit-btn"
                  onClick={() => {
                    post.isEdit = true;
                    setMyData([...mydata]);
                    console.log(post);
                  }}
                >
                  Edit
                </button>
              </div>
            ) : (
              <form action="">
                <div className="updatePost">
                  <label htmlFor="update-title">Post Title</label>
                  <input
                    type="text"
                    id="update-title"
                    ref={updatePostInputRef}
                    defaultValue={post.title}
                    required
                    minLength={2}
                    maxLength={20}
                  />
                  <br />
                  <label htmlFor="update-text">Post text</label>
                  <textarea
                    type="text"
                    id="update-text"
                    defaultValue={post.text}
                    ref={updateBodyInputRef}
                    required
                    minLength={2}
                  ></textarea>
                  <br />
                </div>
                <button
                  className="update-btn"
                  type="button"
                  onClick={() => {
                    updateHandler(post.id);
                  }}
                >
                  Update
                </button>
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={() => {
                    post.isEdit = false;
                    setMyData([...mydata]);
                  }}
                >
                  Cancel
                </button>
              </form>
            )}
          </PostCard>
        );
      })}
    </div>
  );
};

export default Post;
