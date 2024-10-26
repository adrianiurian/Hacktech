import React from "react";

/**
 * Button component
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Button click handler
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.outlined - Outlined button style flag
 * @param {string} props.styleType - Button style type
 * @returns {JSX.Element}
 */
type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    outlined?: boolean;
    styleType?:
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "warning"
        | "success";
};

function Button({
    children,
    onClick,
    className,
    outlined,
    styleType = "default",
    ...props
}: ButtonProps) {
    const fullStyles = {
        default:
            "text-slate-800 hover:text-slate-900 bg-white hover:bg-slate-100 ",
        primary: "text-white bg-blue-500 hover:bg-blue-600 ",
        secondary: "text-white bg-purple-500 hover:bg-purple-600 ",
        error: "text-white bg-red-500 hover:bg-red-600 ",
        warning: "text-white bg-yellow-500 hover:bg-yellow-600 ",
        success: "text-white bg-green-500 hover:bg-green-600 ",
    };

    const outlinedStyles = {
        default:
            "text-slate-800 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-800 hover:border-slate-900 ",
        primary:
            "text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-500 hover:border-blue-600 ",
        secondary:
            "text-purple-500 hover:text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-500 hover:border-purple-600 ",
        error: "text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 border-red-500 hover:border-red-600 ",
        warning:
            "text-yellow-500 hover:text-yellow-600 bg-yellow-50 hover:bg-yellow-100 border-yellow-500 hover:border-yellow-600 ",
        success:
            "text-green-500 hover:text-green-600 bg-green-50 hover:bg-green-100 border-green-500 hover:border-green-600 ",
    };

    const cssClasses =
        className +
        " flex items-center text-base py-4 px-6 rounded-2xl font-lufga " +
        (outlined
            ? outlinedStyles[styleType] + " border border-solid "
            : fullStyles[styleType] + " ");

    return (
        <button onClick={onClick} className={cssClasses + " "} {...props}>
            {children}
        </button>
    );
}

export default Button;
