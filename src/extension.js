const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const os = require('os');
const i18n = require('./i18n').translation;

function activate(context) {
	let disposable = vscode.commands.registerCommand('diffCode.compareWithClipboard', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('没有打开的编辑器');
			return; // No open text editor
		}

		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);

		// 获取剪切板内容
		const clipboardText = await vscode.env.clipboard.readText();

		// 创建临时文件
		const selectedTextFile = path.join(os.tmpdir(), 'vscode-plugin-diff-clipboard-selectedText.txt');
		const clipboardTextFile = path.join(os.tmpdir(), 'vscode-plugin-diff-clipboard-clipboardText.txt');

		// 写入文件
		fs.writeFileSync(selectedTextFile, selectedText);
		fs.writeFileSync(clipboardTextFile, clipboardText);

		// 打开对比视图
		const selectedTextUri = vscode.Uri.file(selectedTextFile);
		const clipboardTextUri = vscode.Uri.file(clipboardTextFile);

		const selectedTextTitle = i18n('selectedText');
		const clipboardTextTitle = i18n('clipboardText');
		vscode.commands.executeCommand('vscode.diff', selectedTextUri, clipboardTextUri, selectedTextTitle + ' ↔ ' + clipboardTextTitle);
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
