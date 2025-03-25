import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { AccountModule } from "./account/account.module";
import { JwtokenModule } from "./jwtoken/jwtoken.module";
import { UnitModule } from "./unit/unit.module";
import { MarkModule } from "./mark/mark.module";
import { DepartmentModule } from "./department/department.module";
import { IncidentModule } from "./incident/incident.module";
import { ChannelModule } from "./channel/channel.module";
import { BoloModule } from "./bolo/bolo.module";
import { LoggingModule } from "./logging/logging.module";
import { LoggingMiddleware } from "./logging/logging.middleware";

@Module({
  imports: [
    UserModule,
    AuthModule,
    AccountModule,
    JwtokenModule,
    UnitModule,
    MarkModule,
    DepartmentModule,
    IncidentModule,
    ChannelModule,
    BoloModule,
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}

// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggingMiddleware).forRoutes("*");
//   }
// }
