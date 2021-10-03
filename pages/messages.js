const Messages = () => {
  return (
    <div className="bg-gray-50 w-screen h-screen sm:p-5">
      <div className="bg-white border border-gray-200 rounded flex h-full">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full">
          <div className="border-b border-gray-200 p-3 relative">
            <button className="flex items-center mx-auto select-none font-semibold focus:outline-none">
              Unnati Bamania
            </button>
          </div>

          <div className="flex items-center justify-between text-sm border-b border-gray-200">
            <input
              type="text"
              placeholder="Search"
              className="p-3 w-full bg-gray-100 text-gray-700 "
            />
          </div>

          <ul className="py-1 overflow-auto">
            <li>
              <button className="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
                <img
                  className="w-12 mr-3 rounded-full border"
                  src="https://i.ibb.co/0ZDqmDs/142030673-447983159572512-6561194794076636819-n.jpg"
                  alt="Junior Coders"
                />
                <div className="transform translate-y-0.5 text-left">
                  <h3 className="leading-4">junior.coders</h3>
                  <span className="text-xs text-gray-500">Active 20s ago</span>
                </div>
              </button>
            </li>

            <li>
              <button className="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
                <img
                  className="w-12 mr-3 rounded-full border"
                  src="https://i.ibb.co/n8D3NYv/107410209-890400198133639-1048997058040173171-n.jpg"
                  alt="Tabaghe 16"
                />
                <div className="transform translate-y-0.5 text-left">
                  <h3 className="leading-4">tabaghe16</h3>
                  <span className="text-xs text-gray-500">Active 6h ago</span>
                </div>
              </button>
            </li>

            <li>
              <button className="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
                <img
                  className="w-12 mr-3 rounded-full border"
                  src="https://i.ibb.co/bPb39qC/146062600-790305448495619-4399071814928120955-n.jpg"
                  alt="MegaCoders"
                />
                <div className="transform translate-y-0.5 text-left">
                  <h3 className="leading-4">megacoders</h3>
                  <span className="text-xs text-gray-500">
                    Active 15min ago
                  </span>
                </div>
              </button>
            </li>

            <li>
              <button className="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
                <img
                  className="w-12 mr-3 rounded-full border"
                  src="https://i.ibb.co/Y7H2b8s/83915635-1271088396614888-3530566050498215936-n.jpg"
                  alt="Graphhit"
                />
                <div className="transform translate-y-0.5 text-left">
                  <h3 className="leading-4">graphhit.ir</h3>
                  <span className="text-xs text-gray-500">Active 8h ago</span>
                </div>
              </button>
            </li>

            <li>
              <button className="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
                <img
                  className="w-12 mr-3 rounded-full border"
                  src="https://i.ibb.co/5RTNZzq/120597858-373955600298386-171038155143224317-n.jpg"
                  alt="Dex Design"
                />
                <div className="transform translate-y-0.5 text-left">
                  <h3 className="leading-4">dex.design</h3>
                  <span className="text-xs text-gray-500">
                    Active 30min ago
                  </span>
                </div>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
                <img
                  className="w-12 mr-3 rounded-full border"
                  src="https://i.ibb.co/PgxfpHJ/135397005-118438206790158-4813733027837640666-n.jpg"
                  alt="Khoshbakhti"
                />
                <div className="transform translate-y-0.5 text-left">
                  <h3 className="leading-4">khoshbakhti_official</h3>
                  <span className="text-xs text-gray-500">
                    Active Yesterday
                  </span>
                </div>
              </button>
            </li>
          </ul>
        </div>

        <div className="hidden flex-col sm:w-1/2 md:w-2/3 lg:w-3/4 border-l border-gray-200 sm:flex items-center">
          {/* <div className="space-y-5">
            <div className="border border-black rounded-full inline-flex p-5 items-center justify-center">
              <svg
                className="transform translate-y-1"
                height="52"
                viewBox="0 0 48 48"
                width="52"
              >
                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l13.2 13c.5.4 1.1.6 1.7.3l16.6-8c.7-.3 1.6-.1 2 .5.4.7.2 1.6-.5 2l-15.6 9.9c-.5.3-.8 1-.7 1.6l4.6 19c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.5-.5.5-1.1.2-1.6z"></path>
              </svg>
            </div>
            <div className="space-y-0.5">
              <h1 className="font-semibold text-xl">Your Messages</h1>
              <p className="text-gray-600 min-w-46">
                Send private photos and messages to a friend or group
              </p>
            </div>
            <button className="bg-blue-500 py-1 px-3 rounded text-white select-none focus:outline-none">
              Send Message
            </button>
          </div> */}

          <div className="flex text-left items-center py-4">
            <img
              src="https://ps.w.org/simple-local-avatars/assets/icon-256x256.png?rev=2406995"
              className="h-10 mr-2 w-10 rounded-full"
            />
            <h2 className="text-blue-500 text-xl font-semibold"> Bamania</h2>
          </div>

          <div className="text-left bg-gray-100 text-gray-600 p-2 rounded my-1">
            <p>Samne wale ka message</p>
          </div>
          <div className="text-right bg-blue-100 p-2 rounded text-blue-500 my-1">
            <p>My message</p>
          </div>

          <input
            type="text"
            placeholder="Type your chat..."
            className="w-full align-baseline p-2 bg-gray-100 border border-blue-500 border-2 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
