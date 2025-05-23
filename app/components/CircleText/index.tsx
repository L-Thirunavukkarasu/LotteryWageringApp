import { colors } from "@/assets/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type circleTextProps = {
  value: any;
  isLastItem?: boolean;
  showBorderBgClr?: boolean;
  showBgClr?: boolean;
  onTxtPicked?: (num:any) => void;
};

const CircleText = ({
  value,
  isLastItem,
  showBorderBgClr,
  showBgClr,
  onTxtPicked,
}: circleTextProps) => {
  return (
    <TouchableOpacity
      onPress={() => onTxtPicked && onTxtPicked(value)}
      key={value}
      style={[
        styles.view_lottery_num,
        isLastItem && styles.view_lottery_num_last,
        showBorderBgClr && styles.view_lottery_num_border_bg,
        showBgClr && styles.view_lottery_num_bg,
      ]}
    >
      <Text
        style={[
          styles.txt_lottery_num,
          showBgClr && styles.txt_lottery_num_white,
        ]}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
};

export default CircleText;

const styles = StyleSheet.create({
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
  view_lottery_num_border_bg: {
    borderWidth: 1,
    borderColor: colors.app_gray_clr,
    marginBottom: 10,
  },
  view_lottery_num_bg: {
    backgroundColor: colors.app_light_black_clr,
    borderWidth: 0,
  },
  txt_lottery_num_white: {
    color: colors.app_white_clr,
  },
});
