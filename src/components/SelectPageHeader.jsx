"use client"

export function SelectPageHeader({subheader}) {

    return (
        <div className="flex flex-col mt-24 items-center">
            <span className="logo-font text-[#E086D7] font-bold text-7xl text-center">SAT Unlimited</span>
            <span className="text-[#E7C654] font-bold text-5xl mt-8 text-center">{subheader}</span>
        </div>
    )

}