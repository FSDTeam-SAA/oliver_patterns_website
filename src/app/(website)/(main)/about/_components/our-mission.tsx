import Image from "next/image";

const OurMission = () => {
  return (
    <div className="container mx-auto mt-20">
      <div className="flex items-start justify-between">
        <div className="lg:w-1/2 text-justify">
          <h1 className="text-[#0c2661] text-2xl font-bold mb-5">
            Our Missions
          </h1>

          <div className="space-y-5 opacity-70">
            <p>
              Grants.com is your all-in-one platform for discovering, managing,
              and applying for business grants across Australia. We understand
              that navigating the world of grants can be complex,
              time-consuming, and often overwhelming — which is why we have
              designed a seamless platform to simplify the entire process.
            </p>

            <p>
              Our platform combines a comprehensive and constantly updated
              database of Australian business grants with powerful AI-driven
              tools to deliver tailored recommendations, helping you quickly
              find opportunities that match your business profile, industry, and
              growth goals. Whether you are a startup, small business, or
              established company, Grants.com ensures that no opportunity is
              missed.
            </p>

            <p>
              Beyond our database and search tools, we provide expert consultant
              support, offering guidance at every step of the application
              process. From understanding eligibility requirements to preparing
              submissions and tracking deadlines, our team is dedicated to
              helping you increase your chances of success.
            </p>

            <p>
              Our mission is to make the grant application process simple,
              efficient, and transparent, empowering Australian businesses to
              access the funding they need to grow, innovate, and succeed. By
              combining technology, expertise, and user-friendly design,
              Grants.com equips you with the knowledge, tools, and support to
              confidently pursue and secure business funding.
            </p>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-end">
          <Image
            src={"/assets/our-missions.png"}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-[550px] w-[650px]"
          />
        </div>
      </div>
    </div>
  );
};

export default OurMission;
