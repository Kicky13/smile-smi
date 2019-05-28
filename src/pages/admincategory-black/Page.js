import React from "react";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import InputCategory from "../../components/Input/InputCategory";

// core components


//import PageHeader from '../../common/pageHeader'
//import Navigation from '../../common/navigation'

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",

      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };

  }


  // this function opens and closes the sidebar on small devices
  render() {
    //console.log(this.props.location.pathname);
    console.log(localStorage.getItem("jwt_token"));
    return (
      <>
      {
        <AdminNavbar
          {...this.props}
          // brandText="Dashboard"
          // toggleSidebar={this.toggleSidebar}
          // sidebarOpened={this.state.sidebarOpened}
        />
      }
      <InputCategory/>




      </>

    );
  }
}

export default Page;
