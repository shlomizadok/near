type LogLevel = 'info' | 'error' | 'warn' | 'debug';

class Logger {
  private isDevelopment = process.env.NODE_ENV !== 'production';

  private log(level: LogLevel, message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      const timestamp = new Date().toISOString();
      const formattedMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;

      switch (level) {
        case 'error':
          console.error(formattedMessage, ...args);
          break;
        case 'warn':
          console.warn(formattedMessage, ...args);
          break;
        case 'info':
          console.info(formattedMessage, ...args);
          break;
        case 'debug':
          console.debug(formattedMessage, ...args);
          break;
      }
    }
  }

  info(message: string, ...args: unknown[]): void {
    this.log('info', message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.log('error', message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.log('warn', message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.log('debug', message, ...args);
  }
}

export const logger = new Logger();
