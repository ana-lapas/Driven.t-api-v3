import { cannotShowHotelsError, notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import hotelsRepository from '@/repositories/hotels-repository/index';

async function checkHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotShowHotelsError();
  }
}

async function getAllHotels(userId: number) {
  await checkHotels(userId);

  const hotels = await hotelsRepository.getHotels();
  if (!hotels || hotels.length === 0) {
    throw notFoundError();
  }
  return hotels;
}

async function getHotelsById(userId: number, hotelId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.status === 'RESERVED') {
    throw cannotShowHotelsError();
  }
  if (ticket.TicketType.isRemote) {
    throw cannotShowHotelsError();
  }
  if (!ticket.TicketType.includesHotel) {
    throw cannotShowHotelsError();
  }

  const hotel = await hotelsRepository.getHotelsRoomId(hotelId);
  if (!hotel || hotel.Rooms.length === 0) {
    throw notFoundError();
  }
  return hotel;
}
const hotelService = {
  getAllHotels,
  getHotelsById,
};

export default hotelService;
