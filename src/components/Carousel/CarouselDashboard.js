import React from "react";
import { Form, Input, NavLink } from "reactstrap";
import Http from "../../Http";
import { Redirect } from "react-router-dom";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      headline: [],
      searchBox: '',
      searching: false,
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({searchBox: event.target.value});
  }

  handleSearch() {
    if (this.state.searchBox != '' || this.state.searchBox != null) {
      this.setState({searching: true});
    }
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

    if (this.state.searching) {
      return <Redirect to={'/search/' + this.state.searchBox} />
    }

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
                    className="carousel-item active"
                    style={bgstyle}
                  >
                    <div className="overlay" />

                    <div className="carousel-caption">
                      <h1 className="display-2 font-weight-bold">
                        <a href={process.env.REACT_APP_ROOT + "article/" + anObjectMapped.id}>
                          {anObjectMapped.title}
                        </a>
                      </h1>
                      <p className="h4 font-weight-light">
                        Information Media of Semen Indonesia Group
                      </p>
                      <NavLink href={process.env.REACT_APP_ROOT + "article/" + anObjectMapped.id} />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={anObjectMapped.id}
                    className="carousel-item "
                    style={bgstyle}
                  >
                    <div className="overlay" />

                    <div className="carousel-caption">
                      <h1 className="display-2 font-weight-bold">
                        <a href={process.env.REACT_APP_ROOT + "article/" + anObjectMapped.id}>
                          {anObjectMapped.title}
                        </a>
                      </h1>
                      <p className="h4 font-weight-light">
                        Information Media of Semen Indonesia
                      </p>
                      <NavLink href={process.env.REACT_APP_ROOT + "article/" + anObjectMapped.id} />
                    </div>
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
        <div className="container py-5">
          <div className="row">
            <div className="col-md-12" />
          </div>
        </div>
      </div>
    );
  }
}
export default Carousel;
