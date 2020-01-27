import axios from "axios";
import {
  IDENTIFICATION_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
} from "../constants";

export const generateUbbleIdentification = async () => {

  const config = {
    auth: { username: CLIENT_ID, password: CLIENT_SECRET },
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json"
    }
  };

  const body = JSON.stringify({
    data: {
      type: "identifications",
      attributes: {
        "redirect-url": REDIRECT_URL
      }
    }
  });
  const response = await axios.post(IDENTIFICATION_URL, body, config);
  const {
    data: { attributes }
  } = response.data;

  return {
    identificationUrl: attributes["identification-url"],
    redirectUrl: attributes["redirect-url"]
  };
};
