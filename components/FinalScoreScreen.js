import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AppButton from "./AppButton";

const FinalScoreScreen = props => {
  const { correctAnswers, numOfQuestions, onGoBack, onRestartQuiz } = props;
  return (
    <View style={styles.scoreViewContainer}>
      <View>
        <Text>No more questions. Your final score is:</Text>
        <Text style={styles.finalScore}>
          {correctAnswers} out of {numOfQuestions}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton style={styles.bottomMargin} secondary onPress={onGoBack}>
          Go back
        </AppButton>
        <AppButton onPress={onRestartQuiz}>Restart Quiz</AppButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  finalScore: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center"
  },
  bottomMargin: {
    marginBottom: 10
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center"
  },
  scoreViewContainer: {
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    flex: 1
  }
});

export default FinalScoreScreen;
