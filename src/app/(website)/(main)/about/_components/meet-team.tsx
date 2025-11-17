import Image from "next/image";
import React from "react";

const MeetTeam = () => {
  const items = [
    {
      image: "/assets/team-1.png",
      name: "Michael Johnson",
      title: "Founder & CEO",
      desc: "Former grant consultant with 15+ years of experience helping businesses secure funding.",
    },
    {
      image: "/assets/team-2.png",
      name: "Sarah Chen",
      title: "Chief Technology Officer",
      desc: "Tech leader with a passion for creating tools that simplify complex processes for businesses.",
    },
    {
      image: "/assets/team-3.png",
      name: "David Thompson",
      title: "Grant Research Director",
      desc: "Former government advisor with deep knowledge of Australia's grant landscape.",
    },
  ];

  return (
    <div className="bg-[#e7f1fe] py-16 mt-20 ">
      <div className="container mx-auto ">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0c2661]">
            Meet The People Behind Grants
          </h1>
          <p className="mt-2 opacity-70">
            Our diverse team combines expertise in grant funding, business
            development, and technology
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-8 w-full">
          {items.map((item, index) => (
            <div key={index} className="bg-[#b1beff] p-5 rounded-lg">
              <Image
                src={item.image}
                alt="img.png"
                width={1000}
                height={1000}
                className="object-cover rounded-lg mb-4"
              />

              <div className="space-y-1">
                <h1 className="text-xl font-semibold">{item.name}</h1>
                <p className="opacity-90">{item.title}</p>
                <p className="opacity-70">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetTeam;
