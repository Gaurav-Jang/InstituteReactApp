import TopStudent from "./TopStudent";
import Img from "../../assets/logo.png";

const Toppers = () => {
  return (
    <>
      <div>
        <div>
          <h1 className="text-3xl font-bold">Toppers Board</h1>
        </div>

        <div className="mt-5 space-y-3">
          {/* Top 1 */}
          <div>
            <TopStudent
              img={Img}
              studentName="Ayush Kumar"
              grade="10th"
              percentage={`99%`}
            />
          </div>

          {/* Top 2 */}
          <div>
            <TopStudent
              img={Img}
              studentName="Avantika Saini"
              grade="11th"
              percentage={`98%`}
            />
          </div>

          {/* Top 3 */}
          <div>
            <TopStudent
              img={Img}
              studentName="Dilip Yunus"
              grade="12th"
              percentage={`95%`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Toppers;
