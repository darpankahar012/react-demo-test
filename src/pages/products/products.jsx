/* eslint-disable no-array-constructor */
import React, { useEffect, useState } from "react";
import Section from "../../components/Sections/Sections";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import NavigationAction from "../../redux/navigation/action";
import CartActions from "../../redux/cart/action";
import axios from "axios";
import vars from "../../utils/vars";
import { Grid } from "react-loader-spinner";
import { CSVLink } from "react-csv";

let { success, error, fetching } = NavigationAction;
let { cartData } = CartActions;

const Index = (props) => {
  const { success, error, fetching, isFetching, cartData, cartItems } = props;
  const [productDetails, setProductDetails] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productArray, setProductArray] = useState([]);
  const [paginate, setPaginate] = useState({
    limit: 10,
    total: 100,
    skip: 0,
    page: 1,
  });
  const [entries, setEntries] = useState(10);
  const [pages, setPages] = useState([]);
  // eslint-disable-next-line
  const [addToCart, setAddToCart] = useState(cartItems);

  const getCategories = async () => {
    fetching(true);
    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .get(`${vars.API_URL}/products/categories`, { headers })
      .then((response) => {
        if (response.status === 200) {
          fetching(false);
          success();
          setCategories(response.data);
        } else {
          fetching(false);
          error();
        }
      })
      .catch((err) => {
        console.log("Error ========>", err);
      });
  };

  const getProducts = async () => {
    fetching(true);
    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .get(`${vars.API_URL}/products?limit=${entries}&skip=${paginate?.skip}`, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          fetching(false);
          success();
          setProductDetails(response.data.products);
          setPaginate({
            ...paginate,
            limit: response.data.limit,
            total: response.data.total,
            skip: response.data.skip,
          });
        } else {
          fetching(false);
          error();
        }
      })
      .catch((err) => {
        console.log("Error ========>", err);
      });
  };

  const getProductsByCategories = async (category) => {
    fetching(true);
    const headers = {
      "Content-Type": "application/json",
    };
    if (category === "all") {
      getProducts();
    } else {
      await axios
        .get(`${vars.API_URL}/products/category/${category}`, {
          headers,
        })
        .then((response) => {
          if (response.status === 200) {
            fetching(false);
            success();
            setProductDetails(response.data.products);
          } else {
            fetching(false);
            error();
          }
        })
        .catch((err) => {
          fetching(false);
          console.log("Error ========>", err);
        });
    }
  };

  const handleCategoryChange = (e) => {
    if (e.target.value === "all") {
      setProductArray([]);
      getProductsByCategories(e.target.value);
    } else {
      // eslint-disable-next-line array-callback-return
      let data = productDetails.filter((x) => {
        if (x.category.toLowerCase() === e.target.value) {
          return x;
        }
      });

      if (data.length > 0) {
        setProductArray(data);
      }
    }
  };

  const handleSearch = (keyword) => {
    // eslint-disable-next-line
    let data = productDetails.filter((x) => {
      if (x.title.toLowerCase().includes(keyword)) {
        return x;
      }
    });

    if (data.length > 0) {
      setProductArray(data);
    }
  };

  const handleNextButton = () => {
    setPages([]);
    if (paginate?.page < 10) {
      setPaginate({
        ...paginate,
        limit: paginate?.limit,
        skip: paginate?.skip + paginate?.limit,
        total: paginate?.total,
        page: paginate?.page + 1,
      });
    }
  };

  const handlePreviousButton = () => {
    setPages([]);
    if (paginate?.page > 1) {
      setPaginate({
        ...paginate,
        limit: paginate?.limit,
        skip: paginate?.skip - paginate?.limit,
        total: paginate?.total,
        page: paginate?.page - 1,
      });
    }
  };

  const handlePageNumberClick = (number) => {
    setPages([]);
    setPaginate({
      ...paginate,
      limit: paginate?.limit,
      skip: number * entries,
      page: number + 1,
    });
  };

  const addItemToCart = (data) => {
    fetching(true);
    if (!addToCart.includes(data.id)) {
      success("Item has been added to cart");
      addToCart.push({
        id: data.id,
        thumbnail: data.thumbnail,
        title: data.title,
        price: data.price,
      });
      fetching(false);
    }
    cartData(addToCart);
  };

  useEffect(() => {
    getProducts();
    getCategories();
    let length = paginate?.total / entries;
    for (let i = 0; i < length; i++) {
      pages.push(i + 1);
    }
    // eslint-disable-next-line
  }, [paginate?.page, entries]);

  return (
    <>
      <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Products{" "}
            <span className="text-xl">
              {" "}
              ( {productDetails?.length} products ){" "}
            </span>
          </h2>
          <div className="mx-auto lg:mx-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-4">
              <div className="text-lg p-6 rounded-lg">
                <label
                  htmlFor="default-search"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Search
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Products."
                    onChange={(e) => handleSearch(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="text-lg p-6 rounded-lg">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select category
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleCategoryChange}
                  defaultValue="all"
                >
                  <option value="all">All</option>
                  {categories &&
                    categories?.length > 0 &&
                    categories.map((cat, key) => (
                      <option key={`category_${key}`} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              <div className="text-lg p-6 rounded-lg">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Show Entries
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    setEntries(e.target.value);
                    setPages([]);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <div className="text-lg p-6 rounded-lg">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Export
                </label>
                <CSVLink
                  filename={"product-details.csv"}
                  data={productDetails}
                  target="_blank"
                >
                  <button
                    className="flex select-none items-center gap-3 rounded-lg bg-gradient-to-tr from-gray-600 to-gray-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-ripple-light="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      ></path>
                    </svg>
                    Export to Excel
                  </button>
                </CSVLink>
              </div>
            </div>
          </div>
          {isFetching ? (
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
          ) : productArray?.length > 0 ? (
            <Section
              paginate={paginate}
              setPaginate={setPaginate}
              productDetails={productArray}
              handleNextButton={handleNextButton}
              handlePreviousButton={handlePreviousButton}
              handlePageNumberClick={handlePageNumberClick}
              pages={pages}
              addItemToCart={addItemToCart}
              cartItems={cartItems}
            />
          ) : (
            <Section
              paginate={paginate}
              setPaginate={setPaginate}
              productDetails={productDetails}
              handleNextButton={handleNextButton}
              handlePreviousButton={handlePreviousButton}
              handlePageNumberClick={handlePageNumberClick}
              pages={pages}
              addItemToCart={addItemToCart}
              cartItems={cartItems}
            />
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.authentication?.userDetails,
    isFetching: state.navigation?.isFetching,
    cartItems: state.cart.cartItems,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { cartData, success, error, fetching })
)(Index);
