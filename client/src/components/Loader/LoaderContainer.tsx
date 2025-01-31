import { FC } from "react"
import classes from "./LoaderContainer.module.scss"

interface LoaderContainerProps {
    children: React.ReactNode;
    width?: string;
    height?: string;
}
const LoaderContainer:FC<LoaderContainerProps> = ({children, width, height}) => {
  return <div style={{width, height}} className={classes.LoaderContainer}>
    {children}
  </div>
}

export default LoaderContainer