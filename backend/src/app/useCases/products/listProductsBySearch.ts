// Importe o modelo Product e outros módulos necessários
import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function listProductsBySearch(req: Request, res: Response) {
  try {
    const searchTerm = req.body as string;

    if (!searchTerm) {
      return res.status(400).json({
        error: 'Search term is required',
      });
    }

    // Use uma expressão regular para realizar uma pesquisa de texto insensível a maiúsculas e minúsculas
    const regex = new RegExp(searchTerm, 'i');

    // Pesquise produtos com base no nome
    const products = await Product.find({ name: regex });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
