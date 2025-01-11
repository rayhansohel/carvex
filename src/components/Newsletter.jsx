const Newsletter = () => {
    return (
      <div className="px-4 w-full ">
      <div className="mb-6 md:mb-20 container mx-auto bg-base-200 rounded-3xl">
        <div className="px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-semibold text-primary mb-4">
              Stay Updated with Carvex
            </h2>
            <p className="max-w-xl mx-auto">
              Subscribe to our newsletter and get the latest news and latest cars recommendations delivered straight to your inbox.
            </p>
          </div>
  
          <div className="flex justify-center">
            <div className="max-w-3xl w-full">
              <div className="flex flex-col md:flex-row items-center bg-base-100 p-6 rounded-full">
              <div className="flex w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 rounded-l-full focus:outline-none bg-base-300"
                />
                <button className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-r-full">
                  Subscribe
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default Newsletter;
  