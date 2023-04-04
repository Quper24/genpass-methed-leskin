import readline from 'node:readline/promises';
import process from 'node:process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const getPasswordOptions = async () => {
  const length = (await rl.question('Длина пароля [8]')) || 8;
  const uppercase =
    (await rl.question('Включаем заглывные буквы? (y/n) [y]')) === 'y' || true;
  const numbers = (await rl.question('Включаем числа? (y/n) [y]')) || true;
  const special =
    (await rl.question('Включаем спецсимволы, (y/n) [y]')) || true;

  return { length, uppercase, numbers, special };
};
