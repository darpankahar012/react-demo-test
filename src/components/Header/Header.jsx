/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ userDetails, cartItems }) => {
  const [menuOpen, setMenu] = useState(false);

  const openMenu = () => {
    setMenu(true);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <header className="bg-white border-solid border-b-2">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/profile" className="-m-1.5 p-1.5">
            <img
              width={150}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/TT_Electronics_logo.svg/335px-TT_Electronics_logo.svg.png"
              alt=""
            />
            <span className="m-1 font-medium"></span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={openMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/dashboard"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            My Profile
          </Link>
          <Link
            to="/orders"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            My Orders
          </Link>
          <Link
            to="/cart"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cart ({cartItems?.length})
          </Link>
        </div>
      </nav>

      {menuOpen ? (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/home" className="-m-1.5 p-1.5">
                <img className="h-10 w-auto" src={userDetails?.image} alt="" />
                <span className="mt-4 font-medium">
                  {userDetails?.firstName} {userDetails?.lastName}
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={closeMenu}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={closeMenu}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/cart"
                    onClick={closeMenu}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Cart ({cartItems?.length})
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
