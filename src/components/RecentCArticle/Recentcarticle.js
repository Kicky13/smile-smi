// import { Tooltip, Button } from "reactstrap";
import React from "react";
import Http from "../../Http";
import Moment from 'react-moment';
import logoUser from "../../users.png";

// import logoTwitter from "../../twitter.svg";
class RecentComment extends React.Component {
constructor(props) {
  super(props);

  //this.toggle = this.toggle.bind(this);
  this.state = {
    activeTab: "1",
    recent: [],

  };
}

componentDidMount() {
  Http.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("jwt_token")}`;
  //latest article
  Http.get(process.env.REACT_APP_SMILE_API + "api/admin/comment/recent")
    .then(res => {
      this.setState({
        recent: res.data.recentcomment,
        //comments: res.data.comments
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
  const recent = this.state.recent;
  return (
    <div>
      <div className="recent-comment">
        {/*  */}
        <h3>Recent Comment</h3>
        {recent.map((anObjectMapped, index) => {
          return (
            <>
              <div className="comment-box">
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <div className="icon">
                      <img src={logoUser} className="commentUser" alt="" />
                    </div>
                  </div>
                  <div className="col-md-10 col-sm-10">
                    <div className="name-time">
                    <p className="name"><b>{anObjectMapped.full_name}</b></p>
                      <p className="time"><Moment format="D MMM YYYY HH:mm">{anObjectMapped.date}</Moment></p>
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

        {/*  */}
      </div>
    </div>
  );
}
}

export default RecentComment;
