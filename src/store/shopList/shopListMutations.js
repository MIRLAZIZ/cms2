export default {
  SET_SHOP_LIST(state, shoplist) {
    state.shoplist = shoplist;
  },
  SET_SHOP_REGION(state, shop_region) {
    state.shop_region = shop_region;
  },
  SET_SHOP_LIST_TWO(state, shoplist_two) {
    state.shoplist_two = shoplist_two;
  },
  SET_ONE_SHOP_LIST(state, data) {
    state.shop = data;
  },
  SET_ONE_SHOP_REGION(state, data) {
    state.shop_one_region = data;
  },
  DELETE_SECOND_PHOTO(state, index) {
    state.shoplist?.results?.second_photo?.splice(index, 1);
  },
}