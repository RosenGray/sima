import Loader from "@/components/Loader/Loader";
import classes from "./page.module.scss";
import { CheckIcon } from "@radix-ui/react-icons";

const SuccessPageLoader = () => {
  return (
    <div className={classes.container}>
      <section className={classes.loginBox}>
        <div className={classes.successBox}>
          <div className={classes.imageWrapper}>
            <CheckIcon color="green" width={64} height={64} />
          </div>
          <div className={classes.content}>
            <h2 className={classes.title}>Ура!</h2>
            <p className={classes.subtitle}>Сейчас вы будете перенаправлены на следующую страницу</p>
          </div>
          <Loader isSpin />
        </div>
      </section>
    </div>
  );
};

export default SuccessPageLoader;
