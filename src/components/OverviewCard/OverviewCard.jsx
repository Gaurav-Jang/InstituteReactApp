import PropTypes from "prop-types"; // prop type

const OverviewCard = ({ title, count, Icon1, IconCol }) => {
  return (
    <div className="p-3 w-60 h-32 flex flex-col justify-between rounded-xl bg-[#FEFAF6] dark:bg-[#19173d]">
      <div className="flex items-center gap-4">
        {/* icon */}
        <div className={`text-3xl rounded-lg p-1 ${IconCol} bg-slate-950`}>
          {Icon1}
        </div>

        {/* text */}
        <h1 className="text-lg font-medium dark:text-white">{title}</h1>
      </div>

      <div className="flex justify-start">
        {/* text */}
        <h1 className="font-bold text-xl dark:text-white">{count}</h1>
      </div>
    </div>
  );
};

OverviewCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  Icon1: PropTypes.node.isRequired,
  IconCol: PropTypes.node.isRequired,
};

export default OverviewCard;
