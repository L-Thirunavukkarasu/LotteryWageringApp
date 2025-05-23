//random lottery number generator based on length val & isEmpty boolean
const RandomLotteryNumbers = (lengthVal: number, isEmpty: boolean) => {
  return Array.from({ length: lengthVal }, () =>
    isEmpty ? -1 : Math.floor(Math.random() * lengthVal)
  );
};

const Strings = {
  app_str_add_play: "Add Play",
  app_str_purchase: "Purchase",
  app_str_list_limit: 3,
  app_str_zero: 0,
  app_str_home_path: "home",
  app_str_home_title: "Home",
  app_str_lottery_path: "lottery",
  app_str_lottery_title: "Lottery",
  app_str_number_selection_msg:
    "Please select the numbers of your choice without duplications.",
  app_str_title_pick_num: "Pick 5 Numbers",
  app_str_random_lottery_num_count: 42,
  app_str_play_numbers: "Play Numbers",
  app_str_init_empty_array_count: 5,
  app_str_number_selection_alert_msg:
    "Please select 5 numbers of your choice to proceed the lottery",
  app_str_delete_row: "delete row",
  app_str_delete_alert_msg: "Are you sure you want to delete this row?",
  app_str_confirmation: "Confirmation",
  app_str_ok: "Ok",
  app_str_cancel: "Cancel",
  app_str_purchase_msg: "Your selections are :",
};

export { RandomLotteryNumbers, Strings };
