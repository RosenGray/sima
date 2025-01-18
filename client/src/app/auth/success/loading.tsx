import Loader from "@/components/Loader/Loader";
import classes from "./page.module.scss";


const SuccessPageLoader = () => {
  return <div className={classes.Loading}><Loader isSpin isSuccess /></div>;
};

export default SuccessPageLoader;
