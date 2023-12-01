import SignInForm from "@/components/auth/forms/sign-in";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const {userId} = auth()
  if(userId) redirect('/')

  return (
    <div className="900screen:w-[80%]">
      <SignInForm />
    </div>
  );
}

