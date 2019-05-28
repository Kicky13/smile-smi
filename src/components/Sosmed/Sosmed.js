import { Tooltip, Button } from "reactstrap";
import React from "react";
// import ProgressiveImage from "react-progressive-image-loading";
// import { theDataTop5LatestNewsFeed } from "../../dummy/top5latestnewsfeed";
// import { theDataTop5LifeStyle } from "../../dummy/top5lifestyle";
// import LazyLoad from "react-lazy-load";
import logoTwitter from "../../twitter.svg";
class SosmedSMLIE extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <div>
        <div className="content-twitter">
          <div className="content-twitter-header">
            <img decoding="async" src={logoTwitter} alt="" />
            <h3>SEMEN INDONESIA</h3>
          </div>
          <div className="content">
            <div className="ex3">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing
              elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
              magna aliquam erat volutpat. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Lorem
              ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </div>
          </div>
          <div className="content-twitter-footer">
            <Button
              style={{ textDecoration: "underline", color: "blue" }}
              href="#"
              id="TooltipExample"
            >
              <i className="fa fa-twitter">Twitter</i>
            </Button>
            <Tooltip
              placement="right"
              isOpen={this.state.tooltipOpen}
              target="TooltipExample"
              toggle={this.toggle}
            >
              7.239 Followers{" "}
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}

export default SosmedSMLIE;
