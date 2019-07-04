import React from "react";
import {Button, NavLink} from "reactstrap";
import Http from "../../Http";
import Moment from 'react-moment';

class ListJurnal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            newspaper: [],
            formData: {
                id: this.props.idkoran,
                start: "4",
                length: "5"
            }
        };
    }

    componentDidMount() {
        const {formData} = this.state;
        if(formData["id"] == 'All') {
            this.newspaperGetAll();
        } else {
            this.newspaperGetPerPublisher();
        }
    }

    newspaperGetAll() {
        Http.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("jwt_token")}`;
        Http.get(process.env.REACT_APP_SMILE_API + "newspaper/getlatestnewspaper")
         .then(res => {
             this.setState({
                 newspaper: res.data.newspaper
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

    newspaperGetPerPublisher() {
        const { formData } = this.state;
        Http.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("jwt_token")}`;
        Http.post(process.env.REACT_APP_SMILE_API + "api/Newspaper/newspaperbypenerbit", formData)
         .then(res => {
            this.setState({
                newspaper: res.data.newspaper
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
        const { newspaper } = this.state;
        return (
            <div>

            <div className="gallery" style={{marginTop:20}}>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><NavLink href={process.env.REACT_APP_ROOT}>Home</NavLink></li>
                <li class="breadcrumb-item"><NavLink href={process.env.REACT_APP_ROOT + "sminews"}>SMI News</NavLink></li>
                <li class="breadcrumb-item active" aria-current="page">Newspaper</li>
              </ol>
            </nav>
              <h4><b>NEWSPAPER</b></h4>
              <div className="lineBawahNews" />
              <div className="">
              <div className="row">
                {newspaper.map((anObjectMapped, index) => {
                    return (
                        <div className="col-md-3">
                            {/* ------ */}
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
                            <div className="article-judul" key={anObjectMapped.id}>
                                <b>{anObjectMapped.name}</b>
                                <br />
                                <b>{anObjectMapped.title}</b>
                            </div>
                            {/*<div className="description">*/}
                            {/*    <p>{Parser(anObjectMapped.content.substring(0, 300))}</p>*/}
                            {/*</div>*/}
                            <div className="notice">
                                        <div className="col-md-12">
                                            <div className="nama-notice-jurnalmore">
                                                <p>
                                                    <h6><Moment format="D MMM YYYY">{anObjectMapped.posted_date}</Moment></h6>
                                                </p>
                                            </div>
                                        </div>
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

export default ListJurnal;
