import { useState } from "react";

export default function Modal({
  className,
  paymentMethod,
  history,
  cartData,
  orderData,
  cartItems,
}) {
  const [showModal, setShowModal] = useState(false);

  const addPurchasedOrders = () => {
    orderData(cartItems);
  };
  return (
    <>
      <div className="flex items-center justify-center h-60">
        <button
          className={className}
          type="button"
          onClick={() => setShowModal(true)}
          disabled={paymentMethod}
        >
          Place Order
        </button>
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg text-center font-medium text-gray-800">
                      Order Purchased Successfully
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      We would like to extend our heartfelt gratitude for your
                      recent order with us. Thank you for choosing our
                      products/services and placing your trust in our company.
                      We are truly honored to have you as our valued customer.
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        onClick={() => {
                          setShowModal(false);
                          history.push("/orders");
                          addPurchasedOrders();
                          cartData([]);
                        }}
                      >
                        Show Order Summary
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        onClick={() => {
                          setShowModal(false);
                          addPurchasedOrders();
                        }}
                      >
                        Download Order Summary
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
