// src/emulator.js
const emulator = {
  StartCashin(cb) {
    console.log('Купюроприемник включен');

    const onKeydown = (event) => {
      if (event.key === '1') cb(10); // 1 — 10 рублей
      if (event.key === '2') cb(50); // 2 — 50 рублей
      if (event.key === '3') cb(100); // 3 — 100 рублей
    };

    document.addEventListener('keydown', onKeydown);

    this.stopCashinCallback = () => {
      document.removeEventListener('keydown', onKeydown);
      console.log('Купюроприемник выключен');
    };
  },

  StopCashin() {
    if (this.stopCashinCallback) {
      this.stopCashinCallback();
    }
  },

  BankCardPurchase(amount, cb, display_cb) {
    console.log(`Начало оплаты банковской картой на сумму ${amount} рублей`);
    display_cb('Приложите карту');

    const onKeydown = (event) => {
      if (event.key === 'Enter') {
        display_cb('Обработка карты');
        setTimeout(() => display_cb('Связь с банком'), 1000);
        setTimeout(() => {
          const success = Math.random() > 0.2; // 80% вероятность успеха
          display_cb(success ? 'Оплата успешна' : 'Ошибка оплаты');
          cb(success);
        }, 2000);
      }

        if (event.key === 'Escape') {
          display_cb('Отмена операции');
          cb(false);
        }
    };

    document.addEventListener('keydown', onKeydown);

    this.cancelBankCardCallback = () => {
      document.removeEventListener('keydown', onKeydown);
    };
  },

  BankCardCancel() {
    if (this.cancelBankCardCallback) {
      this.cancelBankCardCallback();
    }
  },

  Vend(product_idx, cb) {
    console.log(`Выдача кофе с индексом ${product_idx}`);

    const onKeydown = (event) => {
      if (event.key === 'v') {
        const success = Math.random() > 0.1; // 90% вероятность успеха
        console.log(success ? 'Кофе выдан успешно' : 'Ошибка выдачи кофе');
        cb(success);
      }
    };

    document.addEventListener('keydown', onKeydown);

    this.cancelVendCallback = () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }
};

export default emulator;
