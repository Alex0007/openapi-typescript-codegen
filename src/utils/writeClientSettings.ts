import * as path from 'path';
import stringifyObject from 'stringify-object';

import { Client } from '../client/interfaces/Client';
import { HttpClient } from '../index';
import { writeFile } from './fileSystem';
import { Templates } from './registerHandlebarTemplates';

const indent = '    ';

/**
 * Generate OpenAPI configuration file "OpenAPI.ts"
 * @param client Client object, containing, models, schemas and services.
 * @param templates The loaded handlebar templates.
 * @param outputPath Directory to write the generated files to.
 * @param httpClient The selected httpClient (fetch or XHR).
 * @param globalHeaders Common HTTP headers
 */
export async function writeClientSettings(client: Client, templates: Templates, outputPath: string, httpClient: HttpClient, globalHeaders: { [key: string]: any }): Promise<void> {
    await writeFile(
        path.resolve(outputPath, 'OpenAPI.ts'),
        templates.settings({
            httpClient,
            globalHeaders: stringifyObject(
                globalHeaders,
                {
                    indent,
                },
                indent
            ),
            server: client.server,
            version: client.version,
        })
    );
}
