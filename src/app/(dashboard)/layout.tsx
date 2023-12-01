import Aside from "@/components/navigation/Aside";
import DashWrapper from "@/components/wrappers/DashWrapper";
import { auth } from "@clerk/nextjs";

export default function layout({ children }: { children: React.ReactNode }) {

  const {userId} = auth()

  if(!userId) {
    return <>{children}</>
  }

  return (
    <div>
      <Aside/>
      <DashWrapper>{children}</DashWrapper>
    </div>
  );
}
