import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import emulator from '../../utils/emulator';
import attachCard from '../../assets/img/attach-card.png'
import currency from '../../assets/img/currency.png'
import './styles.css'

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const coffee = location.state?.coffee;

    const [paymentMethod, setPaymentMethod] = useState(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('waiting');

    useEffect(() => {
        if (paymentMethod === 'cash') {
          setStatus('processing');
          emulator.StartCashin((amount) => {
            setMessage(`Принято ${amount} рублей`);
          });
        } else if (paymentMethod === 'card') {
          setStatus('processing');
          emulator.BankCardPurchase(coffee.price, (result) => {
            if (result) {
              setStatus('success');
              setMessage('Оплата прошла успешно. Выдача кофе...');
              emulator.Vend(coffee.id, (vendResult) => {
                if (vendResult) {
                  setMessage('Кофе выдано. Спасибо!');
                  setTimeout(() => navigate('/'), 3000);
                } else {
                  setMessage('Ошибка выдачи кофе. Попробуйте снова.');
                }
              });
            } else {
              setMessage('Оплата не прошла. Попробуйте снова.');
            }
          }, setMessage);
        }

        return () => {
            if (paymentMethod === 'cash') {
                emulator.StopCashin();
            } else if (paymentMethod === 'card') {
                emulator.BankCardCancel();
            }
        };
    }, [paymentMethod, coffee, navigate]);

    const handlePaymentMethod = (method) => {
        setPaymentMethod(method);
    };

    if (!coffee) {
        navigate('/');
        return null;
    }

  return (
    <div
      className='payment-container'
      style={{
        backgroundColor: status === 'failed' ? '#F03B3B' : '#ffcc00'
      }}
    >
      <div className="payment-container__inner">
        <h1>Оплата для {coffee.name}</h1>
        {!paymentMethod && (
          <div>
            <button onClick={() => handlePaymentMethod('cash')}>Оплатить наличными</button>
            <button onClick={() => handlePaymentMethod('card')}>Оплатить картой</button>
          </div>
        )}
      </div>
      {status === 'processing' && (
        <div className="payment-screen">
          {paymentMethod === 'cash'
          ? (
            <>
              <img src={currency} alt="Приложите карту" />
              <p>Вставьте купюру в купюроприёмник</p>
              <button onClick={() => navigate('/')}>Отмена</button>
            </>
          )
          : (
            <>
              <img src={attachCard} alt="Приложите карту" />
              <p>Приложите карту к терминалу</p>
              <button onClick={() => navigate('/')}>Отмена</button>
            </>
          )}
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentPage;
