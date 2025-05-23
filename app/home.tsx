import LotteryCard from "@/app/components/LotteryCard";
import { deleteSelectedRow } from "@/app/redux/slices/lotterySlice";
import { Strings } from "@/app/utills";
import { colors } from "@/assets/colors";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";

const HomeScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //set screen title
  useEffect(() => {
    navigation.setOptions({ title: Strings.app_str_home_title });
  }, [navigation]);

  //set redux store data into local property
  const lotteryData = useSelector((state: RootState) => state.lottery)
    ? useSelector((state: RootState) => state.lottery.selectedNumbers)
    : [];

  //navigation redirection to lottery screen
  const onRedirection = (array: number[]) => {
    router.push({
      pathname: "/lottery",
      params: { pickedNumbers: JSON.stringify(array) },
    });
  };

  const onDeleteCard = (array: number[]) => {
    Alert.alert(Strings.app_str_confirmation, Strings.app_str_delete_alert_msg, [
      {
        text: Strings.app_str_cancel,
        onPress: () => {},
        style: "cancel",
      },
      {
        text: Strings.app_str_ok,
        onPress: () => {
          //filter the selected card items to delete
          const filteredArray = lotteryData.filter(
            (subArray) => JSON.stringify(subArray) !== JSON.stringify(array)
          );
          //update the latest data into redux store
          dispatch(deleteSelectedRow(filteredArray));
        },
      },
    ]);
    //filter the selected card items to delete
    const filteredArray = lotteryData.filter(
      (subArray) => JSON.stringify(subArray) !== JSON.stringify(array)
    );
    //update the latest data into redux store
    dispatch(deleteSelectedRow(filteredArray));
  };

  return (
    <View style={styles.container}>
      <View style={styles.list_container}>
        {lotteryData && lotteryData?.length > Strings.app_str_zero && (
          <FlatList
            data={lotteryData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <LotteryCard
                cardItems={item}
                onCardPress={() => onRedirection(item)}
                onCardDelete={() => onDeleteCard(item)}
              />
            )}
          />
        )}
      </View>

      {lotteryData && lotteryData?.length < Strings.app_str_list_limit && (
        <>
          <TouchableOpacity
            style={styles.btn_add_play}
            onPress={() => onRedirection([])}
          >
            <Text style={styles.btn_txt_add_play}>
              {Strings.app_str_add_play}
            </Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.btn_purchase}>
        <Text style={styles.btn_txt_purchase}>{Strings.app_str_purchase}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.app_white_clr,
    alignItems: "center",
    paddingVertical: 20,
  },
  list_container: { maxHeight: "70%", width: "90%" },
  text: {
    color: colors.app_white_clr,
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: colors.app_white_clr,
  },
  btn_purchase: {
    width: "90%",
    height: 50,
    padding: 10,
    borderRadius: 50,
    backgroundColor: colors.app_bg_theme,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: "6%",
  },
  btn_txt_purchase: {
    color: colors.app_white_clr,
    fontSize: 17,
    fontWeight: "700",
  },
  btn_add_play: {
    width: "90%",
    height: 50,
    padding: 10,
    borderRadius: 50,
    borderColor: colors.app_bg_theme,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    borderWidth: 2,
  },
  btn_txt_add_play: {
    color: colors.app_bg_theme,
    fontSize: 17,
    fontWeight: "700",
  },
});

export default HomeScreen;
