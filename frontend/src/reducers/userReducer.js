import {
  REGISTER,
  LOGIN_ADMIN,
  LOGOUT_ADMIN,
  EDIT_PROFILE,
  GET_USER_DETAILS,
  GET_ALL_USERS,
  EDIT_PROFILE_ADMIN,
  DELETE_USER_ADMIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD
} from "../constants/adminConstants";

const initialState = {
  user: {},
  users: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      
      return Object.assign({}, state, {
        user: action.payload.user,
        users: state.users.concat(action.payload.user)
      })
    case EDIT_PROFILE:
      
      return Object.assign({}, state, {
        success: action.payload.success,
        message: action.payload.message,
        user: action.payload.user
      })
    case LOGIN_ADMIN:
      localStorage.setItem('token', action.payload.token);
      return Object.assign({}, state, {
        user: action.payload.user,
        token: action.payload.token
      })
    case GET_USER_DETAILS:
      
      return Object.assign({}, state, {
        user: action.payload.user
      })
    case LOGOUT_ADMIN:
      
      return Object.assign({}, state, {
        user: []
      })
    case FORGOT_PASSWORD:
      return Object.assign({}, state, {
        message: action.payload.message,
        success: action.payload.success
      });
    case RESET_PASSWORD:
      return Object.assign({}, state, {
        success: action.payload,
        loading: false
      });
    case GET_ALL_USERS:
      return Object.assign({}, state, {
        users: action.payload.users,
        success: action.payload.success
      })
    case EDIT_PROFILE_ADMIN:
      
      return Object.assign({}, state, {
        success: action.payload.success,
        message: action.payload.message,
        users: state.users.map(user => {
          if (user._id === action.payload.user._id) {
            user = action.payload.user
            return user
          }
          return user
        })
      })
    case DELETE_USER_ADMIN:
      
      return Object.assign({}, state, {
        success: action.payload.success,
        message: action.payload.message,
        users: state.users.filter(user => user._id !== action.payload.user._id)
      })
    default:
      return state;
  }

};

export default userReducer;