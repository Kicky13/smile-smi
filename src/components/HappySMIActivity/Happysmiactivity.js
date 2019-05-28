import React, { Component } from "react";
import Slider from "react-slick";
import LazyLoad from "react-lazy-load";
import ProgressiveImage from "react-progressive-image-loading";
import Http from "../../Http";
import logoSmile from "../../users.png";


export default class Happysmiactivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      ultahPegawai: []
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
    Http.get("http://10.15.3.86/optimus/index.php/_api/pegawai/ultahPegawai")
      .then(res => {
        this.setState({
          ultahPegawai: res.data.ultahPegawai
        });
      })
      .catch(err => {
        // const statusCode = err.response.status;
        const statusCode = '';
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

    const ultahPegawai = this.state.ultahPegawai;

    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <div>
        <div className="happybirthday-date">
          <h2>This Month is their happiness</h2>
          <br />
          <Slider {...settings}>

          {ultahPegawai.map((anObjectMapped, index) => {
                      return (
            <div key={anObjectMapped.mk_nopeg}>
              <div className="img-box">

              <LazyLoad>
              <img
                    decoding="async"
                    src={anObjectMapped.photo}
                    onError={(e)=>{e.target.src=logoSmile}}
                    alt=""
                  />
                </LazyLoad>

              </div>
              <h5><b>{anObjectMapped.mk_nama}</b></h5>
              <h5>{anObjectMapped.mk_nopeg}</h5>
              <h5>{anObjectMapped.company_text}</h5>
            </div>

            );
          })}


          </Slider>
        </div>
      </div>
    );
  }
}
