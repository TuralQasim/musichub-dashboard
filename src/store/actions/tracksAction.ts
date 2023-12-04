import axios from "../../axios";
import { AppDispatch } from "../index";
import { tracksSlice } from "../slices/tracksSlice";

export const fetchTracks = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(tracksSlice.actions.fetching());
      const response = await axios.post(
        "https://api.music-hub.ru/tracks/find",
        {
          sortBy: "hot",
          searchQuery: "string",
          page: 1,
          bpm_from: 0,
          bpm_to: 100,
          genre: ["string"],
          selection: ["string"],
          language: ["string"],
          gender: ["string"],
          mood: ["string"],
          key: ["string"],
          stage: ["string"],
          author: ["string"],
        }
      );
      dispatch(tracksSlice.actions.fetchingSuccess(response.data));
    } catch (e) {
      dispatch(tracksSlice.actions.fechingError(e as Error));
    }
  };
};
