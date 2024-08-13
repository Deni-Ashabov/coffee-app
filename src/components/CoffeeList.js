import CoffeeCard from './CoffeeCard';

const CoffeeList = ({ coffees, onCoffeeClick }) => {
  return (
    <div className="coffee-list">
      {coffees.map(coffee => (
        <CoffeeCard key={coffee.id} coffee={coffee} onClick={onCoffeeClick} />
      ))}
    </div>
  );
};

export default CoffeeList;
