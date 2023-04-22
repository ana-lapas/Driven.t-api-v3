import { notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import hotelsRepository from '@/repositories/hotels-repository/index';

async function checkHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if ((!ticket) || (ticket.status === "RESERVED") || (ticket.TicketType.isRemote) || (!ticket.TicketType.includesHotel)){
    throw unauthorizedError();
  } 
}

async function getAllHotels(userId: number) {
  await checkHotels(userId);

  const hotels = await hotelsRepository.getHotels();

  return hotels;
}

async function getHotelsById(userId: number, hotelId: number) {
  await checkHotels(userId);

  const hotel = await hotelsRepository.getHotelsRoomId(hotelId);
  if (!hotel) throw notFoundError();

  return hotel;
}
const hotelService = {
  getAllHotels,
  getHotelsById,
};

export default hotelService;
