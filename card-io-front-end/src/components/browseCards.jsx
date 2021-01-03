import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import cardService from "../services/cardService";
import Card from "./card";
import userService from "../services/userService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SearchBox from "./common/searchBox";

class BrowseCards extends Component {
  state = {
    cards: [],
    favorites: [],
    term: "",
  };

  componentDidMount = async () => {
    const favorites = userService.getFavorites();
    const { data } = await cardService.getAllCards();
    const user = await userService.getCurrentUser();
    const sortedCards = cardService.sortCardsByOwnedFirst(data, user._id);

    if (sortedCards.length > 0)
      this.setState({ cards: sortedCards, favorites, user });
  };

  handleToggleFavorites = async (cardId) => {
    await userService.toggleFavorites(cardId);
    const favorites = await userService.getFavorites();
    this.setState({ favorites });
  };

  handleDelete = (cardId) => {
    const { cards } = this.state;

    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this card!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.value) {
        try {
          await cardService.deleteCard(cardId);
          const filteredCards = cards.filter((card) => card._id !== cardId);
          this.setState({ cards: filteredCards });
          toast.success("The card has been deleted.");
        } catch {}
      }
    });
  };

  handleSearchTermChange = async (searchTerm) => {
    this.setState({ term: searchTerm });
  };

  handleSearch = async () => {
    const { term } = this.state;
    const { data } = await cardService.searchCards(term);
    if (data.length > 0) {
      this.setState({ cards: data });
    } else {
      const cards = await cardService.getAllCards();
      this.setState({ cards: cards });
    }
  };

  render() {
    const { cards, favorites, user } = this.state;
    return (
      <div className="container">
        <PageHeader titleText="Browse Cards" />
        <div className="row">
          <div className="col-12">
            <p>Here you can browse other users cards list</p>
          </div>
        </div>
        <SearchBox
          onSearchTermChange={this.handleSearchTermChange}
          handleSearch={() => this.handleSearch()}
        />

        <div className="row">
          {cards.length > 0 &&
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                owner={user._id === card.user_id}
                isLiked={favorites.includes(card._id)}
                handleToggleFavorites={() =>
                  this.handleToggleFavorites(card._id)
                }
                handleDelete={() => this.handleDelete(card._id)}
              />
            ))}
          {!cards.length && (
            <div className="container">
              <PageHeader titleText="No cards found..." />
              <div className="row">
                <div className="col-12">
                  <p>Try a different search term.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BrowseCards;
