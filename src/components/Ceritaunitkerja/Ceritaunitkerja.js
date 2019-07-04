import React from "react";
import Http from "../../Http";
import Moment from 'react-moment';

class Ceritaunitkerja extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      ceritaUnit: []
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
    Http.get(process.env.REACT_APP_SMILE_API + "api/admin/newsfeed/ceritaUnit")
      .then(res => {
        this.setState({
          ceritaUnit: res.data.ceritaUnit
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

    const ceritaUnit = this.state.ceritaUnit;

    return (
      <div>
        <div className="cerita-unit-kerja">
          <h2>Cerita Unit Kerja</h2>
          <div className="box-unit">
            <div className="">

            {ceritaUnit.map((anObjectMapped, index) => {
            return (

              <div className="row">
                {/*  */}

                <div className="col-md-4">
                  <div className="box-image">
                    <img
                      src={"https://smile.semenindonesia.com/" +anObjectMapped.img}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-8">
                <div className="title-news cerita-news">
                  <h4>
                    {" "}
                    <a href={"/dev/smile/newsfeed/" + anObjectMapped.id}>
                      {anObjectMapped.title}
                    </a>
                  </h4>
                </div>
                <div className="title-footer">
                <div className="date date-news">
                <div className="comment-eye ">
                  <p>
                    <i className="material-icons">calendar_today</i>
                    <i>&nbsp; <Moment format="D MMM YYYY">{anObjectMapped.posted_date}</Moment></i>
                  </p>
                </div>
                </div>
                  <div className="comment-eye ">
                    <p>
                      {" "}
                      <i
                        className="fa fa-eye"
                        aria-hidden="true"
                      />{" "}
                      &nbsp; {anObjectMapped.viewed}
                    </p>
                    &nbsp;
                    <p>
                      {" "}
                      <i className="material-icons">comment</i>
                      &nbsp; {anObjectMapped.comment}
                    </p>
                    &nbsp;
                    <p>
                      {" "}
                      <i className="material-icons">thumb_up</i>
                      &nbsp; {anObjectMapped.like}
                    </p>
                  </div>

                </div>
              </div>
            </div>
                  );
                })}
                {/* */}
                {/*  */}

                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Ceritaunitkerja;
