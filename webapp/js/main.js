document.addEventListener('DOMContentLoaded', () => {
    // Переключение темы
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    });

    // Навигация по страницам
    const navLinks = document.querySelectorAll('.sidebar a');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.dataset.page;
            
            // Скрываем все страницы
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Показываем нужную страницу
            document.getElementById(pageId).classList.add('active');
            
            // Обновляем активную ссылку в навигации
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Обработчик выбора товара
    const selectBtns = document.querySelectorAll('.select-btn');
    selectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.closest('.product-card').dataset.category;
            
            // Заполняем информацию о товаре
            const productTitle = document.getElementById('product-title');
            const productDescription = document.getElementById('product-description');
            
            switch(category) {
                case 'discord':
                    productTitle.textContent = 'Discord Nitro';
                    productDescription.textContent = 'Полный доступ к всем функциям Discord';
                    break;
                case 'telegram':
                    productTitle.textContent = 'Telegram Premium';
                    productDescription.textContent = 'Эксклюзивные функции Telegram';
                    break;
                case 'stars':
                    productTitle.textContent = 'Telegram Stars';
                    productDescription.textContent = 'Премиум стикеры и эмодзи';
                    break;
                case 'gta':
                    productTitle.textContent = 'Мод для GTA';
                    productDescription.textContent = 'Создание и установка мода для GTA';
                    break;
            }

            // Показываем страницу с товаром
            document.querySelector('[data-page="products"]').classList.add('active');
            
            // Скрываем главную страницу
            document.querySelector('[data-page="home"]').classList.remove('active');
        });
    });

    // Обработчик оформления заказа
    const buyBtn = document.querySelector('.buy-btn');
    const orderModal = document.getElementById('order-modal');
    
    buyBtn.addEventListener('click', () => {
        orderModal.classList.add('active');
    });

    // Закрытие модального окна
    orderModal.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.classList.remove('active');
        }
    });

    // Обработчик выбора метода оплаты
    const paymentBtns = document.querySelectorAll('.payment-btn');
    const paymentDetails = document.getElementById('payment-details');
    
    paymentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const method = btn.dataset.method;
            
            // Очищаем предыдущие детали
            paymentDetails.innerHTML = '';
            
            // Добавляем новые детали в зависимости от метода
            switch(method) {
                case 'card':
                    paymentDetails.innerHTML = `
                        <div class="form-group">
                            <label for="card-number">Номер карты:</label>
                            <input type="text" id="card-number" placeholder="XXXX XXXX XXXX XXXX">
                        </div>
                        <div class="form-group">
                            <label for="card-expiry">Срок действия:</label>
                            <input type="text" id="card-expiry" placeholder="MM/YY">
                        </div>
                        <div class="form-group">
                            <label for="card-cvv">CVV:</label>
                            <input type="text" id="card-cvv" placeholder="XXX">
                        </div>
                    `;
                    break;
                case 'sbp':
                    paymentDetails.innerHTML = `
                        <div class="form-group">
                            <label for="phone">Номер телефона:</label>
                            <input type="text" id="phone" placeholder="+7 XXX XXX XX XX">
                        </div>
                    `;
                    break;
                case 'crypto':
                    paymentDetails.innerHTML = `
                        <div class="crypto-options">
                            <div class="option" data-crypto="ton">
                                <span>Toncoin</span>
                                <span class="address">0:1234567890abcdef...</span>
                            </div>
                            <div class="option" data-crypto="usdt">
                                <span>USDT</span>
                                <span class="address">0x1234567890abcdef...</span>
                            </div>
                            <div class="option" data-crypto="btc">
                                <span>Bitcoin</span>
                                <span class="address">bc1q1234567890abcdef...</span>
                            </div>
                        </div>
                    `;
                    break;
            }
        });
    });

    // Обработчик заказа мода для GTA
    const gtaBtn = document.querySelector('[data-category="gta"] .select-btn');
    const gtaModal = document.getElementById('gta-order-modal');
    
    gtaBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        gtaModal.classList.add('active');
    });

    // Закрытие модального окна заказа мода
    gtaModal.addEventListener('click', (e) => {
        if (e.target === gtaModal) {
            gtaModal.classList.remove('active');
        }
    });

    // Обработчик отправки формы заказа мода
    const gtaForm = document.getElementById('gta-order-form');
    
    gtaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            gameVersion: document.getElementById('game-version').value,
            modType: document.getElementById('mod-type').value,
            description: document.getElementById('description').value
        };

        // Отправка данных на сервер
        fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Заказ успешно отправлен!');
                gtaModal.classList.remove('active');
                gtaForm.reset();
            } else {
                alert('Ошибка при отправке заказа');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке заказа');
        });
    });

    // Обработчик подтверждения оплаты
    const confirmPayment = document.querySelector('.confirm-payment');
    
    confirmPayment.addEventListener('click', () => {
        // Логика подтверждения оплаты
        // ...
        
        // После успешной оплаты
        orderModal.classList.remove('active');
        alert('Платеж успешно подтвержден!');
    });
});
