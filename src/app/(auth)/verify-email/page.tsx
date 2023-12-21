import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}


const VerifyEmailPage = ({ searchParams }: PageProps) => {
  // console.log(searchParams)
  const token = searchParams.token;
  console.log(token)
  const toEmail = searchParams.to;
  console.log(toEmail)
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[250px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full items-center flex-col justify-center space-y-1">
            <div className="relative  mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src="/hippo-email-sent.png"
                // width={60}
                // height={}
                fill={true}
                alt="hippo email send image"
              />
            </div>
            <h3 className="font-semibold text-2xl">Check your Email</h3>
            {toEmail ? (
              <p className="text-muted-foreground text-center">
                {" "}
                we&apos;ve send a Verification link to{" "}
                <span className="font-semibold">{toEmail}</span>.
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve send a verification link to your email
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
