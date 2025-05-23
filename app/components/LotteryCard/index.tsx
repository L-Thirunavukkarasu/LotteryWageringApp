import { Strings } from "@/app/utills";
import { colors } from "@/assets/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CircleText from "../CircleText";

type cardProps = {
  onCardPress?: () => void;
  onCardDelete?: () => void;
  cardItems?: Number[];
};

const LotteryCard = ({ onCardPress, cardItems, onCardDelete }: cardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onCardPress && onCardPress()}
    >
      <View style={styles.view_lottery}>
        {cardItems?.map((num, i) => {
          const isLastItem = cardItems?.length - 1 == i;
          return (
            <CircleText
              value={num}
              isLastItem={isLastItem}
              key={num.toString()}
              onPressDisabled={true}
            />
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.btn_delete_row}
        onPress={() => onCardDelete && onCardDelete()}
      >
        <Text>{Strings.app_str_delete_row}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default LotteryCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.app_light_gray_clr,
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  view_lottery: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
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
  btn_delete_row: {
    backgroundColor: colors.app_gray_clr,
    width: "30%",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 5,
    marginVertical: 7,
  },
});
