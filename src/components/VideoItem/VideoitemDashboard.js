import { NavLink } from "reactstrap";
import React from "react";
import logo from "../../logo.svg";
import ProgressiveImage from "react-progressive-image-loading";
import { theDataLatestArticele,} from "../../dummy/latestaritcle";
import { theDataTestimoni,} from "../../dummy/testimoni";
import LazyLoad from 'react-lazy-load';


class VideoitemDashboard extends React.Component {
  render() {
    return (
      <div>
        <div
          id="feature_video_item"
          className="feature_video_item section_wrapper"
        >
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="feature_video_wrapper">
                  <div className="feature_video_title">
                    <h2>Testimonial Videos</h2>
                  </div>

                  <div id="feature_video_slider" className="owl-carousel">

                    {theDataTestimoni.map((anObjectMapped, index) => {
                      return (
                    <div key={anObjectMapped.id} className="item">
                      <div className="video_thumb">
                      <LazyLoad>
                      <ProgressiveImage
                        preview={logo}
                        src={logo}
                        // eslint-disable-next-line
                        render={(src, style) => (
                          <img
                            decoding="async"
                            className="img-responsive"
                            src={src}
                            alt=""
                            style={style}
                          />
                        )}
                      />
                      </LazyLoad>
                      
                      </div>
                      <div className="video_info">
                        <div className="video_item_title">
                          <h3>
                            <NavLink href="#">
                              {anObjectMapped.title}
                            </NavLink>
                          </h3>
                        </div>
                        <div className="item_meta">
                          <NavLink href="#">{anObjectMapped.posting_date}</NavLink>
                        </div>
                      </div>
                    </div>

                  );
                })}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ------------------------------ */}
        <div
          className="feature_video_item section_wrapper"
        >
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="feature_video_wrapper">
                  <div className="feature_video_title">
                    <h2>Latest Videos</h2>
                  </div>

                  <div  className="owl-carousel">

                    {theDataLatestArticele.map((anObjectMapped, index) => {
                      return (
                    <div key={anObjectMapped.id} className="item">
                      <div className="video_thumb">
                      <LazyLoad>
                      <ProgressiveImage
                        preview={anObjectMapped.img}
                        src={anObjectMapped.img}
                        // eslint-disable-next-line
                        render={(src, style) => (
                          <img
                            decoding="async"
                            className="img-responsive"
                            src={src}
                            alt=""
                            style={style}
                          />
                        )}
                      />
                      
                      </LazyLoad>
                      </div>
                      <div className="video_info">
                        <div className="video_item_title">
                          <h3>
                            <NavLink href="#">
                              {anObjectMapped.title}
                            </NavLink>
                          </h3>
                        </div>
                        <div className="item_meta">
                          <NavLink href="#">{anObjectMapped.tanggal}</NavLink>
                        </div>
                      </div>
                    </div>

                  );
                })}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoitemDashboard;
