import { ReactNode } from "react";

type FormCardProps = {
    title: string;
    children: ReactNode;
    className?: string;
};

export default function FormCard({
    title,
    className,
    children,
}: FormCardProps) {
    return (
        <div
            className={"p-6 border-stone-300 rounded-2xl border-2 " + className}
        >
            <h3 className='text-xl font-bold text-stone-700 pb-4'>{title}</h3>

            {children}
        </div>
    );
}
