$(document).ready(function () {
    $("#variant1").click(function () {
        loadProducts("variant1");
    });

    $("#variant2").click(function () {
        loadProducts("variant2");
    });

    function loadProducts(variant) {
        $.ajax({
            url: "/load_products",
            type: "POST",
            data: {variant: variant},
            success: function (response) {
                displayProducts(response.products);
            },
            error: function (error) {
                console.log("Ошибка при загрузке продуктов: ", error);
            }
        });
    }

    function displayProducts(products) {
        let tableBody = $("#products-table tbody");
        tableBody.empty();
        products.forEach(function (product) {
            let row = `<tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
            </tr>`;
            tableBody.append(row);
        });
    }

    $("#save-user-data").click(function () {
        let userData = {
            name: $("#name").val(),
            email: $("#email").val(),
            address: $("#address").val()
        };

        $.ajax({
            url: "/save_user_data",
            type: "POST",
            data: userData,
            success: function (response) {
                alert(response.message);
            },
            error: function (error) {
                console.log("Ошибка при сохранении данных пользователя: ", error);
            }
        });
    });
});