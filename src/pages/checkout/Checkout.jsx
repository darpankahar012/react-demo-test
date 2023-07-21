import { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import Modal from "../../components/Modal/Modal";
import CartActions from "../../redux/cart/action";
import OrderActions from "../../redux/orders/action";

let { cartData } = CartActions;
let { orderData } = OrderActions;

/* eslint-disable jsx-a11y/anchor-is-valid */
const Checkout = (props) => {
  const { cartItems, history, cartData, orderData } = props;
  const [paymentMethod, setPaymentMethod] = useState(true);
  let total = 0;

  const handlePaymentMethod = () => {
    setPaymentMethod(false);
  };

  return (
    <div className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
              Secure Checkout
              <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
            </h1>
            <div className="py-5">
              <label
                htmlFor="email"
                className="text-xl font-semibold text-gray-500"
              >
                Payment Method
              </label>
              <div className="flex items-center mt-4">
                <label
                  htmlFor="default-radio-1"
                  className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Cash on Delivery (COD)
                </label>
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  onChange={handlePaymentMethod}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <Modal
              cartData={cartData}
              orderData={orderData}
              history={history}
              paymentMethod={paymentMethod}
              cartItems={cartItems}
              className="inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
            />
          </div>
        </div>
        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Order summary</h2>
          <div>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
          </div>
          <div className="relative">
            <ul className="space-y-5">
              {cartItems &&
                cartItems?.length > 0 &&
                cartItems?.map((product, key) => {
                  total = total + product?.price;
                  return (
                    <li
                      key={`checkout_${key}`}
                      className="flex justify-between"
                    >
                      <div className="inline-flex">
                        <img
                          src={product?.thumbnail}
                          alt=""
                          width={100}
                          height={100}
                        />
                        <div className="ml-3">
                          <p className="text-base font-semibold text-white">
                            {product?.title}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        ₹{product?.price}
                      </p>
                    </li>
                  );
                })}
            </ul>
            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
            <div className="space-y-2">
              <p className="flex justify-between text-lg font-bold text-white">
                <span>Total price:</span>
                <span>₹{total}</span>
              </p>
            </div>
          </div>
          <div className="relative mt-10 text-white">
            <h3 className="mb-5 text-lg font-bold">Support</h3>
            <p className="mt-1 text-sm font-semibold">
              support@yopmail.com <span className="font-light">(Email)</span>
            </p>
            <p className="mt-2 text-xs font-medium">
              Call us now for payment related issues
            </p>
          </div>
          <div className="relative mt-10 flex">
            <p className="flex flex-col">
              <span className="text-sm font-bold text-white">
                Money Back Guarantee
              </span>
              <span className="text-xs font-medium text-white">
                within 30 days of purchase
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state?.navigation?.isFetching,
    cartItems: state?.cart?.cartItems,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { orderData, cartData })
)(Checkout);
