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
import { WHATSAPP_CONTACTS_API } from "../data/data";
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleDataSource: ds.cloneWithRows([]),
      loaded: false
    };
  }
  render() {
    return (
      <ListView
        initialListSize={5}
        enableEmptySections={true}
        dataSource={this.state.peopleDataSource}
        renderRow={person => {
          return this.renderPersonRow(person);
        }}
      />
    );
  }
  renderPersonRow(person) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigator.push({
            id: "chatbox",
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
                <Text style={{ fontWeight: "bold" }}>{person.first_name}</Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={{ fontSize: 11 }}>
                  {person.mobile ? "MOBILE" : "WORK"}
                </Text>
              </View>
            </View>
            <View style={styles.messageContainer}>
              <Text
                numberOfLines={1}
                style={{ flex: 1, fontSize: 12, color: "#777" }}
              >
                {person.message}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  componentDidMount() {
    fetch(WHATSAPP_CONTACTS_API)
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
    alignItems: "flex-end"
  },
  messageContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  initStyle: {
    borderRadius: 30,
    width: 60,
    height: 60
  }
});
module.exports = Contacts;
