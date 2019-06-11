import React from "react";
import { Card, CardImg, CardText, CardBody, NavLink, Button } from "reactstrap";
import Http from "../../Http";
import Parser from "html-react-parser";
import Moment from 'react-moment';
class DisplayGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      videoList: [],
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
    Http.get(process.env.REACT_APP_SMILE_API + "galery/getvideo")
      .then(res => {
        this.setState({
          videoList: res.data.videoBawah
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
    const videoList = this.state.videoList;
    return (
      <div>
        <div className="listVideo">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><NavLink href={process.env.REACT_APP_ROOT}>Home</NavLink></li>
              <li class="breadcrumb-item"><NavLink href={process.env.REACT_APP_ROOT + "gallery"}>Gallery</NavLink></li>
              <li class="breadcrumb-item active" aria-current="page">List Video</li>
            </ol>
          </nav>
          <h3><b>Video</b></h3>
          <div className="">
            <div className="row">
              {/*  */}

              {videoList.map((anObjectMapped, index) => {
                return (
                  <div className="col-md-4">
                    <div className="video-play-two">
                    <div class="embed-responsive embed-responsive-16by9">
                          <iframe
                            title="Semen Indonesia"
                            class="embed-responsive-item"
                            src={anObjectMapped.link}
                            allowfullscreen
                          />
                    </div>
                          <div className="title-card">
                              <h4><b>{anObjectMapped.judul}</b></h4>
                          </div>
                          <div className="video-love">
                            <Moment format="D MMM YYYY">{anObjectMapped.date}</Moment>
                          </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayGallery;
