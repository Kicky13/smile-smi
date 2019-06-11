import React from "react";
import Slider from "react-slick";
import Http from "../../Http";
import { NavLink } from "reactstrap";

class Newspaperjurnal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      videoBawah: []
      //comments: [],
    };
    //this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    let dataKoran = this.state.koran;
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    //latest article
    //advertise limit 1
    Http.get(process.env.REACT_APP_SMILE_API +"newspaper/getlatestnewspaper2/0/12")
      .then(res => {
        this.setState({
          videoBawah: res.data.newspaper
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

    const videoBawah = this.state.videoBawah;

    var settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
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
        {/*  */}

        <div className="newspaper-jurnal">
          <h2>Newspaper</h2>
          <Slider {...settings}>

          {videoBawah.map((anObjectMapped, index) => {
          return (
                <div className="newspaper">
                  <NavLink href={"https://smile.semenindonesia.com/" + anObjectMapped.filename}>
                  <img
                    className="image-news"
                    src={"https://smile.semenindonesia.com/" +anObjectMapped.cover}
                    alt=""
                  />
                  </NavLink>
                </div>
            );
            })}
          </Slider>
            {/* End Content  */}
          </div>
        </div>
    );
  }
}

export default Newspaperjurnal;
