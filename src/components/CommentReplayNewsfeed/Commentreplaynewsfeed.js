import React from "react";
import { FormGroup, Button, Input } from "reactstrap";
import Http from "../../Http";
import Moment from 'react-moment';

class CommentReplayArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      comments: [],
      isLiked: false,
      thumbStyle: 'fa fa-thumbs-up fa-2x thumbsLike',
      komentar: ''
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    //latest article
    Http.get(process.env.REACT_APP_SMILE_API + "api/newsfeed/detail/" + id)
      .then(res => {
        this.setState({
          comments: res.data.comments
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
      Http.get(process.env.REACT_APP_SMILE_API + "api/article/isLikedArticle/" + id)
        .then(res => {
          this.setState({
            isLiked: res.data.isLiked
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

  handleChange(e) {
    e.preventDefault();
    this.setState({komentar: e.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let komentar = this.state.komentar;
    let responseAPI;
    let dataForm = {
      comment: komentar,
      id: this.props.match.params.id,
      table: "article"

    }
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    Http.post(process.env.REACT_APP_SMILE_API + "api/comment/input", dataForm)
        .then(res => {
            responseAPI = res.data;
            if (typeof responseAPI == "undefined") {
                console.log("Failed");
            } else {
                console.log("Success");
            }
        })
        .catch(err => {
            const statusCode = err.response.status;
            const data = {
                    error: null,
                    statusCode,
            };
                //console.log("error");
              if (statusCode === 401 || statusCode === 422) {
                    // status 401 means unauthorized
                    // status 422 means unprocessable entity
                    data.error = err.response.data.message;
              }
        });
  }

  likeArticle(event) {
    event.preventDefault();
    const id = this.props.match.params.id;
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    Http.get(process.env.REACT_APP_SMILE_API + "api/article/likearticle/" + id)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        const statusCode = err.response.status;
        const data = {
                error: null,
                statusCode,
        };
              //console.log("error");
          if (statusCode === 401 || statusCode === 422) {
              // status 401 means unauthorized
              // status 422 means unprocessable entity
            data.error = err.response.data.message;
          }
      })
    let isLiked = this.state.isLiked;
    if (isLiked === true) {
      this.setState({
        isLiked: false,
        thumbStyle: 'fa fa-thumbs-up fa-2x thumbsLike'
      });
    } else {
      this.setState({
        isLiked: true,
        thumbStyle: 'fa fa-thumbs-up fa-2x thumbsLiked'
      });
    }

  }

  render() {
    const comments = this.state.comments;
    console.log(comments);
    if (this.state.isLiked === true) {
      this.setState({
        thumbStyle: 'fa fa-thumbs-up fa-2x thumbsLiked'
      });
    }
    return (
      <div>
        <div className="comment">
          <h3 className>Comment
          <button className="ButtonNone" onClick={this.likeArticle.bind(this)}><i class={this.state.thumbStyle} title="Like Article"></i></button></h3>
          {comments.map((anObjectMapped, index) => {
            return (
              <>
                <div key={anObjectMapped.id} className="comment-box">
                  <div className="row">
                    <div className="col-md-1 col-sm-1">
                      <div className="icon">
                        <i class="material-icons">account_circle</i>
                      </div>
                    </div>
                    <div className="col-md-11 col-sm-11">
                      <div className="name-time">
                        <p className="name">{anObjectMapped.full_name}</p>
                        <p className="time"><Moment format="D MMM YYYY">{anObjectMapped.date}</Moment></p>
                      </div>
                      <div className="comment-section">
                        <p>
                          {anObjectMapped.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </>
            );
          })}

        </div>
        {/* ------ */}
        <div className="input-comment">
          <p>Leave a reply</p>
          <br />
          <FormGroup>
            <Input
              className="form"
              type="textarea"
              name="komentar"
              id="komentar"
              placeholder="Masukkan komentar anda..."
              onChange={this.handleChange.bind(this)}
              value={this.state.komentar}
            />
            <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default CommentReplayArticle;
