import axios from 'axios';
import * as utils from '../../../utils/utils.js';

export const ADD_USERBEER = 'add_userbeer';
export const DELETE_USERBEER = 'delete_userbeer';
export const ADD_DELETE_LIKE = 'add_delete_like';
export const FOLLOW_USER = 'follow_user';

export const deleteUserBeer = (beerinfo, userinfo, callback) => async(dispatch) => {
  try {
    const params = {};
    params.beerInfo = beerinfo;
    params.userInfo= userinfo;
    let token = localStorage.getItem('token');
    const request = axios.delete(`/users/deletebeer/${beerinfo.id}`, {
      data: { Authorization: token, params: params }
    }).then((res) => {
      if(callback) {
        callback();
      }
    });ß
  }
  catch(e) {
    console.log(e);
  }
}

export const addUserBeer = (values, userinfo, callback) => async (dispatch) => {
  try {
    const beerObj = {};
    beerObj.values = values;
    beerObj.userinfo = userinfo;
    let token = localStorage.getItem('token');
    const request = axios.post('/users/addbeers', beerObj, {
      headers: { Authorization: token }
    })
    .then((res) => {
      var newBeerInfo = res;
      if(callback) {
        callback();
      }
    });
  dispatch({
    type: ADD_USERBEER,
    payload: newBeerInfo
  })
  }
  catch (e) {
    console.log("error in add user beer");
  }
}

export const addDeleteLike = (values, callback, userAuth) => async (dispatch) => {
  // console.log(values);
  console.log("trigger")
  try {
    const beerObj = {};
    beerObj.values = values;
    beerObj.userAuth = utils.stringChecker(userAuth.userinfo);
    let token = localStorage.getItem('token');
    const request = axios.post('/users/likes', beerObj, {
      headers: { Authorization: token }
    })
    .then((res) => {
      if(callback) {
        callback();
      }
    });
  dispatch({
    type: ADD_DELETE_LIKE,
    payload: request
  })
  }
  catch (e) {
    console.log("error in add user beer");
  }  
}

export const followUser = (userFollow, userInfo, cb) => async (dispatch) => {
  let values = {};
  values.userFollow = userFollow;
  values.userInfo = userInfo;
  let token = localStorage.getItem('token');
  try {
    const request = await axios.post('/users/follows', values)
    console.log(request.data);
    localStorage.setItem('user', JSON.stringify(request.data));
    dispatch({
      type: FOLLOW_USER,
      payload: request.data

    }) 
    if(cb) {
      cb();
    }
  }
  catch (e) {
    console.log("error follow user");
  }
}
