import development from './development';
import production from './production';

let env = process.env.ENV || 'development';
let settings = (env !== 'production' ? development : production);

module.exports = settings;