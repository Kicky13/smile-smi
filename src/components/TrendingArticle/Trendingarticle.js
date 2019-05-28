// import { Tooltip, Button } from "reactstrap";
import React from "react";
import { Button, NavLink } from "reactstrap";
import Slider from "react-slick";
import LazyLoad from "react-lazy-load";
import ProgressiveImage from "react-progressive-image-loading";
import Http from "../../Http";
import Parser from "html-react-parser";
import Moment from 'react-moment';


class Trendingarticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trending: []
    };
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;

    //trending
    Http.get(
      process.env.REACT_APP_SMILE_API + "api/article/trending"
    )
      .then(res => {
        this.setState({
          trending: res.data.hot
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
    console.log(this.props);

    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
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

    const trending = this.state.trending;
    console.log("trending");
    console.log(trending);

    return (
      <div>
        <div className="trending-now">
          <p>Trending Now</p>
          <Slider {...settings}>
            {trending.map((anObjectMapped, index) => {
              return (
                <div>
                  <div className="box-trending ">
                    <LazyLoad>
                      <ProgressiveImage
                        preview={
                          "https://smile.semenindonesia.com/" +
                          anObjectMapped.img
                        }
                        src={
                          "https://smile.semenindonesia.com/" +
                          anObjectMapped.img
                        }
                        render={(src, style) => (
                          <img
                            className="img-trending"
                            decoding="async"
                            src={src}
                            alt=""
                            style={style}
                          />
                        )}
                      />
                    </LazyLoad>
                    <div className="overlay-article to-top">
                      <p className="title-article"><h4>{anObjectMapped.title}</h4></p>
                      <br />
                      <p className="date-article">
                        <Moment format="D MMM YYYY">{anObjectMapped.posted_date}</Moment>
                      </p>
                      <span className="content-article">{Parser(anObjectMapped.content.substring(0, 150))}</span>
                      <br />
                      <NavLink
                        href={process.env.REACT_APP_ROOT + "article/" + anObjectMapped.id}
                      >
                        <Button className="button-overlay" style={{marginLeft:150}}>
                          <h5>View more &nbsp;</h5>
                        </Button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
}

export default Trendingarticle;
