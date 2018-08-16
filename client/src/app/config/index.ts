import configDev from '@app/config/config.development';
import configProd from '@app/config/config.production';
import { environment } from 'environments/environment';

export default (environment.production ? configProd : configDev);
