import { setupProxy2Ip } from './tools/proxy2ip.js';
import { setupCountLine } from './tools/countline.js';
import { setupMultipleCopy } from './tools/multiplecopy.js';
import { calculateProxy } from './tools/calculateCost.js'

setupProxy2Ip();
calculateProxy();
setupCountLine();
setupMultipleCopy();