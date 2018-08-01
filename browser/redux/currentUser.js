import axios from 'axios';

// CONSTANTS (connstants are put into an object and the are ysed to determine which type of action is to be performed on the thing)
// when a set action occurs we change who the current user is 
//the string jsjut explains what it does
const SET = 'SET_CURRENT_USER'

// ACTIONS 
//take user credentials and return an object whos type is set and the user is equal to the current user
export const set = user=> ({type:SET, user})
export const logout = ()=>({type:LOGOUT})
// REDUCER 
export default function reducer (currentUser = null, action) {
    switch (action.type) {
  
      case SET:
        return action.user;
  
  
      default:
        return currentUser;
    }
  }


//THUNKED  ACTION CREATORS

const logErr = console.error.bind(console)
//returns a thunk that returns dispatch which returns axios call
export const reduxLogin = credentials =>
    dispatch=>
    axios.put('/api/auth/me', credentials)
    .then(res=>res.data)
    .then(user=>{
      dispatch(set(user))
      return user
      // .catch(logErr)
    // we are now catching in the Login component because we want the thunked action creater to return user so that we can force a page
    // change via routerhistory in the Login component
    })

export const retrieveLoggedInUser = credentials =>
// console.log('HITTING RETRIEVE USER!!!!!!')
    dispatch =>{
    console.log('HITTING RETRIEVE USER!!!!!!')
    axios.get('/api/auth/me')
    .then(res=>res.data)
    .then(user => dispatch(set(user)))
    .catch(logErr)
    }
export const reduxLogout = () =>
    dispatch=>{
      axios.delete('/api/auth/me')
      dispatch(set(null))
    }


