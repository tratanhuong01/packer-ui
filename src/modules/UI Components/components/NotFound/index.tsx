const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 -mt-20">
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/free-404-page-not-found-456876.png?f=webp"
          alt=""
          className="mx-auto"
        />
        <p className="text-center text-4xl font-bold">Page not found</p>
        <p className="text-sm text-gray-500 text-center my-5">
          Apologies, but the page you were looking for wasn't found. Try
          reaching for the search button on the nav bar above to look for
          another one.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
