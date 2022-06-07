import styled from "styled-components";
import { useState, useEffect } from "react";
import PostModel from "./PostModel";
import { FcMultipleCameras, FcPlanner, FcCamcorderPro } from "react-icons/fc";
import { FiEdit2 } from "react-icons/fi";
import { connect } from "react-redux";
import { getArticleAPI } from "../Actions";

const Main = (props) => {
  const [showModel, setShowModel] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModel) {
      case "open":
        setShowModel("close");
        break;
      case "close":
        setShowModel("open");
        break;
      default:
        setShowModel("close");
        break;
    }
  };
  return (
    <>
      {props.articles.length === 0 ? (
        <p>There are no articles</p>
      ) : (
        <Container>
          <Sharebox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}
              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
              >
                Start a post
              </button>
            </div>
            <div>
              <button>
                <FcMultipleCameras />
                <span>Photo</span>
              </button>
              <button>
                <FcPlanner />
                <span>Events</span>
              </button>
              <button>
                <FcCamcorderPro />
                <span> Video</span>
              </button>
              <button>
                <FiEdit2 />
                <span>Write </span>
              </button>
            </div>
          </Sharebox>
          <Content>
            {props.loading && <img src={"/images/Spin-logo.svg"} />}

            <Article>
              <ShareActor>
                <a>
                  <img src="/images/user.svg" alt="" />
                  <div>
                    <span>Title</span>
                    <span>Info</span>
                    <span>Date</span>
                  </div>
                </a>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-three-dots"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </button>
              </ShareActor>
              <Description>text</Description>
              <SharedTag>
                <a>
                  <img src="/images/shared.jpg" alt="" />
                </a>
              </SharedTag>
              <Likes>
                <li>
                  <button>
                    <img src="/images/like(16).png" alt="" />
                    <img src="/images/rose (24).png" alt="" />
                    <span>75</span>
                  </button>
                </li>
                <li>
                  <a>2 comments</a>
                </li>
              </Likes>
              <SocialAction>
                <button>
                  <img src="/images/like(16).png" alt="" />
                  <span>Like</span>
                </button>
                <button>
                  <img src="/images/comment.png" alt="" />
                  <span>Comments</span>
                </button>
                <button>
                  <img src="/images/share.png" alt="" />
                  <span>Share</span>
                </button>
                <button>
                  <img src="/images/send.png" alt="" />
                  <span>Send</span>
                </button>
              </SocialAction>
            </Article>
          </Content>
          <PostModel showModel={showModel} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const Sharebox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 8px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        svg {
          margin: 0 2px 0 -2px;
          min-height: 55%;
          min-width: 55%;
        }
        span {
          color: #1255d1;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const ShareActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedTag = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const Likes = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  img {
    padding: 1px;
    background-color: white;
  }
  li {
    margin-right: 5px;
    font-size: 12px;
    padding-right: 10px;

    button {
      display: flex;
      border: none;
    }
  }
`;
const SocialAction = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    @media (min-width: 78px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 36px;
  }
`;
const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticleAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
