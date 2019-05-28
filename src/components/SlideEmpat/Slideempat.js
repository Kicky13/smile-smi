import React from "react";
import { NavLink } from "reactstrap";

class SlideEmpat extends React.Component {
  
  render() {
    return (
      <div>
        <div className="advertisment-box">
          <div className="">
                    <div className="box-image">
                    <div className="boxTitle">
                    <h2>Kami Hadir Memberikan Informasi Terkini</h2>
                    </div>
                    <div className="row">
                      <div className="col-md-3 col-sm-3"/>
                        <div className="office-box col-md-1 col-sm-1" align="center">
                            <div className="logo">
                                <NavLink
                                    href="https://id.linkedin.com/company/pt-semen-indonesia"
                                    className="linkedin"
                                    target="_blank">
                                    <i className="fa fa-linkedin" />
                                </NavLink>
                            </div>
                            <h5>PT Semen Indonesia</h5>
                        </div>
                        <div className="office-box col-md-1 col-sm-1" align="center">
                          <div className="logo">
                            <NavLink
                              href="https://twitter.com/semenku"
                              className="twitter"
                              target="_blank">
                              <i className="fa fa-twitter" />
                            </NavLink>
                          </div>
                          <h5>@semenku</h5>
                        </div>
                        <div className="office-box col-md-1 col-sm-1" align="center">
                          <div className="logo">
                              <NavLink
                                href="https://www.instagram.com/semenindonesia/"
                                className="instagram"
                                target="_blank"
                              >
                                <i className="fa fa-instagram" />
                              </NavLink>
                          </div>
                          <h5>@semenindonesia</h5>
                        </div>
                        <div className="office-box col-md-1 col-sm-1" align="center">
                          <div className="logo">
                          <NavLink
                            href="https://www.facebook.com/semenindonesiagroup/"
                            className="facebook"
                            target="_blank"
                          >
                            <i className="fa fa-facebook-square" />
                          </NavLink>
                          </div>
                          <h5>semen indonesia</h5>
                        </div>
                        <div className="office-box col-md-1 col-sm-1" align="center">
                          <div className="logo">
                          <NavLink
                            href="https://www.youtube.com/channel/UCD9IyaqdVujIqwc5pnPHtGQ"
                            className="youtube"
                            target="_blank"
                          >
                            <i className="fa fa-youtube-square" />
                          </NavLink>
                          </div>
                          <h5>semen indonesia</h5>
                        </div>
                        <div className="col-md-3 col-sm-3"/>
                    </div>
                    </div>
                  </div>

            </div>
          </div>
    );
  }
}
export default SlideEmpat;
