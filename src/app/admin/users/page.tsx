import { cookies } from "next/headers";
import { 
  SafeUserTable, 
  SafeUserStatistics, 
  SafeTopCustomersByProvince, 
  SafeTopCustomers 
} from "@/app/_components/UI/AdminErrorBoundaryWrappers";

export default async function Page() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt")?.value;

  if (!token) {
    throw new Error("Đăng nhập để tiếp tục");
  }
  return (
    <div className="space-y-6 p-6">
      {/* Statistics Section */}
      <div className="grid grid-cols-4 gap-6 xl:grid-cols-2 md:grid-cols-1">
        <div className="col-span-1">
          <SafeTopCustomersByProvince authToken={token} />
        </div>
        <div className="col-span-2 xl:order-first md:col-span-1">
          <SafeUserStatistics authToken={token} />
        </div>
        <div className="col-span-1">
          <SafeTopCustomers cookies={token} />
        </div>
      </div>

      {/* User Management Table */}
      <SafeUserTable authToken={token} />
    </div>
  );
}
