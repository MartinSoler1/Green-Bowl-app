import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    adress: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const adressInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAdress = adressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAdressIsValid = !isEmpty(enteredAdress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      adress: enteredAdressIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredAdressIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      adress: enteredAdress,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const adressControlClasses = `${classes.control} ${
    formInputsValidity.adress ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          ref={nameInputRef}
          data-test="checkout-input-name"
        />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={adressControlClasses}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="adress"
          ref={adressInputRef}
          data-test="checkout-input-address"
        />
        {!formInputsValidity.adress && <p>Please enter a valid address!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="number"
          id="postal"
          ref={postalCodeInputRef}
          data-test="checkout-input-postcode"
        />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          ref={cityInputRef}
          data-test="checkout-input-city"
        />
      </div>
      {!formInputsValidity.city && <p>Please enter a valid city!</p>}

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} data-test="checkout-confirm-button">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
