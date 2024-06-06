import "./Profile.css";

import { api } from "../../utils/config";

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// hooks
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import {
  getUserPhotos,
  publishPhoto,
  resetMessage,
  deletePhoto,
  updatePhoto,
} from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    error: errorPhoto,
    message: messagePhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState();
  const [editImage, setEditImage] = useState();
  const [editTitle, setEditTitle] = useState();
  const [editGender, setEditGender] = useState();
  const [editSize, setEditSize] = useState();


  // New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  // Reset component message
  function resetComponentMessage() {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  // Publish a new photo
  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      gender,
      size,
      image,
    };

    // build form data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");
    setGender("");
    setSize("");

    resetComponentMessage();
  };

  // change image state
  const handleFile = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  // Exclude an image
  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    resetComponentMessage();
  };

  // Show or hide forms
  function hideOrShowForms() {
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  }

  // Show edit form
  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains("hide")) {
      hideOrShowForms();
    }

    setEditId(photo._id);
    setEditImage(photo.image);
    setEditTitle(photo.title);
    setEditGender(photo.gender);
    setEditSize(photo.size);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    hideOrShowForms();
  };

  // Update photo title
  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      gender: editGender,
      size: editSize,
      id: editId,
    };

    dispatch(updatePhoto(photoData));

    resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  // Image
  const defaultProfile = require("../../images/default-profile.png");

  return (
    <div className="container-background">
      <div id="profile">
        <div className="profile-header">
          <img
            src={user.profileImage ? `${api}/users/${user.profileImage}` : defaultProfile}
            alt={user.name}
          />
          <div className="profile-description">
            <h2>Olá, {user.name}</h2>
            <p>{user.bio}</p>
          </div>
        </div>
        {id === userAuth._id && (
          <>
            <div className="new-photo" ref={newPhotoForm}>
              <h3>Compartilhe Aumor:</h3>
              <form onSubmit={submitHandle}>
                <label>
                  <span>&#128054; Nome do Cão:</span>
                  <input
                    type="text"
                    placeholder="Insira o nome do cachorro"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title || ""}
                  />
                </label>
                <label>
                  <span>Sexo do Cão:</span>
                  <select
                    onChange={(e) => setGender(e.target.value)}
                    value={gender || ""}>
                    <option value="m">Macho</option>
                    <option value="f">Fêmea</option>
                  </select>
                </label>
                <label>
                  <span>Porte do Cão:</span>
                  <select
                    onChange={(e) => setSize(e.target.value)}
                    value={size || ""}>
                    <option value="p">Pequeno</option>
                    <option value="m">Médio</option>
                    <option value="g">Grande</option>
                  </select>
                </label>
                <label>
                  <span>Imagem:</span>
                  <input type="file" onChange={handleFile} />
                </label>
                {!loadingPhoto && <input type="submit" value="POSTAR" />}
                {loadingPhoto && (
                  <input type="submit" disabled value="Aguarde..." />
                )}
              </form>
            </div>
            <div className="edit-photo hide" ref={editPhotoForm}>
              <p>Editando:</p>
              {editImage && (
                <img src={`${api}/photos/${editImage}`} alt={editTitle} />
              )}
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  onChange={(e) => setEditTitle(e.target.value)}
                  value={editTitle || ""}
                />
                <input type="submit" value="Atualizar" />
                <button className="cancel-btn" onClick={handleCancelEdit}>
                  Cancelar edição
                </button>
              </form>
            </div>
            {errorPhoto && <Message msg={errorPhoto} type="error" />}
            {messagePhoto && <Message msg={messagePhoto} type="success" />}
          </>
        )
        }
        <div className="user-photos">
          <h2>Fotos publicadas:</h2>
          <div className="photos-container">
            {Array.isArray(photos) &&
              photos.map((photo) => (
                <div className="photo" key={photo._id}>
                  {photo.image && (
                    <img
                      src={`${api}/photos/${photo.image.fileName}`}
                      alt={photo.title}
                    />
                  )}
                  {id === userAuth._id ? (
                    <div className="actions">
                      <Link to={`/photos/${photo._id}`}>
                        <BsFillEyeFill />
                      </Link>
                      <BsPencilFill onClick={() => handleEdit(photo)} />
                      <BsXLg onClick={() => handleDelete(photo._id)} />
                    </div>
                  ) : (
                    <Link className="btn" to={`/photos/${photo._id}`}>
                      Ver
                    </Link>
                  )}
                  <p>{photo.title}</p>
                  <p>{photo.gender}</p>
                  <p>{photo.size}</p>
                  {Array.isArray(photos) && photos.length === 0 && <p>Ainda não há fotos publicadas...</p>}
                </div>
              ))}
          </div>
        </div>
      </div >
    </div >

  );
};

export default Profile;
