#!/usr/bin/env node
import process from 'node:process';
import { argsParse } from './util/argsParse.util.js';
import { generatePassword } from './services/generatePassword.service.js';
import { getPasswordOptions } from './services/getPasswordsOptions.service.js';
import { getSetting, saveSetting } from './services/setting.service.js';

const app = async () => {
  const args = argsParse(process.argv, ['ask', 'setting']);

  if (args.h || args.help) {
    console.log(`
    -h --help - помощь, список команд (игнорирует другие команды)
    -l --length - длина пароля (8)
    -u --uppercase - включить заглавные буквы
    -n --numbers - включить числа
    -s --special - включить спецсимволы
    ask -a - запустить опрос (игнорирует другие команды)
    setting - сохраняет настройки из параметров -l -u -n -s
    `);

    process.exit();
  }

  if (args.a || args.ask) {
    console.log('Ответьте на вопросы:');
    const options = await getPasswordOptions();
    const password = generatePassword(options);
    process.stdout.write(`Пароль: '${password}'\n`);
    process.exit();
  }

  const options = {
    length: 8,
    uppercase: false,
    numbers: false,
    special: false,
  };

  if (!args.setting) {
    const setting = await getSetting();
    Object.assign(options, setting);
  }

  if (args.l || args.length) {
    options.length = +(args.l || args.length);
  }

  if (args.u || args.uppercase) {
    options.uppercase = args.u || args.uppercase;
  }

  if (args.n || args.numbers) {
    options.numbers = args.n || args.numbers;
  }

  if (args.s || args.special) {
    options.special = args.s || args.special;
  }

  if (args.setting) {
    await saveSetting(options);
    process.exit();
  }

  const password = generatePassword(options);
  process.stdout.write(`Пароль: '${password}'\n`);
  process.exit();
};

app();
