import dynamic from "next/dynamic";

const NaverMap = dynamic(() => import("../../component"), {
    ssr: !!false,
});

export default function PhoneHome() {
    return (
        <NaverMap 
            language="&language=en"
            companyName={process.env.NEXT_PUBLIC_LOCATION_NAME_ENG}
            companyAddress={process.env.NEXT_PUBLIC_LOCATION_ADDRESS_ENG}
            companyDetail={process.env.NEXT_PUBLIC_LOCATION_DETAIL_ENG}
            />
    );
}
