import { Type } from "class-transformer";
import { FrontEndConfiguration } from "./FrontEndConfiguration";
import { LoggingConfiguration } from "./LoggingConfiguration";

class ApplicationConfiguration {
    @Type(() => FrontEndConfiguration)
    frontend: FrontEndConfiguration;
    @Type(() => LoggingConfiguration)
    logging: LoggingConfiguration;

    constructor(frontend: FrontEndConfiguration, logging: LoggingConfiguration) {
        this.frontend = frontend;
        this.logging = logging;
    }

    public getFrontEndConfiguration(): FrontEndConfiguration {
        return this.frontend;
    }

    public getLoggingConfiguration(): LoggingConfiguration {
        return this.logging;
    }

}

const defaultApplicationConfiguration = new ApplicationConfiguration(new FrontEndConfiguration(), new LoggingConfiguration());

export { ApplicationConfiguration, defaultApplicationConfiguration }