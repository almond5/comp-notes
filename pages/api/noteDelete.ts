import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {body, title, user, date} = JSON.parse(req.body);

    const findUser = await prisma.user.findFirst({
      where:{
        email: user.email
      }
    })

    const note = await prisma.note.findFirst({
      where: {
        note: body,
        userId: findUser?.id,
        title: title,
        date: date
      }
    });

    const delNote = await prisma.note.delete({
      where: {
        id: note?.id
      }
    })

    res.status(201).json(null)
  } else {
    res.status(201).json(null)
  }
}
