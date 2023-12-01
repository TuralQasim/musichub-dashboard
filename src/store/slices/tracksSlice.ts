import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrack } from "../../types/ITrack";

interface TracksState {
  loadingTracks: boolean;
  errorTracks: string;
  tracks: ITrack[] | null;
}

const initialState: TracksState = {
  loadingTracks: false,
  errorTracks: "",
  tracks: null,
};

export const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    fetching(state) {
      state.loadingTracks = true;
    },
    fetchingSuccess(state, action: PayloadAction<ITrack[]>) {
      state.loadingTracks = false;
      state.tracks = action.payload;
    },
    fechingError(state, action: PayloadAction<Error>) {
      state.loadingTracks = false;
      state.errorTracks = action.payload.message;
    },
  },
});

export const { fetching, fetchingSuccess, fechingError } = tracksSlice.actions;

export default tracksSlice.reducer;
