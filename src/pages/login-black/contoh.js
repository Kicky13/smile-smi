// import React from "react";
// import { Form, Label, Input } from "reactstrap";

// import { Redirect } from "react-router-dom";
// import PropTypes from "prop-types";
// import ReeValidate from "ree-validate";
// import AuthService from "../../services";
// import logoSISI from "../../logoSmile.png";
// // eslint-disable-next-line
// import ProgressButton from "react-progress-button";
// //import PageHeader from '../../common/pageHeader'

// class Page extends React.Component {
//   constructor(props) {
//     super(props);
//     this.validator = new ReeValidate({
//       username: "required",
//       password: "required|min:4"
//     });

//     this.state = {
//       credentials: {
//         username: "",
//         password: ""
//       },
//       responseError: {
//         isError: false,
//         code: "",
//         text: ""
//       },
//       buttonState: "disabled",
//       errors: this.validator.errors
//     };
//     this.username = React.createRef();
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     const name = event.target.name;
//     const value = event.target.value;
//     const { errors } = this.validator;
//     const { credentials } = this.state;
//     credentials[name] = value;

//     if (credentials.password.length >= 6 && credentials.password.length > 1) {
//       this.setState({
//         buttonState: ""
//       });
//     } else {
//       this.setState({
//         buttonState: "disabled"
//       });
//     }

//     this.validator.validate(name, value).then(() => {
//       this.setState({ errors, credentials });
//     });
//   }

//   checkerEmail(email) {
//     // eslint-disable-next-line
//     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//     if (re.test(email)) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     //console.log("clicked")
//     const { credentials } = this.state;
//     this.validator.validateAll(credentials).then(success => {
//       this.setState({
//         buttonState: ""
//       });
//       if (success) {
//         this.setState({
//           buttonState: "loading"
//         });
//         this.submit(credentials);
//       }
//     });
//   }

//   submit(credentials) {
//     this.props
//       .dispatch(AuthService.login(credentials))
//       .catch(({ error, statusCode }) => {
//         const responseError = {
//           isError: true,
//           code: statusCode,
//           text: error
//         };
//         //console.log("response error : "+responseError);
//         this.setState({ responseError });
//         this.setState({
//           buttonState: "error"
//         });
//       });
//   }

//   onSocialClick(event, data) {
//     window.location.assign(`redirect/${data.service}`);
//   }

//   componentDidMount() {
//     document.title = "SMILE - Login";
//     this.setState({
//       isLoading: false
//     });
//   }

//   render() {
//     //const { from } = this.props.location.state || { from: { pathname: '/' } };
//     const { isAuthenticated } = this.props;

//     if (isAuthenticated) {
//       return <Redirect to="/" />;
//     }
//     const { errors } = this.state;

//     return (
//       <div>
//         <br />
//         <br />
//         <div className="d-flex justify-content-center align-items-center container">
//           <div className="ml-auto mr-auto col-md-6 col-lg-4">
//             <br />
//             <br />

//             <Form className="form">
//               <div className="card-login card-white card">
//                 <img src={logoSISI} alt="" />
//                 <div className="card-header">
//                   <center>
//                     <h1 className="card-title">Log in</h1>
//                   </center>
//                 </div>
//                 <div className="card-body">
//                   <div className="input-group">
//                     <div className="input-group-prepend">
//                       <span className="input-group-text">
//                         <i className="fa fa-user-circle-o" aria-hidden="true" />
//                       </span>
//                     </div>
//                     <Input
//                       onChange={this.handleChange}
//                       error={errors.has("username").toString()}
//                       name="username"
//                       autoFocus
//                       id="exampleEmail"
//                       autoComplete="off"
//                       placeholder="Username"
//                     />
//                   </div>
//                   <center>
//                     {errors.has("username") && (
//                       <Label size="tiny" className="custom-error" color="red">
//                         {errors.first("username")}
//                       </Label>
//                     )}
//                   </center>
//                   <div className="input-group">
//                     <div className="input-group-prepend">
//                       <span className="input-group-text">
//                         <i className="fa fa-lock" aria-hidden="true" />
//                       </span>
//                     </div>
//                     <Input
//                       onChange={this.handleChange}
//                       error={errors.has("password").toString()}
//                       type="password"
//                       name="password"
//                       id="examplePassword"
//                       placeholder="Password"
//                     />
//                   </div>
//                   <center>
//                     {errors.has("password") && (
//                       <Label size="tiny" className="custom-error" color="red">
//                         {errors.first("password")}
//                       </Label>
//                     )}
//                   </center>
//                 </div>
//                 <div className="card-footer">
//                   {/*<ProgressButton

//                     onClick={this.handleSubmit}
//                     state={this.state.buttonState}
//                     href="#pablo"
//                   >
//                     Login
//                   </ProgressButton>*/}
//                   <button
//                     onClick={this.handleSubmit}
//                     href="#pablo"
//                     className="mb-3 btn btn-primary btn-lg btn-block"
//                   >
//                     Login
//                   </button>
//                 </div>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// Page.propTypes = {
//   isAuthenticated: PropTypes.bool.isRequired,
//   dispatch: PropTypes.func.isRequired
// };

// export default Page;
