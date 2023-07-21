import { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

const Orders = (props) => {
  const { purchasedOrders } = props;
  let total = 0;
  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Orders
        </h1>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s Cart
            </p>
            {purchasedOrders && purchasedOrders?.length > 0 ? (
              purchasedOrders?.map((product, key) => {
                total = total + product?.price;
                return (
                  <Fragment key={`order_${key}`}>
                    <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                      <div className="pb-4 md:pb-8 w-full md:w-40">
                        <img
                          className="w-full hidden md:block"
                          src={product?.thumbnail}
                          alt="dress"
                        />
                        <img
                          className="w-full md:hidden"
                          src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                          alt="dress"
                        />
                      </div>
                      <div className="border-b border-gray-200 md:flex-row flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                            {product?.title}
                          </h3>
                          <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 text-gray-300">
                                {" "}
                              </span>
                            </p>
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 text-gray-300">
                                {" "}
                              </span>
                            </p>
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 text-gray-300">
                                {" "}
                              </span>{" "}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base dark:text-white xl:text-lg leading-6"></p>
                          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                            ₹{product?.price}{" "}
                          </p>
                          <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                            ₹{product?.price}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })
            ) : (
              <h1>No Purchase Orders</h1>
            )}
          </div>
          {purchasedOrders && purchasedOrders?.length > 0 && (
            <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      ₹{total}
                    </p>
                  </div>

                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      ₹0.00
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    ₹{total}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    purchasedOrders: state?.orders?.purchasedOrders,
  };
};

export default compose(withRouter, connect(mapStateToProps, null))(Orders);
