"use client";

import { Banknote, Search } from "lucide-react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { loanColumns } from "./columns-loan";
import { LoanApplication } from "./columns-loan";

interface FormData {
  name: string;
  amount: string;
  time: string;
  job: string;
  reason: string;
  addr: string;
  terms: boolean;
  terms2: boolean;
}

export const UserDashboard = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    amount: "",
    time: "",
    job: "",
    reason: "",
    addr: "",
    terms: false,
    terms2: false,
  });

  const [loans, setLoans] = useState<LoanApplication[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await axios.post("/api/forms", formData);

    const data = await res.data;

    console.log(data);

    toast.success("Loan application submitted successfully");
    setFormData({
      name: "",
      amount: "",
      time: "",
      job: "",
      reason: "",
      addr: "",
      terms: false,
      terms2: false,
    });
    fecthUser();
  };

  const fecthUser = async () => {
    const res = await axios.get(`/api/user/myLoans`);
    const data = await res.data;
    setLoans(data["loans"]);
  };

  useEffect(() => {
    fecthUser();
  }, []);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = event.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="my-10 flex items-center justify-between">
        <div className="flex items-center gap-4 h-full">
          <div className="bg-[#6B9908] p-3 flex items-center justify-center">
            <Banknote className="text-white size-10 " />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-[#6B9908]">DEFICIT</h1>
            <div className="flex gap-1">
              <span className="text-[10px] text-[#6B9908]">$</span>
              <p className="font-extrabold text-xl text-[#6B9908]">0.0</p>
            </div>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#6B9908] shadow-lg hover:bg-[#6b9908cf]">
              Get a Loan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <form onSubmit={handleSubmit} className="grid gap-8 py-4">
              <DialogHeader>
                <DialogTitle>Apply for a loan</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2  gap-6">
                <div>
                  <Label htmlFor="name" className="text-right">
                    Full name as it appears on bank account
                  </Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    id="name"
                    placeholder="Full name as it appears on bank account"
                  />
                </div>
                <div>
                  <Label htmlFor="amount" className="text-right">
                    How much do you need?
                  </Label>
                  <Input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="How much do you need?"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="time" className="text-right">
                    Loan tenure (in months)
                  </Label>
                  <Input
                    type="number"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    id="time"
                    placeholder="Loan tenure (in months)"
                  />
                </div>
                <div>
                  <Label htmlFor="job" className="text-right">
                    Employment status
                  </Label>
                  <Input
                    type="text"
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                    id="job"
                    placeholder="Employment status"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2  gap-6">
                <div>
                  <Label htmlFor="reason" className="text-right">
                    Reason for loan
                  </Label>
                  <Input
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    id="reason"
                    placeholder="Reason for loan"
                  />
                </div>
                <div>
                  <Label htmlFor="addr" className="text-right">
                    Employment address
                  </Label>
                  <Input
                    id="addr"
                    type="text"
                    name="addr"
                    value={formData.addr}
                    onChange={handleChange}
                    placeholder="Employment address"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="mr-2"
                    id="terms"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have read the important information and accept that by
                    completing the application I will be bound by the terms
                  </Label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="terms2"
                    checked={formData.terms2}
                    onChange={handleChange}
                    id="terms2"
                    className="mr-2"
                  />
                  <Label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Any personal and credit information obtained may be
                    disclosed from time to time to other lenders, credit bureaus
                    or other credit reporting agencies.
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button className="bg-[#0A5210] hover:[#0A512F]" type="submit">
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full">
        <Tabs defaultValue="borrow_cash" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="borrow_cash">Borrow Cash</TabsTrigger>
            <TabsTrigger value="transact">Transact</TabsTrigger>
            <TabsTrigger value="deposit_cash">Deposit Cash</TabsTrigger>
          </TabsList>
          <div className="flex items-center justify-center my-10">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={"Seach for loans..."}
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-full"
              />
            </div>
          </div>
          <TabsContent value="borrow_cash" className="flex justify-center">
            <DataTable role="User" columns={loanColumns} data={loans} />
          </TabsContent>
          <TabsContent value="transact" className="flex  justify-center">
            <div>tranasct</div>
          </TabsContent>
          <TabsContent value="deposit_cash" className="flex  justify-center">
            <div>lelellele</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
