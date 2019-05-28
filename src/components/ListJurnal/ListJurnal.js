// import { Tooltip, Button } from "reactstrap";
import React from "react";
import {Button, NavLink} from "reactstrap";
// import logoTwitter from "../../twitter.svg";
import Http from "../../Http";
// import Parser from "html-react-parser";
import Moment from 'react-moment';

class ListJurnal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            jurnal: []
        };
        //this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        Http.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${localStorage.getItem("jwt_token")}`;
        //latest article
        Http.get(
            process.env.REACT_APP_SMILE_API + "sinergi/getallsinergy"
        )
            .then(res => {
                this.setState({
                    jurnal: res.data.sinergyAll,
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
        const journal = this.state.jurnal;
        return (
            <div>
                {journal.map((anObjectMapped, index) => {
                    return (
                        <div className="col-md-3">
                            <div className="article-judul" key={anObjectMapped.id}>
                                <h3>
                                    {anObjectMapped.title}
                                </h3>
                            </div>
                            {/* ------ */}
                            <div className="notice">
                                <div className="">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="nama-notice">
                                                <p>
                                                    <Moment format="D MMM YYYY">{anObjectMapped.posted_date}</Moment>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="date-comment-view">
                                                <p>
                                                    <i class="material-icons">visibility</i>
                                                    {anObjectMapped.view}{" "}
                                                    &nbsp;
                                                    <i class="material-icons">comment</i>
                                                    &nbsp; 0 &nbsp;
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ------ */}
                            {/* ------ */}
                            <div className="image-box">
                                <NavLink href={"https://smile.semenindonesia.com/" + anObjectMapped.filename} target="_blank">
                                <img
                                    src={"https://smile.semenindonesia.com/" + anObjectMapped.cover}
                                    alt=""
                                />
                                </NavLink>
                            </div>
                            {/* ------ */}
                            {/* ------ */}
                            {/*<div className="description">*/}
                            {/*    <p>{Parser(anObjectMapped.content.substring(0, 300))}</p>*/}
                            {/*</div>*/}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default ListJurnal;
