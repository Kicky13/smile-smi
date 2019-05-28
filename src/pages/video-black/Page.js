import React from "react";
// import { Form, Input } from "reactstrap";
import * as actions from "../../store/actions";
import HeaderDashboard from "../../components/Navbars/HeaderDashboard";
import FooterDashboard from "../../components/Footer/FooterDashboard";
import Video from "../../components/Gallery/Video";

import MDSpinner from "react-md-spinner";

// import Input from "../../components/Input/Input";
// import Carousel from "../../components/Carousel/Carousel";
// import "../../asset/css/dashboard.css";
// import logo from "../../logo.svg";

class Page extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      loading:true
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    document.title = "SMILE - Video";
    this._isMounted = true;
    this.timer = setInterval(
      () => this.setState(prevState => ({ loading: false })),
      4000,
    );

  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(actions.authLogout());
  }

  render() {
    console.log(this.props);

    const styleloading = {
      marginTop:"350px"
    }
    return (
      <div>
        {this.state.loading ?
            <div style={styleloading} className="d-flex justify-content-center align-items-center container ">
            <div className="ml-auto mr-auto col-md-6 col-lg-4">
              <center><MDSpinner /></center>
            </div>
        </div> : null}

        {this.state.loading !== true  ?
            <>
            {/* <AdminNavbar
          {...this.props}
          brandText="Dashboard"
          toggleSidebar={this.toggleSidebar}
          sidebarOpened={this.state.sidebarOpened}
        /> */}
            {this.props.match.params.id}
            <HeaderDashboard {...this.props} />
            <Video />
            <FooterDashboard />
            </>
          : null}

      </div>
    );
  }
}

export default Page;
