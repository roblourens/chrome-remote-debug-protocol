import * as fetch from 'node-fetch'
const promisify = require('promisify-node');
const fs = promisify('fs');
import * as path from 'path'

import {IProtocol, Protocol as P} from './protocol'
import {convertDomains} from './protocolToCrdp';

interface IProtocolFetchResult {
    jsProtocol: IProtocol
    browserProtocol: IProtocol
}

const download = async (version: string): Promise<IProtocolFetchResult> => {
    const jsProtocolUrl = `https://chromium.googlesource.com/v8/v8/+/${version}/src/inspector/js_protocol.json`
    const browserProtocolUrl = `https://chromium.googlesource.com/chromium/src/+/${version}/third_party/WebKit/Source/core/inspector/browser_protocol.json`
    const protocolDefDir = `${__dirname}`

    const jsProtocolStr = await fetchProtocolJson(`${jsProtocolUrl}?format=TEXT`)
    const browserProtocolStr = await fetchProtocolJson(`${browserProtocolUrl}?format=TEXT`)
    await fs.writeFile(`${protocolDefDir}/js_protocol.json`, jsProtocolStr ,'utf-8')
    await fs.writeFile(`${protocolDefDir}/browser_protocol.json`, browserProtocolStr ,'utf-8')

    return {
        jsProtocol: JSON.parse(jsProtocolStr),
        browserProtocol: JSON.parse(browserProtocolStr)
    }
}

const fetchProtocolJson = async (url: string): Promise<string> => {
    const res = await fetch(url)
    const contents = await res.text()

    if (res.ok)
        // googlesource returns base64 encoded string, so let's decode it
        return Buffer.from(contents, 'base64').toString()
    else
        throw new Error(`Error downloading ${url} - ${res.status} - ${res.statusText}`)
}

export type ProtocolType = 'js'|'browser'|'all';
export const downloadAndGenerate = async (version: string, destFilePath: string, type: ProtocolType) => {
    const moduleName = path.basename(destFilePath, ".d.ts")
    const { jsProtocol, browserProtocol } = await download(version)
    const selectedDomains =
        type === 'js' ? jsProtocol.domains :
        type === 'browser' ? browserProtocol.domains :
            jsProtocol.domains.concat(browserProtocol.domains)

    const resultStr = convertDomains(moduleName, selectedDomains)

    console.log(`Writing to ${destFilePath}`)
    fs.writeFileSync(destFilePath, resultStr, 'utf-8')
}

/**
 * Use from command line:
 *
 * # Download master, write to ./lib/crdp.d.ts
 * node out/main
 *
 * # Download 53.0.2785.143, write to /project/typings/crdp.d.ts
 * node out/main 53.0.2785.143 /project/typings/crdp.d.ts <type>
 * where <type> is js|browser|all
 */
if (require.main === module) {
    const version = process.argv[2] || 'master'
    const destFilePath = process.argv[3] || `${__dirname}/crdp.d.ts`
    const type = process.argv[4] || 'all'
    downloadAndGenerate(version, destFilePath, <ProtocolType>type)
}
