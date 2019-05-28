import React from "react";
// import Button from "react";
import Http from "../../Http";
import {Button, NavLink} from "reactstrap";
import Moment from 'react-moment';

class Magazinejurnal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      magazineSide: []
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
    Http.get(process.env.REACT_APP_SMILE_API +"sinergi/getsamping")
      .then(res => {
        this.setState({
          magazineSide: res.data.sinergiSamping
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

    const magazineSide = this.state.magazineSide;

    return (
      <div>
        <div className="magazine-list">
          <div className="magazine-title">
            <h2>SINERGI</h2>
          </div>
          <div className="magazine-box">
            <div className="magazine-list-box">
              <div className="">
                {magazineSide.map((anObjectMapped, index) => {
                return (
                  <div className="row">
                  <div key={anObjectMapped.id}>
                  <div className="col-md-6">
                    <div className="magazine">
                      <img
                        src={"https://smile.semenindonesia.com/" +anObjectMapped.cover}
                        alt="" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="magazine">
                      <NavLink href={"https://smile.semenindonesia.com/" + anObjectMapped.filename} target="_blank">
                      <p className="title-magazine">
                        {anObjectMapped.title}
                      </p>
                      </NavLink>
                      <div className="magazine-love">
                        <p>
                          <i class="material-icons">visibility</i>
                          &nbsp; {anObjectMapped.view} &nbsp;&nbsp;&nbsp;&nbsp;
                          <i class="material-icons">archive</i>
                          &nbsp; {anObjectMapped.liked} &nbsp;&nbsp;&nbsp;&nbsp;
                          <i class="material-icons">comment</i>
                          &nbsp; {anObjectMapped.comment} &nbsp;
                        </p>
                      </div>
                      <div className="date-magazine">
                        <p><Moment format="D MMM YYYY">{anObjectMapped.tgl_terbit}</Moment></p>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>
                    );
                    })}
                  {/*  */}

              </div>
            </div>
          </div>
        </div>
        <NavLink href={process.env.REACT_APP_ROOT + "listjurnal"}>
          <Button className="BtnSideWhat">
            View More &nbsp; <i className="fas fa-arrow-alt-circle-right" />
            <br />
          </Button>
        </NavLink>
      </div>
    );
  }
}

export default Magazinejurnal;
