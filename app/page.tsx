"use client";

import { useEffect } from "react";
import NaverMap from "./component";

export default function Home() {
  return (
    <NaverMap 
      language=""
      companyName={process.env.NEXT_PUBLIC_LOCATION_NAME}
      companyAddress={process.env.NEXT_PUBLIC_LOCATION_ADDRESS}
      companyDetail={process.env.NEXT_PUBLIC_LOCATION_DETAIL}
      />
  );
}
