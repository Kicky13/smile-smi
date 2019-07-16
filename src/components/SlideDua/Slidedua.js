import React from "react";
import { NavLink, Button } from "reactstrap";
import LazyLoad from "react-lazy-load";
import ProgressiveImage from "react-progressive-image-loading";
import Http from "../../Http";
import Parser from "html-react-parser";
import Moment from 'react-moment';

class SlideDua extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      whatson: [],
      trending: [],
      hotarticle: [],
      topnewsfeed: []
    };
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;

    //latest article
    Http.get(process.env.REACT_APP_SMILE_API + "api/article/latest")
      .then(res => {
        this.setState({
          whatson: res.data.latest
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

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    const whatson = this.state.whatson;
    console.log("whatson");

    return (
      <div>
        <div className="content-latest-news">
          <div className="row">
              <div className="col-md-6">
              <h2 style={{paddingLeft: '10px'}}>What's on today?</h2>
              </div>
              <div className="col-md-6">
              <NavLink href={process.env.REACT_APP_ROOT + "whatson/1/1"}>
                <Button className="BtnSideWhat">
                  View More &nbsp; <i className="fas fa-arrow-alt-circle-right" />
                  <br />
                </Button>
              </NavLink>
              </div>
          </div>
          <div className="">
            <div className="row">
              {whatson.map((anObjectMapped, index) => {
                return (
                  <div key={anObjectMapped.id} className="col-md-6">
                    <div className="news-box">
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
                        <br/>
                        <br/>
                        <span className="italic-style"><Moment format="D MMM YYYY">{anObjectMapped.posted_date}</Moment></span>
                        <br/>
                        <br/>
                        {Parser(anObjectMapped.content.substring(0, 350))}
                        <NavLink href={process.env.REACT_APP_ROOT + "article/" + anObjectMapped.id}>
                          <Button className="view-more">
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
    );
  }
}
export default SlideDua;
