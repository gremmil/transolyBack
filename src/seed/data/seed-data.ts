import { CreateOrderDto } from "src/orders/dto/create-order.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { CreateCompanyDto, CreateDistrictDto, CreateEventDto, CreateProvinceDto } from "src/masters/dto/create-master.dto";
interface SeedData {
  orders: Array<CreateOrderDto>;
  users: Array<CreateUserDto>;
  events: Array<CreateEventDto>;
  companies: Array<CreateCompanyDto>;
  provinces: Array<CreateProvinceDto>;
  districts: Array<CreateDistrictDto>;
}

export const initialData: SeedData = {
  orders: [
    {
      orderNumber: '99999999',
      pieces: 2,
      companyId: 1,
      address: '',
      consultantCode: '12345',
      consultantName: 'Pedro Lopez',
      consultantPhone: '999988887',
      latitude: '',
      longitude: '',
      orderevents: []
    },
    {
      orderNumber: '88888888',
      pieces: 1,
      companyId: 2,
      address: '',
      consultantCode: '12345',
      consultantName: 'Juan Lopez',
      consultantPhone: '999988887',
      latitude: '',
      longitude: '',
      orderevents: []
    },
    {
      orderNumber: '77777777',
      pieces: 3,
      companyId: 3,
      address: '',
      consultantCode: '12345',
      consultantName: 'Benito Lopez',
      consultantPhone: '999988887',
      latitude: '',
      longitude: '',
      orderevents: []
    },

  ],
  events: [
    { id: 1, description: 'En Almacén', showInWeb: false },
    { id: 2, description: 'En envio', showInWeb: false },
    { id: 3, description: "Entregado", showInWeb: true },
    { id: 4, description: "Ausente primera visita", showInWeb: true },
    { id: 5, description: "Ausente segunda visita", showInWeb: true },
    { id: 6, description: "Ausente tercera visita (R)", showInWeb: true },
    { id: 7, description: "Ausente cuarta visita (R)", showInWeb: true },
    { id: 8, description: "Dirección incorrecta", showInWeb: true },
    { id: 9, description: "CN rechaza pedido", showInWeb: true },
    { id: 10, description: "Oficina o local cerrado", showInWeb: true },
    { id: 11, description: "CN de viaje", showInWeb: true },
    { id: 12, description: "Zona de dificil acceso / peligrosa", showInWeb: true },
    { id: 13, description: "CN se mudó", showInWeb: true },
    { id: 14, description: "Pendiente de entrega", showInWeb: true }
  ],
  companies: [
    { id: 1, description: "NATURA", container: "contenedor-natura" },
    { id: 2, description: "MARY KAY", container: "contenedor-mk" },
    { id: 3, description: "ZONIA", container: "contenedor-zonia" },
    { id: 4, description: "BELCORP", container: "contenedor-belcorp" },
    { id: 5, description: "BE SIFRAH", container: "contenedor-besifrah" },
    { id: 6, description: "BAGUÉS", container: "contenedor-bagues" },
    { id: 7, description: "TU CALZADOO", container: "contenedor-tucalzado" }
  ],
  provinces: [
    { id: 1, description: 'Province1' },
    { id: 2, description: 'Province2' },
    { id: 3, description: 'Province3' },
    { id: 4, description: 'Province4' },
    { id: 5, description: 'Province5' },
    { id: 6, description: 'Province6' },
    { id: 7, description: 'Province7' },
  ],
  districts: [
    { id: 1, description: 'District1' },
    { id: 2, description: 'District2' },
    { id: 3, description: 'District3' },
    { id: 4, description: 'District4' },
    { id: 5, description: 'District5' },
    { id: 6, description: 'District6' },
    { id: 7, description: 'District7' },
  ],
  users: [
    {
      userName: 'admin1',
      password: 'admin1',
    },
    {
      userName: 'admin2',
      password: 'admin2',
    },
    {
      userName: 'admin3',
      password: 'admin3',
    }
  ],
}