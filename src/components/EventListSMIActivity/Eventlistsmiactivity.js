import React from "react";
//import { event5 } from "../../dummy/event";
import Parser from 'html-react-parser';
import Http from "../../Http";
import Moment from 'react-moment';

class Eventlistactivity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      eventSamping: []
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
      Http.get(process.env.REACT_APP_SMILE_API + "event/event_samping")
      .then(res => {
        this.setState({
          eventSamping: res.data.eventSamping
        });
      })
      .catch(err => {
        const statusCode = err.response.status;
        //const statusCode = '';
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

    const eventSamping = this.state.eventSamping;

    return (
      <div>
        <div className="event-list">
          <div className="event-title-box">
            <h4>Event</h4>
          </div>
          <div className="event-list-box">
            <div className="">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="data-event">
                    <div className="">

                      {eventSamping.map((anObjectMapped, index) => {
                      return (
                        <div className="row">
                        <div key={anObjectMapped.id}>
                        {/*  */}
                        <div className="col-md-4 col-sm-4">
                          <div className="date-event">
                            <h2><Moment format="D">{anObjectMapped.event_date}</Moment></h2>
                            <p><Moment format="MMM">{anObjectMapped.event_date}</Moment></p>
                          </div>
                        </div>
                        <div className="col-md-7 col-sm-7">
                          <div className="date-event-announ">
                            <h4>{anObjectMapped.title}</h4>
                          </div>
                        </div>
                        <div className="col-md-1 col-sm-1" />
                        {/*  */}
                        </div>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Eventlistactivity;
