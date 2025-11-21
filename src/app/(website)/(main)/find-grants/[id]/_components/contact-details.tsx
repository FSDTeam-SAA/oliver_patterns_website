"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required.",
  }),
  companyName: z.string().min(1, {
    message: "Company name is required.",
  }),
  subject: z.string().min(1, {
    message: "Subject is required.",
  }),
  message: z.string().min(1, {
    message: "Message is required.",
  }),
});

// Define TypeScript type from the schema
type FormData = z.infer<typeof formSchema>;

const ContactDetails = () => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      subject: "",
      message: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["contact"],
    mutationFn: async (data: FormData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Failed to send message: ${res.statusText}`);
      }

      return await res.json();
    },
    onSuccess: () => {
      form.reset();
      toast.success("Message sent successfully!");
    },
    onError: (error: Error) => {
      console.error("Error sending message:", error);
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      await mutateAsync(values);
    } catch (error) {
      console.log("error from contact: ", error);
    }
  };

  return (
   <div className="bg-[linear-gradient(91deg,#CCE5FF_3.19%,#D7E8FB_96.81%)] py-5 md:py-7 lg:py-9 px-4 md:px-0">
     <div className="container mx-auto">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0C2661] leading-[150%] pb-4 md:pb-6 lg:pb-8">Need help applying for this grant? Send your contact details below.</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-5 w-full">
            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base md:text-lg font-semibold text-[#0C2661] leading-[150%]">Full Name</FormLabel>
                    <FormControl>
                      <Input className="text-base font-semibold text-[#0C2661] leading-[150%]" placeholder="Name Here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base md:text-lg font-semibold text-[#0C2661] leading-[150%]">Email Address</FormLabel>
                    <FormControl>
                      <Input className="text-base font-semibold text-[#0C2661] leading-[150%]" placeholder="Email Here" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 w-full">
            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base md:text-lg font-semibold text-[#0C2661] leading-[150%]">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                      className="text-base font-semibold text-[#0C2661] leading-[150%]"
                        placeholder="Phone Number Here"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem> 
                    <FormLabel className="text-base md:text-lg font-semibold text-[#0C2661] leading-[150%]">Company Name</FormLabel>
                    <FormControl>
                      <Input className="text-base font-semibold text-[#0C2661] leading-[150%]" placeholder="Company Name Here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Add the missing subject field */}
          <div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-lg font-semibold text-[#0C2661] leading-[150%]">Subject</FormLabel>
                  <FormControl>
                    <Input className="text-base font-semibold text-[#0C2661] leading-[150%]" placeholder="Subject Here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-lg font-semibold text-[#0C2661] leading-[150%]">Message ( Optional )</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your message here..."
                      className="h-[140px] text-base md:text-base font-semibold text-[#0C2661] leading-[150%]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="text-left pt-4">
            <Button
              disabled={isPending}
              type="submit"
              className="h-[45px] disabled:cursor-not-allowed text-white cursor-pointer px-10 py-2 text-base md:text-lg font-semibold leading-[150%]"
            >
              {isPending ? "Sending ..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
   </div>
  );
};

export default ContactDetails;

