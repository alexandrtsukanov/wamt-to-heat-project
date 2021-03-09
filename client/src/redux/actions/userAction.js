import * as TYPES from '../types/types';


//====================session========================
export function checkUser(data) {
  return {
    type: TYPES.CHECK_USER_SESSION,
    data,
  }
}

const checkUserSession = () => (dispatch) => {
  // fetch('/login', {credentials: 'include'})
    fetch('http://localhost:3001/login', {credentials: 'include'})

    .then(res => res.status === 200 ? res.json() : null)
    .then(data => {
      dispatch(checkUser(data));
    })
}

// //===================login=========================
export function signInUser(data) {
  return {
    type: TYPES.VERIFY_USER,
    data,
  }
}

const loginUser = (login, password) => (dispatch) => {
  fetch('/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login,
      password,
    }), 
  }, { credentials: 'includes' })
    .then(res => res.status === 200 ? res.json() : {})
    .then(data => {
      dispatch(signInUser(data));
    })
}
//========================logout====================
export function removeUser() {
  return {
    type: TYPES.VERIFY_USER,
    data: null
  }
}

const logoutUser = () => (dispatch) => {
  fetch('/logout')
    .then(res => res.status === 200 ? dispatch(removeUser()) : null)
}

//===================registration===================

export function signUpUser(data) {
  return {
    type: TYPES.VERIFY_USER,
    data,
  }
}

const registerUser = ({ email, login, password }) => (dispatch) => {
  fetch('/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      login,
      email,
      password,
    })
  }, { credentials: 'includes' })
    .then(res => res.status === 200 ? res.json() : {})
    .then(data => {
      dispatch(signUpUser(data));
    })
}

//===============================

const showProfileThunk = () => {
  return async (dispatch) => {
    const response = await fetch('/user/tours', { credentials: 'include' });
    const result = await response.json();
    console.log(result)
    dispatch ({
      type: TYPES.SET_USERS_TOURS,
      data: result
    })
  }
}

const addTourThunk = (paramUser, paramTour) => async (dispatch) => {
  const response = await fetch(`/user/${paramUser}/addtour`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _id: paramTour })
  }, { credentials: 'includes' });
  const result = await response.json();
  dispatch ({
    type: TYPES.ADD_TOUR,
    data: result
  })
  dispatch ({
    type: TYPES.CHANGE_IS_ADDED,
    data: paramTour
  })
}

const deleteTourThunk = (paramUser, paramTour) => async (dispatch) => {
  const response = await fetch(`/user/${paramUser}/deletetour`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _id: paramTour })
  }, { credentials: 'includes' });
  dispatch ({
    type: TYPES.DELETE_TOUR,
    data: paramTour
  })
}

export {
  checkUserSession,
  loginUser,
  logoutUser,
  registerUser,
  showProfileThunk,
  addTourThunk,
  deleteTourThunk,
}
