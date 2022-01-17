import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<ResponseData> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  results: ResponseData[];

  static GeneratePaginatedResponse<ResponseData>(
    total: number,
    limit: number,
    offset: number,
    data: ResponseData[],
  ): PaginatedResponseDto<ResponseData> {
    const res = new PaginatedResponseDto<ResponseData>();
    res.total = total;
    res.limit = limit;
    res.offset = offset;
    res.results = data;
    return res;
  }
}
