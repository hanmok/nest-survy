import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory { 
	constructor(@Inject(ConfigService) private configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions { 
		return {
			type: 'sqlite',
			// host: 'us-cdbr-east-06.cleardb.net',
			// host: this.configService.get<number>('DB_PORT'),
			synchronize: false, 
			database: this.configService.get<string>('DB_NAME'),
			autoLoadEntities: true
		}
	}
}

