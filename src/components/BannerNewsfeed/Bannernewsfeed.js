// import { Tooltip, Button } from "reactstrap";
import React from "react";
import { NavLink } from "reactstrap";
// import logoTwitter from "../../twitter.svg";
import Http from "../../Http";
import Parser from "html-react-parser";
import Moment from 'react-moment';

class Bannernewsfeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      article: [],
      comments: [],
      comment: "",
      like: "",
      tags: [],
      liked: false
    };
    //this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    //latest article
    Http.get(
      process.env.REACT_APP_SMILE_API + "api/newsfeed/detail/" + id
    )
      .then(res => {
        this.setState({
          article: res.data.detail,
          comments: res.data.comments,
          tags: res.data.tag,
          like: res.data.like,
          comment: res.data.jumlah_comment
        });
      })
      .catch(err => {
        // const statusCode = err.response.status;
        const statusCode = '';
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
    const { article, like, comment } = this.state;
    const tags = this.state.tags.map((tagMapped, index) => {
      return (
          <NavLink>{tagMapped.name}</NavLink>
      );
    });
    return (
      <div>
        {article.map((anObjectMapped, index) => {
          return (
            <>
              <div className="article-judul" key={anObjectMapped.id}>
                <h1>
                  {anObjectMapped.title} &nbsp;
                  <NavLink>{anObjectMapped.cat_name}</NavLink>
                </h1>
              </div>
              {/* ------ */}
              <div className="notice">
                <div className="">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="nama-notice">
                        <p>
                          <Moment format="D MMM YYYY">{anObjectMapped.posted_date}</Moment>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="date-comment-view">
                        <p>
                          <i class="material-icons">visibility</i>
                          &nbsp; {anObjectMapped.viewed}{" "}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <i class="material-icons">comment</i>
                          &nbsp; {comment} &nbsp;
                          <i class="material-icons">thumb_up</i>
                          &nbsp; {like} &nbsp;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ------ */}
              {/* ------ */}
              <div className="image-box">
                <img
                  src={"https://smile.semenindonesia.com/" + anObjectMapped.img}
                  alt=""
                />
              </div>
              {/* ------ */}
              {/* ------ */}
              <div className="description">
                <p>{Parser(anObjectMapped.content)}</p>
                <br />
                <div className="desc-tag">
                  <div className="col-md-12 col-sm-12">
                  {tags}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    );
  }
}

export default Bannernewsfeed;
