import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import Home from "./app/components/Home";
import ChatBox from "./app/components/ChatBox";
import CallBox from "./app/components/CallBox";
import ContactSelection from "./app/components/ContactSelection";
import NavigationExperimental from "react-native-deprecated-custom-components";

export default class App extends Component {
  _renderScene(route, navigator) {
    const { state, actions } = this.props;
    const routeId = route.id;

    if (routeId === "home") {
      return <Home {...this.props} navigator={navigator} />;
    } else if (routeId === "chatbox") {
      return (
        <ChatBox
          {...this.props}
          image={route.image}
          name={route.name}
          navigator={navigator}
        />
      );
    } else if (routeId === "callbox") {
      return (
        <CallBox
          {...this.props}
          image={route.image}
          name={route.name}
          navigator={navigator}
        />
      );
    } else if (routeId === "contactselection") {
      return (
        <ContactSelection
          {...this.props}
          type={route.type}
          navigator={navigator}
        />
      );
    }
  }

  _configureScene(route, routeStack) {
    const routeId = route.id;
    if (routeId === "contactselection") {
      return NavigationExperimental.Navigator.SceneConfigs.FloatFromBottom;
    } else {
      return NavigationExperimental.Navigator.SceneConfigs.FloatFromRight;
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationExperimental.Navigator
          style={{ flex: 1 }}
          ref={"NAV"}
          initialRoute={{ id: "home", name: "home" }}
          renderScene={this._renderScene.bind(this)}
          configureScene={this._configureScene.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});
