<<<<<<< Updated upstream
import TopCustomers from '@/app/_components/Admin/Dashboard/TopCustomers';
import TopCustomersByProvince from '@/app/_components/Admin/Users/TopCustomersByProvince';
import { cookies } from 'next/headers';
=======
import TopCustomers from "@/app/_components/Admin/Dashboard/TopCustomers";
import TopCustomersByProvince from "@/app/_components/Admin/Users/TopCustomersByProvince";
import UserStatistics from "@/app/_components/Admin/Users/UserStatistics";
import UserTable from "@/app/_components/Admin/Users/UserTable";
import { cookies } from "next/headers";
>>>>>>> Stashed changes

export default async function Page() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt")?.value;

  if (!token) {
    throw new Error("Đăng nhập để tiếp tục");
  }

  return (
    <div className="grid grid-cols-4 xl:grid-cols-2 md:grid-cols-1 p-6 gap-6">
      <div className="col-span-1">
        <TopCustomersByProvince authToken={token} />
      </div>
      <div className="col-span-2 xl:order-first md:col-span-1">
        <UserStatistics authToken={token} />
      </div>
      <div className="col-span-1">
        <TopCustomers cookies={token} />
=======
    <div className="space-y-6 p-6">
      {/* Statistics Section */}
      <div className="grid grid-cols-4 gap-6 xl:grid-cols-2 md:grid-cols-1">
        <div className="col-span-1">
          <TopCustomersByProvince authToken={token} />
        </div>
        <div className="col-span-2 xl:order-first md:col-span-1">
          <UserStatistics authToken={token} />
        </div>
        <div className="col-span-1">
          <TopCustomers cookies={token} />
        </div>
>>>>>>> Stashed changes
      </div>

      {/* User Management Table */}
      <UserTable authToken={token} />
    </div>
  );
}
