"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantity");
    const productSelect = document.getElementById("product");
    const addButton = document.getElementById("add-button");
    const calcButton = document.getElementById("calc-button");
    const clearButton = document.getElementById("clear-button");
    const errorBlock = document.getElementById("error");
    const orderBox = document.getElementById("order-box");
    const orderBody = document.getElementById("order-body");
    const resultBlock = document.getElementById("result");
    const quantityPattern = /^[1-9][0-9]{0,5}$/;
    let order = [];

    function addCell(row, text) {
        const cell = document.createElement("td");
        cell.textContent = text;
        row.appendChild(cell);
    }

    function showOrder() {
        orderBody.textContent = "";
        order.forEach(function (item) {
            const row = document.createElement("tr");
            addCell(row, item.title);
            addCell(row, item.quantity);
            addCell(row, (item.price * item.quantity) + " руб.");
            orderBody.appendChild(row);
        });
        orderBox.hidden = order.length === 0;
    }

    function addItem() {
        const quantityText = quantityInput.value.trim();
        const quantity = parseInt(quantityText, 10);
        const option = productSelect.options[productSelect.selectedIndex];
        const price = parseInt(option.value, 10);
        const title = option.textContent;
        const found = order.find(function (item) {
            return item.title === title;
        });
        resultBlock.textContent = "";
        if (!quantityPattern.test(quantityText)) {
            errorBlock.textContent = "Ошибка: введите целое число от 1 до 999999, только цифры.";
            return false;
        }
        if (found) {
            found.quantity += quantity;
        } else {
            order.push({price: price, quantity: quantity, title: title});
        }
        errorBlock.textContent = "";
        quantityInput.value = "";
        showOrder();
        return true;
    }

    function getTotal() {
        return order.reduce(function (sum, item) {
            return sum + item.price * item.quantity;
        }, 0);
    }

    function calculate() {
        if (quantityInput.value.trim() !== "" && !addItem()) {
            return;
        }
        if (order.length === 0) {
            resultBlock.textContent = "";
            errorBlock.textContent = "Ошибка: заказ пуст, добавьте товары.";
            return;
        }
        errorBlock.textContent = "";
        resultBlock.textContent = "Стоимость заказа: " + getTotal() + " руб.";
    }

    function clearOrder() {
        order = [];
        quantityInput.value = "";
        errorBlock.textContent = "";
        resultBlock.textContent = "";
        showOrder();
    }

    addButton.addEventListener("click", addItem);
    calcButton.addEventListener("click", calculate);
    clearButton.addEventListener("click", clearOrder);
});
