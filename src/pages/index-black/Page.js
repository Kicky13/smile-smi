import React from "react";
import * as actions from "../../store/actions";
import Navbar from "../../components/Navbars/Navbar";
import CarouselDashboard from "../../components/Carousel/CarouselDashboard";
import Footer from "../../components/Footer/FooterDash";
import SlideDua from "../../components/SlideDua/Slidedua";
import SlideTiga from "../../components/SlideTiga/Slidetiga";
import SlideEmpat from "../../components/SlideEmpat/Slideempat";
import SlideLima from "../../components/SlideLima/Slidelima";
import MDSpinner from "react-md-spinner";
import Tab3 from "../../components/Tab3/Tab3";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      loading: true,
      resultHRIS: []
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(actions.authLogout());
  }

  componentDidMount() {
    document.title = "SMILE - Home";
    this.timer = setInterval(
      () => this.setState(prevState => ({ loading: false })),
      2000
    );
  }

  render() {
    const styleloading = {
      marginTop: "350px"
    };

    const { isAuthenticated } = this.props;
    if (
      this.props.isAdmin === true &&
      isAuthenticated &&
      localStorage.getItem("jwt_token") != null
    ) {
      window.location = `http://10.15.5.151/dev/smile/smile-api/api/auth/loginopensesame/${localStorage.getItem(
        "jwt_token"
      )}`;
    }

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
            <CarouselDashboard />
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-8 col-sm-8">
                  {/* <Callpage /> */}
                  <SlideDua />
                </div>
                <div className="col-md-4 col-sm-4">
                  <Tab3 />
                </div>
              </div>
            </div>
            <SlideTiga />
            <SlideEmpat />
            <SlideLima />
            <Footer />
            <ScrollUpButton/>
          </>
        ) : null}
      </div>
    );
  }
}

export default Page;
