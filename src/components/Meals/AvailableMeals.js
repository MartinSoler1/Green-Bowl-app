import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Mediterranean bowl',
    description: 'char grilled, zucchini, red pepper, eggplant, olives',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Asian bowl',
    description: 'mushrooms, red and green pepper, onion, carrots, tamari and edamame',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Falafel bowl',
    description: 'mixed greens, olives, hummus, falafel and tahini sauce, parsely, cilantro, garlic',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Super green Bowl',
    description: 'zuccini, asparagus, broad beans, peas, pistachios, mint, olive oil and lime',
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
