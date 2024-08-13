import Link from "next/link";

export function SmallHeader() {

    return (
        <Link href="/">
            <div className="pt-4 fixed">
                <span className="logo-font text-[#E086D7] font-bold text-4xl m-5">SAT Unlimited</span>
            </div>
        </Link>
    )

}