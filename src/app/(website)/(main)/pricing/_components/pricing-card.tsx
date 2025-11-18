import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlanItem } from "./pricing-container";

export function PricingCard({
  plan
}: {plan: PlanItem | undefined}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-8 transition-all duration-300",
        plan?.name === "Premium"
          ? "h-full md:h-[580px] rounded-[26px] bg-[linear-gradient(100deg,#DCE9F8_0%,#C0DEFF_100%)] shadow-[4px_4px_6px_rgba(0,0,0,0.16)] text-[#424242]"
          : "h-full md:h-[450px] rounded-[26px] border border-[#96C7FF] bg-[#F5F9FF] shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
      )}
    >
      {/* Badge and Name */}
      <div className="mb-6">
        <span className="rounded-[13.5px] py-1 px-8 bg-[#96C7FF] text-xs font-bold text-[#0C2661] leading-[150%]">{plan?.name}</span>
      </div>

      {/* Description */}
      <p className="text-xs font-normal leading-[150%] text-[#424242]">
        {plan?.title}
      </p>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-[#0C2661] leading-[150%]">
            ${plan?.price}
          </span>
          <span className="text-sm md:text-base font-medium text-[#0C2661] leading-[150%]">
            /{plan?.billingCycle}
          </span>
        </div>
        {/* <p className="text-sm font-medium text-[#424242] leading-[150%]">
          {billingInfo}
        </p> */}
      </div>

      {/* Features */}
      <div>
        <p className="text-lg md:text-xl font-semibold text-[#424242] leading-[150%] pb-4 md:pb-5">
          What&apos;s included
        </p>
        <ul className="space-y-3">
          {plan?.features?.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  opacity="0.1"
                  d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z"
                  fill="#0C2661"
                />
                <path
                  d="M15.7741 6.83362L10.07 14.5745C9.93392 14.7549 9.73107 14.8732 9.50698 14.9027C9.28289 14.9321 9.05636 14.8703 8.87829 14.7311L4.80496 11.4745C4.44552 11.1868 4.38731 10.6622 4.67496 10.3028C4.96261 9.94334 5.48718 9.88514 5.84663 10.1728L9.2433 12.8903L14.4325 5.84778C14.6026 5.59244 14.8993 5.45127 15.2048 5.48032C15.5103 5.50936 15.7751 5.70393 15.894 5.98676C16.013 6.2696 15.967 6.59494 15.7741 6.83362Z"
                  fill="#0C2661"
                />
              </svg>
              <span className="text-sm font-medium text-[#616161] leading-[150%]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* CTA Button */}
      <div className="w-full flex items-center justify-center pt-6 md:pt-8 lg:pt-10">
        <Button
          className={`rounded-[24px] bg-[linear-gradient(180deg,#355AC7_0%,#1271F2_100%)] cursor-pointer py-3 px-10 text-[#CCE5FF] text-base ${
            plan?.name === "Premium" ? "font-bold leading-[120%]" : "font-medium leading-[150%]"
          }`}
          size="lg"
        >
          Get {plan?.name}
        </Button>
      </div>
    </div>
  );
}





// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// interface PricingCardProps {
//   name: string;
//   badge?: string;
//   price: number;
//   period: string;
//   description: string;
//   billingInfo: string;
//   features: string[];
//   buttonText: string;
//   buttonVariant: "default" | "outline";
//   featured?: boolean;
// }

// export function PricingCard({
//   name,
//   price,
//   period,
//   description,
//   billingInfo,
//   features,
//   buttonText,
//   buttonVariant,
//   featured = false,
// }: PricingCardProps) {
//   return (
//     <div
//       className={cn(
//         "rounded-2xl p-8 transition-all duration-300",
//         featured
//           ? "h-full md:h-[660px] rounded-[26px] bg-[linear-gradient(100deg,#DCE9F8_0%,#C0DEFF_100%)] shadow-[4px_4px_6px_rgba(0,0,0,0.16)] text-[#424242]"
//           : "h-full md:h-[500px] rounded-[26px] border border-[#96C7FF] bg-[#F5F9FF] shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
//       )}
//     >
//       {/* Badge and Name */}
//       <div className="mb-6">
//         <span className="rounded-[13.5px] py-1 px-8 bg-[#96C7FF] text-xs font-bold text-[#0C2661] leading-[150%]">{name}</span>
//       </div>

//       {/* Description */}
//       <p className="text-xs font-normal leading-[150%] text-[#424242]">
//         {description}
//       </p>

//       {/* Price */}
//       <div className="mb-6">
//         <div className="flex items-baseline gap-1 mb-2">
//           <span className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-[#0C2661] leading-[150%]">
//             ${price}
//           </span>
//           <span className="text-sm md:text-base font-medium text-[#0C2661] leading-[150%]">
//             /{period}
//           </span>
//         </div>
//         <p className="text-sm font-medium text-[#424242] leading-[150%]">
//           {billingInfo}
//         </p>
//       </div>

//       {/* Features */}
//       <div>
//         <p className="text-lg md:text-xl font-semibold text-[#424242] leading-[150%] pb-4 md:pb-5">
//           What&apos;s included
//         </p>
//         <ul className="space-y-3">
//           {features.map((feature, idx) => (
//             <li key={idx} className="flex items-start gap-3">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//               >
//                 <path
//                   opacity="0.1"
//                   d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z"
//                   fill="#0C2661"
//                 />
//                 <path
//                   d="M15.7741 6.83362L10.07 14.5745C9.93392 14.7549 9.73107 14.8732 9.50698 14.9027C9.28289 14.9321 9.05636 14.8703 8.87829 14.7311L4.80496 11.4745C4.44552 11.1868 4.38731 10.6622 4.67496 10.3028C4.96261 9.94334 5.48718 9.88514 5.84663 10.1728L9.2433 12.8903L14.4325 5.84778C14.6026 5.59244 14.8993 5.45127 15.2048 5.48032C15.5103 5.50936 15.7751 5.70393 15.894 5.98676C16.013 6.2696 15.967 6.59494 15.7741 6.83362Z"
//                   fill="#0C2661"
//                 />
//               </svg>
//               <span className="text-sm font-medium text-[#616161] leading-[150%]">{feature}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//       {/* CTA Button */}
//       <div className="w-full flex items-center justify-center pt-6 md:pt-8 lg:pt-10">
//         <Button
//           className={`rounded-[24px] bg-[linear-gradient(180deg,#355AC7_0%,#1271F2_100%)] cursor-pointer py-3 px-10 text-[#CCE5FF] text-base ${
//             featured ? "font-bold leading-[120%]" : "font-medium leading-[150%]"
//           }`}
//           variant={featured ? "secondary" : buttonVariant}
//           size="lg"
//         >
//           {buttonText}
//         </Button>
//       </div>
//     </div>
//   );
// }
