import axios from "../../axios";
import { AppDispatch } from "../index";
import { portfolioSlice } from "../slices/portfolioSlice";

export const fetchPortfolio = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(portfolioSlice.actions.fetching());
      const response = await axios.get("https://api.music-hub.ru/portfolio");
      dispatch(portfolioSlice.actions.fetchingSuccess(response.data));
    } catch (e) {
      dispatch(portfolioSlice.actions.fechingError(e as Error));
    }
  };
};
