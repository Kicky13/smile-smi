import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";

class SosmedGallery extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const csr = this.state.csr;
    console.log("twitter");
    console.log(csr);
    const bisnis = this.state.bisnis;
    console.log("instagram");
    console.log(bisnis);

    return (
      <div>
        <div className="box-sosmed">
          <h2>Social Media</h2>
          <div className="sosmed">
            <Nav tabs className="menu-tabs">
              <NavItem className="nav-item">
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Twitter
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Instagram
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <div>
                      <div className="video-play-gallery">
                        <iframe
                          className="frame"
                          src="https://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2Fsemenku%2Fstatus%2F1105746425780985856"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <div>
                      <div className="video-play-gallery">
                        <iframe
                          className="frame"
                          src="https://www.instagram.com/p/Btzun4ngVHD/embed"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    );
  }
}

export default SosmedGallery;
