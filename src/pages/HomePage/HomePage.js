import { useNavigate } from 'react-router-dom';
import phoneIcon from '../../assets/img/phone.png'
import './styles.css';

const HomePage = ({ coffees }) => {
  const navigate = useNavigate();

  const handleCoffeeClick = (coffee) => {
    navigate('/payment', { state: { coffee } });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Выбор напитка</h1>
        <button className="login-button">
          <img src={phoneIcon} alt="Phone" />
          Вход / регистрация
        </button>
      </header>
      <nav className="nav">
        <button className="nav-item active">Кофе</button>
        <button className="nav-item">Чай</button>
        <button className="nav-item">Молочный коктейль</button>
        <button className="nav-item">Морсы и газ. напитки</button>
      </nav>
      <section className="coffee-section">
        <h2>Кофе</h2>
        <div className="coffee-grid">
            {coffees.map((coffee) => (
              <div key={coffee.id} className="coffee-card" onClick={() => handleCoffeeClick(coffee)}>
                <img src={coffee.image} alt={coffee.name} className="coffee-image" />
                <p className="coffee-name">{coffee.name}</p>
                <p className="coffee-price">от {coffee.price}₽</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
