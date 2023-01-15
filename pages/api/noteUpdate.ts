import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { id, body, title } = JSON.parse(req.body);

    const newNote = await prisma.note.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        note: body,
      },
    });

    res.status(201).json(null);
  } else {
    res.status(201).json(null);
  }
}
