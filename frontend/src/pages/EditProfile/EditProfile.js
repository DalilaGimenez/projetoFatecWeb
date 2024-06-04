import "./EditProfile.css";

import { uploads } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, updateProfile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // fill user form
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather user data from states
    const userData = {
      name,
      bio,
      password,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    // build form data
    const formData = new FormData();

    // Append each key and value to the formData
    Object.keys(userData).forEach((key) => {
      if (userData[key]) {
        formData.append(key, userData[key]);
      }
    });

    // Append profile image if it exists
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }
    // Dispatch the update profile action
    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    // change image state
    setProfileImage(image);
  };

  const defaultProfile = require("../../images/default-profile.png");

  return (
    <div id="edit-profile">
      <h2>EDITE SEUS DADOS</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil, e conte mais um pouco sobre você...
      </p>
      {(user.profileImage || previewImage || defaultProfile ) && (
        <img
          className="profile-image"
          src={
            user.profileImage ? `${uploads}/users/${user.profileImage}` 
            : previewImage ? URL.createObjectURL(previewImage) 
            : defaultProfile
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          //placeholder=´${name}´
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="email" placeholder="E-mail" disabled value={email} />
        <label>
          <span>Imagem de Perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input
            type="password"
            placeholder="Digite sua nova senha..."
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default Profile;
