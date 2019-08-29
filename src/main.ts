import Parser from './parser';
import Lexer from './lexer';
import * as fs from 'fs';

function parseString(qmasm:string) {
    const lexer = new Lexer(qmasm, 0);
    const tokens = lexer.lex();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    return ast;
}

exports.parse = function(file:string) {
    return parseString(fs.readFileSync(file, 'utf8'));
}

exports.parseString = parseString;