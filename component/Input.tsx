export default function Input() {
    return (
      <label htmlFor="search" className="bg-white label h-[57px] flex justify-center items-center w-[100%] px-[50px]">
        <div className="flex items-center bg-white rounded-full justify-between shadow-lg px-4 py-2 w-full max-w-sm search-input">
          <button className="focus:outline-none">
            <img src="/icons/arrow.svg" alt="arrow" />
          </button>
          <input
            id="search"
            type="text"
            className="flex-grow ml-2 text-gray-500 placeholder-gray-400 focus:outline-none text-[18px]"
            placeholder="Search here"
          />
          <button className="focus:outline-none">
          <img src="/icons/micro.svg" alt="micro" />
          </button>
        </div>
      </label>


    );
  }
  