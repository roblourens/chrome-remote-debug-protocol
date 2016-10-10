export declare type ProtocolType = 'js' | 'browser' | 'all';
export declare const downloadAndGenerate: (destFilePath: string, version?: string, type?: ProtocolType) => Promise<void>;
