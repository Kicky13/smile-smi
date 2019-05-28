import React from "react";
import { Form, Input, Button, NavLink } from "reactstrap";
import Http from "../../Http";

class CarouselGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      headline: [],
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    Http.get(
      process.env.REACT_APP_SMILE_API + "api/article/headline"
    )
      .then(res => {
        this.setState({
          headline: res.data.headline
        });
      })
      .catch(err => {
        const statusCode = err.response.status;
        console.log(err);
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

  getBackgroundStyle(value) {
    return { backgroundImage: "url(" + value.url + ")" };
  }

  // getUrl() {
  //   var urlink = window.location.href;
  //   alert(urlink);
  // }

  render() {
    const headline = this.state.headline;
    console.log(headline);

    return (
      <div>
        <div
          id="carousel-example-generic2"
          className="carousel slide carousel-fade carousel-fullscreen"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carousel-example-generic2"
              data-slide-to="0"
              className="active"
            />
            &nbsp;
            <li data-target="#carousel-example-generic2" data-slide-to="1" />
            &nbsp;
            <li data-target="#carousel-example-generic2" data-slide-to="2" />
          </ol>
          <div className="carousel-inner" role="listbox">
            {headline.map((anObjectMapped, index) => {
              const bgstyle = {
                backgroundImage:
                  "url(" +
                  "https://smile.semenindonesia.com/" +
                  anObjectMapped.img +
                  ")"
              };
              if (index === 0) {
                return (
                  <div
                    key={anObjectMapped.id}
                    className="carousel-item carousel-gallery active"
                    style={bgstyle}
                  >
                    <div className="overlay-gallery" />

                    <div className="carousel-caption" />
                  </div>
                );
              } else {
                return (
                  <div
                    key={anObjectMapped.id}
                    className="carousel-item carousel-gallery"
                    style={bgstyle}
                  >
                    <div className="overlay" />

                    <div className="carousel-caption" />
                  </div>
                );
              }
            })}
          </div>

          <a
            className="carousel-control-prev"
            href="#carousel-example-generic2"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carousel-example-generic2"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}
export default CarouselGallery;
