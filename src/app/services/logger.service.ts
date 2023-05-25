import { Injectable } from '@angular/core';
import { Logger, LogLevel } from '../models/logger.model';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  info(message: string) {
    const logger = new Logger(LogLevel.INFO, message);
    logger.print();
  }

  warn(message: string) {
    const logger = new Logger(LogLevel.WARNING, message);
    logger.print();
  }

  error(message: string) {
    const logger = new Logger(LogLevel.ERROR, message);
    logger.print();
  }
}
