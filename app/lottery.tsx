import CircleText from "@/app/components/CircleText";
import { colors } from "@/assets/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { updateSelectedNum } from "./redux/slices/lotterySlice";
import { RandomLotteryNumbers, Strings } from "./utills";

const Lottery = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  //router params
  const params = useLocalSearchParams();
  const { pickedNumbers } = params;
  const isNotEmptyArray = JSON.parse(pickedNumbers as any)?.length > 0;
  const pickedNUmbersArray: any = isNotEmptyArray
    ? JSON.parse(pickedNumbers as any)
    : RandomLotteryNumbers(Strings.app_str_init_empty_array_count, true);
  const [items, setItems] = useState(pickedNUmbersArray);

  const onNumberPicked = (num: number) => {
    //find the selected number index
    const updateValIndex = items.indexOf(-1);
    //if selected number doesn't exit only process to add the selection
    if (!items.includes(num)) {
      setItems((prevItems: any[]) =>
        prevItems.map((item, i) => (i === updateValIndex ? num : item))
      );
    } else {
      //else show the alert
      Alert.alert(Strings.app_str_number_selection_msg);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.view_lottery}>
        {items?.map((num: any, i: number) => {
          const isLastItem = items?.length - 1 == i;

          return (
            <CircleText
              value={num != -1 ? num : ""}
              key={i}
              showBorderBgClr={true}
              isLastItem={isLastItem}
            />
          );
        })}
      </View>
      <View style={styles.view_random_numbers}>
        <Text style={styles.txt_lottery_num}>
          {Strings.app_str_title_pick_num}
        </Text>
        <ScrollView showsVerticalScrollIndicator>
          <View style={styles.view_pick_numbers}>
            {RandomLotteryNumbers(
              Strings.app_str_random_lottery_num_count,
              false
            )?.map((item, i) => {
              //check wheather the selected number is matching from the array or not
              const isMatch = items.indexOf(i + 1) != -1;
              return (
                <CircleText
                  value={i + 1}
                  key={i}
                  showBorderBgClr={true}
                  showBgClr={isMatch}
                  onTxtPicked={(num) => onNumberPicked(num)}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.btn_purchase}
        onPress={() => {
          if (!items.includes(-1)) {
            //save selected lottery numbers into store
            dispatch(updateSelectedNum(items));
            router.back();
          } else {
            Alert.alert(Strings.app_str_number_selection_alert_msg);
          }
        }}
      >
        <Text style={styles.btn_txt_purchase}>
          {Strings.app_str_play_numbers}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.app_white_clr,
  },
  view_lottery: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.app_bg_theme,
    paddingVertical: 20,
  },
  view_lottery_num: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.app_white_clr,
    justifyContent: "center",
    alignItems: "center",
    marginEnd: 10,
  },
  view_lottery_num_last: {
    marginEnd: 0,
  },
  txt_lottery_num: {
    fontSize: 17,
    fontWeight: "700",
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
    alignSelf: "center",
  },
  btn_txt_purchase: {
    color: colors.app_white_clr,
    fontSize: 17,
    fontWeight: "700",
  },
  view_random_numbers: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  view_pick_numbers: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "center",
  },
});

export default Lottery;
