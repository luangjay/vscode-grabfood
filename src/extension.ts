import * as vscode from 'vscode'
import * as path from 'path'
import { spawn } from 'child_process'

const rootPath = path.join(__dirname, '..')

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  await cmdSync('npm', ['install'])

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Extension "vscode-grabfood" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    vscode.commands.registerCommand('vscode-grabfood.orderFood', () => {
      cmd('npm', ['run', 'start'])
    })
  )
}

function cmd(command: string, args?: readonly string[]) {
  let startProcess = spawn(command, args, {
    shell: true,
    cwd: rootPath,
  })
  startProcess.stdout.on('data', (data) => {
    console.log(`${data}`)
  })
  startProcess.stderr.on('data', (data) => {
    console.error(`${data}`)
  })
}

function cmdSync(command: string, args?: readonly string[]) {
  let startProcess = spawn(command, args, {
    shell: true,
    cwd: rootPath,
  })
  return new Promise((resolve) => {
    startProcess.stdout.on('data', (data) => {
      console.log(`${data}`)
    })
    startProcess.stderr.on('data', (data) => {
      console.error(`${data}`)
    })
    startProcess.on('exit', (code) => {
      resolve(code)
    })
  })
}

// This method is called when your extension is deactivated
export function deactivate() {}
