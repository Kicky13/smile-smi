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
import { Marketing } from "../../dummy/redesign/marketing";
import LazyLoad from "react-lazy-load";
import ProgressiveImage from "react-progressive-image-loading";
import Http from "../../Http";
import Parser from "html-react-parser";
import Moment from 'react-moment';

class SlideLima extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      csr: [],
      lifestyle: [],
      bisnis: []
    };
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;

    //category CSR
    Http.get(
      process.env.REACT_APP_SMILE_API + "api/articlecategory/category/6"
    )
      .then(res => {
        this.setState({
          csr: res.data.category
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

    //category Bisnis
    Http.get(
      process.env.REACT_APP_SMILE_API + "api/articlecategory/category/7"
    )
      .then(res => {
        this.setState({
          bisnis: res.data.category
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

    //category lifestyle
    Http.get(
      process.env.REACT_APP_SMILE_API + "api/articlecategory/category/12"
    )
      .then(res => {
        this.setState({
          lifestyle: res.data.category
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
    const csr = this.state.csr;
    console.log("csr");
    console.log(csr);
    const bisnis = this.state.bisnis;
    console.log("bisnis");
    console.log(bisnis);
    const lifestyle = this.state.lifestyle;
    console.log("lifestyle");
    console.log(lifestyle);
    return (
      <div>
        <div className="slidelima">
          <div className="container-fluid">
            <div className="container-fluid" />
            {/* Content Menu */}
            <div className="col-md-12 col-sm-12">
              {/*  */}
              <div className="row">
                <div className="content-smi-office">
                  {/*  */}

                  <Nav tabs className="menu-tabs">
                    <NavItem className="nav-item">
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "1"
                        })}
                        onClick={() => {
                          this.toggle("1");
                        }}
                      >
                        Lifestyle
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "2"
                        })}
                        onClick={() => {
                          this.toggle("2");
                        }}
                      >
                        Marketing
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
                        CSR{" "}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "4"
                        })}
                        onClick={() => {
                          this.toggle("4");
                        }}
                      >
                        Business{" "}
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <div className="row">
                            {lifestyle.map((anObjectMapped, index) => {
                              return (
                                <div
                                  key={anObjectMapped.id}
                                  className="col-md-3 col-sm-3"
                                >
                                  <div className="content-one-slidelima ">
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
                                      <h5 className="date-title">
                                        <b><h4>{anObjectMapped.title}</h4></b>{" "}
                                      </h5>
                                      <p className="date-title-slide">
                                      <Moment format="D MMM YYYY"><i>{anObjectMapped.posted_date}</i></Moment>
                                      </p>
                                      <br/>
                                      <p className="spoiler">
                                        {" "}
                                        &nbsp;{" "}
                                        {Parser(
                                          anObjectMapped.content.substring(
                                            0,
                                            100
                                          )
                                        )}
                                      </p>

                                      <NavLink
                                        href={process.env.REACT_APP_ROOT + "article/" + anObjectMapped.id}
                                      >
                                        <Button style={{marginLeft: '170px'}} className="button-overlay">
                                          <p>View more &nbsp;</p>
                                        </Button>
                                      </NavLink>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <div className="row">
                            {Marketing.map((anObjectMapped, index) => {
                              return (
                                <div
                                  key={anObjectMapped.id}
                                  className="col-md-3 col-sm-3"
                                >
                                  <div className="content-one-slidelima ">
                                    <LazyLoad>
                                      <ProgressiveImage
                                        preview={anObjectMapped.lokasifoto}
                                        src={anObjectMapped.lokasifoto}
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
                                      <h5 className="date-title">
                                        <b><h4>{anObjectMapped.judul}</h4></b>{" "}
                                      </h5>
                                      <p className="date-title-slide">
                                      <Moment format="D MMM YYYY"><i>{anObjectMapped.posted_date}</i></Moment>
                                      </p>
                                      <br/>
                                      <p className="spoiler">
                                        {" "}
                                        &nbsp;{" "}
                                        {Parser(
                                          anObjectMapped.spoiler.substring(
                                            0,
                                            100
                                          )
                                        )}
                                      </p>

                                      <NavLink
                                        href={process.env.REACT_APP_ROOT + "article/" + anObjectMapped.id}
                                      >
                                        <Button style={{marginLeft: '170px'}} className="button-overlay">
                                          <p>View more &nbsp;</p>
                                        </Button>
                                      </NavLink>
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
                            {csr.map((anObjectMapped, index) => {
                              return (
                                <div
                                  key={anObjectMapped.id}
                                  className="col-md-3 col-sm-3"
                                >
                                  <div className="content-one-slidelima ">
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
                                      <h5 className="date-title">
                                        <b><h4>{anObjectMapped.title}</h4></b>{" "}
                                      </h5>
                                      <p className="date-title-slide">
                                      <Moment format="D MMM YYYY"><i>{anObjectMapped.posted_date}</i></Moment>
                                      </p>
                                      <br/>
                                      <p className="spoiler">
                                        {" "}
                                        &nbsp;{" "}
                                        {Parser(
                                          anObjectMapped.content.substring(
                                            0,
                                            100
                                          )
                                        )}
                                      </p>

                                      <NavLink
                                        href={process.env.REACT_APP_ROOT + "article/" + anObjectMapped.id}
                                      >
                                        <Button style={{marginLeft: '170px'}} className="button-overlay">
                                          <p>View more &nbsp;</p>
                                        </Button>
                                      </NavLink>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <Col sm="12">
                          <div className="row">
                            {bisnis.map((anObjectMapped, index) => {
                              return (
                                <div
                                  key={anObjectMapped.id}
                                  className="col-md-3 col-sm-3"
                                >
                                  <div className="content-one-slidelima ">
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
                                      <h5 className="date-title">
                                        <b><h4>{anObjectMapped.title}</h4></b>{" "}
                                      </h5>
                                      <p className="date-title-slide">
                                      <Moment format="D MMM YYYY"><i>{anObjectMapped.posted_date}</i></Moment>
                                      </p>
                                      <br/>
                                      <p className="spoiler">
                                        {" "}
                                        &nbsp;{" "}
                                        {Parser(
                                          anObjectMapped.content.substring(
                                            0,
                                            100
                                          )
                                        )}
                                      </p>

                                      <NavLink
                                        href={process.env.REACT_APP_ROOT + "article/" + anObjectMapped.id}
                                      >
                                        <Button style={{marginLeft: '170px'}} className="button-overlay">
                                          <p>View more &nbsp;</p>
                                        </Button>
                                      </NavLink>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                  <br />

                  {/*  */}
                  {/*<NavLink*/}
                  {/*  href="/"*/}
                  {/*  className="btn-viewmore d-flex justify-content-center align-items-center"*/}
                  {/*>*/}
                  {/*  <Button>*/}
                  {/*    View More <i className="fas fa-arrow-alt-circle-right" />*/}
                  {/*  </Button>*/}
                  {/*</NavLink>*/}
                  {/*  */}
                </div>
              </div>
            </div>

            {/* End Content Menu */}
          </div>
        </div>
      </div>
    );
  }
}
export default SlideLima;
