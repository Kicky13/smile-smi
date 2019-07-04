import React from "react";
import { NavLink } from "reactstrap";
import logoSmile from "../../logoSmileWhite.png";
import logoGroup from "../../smig.png";
import LazyLoad from "react-lazy-load";
import ProgressiveImage from "react-progressive-image-loading";
class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer id="footer">
          <div className="footer-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4 col-md-4 footer-info">
                  <LazyLoad>
                    <ProgressiveImage
                      preview={logoSmile}
                      src={logoSmile}
                      // eslint-disable-next-line
                      render={(src, style) => (
                        <img
                          decoding="async"
                          className="img-smile"
                          src={logoSmile}
                          alt=""
                          style={style}
                          key="asdsadasa"
                        />
                      )}
                    />
                  </LazyLoad>
                  <br />
                  <br />
                </div>

                <div className="col-lg-2 col-md-2 footer-links">
                  <h4>SMI Group</h4>
                  <ul>
                    <li>
                      <NavLink href="http://www.semenpadang.co.id/" target="_blank">Semen Padang</NavLink>
                    </li>
                    <li>
                      <NavLink href="http://www.sementonasa.co.id/" target="_blank">Semen Tonasa</NavLink>
                    </li>
                    <li>
                      <NavLink href="http://thanglongcement.com.vn/en/" target="_blank">Semen Thanglong</NavLink>
                    </li>
                    <li>
                      <NavLink href="http://www.semengresik.com/" target="_blank">Semen Gresik</NavLink>
                    </li>
                    <li>
                      <NavLink href="https://semenindonesia.com/" target="_blank">Solusi Bangun Indonesia</NavLink>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-2 col-md-2 footer-links">
                <h4>SMI Office</h4>
                <ul>
                  <li>
                    <NavLink href="http://coe.semenindonesia.com/" target="_blank">Center of Engineering</NavLink>
                  </li>
                  <li>
                    <NavLink href="http://dms.semenindonesia.com/" target="_blank">DMS SMSI</NavLink>
                  </li>
                  <li>
                    <NavLink href="https://km.semenindonesia.com/index.php?r=site/login" target="_blank">KM Share</NavLink>
                  </li>
                  <li>
                    <NavLink href="http://library.semenindonesia.com/" target="_blank">Pustaka Online</NavLink>
                  </li>
                  <li>
                    <NavLink href="http://hukum.semenindonesia.com/sgg/hmr/" target="_blank">Hukum Online</NavLink>
                  </li>
                  <li>
                    <NavLink href="https://webmail.semenindonesia.com/" target="_blank">Email Exchange</NavLink>
                  </li>
                  <li>
                    <NavLink href="https://webmail1.semenindonesia.com/" target="_blank">Email Zimbra</NavLink>
                  </li>
                </ul>
                </div>

                <div className="col-lg-2 col-md-2 footer-links">
                  <h4>ERP dan Turunan</h4>
                  <ul>
                    <li>
                      <NavLink href="http://app.semenindonesia.com/sgg/sd/shipment/index.sggrp.php" target="_blank">Shipment</NavLink>
                    </li>
                    <li>
                      <NavLink href="http://app.semenindonesia.com/sgg/hris/" target="_blank">HRIS</NavLink>
                    </li>
                    <li>
                      <NavLink href="http://int-eprocurement.semenindonesia.com/eproc/Login" target="_blank">Procurement</NavLink>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-2 col-md-2 footer-links">
                  <h4>Service Desk</h4>
                  <ul>
                    <li>
                      <NavLink href="http://servicedesk.semenindonesia.com/">Service Desk ICT</NavLink>
                    </li>
                    <li>
                      <NavLink href="http://servicedesk.semenindonesia.com/">Service Desk SCM</NavLink>
                    </li>
                    <li>
                    &nbsp;
                    </li>
                  </ul>
                  <h4></h4>
                  <ul>
                  <NavLink href="#"></NavLink>
                  </ul>
                </div>
                {/*  */}

              </div>
            </div>
          </div>

        <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <div className="copyright-text" />
          </div>
        <div className="col-md-4">
        <div className="copyright-text">
        <LazyLoad>
          <ProgressiveImage
            preview={logoSmile}
            src={logoSmile}
            // eslint-disable-next-line
            render={(src, style) => (
              <img
                decoding="async"
                className="img-group"
                src={logoGroup}
                alt=""
                style={style}
                key="asdsadasa"
              />
            )}
          />
        </LazyLoad>
        </div>
        </div>
        <div className="col-md-4">
          <div className="copyright-text" />
        </div>
        </div>
        </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="copyright-text">
                  &copy; Copyright <strong>SMILE 2019</strong>. All Rights
                  Reserved
                </div>
              </div>
            </div>

            {/* <div className="credits">
              Designed by{" "}
              <a href="https://bootstrapmade.com/">M. Iqbal Aulia Rafi</a>
            </div> */}
          </div>
        </footer>
      </div>
    );
  }
}
export default Footer;
