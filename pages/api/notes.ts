import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {body, title, user} = JSON.parse(req.body);
    const newDate = new Date().toLocaleDateString();

    // console.log(body)

    let findUser = await prisma.user.findFirst({
      where:{
        email: user.email
      }
    })

    if (findUser === undefined) {
      findUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name
        }
      });
    }

    const newNote = await prisma.note.create({
      data: {
        note: body,
        title: title,
        userId: findUser!.id,
        date: newDate,
      },
    });

    res.status(201).json(null)
  } else {
    res.status(201).json(null)
  }
}
