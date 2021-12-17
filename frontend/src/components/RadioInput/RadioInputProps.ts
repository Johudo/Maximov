import { ReactNode } from "react";

export interface RadioInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string | (() => string) | ReactNode | (() => ReactNode);
    wrapperClassName?: string;
    labelClassName?: string;
}
