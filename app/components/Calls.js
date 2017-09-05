import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ListView,
  Image,
  View,
  TouchableOpacity
} from "react-native";
import { fetch } from "fetch";
import Icon from "react-native-vector-icons/MaterialIcons";
import { WHATSAPP_CALLS_API } from "../data/data";
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
class Calls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleDataSource: ds.cloneWithRows([]),
      loaded: false
    };
  }
  render() {
    return this.state.loaded ? (
      <ListView
        initialListSize={5}
        enableEmptySections={true}
        dataSource={this.state.peopleDataSource}
        renderRow={person => {
          return this.renderPersonRow(person);
        }}
      />
    ) : (
      <Text
        onPress={() => {
          this.props.navigator.push({ id: "chatbox" });
        }}
      >
                Retrieving Chats...
      </Text>
    );
  }
  renderPersonRow(person) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigator.push({
            id: "callbox",
            image: person.image,
            name: person.first_name
          });
        }}
      >
        <View style={styles.listItemContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={{ uri: person.image }}
              style={styles.initStyle}
              resizeMode="contain"
            />
          </View>
          <View style={styles.callerDetailsContainer}>
            <View style={styles.callerDetailsContainerWrap}>
              <View style={styles.nameContainer}>
                <Text>{person.first_name}</Text>
                <View style={styles.dateContainer}>
                  <Icon
                    name={person.missed ? "call-missed" : "call-received"}
                    size={15}
                    color={person.missed ? "#ed788b" : "#075e54"}
                  />
                  <Text
                    style={{ fontWeight: "400", color: "#666", fontSize: 12 }}
                  >
                    {person.date} {person.time}
                  </Text>
                </View>
              </View>
              <View style={styles.callIconContainer}>
                <Icon
                  name="phone"
                  color="#075e54"
                  size={23}
                  style={{ padding: 5 }}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  componentDidMount() {
    fetch(WHATSAPP_CALLS_API)
      .then(response => response.json())
      .then(data => {
        this.setState({
          peopleDataSource: ds.cloneWithRows(data),
          loaded: true
        });
      });
  }
}
const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-start"
  },
  callerDetailsContainer: {
    flex: 4,
    justifyContent: "center",
    borderBottomColor: "rgba(92,94,94,0.5)",
    borderBottomWidth: 0.25
  },
  callerDetailsContainerWrap: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row"
  },
  nameContainer: {
    alignItems: "flex-start",
    flex: 1
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  callIconContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  initStyle: {
    borderRadius: 30,
    width: 60,
    height: 60
  }
});
module.exports = Calls;
