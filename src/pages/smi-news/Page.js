import React from "react";
// import { Form, Input } from "reactstrap";
import * as actions from "../../store/actions";
import Navbar from "../../components/Navbars/Navbar";
import Footer from "../../components/Footer/FooterDash";
import MDSpinner from "react-md-spinner";
import SlideDua from "../../components/SlideDua/Slidedua";
import SlideLima from "../../components/SlideLimaFlat/SlideLimaFlat";
import Latesvideosmi from "../../components/LatestvideoSMI/Latestvideosmi";
import Tab3 from "../../components/Tab3/Tab3";
import Gallery from "../../components/GallerySMIActivity/Gallerysmiactivity";
import Biographysminews from "../../components/BiographySMINews/Biographysminews";
import Koransminews from "../../components/KoranSMINews/Koransminews";
import Ceritaunitkerja from "../../components/Ceritaunitkerja/Ceritaunitkerja";
import Articlesminews from "../../components/ArticleSMINews/Articlesminews";
import Advertisement from "../../components/Advertisement/Advertisement";
//import "../../asset/css/css-lates/dashboard.css";
//import logo from "../../logo.svg";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button"; //Add this line Here

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
            <div className="delimiter" />

            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  {/*  */}
                  <br />
                  <br />
                  <Articlesminews />
                  {/*  */}
                </div>
                {/*  */}
                <div className="col-md-8 col-sm-8">
                  <SlideDua />
                  <SlideLima />
                  <Biographysminews />
                  <Gallery />
                </div>
                {/*  */}
                <div className="col-md4 col-sm-4">
                  <Tab3 />
                  {/*  */}
                  <br />
                  <Advertisement />
                  {/*  */}

                  <Koransminews />

                  {/*  */}
                  <Ceritaunitkerja />
                  {/*  */}
                </div>
                {/*  */}
              </div>
              <div className="col-md-12 col-sm-12">
                <Latesvideosmi />
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
