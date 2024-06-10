// react chart
import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

// students data json file
import onlineStudentData from "../../onlineStudentData.json";
import offlineStudentData from "../../offlineStudentData.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Graph = () => {
  return (
    <>
      <div className="h-[250px] xs:w-[280px] xl:w-auto p-2 bg-[#FEFAF6] dark:bg-[#19173d] rounded-xl">
        <Line
          data={{
            labels: onlineStudentData.map((data) => data.label),
            datasets: [
              // online students data
              {
                label: "online student",
                data: onlineStudentData.map((data) => data.student),
                backgroundColor: "#3b82f6",
                borderColor: "#3b82f6",
              },

              // offline students data
              {
                label: "offline student",
                data: offlineStudentData.map((data) => data.student),
                backgroundColor: "#f59e0b",
                borderColor: "#f59e0b",
              },
            ],
          }}
        />
      </div>
    </>
  );
};

export default Graph;
