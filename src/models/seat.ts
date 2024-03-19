export interface Iseat {
  id: number;
  rowNumber: number;
  seatNumber: number;
  seatPricing: {
    name: string;
    price: number;
  };
  auditoriumId: number;
}
