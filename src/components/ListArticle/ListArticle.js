import React from "react";
import {Button, NavLink} from "reactstrap";
import Lazyload from "react-lazy-load";
import Http from "../../Http";
import Parser from "html-react-parser";
import Moment from "react-moment";

class ListArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            article: []
            //comments: [],
        };
        //this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        var apiParams;
        if (id == 3){
            const categoryId = this.props.match.params.category;
            apiParams = id + "/" + categoryId;
        } else {
            apiParams = id;
        }
        Http.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${localStorage.getItem("jwt_token")}`;
        //latest article
        Http.get(
            process.env.REACT_APP_SMILE_API + "api/article/articlePage/" + apiParams
        )
            .then(res => {
                this.setState({
                    article: res.data.artikel,
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
        const article = this.state.article;
        const styleDate = {
            color: "black"
        }
        const styleCategory = {
            background: "#80d8b1",
            padding: "12px 16px 12px 16px",
            borderRadius: "6px",
        }
        const styleImage = {
            width: "70%",
            height: "auto"
        }
        return (
            <div>
                {article.map((anObjectMapped, index) => {
                    return (
                      <div>
                      <div className="image-box">
                      <Lazyload>
                          <img
                              src={"https://smile.semenindonesia.com/" + anObjectMapped.img}
                              alt={anObjectMapped.title}
                              style={styleImage}
                          />
                      </Lazyload>
                      </div>
                      <br/>
                      <NavLink style={styleCategory}>{anObjectMapped.cat_name}</NavLink>
                      {/* ------ */}
                      {/* ------ */}
                      <div className="article-judul">
                          <h2>
                            <NavLink href={process.env.REACT_APP_ROOT + 'article/' + anObjectMapped.id}>
                            {anObjectMapped.title}
                            </NavLink>
                          </h2>
                          <p style={styleDate}>
                            <Moment format="D MMM YYYY">{anObjectMapped.posted_date}</Moment>
                          </p>
                      </div>
                      <div className="notice">
                          <div className="">
                              <div className="row">
                                  <div className="col-md-4">
                                        <div className="Comment-search">
                                            <i className="material-icons material-search">visibility</i>
                                            &nbsp; {anObjectMapped.viewed} &nbsp;

                                            <i class="material-icons material-search">comment</i>
                                            &nbsp; {anObjectMapped.jumlah} &nbsp;

                                            <i class="material-icons material-search">thumb_up</i>
                                            &nbsp; {anObjectMapped.like} &nbsp;
                                        </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      {/* ------ */}
                      {/* ------ */}
                      <div className="description">
                          <p>
                              {Parser(anObjectMapped.content.substring(0, 250))}
                          </p>
                      </div>
                      <div className="LineSpan" />
                  </div>
                    );
                })}
            </div>
        );
    }
}

export default ListArticle;
