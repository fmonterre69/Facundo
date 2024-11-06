document.addEventListener('DOMContentLoaded', function () {
    // Inicializar la tabla con DataTables
    $('#productTable').DataTable({
        data: [
            ['Camiseta básica', 'Camiseta de algodón 100%', 'Ropa', '$10.99'],
            ['Pantalón vaquero', 'Pantalón de mezclilla resistente', 'Pantalones', '$25.99'],
            ['Sudadera con capucha', 'Sudadera cómoda y casual', 'Ropa', '$19.99'],
            ['Zapatos deportivos', 'Zapatos ligeros para correr', 'Calzado', '$45.00'],
            ['Chaqueta impermeable', 'Perfecta para días lluviosos', 'Ropa exterior', '$60.00']
        ],
        columns: [
            { title: "Nombre" },
            { title: "Descripción" },
            { title: "Categoría" },
            { title: "Precio" }
        ],
        paging: true,
        searching: true,
        info: true,
        lengthChange: true,
        pageLength: 5
    });

    let cartCount = 0;
    let totalPrice = 0.0;
    const selectedProducts = new Set();

    // Función para actualizar el carrito y el total
    function updateCart() {
        document.getElementById('cart-count').textContent = cartCount;
        document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    }

    // Función para manejar la selección de productos
    function toggleProductSelection(row, price) {
        if (selectedProducts.has(row)) {
            // Deseleccionar el producto
            selectedProducts.delete(row);
            row.classList.remove('selected');
            cartCount--;
            totalPrice -= parseFloat(price.replace('$', ''));
        } else {
            // Seleccionar el producto
            selectedProducts.add(row);
            row.classList.add('selected');
            cartCount++;
            totalPrice += parseFloat(price.replace('$', ''));
        }
        updateCart();
    }

    // Autenticación de usuario
    const loginForm = document.getElementById('loginForm');
    const productSection = document.getElementById('productSection');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Autenticación simple
        if (username === 'user' && password === '1234') {
            loginMessage.textContent = 'Inicio de sesión exitoso';
            loginMessage.style.color = 'green';
            loginForm.style.display = 'none';
            productSection.style.display = 'block';
        } else {
            loginMessage.textContent = 'Usuario o contraseña incorrectos';
            loginMessage.style.color = 'red';
        }
    });

    // Evento para cada fila de producto
    $('#productTable tbody').on('click', 'tr', function () {
        const rowData = $('#productTable').DataTable().row(this).data();
        const price = rowData[3];
        toggleProductSelection(this, price);
    });
});
