const CoffeeCard = ({ coffee, onClick }) => {
  return (
    <div className="coffee-card" onClick={() => onClick(coffee)}>
      <img src={coffee.image} alt={coffee.name} />
      <h3>{coffee.name}</h3>
      <p>{coffee.price} ₽</p>
    </div>
  );
};

export default CoffeeCard;
