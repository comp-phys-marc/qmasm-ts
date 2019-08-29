import 'jasmine';
import * as fs from 'fs';
import Lexer from '../src/lexer';
import featureTestTokens from './tokens/feature-test';

describe('lexer', () => {
    describe('lex', () => {
        it('should lex complex QMASM code correctly', () => {
            const featureTestQMASM = fs.readFileSync('spec/qmasm/feature-test.qmasm', 'utf8');
            let passingLexer = new Lexer(featureTestQMASM);
            let out = passingLexer.lex();

            expect(out.length).toEqual(featureTestTokens.length);
            
            for (let i = 0; i < out.length; i++) {
                for (let j = 0; j < out[i].length; j++) {
                    expect(out[i][j]).toEqual(featureTestTokens[i][j]);
                }
            }
        });
    });
});
