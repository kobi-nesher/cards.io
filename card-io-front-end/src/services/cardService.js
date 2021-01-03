import http from "./httpService";
import { apiUrl } from "../config.json";

export function searchCards(term) {
  if (term && term.length >= 2) {
    return http.get(`${apiUrl}/cards/search/${term}`);
  }
  let allCards = http.get(`${apiUrl}/cards/all-cards`);

  return allCards;
}

export function sortCardsByOwnedFirst(cards, userId) {
  function compare(a, b) {
    if (a.user_id === userId && b.user_id !== userId) {
      return -1;
    }
    if (a.user_id !== userId && b.user_id === userId) {
      return 1;
    }
    return 0;
  }
  return cards.sort(compare);
}

export function getOtherUsersCards() {
  return http.get(`${apiUrl}/cards/other-users-cards`);
}

export function getAllCards() {
  let allCards = http.get(`${apiUrl}/cards/all-cards`);
  return allCards;
}

export function deleteCard(cardId) {
  return http.delete(`${apiUrl}/cards/${cardId}`);
}

export function getCard(cardId) {
  return http.get(`${apiUrl}/cards/${cardId}`);
}

export function editCard(card) {
  const cardId = card._id;
  delete card._id;
  return http.put(`${apiUrl}/cards/${cardId}`, card);
}

export function getMyCards() {
  return http.get(`${apiUrl}/cards/my-cards`);
}

export function createCard(card) {
  return http.post(`${apiUrl}/cards`, card);
}
const service = {
  createCard,
  getMyCards,
  editCard,
  getCard,
  deleteCard,
  getAllCards,
  getOtherUsersCards,
  sortCardsByOwnedFirst,
  searchCards,
};

export default service;
