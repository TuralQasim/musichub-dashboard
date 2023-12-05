import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPortfolio } from "../../store/actions/portfolioAction";
import "./portfolioContainer.css"

const PortfolioContainer = () => {
  const dispatch = useAppDispatch();

  const { portfolio, errorPortfolio, loadingPortfolio } = useAppSelector(
    (state) => state.portfolio
  );
  useEffect(() => {
    fetchPortfolio()(dispatch);
  }, [dispatch]);
  return (
    <>
      {loadingPortfolio && <p>loading....</p>}
      {errorPortfolio && <p>{errorPortfolio}</p>}
      {portfolio && (
        <div className="portfolio_container">
          <table className="portfolio_table">
            <thead>
              <tr>
                <th>Название трека</th>
                <th>Ссылка</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((a: any) => {
                return (
                  <tr key={a.id}>
                    <td>{a.title}</td>
                    <td>{a.cover_url}</td>
                    <td className="portfolio_item_btns">
                      <button>Удалить</button>
                      <button>Редактировать</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination"></div>
        </div>
      )}
    </>
  );
};

export default PortfolioContainer;
