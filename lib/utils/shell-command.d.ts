export declare class ShellCommand {
    mkdir(path: string, deep?: boolean): Promise<string>;
    ls(path: string): Promise<string>;
    rmrf(path: string): Promise<string>;
    execute(command: string): Promise<string>;
}
