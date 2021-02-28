//check to valid item id format
exports.valid_ids = (ids) => {
  if (Array.isArray(ids)) {
    if (ids.some((e) => !e.match(/^[0-9a-fA-F]{24}$/))) {
      return false;
    }
  } else {
    var matcher = new RegExp(/^[0-9a-fA-F]{24}$/);
    if (!matcher.test(ids)) return false;
  }
  return true;
};

exports.remove_duplicates = (start_array) => {
  if (Array.isArray(start_array)) {
    let uniqueArray = start_array.filter(function (item, pos) {
      return start_array.indexOf(item) == pos;
    });
    return uniqueArray;
  }
};
