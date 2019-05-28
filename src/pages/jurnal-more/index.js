import Page from "./Page";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        userName: state.Auth.user.username,
        isAdmin: state.Auth.isAdmin,
    };
};

export default connect(mapStateToProps)(Page);