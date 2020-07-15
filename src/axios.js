import axios from "axios";
let instance = axios.create({
  baseURL: "https://burgerreact-5ab9d.firebaseio.com/",
});
export default instance;
