import React from "react";
import Http from "../../Http";
import LazyLoad from "react-lazy-load";
import ProgressiveImage from "react-progressive-image-loading";
class Advertisjurnal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      advertise: []
    };
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;

    //advertise limit 3
    Http.get(process.env.REACT_APP_SMILE_API + "api/advertise/three")
      .then(res => {
        this.setState({
          advertise: res.data.advertise
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
    const advertise = this.state.advertise;
    console.log("advertise");
    console.log(advertise);
    return (
      <div>
        <div className="advertisment-jurnal">
          <div className="">
            <div className="row">

            {advertise.map((anObjectMapped, index) => {
              return (

              <div className="col-md-4 col-sm-4">
                <div className="adv">
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
export default Advertisjurnal;
