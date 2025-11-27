import { Button } from "@/components/ui/button";
import { PlanItem } from "./pricing-container";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function PricingCard({
  plan,
  isPopular = false,
}: {
  plan: PlanItem;
  isPopular?: boolean;
}) {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscription/buy/${plan._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Payment failed");
      return res.json();
    },
    onSuccess: (data) => {
      if (data?.data?.url) {
        window.location.href = data.data.url;
      } else {
        toast.error("No payment link received");
      }
    },
    onError: () => toast.error("Subscription failed"),
  });

  return (
    <div
      className={`
        relative rounded-3xl p-8 transition-all duration-300
        ${
          isPopular
            ? "h-full md:h-auto rounded-[26px] bg-[linear-gradient(100deg,#DCE9F8_0%,#C0DEFF_100%)] shadow-[4px_4px_6px_rgba(0,0,0,0.16)] text-[#424242]"
           : "h-full md:h-auto rounded-[26px] border border-[#96C7FF] bg-[#F5F9FF] shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
        }
      `}
      style={{ minHeight: "480px" }}
    >
      {/* MOST POPULAR Badge */}
      {/* {isPopular && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
          <span className="bg-purple-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">
            MOST POPULAR
          </span>
        </div>
      )} */}


      {/* Badge and Name */}
      <div className="mb-6">
        <span className="rounded-[13.5px] py-1 px-8 bg-[#96C7FF] text-xs font-bold text-[#0C2661] leading-[150%]">
          {plan?.name}
        </span>
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
        <p className="text-sm font-medium text-[#616161] leading-[150%]">
          Billed annually (${`${plan?.price * 12}`})
        </p>
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
              <span className="text-sm font-medium text-[#616161] leading-[150%]">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>



      {/* Button */}
      <div className="w-full flex items-center justify-center pt-6 md:pt-8 lg:pt-10">
        <Button
          onClick={() => mutate()}
          disabled={isPending}
          className={`rounded-[24px] bg-[linear-gradient(180deg,#355AC7_0%,#1271F2_100%)] cursor-pointer py-3 px-10 text-[#CCE5FF] text-base ${
            plan?.name === "premium"
              ? "font-bold leading-[120%]"
              : "font-medium leading-[150%]"
          }`}
        >
          {isPending
            ? "Processing..."
            : plan.price === 0
            ? "Get Started Free"
            : `Get ${plan.name.replace("Plan", "")}`}
        </Button>
      </div>
    </div>
  );
}

// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { PlanItem } from "./pricing-container";
// import { useMutation } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";

// export function PricingCard({ plan }: { plan: PlanItem | undefined }) {
//   const session = useSession();
//   const token = (session?.data?.user as { accessToken: string })?.accessToken;

//   const planId = plan?._id;

//   const { mutate, isPending } = useMutation({
//     mutationKey: ["plans", planId],
//     mutationFn: async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/subscription/buy/${planId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (!res.ok) {
//         throw new Error("Subscription failed");
//       }
//       return await res.json();
//     },
//     onSuccess: (data) => {
//       if (!data?.status) {
//         toast?.error(data?.message || "Something went wrong");
//         return;
//       }
//       if (data?.data?.url) {
//         window.location.href = data?.data?.url;
//       } else {
//         toast.error("No redirect URL found");
//       }
//     },
//     onError: () => {
//       toast.error("Something went wrong");
//     },
//   });

//   const handlePayment = () => {
//     mutate();
//   };
//   return (
//     <div
//       className={cn(
//         "rounded-2xl p-8 transition-all duration-300",
//         plan?.name === "Premium"
//           ? "h-full md:h-auto rounded-[26px] bg-[linear-gradient(100deg,#DCE9F8_0%,#C0DEFF_100%)] shadow-[4px_4px_6px_rgba(0,0,0,0.16)] text-[#424242]"
//           : "h-full md:h-auto rounded-[26px] border border-[#96C7FF] bg-[#F5F9FF] shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
//       )}
//     >


//       {/* Badge and Name */}
//       <div className="mb-6">
//         <span className="rounded-[13.5px] py-1 px-8 bg-[#96C7FF] text-xs font-bold text-[#0C2661] leading-[150%]">
//           {plan?.name}
//         </span>
//       </div>

//       {/* Description */}
//       <p className="text-xs font-normal leading-[150%] text-[#424242]">
//         {plan?.title}
//       </p>

//       {/* Price */}
//       <div className="mb-6">
//         <div className="flex items-baseline gap-1 mb-2">
//           <span className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-[#0C2661] leading-[150%]">
//             ${plan?.price}
//           </span>
//           <span className="text-sm md:text-base font-medium text-[#0C2661] leading-[150%]">
//             /{plan?.billingCycle}
//           </span>
//         </div>
//         {/* <p className="text-sm font-medium text-[#424242] leading-[150%]">
//           {billingInfo}
//         </p> */}
//       </div>

//       {/* Features */}
//       <div>
//         <p className="text-lg md:text-xl font-semibold text-[#424242] leading-[150%] pb-4 md:pb-5">
//           What&apos;s included
//         </p>
//         <ul className="space-y-3">
//           {plan?.features?.map((feature, idx) => (
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
//               <span className="text-sm font-medium text-[#616161] leading-[150%]">
//                 {feature}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>



//       {/* CTA Button */}
//       <div className="w-full flex items-center justify-center pt-6 md:pt-8 lg:pt-10">
//         <Button
//           disabled={isPending}
//           onClick={handlePayment}
//           className={`rounded-[24px] bg-[linear-gradient(180deg,#355AC7_0%,#1271F2_100%)] cursor-pointer py-3 px-10 text-[#CCE5FF] text-base ${
//             plan?.name === "Premium"
//               ? "font-bold leading-[120%]"
//               : "font-medium leading-[150%]"
//           }`}
//           size="lg"
//         >
//           {isPending ? "Get Planing..." : `Get ${plan?.name}`}
//         </Button>
//       </div>
//     </div>
//   );
// }








