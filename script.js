
        function showSection(id) {
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            const s = document.getElementById(id);
            if (s) {
                s.classList.add('active');
                s.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        let cart = [];
        let total = 0;
        function addToCart(name, price, buttonElement) {
            if (buttonElement && buttonElement.classList) {
                buttonElement.classList.add('cart-item-added');
                setTimeout(() => buttonElement.classList.remove('cart-item-added'), 500);
            }
            cart.push({ name, price });
            total += price;
            updateCart();
            document.getElementById('checkout-btn').style.display = 'block';
        }
        function addToCartWithSize(name, price, size, buttonElement) {
            if (!size) {
                alert('Пожалуйста, выберите размер!');
                return;
            }
            const fullName = `${name} (размер: ${size})`;
            addToCart(fullName, price, buttonElement);
            alert(`${fullName} успешно добавлено в корзину!`);
        }
        function updateCart() {
            const cartContent = document.getElementById('cart-content');
            if (cart.length === 0) {
                cartContent.innerHTML = '<p>Корзина пуста.</p>';
                document.getElementById('checkout-btn').style.display = 'none';
            } else {
                let html = '<ul style="list-style-type:none;padding-left:0;">';
                cart.forEach(item => {
                    html += `<li style="margin:10px 0;padding:10px;background:#222;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">
                        <span>${item.name}</span><span>$${item.price}</span></li>`;
                });
                html += '</ul>';
                cartContent.innerHTML = html;
                document.getElementById('checkout-btn').style.display = 'block';
            }
            document.getElementById('cart-total').textContent = total;
        }
        document.getElementById('checkout-btn').addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Корзина пуста. Добавьте товары в корзину перед оформлением заказа.');
            } else {
                const isLoggedIn = confirm('Вы должны быть зарегистрированы или войти в систему, чтобы оформить заказ. Хотите войти?');
                if (isLoggedIn) {
                    showSection('login');
                } else {
                    alert('Пожалуйста, зарегистрируйтесь, чтобы продолжить.');
                    showSection('register');
                }
            }
        });
        document.querySelector('iframe').src = 'https://www.youtube.com/embed/Wm7xJDsE__4';
        document.getElementById('checkout-btn').style.display = 'none';

        function showProductDetail(name, image, price, description) {
            document.getElementById('product-title').textContent = name;
            document.getElementById('product-image').src = image;
            document.getElementById('product-price-value').textContent = price;
            document.getElementById('product-description').textContent = description;
            showSection('product-detail');
        }
        function addToCartFromDetail() {
            const name = document.getElementById('product-title').textContent;
            const price = parseFloat(document.getElementById('product-price-value').textContent);
            addToCart(name, price, document.createElement('button'));
        }
  