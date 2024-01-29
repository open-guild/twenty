import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';

import { GraphQLConfigService } from 'src/graphql-config.service';
import { validate } from 'src/integrations/environment/environment.validation';

import { CoreModule } from './core/core.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { HealthModule } from './health/health.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.test',
      isGlobal: true,
      validate,
    }),
    GraphQLModule.forRootAsync<YogaDriverConfig>({
      driver: YogaDriver,
      imports: [CoreModule],
      useClass: GraphQLConfigService,
    }),
    HealthModule,
    IntegrationsModule,
    CoreModule,
    WorkspaceModule,
  ],
})
export class AppModule {}
