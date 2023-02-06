import { api, notifySuccess, notifyError } from "../utils/utils";

export const authentification = (user, setIsLog, setInfoUser) => {
  const ENDPOINT = "/adminlogin";
  api
    .post(ENDPOINT, user, { withCredentials: true })
    .then((response) => {
      setInfoUser({
        email: response.data.email,
      });
      sessionStorage.setItem(`email`, response.data.email);
      setIsLog(true);
      notifySuccess("La connection a réussi");
    })
    .catch(() => {
      notifyError(
        "Un problème est survenu lors de votre tentative de connection"
      );
    });
};

export const deconnexion = (navigate, setInfoUser) => {
  const ENDPOINTDECONNEXION = "/deconnexion";
  api.post(ENDPOINTDECONNEXION).then((status) => {
    if (status.status === 200) {
      setInfoUser({});
      sessionStorage.removeItem(`email`);
      localStorage.removeItem(`email`);
      navigate("/");
      notifySuccess("Déconnexion réussie !");
    }
  });
};
