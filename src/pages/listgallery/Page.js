import React from "react";
import * as actions from "../../store/actions";
import Navbar from "../../components/Navbars/Navbar";
import Footer from "../../components/Footer/FooterDash";
import MDSpinner from "react-md-spinner";
import DisplayGallery from "../../components/DisplayGallery/Displaygallery";
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
    const id = this.props.match.params.id;
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
                  <DisplayGallery id={id}/>
                  {/*  */}

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
