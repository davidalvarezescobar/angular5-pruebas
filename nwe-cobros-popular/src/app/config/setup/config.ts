class AppConfig {

  public config: any;
  public functionality: string;

  public setConfig(config: any): void {
    this.config = config;
  }

  public setFunctionality(functionality: string): void {
    this.functionality = functionality;
  }
}

export const Environment = new AppConfig();
