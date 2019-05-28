import { connect } from "react-redux";
import Page from "./Page";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    userName: state.Auth.user.username,
    userEmail: state.Auth.user.email
  };
};

export default connect(mapStateToProps)(Page);
