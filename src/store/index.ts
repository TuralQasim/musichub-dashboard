import { configureStore, combineReducers, Store } from "@reduxjs/toolkit";
import tracksReducer from "./slices/tracksSlice";

const rootReducer = combineReducers({
  tracks: tracksReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = Store["dispatch"];
