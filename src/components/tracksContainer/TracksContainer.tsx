import React, { useEffect } from "react";
import "./tracksContainer.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchTracks } from "../../store/actions/tracksAction";

const TracksContainer = () => {
  const dispatch = useAppDispatch();

  const { tracks, errorTracks, loadingTracks } = useAppSelector(
    (state) => state.tracks
  );
  useEffect(() => {
    fetchTracks()(dispatch);
  }, [dispatch]);
  return (
    <>
      {loadingTracks && <p>loading....</p>}
      {errorTracks && <p>{errorTracks}</p>}
      {tracks && (
        <div className="tracks_container">
          <table className="tracks_table">
            <thead>
              <tr>
                <th>Название трека</th>
                <th>Исполнитель</th>
                <th>Длительность</th>
                <th>Жанр</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((a) => {
                return (
                  <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>
                      {a.author.map((b) => {
                        return <span>{b.name}</span>;
                      })}
                    </td>
                    <td>{a.bpm}</td>
                    <td>
                      {a.genre.map((b) => {
                        return <span>{b.name}</span>;
                      })}
                    </td>
                    <td className="track_item_btns">
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

export default TracksContainer;
