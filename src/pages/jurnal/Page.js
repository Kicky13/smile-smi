import React from "react";
// import { Form, Input } from "reactstrap";
import * as actions from "../../store/actions";
import Navbar from "../../components/Navbars/Navbar";
import Footer from "../../components/Footer/FooterDash";
import MDSpinner from "react-md-spinner";
import Bannerjurnal from "../../components/BannerJurnal/Bannerjurnal";
import Magazinejurnal from "../../components/MagazineJurnal/Magazinejurnal";
//import AdvertisJurnal from "../../components/AdvertisJurnal/Advertisjurnal";
import Newspaperjurnal from "../../components/Newspaperjurnal/Newspaperjurnal";
import Calendarjurnal from "../../components/Calendarjurnal/Calendarjurnal";
//import "../../asset/css/css-lates/dashboard.css";
//import logo from "../../logo.svg";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton"; //Add this line Here

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

            <div className="container">
              <div className="row">
                <div className="col-md-8 col-sm-8">
                  {/*  */}
                  <Bannerjurnal />
                  {/*  */}
                  <br />
                </div>
                <div className="col-md-4 col-sm-4">
                  {/*  */}
                  <br />
                  <br />
                  <Calendarjurnal />
                  {/*  */}
                  <br />
                  <Magazinejurnal />
                  {/*  */}
                </div>

                <div className="col-md-12 col-sm-12">
                  <Newspaperjurnal />
                </div>
              </div>
            </div>

            <Footer />
            <ScrollUpButton/>
          </>
        ) : null}
      </div>
    );
  }
}

export default Page;
