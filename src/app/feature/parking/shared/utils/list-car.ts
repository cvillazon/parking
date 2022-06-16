
interface Car{
  id: number;
  name: string;
  src: string;
}

export const cars: Car[] = [
  {
    id: 1,
    name: 'bus',
    src: './assets/svg/bus-icon.svg',
  },
  {
    id: 2,
    name: 'cab',
    src: './assets/svg/cab-icon.svg',
  },
  {
    id: 3,
    name: 'car1',
    src: './assets/svg/car1-icon.svg',
  },
  {
    id: 4,
    name: 'car1',
    src: './assets/svg/car1-icon.svg',
  },
  {
    id: 5,
    name: 'car2',
    src: './assets/svg/car2-icon.svg',
  },
  {
    id: 6,
    name: 'car3',
    src: './assets/svg/car3-icon.svg',
  },
  {
    id: 7,
    name: 'excavator1',
    src: './assets/svg/excavator1-icon.svg',
  },
  {
    id: 8,
    name: 'excavator2',
    src: './assets/svg/excavator2-icon.svg',
  },
  {
    id: 9,
    name: 'police',
    src: './assets/svg/police-icon.svg',
  },
  {
    id: 10,
    name: 'prison-bus',
    src: './assets/svg/prison-bus-icon.svg',
  },
  {
    id: 11,
    name: 'taxi',
    src: './assets/svg/taxi-icon.svg',
  },
  {
    id: 12,
    name: 'truck',
    src: './assets/svg/truck-icon.svg',
  },
];

export const getRandomCar = (): Car => {
  const crypto = window.crypto;
  const array = new Uint8Array(1);
  return cars[crypto.getRandomValues(array)[0]%cars.length];
};


