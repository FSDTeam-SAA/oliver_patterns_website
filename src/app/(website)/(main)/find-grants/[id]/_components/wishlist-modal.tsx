"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const WishlistModal = ({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTExYmE3YWY3NGEwNmYwZDI0MGRkMjgiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc2MzAwODExMiwiZXhwIjoxNzYzNjEyOTEyfQ.jIb5kAtSMnFRmu44ORk9JxgfXHEFuy3GtSVZcSsUJxg"
  const { mutate, isPending } = useMutation({
    mutationKey: ["add-wishlist", id],
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/wishlist/${id}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
      );
      return res.json();
    },
    onSuccess: (data)=>{
        if(!data?.status){
            toast.error(data?.message || "Failed to add wishlist");
            return;
        }
        else{
            toast.success("Successfully added to wishlist");
            onClose();
        }
    }
  });

  const handleWishlist = () =>{
    mutate();
    
  }
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white rounded-[16px]">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-[22px] lg:text-2xl font-semibold text-[#0C2661] leadign-[120%] pb-2 text-center">
              Added To your Wishlist
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base font-normal text-[#424242] leading-[150%] text-center">
              See your Wishlist
            </DialogDescription>
          </DialogHeader>
          <div className="pt-2">
            <button onClick={handleWishlist} disabled={isPending} className="w-full rounded-lg bg-[linear-gradient(180deg,#355AC7_0%,#1271F2_100%)] cursor-pointer py-4 px-8 text-base md:text-lg font-medium text-[#F5F5F5] leading-[120%]">
              {isPending ? "Connecting..." : "Continue"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WishlistModal;
