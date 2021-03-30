const { exec } = require("child_process");

export class ShellCommand {

  async mkdir(path: string, deep: boolean = false): Promise<string> {
    const command = `mkdir ${ deep ? '-p' : null } ${path}`
    return this.execute(command)
  }

  async ls(path: string): Promise<string> {
    return this.execute(`ls ${path}`)
  }

  async rmrf(path: string): Promise<string> {
    return this.execute(`rm -rf ${path}`)
  }

  async execute(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error: Error, stdout: string, stderr: string) => {
        if (error || stderr) {
          reject(error || stderr);
        } else {
          resolve(stdout)
        }
      })
    });
  }

}