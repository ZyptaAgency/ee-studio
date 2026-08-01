import { Suspense } from "react";
import RescheduleClient from "./RescheduleClient";

export const metadata = { title: "Replanifier mon rendez-vous - EE Studio" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <RescheduleClient />
    </Suspense>
  );
}
