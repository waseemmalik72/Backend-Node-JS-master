import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import "./profile.css";
import { GlobalContext } from "../../context/context";

import { API_URL } from "../../core";
const PostCard = ({ post, children }) => {
  return (
    <div className="my-data" id={`post-${post?._id}`}>
      {children}
    </div>
  );
};

const Profile = () => {
  const { userId } = useParams();
  const { dispatch } = useContext(GlobalContext);
  const postInputRef = useRef();
  const bodyInputRef = useRef();
  const updatePostInputRef = useRef();
  const updateBodyInputRef = useRef();
  // const searchInputRef = useRef();
  const [mydata, setMyData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  // const Api_KEY = "a26dc0b7cab148668f6744215b44550c";

  useEffect(() => {
    postInputRef.current.value = "";
    bodyInputRef.current.value = "";
    setIsloading(true);
    let myFunction = async () => {
      try {
        let response = await axios.get(
          `${API_URL}/api/v1/post/?userId=${userId || ""}`,
          {
            withCredentials: true,
          }
        );
        setMyData(response.data);
        setIsloading(false);
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      } catch (error) {
        console.log(error.response.data);
        setIsloading(false);
      }
    };

    const getAnotherUserProfile = async () => {
      try {
        let response = await axios.get(
          `${API_URL}/api/v1/profile/${userId || ""}`,
          {
            withCredentials: true,
          }
        );
        setUserProfile(response.data.user);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    myFunction();
    getAnotherUserProfile();
  }, [toggleRefresh, userId]);

  const updateHandler = async (id) => {
    let title = updatePostInputRef.current.value;
    let text = updateBodyInputRef.current.value;
    try {
      let response = await axios.put(
        `${API_URL}/api/v1/post/${id}`,
        {
          title: title,
          text: text,
        },
        {
          withCredentials: true,
        }
      );
      setAlert(response.data);
      // console.log(response.data);
      setToggleRefresh(!toggleRefresh);
    } catch (error) {
      console.log(error);
      dispatch({ type: "USER_LOGOUT" });
    }
  };

  const deleteHandler = async (id) => {
    try {
      let response = await axios.delete(`${API_URL}/api/v1/post/${id}`, {
        withCredentials: true,
      });
      setAlert(response.data);
      // console.log(response.data);
      setToggleRefresh(!toggleRefresh);
    } catch (error) {
      console.log(error);
      dispatch({ type: "USER_LOGOUT" });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      let response = await axios.post(
        `${API_URL}/api/v1/post`,
        {
          title: postInputRef.current.value,
          text: bodyInputRef.current.value,
        },
        {
          withCredentials: true,
        }
      );
      setAlert(response.data);
      // console.log(response.data);
      setIsloading(false);
      setToggleRefresh(!toggleRefresh);
    } catch (error) {
      console.log(error);
      setIsloading(false);
      dispatch({ type: "USER_LOGOUT" });
    }
    // console.log("hello world");
  };

  // const searchHandler = async (e) => {
  //   e.preventDefault();
  //   setIsloading(true);
  //   let query = searchInputRef.current.value;

  //   try {
  //     let response = await axios.get(
  //       `${API_URL}/api/v1/post/search?q=${query}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     setMyData(response.data);
  //     setIsloading(false);
  //     e.target.reset();
  //     // setToggleRefresh(!toggleRefresh);
  //     // console.log(response.data);
  //   } catch (error) {
  //     // console.log(error);
  //     setIsloading(false);
  //   }

  //   // console.log("hello world");
  // };

  return (
    <div className="post-title-form">
      <div className="form-header">
        <div className="user-name">
          <h1>
            {userProfile?.firstName} {userProfile?.lastName}
          </h1>
        </div>
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

        {/* TODO */}
        {/* <form action="" onSubmit={searchHandler} className="search-form">
          <label htmlFor="post-title">Search Data</label>
          <input type="search" id="post-title" ref={searchInputRef} />
          <br />
          <button className="form-btn" type="submit" hidden>
            Search Data
          </button>
        </form> */}
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
                    deleteHandler(post._id);
                  }}
                >
                  Delete
                </button>
                <button
                  id={`edit-${post._id}`}
                  className="edit-btn"
                  onClick={() => {
                    post.isEdit = true;
                    setMyData([...mydata]);
                    // console.log(post);
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
                    updateHandler(post._id);
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

      {mydata.length === 0 && "No data found"}
    </div>
  );
};

export default Profile;
