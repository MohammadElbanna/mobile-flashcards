import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import Decks from "./components/Decks";
import NewDeck from "./components/NewDeck";
import DeckDetails from "./components/DeckDetails";
import Quiz from "./components/Quiz";
import AddCard from "./components/AddCard";
import FlashCardsStatusBar from "./components/FlashStatusBar";
import configureStore from "./configureStore";
import { Provider } from "react-redux";

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="book" size={25} color={tintColor} />
      )
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: "New Deck",
      tabBarIcon: ({ tintColor }) => (
        <Entypo name="new-message" color={tintColor} size={25} />
      )
    }
  }
});

const Stack = StackNavigator({
  MainPage: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.deck.title
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz"
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add Card"
    }
  }
});

export default class App extends React.Component {
  state = {};
  store = configureStore();
  render() {
    return (
      <Provider store={this.store}>
        <View style={{ flex: 1 }}>
          <FlashCardsStatusBar
            backgroundColor="black"
            barStyle="light-content"
          />
          <Stack />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
