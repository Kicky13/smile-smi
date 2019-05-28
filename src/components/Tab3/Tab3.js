import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import LazyLoad from "react-lazy-load";
import ProgressiveImage from "react-progressive-image-loading";
import Http from "../../Http";
import Moment from 'react-moment';

class Tab3 extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      trending: [],
      hotarticle: [],
      topnewsfeed: []
    };
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;

    //trending
    Http.get(
      process.env.REACT_APP_SMILE_API + "api/admin/article/trending"
    )
      .then(res => {
        this.setState({
          trending: res.data.hot
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

    //hotarticle
    /*
    Http.get(
      process.env.REACT_APP_SMILE_API + "api/article/hotarticle"
    )
      .then(res => {
        this.setState({
          hotarticle: res.data.hot
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

    //topnewsfeed
    Http.get(process.env.REACT_APP_SMILE_API + "api/newsfeed/top")
      .then(res => {
        this.setState({
          topnewsfeed: res.data.newsfeed
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
      */
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    const trending = this.state.trending;
    console.log(trending);
    // const hotarticle = this.state.hotarticle;
    // const topnewsfeed = this.state.topnewsfeed;


    return (
      <div className="content-tabs">
      <NavLink href={process.env.REACT_APP_ROOT + "whatson/2/1"}>
        <br />
        <Button className="BtnSide">
          View More &nbsp; <i className="fas fa-arrow-alt-circle-right" />
        </Button>
      </NavLink>
        <Nav tabs className="menu-tabs">
          <NavItem className="nav-item-default">
            <NavLink
              className={classnames({
                active: this.state.activeTab === "1"
              })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Trending News
            </NavLink>
          </NavItem>
          {/*
          <NavItem className="nav-item">
            <NavLink
              className={classnames({
                active: this.state.activeTab === "2"
              })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Hot Article
            </NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink
              className={classnames({
                active: this.state.activeTab === "3"
              })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Top Newsfeed
            </NavLink>
          </NavItem>
          */}
        </Nav>
        <br />
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div className="row">
                  {trending.map((anObjectMapped, index) => {
                    return (
                      <div key={anObjectMapped.id} className="news">
                        <div className="col-md-4">
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
                                  className="img-box"
                                  src={
                                    "https://smile.semenindonesia.com/" +
                                    anObjectMapped.img
                                  }
                                  alt=""
                                  style={style}
                                />
                              )}
                            />
                          </LazyLoad>
                        </div>
                        <div className="col-md-8">
                          <div className="title-news">
                            <h4>
                              {" "}
                              <a href={"/dev/smile/article/" + anObjectMapped.id}>
                                {anObjectMapped.title}
                              </a>
                            </h4>
                          </div>
                          <div className="title-footer">
                          <div className="date">
                          <div className="comment-eye">
                            <p>
                              <i className="material-icons">calendar_today</i>
                              <i>&nbsp; <Moment format="D MMM YYYY">{anObjectMapped.posted_date}</Moment></i>
                            </p>
                          </div>
                          </div>
                            <div className="comment-eye">
                              <p>
                                {" "}
                                <i
                                  className="fa fa-eye"
                                  aria-hidden="true"
                                />{" "}
                                &nbsp; {anObjectMapped.viewed}
                              </p>
                              &nbsp;
                              <p>
                                {" "}
                                <i className="material-icons">comment</i>
                                &nbsp; {anObjectMapped.comment}
                              </p>
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </TabPane>
          {/*
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <div className="row">
                  {hotarticle.map((anObjectMapped, index) => {
                    return (
                      <div key={anObjectMapped.id} className="news">
                        <div className="col-md-4">
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
                                  className="img-box"
                                  src={
                                    "https://smile.semenindonesia.com/" +
                                    anObjectMapped.img
                                  }
                                  alt=""
                                  style={style}
                                />
                              )}
                            />
                          </LazyLoad>
                        </div>
                        <div className="col-md-8">
                          <div className="title-news">
                            <h4>
                              {" "}
                              <a href={"/article/" + anObjectMapped.id}>
                                {anObjectMapped.title}
                              </a>
                            </h4>
                          </div>
                          <div className="title-footer">
                            <div className="comment-eye">
                              <p>
                                {" "}
                                <i
                                  className="fa fa-eye"
                                  aria-hidden="true"
                                />{" "}
                                &nbsp; {anObjectMapped.viewed}
                              </p>
                              &nbsp;
                              <p>
                                {" "}
                                <i className="material-icons">comment</i>
                                &nbsp; 0
                              </p>
                            </div>
                            <div className="date">
                              <p>
                                <i className="material-icons">calendar_today</i>
                                &nbsp; {anObjectMapped.posted_date}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <div className="row">
                  {topnewsfeed.map((anObjectMapped, index) => {
                    return (
                      <div key={anObjectMapped.id} className="news">
                        <div className="col-md-4">
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
                                  className="img-box"
                                  src={
                                    "https://smile.semenindonesia.com/" +
                                    anObjectMapped.img
                                  }
                                  alt=""
                                  style={style}
                                />
                              )}
                            />
                          </LazyLoad>
                        </div>
                        <div className="col-md-8">
                          <div className="title-news">
                            <h4>
                              {" "}
                              <a href={"/newsfeed/" + anObjectMapped.id}>
                                {anObjectMapped.title}
                              </a>
                            </h4>
                          </div>
                          <div className="title-footer">
                            <div className="comment-eye">
                              <p>
                                {" "}
                                <i
                                  className="fa fa-eye"
                                  aria-hidden="true"
                                />{" "}
                                &nbsp; {anObjectMapped.viewed}
                              </p>
                              &nbsp;
                              <p>
                                {" "}
                                <i className="material-icons">comment</i>
                                &nbsp; 0
                              </p>
                            </div>
                            <div className="date">
                              <p>
                                <i className="material-icons">calendar_today</i>
                                &nbsp; {anObjectMapped.created_date}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </TabPane>
          */}
        </TabContent>
      </div>
    );
  }
}
export default Tab3;
