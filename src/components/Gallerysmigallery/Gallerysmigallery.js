import React from "react";
import { Card, CardImg, CardText, CardBody, NavLink, Button } from "reactstrap";
import Http from "../../Http";
import Parser from "html-react-parser";
class Gallerysmigallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      album: []
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
    Http.get(process.env.REACT_APP_SMILE_API + "galery/getalbum")
      .then(res => {
        this.setState({
          album: res.data.album
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
    const album = this.state.album;
    return (
      <div>
        <div className="gallery">
          <h2>Album</h2>
          <div className="">
            <div className="row">
              {/*  */}

              {album.map((anObjectMapped, index) => {
                return (
                  <div className="col-md-4">
                    <div className="gallery-box">
                      <Card>
                        <CardImg
                          top
                          width="100%"
                          src={"https://smile.semenindonesia.com/repo/dev/"+ anObjectMapped.thumbnail}
                          alt="Card image cap"
                        />
                        <CardBody className="card-body">
                          <div className="title-card">
                            <NavLink href={process.env.REACT_APP_ROOT + "listgallery/" + anObjectMapped.id}>
                              <h4>{anObjectMapped.title}</h4>
                            </NavLink>
                          </div>
                          <div className="magazine-love">
                            <p>
                              <i class="material-icons">visibility</i>
                              &nbsp; {anObjectMapped.view}{" "}
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <i class="material-icons">archive</i>
                              &nbsp; 0 &nbsp;&nbsp;&nbsp;&nbsp;
                              <i class="material-icons">comment</i>
                              &nbsp; 0 &nbsp;
                            </p>
                          </div>
                          <CardText className="text">
                            {Parser(
                              anObjectMapped.description.substring(0, 100)
                            )}
                          </CardText>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Gallerysmigallery;
