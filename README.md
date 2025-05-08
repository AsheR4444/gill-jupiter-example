# Пример свапа на Jupiter с помощью gill

<div align="center">
  <img src="image.png">  
</div>

<div align="center">
  <h2>⚠️ Специально для DegenCoding сommunity</h2>
  <img width="100" src="https://img.icons8.com/?size=100&id=oWiuH0jFiU0R&format=png&color=000000" alt="Telegram">
  <p>
    <a href="https://t.me/+MRQx4biy9z02YjNi" style="text-decoration: none; margin: 0 10px;">
      <strong>Канал</strong>
    </a>
    |
    <a href="https://t.me/+mYi2OvPW8I01Y2Yy" style="text-decoration: none; margin: 0 10px;">
      <strong>Чат</strong>
    </a>
  </p>
</div>


Этот репозиторий показывает, как выполнить обмен (swap) токенов на Solana через Jupiter с использованием библиотеки [gill](https://www.npmjs.com/package/gill) (Solana/web3.js v2).

## Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Запуск проекта

```bash
npm start
```

### Переменные окружения

Перед запуском обязательно создайте файл `.env` в корне проекта и укажите в нем ваш приватный ключ в формате base58:

```
PRIVATE_KEY=ваш_приватный_ключ_в_base58
```

> **Внимание!** Никогда не публикуйте свой приватный ключ и не храните его в публичных репозиториях.

Файл `.env` уже добавлен в `.gitignore` и не попадет в git.

---

## Используемые библиотеки

- [gill](https://www.npmjs.com/package/gill) — современная библиотека для работы с Solana (web3.js v2)
- [axios](https://www.npmjs.com/package/axios) — HTTP-клиент для запросов к API Jupiter
- [big.js](https://www.npmjs.com/package/big.js?activeTab=readme) — для большей точности при работе с математическими вычислениями

---

## Описание

В этом примере показано, как:

- Получить Signer из переменной окружения
- Получить quote и транзакцию для свапа через Jupiter API
- Подписать транзакцию с помощью gill
- Отправить подписанную транзакцию обратно в Jupiter для исполнения

---

## Минимальные требования

- Node.js >= 18
- Аккаунт Solana с достаточным балансом для совершения свапа

---
