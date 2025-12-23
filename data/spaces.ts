
export interface Space {
  id: string;
  name: string;
  image: string;
  city: string;
  capacity: number;
  area: string;
  tags: string[];
  price?: number;
}

export const SPACES: Space[] = [
  {
    id: '1',
    name: 'Sala de Reunião 5 Pessoas',
    image: 'https://picsum.photos/seed/yevent1/800/600',
    city: 'Fortaleza',
    capacity: 5,
    area: '25m²',
    tags: ['Evento corporativo', 'Auditório', 'Fortaleza'],
    price: 150
  },
  {
    id: '2',
    name: 'Auditório para 25 pessoas',
    image: 'https://picsum.photos/seed/yevent2/800/600',
    city: 'Fortaleza',
    capacity: 25,
    area: '35m²',
    tags: ['Evento corporativo', 'Auditório', 'Fortaleza'],
    price: 350
  },
  {
    id: '3',
    name: 'Auditório para 50 pessoas',
    image: 'https://picsum.photos/seed/yevent3/800/600',
    city: 'Fortaleza',
    capacity: 50,
    area: '44m²',
    tags: ['Evento corporativo', 'Auditório', 'Fortaleza'],
    price: 550
  },
  {
    id: '4',
    name: 'Sala executiva para até 38 pessoas',
    image: 'https://picsum.photos/seed/yevent4/800/600',
    city: 'Fortaleza',
    capacity: 38,
    area: '40m²',
    tags: ['Evento corporativo', 'Auditório', 'Fortaleza'],
    price: 450
  },
  {
    id: '5',
    name: 'Espaço para 40 pessoas',
    image: 'https://picsum.photos/seed/yevent5/800/600',
    city: 'Salvador',
    capacity: 40,
    area: '34m²',
    tags: ['Evento corporativo', 'Sala de Aula', 'Salvador'],
    price: 400
  },
  {
    id: '6',
    name: 'Espaço para 25 pessoas',
    image: 'https://picsum.photos/seed/yevent6/800/600',
    city: 'Salvador',
    capacity: 25,
    area: '32m²',
    tags: ['Evento corporativo', 'Sala de Aula', 'Salvador'],
    price: 300
  }
];
