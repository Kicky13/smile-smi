import React from "react";
import { NavLink, Button } from "reactstrap";
import LazyLoad from "react-lazy-load";
import ProgressiveImage from "react-progressive-image-loading";
import Http from "../../Http";
import Parser from "html-react-parser";
import Moment from 'react-moment';

class Articlesminews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      bigHeaderImg: [],
      smallHeaderImg: []
      //comments: [],
    };
    //this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    //latest article
    //advertise limit 1
    Http.get(process.env.REACT_APP_SMILE_API + "api/admin/article/latestlimit1")
      .then(res => {
        this.setState({
          bigHeaderImg: res.data.latestlimit1
        });
      })
      .catch(err => {
        const statusCode = err.response.status;
        const data = {
          error: null,
          statusCode
        };
        if (statusCode === 401 || statusCode === 422) {
          // status 401 means unauthorized
          // status 422 means unprocessable entity
          data.error = err.response.data.message;
        }
        return Promise.reject(data);
      });

      Http.get(process.env.REACT_APP_SMILE_API + "api/admin/article/latestlimit2")
        .then(res => {
          this.setState({
            smallHeaderImg: res.data.latestlimit2
          });
        })
        .catch(err => {
          const statusCode = err.response.status;
          const data = {
            error: null,
            statusCode
          };
          if (statusCode === 401 || statusCode === 422) {
            // status 401 means unauthorized
            // status 422 means unprocessable entity
            data.error = err.response.data.message;
          }
          return Promise.reject(data);
        });
  }

  render() {

    const bigHeaderImg = this.state.bigHeaderImg;
    const smallHeaderImg = this.state.smallHeaderImg;

    return <div>

    <div className="news-header">
    <div className="">
      <div className="row">

            <div  className="col-md-8">
            {bigHeaderImg.map((anObjectMapped, index) => {
              return (
              <div className="HeaderNews BigImg">
              <LazyLoad>
                <ProgressiveImage
                  preview={
                    "https://smile.semenindonesia.com/" +
                    anObjectMapped.img
                  }
                  src={
                    "https://smile.semenindonesia.com/" +
                    anObjectMapped.img
                  }
                  render={(src, style) => (
                    <img
                      decoding="async"
                      src={src}
                      alt=""
                      style={style}
                    />
                  )}
                />
              </LazyLoad>

                <div className="item-overlay top">
                  <h4 style={{fontSize: '28px'}}>{anObjectMapped.title}</h4>
                  
                  <p style={{fontSize: '14px'}}><Moment format="D MMM YYYY">{anObjectMapped.posted_date}</Moment></p>
                  
                  {Parser(anObjectMapped.content.substring(0, 500))}
                  <NavLink href={"/dev/smile/article/" + anObjectMapped.id}>
                    <Button className="view-more">
                      <p className="view-text">
                        Read more &nbsp;{" "}
                        <i className="fas fa-arrow-alt-circle-right" />
                      </p>
                    </Button>
                  </NavLink>
                </div>
              </div>
            );
          })}
            </div>

            <div  className="col-md-4">
            {smallHeaderImg.map((anObjectMapped, index) => {
              return (
            <div className="row">
              <div className="HeaderNews">
              <LazyLoad>
                <ProgressiveImage
                  preview={
                    "https://smile.semenindonesia.com/" +
                    anObjectMapped.img
                  }
                  src={
                    "https://smile.semenindonesia.com/" +
                    anObjectMapped.img
                  }
                  render={(src, style) => (
                    <img
                      decoding="async"
                      src={src}
                      alt=""
                      style={style}
                    />
                  )}
                />
              </LazyLoad>

                <div className="item-overlay top">
                <h4>{anObjectMapped.title}</h4>
                <br />
                <p><Moment format="D MMM YYYY">{anObjectMapped.posted_date}</Moment></p>
                <br />
                {Parser(anObjectMapped.content.substring(0, 150))}
                <NavLink href={"/dev/smile/article/" + anObjectMapped.id}>
                  <Button className="view-more lima">
                    <p className="view-text">
                      Read more &nbsp;{" "}
                      <i className="fas fa-arrow-alt-circle-right" />
                    </p>
                  </Button>
                </NavLink>
                </div>
              </div>

            </div>
              );
            })}
            </div>

      </div>
    </div>

    </div>
    </div>;
  }
}

export default Articlesminews;
