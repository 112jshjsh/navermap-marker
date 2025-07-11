import dynamic from "next/dynamic";

const NaverMap = dynamic(() => import("../component"), {
    ssr: !!false,
});

export default function PhoneHome() {
    return (
        <NaverMap height={298} />
    );
}
