import axios from 'axios';

const API_DOMAIN = 'http://xly-wkop.xiaoniangao.cn';
const awaitArry = [];
const callServerApi = (endpoint, params, normalizeFuc) => new Promise((resolve, reject) => {
  axios({
    method: 'POST',
    url: API_DOMAIN + endpoint,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: params
  }).then(res => {
    if (res.data.ret === 1) {
      return resolve(normalizeFuc ? normalizeFuc(res.data.data) : res.data.data);
    }
    return reject(new Error(res.data.errMsg));
  }).catch(err => reject(err));
});

/* eslint-disable no-unused-vars */
export default store => next => action => {
  if (!action.SERVER_API) {
    return next(action);
  }
  if (action.SERVER_API.needToken) {
    console.log(22222222222222);
    console.log(action);
    const nowState = store.getState();
    console.log(333333, nowState);
    if (!nowState.userInfo.token) {
      awaitArry.push(action);
      console.log(awaitArry);
      return null;
    }
  }
  const {
    type,
    endpoint,
    params,
    normalizeFuc
  } = action.SERVER_API;

  if (typeof type !== 'string') {
    throw new Error('type shoudle be a string');
  }
  if (typeof endpoint !== 'string') {
    throw new Error('endpoint shoudle be a string');
  }
  if (typeof params !== 'object') {
    throw new Error('params shoudle be a object');
  }

  next({
    type: `${type}_REQ`
  });

  return callServerApi(endpoint, params, normalizeFuc)
    .then(response => {
      next({
        type: `${type}_SUC`,
        response
      });
      // if (awaitArry.length !== 0) {
      //   const newAction = awaitArry[0];
      //   awaitArry.splice(0, 1);
      //   newAction.SERVER_API.params.token = store.getState().userInfo.token;
      //   console.log(111111, newAction);
      //   store.dispacth(newAction);
      // }
      for (let t = 0; t < awaitArry.length; t++) {
        const action = awaitArry[t];
        action.SERVER_API.params.token = store.getState().userInfo.token;
        store.dispatch(action);
      }
      awaitArry.splice(0, awaitArry.length);
    }).catch(err => {
      next({
        type: `${type}_FAI`,
        errMsg: err.errMsg
      });
    });
};
