import React from "react";
// import { Form, Input } from "reactstrap";
import * as actions from "../../store/actions";
import Navbar from "../../components/Navbars/Navbar";
import Footer from "../../components/Footer/FooterDash";
import MDSpinner from "react-md-spinner";
import Latestvideosmi from "../../components/LatestvideoSMI/Latestvideosmi";
import Gallerysmigallery from "../../components/Gallerysmigallery/Gallerysmigallery";
import Advertisment from "../../components/AdvertisJurnal/Advertisjurnal";
//import "../../asset/css/css-lates/dashboard.css";
//import logo from "../../logo.svg";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button"; //Add this line Here
import SosmedGallery from "../../components/SosmedGallery/Sosmedgallery";
import CarouselGallery from "../../components/CarouselGallery/Caraouselgallery";
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      loading: true
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(actions.authLogout());
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.setState(prevState => ({ loading: false })),
      2000
    );
  }

  render() {
    //console.log(this.props);
    const styleloading = {
      marginTop: "350px"
    };

    return (
      <div>
        {this.state.loading ? (
          <div
            style={styleloading}
            className="d-flex justify-content-center align-items-center container "
          >
            <div className="ml-auto mr-auto col-md-6 col-lg-4">
              <center>
                <MDSpinner />
              </center>
            </div>
          </div>
        ) : null}

        {this.state.loading !== true ? (
          <>
            {
              <Navbar
                {...this.props}
                // brandText="Dashboard"
                // toggleSidebar={this.toggleSidebar}
                // sidebarOpened={this.state.sidebarOpened}
              />
            }
            <CarouselGallery />

            <div />
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-8 col-sm-8">
                  {/*  */}
                  <Gallerysmigallery />
                  {/*  */}

                  {/*  */}
                </div>

                <div className="col-md-4 col-sm-4">
                  <SosmedGallery />
                </div>

                <div className="col-md-12 col-sm-12">
                  {/*  */}
                  <Latestvideosmi />
                  {/*  */}
                </div>
              </div>
            </div>

            <Footer />
            <ScrollUpButton
              ContainerClassName="ScrollUpButton__Container"
              TransitionClassName="ScrollUpButton__Toggled"
              StopPosition={0}
              distance={100}
              breakpoint={768}
              EasingType="easeOutCubic"
              AnimationDuration={2000}
              style={{}}
              ToggledStyle={{}}
            />
          </>
        ) : null}
      </div>
    );
  }
}

export default Page;
