import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const SessionDC = createParamDecorator(
  (_, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().session
);
