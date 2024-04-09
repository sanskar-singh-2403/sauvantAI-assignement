"use client";

import { columns, LoanApplication } from "@/components/columns";
import { columnsVerifier } from "@/components/columns-verifier";
import DataCard from "@/components/data-card";
import { DataTable } from "@/components/data-table";
import axios from "axios";
import {
  Banknote,
  Coins,
  Landmark,
  PiggyBank,
  ReceiptIcon,
  UserCheck,
  UserMinus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [userRole, setUserRole] = useState("");

  const [statData, setStatData] = useState();

  const [adminTableData, setAdminTableData] = useState<LoanApplication[]>([]);
  const [verifierTableData, setVerifierTableData] = useState<LoanApplication[]>(
    []
  );

  const fetchStats = async () => {
    const res = await axios.get("/api/statistics");
    const data = await res.data;
    setStatData(data);
  };

  const fetchLoans = async () => {
    const res = await axios.get(`/api/admin`);
    const data = await res.data;
    setAdminTableData(data["loans"]);
  };

  const fetchVerifyLoans = async () => {
    const res = await axios.get(`/api/verifier`);
    const data = await res.data;
    setVerifierTableData(data["loans"]);
  };

  const fetchUserRole = async () => {
    const res = await axios.get("/api/user/role");
    const data = await res.data;
    setUserRole(data.role);
    console.log(data, "roroorororo");
  };

  useEffect(() => {
    fetchUserRole();
    fetchStats();

    if (userRole === "Admin") {
      fetchLoans();
    } else if (userRole === "Verifier") {
      fetchVerifyLoans();
    }
  }, [userRole]);

  return (
    <div className="max-w-[1200px] mx-auto mt-10">
      {userRole === "Admin" ? (
        <div>
          <div>
            <div className="container mx-auto py-10">
              <div className="mb-10 grid grid-cols-4 gap-4 w-full">
                <DataCard
                  icon={Users}
                  title="ACTIVE USERS"
                  data={statData?.activeUsers || 0}
                />
                <DataCard
                  icon={UserMinus}
                  title="BORROWERS"
                  data={statData?.borrowers || 0}
                />
                <DataCard
                  icon={Banknote}
                  title="CASH DISBURSED"
                  data={statData?.cashDisbursed._sum.amount || 0}
                />
                <DataCard
                  icon={ReceiptIcon}
                  title="CASH RECEIVED"
                  data={statData?.paidLoansAmount._sum.amount || 0}
                />
              </div>
              <div className="mb-10 grid grid-cols-4 gap-4">
                <DataCard
                  icon={PiggyBank}
                  title="SAVINGS"
                  data={statData?.cashDisbursed._sum.amount || 0}
                />
                <DataCard
                  icon={UserCheck}
                  title="REPAID LOANS"
                  data={statData?.paidLoansCount}
                />
                <DataCard
                  icon={Landmark}
                  title="OTHER ACCOUNTS"
                  data={statData?.otherAccounts}
                />
                <DataCard
                  icon={Coins}
                  title="LOANS"
                  data={statData?.loansCount}
                />
              </div>
              <div>
                <div>
                  <h1 className="text-2xl font-semibold mb-10">Recent Loans</h1>
                </div>
                <DataTable
                  role="admin"
                  columns={columns}
                  data={adminTableData}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className="container mx-auto py-10">
              <div className="mb-10 grid grid-cols-3 gap-4 w-full">
                <DataCard
                  icon={Coins}
                  title="LOANS"
                  data={statData?.loansCount}
                />
                <DataCard
                  icon={UserMinus}
                  title="BORROWERS"
                  data={statData?.borrowers || 0}
                />
                <DataCard
                  icon={Banknote}
                  title="CASH DISBURSED"
                  data={statData?.cashDisbursed._sum.amount || 0}
                />
              </div>
              <div className="mb-10 grid grid-cols-3 gap-4">
                <DataCard
                  icon={PiggyBank}
                  title="SAVINGS"
                  data={statData?.cashDisbursed._sum.amount || 0}
                />
                <DataCard
                  icon={UserCheck}
                  title="REPAID LOANS"
                  data={statData?.paidLoansCount}
                />

                <DataCard
                  icon={ReceiptIcon}
                  title="CASH RECEIVED"
                  data={statData?.paidLoansAmount._sum.amount || 0}
                />
              </div>
              <div>
                <div>
                  <h1 className="text-2xl font-semibold mb-10">
                    Applied Loans
                  </h1>
                </div>
                <DataTable
                  role="verify"
                  columns={columnsVerifier}
                  data={verifierTableData}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
