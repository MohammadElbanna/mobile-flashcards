import React, { Component } from "React";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppButton from "./AppButton";
import { getCardsByDeck } from "../actions";
import { connect } from "react-redux";

class DeckDetails extends Component {
  componentDidMount() {
    const { getCardsByDeck, navigation } = this.props;
    getCardsByDeck(navigation.state.params.deck.title);
  }

  render() {
    const { cardCount, title, navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.deckItem}>
          <Text style={styles.deckName}>{title}</Text>
          <Text style={styles.quantity}>{cardCount} Cards</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <AppButton
            style={styles.bottomMargin}
            secondary
            onPress={() =>
              navigation.navigate("AddCard", { deck: { title, cardCount } })
            }
          >
            Add Card
          </AppButton>

          {cardCount > 0 && (
            <AppButton
              onPress={() => navigation.navigate("Quiz", { deckName: title })}
            >
              Start Quiz
            </AppButton>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  deckName: {
    fontSize: 35,
    paddingBottom: 15,
    textAlign: "center"
  },
  quantity: {
    color: "gray",
    textAlign: "center"
  },
  bottomMargin: {
    marginBottom: 10
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center"
  }
});

const mapStateToProps = (state, props) => {
  const title = props.navigation.state.params.deck.title;
  return {
    cardCount: state.cardsByDeck[title] ? state.cardsByDeck[title].length : 0,
    title: props.navigation.state.params.deck.title
  };
};

export default connect(mapStateToProps, { getCardsByDeck })(DeckDetails);
