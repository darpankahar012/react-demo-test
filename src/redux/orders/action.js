const orderActions = {
  PURCHASED_ORDER: "PURCHASED_ORDER",

  orderData: (data) => {
    return {
      type: orderActions.PURCHASED_ORDER,
      purchasedOrders: data,
    };
  },
};

export default orderActions;
