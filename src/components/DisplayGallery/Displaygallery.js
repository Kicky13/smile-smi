import React from "react";
import { Card, CardImg, CardText, CardBody, NavLink, Button } from "reactstrap";
import Http from "../../Http";
import Lightbox from 'react-image-lightbox';
import LazyLoad from "react-lazy-load";
import 'react-image-lightbox/style.css';

class DisplayGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      photoIndex: 0,
      album: []
    };
  }

  componentDidMount() {
    const id = this.props.id;
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    Http.get(process.env.REACT_APP_SMILE_API + "galery/getdetailalbum/" + id)
      .then(res => {
        this.setState({
          album: res.data.detilalbum
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
    // const images = [
    // '//placekitten.com/1500/500',
    // '//placekitten.com/4000/3000',
    // '//placekitten.com/800/1200',
    // '//placekitten.com/1500/1500',
    // ];

    const images = this.state.album.map((imgMapped, index) => {
      return (
        "https://smile.semenindonesia.com/repo/dev/"+ imgMapped.filename
      );
    });
    console.log(images)
    const { photoIndex, isOpen } = this.state;
    return (
      <div>
        <div>
          {isOpen && (
            <Lightbox
              wrapperClassName="classLightbox"
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % images.length,
                })
              }
            />
          )}
        </div>

        <div className="listFoto">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><NavLink href={process.env.REACT_APP_ROOT}>Home</NavLink></li>
              <li class="breadcrumb-item"><NavLink href={process.env.REACT_APP_ROOT + "gallery"}>Gallery</NavLink></li>
              <li class="breadcrumb-item active" aria-current="page">List Gallery</li>
            </ol>
          </nav>
          <h3><b>Foto</b></h3>
          <div className="">
            <div className="row">
              {/*  */}

              {album.map((anObjectMapped, index) => {
                return (
                  <div className="col-md-3">
                    <div className="gallery-box-display">
                      <Card>
                        <LazyLoad>
                        <CardImg
                          top
                          width="100%"
                          src={"https://smile.semenindonesia.com/repo/dev/"+ anObjectMapped.filename}
                          alt="Card image cap"
                          onClick={() => this.setState({ isOpen: true })}
                        />
                        </LazyLoad>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayGallery;
