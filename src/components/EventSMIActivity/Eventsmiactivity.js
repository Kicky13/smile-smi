import React from "react";
//import { event1 } from "../../dummy/event";
import Parser from 'html-react-parser';
import Http from "../../Http";
//import Moment from 'react-moment';

class Eventsmiactivity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      eventlow: []
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
    Http.get(process.env.REACT_APP_SMILE_API + "event/event_bawah")
      .then(res => {
        this.setState({
          eventlow: res.data.eventBawah
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

    const eventlow = this.state.eventlow;

    return (
      <div>
        <div className="event-box">
          {/*  */}
          <div className="event-box-news">
            <h1>Event</h1>
            <div className="event-box-now">

            {eventlow.map((anObjectMapped, index) => {
                      return (

              <div key={anObjectMapped.id}>
              <h2>{anObjectMapped.title}</h2>
              <div className="event-all">
                <p>
                {anObjectMapped.content}
                </p>
              </div>
              </div>
              );
            })}



            </div>
          </div>
          {/*  */}
        </div>
      </div>
    );
  }
}

export default Eventsmiactivity;
