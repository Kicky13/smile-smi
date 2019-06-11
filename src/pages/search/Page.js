import React from "react";
import * as actions from "../../store/actions";
import Navbar from "../../components/Navbars/Navbar";
import Footer from "../../components/Footer/FooterDash";
import MDSpinner from "react-md-spinner";
import Tab3 from "../../components/Tab3/Tab3";
import Recentarticle from "../../components/RecentCArticle/Recentcarticle";
import Advertisement from "../../components/Advertisement/Advertisement";
import Pencarianpage from "../../components/Pencarianpage/Pencarianpage";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button"; //Add this line Here

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      loading: true,
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
    const searchResult = this.props.match.params.findWord;

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
                findWord={searchResult}
                // brandText="Dashboard"
                // toggleSidebar={this.toggleSidebar}
                // sidebarOpened={this.state.sidebarOpened}
              />
            }
            <div className="delimiter" />

            <div className="container-fluid">
              <div className="row">
                {/*  */}
                <div className="col-md-8 col-sm-8">
                <h1><b>Hasil pencarian : {searchResult}</b></h1>
                  <Pencarianpage findWord={searchResult} />
                </div>

                {/*  */}
                <div style={{marginTop: 30}} className="col-md4 col-sm-4">
                <br />
                <br />
                  <Tab3 />
                  {/*  */}
                  <br />
                  <Advertisement />
                  {/*  */}
                  <br />
                  <Recentarticle />

                  {/*  */}
                </div>
                {/*  */}
              </div>
            </div>

            <br />
            <br />
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
