import React from 'react'
import {connect} from 'react-redux'
//import Navigation from './common/navigation'
//import Footer from './common/mainFooter'

class Main extends React.Component {
    //constructor(props) {
    //    super(props);
    //}

    render() {
        return (
            <div>
                
                    {this.props.children}
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(Main);