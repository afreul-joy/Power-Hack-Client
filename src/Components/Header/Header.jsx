function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <img
              className="h-8 w-8 mr-2"
              src="https://cdn.dribbble.com/userupload/3158903/file/original-3f5abe8b99ff4ba4626ddf6660115182.jpg?compress=1&resize=1024x768"
              alt="Logo"
            />
            <span className="text-lg font-semibold">Power Pack</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Paid total:</span>
            <span className="text-green-500 font-bold">$1000.00</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
