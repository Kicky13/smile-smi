import React from "react";
import Http from "../../Http";
import logoSmile from "../../users.png";
import LazyLoad from "react-lazy-load";
import { NavLink } from "reactstrap";

class Displayuser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;

    Http.get(process.env.REACT_APP_SMILE_API + "api/APIHRIS/profile")
    .then(res => {
      this.setState({
        user: res.data.user
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
    const user = this.state.user;
    return (
      <div>
        <div className="user-sppd">
          <div className="col-md-12">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><NavLink href={process.env.REACT_APP_ROOT}>Home</NavLink></li>
                <li class="breadcrumb-item active" aria-current="page">SPPD dan Cuti</li>
              </ol>
            </nav>
              <div className="row">
                <div className="col-md-2">
                  <LazyLoad>
                    <img
                      decoding="async"
                      src={logoSmile}
                      onError={(e)=>{e.target.src=logoSmile}}
                      alt=""
                    />
                  </LazyLoad>
                </div>
                <div className="col-md-6">
                  <p>
                    <h3><b>{user.mk_nama}</b></h3>
                  </p>
                  <p>
                    <h5>{user.mjab_nama}</h5>
                  </p>
                  <p>
                    <h5>{user.muk_nama}</h5>
                  </p>
                  <p>
                    <h5>{user.mk_eselon}</h5>
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Displayuser;
