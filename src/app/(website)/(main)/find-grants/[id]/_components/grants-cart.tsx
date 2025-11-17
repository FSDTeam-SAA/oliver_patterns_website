// components/GrantCard.tsx
import React from "react";

interface GrantCardProps {
  category: string;
  location: string;
  region: string;
  maxFunding: string;
  minFunding: string;
  totalFundingPool: string;
  competitive: string;
  coContribution: string;
  activities: string;
  industries: string;
  fundingType: string;
  country: string;
  governmentTier: string;
  department: string;
  contact: {
    administration: string;
    phone: string;
    generalWebsite: string;
    programWebsite: string;
    applyNow: string;
  };
}

const GrantCard: React.FC<GrantCardProps> = ({ 
  category, location, region, maxFunding, minFunding, totalFundingPool,
  competitive, coContribution, activities, industries, fundingType,
  country, governmentTier, department, contact
}) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-6 border border-gray-200 mt-10">
      <h2 className="text-2xl font-semibold mb-4">Grant Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div><span className="font-medium">Category:</span> {category}</div>
        <div><span className="font-medium">Location:</span> {location}</div>
        <div><span className="font-medium">Region:</span> {region}</div>
        <div><span className="font-medium">Max Funding:</span> {maxFunding}</div>
        <div><span className="font-medium">Min Funding:</span> {minFunding}</div>
        <div><span className="font-medium">Total Funding Pool:</span> {totalFundingPool}</div>
        <div><span className="font-medium">Competitive:</span> {competitive}</div>
        <div><span className="font-medium">Requires Co-contribution:</span> {coContribution}</div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Activities & Industries</h3>
        <p><span className="font-medium">Activities:</span> {activities}</p>
        <p><span className="font-medium">Industries:</span> {industries}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Funding & Government Info</h3>
        <p><span className="font-medium">Funding Type:</span> {fundingType}</p>
        <p><span className="font-medium">Country:</span> {country}</p>
        <p><span className="font-medium">Government Tier:</span> {governmentTier}</p>
        <p><span className="font-medium">Department:</span> {department}</p>
        <p><span className="font-medium">Max Funding:</span> {maxFunding}</p>
        <p><span className="font-medium">Min Funding:</span> {minFunding}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Contact</h3>
        <p><span className="font-medium">Administration:</span> {contact.administration}</p>
        <p><span className="font-medium">Phone:</span> {contact.phone}</p>
        <p>
          <span className="font-medium">General Website:</span> 
          <a href={contact.generalWebsite} className="text-blue-600 hover:underline ml-1" target="_blank">Visit Website</a>
        </p>
        <p>
          <span className="font-medium">Program Website:</span> 
          <a href={contact.programWebsite} className="text-blue-600 hover:underline ml-1" target="_blank">Visit Website</a>
        </p>
        <p>
          <span className="font-medium">Apply Now:</span> 
          <a href={contact.applyNow} className="text-blue-600 hover:underline ml-1" target="_blank">Visit Website</a>
        </p>
      </div>
    </div>
  );
};

export default GrantCard;
