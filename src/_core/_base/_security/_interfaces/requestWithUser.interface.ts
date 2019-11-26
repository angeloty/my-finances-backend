import { Request } from 'express';
import { BaseUserInterface } from './user.interface';
export interface RequestWithUser<U extends BaseUserInterface> extends Request {
  user: U;
}
