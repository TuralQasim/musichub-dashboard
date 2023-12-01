import axios from "../../axios";
import { AppDispatch } from "../index";
import { tracksSlice } from "../slices/tracksSlice";

export const fetchTracks = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(tracksSlice.actions.fetching());
      const response = await axios.get("tracks");
      dispatch(tracksSlice.actions.fetchingSuccess(response.data[0]));
    } catch (e) {
      dispatch(tracksSlice.actions.fechingError(e as Error));
    }
  };
};
