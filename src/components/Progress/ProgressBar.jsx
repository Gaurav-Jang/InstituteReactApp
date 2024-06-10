import { HiChevronDown } from "react-icons/hi"; // react icons

import Progress from "./Progress"; // progress file

const ProgressBar = () => {
  return (
    <>
      <div className="p-3 rounded-xl bg-[#FEFAF6] dark:bg-[#19173d] xs:w-[280px] xl:w-[300px] xxl:w-[350px]">
        {/* top */}
        <div className="flex justify-between">
          <h1 className="text-xl font-bold dark:text-white">Earning</h1>
          <button className="flex font-semibold items-center gap-1 px-3 py-1 bg-slate-100 rounded-full dark:bg-slate-700 dark:text-white">
            Month <HiChevronDown className="text-xl" />
          </button>
        </div>

        {/* progress */}
        <div className="flex justify-center mt-14">
          <Progress />
        </div>

        {/* color item */}
        <div className="flex justify-between mt-14">
          {/* color 1 */}
          <div className="flex justify-center items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-500"></div>
            <p className="font-bold dark:text-white">Sales</p>
          </div>

          {/* color 2 */}
          <div className="flex justify-center items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <p className="font-bold dark:text-white">Profit</p>
          </div>

          {/* color 3 */}
          <div className="flex justify-center items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <p className="font-bold dark:text-white">Growth</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
