import React from "react";
import ReactDOM from "react-dom";
import profileImg from "./profile.jpg";
import shaji from "./shaji.jpg";
import imti from "./imti.jpg";
import { HandThumbsUp, ChatLeftText, ShareFill } from "react-bootstrap-icons";
import "./App.css";

const Post = ({ img, title, text, postImg }) => {
  return (
    <div className="main-div">
      <div className="post">
        <div className="post-header">
          <div className="profile-img">
            <img
              className="my-img"
              src={img}
              width={70}
              height={70}
              alt="Profile-img"
            />
          </div>
          <div className="post-info">
            <div className="post-name">
              <h1>{title}</h1>
            </div>
            <div className="post-date">2020-01-01</div>
          </div>
        </div>

        <div className="post-body">
          <p className="post-text">{text}</p>
        </div>

        <hr className="under-line" />

        <div className="post-img">
          <img src={postImg} alt="" />
        </div>

        <hr className="under-line" />

        <div className="post-footer">
          <div className="button">
            {" "}
            <HandThumbsUp />
            Like
          </div>
          <div className="button">
            <ChatLeftText /> Comment
          </div>
          <div className="button">
            <ShareFill /> Share
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(
  <div>
    <Post
      img={profileImg}
      title="Waseem Malik"
      text="Just Funny Post 🤣😂😂🤣
  Don't Be personally"
      postImg="https://scontent.fkhi12-1.fna.fbcdn.net/v/t39.30808-6/347410141_571067598507260_1966770028677316375_n.jpg?stp=dst-jpg_p526x296&_nc_cat=102&ccb=1-7&_nc_sid=49d041&_nc_eui2=AeF-lXKIIEIzcb-r4rhNQO67ptdXywK4tham11fLAri2FrUYfsr7zILZik5B42JsIl3rzK0qLm6w0IytgyBND4_n&_nc_ohc=rs1E4Q0MP1wAX-GXTbq&_nc_oc=AQnlf153Qhw5QMDcNZkdGUZeDFPyw5GAwGKffTx7Akz3soIaKZ24pm5oNDi6rE--owQ&_nc_ht=scontent.fkhi12-1.fna&oh=00_AfBTEIFSLJanVy9cbrvn0qt1bfwnIpDKu1iiR-9T6OqNeg&oe=64FE63D9"
    />
    <Post
      img={shaji}
      title="Sharjeel Shah"
      text="🤣🤣🤣🤣😂😂😂"
      postImg="https://scontent.fkhi12-1.fna.fbcdn.net/v/t39.30808-6/363008886_950812119507025_1279358659735326365_n.jpg?stp=dst-jpg_p180x540&_nc_cat=101&ccb=1-7&_nc_sid=49d041&_nc_eui2=AeESDuxIEmNL7FM4WGeJJyloHM-cRuX9_Ugcz5xG5f39SFD4e9bJwjKyvQPA-gdg6aPvfuLoQtglFtgnP-69Jv8I&_nc_ohc=CiaAJo3sBccAX8_RYzA&_nc_ht=scontent.fkhi12-1.fna&oh=00_AfDWwyvrnSWFthCmeUYLrRPT6etXISzELboYbDGfuZEsIg&oe=64FECA9F"
    />
    <Post
      img={imti}
      title="Imtiaz Ali"
      text="😂😂🤣🤣"
      postImg="https://scontent.fkhi12-1.fna.fbcdn.net/v/t39.30808-6/345562013_926720715252549_1565968124477695456_n.jpg?stp=dst-jpg_p526x296&_nc_cat=107&ccb=1-7&_nc_sid=49d041&_nc_eui2=AeHS0KF3wx1KUOULw89yj42Y7v3Ry_FHKCfu_dHL8UcoJ7gw1LR0B20eJgoqwsB8JrjUG9F9AcZXRHTtKIS0QX9d&_nc_ohc=qkK7_kgp1NYAX8m4jhU&_nc_ht=scontent.fkhi12-1.fna&oh=00_AfDPm4B8IDdBYxnpyxcy8hC0ZfyAkxU85dYEATwU7AUzsQ&oe=64FEA7AF"
    />{" "}
  </div>,
  document.querySelector("#root")
);
