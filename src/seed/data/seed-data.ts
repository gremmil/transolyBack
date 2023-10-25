interface SeedOrder {
  orderNumber: string;
  pieces: number;
}
interface SeedUser {
  name: string;
  password: string;
}
interface SeedConsultant {
  name: string;
  code: string;
  phone: string;
}

interface SeedConsultantAddress {
  latitude: string;
  longitude: string;
  description: string;
}
interface SeedData {
  orders: Array<SeedOrder>;
  users: Array<SeedUser>;
  consultants: Array<SeedConsultant>;
  consultantsAddresses: Array<SeedConsultantAddress>;
  events: Array<{ description: string }>;
  companies: Array<{ description: string }>;
  provinces: Array<{ description: string }>;
  districts: Array<{ description: string }>;
}


export const initialData: SeedData = {
  orders: [
    {
      orderNumber: '99999999',
      pieces: 2,
    },
    {
      orderNumber: '88888888',
      pieces: 3,
    }
  ],
  users: [
    {
      name: 'gremmil',
      password: 'gremmil',
    }
  ],
  consultants: [
    {
      name: 'Consultant1',
      code: 'code1',
      phone: '999999888'
    },
    {
      name: 'Consultant2',
      code: 'code2',
      phone: '999999888'
    }
  ],
  consultantsAddresses: [
    {
      description: 'description1',
      longitude: '',
      latitude: '',
    },
    {
      description: 'description2',
      longitude: '',
      latitude: '',
    }
  ],
  events: [
    { description: 'Event1' },
    { description: 'Event2' },
    { description: 'Event3' },
    { description: 'Event4' },
    { description: 'Event5' },
    { description: 'Event6' },
    { description: 'Event7' },
  ],
  companies: [
    { description: 'Company1' },
    { description: 'Company2' },
    { description: 'Company3' },
    { description: 'Company4' },
    { description: 'Company5' },
    { description: 'Company6' },
    { description: 'Company7' },
  ],
  provinces: [
    { description: 'Province1' },
    { description: 'Province2' },
    { description: 'Province3' },
    { description: 'Province4' },
    { description: 'Province5' },
    { description: 'Province6' },
    { description: 'Province7' },
  ],
  districts: [
    { description: 'District1' },
    { description: 'District2' },
    { description: 'District3' },
    { description: 'District4' },
    { description: 'District5' },
    { description: 'District6' },
    { description: 'District7' },
  ],
}