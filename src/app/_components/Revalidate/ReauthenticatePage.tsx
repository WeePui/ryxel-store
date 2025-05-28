import { cookies } from "next/headers";
import { getProfile } from "../../_libs/apiServices";
import ReauthenticateWrapper from "./ReauthenticateWrapper";

export default async function ReauthenticatePage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");

  if (!token) {
    return null;
  }

  const { data } = await getProfile(token);
  const { user } = data;

  return <ReauthenticateWrapper user={user} />;
}
