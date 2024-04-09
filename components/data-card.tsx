import { Landmark, LucideIcon } from "lucide-react";

const DataCard = ({
  icon: Icon,
  data,
  title,
}: {
  icon?: LucideIcon;
  data: number;
  title: string;
}) => {
  return (
    <div className="w-[270px] h-24 flex items-center border shadow-md">
      <div className="w-[30%] h-full flex items-center justify-center text-white bg-[#0A512F]">
        {Icon && <Icon className="size-10" />}
      </div>
      <div className="w-[70%] p-4">
        <p className="text-xl font-semibold">{data}</p>
        <p className="font-semibold">{title}</p>
      </div>
    </div>
  );
};

export default DataCard;
