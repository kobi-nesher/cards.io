import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import cardService from "../services/cardService";
import Card from "./card";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import userService from "../services/userService";

class MyCards extends Component {
  state = {
    cards: [],
    favorites: [],
  };

  async componentDidMount() {
    const { data } = await cardService.getMyCards();
    const favorites = await userService.getFavorites();
    const user = await userService.getCurrentUser();

    if (data.length > 0) this.setState({ cards: data, favorites, user });
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
    await userService.toggleFavorites(cardId);
    const favorites = await userService.getFavorites();
    this.setState({ favorites });
  };

  render() {
    const { cards, user, favorites } = this.state;
    return (
      <div className="container">
        <PageHeader titleText="Your Cards List" />
        <div className="row">
          <div className="col-12">
            <p>Here you can view all the cards you created</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p>
              <Link className="btn btn-primary" to="/create-card">
                <i className="fas fa-plus-circle"></i>
                <span className="ml-1">Add Card</span>
              </Link>
            </p>
          </div>
        </div>
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
                  <p>When you create a card it will appear on this page.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MyCards;
