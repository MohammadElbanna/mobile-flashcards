import React, { Component } from "React";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { getAllDecks } from "../actions";
import { setLocalNotification } from "../helpers/utils";

class Decks extends Component {
  componentDidMount() {
    this.props.getAllDecks();
    setLocalNotification();
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%"
        }}
      />
    );
  };

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DeckDetails", { deck: item })}
      >
        <View style={styles.deckItem}>
          <Text style={styles.deckName}>{item.title}</Text>
          <Text style={styles.quantity}>{item.cardCount} Cards</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { decks } = this.props;
    return (
      <View style={styles.decksContainer}>
        {decks &&
          decks.length > 0 && (
            <FlatList
              data={decks}
              ItemSeparatorComponent={this.renderSeparator}
              renderItem={this.renderItem}
              keyExtractor={item => item.title}
            />
          )}
        {decks &&
          !decks.length && (
            <View style={styles.noDeckContainer}>
              <Text style={styles.noDeckText}>No decks to be shown.</Text>
              <Text style={styles.noDeckText}>Please create a new deck.</Text>
            </View>
          )}

        {decks === null && (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  decksContainer: {
    flex: 1
  },
  deckItem: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 35
  },
  deckName: {
    fontSize: 25,
    paddingBottom: 2
  },
  quantity: {
    fontSize: 16,
    color: "gray"
  },
  noDeckContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15
  },
  noDeckText: {
    fontSize: 25,
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  decks: state.decks
});

export default connect(mapStateToProps, { getAllDecks })(Decks);
