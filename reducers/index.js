import {
  ADD_CARD,
  ADD_DECK,
  DECKS_READ_FAILURE,
  DECKS_READ_SUCCESS,
  CARDS_READ_SUCCESS,
  CARDS_READ_FAILURE
} from "../actions";
import { combineReducers } from "redux";

const decks = (state = null, action) => {
  switch (action.type) {
    case ADD_DECK:
      return [...state, { title: action.title, cardCount: 0 }];
    case ADD_CARD:
      return state.map(x => {
        x.cardCount =
          x.title === action.deckTitle ? x.cardCount + 1 : x.cardCount;
        return x;
      });
    case DECKS_READ_SUCCESS:
      return action.decks;
    case DECKS_READ_FAILURE:
      return [];
    default:
      return state;
  }
};

const cardsByDeck = (state = {}, action) => {
  switch (action.type) {
    case ADD_DECK:
      return { ...state, [action.title]: [] };
    case ADD_CARD:
      return {
        ...state,
        [action.deckTitle]: [...state[action.deckTitle], action.card]
      };
    case CARDS_READ_SUCCESS:
      return {
        ...state,
        [action.deckTitle]: action.cards
      };
    case CARDS_READ_FAILURE:
      return {
        ...state,
        [action.deckTitle]: []
      };
    default:
      return state;
  }
};

export default combineReducers({
  decks,
  cardsByDeck
});
