import { FC, ReactNode } from "react";

interface AuthLayoutProps {
    children:ReactNode;
}

const AuthLayout:FC<AuthLayoutProps> = ({children}) => {
    return <div id="vladi" className="h-full flex items-center justify-center">{children}</div>
}

export default AuthLayout;