import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPortfolio } from "../../types/IPortfolio";

interface PortfolioState {
  loadingPortfolio: boolean;
  errorPortfolio: string;
  portfolio: IPortfolio[] | null;
}

const initialState: PortfolioState = {
  loadingPortfolio: false,
  errorPortfolio: "",
  portfolio: null,
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    fetching(state) {
      state.loadingPortfolio = true;
    },
    fetchingSuccess(state, action: PayloadAction<IPortfolio[]>) {
      state.loadingPortfolio = false;
      state.portfolio = action.payload;
    },
    fechingError(state, action: PayloadAction<Error>) {
      state.loadingPortfolio = false;
      state.errorPortfolio = action.payload.message;
    },
  },
});

export const { fetching, fetchingSuccess, fechingError } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;
