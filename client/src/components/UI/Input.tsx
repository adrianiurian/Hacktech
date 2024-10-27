import { useState } from "react";
import "./Input.css";

interface InputProps {
    textarea?: boolean;
    className?: string;
    label?: string;
    id?: string;
    type?: string;
    value?: string | number;
    rows?: number;
    onChange: (value: string | number) => void;
}

export default function Input({
    textarea = false,
    className = "",
    label,
    id,
    type = "text",
    value,
    onChange,
    rows,
    ...props
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    function togglePassword() {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        if (type === "number") {
            onChange(+event.target.value);
        } else {
            onChange(event.target.value);
        }
    }

    return (
        <div>
            <div className={`input-field ${className}`}>
                {textarea ? (
                    <textarea
                        id={id}
                        value={value}
                        placeholder={label}
                        onChange={handleChange}
                        rows={rows} // Applying rows to textarea
                        {...props}
                    ></textarea>
                ) : (
                    <input
                        type={
                            type === "password" && !showPassword
                                ? "password"
                                : type
                        }
                        id={id}
                        value={value}
                        placeholder={label}
                        onChange={handleChange}
                        {...props}
                    />
                )}
                {type === "password" && (
                    <span
                        className="material-symbols-rounded password-icon"
                        onClick={togglePassword}
                    >
                        {showPassword ? "visibility_off" : "visibility"}
                    </span>
                )}
                {label && <label htmlFor={id}>{label}</label>}
            </div>
        </div>
    );
}
