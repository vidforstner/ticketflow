import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <SignIn
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#fff",
            colorTextOnPrimaryBackground: "#000",
          },
        }}
      />
    </div>
  );
}
