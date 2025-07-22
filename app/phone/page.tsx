import dynamic from "next/dynamic";

const NaverMap = dynamic(() => import("../component"), {
    ssr: !!false,
});

export default function PhoneHome() {
    return (
        <NaverMap 
            language=""
            companyName={process.env.NEXT_PUBLIC_LOCATION_NAME}
            companyAddress={process.env.NEXT_PUBLIC_LOCATION_ADDRESS}
            companyDetail={process.env.NEXT_PUBLIC_LOCATION_DETAIL}
        />
    );
}
