import { Suspense } from "react";
import CancelClient from "./CancelClient";

export const metadata = { title: "Annuler mon rendez-vous - EE Studio" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CancelClient />
    </Suspense>
  );
}
