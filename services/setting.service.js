import { writeFile, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const filePath = path.join(os.homedir(), 'setting.genpass.json');

export const saveSetting = async option => {
  await writeFile(filePath, JSON.stringify(option), 'utf-8');
};

export const getSetting = async () => {
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    process.stdout.write(`
    Отсутствует или недоступен файл настроек.
    Для сохранения настроек используйте команду setting.\n
    `);
  }
};
