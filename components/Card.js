import React, { Component } from "React";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import * as Animatable from "react-native-animatable";

class Card extends Component {
  render() {
    const { card, flipCard, showAnswer } = this.props;
    const questionTransform = {
      transform: [{ rotateY: showAnswer ? "180deg" : "0deg" }],
      zIndex: showAnswer ? -1 : 1000,
      opacity: showAnswer ? 0 : 1,
      position: "absolute"
    };
    const answerTransform = {
      transform: [{ rotateY: showAnswer ? "0deg" : "-180deg" }],
      zIndex: showAnswer ? 1000 : -1,
      opacity: showAnswer ? 1 : 0
    };

    return (
      <View key={card.id} style={styles.cardContainer}>
        <Animatable.View
          transition={["rotateY", "opacity"]}
          style={[questionTransform, { position: "absolute" }, styles.cardFace]}
        >
          <Text style={styles.question}>{card.question}</Text>
          <TouchableOpacity
            disabled={showAnswer ? true : false}
            onPress={flipCard}
            style={styles.answerButton}
          >
            <Text style={styles.flipCardText}>Answer</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          transition={["rotateY", "opacity"]}
          style={[answerTransform, styles.cardFace]}
        >
          <Text style={styles.question}>{card.answer}</Text>
          <TouchableOpacity
            style={styles.answerButton}
            disabled={showAnswer ? false : true}
            onPress={flipCard}
          >
            <Text style={styles.flipCardText}>Question</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  cardFace: {
    backfaceVisibility: "hidden",
    flex: 1,
    justifyContent: "center"
  },
  flipCardButton: {
    flex: 1
  },
  flipCardText: {
    color: "red",
    textAlign: "center"
  },
  question: {
    fontSize: 35,
    marginBottom: 20,
    textAlign: "center"
  },
  answerButton: {
    height: 40,
    justifyContent: "center"
  }
});

export default Card;
