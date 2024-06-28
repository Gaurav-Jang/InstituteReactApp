// react icons
import { PiStudentFill } from "react-icons/pi";
import { MdClass, MdOutlinePayment } from "react-icons/md";
import OverviewCard from "../OverviewCard/OverviewCard"; // overview card
import Graph from "../Graph/Graph"; // graph
import ProgressBar from "../Progress/ProgressBar"; // progress

const Hero = () => {
  return (
    <>
      <div
        style={{ marginLeft: "250px", marginTop: "49px" }}
        className="flex flex-col  items-center p-4 gap-10 bg-white dark:bg-[#262450]  xs:flex-col xs:items-center xl:flex-row xl:items-start"
      >
        {/* left */}
        <div className="p-0">
          {/* overview cards */}
          <div className="flex items-center justify-between xs:flex-col gap-4 xl:flex-row">
            {/* card 1 */}
            <div>
              <OverviewCard
                title="Total Students"
                count={`1,000`}
                Icon1={<PiStudentFill />}
                IconCol="text-slate-500"
              />
            </div>

            {/* card 2 */}
            <div>
              <OverviewCard
                title="Fee Due"
                count={`$ 10,000`}
                Icon1={<MdOutlinePayment />}
                IconCol="text-blue-500"
              />
            </div>

            {/* card 3 */}
            <div>
              <OverviewCard
                title="Total Classrooms"
                count={40}
                Icon1={<MdClass />}
                IconCol="text-amber-500"
              />
            </div>
          </div>

          {/* graph */}
          <div className="mt-4">
            <Graph />
          </div>
        </div>

        {/* right */}
        <div className="p-0">
          {/* progress */}
          <div className="xs:mb-5 xl:mb-0">
            <ProgressBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
