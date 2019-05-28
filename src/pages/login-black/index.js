import { connect } from "react-redux";
import Page from "./Page";
import "../../asset/css/css-lates/black-dashboard-react.css";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Page);
