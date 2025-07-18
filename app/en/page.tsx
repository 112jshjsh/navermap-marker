"use client";

import { useEffect } from "react";
import NaverMap from "../component";

export default function Home() {
    return (
        <NaverMap 
            height={658} 
            language="&language=en" 
            companyName={process.env.NEXT_PUBLIC_LOCATION_NAME_ENG}
            companyAddress={process.env.NEXT_PUBLIC_LOCATION_ADDRESS_ENG}
            companyDetail={process.env.NEXT_PUBLIC_LOCATION_DETAIL_ENG}
        />
    );
}
