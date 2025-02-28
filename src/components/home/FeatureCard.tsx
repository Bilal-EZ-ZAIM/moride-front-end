import React from "react";

const FeatureCard = ({ icon, title, description }: any) => {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className="text-white">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
