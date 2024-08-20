import Graph from "../../assets/images/Graph.png";

const ExpenseTracer = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-gray-100">
      <div className="w-[400px] h-full flex flex-col bg-white mx-auto">
        <div className="flex-1 overflow-y-scroll">
          <div
            className="flex-col gap-2 p-3"
            style={{
              backgroundImage: `linear-gradient(#FFF6E5 0%, #F8EDD8 99%)`,
            }}
          >
            <div className="flex items-center justify-between">
              <img
                src="https://picsum.photos/id/237/536/354"
                className="w-10 h-10 rounded-full border border-red-500 border-solid p-0.5"
                alt=""
                srcSet=""
              />
              <div className="flex items-center gap-1">
                <i className="bx bx-chevron-down text-violet-500"></i>
                <span>October</span>
              </div>
              <span className="bx bxs-bell text-2xl text-violet-500"></span>
            </div>
            <p className="text-xs text-gray-600 text-center">Account balance</p>
            <p className="text-4xl text-center font-bold">$9400</p>
            <ul className="grid grid-cols-2 gap-4 my-3">
              <li className="bg-[#00A86B] p-3 rounded-3xl text-white flex gap-3 items-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white text-gray-500">
                  <i className="bx bx-money text-2xl"></i>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm">Income</p>
                  <p className="text-xl font-bold">$5000</p>
                </div>
              </li>
              <li className="bg-[#FD3C4A] p-3 rounded-3xl text-white flex gap-3 items-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white text-gray-500">
                  <i className="bx bx-money text-2xl"></i>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm">Expenses</p>
                  <p className="text-xl font-bold">$5000</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex-1 px-3">
            <p className="font-semibold py-2">Spend Frequency</p>
            <img src={Graph} alt="" className="w-full my-2 h-32" />
            <div className="py-3">
              <div className="flex justify-between">
                <span className="px-3 py-1.5 rounded-3xl text-[#FCAC12] bg-[#FCEED4] font-semibold cursor-pointer">
                  Today
                </span>
                <span
                  className="px-4 py-2 rounded-xl text-gray-500 text-sm font-semibold cursor-pointer 
            hover:text-[#FCAC12] hover:bg-[#FCEED4]"
                >
                  Week
                </span>
                <span
                  className="px-4 py-2 rounded-xl text-gray-500 text-sm font-semibold cursor-pointer 
            hover:text-[#FCAC12] hover:bg-[#FCEED4]"
                >
                  Month
                </span>
                <span
                  className="px-4 py-2 rounded-xl text-gray-500 text-sm font-semibold cursor-pointer 
            hover:text-[#FCAC12] hover:bg-[#FCEED4]"
                >
                  Year
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">Recent Transaction</p>
              <span className="cursor-pointer bg-[#7F3DFF] text-[#EEE5FF] text-sm px-3 py-1.5 rounded-2xl">
                See All
              </span>
            </div>
            <ul className="flex-col flex gap-8 py-5">
              {[1, 2, 3].map((item) => (
                <li key={item} className="flex gap-2 items-center">
                  <div className="flex items-center gap-2 flex-1">
                    <i className="bx bxs-bowl-hot bg-[#FDD5D7] text-[#FD3C4A] w-14 h-14 text-3xl rounded-2xl flex justify-center items-center"></i>
                    <div className="flex-col flex gap-2">
                      <p className="font-semibold flex-1 text-lg">Shopping</p>
                      <p className="text-gray-500 text-sm">Buy a ramen</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#FD3C4A]">-$120</p>
                    <p className="text-gray-500">10:00 AM</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="flex justify-between items-center p-3">
          <li className="flex justify-center flex-col text-center gap-2 cursor-pointer hover:text-violet-500">
            <i className="bx bx-home-alt-2 text-2xl"></i>
            <p className="-mt-1">Home</p>
          </li>
          <li className="flex justify-center flex-col text-center gap-2 cursor-pointer hover:text-violet-500">
            <i className="bx bx-circle-three-quarter text-2xl"></i>
            <p className="-mt-1">Transaction</p>
          </li>
          <li>
            <i
              className="bx bx-plus bg-violet-500 text-white text-3xl w-12 h-12 rounded-full flex justify-center items-center 
            cursor-pointer"
            ></i>
          </li>
          <li className="flex justify-center flex-col text-center gap-2 cursor-pointer hover:text-violet-500">
            <i className="bx bx-popsicle text-2xl"></i>
            <p className="-mt-1">Budget</p>
          </li>
          <li className="flex justify-center flex-col text-center gap-2 cursor-pointer hover:text-violet-500">
            <i className="bx bx-user text-2xl"></i>
            <p className="-mt-1">Profile</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTracer;
