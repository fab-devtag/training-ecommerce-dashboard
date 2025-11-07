import { Stats } from "fs";

interface StatsCardProps {
  title: string;
  value: number;
  icon?: string;
}
export const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <div className="bg-black rounded-lg shadow shadow-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-100">{value}</p>
        </div>
        {icon && <span className="text-4xl">{icon}</span>}
      </div>
    </div>
  );
};
