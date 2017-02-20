import 'isomorphic-fetch';

export const APP_TITLE = 'APP_TITLE';


export function appInit(data) {
  return (dispatch, getState) => {
    // console.log(getState());
    dispatch(appTitle(data));
  };
}

export function appTitle(data) {
  console.log('*** APP_TITLE ok ***');
  return {
    type: APP_TITLE,
    data
  };
}
