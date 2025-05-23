import { colors } from "@/assets/colors";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Strings } from "./utills";
import {StyleSheet} from 'react-native'

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerStyle: styles.header_style,
          headerTintColor: colors.app_white_clr,
          headerTitleStyle: styles.header_title_style,
          headerShadowVisible: false, // applied here
        }}
      >
        <Stack.Screen
          name={Strings.app_str_home_path}
          options={{ title: Strings.app_str_home_title }}
        />
        <Stack.Screen
          name={Strings.app_str_lottery_path}
          options={{ title: Strings.app_str_lottery_title }}
        />
      </Stack>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header_style: {
    backgroundColor: colors.app_bg_theme,
  },
  header_title_style: {
    fontWeight: "bold",
  },
});
