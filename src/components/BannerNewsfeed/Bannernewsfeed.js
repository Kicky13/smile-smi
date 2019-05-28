// import { Tooltip, Button } from "reactstrap";
import React from "react";
import { NavLink } from "reactstrap";
// import logoTwitter from "../../twitter.svg";
import Http from "../../Http";
import Parser from 'html-react-parser';

class Bannernewsfeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newsfeed: [],
      //comments: [],
    };
    //this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    //latest article
    Http.get(process.env.REACT_APP_SMILE_API + "api/newsfeed/detail/" + id)
      .then(res => {
        this.setState({
          newsfeed: res.data.newsfeed,
          //comments: res.data.comments
        });
      })
      .catch(err => {
        console.log(err);
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
    const newsfeed = this.state.newsfeed;
    console.log(newsfeed);
    return (
      <div>
        {newsfeed.map((anObjectMapped, index) => {
          return (
            <>
              <div className="article-judul" key={anObjectMapped.id}>
                <h1>
                  {anObjectMapped.title} &nbsp;
              <NavLink>SMI News</NavLink>
                </h1>
              </div>
              {/* ------ */}
              <div className="notice">
                <div className="">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="nama-notice">
                        <p>
                          Anak Agung Angga Wijaya &nbsp;&nbsp;&nbsp;12 Januari 2018 :
                          13:57:00
                    </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="date-comment-view">
                        <p>
                          <i class="material-icons">favorite</i>
                          &nbsp; 40 &nbsp;&nbsp;&nbsp;&nbsp;
                      <i class="material-icons">visibility</i>
                          &nbsp; 50 &nbsp;&nbsp;&nbsp;&nbsp;
                      <i class="material-icons">comment</i>
                          &nbsp; 20 &nbsp;
                    </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ------ */}
              {/* ------ */}
              <div className="image-box">
                <img
                  src={"https://smile.semenindonesia.com/"+anObjectMapped.img}
                  alt=""
                />
              </div>
              {/* ------ */}
              {/* ------ */}
              <div className="description">
                {Parser(anObjectMapped.content)}

                <br />
                <div className="desc-tag">
                  <NavLink>Semen Padang</NavLink>
                  &nbsp;
              <NavLink>Semen Padang</NavLink>
                  &nbsp;
              <NavLink>Semen Padang</NavLink>
                </div>
              </div>
            </>
          );
        })}

      </div>
    );
  }
}

export default Bannernewsfeed;
