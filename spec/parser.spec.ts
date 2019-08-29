import 'jasmine';
import * as fs from 'fs';
import Parser from '../src/parser';
import Lexer from '../src/lexer';
import testAst from './asts/feature-test';

describe('parser', () => {
    describe('parse', () => {
        it('should parse sample QMASM code correctly', () => {
            const samplingQMASM = fs.readFileSync('spec/qmasm/feature-test.qmasm', 'utf8');
            const lexer = new Lexer(samplingQMASM);
            const parser = new Parser(lexer.lex(), false, 'spec/qmasm/');
            const out = parser.parse();
            
            for (let i = 0; i < out.length; i++) {
                expect(out[i]).toEqual(testAst[i]);
            }
        });
    });
});
