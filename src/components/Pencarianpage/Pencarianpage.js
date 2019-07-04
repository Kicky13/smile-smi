import React from "react";
import {NavLink, Button} from "reactstrap";
import Lazyload from "react-lazy-load";
import Http from "../../Http";
import Slider from "react-slick";
import Parser from "html-react-parser";
import Moment from "react-moment";

class Pencarianpage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            searchResult: [],
        };
        //this.handleLogout = this.handleLogout.bind(this);
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
        const styleCategory = {
            background: "#80d8b1",
            padding: "12px 16px 12px 16px",
            borderRadius: "6px",
        };
        const styleDate = {
            color: "black"
        };
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
                                    <NavLink style={styleCategory}>{anObjectMapped.category}</NavLink>
                                    <br/>
                                    {/* ------ */}
                                    {/* ------ */}
                                    <div className="article-judul">
                                        <h2>
                                            <NavLink href={process.env.REACT_APP_ROOT + 'article/' + anObjectMapped.id}>
                                            {anObjectMapped.title}
                                            </NavLink>
                                            <br/>
                                        </h2>
                                        <p style={styleDate}>
                                            <Moment format="D MMM YYYY">{anObjectMapped.posted_date}</Moment>
                                        </p>
                                    </div>

                                    <div className="notice">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="nama-notice-search">
                                                        <p>
                                                          <div className="Comment-search">
                                                            <i className="material-icons material-search">visibility</i>
                                                            &nbsp; {anObjectMapped.viewed} &nbsp;

                                                            <i class="material-icons material-search">comment</i>
                                                            &nbsp; {anObjectMapped.comment} &nbsp;

                                                            <i class="material-icons material-search">thumb_up</i>
                                                            &nbsp; {anObjectMapped.like} &nbsp;
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
                                            {Parser(anObjectMapped.content.substring(0, 250))}
                                        </p>
                                    </div>
                                    <div className="LineSpan" />
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
