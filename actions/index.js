import { AsyncStorage } from "react-native";

const DECK_KEY = "FlashCards:DECK_KEY";

export const DECKS_READ_SUCCESS = "DECKS_READ_SUCCESS";
export const DECKS_READ_FAILURE = "DECKS_READ_FAILURE";
export const CARDS_READ_SUCCESS = "CARDS_READ_SUCCESS";
export const CARDS_READ_FAILURE = "CARDS_READ_FAILURE";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export const getAllDecks = () => async dispatch => {
  try {
    //AsyncStorage.clear();
    const decks = await AsyncStorage.getItem(DECK_KEY);
    dispatch({
      type: DECKS_READ_SUCCESS,
      decks: decks ? JSON.parse(decks) : []
    });
  } catch (e) {
    dispatch({
      type: DECKS_READ_FAILURE
    });
  }
};

export const addDeck = (title, onSuccess) => async (dispatch, getState) => {
  dispatch({
    type: ADD_DECK,
    title
  });
  const allDecks = getState().decks;
  await AsyncStorage.setItem(DECK_KEY, JSON.stringify(allDecks));
  await AsyncStorage.setItem(title, JSON.stringify([]));
  onSuccess();
};

export const addCardToDeck = (deckTitle, card, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: ADD_CARD,
    deckTitle,
    card: {
      ...card,
      id: Date.now()
    }
  });
  const cards = getState().cardsByDeck[deckTitle];
  const allDecks = getState().decks;
  await AsyncStorage.setItem(deckTitle, JSON.stringify(cards));
  await AsyncStorage.setItem(DECK_KEY, JSON.stringify(allDecks));
  onSuccess();
};

export const getCardsByDeck = deckTitle => async dispatch => {
  try {
    const cards = await AsyncStorage.getItem(deckTitle);
    dispatch({
      type: CARDS_READ_SUCCESS,
      deckTitle,
      cards: cards ? JSON.parse(cards) : []
    });
  } catch (e) {
    dispatch({
      type: CARDS_READ_FAILURE,
      deckTitle
    });
  }
};
