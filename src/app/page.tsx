import { connectDb } from "@/libs/mongodb";
import LoginPage from "./login/page";

export default function HomePage() {

  return (
    <div>
      <LoginPage />
    </div>
  );
}
