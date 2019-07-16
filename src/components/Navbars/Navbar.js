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
    const searchResult = this.props.findWord;
    if (typeof searchResult === "undefined") {
      return (
        <div className="col-md-12">
          <Form className="from" onSubmit={this.handleSearch}>
            <Input
              className="input-search-nav"
              type="text"
              value={this.state.searchBox}
              placeholder="Search ..."
              onChange={this.handleChange}
            />
          </Form>
        </div>
      );
    } else {
        return (
          <div className="col-md-12" style={{padding: '0px'}}></div>
        );
    }
  }

  render() {
    console.log(this.props);
    const active = this.props.activeBar;
    const activeBar = {
      home: "",
      news: "",
      office: "",
      activity: "",
      gallery: "",
      journal: ""
    }
    if (typeof active !== "undefined") {
      if (active == "home") {
        activeBar['home'] = 'active';
      } else if (active == "news") {
        activeBar['news'] = 'active';
      } else if (active == "office") {
        activeBar['office'] = 'active';
      } else if (active == "activity") {
        activeBar['activity'] = 'active';
      } else if (active == "gallery") {
        activeBar['gallery'] = 'active';
      } else {
        activeBar['journal'] = 'active';
      }
    }
    if (this.state.searching) {
      return <Redirect to={'/search/' + this.state.searchBox} />
    }

    return (
      <div>
        <body id="page-top">
          <nav className="navbar navbar-custom navbar-fixed-top">
            <div className="container">
            
            <div className="row">
              <div className="col-md-2" >
                <a className="nav-brand" href={ process.env.REACT_APP_ROOT }>
                  <img className="nav-brand" src={logoSmile} alt="" />
                </a>
              </div>
              <div className="col-md-3" style={{padding: '0px'}}>
              {this.searchBar()}
              </div>
              <div className="col-md-7" style={{padding: '0px'}}>
                <div className="collapse navbar-collapse navbar-right navbar-ex1-collapse">
                  <ul className="nav navbar-nav">
                    <li className={activeBar.home}>
                      <NavLink href={ process.env.REACT_APP_ROOT }><i className="fa fa-home" style={{fontSize: '18px'}}></i></NavLink>
                    </li>
                    <li className={activeBar.news}>
                      <NavLink href={ process.env.REACT_APP_ROOT + "sminews" } >SMI News</NavLink>
                    </li>
                    <li className={activeBar.office}>
                      <NavLink href={ process.env.REACT_APP_ROOT + "ceksppd" } >SMI Office</NavLink>
                    </li>
                    <li className={activeBar.activity}>
                      <NavLink href={ process.env.REACT_APP_ROOT + "smiactivity" }>SMI Activity</NavLink>
                    </li>
                    <li className={activeBar.gallery}>
                      <NavLink href={ process.env.REACT_APP_ROOT + "gallery" }>SMI Gallery</NavLink>
                    </li>
                    <li className={activeBar.journal}>
                      <NavLink href={ process.env.REACT_APP_ROOT + "jurnal" }>SMI Journal</NavLink>
                    </li>
                  <Button id="UncontrolledPopover" type="button" className="PopoverNav" style={{width: '100px'}}>
                    <i class="fa fa-user" aria-hidden="true" style={{fontSize: '18px'}}></i>
                  </Button>
                  <UncontrolledPopover placement="bottom" target="UncontrolledPopover" className="PopoverLayer">
                    <PopoverHeader>
                        <h6 className="h4white" align="center"><b>{this.props.userName}</b></h6>
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
            </div>
          </nav>
        </body>
      </div>
    );
  }
}

export default Navbar;
