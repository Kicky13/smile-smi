import React from "react";
import { Table } from 'reactstrap';
import Http from "../../Http";
import Moment from 'react-moment';

class Dashboardrapat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      meeting: []
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
    //Http.get("http://smile-dev-api.semenindonesia.com:3192/event/tableevent")
    Http.get(process.env.REACT_APP_SMILE_API + "event/tableevent")
      .then(res => {
        this.setState({
          meeting: res.data.meeting
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

    const meeting = this.state.meeting;

    return (
      <div>
        {/*  */}
        <div className="box-announcement">
          <div className="announcement-title">
            <h1>DASHBOARD Meeting & Training</h1>
          </div>
          <div className="announcement-now-box">
          <div className="announcement-all">
      <Table hover className="myTable">
        <thead>
          <tr>
            <th><p><b>Ruang Rapat</b></p></th>
            <th><p><b>Tanggal</b></p></th>
            <th><p><b>Deksripsi</b></p></th>
          </tr>
        </thead>
        <tbody>
        {meeting.map((anObjectMapped, index) => {
        return (
          <tr>
            <td><p>{anObjectMapped.Location}</p></td>
            <td><p><Moment format="D MMM YYYY">{anObjectMapped.Start}</Moment></p></td>
            <td><p>{anObjectMapped.Judul}</p></td>
          </tr>
            );
          })}
        </tbody>
      </Table>
            </div>
            </div>
          </div>
        {/*  */}
      </div>
    );
  }
}

export default Dashboardrapat;
