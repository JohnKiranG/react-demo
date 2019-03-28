import {
    TOGGLE_SIDEMENU,
    SHOW_TOASTER_SUCCESS,
    DISPATCH_AND_ROUTE_REQUEST,
    DISPATCH_AND_ROUTE_SUCCESS,
    DISPATCH_AND_ROUTE_FAILURE,
  } from '../actions/app';

  import initialState from '../store/initialState';
  
  export default (state = initialState.app, action) => {
    if (action.type.match(/CREATE.*_SUCCESS/)) {
      return {
        ...state,
        toaster: 'CREATE_SUCCESS',
      };
    } if (action.type.match(/CREATE.*_FAILURE/)) {
      return {
        ...state,
        toaster: 'CREATE_FAILURE',
      };
    }
    if (action.type.match(/UPDATE.*_SUCCESS/)) {
      return {
        ...state,
        toaster: 'UPDATE_SUCCESS',
      };
    } if (action.type.match(/UPDATE.*_FAILURE/)) {
      return {
        ...state,
        toaster: 'UPDATE_FAILURE',
      };
    }
  
    switch (action.type) {
      case TOGGLE_SIDEMENU:
        return {
          ...state,
          sidemenu: {
            collapsed: !state.sidemenu.collapsed,
          },
        };
 
      case SHOW_TOASTER_SUCCESS:
        return {
          ...state,
          toaster: null,
        };
      case DISPATCH_AND_ROUTE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DISPATCH_AND_ROUTE_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case DISPATCH_AND_ROUTE_FAILURE:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  };
  