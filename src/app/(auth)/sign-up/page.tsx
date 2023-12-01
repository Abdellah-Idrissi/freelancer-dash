import SignUpForm from "@/components/auth/forms/sign-up";
import { currentUser , auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const {userId} = auth()
  if(userId) redirect('/')

  return (
    <div className="900screen:w-[80%]">
      <SignUpForm />
    </div>
  );
}
