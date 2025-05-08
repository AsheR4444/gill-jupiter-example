import axios from 'axios'
import { loadKeypairSignerFromEnvironmentBase58 } from 'gill/node'
import { getBase64EncodedWireTransaction, getTransactionDecoder, signTransaction } from 'gill'
import Big from 'big.js'

import dotenv from 'dotenv'

dotenv.config()

const main = async () => {
  // Получаем Signer из переменной окружения с названием PRIVATE_KEY
  const signer = await loadKeypairSignerFromEnvironmentBase58('PRIVATE_KEY')

  const tokenInAddress = 'So11111111111111111111111111111111111111112'
  const tokenOutAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'

  const tokenInDecimals = 9
  const taker = signer.address

  const neededToSwapAmount = '0.02' // SOL ~4 USDC

  // Преобразуем 0.02 в 20000000 (число без запятой для блокчейна)
  const amount = new Big(neededToSwapAmount).mul(10 ** tokenInDecimals).toString()

  const orderResponse = await axios.get(
    `https://lite-api.jup.ag/ultra/v1/order?inputMint=${tokenInAddress}&outputMint=${tokenOutAddress}&amount=${amount}&taker=${taker}`
  )

  // Записываем в переменную данные из ответа от API Jupiter (для удобства)
  const transactionBase64 = orderResponse.data.transaction

  // Преобразуем строку base64 в двоичные данные
  const swapTransactionBuffer = Buffer.from(transactionBase64, 'base64')

  // Декодируем двоичные данные в транзакцию
  const decodedTransaction = getTransactionDecoder().decode(swapTransactionBuffer)

  // Подписываем транзакцию
  const signedTransaction = await signTransaction([signer.keyPair], decodedTransaction)

  // Подписанную транзакцию преобразуем в Base64EncodedWireTransaction
  const serializedTransaction = getBase64EncodedWireTransaction(signedTransaction)

  // Отправляем транзакцию на выполнение Jupiter
  // За нас выполняется транзакция, обработается проскальзывание, комиссия и т.д.
  const executeResponse = await axios.post(`https://lite-api.jup.ag/ultra/v1/execute`, {
    signedTransaction: serializedTransaction,
    requestId: orderResponse.data.requestId,
  })

  // Выводим ответ от API Jupiter
  console.log(executeResponse.data)
}

void main()
