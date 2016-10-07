export declare type ProtocolType = 'js' | 'browser' | 'all';
export declare const downloadAndGenerate: (version: string, destFilePath: string, type: ProtocolType) => Promise<void>;
