import HeaderCartButton from "./HeaderCartButton";
import veggiesImg from "../../assets/veggies.webp";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Green Bowls</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={veggiesImg} alt="vegetables" />
      </div>
    </>
  );
};

export default Header;
