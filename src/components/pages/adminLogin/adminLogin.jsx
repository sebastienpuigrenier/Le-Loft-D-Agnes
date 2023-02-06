import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExportContext from "../../../contexts/context";
import { authentification, deconnexion } from "../../../utils/utils";
import { mobileFooterHeight, mobileHeaderHeight } from "../../../utils/divDimensions";
import "./adminLogin.css";

export const AdminLogin = () => {
  const minHeight = 100 - mobileFooterHeight - mobileHeaderHeight;

  const navigate = useNavigate();
  const { infoUser, setInfoUser } = useContext(ExportContext.Context);
  const [isLog, setIsLog] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLog || infoUser.email) {
      navigate("/dashboard");
    } 
  }, [isLog]);
 
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authentification(user, setIsLog, setInfoUser);
  };

  return (
    <div
      style={{minHeight: `${minHeight}vh`}}
    >
      <div className="adminlogin-container">
        <p>En phase de test, utilisez admin@admin.fr et azerty.</p>
        {infoUser.email ? (
          <button
            type="button"
            onClick={() => deconnexion(navigate, setInfoUser)}
          >
          Se déconnecter
          </button>
        ) : (
          <form
            action=""
            method="post"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email">
                <p>Email :</p>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="mdp">
                <p>Mot de passe :</p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <button className="adminlogin-login-button" type="submit">
              Connexion
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

};