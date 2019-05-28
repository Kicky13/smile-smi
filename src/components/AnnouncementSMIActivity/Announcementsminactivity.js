import React from "react";
//import { announcement } from "../../dummy/announcement";
import Parser from 'html-react-parser';
import Http from "../../Http";

class Announcementsmiactivity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      announcement: []
      //comments: [],
    };
    //this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;

  Http.get(process.env.REACT_APP_SMILE_API + "announcement/getannouncement")
    .then(res => {
      this.setState({
        announcement: res.data.announcement
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

    const announcement = this.state.announcement;

    return (
      <div>
        {/*  */}
        <div className="box-announcement">
          <div className="announcement-title">
            <h1>Announcement</h1>
          </div>
          <div className="announcement-now-box">

          {announcement.map((anObjectMapped, index) => {
                      return (
                        <div key={anObjectMapped.id}>

            <h2> {anObjectMapped.title}</h2>
            <div className="announcement-all">
              <p>
              {Parser(anObjectMapped.content)}
              </p>
            </div>
            </div>
                  );
                  })}


          </div>
        </div>
        {/*  */}
      </div>
    );
  }
}

export default Announcementsmiactivity;
