import { toast } from "react-toastify";

export const notifySuccess = (message) => {
  toast.success(`Bravo : ${message}`);
};

export const notifyError = (message) => {
  toast.error(`Erreur : ${message}`);
};
