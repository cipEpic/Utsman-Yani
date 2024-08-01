import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.resolve('./data/messages.json');

export default async (req, res) => {
  if (req.method === 'POST') {
    const newData = req.body;
    const data = JSON.parse(await fs.readFile(dataFilePath, 'utf-8'));
    data.push(newData);
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
    res.status(200).json(newData);
  } else if (req.method === 'GET') {
    const data = JSON.parse(await fs.readFile(dataFilePath, 'utf-8'));
    res.status(200).json(data);
  }
};
