import { message } from 'antd';
// eslint-disable-next-line
import { history } from '../store/configureStore';
import createActionType from '../utils/action';

export const TOGGLE_SIDEMENU = createActionType('TOGGLE_SIDEMENU');
export const SHOW_TOASTER_SUCCESS = createActionType('SHOW_TOASTER_SUCCESS');
export const DISPATCH_AND_ROUTE_REQUEST = createActionType('DISPATCH_AND_ROUTE_REQUEST');
export const DISPATCH_AND_ROUTE_SUCCESS = createActionType('DISPATCH_AND_ROUTE_SUCCESS');
export const DISPATCH_AND_ROUTE_FAILURE = createActionType('DISPATCH_AND_ROUTE_FAILURE');


export const toggleSidemenu = () => dispatch => {
  dispatch({
    type: TOGGLE_SIDEMENU,
  });
};

const showToasterSuccess = dispatch => dispatch({
  type: SHOW_TOASTER_SUCCESS,
});

export const showToaster = (toaster) => dispatch => {
  if (toaster === 'CREATE_SUCCESS') {
    message.success('Saved Successfully.', [2]);
    showToasterSuccess(dispatch);
  }
  if (toaster === 'UPDATE_FAILURE') {
    message.error('Failed to update the form.', [2]);
    showToasterSuccess(dispatch);
  }
  if (toaster === 'UPDATE_SUCCESS') {
    message.success('Updated Successfully.', [2]);
    showToasterSuccess(dispatch);
  }
  if (toaster === 'CREATE_FAILURE') {
    message.error('Failed to save the form.', [2]);
    showToasterSuccess(dispatch);
  }
};

const dispatchAndRouteRequest = () => ({
  type: DISPATCH_AND_ROUTE_REQUEST,
});

const dispatchAndRouteSuccess = () => ({
  type: DISPATCH_AND_ROUTE_SUCCESS,
});

const dispatchAndRouteFailure = () => ({
  type: DISPATCH_AND_ROUTE_FAILURE,
});


export const dispatchAndRoute = (action, path, _params) => async dispatch => {
  dispatch(dispatchAndRouteRequest());
  try {
    const res = await action();
    dispatch(dispatchAndRouteSuccess());
    if (_params) {
      history.push({
        pathname: path,
        state: { res },
      });
    } else {
      history.push(path);
    }
  } catch (error) {
    console.log(error);
    dispatch(dispatchAndRouteFailure());
  }
};
