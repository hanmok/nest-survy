import { Expose, Transform } from 'class-transformer';
import { Geo } from 'src/geo/geo.entity';

export class UserDetailDto {
  @Expose()
  collected_reward: number;

  @Expose({ name: 'birthDate' })
  //   @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  birth_date: string;
  // getBirthDate(): string {
  // 	return this.birth_date.toISOString()
  // }

  @Expose()
  age: number | null;

  @Expose()
  is_male: number | null;

  @Expose()
  reputation: number;

  @Expose()
  fatigue: number;

  @Expose()
  home_address: Geo | null;

  @Expose()
  office_address: Geo | null;

  // @Expose()
  // num_of_participation: number;
}

// interface UserDetail {
// 	collected_reward: number;
// 	birth_date: Date | null;
// 	age: number | null;
// 	is_male: number | null;
// 	reputation: number;
// 	fatigue: number;
// 	home_address: Geo | null;
// 	office_address: Geo | null;
// 	// num_of_participation: number;
//   }
