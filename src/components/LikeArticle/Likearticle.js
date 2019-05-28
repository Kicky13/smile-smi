// import { Tooltip, Button } from "reactstrap";
import React from "react";
import Slider from "react-slick";
import { Button, NavLink } from "reactstrap";
// import logoTwitter from "../../twitter.svg";
import Http from "../../Http";
//import LazyLoad from "react-lazy-load";
import Parser from "html-react-parser";
import ProgressiveImage from "react-progressive-image-loading";
import Moment from 'react-moment';
class LikeArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotarticle: []
    };
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;

    //hotarticle
    Http.get(
      process.env.REACT_APP_SMILE_API +"/api/article/hotarticle"
    )
      .then(res => {
        this.setState({
          hotarticle: res.data.hot
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
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
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

    const hotarticle = this.state.hotarticle;
    console.log("hot");
    console.log(hotarticle);

    return (
      <div>
        <div className="news-other">
          <p>You May Also Like</p>
          <Slider {...settings}>
            {hotarticle.map((anObjectMapped, index) => {
              return (
                <div>
                  <div className="box-news">

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
                            className="img-news"
                            decoding="async"
                            src={src}
                            alt=""
                            style={style}
                          />
                        )}
                      />

                    <div className="overlay-article-like to-top-like">
                      <p className="title-like">{anObjectMapped.title}</p>
                      <br />
                      <p className="date-like">
                      <Moment format="D MMM YYYY">{anObjectMapped.created_date}</Moment>
                      </p>
                      <br />
                      <span className="content-article-like">{Parser(anObjectMapped.content.substring(0, 100))}</span>
                      <br />
                      <NavLink
                        href={process.env.REACT_APP_ROOT + "/article/" + anObjectMapped.id}
                      >
                        <Button className="button-overlay" style={{marginLeft:80}}>
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

export default LikeArticle;
