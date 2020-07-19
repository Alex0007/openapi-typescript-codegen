import * as path from 'path';

import { Service } from '../client/interfaces/Service';
import { writeFile } from './fileSystem';
import { format } from './format';
import { Templates } from './registerHandlebarTemplates';

export async function writeClientServicesIndex(services: Service[], templates: Templates, outputPath: string): Promise<void> {
    const templateResult = templates.servicesIndex({
        services
    });
    
    await writeFile(
        path.resolve(outputPath, 'index.ts'),
        format(templateResult)
    );
}
