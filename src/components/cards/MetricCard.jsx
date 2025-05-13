import React from "react";
import { TrendingUp, TrendingDown, Activity, Clock, AlertCircle, CheckCircle } from "lucide-react";

const MetricCard = ({ label, value, icon, trend, percentage, trendType = "neutral", onClick }) => {
  // Choose icon component based on the icon prop
  const IconComponent = () => {
    switch (icon) {
      case "activity":
        return <Activity className="w-5 h-5 text-[#8a3aff]" />;
      case "time":
        return <Clock className="w-5 h-5 text-[#8a3aff]" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-[#8a3aff]" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-[#8a3aff]" />;
      default:
        return <Activity className="w-5 h-5 text-[#8a3aff]" />;
    }
  };

  // Determine trend colors and icons
  const getTrendContent = () => {
    if (!trend) return null;

    let bgColor, textColor, TrendIcon;
    
    if (trendType === "positive") {
      bgColor = "bg-green-50";
      textColor = "text-green-600";
      TrendIcon = TrendingUp;
    } else if (trendType === "negative") {
      bgColor = "bg-red-50";
      textColor = "text-red-600";
      TrendIcon = TrendingDown;
    } else {
      bgColor = "bg-blue-50";
      textColor = "text-blue-600";
      TrendIcon = TrendingUp;
    }

    return (
      <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${bgColor} ${textColor} text-xs font-medium`}>
        <TrendIcon className="w-3 h-3" />
        <span>{percentage}%</span>
      </div>
    );
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#8a3aff]/10">
            <IconComponent />
          </div>
          <h3 className="text-sm font-medium text-gray-600">{label}</h3>
        </div>
        {getTrendContent()}
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default MetricCard;
