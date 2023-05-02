import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import { RouteNames } from "../utils/constants/routes";
import ProductDetails from "../screens/ProductDetails";
import { GlobalStyles } from "../utils/constants/colors";

const { Navigator, Screen } = createNativeStackNavigator();

const MainNavigation = ({ onReady }) => {
  return (
    <NavigationContainer onReady={onReady}>
      <Navigator
        screenOptions={{
          contentStyle: { backgroundColor: GlobalStyles.colors.background },
        }}
        initialRouteName={RouteNames.HOME}
      >
        <Screen
          options={{ headerShown: false }}
          name={RouteNames.HOME}
          component={HomeScreen}
        />
        <Screen
          options={({ route }) => ({
            title: route.params?.product,
            headerBackVisible: false,
            headerLargeTitle: true,
            headerStyle: {
              backgroundColor: GlobalStyles.colors.accent,
            },
            headerLargeTitleStyle: { fontSize: 32 },
          })}
          name={RouteNames.PRODUCT_DETAILS}
          component={ProductDetails}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
