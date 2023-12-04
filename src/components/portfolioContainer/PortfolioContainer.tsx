import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPortfolio } from "../../store/actions/portfolioAction";

const PortfolioContainer = () => {
  const dispatch = useAppDispatch();

  const { portfolio, errorPortfolio, loadingPortfolio } = useAppSelector(
    (state) => state.portfolio
  );
  useEffect(() => {
    fetchPortfolio()(dispatch);
  }, [dispatch]);
  return <div>PortfolioContainer</div>;
};

export default PortfolioContainer;
