import { configureStore, combineReducers, Store } from "@reduxjs/toolkit";
import tracksReducer from "./slices/tracksSlice";
import AuthReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  tracks: tracksReducer,
  auth: AuthReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = Store["dispatch"];
