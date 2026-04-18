import axios from "axios";

export const api = axios.create({
  baseURL: "http://garra.dnsalias.com:13583",
});
