import {connect} from 'react-redux'
import Page from './Page'

const mapStateToProps = state => {
    return {
        isAuthenticated : state.Auth.isAuthenticated,
        userName : state.Auth.user.username,
    }
};

export default connect(mapStateToProps)(Page);