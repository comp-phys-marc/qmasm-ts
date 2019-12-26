import Parser from './parser';
import Lexer from './lexer';
import * as fs from 'fs';

/**
 * Returns the abstract syntax tree for a given string of QMASM code.
 * @param qmasm - The code string.
 * @return The corresponding AST.
 */
function parseString(qmasm:string) {
    const lexer = new Lexer(qmasm, 0);
    const tokens = lexer.lex();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    return ast;
}

/**
 * Returns the abstract syntax tree for a given QMASM file.
 * @param file - The file location.
 * @return The corresponding AST.
 */
exports.parse = function(file:string) {
    return parseString(fs.readFileSync(file, 'utf8'));
}

exports.parseString = parseString;