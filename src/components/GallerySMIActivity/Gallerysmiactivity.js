import React, { Component } from "react";
import LazyLoad from "react-lazy-load";
import Parser from 'html-react-parser';
import Http from "../../Http";
import ProgressiveImage from "react-progressive-image-loading";

// import logo from "../../logoSmile.png";

export default class Gallerysmiactivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      latestPhoto: []
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
    Http.get(process.env.REACT_APP_SMILE_API + "galery/getLatestPhoto")
      .then(res => {
        this.setState({
          latestPhoto: res.data.latestPhoto
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

    const latestPhoto = this.state.latestPhoto;

    return (
      <div>
        <div className="Biography">
          <h2>Gallery</h2>
          <div className="">
            <div className="row">
              {/*  */}
              {latestPhoto.map((anObjectMapped, index) => {
                return (
              <div className="col-md-3 col-sm-3">
                <div className="img-box-biography">
                <a href={"/dev/smile/listgallery/" + anObjectMapped.id_album}>
                  <LazyLoad>
                    <img
                      src={"https://smile.semenindonesia.com/repo/dev/" +
                      anObjectMapped.filename}
                      alt={anObjectMapped.title}
                    />
                  </LazyLoad>
                  </a>
                </div>
              </div>
              );
            })}

            </div>
          </div>
        </div>
      </div>
    );
  }
}
