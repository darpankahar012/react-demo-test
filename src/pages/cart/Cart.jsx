import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import { Grid } from "react-loader-spinner";

const Cart = (props) => {
  const { isFetching, cartItems, history } = props;
  let total = 0;

  return isFetching ? (
    <div className="h-screen flex items-center justify-center">
      <Grid
        height="40"
        width="40"
        color="#ee502e"
        ariaLabel="grid-loading"
        radius="12.5"
        visible={true}
      />
    </div>
  ) : (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          {cartItems && cartItems?.length > 0 ? (
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {cartItems?.length} Items
              </h2>
            </div>
          ) : (
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          )}
          {cartItems && cartItems?.length > 0 ? (
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-3/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
          ) : null}

          {cartItems && cartItems?.length > 0 ? (
            cartItems.map((product, key) => {
              total = total + product?.price;
              return (
                <div
                  key={`cart_${key}`}
                  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                >
                  <div className="flex w-3/5">
                    <div className="w-20">
                      <img className="h-24" src={product?.thumbnail} alt="" />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">
                        {product?.title}
                      </span>
                    </div>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    ₹{product?.price}
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    ₹{product?.price}
                  </span>
                </div>
              );
            })
          ) : (
            <h1>No items in cart</h1>
          )}
        </div>

        {cartItems && cartItems?.length > 0 ? (
          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items ({cartItems?.length})
              </span>
              <span className="font-semibold text-sm">₹{total}</span>
            </div>

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>₹{total}</span>
              </div>
              <button
                onClick={() => history.push("/checkout")}
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
              >
                Checkout
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.navigation?.isFetching,
    cartItems: state.cart.cartItems,
  };
};

export default compose(withRouter, connect(mapStateToProps, null))(Cart);
