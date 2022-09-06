import { Flavor } from '../types/Flavor';
import { ILogRegex } from '../types/LogRegex';
import { Version } from '../types/Version';

export async function getLogRegex(flavor: Flavor, version: Version): Promise<ILogRegex> {
    return (await import(`./${flavor}/${version}`)).LogRegex;
}
