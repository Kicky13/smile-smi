import React from "react";
import { Form,Input,NavLink } from "reactstrap";
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import * as actions from "../../store/actions";
import logoSmile from "../../logoSmileWhite.png";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      searchBox: '',
      searching: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(actions.authLogout());
  }

  handleChange(event) {
    this.setState({searchBox: event.target.value});
  }

  handleSearch() {
    if (this.state.searchBox != '' || this.state.searchBox != null) {
      this.setState({searching: true});
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  searchBar() {
    const searchResult = this.props.searchResult;
    if (typeof searchResult === "undefined") {
      return (
        <div className="col-md-12">
          <Form className="from" onSubmit={this.handleSearch}>
            <Input
              className="input-search-nav"
              type="text"
              value={this.state.searchBox}
              placeholder="Search something here ..."
              onChange={this.handleChange}
            />
          </Form>
        </div>
      );
    } else {
        return (
          <div className="col-md-12"></div>
        );
    }
  }

  render() {
    console.log(this.props);

    if (this.state.searching) {
      return <Redirect to={'/search/' + this.state.searchBox} />
    }

    return (
      <div>
        <body id="page-top">
          <nav className="navbar navbar-custom navbar-fixed-top">
            <div className="container">
            <div className="row">
              <div className="navbar-header page-scroll">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-ex1-collapse"
                >
                  <i className="material-icons">menu</i>
                </button>
                <a className="nav-brand" href={ process.env.REACT_APP_ROOT }>
                  <img className="nav-brand" src={logoSmile} alt="" />
                </a>
              </div>
              <div className="col-md-4">
                {this.searchBar()}
              </div>
              <div className="collapse navbar-collapse navbar-right navbar-ex1-collapse">
                <ul className="nav navbar-nav">
                  {/*<a className="nav-brand" href="index.html"><img src={logoSmile} alt=""/></a>*/}
                  <li>
                    <NavLink href={ process.env.REACT_APP_ROOT + "sminews" } >SMI News</NavLink>
                  </li>
                  <li>
                    <NavLink href={ process.env.REACT_APP_ROOT + "smiactivity" }>SMI Activity</NavLink>
                  </li>
                  <li>
                    <NavLink href={ process.env.REACT_APP_ROOT + "gallery" }>SMI Gallery</NavLink>
                  </li>
                  <li>
                    <NavLink href={ process.env.REACT_APP_ROOT + "jurnal" }>Jurnal</NavLink>
                  </li>
                <Button id="UncontrolledPopover" type="button" className="PopoverNav">
                  <i class="fa fa-user" aria-hidden="true"></i> <b>{this.props.userName}</b>
                </Button>
                <UncontrolledPopover placement="bottom" target="UncontrolledPopover" className="PopoverLayer">
                  <PopoverHeader>
                    <NavLink href={process.env.REACT_APP_ROOT + "ceksppd"} className="PopoverHead">
                      <h6 className="h4white" align="center"><i class="fa fa-folder" aria-hidden="true"></i> <b>SPPD</b></h6>
                    </NavLink>
                  </PopoverHeader>
                  <PopoverBody>
                    <NavLink href="/" onClick={e => this.handleLogout(e)}>
                      <h6 className="h4white" align="center"><i class="fa fa-sign-out" aria-hidden="true"></i> <b>Logout</b></h6>
                    </NavLink>
                  </PopoverBody>
                </UncontrolledPopover>
                </ul>
              </div>
            </div>
            </div>
          </nav>
        </body>
      </div>
    );
  }
}

export default Navbar;
