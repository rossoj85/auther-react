import React from 'react';
import { connect } from 'react-redux';
import { addUser as reduxSignup} from '../redux/users'
import {reduxLogin} from '../redux/currentUser';
import { create } from 'domain';
/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render() {
    console.log('@#@#$@#$@# SIGNUP #!@#$@#!$@#!$', this.props.reactLogin)
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onSignupSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="api/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
             <a
            style={{'marginTop': '15px'}}
            target="_self"
            href="api/auth/facebook"
            className="btn btn-social btn-facebook">
            <i className="fa fa-facebook" />
            <span>{message} with Facebook</span>
          </a>
          </p>
        </div>
      </div>
    );
  }

  onSignupSubmit(event) {
    event.preventDefault();
    const {email, password} = event.target; 
    const user = {
      email: email.value,
      password: password.value
    }
    this.props.reactSignup(user)
    .then(createdUser=>{
      this.props.reactLogin(createdUser)
      .then( loggedInUser =>
        this.props.history.push(`/users/${loggedInUser.id}`)
      )
    })
    .catch(console.error())

    const { message } = this.props;
    console.log('SIGNUP CLICKED')
    console.log(`${message} isn't implemented yet`);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' });
// const mapDispatch = (dispatch) =>({
//     reactLogin: user => dispatch(reduxLogin(user)),
//     reactSignup: user => dispatch(reduxSignup(user))
//     // .then(createdUser=>{
//     //   this.props.history.push(`/users/${createdUserId}`)
//     // })
//     // .catch()
//   });
const mapDispatch={
  reactLogin: reduxLogin,
  reactSignup: reduxSignup
}

export default connect(mapState, mapDispatch)(Signup);
