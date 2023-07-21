import Rating from "react-rating";
import Pagination from "../../components/Pagination/Pagination";

/* eslint-disable jsx-a11y/anchor-is-valid */
const ProductSection = (props) => {
  const {
    productDetails,
    paginate,
    handleNextButton,
    handlePreviousButton,
    handlePageNumberClick,
    pages,
    addItemToCart,
  } = props;

  return (
    <>
      <Pagination
        flag="top"
        paginate={paginate}
        handleNextButton={handleNextButton}
        handlePreviousButton={handlePreviousButton}
        handlePageNumberClick={handlePageNumberClick}
        pages={pages}
      />
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-2 sm:pt-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {productDetails && productDetails?.length > 0
          ? productDetails?.map((product, key) => {
              return (
                <div
                  key={`product_${key}`}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <a href="#">
                    <img
                      className="rounded-t-lg"
                      src={product?.thumbnail}
                      alt=""
                    />
                  </a>

                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {product?.title}{" "}
                    </h5>
                    <div className="flex items-center gap-x-4 text-xs">
                      <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                        {product?.brand}
                      </span>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {product?.description}
                    </p>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <span className="absolute inset-0"></span>
                          Price: ₹{product?.price} /-
                        </p>
                        <p className="text-gray-600 pt-1">
                          <Rating initialRating={product?.rating} readonly />
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          addItemToCart({
                            id: product?.id,
                            thumbnail: product?.thumbnail,
                            title: product?.title,
                            price: product?.price,
                          })
                        }
                        className="bottom-1.5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <Pagination
        flag="bottom"
        paginate={paginate}
        handleNextButton={handleNextButton}
        handlePreviousButton={handlePreviousButton}
        handlePageNumberClick={handlePageNumberClick}
        pages={pages}
      />
    </>
  );
};

export default ProductSection;
