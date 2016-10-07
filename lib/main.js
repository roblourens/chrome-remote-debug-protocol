"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fetch = require('node-fetch');
const promisify = require('promisify-node');
const fs = promisify('fs');
const path = require('path');
const protocolToCrdp_1 = require('./protocolToCrdp');
const download = (version) => __awaiter(this, void 0, void 0, function* () {
    const jsProtocolUrl = `https://chromium.googlesource.com/v8/v8/+/${version}/src/inspector/js_protocol.json`;
    const browserProtocolUrl = `https://chromium.googlesource.com/chromium/src/+/${version}/third_party/WebKit/Source/core/inspector/browser_protocol.json`;
    const protocolDefDir = `${__dirname}`;
    const jsProtocolStr = yield fetchProtocolJson(`${jsProtocolUrl}?format=TEXT`);
    const browserProtocolStr = yield fetchProtocolJson(`${browserProtocolUrl}?format=TEXT`);
    yield fs.writeFile(`${protocolDefDir}/js_protocol.json`, jsProtocolStr, 'utf-8');
    yield fs.writeFile(`${protocolDefDir}/browser_protocol.json`, browserProtocolStr, 'utf-8');
    return {
        jsProtocol: JSON.parse(jsProtocolStr),
        browserProtocol: JSON.parse(browserProtocolStr)
    };
});
const fetchProtocolJson = (url) => __awaiter(this, void 0, void 0, function* () {
    const res = yield fetch(url);
    const contents = yield res.text();
    if (res.ok)
        // googlesource returns base64 encoded string, so let's decode it
        return Buffer.from(contents, 'base64').toString();
    else
        throw new Error(`Error downloading ${url} - ${res.status} - ${res.statusText}`);
});
exports.downloadAndGenerate = (version, destFilePath, type) => __awaiter(this, void 0, void 0, function* () {
    const moduleName = path.basename(destFilePath, ".d.ts");
    const { jsProtocol, browserProtocol } = yield download(version);
    const selectedDomains = type === 'js' ? jsProtocol.domains :
        type === 'browser' ? browserProtocol.domains :
            jsProtocol.domains.concat(browserProtocol.domains);
    const resultStr = protocolToCrdp_1.convertDomains(moduleName, selectedDomains);
    console.log(`Writing to ${destFilePath}`);
    fs.writeFileSync(destFilePath, resultStr, 'utf-8');
});
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
    const version = process.argv[2] || 'master';
    const destFilePath = process.argv[3] || `${__dirname}/crdp.d.ts`;
    const type = process.argv[4] || 'all';
    exports.downloadAndGenerate(version, destFilePath, type);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE1BQVksS0FBSyxXQUFNLFlBQ3ZCLENBQUMsQ0FEa0M7QUFDbkMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDNUMsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNCLE1BQVksSUFBSSxXQUFNLE1BRXRCLENBQUMsQ0FGMkI7QUFHNUIsaUNBQTZCLGtCQUFrQixDQUFDLENBQUE7QUFPaEQsTUFBTSxRQUFRLEdBQUcsQ0FBTyxPQUFlO0lBQ25DLE1BQU0sYUFBYSxHQUFHLDZDQUE2QyxPQUFPLGlDQUFpQyxDQUFBO0lBQzNHLE1BQU0sa0JBQWtCLEdBQUcsb0RBQW9ELE9BQU8saUVBQWlFLENBQUE7SUFDdkosTUFBTSxjQUFjLEdBQUcsR0FBRyxTQUFTLEVBQUUsQ0FBQTtJQUVyQyxNQUFNLGFBQWEsR0FBRyxNQUFNLGlCQUFpQixDQUFDLEdBQUcsYUFBYSxjQUFjLENBQUMsQ0FBQTtJQUM3RSxNQUFNLGtCQUFrQixHQUFHLE1BQU0saUJBQWlCLENBQUMsR0FBRyxrQkFBa0IsY0FBYyxDQUFDLENBQUE7SUFDdkYsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsY0FBYyxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDaEYsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsY0FBYyx3QkFBd0IsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUUxRixNQUFNLENBQUM7UUFDSCxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDckMsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUM7S0FDbEQsQ0FBQTtBQUNMLENBQUMsQ0FBQSxDQUFBO0FBRUQsTUFBTSxpQkFBaUIsR0FBRyxDQUFPLEdBQVc7SUFDeEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDNUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7SUFFakMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNQLGlFQUFpRTtRQUNqRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDckQsSUFBSTtRQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLEdBQUcsTUFBTSxHQUFHLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZGLENBQUMsQ0FBQSxDQUFBO0FBR1ksMkJBQW1CLEdBQUcsQ0FBTyxPQUFlLEVBQUUsWUFBb0IsRUFBRSxJQUFrQjtJQUMvRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN2RCxNQUFNLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxHQUFHLE1BQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQy9ELE1BQU0sZUFBZSxHQUNqQixJQUFJLEtBQUssSUFBSSxHQUFHLFVBQVUsQ0FBQyxPQUFPO1FBQ2xDLElBQUksS0FBSyxTQUFTLEdBQUcsZUFBZSxDQUFDLE9BQU87WUFDeEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRTFELE1BQU0sU0FBUyxHQUFHLCtCQUFjLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFBO0lBRTdELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxZQUFZLEVBQUUsQ0FBQyxDQUFBO0lBQ3pDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUN0RCxDQUFDLENBQUEsQ0FBQTtBQUVEOzs7Ozs7Ozs7R0FTRztBQUNILEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMxQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQTtJQUMzQyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxZQUFZLENBQUE7SUFDaEUsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUE7SUFDckMsMkJBQW1CLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBZ0IsSUFBSSxDQUFDLENBQUE7QUFDbEUsQ0FBQyJ9