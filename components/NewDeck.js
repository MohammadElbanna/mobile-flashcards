import React, { Component } from "React";
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Button,
  Alert,
  TextInput
} from "react-native";
import AppButton from "./AppButton";
import { connect } from "react-redux";
import { addDeck } from "../actions";

class NewDeck extends Component {
  state = {
    deckName: ""
  };

  addDeck = () => {
    if (this.state.deckName.trim() === "") {
      Alert.alert(
        "Error",
        "Deck name must not be empty.",
        [
          {
            text: "Ok"
          }
        ],
        { cancelable: false }
      );
      return;
    }
    this.props.addDeck(this.state.deckName, () => {
      this.props.navigation.navigate("DeckDetails", {
        deck: { title: this.state.deckName, cardCount: 0 }
      });
      this.setState({ deckName: "" });
    });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ deckName: text })}
          value={this.state.deckName}
          placeholder="Enter deck name..."
        />
        <AppButton onPress={this.addDeck}>Submit</AppButton>
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
  label: {
    fontSize: 40,
    width: "90%",
    marginBottom: 20,
    textAlign: "center"
  },
  input: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textDecorationLine: "underline",
    marginBottom: 40
  }
});

export default connect(undefined, { addDeck })(NewDeck);
