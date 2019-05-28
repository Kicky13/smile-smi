import React from "react";
import Http from "../../Http";

class videoArticle extends React.Component {

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

      Http.get(process.env.REACT_APP_SMILE_API + "galery/getvideolimit2")
        .then(res => {
          this.setState({
            videoSamping: res.data.videoLimit2
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
        <div className="video-article">
          <p>Latest Video</p>
          <div className="row">
          {videoUtama.map((anObjectMapped, index) => {
          return (
          <div className="col-md-12">
          <div className="video-play">
            <div class="embed-responsive embed-responsive-16by9">
              <iframe
                title="bonjovi"
                class="embed-responsive-item"
                src={anObjectMapped.link}
                allowfullscreen
              />
            </div>
          </div>
          </div>
          );
        })}
        </div>
          <div className="">
            <div className="row">

            {videoSamping.map((anObjectMapped, index) => {
            return (

              <div className="col-md-6">
                <div className="video-play-two">
                  <div class="embed-responsive embed-responsive-16by9">
                    <iframe
                      title="bonjovi"
                      class="embed-responsive-item"
                      src={anObjectMapped.link}
                      allowfullscreen
                    />
                  </div>
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

export default videoArticle;
