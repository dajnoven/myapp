# Flask Product Order Form

## Описание проекта
Этот проект представляет собой веб-приложение на базе Flask для управления формой заказа товаров. Пользователи могут выбирать варианты продуктов, вводить количество и видеть динамическое обновление суммы заказа.

## Функциональность
- **Динамический пересчёт суммы заказа.**
- **Интуитивный ввод количества товаров:**
  - Ограничение на ввод числа с точностью до 3 знаков после точки.
  - Автоматическая замена запятой на точку для дробных значений.
  - Установка значения "0", если поле оставлено пустым.
- **Удобный интерфейс с кнопками для выбора вариантов.**

## Структура проекта
### 1. `app.py`
Основной файл приложения, отвечающий за:
- Управление маршрутами.
- Загрузку данных из Excel-файла.
- Динамическую генерацию таблиц продуктов на основе выбранного варианта.

### 2. `form.html`
HTML-файл с:
- Формой для выбора вариантов.
- Полями ввода количества и динамической таблицей продуктов.

### 3. `style.css`
Файл стилей для:
- Кастомизации таблиц, кнопок и чекбоксов.
- Обеспечения адаптивности интерфейса для мобильных устройств.

## Установка и запуск
### Требования
- Python 3.8+
- Установленные зависимости из файла `requirements.txt`.

### Шаги установки
1. Клонируйте репозиторий:
    ```bash
    git clone <URL репозитория>
    cd <папка проекта>
    ```
2. Установите зависимости:
    ```bash
    pip install -r requirements.txt
    ```
3. Запустите сервер:
    ```bash
    python app.py
    ```
4. Откройте браузер и перейдите по адресу: `http://127.0.0.1:5000`.

## Как использовать
1. Выберите вариант продукта, нажав на кнопку.
2. Введите количество для выбранных товаров.
3. Динамическая таблица отобразит итоговую сумму для каждого товара.

## Технические детали
- Валидация ввода количества реализована с использованием JavaScript:
  - Обработка запятых и точек для корректного ввода дробных чисел.
  - Ограничение на ввод не более 3 знаков после точки.
  - Удобное управление курсором при вводе.
- Серверная часть построена на Flask, с использованием данных из Excel-файла.

## Пример интерфейса

## Лицензия
Этот проект распространяется под лицензией MIT. Подробнее в файле [LICENSE](LICENSE).

## Авторы
- **mendax**

