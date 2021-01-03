import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import cardService from "../services/cardService";
import Card from "./card";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import userService from "../services/userService";

class SavedCards extends Component {
  state = {
    cards: [],
    favorites: [],
  };

  async componentDidMount() {
    const { data } = await cardService.getAllCards();
    const favorites = await userService.getFavorites();
    const favoritedCards = [];
    data.forEach((card) => {
      if (card && favorites.includes(card._id)) {
        favoritedCards.push(card);
      }
    });

    this.setState({ cards: favoritedCards, favorites });
  }

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

  handleToggleFavorites = async (cardId) => {
    let { cards } = this.state;
    cards = cards.filter((card) => card._id !== cardId);
    await userService.toggleFavorites(cardId);
    const favorites = await userService.getFavorites();
    this.setState({ favorites, cards });
  };

  render() {
    const { cards, user, favorites } = this.state;
    return (
      <div className="container">
        <PageHeader titleText="Saved cards" />
        <div className="row">
          <div className="col-12">
            <p>Here you can view all the cards you saved</p>
          </div>
        </div>
        <div className="row">
          {cards.length > 0 &&
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                owner={user && user._id === card.user_id}
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
                  <p>Your saved cards will appear on this page.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SavedCards;
