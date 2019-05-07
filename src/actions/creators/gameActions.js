import * as types from "../actionTypes";
import axios from "axios";

export const moveTarget = (direction, shuffle) => ({
  type: types.MOVE_TARGET,
  payload: { direction, shuffle }
});

const setPictureUrl = pictureUrl => ({
  type: types.SET_PICTURE_URL,
  payload: pictureUrl
});

const setPictureUrlNull = () => ({
  type: types.SET_PICTURE_URL_NULL
});

export const newPicRequest = () => dispatch => {
  return axios
    .get("https://api.unsplash.com/photos/random", {
      params: {
        client_id:
          "17827b0fcb9a2999e7090367d8ac0260c9127ef698ad80d8e2394ad25d238fea"
      }
    })
    .then(response => {
      if (response.data.urls.regular)
        dispatch(setPictureUrl(response.data.urls.regular));
    })
    .catch(() => {
      dispatch(setPictureUrlNull());
    });
};

export const startShuffle = num => ({
  type: types.START_SHUFFLE,
  payload: num
});

export const toggleDisplayNumber = () => ({
  type: types.TOGGLE_DISPLAY_NUMBER
});
