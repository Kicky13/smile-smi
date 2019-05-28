// import { Tooltip, Button } from "reactstrap";
import React from "react";
import Http from "../../Http";
import { NavLink } from "reactstrap";
import Nav from "reactstrap/es/Nav";
// import logoTwitter from "../../twitter.svg";
class Bannerjurnal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      magazineNew: [],
    };
    //this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    //latest article
    //advertise limit 1
    Http.get(process.env.REACT_APP_SMILE_API +"sinergi/getnew")
      .then(res => {
        this.setState({
          magazineNew: res.data.sinergyNew
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
    const magazineNew = this.state.magazineNew;

    return (

      <div>
      {magazineNew.map((anObjectMapped, index) => {
        return (
        <div key={anObjectMapped.id}>
        <div className="banner-jurnal">
          <NavLink href={"https://smile.semenindonesia.com/" + anObjectMapped.filename} target="_blank">
          <div className="banner-title">
            <h2>{anObjectMapped.title}</h2>
          </div>
          </NavLink>
            <div>
              <div className="magazine-box">
                <div className="magazine-image-box">
                  <NavLink href={"https://smile.semenindonesia.com/" + anObjectMapped.filename} target="_blank">
                  <img
                    src={"https://smile.semenindonesia.com/" + anObjectMapped.cover}
                    alt=""
                  />
                  </NavLink>
                </div>
              </div>
            </div>
            <div>
            </div>

        </div>
        </div>
      );
      })}
      </div>
    );
  }
}

export default Bannerjurnal;
