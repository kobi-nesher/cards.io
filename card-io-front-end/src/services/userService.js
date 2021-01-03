import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";
const favoritesKey = "favorites";

export async function toggleFavorites(cardId) {
  try {
    const result = await http.patch(
      `${apiUrl}/users/toggle-favorite/${cardId}`
    );
    let favorites = JSON.parse(localStorage.getItem(favoritesKey));
    if (favorites.includes(cardId)) {
      const index = favorites.indexOf(cardId);
      favorites.splice(index, 1);
    } else {
      favorites.push(cardId);
    }
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    return result;
  } catch {}
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(favoritesKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getFavorites() {
  return localStorage.getItem(favoritesKey);
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
  localStorage.setItem(favoritesKey, data.favorites);
}

const user = {
  login,
  getCurrentUser,
  logout,
  getJwt,
  toggleFavorites,
  getFavorites,
};

export default user;
