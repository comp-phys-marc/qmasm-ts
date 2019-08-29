import Lexer from './lexer';
import Parser from './parser';
import * as fs from 'fs';

const qmasm = fs.readFileSync('spec/qmasm/comparator.qmasm', 'utf8');

console.log(qmasm);

const lexer = new Lexer(qmasm, 0);
const tokens = lexer.lex();

console.log(tokens);

const parser = new Parser(tokens, false, 'spec/qmasm/');
const ast = parser.parse();

for (let i=0; i<ast.length; i++) {
    console.log(ast[i]);
    if (ast[i]['val'] && ast[i]['val']['elements']) {
        for (let j=0; j<ast[i]['val']['elements'].length; j++) {
            console.log(ast[i]['val']['elements'][j]);
        }
    }
    console.log(JSON.stringify(ast[i]));
    console.log('\n');
}
