import React, { Component } from "React";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import * as Animatable from "react-native-animatable";
import Card from "./Card";
import AppButton from "./AppButton";
import FinalScoreScreen from "./FinalScoreScreen";
import { connect } from "react-redux";
import { setLocalNotification, clearLocalNotification } from "../helpers/utils";

class Quiz extends Component {
  cardList = null;
  correctAnswers = 0;

  state = {
    showAnswer: false,
    isDeckEnd: false,
    currentIndex: 1
  };

  nextCard = isCorrect => {
    isCorrect && this.correctAnswers++;
    if (this.state.currentIndex === this.props.questions.length) {
      this.setState({
        isDeckEnd: true,
        currentIndex: 1,
        showAnswer: false
      });
      this.cardList.scrollToIndex({ index: 0 });
      clearLocalNotification().then(setLocalNotification);
    } else {
      this.cardList.scrollToIndex({ index: this.state.currentIndex });
      this.setState(currState => ({
        showAnswer: false,
        currentIndex: currState.currentIndex + 1
      }));
    }
  };

  flipCard = () => {
    this.setState({
      showAnswer: !this.state.showAnswer
    });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  restartQuiz = () => {
    this.setState({
      isDeckEnd: false
    });
    this.correctAnswers = 0;
  };

  render() {
    const { isDeckEnd, showAnswer, currentIndex } = this.state;
    const { questions } = this.props;
    return (
      <View style={styles.container}>
        {!isDeckEnd && (
          <Text style={styles.questionTracker}>
            {currentIndex} / {questions.length}
          </Text>
        )}
        {!isDeckEnd && (
          <FlatList
            horizontal
            scrollEnabled={false}
            extraData={{ showAnswer }}
            data={questions}
            ref={ref => (this.cardList = ref)}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Card
                card={item}
                flipCard={this.flipCard}
                showAnswer={this.state.showAnswer}
              />
            )}
          />
        )}

        {!isDeckEnd && (
          <View style={[styles.buttonsContainer, { flexGrow: 0.25 }]}>
            <AppButton
              style={styles.correct}
              onPress={() => this.nextCard(true)}
            >
              Correct
            </AppButton>
            <AppButton style={styles.incorrect} onPress={() => this.nextCard()}>
              Incorrect
            </AppButton>
          </View>
        )}

        {isDeckEnd && (
          <FinalScoreScreen
            correctAnswers={this.correctAnswers}
            numOfQuestions={questions.length}
            onGoBack={this.goBack}
            onRestartQuiz={this.restartQuiz}
          />
        )}
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
  imageContainer: {
    borderColor: "green",
    borderWidth: 5
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center"
  },
  correct: {
    marginBottom: 10,
    backgroundColor: "green"
  },
  incorrect: {
    backgroundColor: "red"
  },
  questionTracker: {
    alignSelf: "flex-start",
    padding: 6
  }
});

const mapStateToProps = (state, props) => {
  return {
    questions: state.cardsByDeck[props.navigation.state.params.deckName]
  };
};

export default connect(mapStateToProps)(Quiz);
