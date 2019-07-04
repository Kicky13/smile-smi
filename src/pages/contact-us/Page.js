import React from "react";
import Tab3 from "../../components/Tab3/Tab3";
import * as actions from "../../store/actions";
import Navbar from "../../components/Navbars/Navbar";
import Footer from "../../components/Footer/FooterDash";
import ContactUs from "../../components/ContactUsForm/ContactUsForm";
import Http from "../../Http";
import LazyLoad from "react-lazy-load";
import ProgressiveImage from "react-progressive-image-loading";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      advertise: []
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    //advertise limit 1
    Http.get(process.env.REACT_APP_SMILE_API + "api/advertise/one")
      .then(res => {
        this.setState({
          advertise: res.data.advertise
        });
      })
      .catch(err => {
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

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(actions.authLogout());
  }

  render() {
    const advertise = this.state.advertise;
    console.log("advertise");
    console.log(advertise);

    return (
      <div>
        {
          <Navbar
            {...this.props}
          />
        }
        <div className="delimiter" />

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1 col-sm-1" />
            <div className="col-md-7 col-sm-7">
              <ContactUs {...this.props} />
            </div>

            <div className="col-md-4 col-sm-4">
            <br />
            <br />
            <br />
              <Tab3 />
              {/* <Videoarticle /> */}
              <div className="advertisment">
                {advertise.map((anObjectMapped, index) => {
                  return (
                    <LazyLoad>
                      <ProgressiveImage
                        preview={
                          "https://smile.semenindonesia.com/" +
                          anObjectMapped.gambar
                        }
                        src={
                          "https://smile.semenindonesia.com/" +
                          anObjectMapped.gambar
                        }
                        render={(src, style) => (
                          <img
                            decoding="async"
                            src={src}
                            alt=""
                            style={style}
                          />
                        )}
                      />
                    </LazyLoad>
                  );
                })}
              </div>
              {/* <Recentarticle /> */}
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-md-1" />
                <div className="col-md-11">
                  {/*  */}
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
        <p>&nbsp;</p>

        <Footer />
        <ScrollUpButton/>
      </div>
    );
  }
}

export default Page;
