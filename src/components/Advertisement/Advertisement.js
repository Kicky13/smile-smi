import React from "react";
import Http from "../../Http";
import Parser from "html-react-parser";

class Advertisement extends React.Component {

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
    //hotarticle
    // Http.get(
    //   "http://smile-dev-api.semenindonesia.com:3192/api/admin/advertise/ambilsemua"
    // )
    Http.get(process.env.REACT_APP_SMILE_API + "api/advertise/one")
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
    return (
      <div className="advertisment">
      <div className="col-lg12 col-md12 col-sm-12">
      {advertise.map((anObjectMapped, index) => {
        return (
        <img
          src={"https://smile.semenindonesia.com/" + anObjectMapped.gambar}
          alt=""
        />
          );
        })}
      </div>
      </div>
    );
  }
}

export default Advertisement;
