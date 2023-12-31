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
      orderNumber: "10000000",
      pieces: 2,
      companyId: 2,
      address: "Av. Javier Prado Este 123, San Isidro",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.091821072245597",
      longitude: "-77.03300870397547",
      orderevents: [],
    },
    {
      orderNumber: "10000001",
      pieces: 2,
      companyId: 3,
      address: "C. Esperanza 135-105, Miraflores 15074",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.120435",
      longitude: "-77.028868",
      orderevents: [],
    },
    {
      orderNumber: "10000002",
      pieces: 2,
      companyId: 4,
      address: "Av. El Polo 789, Surco",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.099931407193953",
      longitude: "-76.97147038863243",
      orderevents: [],
    },
    {
      orderNumber: "10000003",
      pieces: 2,
      companyId: 5,
      address: "Av. La Molina 1010, La Molina",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.069877571769927",
      longitude: "-76.95739441746852",
      orderevents: [],
    },
    {
      orderNumber: "10000004",
      pieces: 2,
      companyId: 6,
      address: "Av. Larco 1111, Miraflores",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.128643233118614",
      longitude: "-77.02954670397487",
      orderevents: [],
    },
    {
      orderNumber: "10000005",
      pieces: 2,
      companyId: 7,
      address: "Av. Salaverry 222, Jesus Maria",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.069116046033418",
      longitude: "-77.04012253281148",
      orderevents: [],
    },
    {
      orderNumber: "10000006",
      pieces: 2,
      companyId: 5,
      address: "Av. La Marina 333, Pueblo Libre",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.084190521712342",
      longitude: "-77.06466403096125",
      orderevents: [],
    },
    {
      orderNumber: "10000007",
      pieces: 2,
      companyId: 7,
      address: "Av. Tacna 444, Cercado de Lima",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.045567158273094",
      longitude: "-77.03736620397603",
      orderevents: [],
    },
    {
      orderNumber: "10000008",
      pieces: 2,
      companyId: 1,
      address: "Av. Garcilaso de la Vega 555, Lima",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.048536083494193",
      longitude: "-77.03908483281175",
      orderevents: [],
    },
    {
      orderNumber: "10000009",
      pieces: 2,
      companyId: 7,
      address: "Av. Los Jazmines 666, San Borja",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-11.998908010877459",
      longitude: "-77.04485189048397",
      orderevents: [],
    },
    {
      orderNumber: "10000010",
      pieces: 2,
      companyId: 2,
      address: "Av. Javier Prado Oeste 777, San Isidro",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.093127854745099",
      longitude: "-77.03920876164688",
      orderevents: [],
    },
    {
      orderNumber: "10000011",
      pieces: 2,
      companyId: 3,
      address: "Av. Petit Thouars 888, Lince",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.064183875001218",
      longitude: "-77.03624348863296",
      orderevents: [],
    },
    {
      orderNumber: "10000012",
      pieces: 2,
      companyId: 4,
      address: "Av. Paseo de la República 999, Lima",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.069694521549161",
      longitude: "-77.0312208174686",
      orderevents: [],
    },
    {
      orderNumber: "10000013",
      pieces: 2,
      companyId: 5,
      address: "Av. Benavides 1010, Miraflores",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.12588260952286",
      longitude: "-77.02064517513918",
      orderevents: [],
    },
    {
      orderNumber: "10000014",
      pieces: 2,
      companyId: 6,
      address: "Av. Huaylas 1111, Chorrillos",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.17354067377903",
      longitude: "-77.01925427513851",
      orderevents: [],
    },
    {
      orderNumber: "10000015",
      pieces: 2,
      companyId: 7,
      address: "Av. Santa Cruz 222, Miraflores",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.104712821004497",
      longitude: "-77.03283938273293",
      orderevents: [],
    },
    {
      orderNumber: "10000016",
      pieces: 2,
      companyId: 7,
      address: "Av. La Marina 333, Pueblo Libre",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.084148557325062",
      longitude: "-77.06476059048272",
      orderevents: [],
    },
    {
      orderNumber: "10000017",
      pieces: 2,
      companyId: 1,
      address: "Av. Tacna 444, Cercado de Lima",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.045556665665195",
      longitude: "-77.0373554751403",
      orderevents: [],
    },
    {
      orderNumber: "10000018",
      pieces: 2,
      companyId: 2,
      address: "Av. Garcilaso de la Vega 555, Lima",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.048515098510043",
      longitude: "-77.03904191746888",
      orderevents: [],
    },
    {
      orderNumber: "10000019",
      pieces: 2,
      companyId: 1,
      address: "Av. Los Jazmines 666, San Borja",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-11.99899196628485",
      longitude: "-77.04476605979822",
      orderevents: [],
    },
    {
      orderNumber: "10000020",
      pieces: 2,
      companyId: 4,
      address: "Av. Javier Prado Oeste 777, San Isidro",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.093075401012381",
      longitude: "-77.03914438863255",
      orderevents: [],
    },
    {
      orderNumber: "10000021",
      pieces: 2,
      companyId: 4,
      address: "Av. Petit Thouars 888, Lince",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.06428879377711",
      longitude: "-77.0362649463044",
      orderevents: [],
    },
    {
      orderNumber: "10000022",
      pieces: 2,
      companyId: 4,
      address: "Av. Paseo de la República 999, Lima",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.069684029885037",
      longitude: "-77.03123154630431",
      orderevents: [],
    },
    {
      orderNumber: "10000023",
      pieces: 2,
      companyId: 2,
      address: "Av. Benavides 1010, Miraflores",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.12588260952286",
      longitude: "-77.02058080212485",
      orderevents: [],
    },
    {
      orderNumber: "10000024",
      pieces: 2,
      companyId: 2,
      address: "Av. Huaylas 1115, Chorrillos",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.173669162006524",
      longitude: "-77.01920011746697",
      orderevents: [],
    },
    {
      orderNumber: "10000025",
      pieces: 2,
      companyId: 2,
      address: "Cruce de, Av. Arequipa y, Miraflores 15046",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.103364670652388",
      longitude: "-77.0316579327171",
      orderevents: [],
    },
    {
      orderNumber: "10000026",
      pieces: 2,
      companyId: 2,
      address: "Jr. Amazonas 450, Pueblo Libre 15086",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.085250120310265",
      longitude: "-77.06616606796194",
      orderevents: [],
    },
    {
      orderNumber: "10000027",
      pieces: 2,
      companyId: 2,
      address: "Av. Nicolás de Piérola 295, Lima 15001",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.047057104432183",
      longitude: "-77.04089599092768",
      orderevents: [],
    },
    {
      orderNumber: "10000028",
      pieces: 2,
      companyId: 3,
      address: "Av. Nicolás de Piérola 545, Lima 15001",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.04881938061965",
      longitude: "-77.03833381431143",
      orderevents: [],
    },
    {
      orderNumber: "10000029",
      pieces: 2,
      companyId: 3,
      address: "Lucumas con, Independencia 15333",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.00038772110193",
      longitude: "-77.04372536273344",
      orderevents: [],
    },
    {
      orderNumber: "10000030",
      pieces: 2,
      companyId: 3,
      address: "Av. Dos de Mayo 758, San Isidro 15073",
      consultantCode: "12345",
      consultantName: "Pedro Lopez",
      consultantPhone: "999988887",
      latitude: "-12.091019206583765",
      longitude: "-77.03950916904701",
      orderevents: [],
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
    { id: 1, description: "NATURA", container: "natura-folder" },
    { id: 2, description: "MARY KAY", container: "marykay-folder" },
    { id: 3, description: "ZONIA", container: "zonia-folder" },
    { id: 4, description: "BELCORP", container: "belcorp-folder" },
    { id: 5, description: "BE SIFRAH", container: "besifrah-folder" },
    { id: 6, description: "BAGUÉS", container: "bagues-folder" },
    { id: 7, description: "TU CALZADOO", container: "tucalzado-folder" }
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