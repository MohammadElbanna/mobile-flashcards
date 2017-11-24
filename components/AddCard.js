import React, { Component } from "React";
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert
} from "react-native";
import AppButton from "./AppButton";
import { addCardToDeck } from "../actions";
import { connect } from "react-redux";

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  addNewCard = () => {
    if (this.state.question.trim() === "" || this.state.answer.trim() === "") {
      Alert.alert(
        "Error",
        "All Fields cannot be empty.",
        [
          {
            text: "Ok"
          }
        ],
        { cancelable: false }
      );
      return;
    }
    const { question, answer } = this.state;
    const { addCardToDeck, navigation } = this.props;
    addCardToDeck(
      navigation.state.params.deck.title,
      {
        question,
        answer
      },
      () => {
        navigation.goBack();
      }
    );
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Question</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ question: text })}
            value={this.state.question}
            placeholder="Enter Question"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Answer</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ answer: text })}
            value={this.state.answer}
            placeholder="Enter Your Answer..."
          />
        </View>

        <AppButton style={styles.submitButton} onPress={this.addNewCard}>
          Submit
        </AppButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "85%",
    marginBottom: 10
  },
  label: {
    fontSize: 15,
    marginBottom: 5
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textDecorationLine: "underline",
    marginBottom: 15
  },
  submitButton: {
    marginTop: 20
  }
});

export default connect(undefined, { addCardToDeck })(AddCard);
