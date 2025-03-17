import { Link } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import styles from "./header.module.css";

//Header component
const Header = () => {

  return (
    <div className={styles.header}>
      <Link to="/">
        <img src="./logo.png" alt="Logo" className={styles.logo} />
      </Link>
      <div className={styles.rightSide}>
        <Link to="/basket" className={styles.cartContainer}>
        <img src="./basket_icon.png" alt="" className={styles.cartIcon}/>
        </Link>
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
