import { cookies } from "next/headers";
import { getProfile } from "../../_libs/apiServices";
import ReauthenticateWrapper from "./ReauthenticateWrapper";
import { redirect } from "next/navigation";

export default async function ReauthenticatePage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");

  if (!token) {
    redirect("/login");
  }

  try {
    const { data } = await getProfile(token);
    const { user } = data;

    return <ReauthenticateWrapper user={user} />;
  } catch (error) {
    console.error("Error getting profile for reauthentication:", error);
    redirect("/login");
  }
}
