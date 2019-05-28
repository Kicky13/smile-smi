import React from "react";
import { NavLink } from "reactstrap";
import Http from "../../Http";
class Koransminews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newspaper: []
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
    Http.get(process.env.REACT_APP_SMILE_API + "newspaper/getlistnewspaper")
      .then(res => {
        this.setState({
          newspaper: res.data.newspaper
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

    const newspaper = this.state.newspaper;

    return (
      <div>
        <div className="koran">
          <h2>Koran</h2>
          <div className="box-koran">
          {newspaper.map((anObjectMapped, index) => {
            return (
            <NavLink href={process.env.REACT_APP_ROOT + "ListNewspaper"} title={anObjectMapped.name}>{anObjectMapped.name}<br /></NavLink>
            );
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default Koransminews;
