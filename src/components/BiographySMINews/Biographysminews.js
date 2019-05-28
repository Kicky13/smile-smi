import React from "react";
import LazyLoad from "react-lazy-load";
import Http from "../../Http";

class Biographysminews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      biography: []
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
    Http.get(process.env.REACT_APP_SMILE_API + "api/articlecategory/catdinamis/9/4")
      .then(res => {
        this.setState({
          biography: res.data.category
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

    const biography = this.state.biography;

    return (
      <div>
        <div className="Biography">
          <h2>Employee Story</h2>
          <div className="">
            <div className="row">
              {/*  */}
              {biography.map((anObjectMapped, index) => {
                return (
              <div className="col-md-3 col-sm-3">
                <div className="img-box-biography">
                <a href={"/dev/smile/article/" + anObjectMapped.id}>
                  <LazyLoad>
                    <img
                      src={"https://smile.semenindonesia.com/" +
                      anObjectMapped.img}
                      alt={anObjectMapped.title}
                    />
                  </LazyLoad>
                  </a>
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

export default Biographysminews;
