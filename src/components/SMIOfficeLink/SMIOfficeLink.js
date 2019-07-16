import React from "react";
import Slider from "react-slick";
import { NavLink } from "reactstrap";

class SMIOfficeLink extends React.Component {
    constructor() {
        super();
        
        this.state = {
            isOpen: false,
        }
    }; 

    render() {
       
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <div>
                
                {/*Modal Email*/}
                <div className="modal" id="EmailModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Form Email</h4>
                            </div>

                            <div className="modal-body">
                                <form action="/action_page.php">
                                    <div className="form-group">
                                        <label htmlFor="email">Email address:</label>
                                        <input type="email" className="form-control" id="email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd">Password:</label>
                                        <input type="password" className="form-control" id="pwd"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

                {/*Modal Buku*/}
                <div className="modal" id="BukuModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Form Buku Telepon</h4>
                            </div>

                            <div className="modal-body">
                                <form action="/action_page.php">
                                    <div className="form-group">
                                        <label htmlFor="email">Email address:</label>
                                        <input type="email" className="form-control" id="email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd">Password:</label>
                                        <input type="password" className="form-control" id="pwd"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

                {/*Modal NDO*/}
                <div className="modal" id="NDOModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Form NDO</h4>
                            </div>

                            <div className="modal-body">
                                <form action="/action_page.php">
                                    <div class="form-group">
                                        <label for="email">Email address:</label>
                                        <input type="email" class="form-control" id="txtemail"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="pwd">Password:</label>
                                        <input type="password" class="form-control" id="txtpassword"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="slidetiga">
                    <div className="container-fluid">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="row">
                                <div className="content-smi-office">
                                    <div className="container">
                                        <center>
                                            <div>
                                                <Slider {...settings}>
                                                    <div className="office-box">
                                                        <NavLink href={"http://webmail1.semenindonesia.com/"}
                                                                 target="_blank">
                                                            <div className="logo-box">
                                                                <i className="material-icons">email</i>
                                                            </div>
                                                            <h3>Email</h3>
                                                        </NavLink>
                                                    </div>
                                                    <div className="office-box">
                                                        <NavLink
                                                            href={process.env.REACT_APP_ROOT + "bukutelepon"}>
                                                            <div className="logo-box">
                                                                <i className="material-icons">library_books</i>
                                                            </div>
                                                            <h3>Buku Telepon</h3>
                                                        </NavLink>
                                                    </div>
                                                    <div className="office-box">
                                                        <NavLink href={"http://ndo.semenindonesia.com"}
                                                        target="_blank">
                                                            <div className="logo-box">
                                                                <i className="material-icons">headset_mic</i>
                                                            </div>
                                                            <h3>NDO</h3>
                                                        </NavLink>
                                                    </div>
                                                </Slider>
                                            </div>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Content Menu */}
                    </div>
                </div>
            </div>
        );
    }
}

export default SMIOfficeLink;
