import React from "react";
import { StyleSheet, Text, View, ListView, Image } from "react-native";
import { fetch } from "fetch";
import Icon from "react-native-vector-icons/MaterialIcons";
import ScrollableTabView from "react-native-scrollable-tab-view";
import Calls from "./app/components/Calls";
import Contacts from "./app/components/Contacts";
import Chats from "./app/components/Chats";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }
  getIcon() {
    if (this.state.selected === 0) {
      return "call";
    } else if (this.state.selected === 1) {
      return "chat";
    } else {
      return "person-add";
    }
  }
  handleChangeTab(index) {
    this.setState({ selected: index.i });
  }

  renderPersonRow(person) {
    return (
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
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.leftHeaderContainer}>
            <Text style={styles.logoText}>WhatsApp</Text>
          </View>
          <View style={styles.rightHeaderContainer}>
            <Icon name="search" color="#fff" size={23} style={{ padding: 5 }} />
            <Icon
              name={this.getIcon()}
              color="#fff"
              size={23}
              style={{ padding: 5 }}
            />
            <Icon
              name="more-vert"
              color="#fff"
              size={23}
              style={{ padding: 5 }}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <ScrollableTabView
            tabBarUnderlineColor="#fff"
            tabBarUnderlineStyle={{ backgroundColor: "#fff" }}
            tabBarBackgroundColor="#075e54"
            tabBarActiveTextColor="#fff"
            tabBarInactiveTextColor="#88b0ac"
            onChangeTab={index => this.handleChangeTab(index)}
          >
            <Calls tabLabel="CALLS" {...this.props} />
            <Chats tabLabel="CHATS" {...this.props} />
            <Contacts tabLabel="CONTACTS" {...this.props} />
          </ScrollableTabView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    height: 24
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#075e54",
    alignItems: "center",
    paddingRight: 5
  },
  leftHeaderContainer: {
    alignItems: "flex-start",
    flexDirection: "row"
  },
  rightHeaderContainer: {
    alignItems: "flex-end",
    flexDirection: "row"
  },
  contentContainer: {
    flex: 6
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "flex-start",
    marginLeft: 10
  }
});
