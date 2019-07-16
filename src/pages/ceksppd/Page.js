import React from "react";
import * as actions from "../../store/actions";
import Navbar from "../../components/Navbars/Navbar";
import Footer from "../../components/Footer/FooterDash";
import MDSpinner from "react-md-spinner";
import SMIOfficeLink from "../../components/SMIOfficeLink/SMIOfficeLink";
import DisplayUser from "../../components/DisplayUser/Displayuser";
import DisplayCuti from "../../components/DisplayCuti/Displaycuti";
import DisplaySppd from "../../components/DisplaySppd/Displaysppd";
import DisplayHistory from "../../components/DisplayHistory/Displayhistory";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";

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

            <div />
            <div className="container-fluid">
              <div className="row">

                <div className="col-md-12 col-sm-12">
                  {/*  */}
                  <br />
                  <br />
                  <DisplayUser />
                  <br />
                  <br />
                  {/*  */}

                  {/*  */}
                </div>
                <div className="col-md-12 col-sm-12">
                <SMIOfficeLink />
                </div>
              </div>

              <div className="row">
                <div className="col-md-8 col-sm-8">
                <DisplayCuti />
                </div>
                <div className="col-md-4 col-sm-4">
                <DisplayHistory />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 col-sm-12">
                <DisplaySppd />
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
