import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderEventDto {
  @ApiProperty({ type: String, example: 'Observations of the order event' })
  observations: string;

  @ApiProperty({ type: String, example: 'URL of the main photo' })
  mainPhotoUrl: string;

  @ApiProperty({ type: String, example: 'URL of the reference photo' })
  referencePhotoUrl: string;

  @ApiProperty({ type: String, example: 'Longitude of the event location' })
  longitude: string;

  @ApiProperty({ type: String, example: 'Latitude of the event location' })
  latitude: string;

  @ApiProperty({ type: Date, example: 'Creation date of the order event' })
  creationDate: Date;

  @ApiProperty({ type: Date, example: 'Update date of the order event', nullable: true })
  updateDate: Date;

  /* @ApiProperty({ type: String, example: 'ID of the associated order' })
  orderId: string; */

  @ApiProperty({ type: String })
  companyId: string;

  @ApiProperty({ type: String })
  orderNumber: string;

  @ApiProperty({ type: String, example: 'ID of the associated event' })
  eventId: string;

  @ApiProperty({ type: String, example: 'ID of the associated user' })
  userId: string;
}
