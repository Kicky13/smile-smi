import React from "react";
import { NavLink } from "reactstrap";
import * as actions from "../../store/actions";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      dropdownOpen: false,
      color: "navbar-transparent"
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(actions.authLogout());
    //this.props.history.push("/login");
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch
    });
  };

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  render() {
    return (

      <div>
        <header className="header_style_01">
          <nav className="megamenu navbar-default">
            <div className="container">
              <div className="navbar-header menu-icon">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar"
                  aria-expanded="false"
                  aria-controls="navbar"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                {/* <NavLink className="navbar-brand" href="/">
                  <img src={logoSmile} alt="" />
                </NavLink> */}
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li>
                    <NavLink className="active" href="/admin/article">
                      Article
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="active" href="/admin/category">
                      Category
                    </NavLink>
                  </li>

                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="dropdown">
                    <NavLink href="#" className="dropbtn">
                      <p>Halo ,{this.props.userName}</p>
                    </NavLink>

                    <div className="dropdown-content">
                      <NavLink href="/" onClick={e => this.handleLogout(e)}>
                        Logout
                      </NavLink>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>


    );
  }
}

export default AdminNavbar;
