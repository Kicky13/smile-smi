import React from "react";
import {NavLink, Button} from "reactstrap";
import Lazyload from "react-lazy-load";
import Http from "../../Http";
import Slider from "react-slick";
import Parser from "html-react-parser";

class Pencarianpage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            searchResult: [],
        };
        //this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {
        this.setState({
            searchResult: []
        });
    }

    componentDidMount() {
        var findWord = this.props.findWord;
        Http.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${localStorage.getItem("jwt_token")}`;
        Http.get(process.env.REACT_APP_SMILE_API + 'api/article/search/' + findWord)
        .then(res => {
          this.setState({
            searchResult: res.data.search_result.article
          });
        })
        .catch(err => {
          const statusCode = err.response.status;
            console.log(err);
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
        //Searching Article By Title Or Content
        // Http.get(process.env.REACT_APP_SMILE_API + '')
        //advertise limit 1

    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 2,
            vertical: true,
            swipeToSlide: true,
            verticalSwiping: true,
            beforeChange: function (currentSlide, nextSlide) {
                console.log("before change", currentSlide, nextSlide);
            },
            afterChange: function (currentSlide) {
                console.log("after change", currentSlide);
            }
        };

        return (
            <div className="news-header">
                <div className="">
                    <div className="row">
                        <div className="col-md-1"/>
                        <div className="col-md-10">

                            {/* <Slider {...settings}> */}
                            {this.state.searchResult.map((anObjectMapped, index) => {
                                return (
                                    <div>
                                    <div className="image-box">
                                    <Lazyload>
                                        <img
                                            src={"https://smile.semenindonesia.com/" + anObjectMapped.img}
                                            alt={anObjectMapped.title}
                                        />
                                    </Lazyload>
                                    </div>
                                    <br/>
                                    <Button className="BtnKategori" color="info">{anObjectMapped.category}</Button>
                                    <br/>
                                    {/* ------ */}
                                    {/* ------ */}
                                    <div className="article-judul">
                                        <h2>
                                            {anObjectMapped.title}
                                            <br/>
                                        </h2>
                                    </div>

                                    <div className="notice">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="nama-notice-search">
                                                        <p>
                                                          <div className="Comment-search">
                                                            <i
                                                              className="fa fa-eye fa-lg"
                                                              aria-hidden="true"
                                                            />{" "}
                                                            &nbsp; {anObjectMapped.viewed}
                                                            &nbsp;&nbsp;&nbsp;&nbsp;

                                                            <i class="material-icons material-search">comment</i>
                                                            &nbsp; {anObjectMapped.comment} &nbsp;
                                                            </div>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ------ */}
                                    {/* ------ */}
                                    <div className="description">
                                        <p>
                                            {Parser(anObjectMapped.content.substring(0, 150))}
                                        </p>
                                    </div>
                                    <NavLink href={process.env.REACT_APP_ROOT + 'article/' + anObjectMapped.id}>
                                        <Button className="BtnSide-Search">
                                            View More &nbsp; <i className="fas fa-arrow-alt-circle-right"/>
                                        </Button>
                                    </NavLink>
                                </div>
                                );
                            })}
                            {/* </Slider> */}
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default Pencarianpage;
