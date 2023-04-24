import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createNewHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createHotelRoomId(hotelId: number) {
  return prisma.room.create({
    data: {
      name: '0010',
      capacity: 1,
      hotelId: hotelId,
    },
  });
}

export async function createNewTicketRemote() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: true,
      includesHotel: faker.datatype.boolean(),
    },
  });
}
