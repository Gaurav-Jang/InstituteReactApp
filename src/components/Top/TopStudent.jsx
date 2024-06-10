import PropType from "prop-types";

const TopStudent = ({ img, studentName, grade, percentage }) => {
  return (
    <>
      <div className="flex bg-slate-100 justify-between items-center py-1 px-2 rounded-full">
        {/* image */}
        <img src={img} alt="" className="w-12 h-12 rounded-full" />

        {/* name */}
        <div className="px-10 py-4">{studentName}</div>

        {/* class */}
        <div className="px-10 py-4">{grade}</div>

        {/* percentage */}
        <div className="px-10 py-4">{percentage}</div>
      </div>
    </>
  );
};

TopStudent.propTypes = {
  img: PropType.string.isRequired,
  studentName: PropType.string.isRequired,
  grade: PropType.string.isRequired,
  percentage: PropType.string.isRequired,
};

export default TopStudent;
