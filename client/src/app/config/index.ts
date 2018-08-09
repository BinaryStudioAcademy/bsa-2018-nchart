import configDev from './config.development';
import configProd from './config.production';
import { environment } from 'environments/environment';

export default environment.production ? configProd : configDev;
