import React from "react";
import { Form, Label, Input } from "reactstrap";

import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import ReeValidate from "ree-validate";
import AuthService from "../../services";
import logoSISI from "../../logoSmileWhite.png";
import ScrollLock from "react-scroll-lock-component";

import LazyLoad from "react-lazy-load";
import ProgressiveImage from "react-progressive-image-loading";

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new ReeValidate({
      username: "required",
      password: "required|min:4"
    });

    this.state = {
      credentials: {
        username: "",
        password: ""
      },
      responseError: {
        isError: false,
        code: "",
        text: ""
      },
      buttonState: "disabled",
      errors: this.validator.errors
    };
    this.username = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const { errors } = this.validator;
    const { credentials } = this.state;
    credentials[name] = value;

    if (credentials.password.length >= 6 && credentials.password.length > 1) {
      this.setState({
        buttonState: ""
      });
    } else {
      this.setState({
        buttonState: "disabled"
      });
    }

    this.validator.validate(name, value).then(() => {
      this.setState({ errors, credentials });
    });
  }

  checkerEmail(email) {
    // eslint-disable-next-line
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    //console.log("clicked")
    const { credentials } = this.state;
    this.validator.validateAll(credentials).then(success => {
      this.setState({
        buttonState: ""
      });
      if (success) {
        this.setState({
          buttonState: "loading"
        });
        this.submit(credentials);
      }
    });
  }

  submit(credentials) {
    this.props
      .dispatch(AuthService.login(credentials))
      .catch(({ error, statusCode }) => {
        const responseError = {
          isError: true,
          code: statusCode,
          text: error
        };
        //console.log("response error : "+responseError);
        this.setState({ responseError });
        this.setState({
          buttonState: "error"
        });
      });
  }

  onSocialClick(event, data) {
    window.location.assign(`redirect/${data.service}`);
  }

  componentDidMount() {
    document.title = "SMILE - Login";
    this.setState({
      isLoading: false
    });
  }

  render() {
    //const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { errors } = this.state;

    return (
      <div>
        <ScrollLock>
          <div className="background-login">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="box">
                    <div className="d-flex justify-content-center align-items-center container">
                      <div className="ml-auto mr-auto col-md-6 col-lg-4">
                        <Form className="form">
                          <div className="card-login">
                            <LazyLoad>
                              <ProgressiveImage
                                preview={logoSISI}
                                src={logoSISI}
                                // eslint-disable-next-line
                                render={(src, style) => (
                                  <img
                                    decoding="async"
                                    className="img-smile"
                                    src={logoSISI}
                                    alt=""
                                    style={style}
                                    key="asdsadasa"
                                  />
                                )}
                              />
                            </LazyLoad>
                            <div className="title-login">
                              <h1>Login to access SMILE</h1>
                            </div>
                            <div className="body-login">
                              {/*  */}
                              <div className="input-login">
                                <Input
                                  onChange={this.handleChange}
                                  error={errors.has("username").toString()}
                                  name="username"
                                  autoFocus
                                  id="exampleEmail"
                                  autoComplete="off"
                                  placeholder="Username"
                                />
                              </div>
                              {/*  */}
                              <center>
                                {errors.has("username") && (
                                  <Label
                                    size="tiny"
                                    className="custom-error"
                                    color="red"
                                  >
                                    {errors.first("username")}
                                  </Label>
                                )}
                              </center>
                              {/*  */}

                              <div className="input-login">
                                <Input
                                  onChange={this.handleChange}
                                  error={errors.has("password").toString()}
                                  type="password"
                                  name="password"
                                  id="examplePassword"
                                  placeholder="Password"
                                />
                              </div>
                              {/*  */}
                              <center>
                                {errors.has("password") && (
                                  <Label
                                    size="tiny"
                                    className="custom-error"
                                    color="red"
                                  >
                                    {errors.first("password")}
                                  </Label>
                                )}
                              </center>
                              <div className="button-box">
                                <button
                                  onClick={this.handleSubmit}
                                  href="#pablo"
                                  className="mb-3 btn btn-primary btn-lg btn-block"
                                >
                                  Login
                                </button>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollLock>
      </div>
    );
  }
}

Page.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Page;
