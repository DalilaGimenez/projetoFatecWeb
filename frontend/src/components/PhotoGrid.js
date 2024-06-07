import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos, searchPhotos, incrementPage, resetPage } from "../slices/photoSlice";
import PhotoItem from "./PhotoItem";
import { api } from "../utils/config";
import "./PhotoGrid.css";

const PhotoGrid = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { photos, loading, error, page } = useSelector((state) => state.photo);

  const [query, setQuery] = useState(searchQuery || "");

  useEffect(() => {
    if (query) {
      dispatch(resetPage());
      dispatch(searchPhotos({ query, page: 1 }));
    } else {
      dispatch(getPhotos(page));
    }
  }, [dispatch, query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(resetPage());
    dispatch(searchPhotos({ query, page: 1 }));
  };

  const loadMorePhotos = () => {
    dispatch(incrementPage());
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar fotos: {error}</p>;

  return (
    <div id="photo-grid">
      {!searchQuery && (
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Pesquisar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      )}
      <div className="grid-container">
        {photos.map((photo, index) => (
          <div className="grid-item" key={index}>
            <PhotoItem photo={photo} />
            <img src={`${api}/photos/${photo.image}`} alt={photo.title} />
            <img src={`${api}/uploads/photos/${photo.image}`} alt={photo.title} />

          </div>
        ))}
      </div>
      <button onClick={loadMorePhotos}>Ver mais</button>
    </div>
  );
};

export default PhotoGrid;
