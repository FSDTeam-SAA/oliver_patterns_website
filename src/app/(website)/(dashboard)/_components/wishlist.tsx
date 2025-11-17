"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {} from "@/components/ui/pagination";
import { DeleteContent } from "./delete-contact";

interface Contact {
  _id: string;
  userId: string | null;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  subject: string;
  message: string;
  status: "unread" | "read";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalData: number;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: {
    items: Contact[];
    paginationInfo: PaginationInfo;
  };
}

const WishList = () => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const { data: wishlists, isLoading } = useQuery<ApiResponse>({
    queryKey: ["wishlists"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      return data;
    },
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading contacts...</div>
        </div>
      </div>
    );
  }

  const contacts = wishlists?.data?.items || [];

  return (
    <div className="container mx-auto py-6">
      <div className="border border-gray-200">
        <div>
          <Table>
            <TableHeader className="bg-[#deeeff] h-[45px]">
              <TableRow>
                <TableHead className="text-center opacity-85">Name</TableHead>
                <TableHead className="text-center opacity-85">Email</TableHead>
                <TableHead className="text-center opacity-85">Phone</TableHead>
                <TableHead className="text-center opacity-85">
                  Company
                </TableHead>
                <TableHead className="text-center opacity-85">
                  Subject
                </TableHead>
                <TableHead className="text-center opacity-85">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell className="text-center opacity-85 h-[45px] border-t border-b-0 border-gray-200">
                    {contact.name}
                  </TableCell>
                  <TableCell className="text-center opacity-85 h-[45px] border-t border-b-0 border-gray-200">
                    {contact.email}
                  </TableCell>
                  <TableCell className="text-center opacity-85 h-[45px] border-t border-b-0 border-gray-200">
                    {contact.phone}
                  </TableCell>
                  <TableCell className="text-center opacity-85 h-[45px] border-t border-b-0 border-gray-200">
                    {contact.companyName}
                  </TableCell>
                  <TableCell className="text-center opacity-85 h-[45px] border-t border-b-0 border-gray-200">
                    {contact.subject}
                  </TableCell>

                  <TableCell className="text-center opacity-85 h-[45px] border-t border-b-0 border-gray-200">
                    <DeleteContent id={contact?._id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default WishList;
