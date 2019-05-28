import React from "react";
import Http from "../../Http";
import Moment from 'react-moment';
import { NavLink, Button } from "reactstrap";
//import Parser from "html-react-parser";
class Latestvideosmi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      videoUtama: [],
      videoSamping: []
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
    Http.get(process.env.REACT_APP_SMILE_API + "galery/getvideonew")
      .then(res => {
        this.setState({
          videoUtama: res.data.videoLimit1
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

      Http.get(process.env.REACT_APP_SMILE_API + "galery/getvideolimit3")
        .then(res => {
          this.setState({
            videoSamping: res.data.videoLimit3
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
    const videoUtama = this.state.videoUtama;
    const videoSamping = this.state.videoSamping;

    return (
      <div>
        <div className="latest-video">

        <div className="row">
            <div className="col-md-3">
            <h2>Latest Video</h2>
            </div>
            <div className="col-md-3">
            <NavLink href={process.env.REACT_APP_ROOT + "listvideo"}>
              <Button className="BtnSideWhat">
                View More &nbsp; <i className="fas fa-arrow-alt-circle-right" />
                <br />
              </Button>
            </NavLink>
            </div>
        </div>

          <div className="">
            <div className="row">
              <div className="col-md-6 col-sm-6">

              {videoUtama.map((anObjectMapped, index) => {
              return (

                <div className="big-video">
                  <div className="video-play-gallery">
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe
                        title="bonjovi"
                        className="embed-responsive-item"
                        src={anObjectMapped.link}
                        allowfullscreen
                      />
                      <div className="text-video-gallery">
                      <p>{anObjectMapped.judul}</p>
                      <i>&nbsp; <Moment format="D MMM YYYY">{anObjectMapped.posted_date}</Moment></i>
                      </div>
                    </div>
                  </div>
                </div>

                  );
                })}

              </div>
              <div className="col-md-6 col-sm-6">
                <div className="big-video">
                  <div className="row">
                    <div className="col-md-4 col-sm-4">

                    {videoSamping.map((anObjectMapped, index) => {
                    return (


                      <div className="video-play-gallery">
                        <div className="embed-responsive embed-responsive-16by9">
                          <iframe
                            title="bonjovi"
                            className="embed-responsive-item"
                            src={anObjectMapped.link}
                            allowfullscreen
                          />
                        </div>
                      </div>

                        );
                      })}
                      {/*  */}

                    </div>
                    <div className="col-md-8 col-sm-8">
                    {videoSamping.map((anObjectMapped, index) => {
                    return (

                      <div className="text-play-gallery">
                        <p>{anObjectMapped.judul}</p>
                        <p><i>&nbsp; <Moment format="D MMM YYYY">{anObjectMapped.create_date}</Moment></i></p>
                      </div>

                      );
                    })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Latestvideosmi;
