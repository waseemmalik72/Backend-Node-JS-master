import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/context";
import { API_URL } from "../../core";
import "./post.css";
import profile from "../../images/profile.jpg";
import {
  CameraVideo,
  Image,
  FileImage,
  Person,
  EmojiSmile,
  GeoAlt,
  FiletypeGif,
  Images,
  Display,
} from "react-bootstrap-icons";

const Post = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="main-content">
      <div className="post-form">
        <div className="div1">
          <div className="user-pic">
            <img
              className="user-profile-pic"
              src={profile}
              alt="younis malik"
            />
          </div>
          <span className="click-to-post" onClick={openModal}>
            {state.textAreaValue
              ? state.textAreaValue
              : `What's on your mind, ${state?.user?.firstName}`}
          </span>
        </div>
        <div className="div2">
          <div className="live-video mini-flex">
            <CameraVideo />
            <p className="para">Live video</p>
          </div>
          <div className="upload-photos mini-flex">
            <Image />
            <p className="para">Photos</p>
          </div>
          <div className="select-feelings mini-flex">
            <EmojiSmile />
            <p className="para">Feelings</p>
          </div>
          <div className="btn">
            <button className="post-btn">Post</button>
          </div>
        </div>
      </div>

      <SubmitPostModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

const SubmitPostModal = ({ isModalOpen, setIsModalOpen }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [isDisplayShow, setDisplayShow] = useState("none");
  const [isImageDisplay, setImageDisplay] = useState("none");
  const [showUploadMediaBox, setShowUploadMediaBox] =
    useState("showUploadMediaBox");
  const [isImage, setImage] = useState("");
  const [fontSize, setFontSize] = useState(true);
  const imageValue = useRef(null);
  const textareaRef = useRef(null);
  const modalRef = useRef(null);

  const handleFileChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    // console.log(file);
    reader.onload = (e) => {
      const url = e.target.result;
      // console.log(url);
      setImage(url);
      setImageDisplay("imageDisplay");
      setShowUploadMediaBox("none");
    };
    reader.readAsDataURL(file);
  };

  const closeModal = (e) => {
    e?.preventDefault();
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
    let getTextareaValue = textareaRef.current.value;
    dispatch({
      type: "CHANGE_VALUE",
      value: getTextareaValue,
    });
  };

  useEffect(() => {
    if (textareaRef.current) {
      autoResize(textareaRef.current);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
        console.log("hello world");
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  const autoResize = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const submitPostHandler = (e) => {
    e.preventDefault();
    const textAreaValue = textareaRef.current.value;
  };

  return (
    <div>
      <div
        className="submitPostModal modalOverlay"
        style={{ display: isModalOpen ? " " : "none" }}
      >
        <form className="post" ref={modalRef}>
          <div className="postHeader">
            <div className="div1">
              <h3 className="heading2">Create post</h3>
              <div className="cancelBtn">
                <button className="btn fontWeight500" onClick={closeModal}>
                  X
                </button>
              </div>
            </div>
          </div>
          <div className="userProfile">
            <div className="img">
              <img
                className="userImage user-profile-pic"
                src={profile}
                alt=""
              />
            </div>
            <div>
              <p className="userName fontWeight500">
                {state.user.firstName} {state.user.lastName}
              </p>
            </div>
          </div>
          <div className="mainPostSection">
            <div className="postText">
              <textarea
                style={{ fontSize: fontSize ? "24px" : "15px" }}
                className="postTitle"
                id="postTitle"
                ref={textareaRef}
                required
                minLength={10}
                placeholder={`What's on your mind, ${state.user.firstName}?`}
                onInput={(e) => {
                  if (isDisplayShow !== "displayShow") {
                    if (e.target.value.length > 50) {
                      setFontSize(false);
                    } else if (e.target.value.length < 50) {
                      setFontSize(true);
                    }
                  }
                  return autoResize(e.target);
                }}
              ></textarea>
            </div>
            <div className={isDisplayShow}>
              <div className={isImageDisplay}>
                <button
                  className="uploadCancelBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    setDisplayShow("none");
                    setImageDisplay("none");
                    setShowUploadMediaBox("showUploadMediaBox");
                    setImage("");
                    // console.log(imageValue.current.value);
                    imageValue.current.value = null;
                    setFontSize(true);
                    let titleLength =
                      document.getElementById("postTitle").value.length;
                    if (titleLength > 50) {
                      setFontSize(false);
                    }
                  }}
                >
                  X
                </button>
                <img
                  style={{ height: "100%" }}
                  className="cover"
                  src={isImage}
                  alt="Person"
                />
              </div>
              <div className={showUploadMediaBox}>
                <button
                  className="uploadCancelBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    setDisplayShow("none");
                    setFontSize(true);
                    let check =
                      document.getElementById("postTitle").value.length;
                    if (check > 50) {
                      setFontSize(false);
                    }
                  }}
                >
                  X
                </button>
                <input
                  type="file"
                  id="selectImage"
                  ref={imageValue}
                  accept=".png, .jpg,"
                  hidden
                  onChange={handleFileChange}
                />
                <label className="selectImage cursor" htmlFor="selectImage">
                  <Images className="cursor" />
                  <p className="para">Add Photos/Videos</p>
                </label>
              </div>
            </div>
          </div>
          <div className="addMore">
            <div className="mediaBox">
              <p className="para fontWeight500">Add to your post</p>
              <div className="addMedia">
                <FileImage
                  className="cursor"
                  onClick={() => {
                    setDisplayShow("displayShow");
                    setFontSize(false);
                  }}
                />
                <Person className="cursor" />
                <EmojiSmile className="cursor" />
                <GeoAlt className="cursor" />
                <FiletypeGif className="cursor" />
                <span className="more cursor fontWeight900">...</span>
              </div>
            </div>
            <div className="submitPostBtn">
              <button onClick={submitPostHandler} className="submitPost hover">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
      <AllPost />
    </div>
  );
};

const AllPost = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const updatePostInputRef = useRef();
  const updateBodyInputRef = useRef();
  const [mydata, setMyData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  // const Api_KEY = "a26dc0b7cab148668f6744215b44550c";

  useEffect(() => {
    // postInputRef.current.value = "";
    // bodyInputRef.current.value = "";
    setIsloading(true);
    let myFunction = async () => {
      try {
        let response = await axios.get(`${API_URL}/api/v1/feed`, {
          withCredentials: true,
        });
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
    myFunction();
  }, [toggleRefresh]);

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
      setToggleRefresh(!toggleRefresh);
    } catch (error) {
      console.log(error);
      dispatch({ type: "USER_LOGOUT" });
    }
  };

  return (
    <div>
      <p className="alert-msg">
        {isLoading && "loading..."}
        <br />
        {alert && alert}
      </p>
      <div className="all-post">
        {mydata.map((post, index) => {
          return (
            <div className="my-data" id={`post-${post?._id}`} key={index}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
