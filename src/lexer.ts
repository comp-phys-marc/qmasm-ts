import { Token, lookup } from './token';
import { WrongQuoteError } from './errors';

function isNumeric(c:string): boolean {
    return (c == '.') || !isNaN(parseInt(c));
}

function isLetter(c:string): boolean {
    if (c.match(/[a-z]/i)) {
        return true;
    }
    return false;
}

function isAlpha(c:string): boolean {
    if (c.match(/^[_0-9a-zA-Z]+$/)) {
        return true;
    }
    return false;
}

function isNewline(c:string): boolean {
    if (c.match(/\n|\r(?!\n)|\u2028|\u2029|\r\n/g)) {
        return true;
    }
    return false;
}

class Lexer {

    input:string;
    cursor:number;

    constructor(input:string, cursor:number = 0) {
        this.input = input;
        this.cursor = cursor;
    }

    lex = (): Array<[Token, (number | String)?]> => {
        let tokens:Array<[Token, (number | String)?]> = [];
        let token:[Token, (number | String)?];

        while (this.cursor < this.input.length) {
            let empty = true;
            let i = 0;
            while (empty) {
                if (this.peek(i) && isNewline(this.peek(i))) {
                    tokens.push([Token.Newline]);
                    i++;
                } else {
                    empty = false;
                }
            }
            token = this.nextToken();
            if (token) {
                tokens.push(token);
            }
        }
        return tokens;
    }

    readChar = (num:number=1): string => {
        this.cursor += num;
        return this.input[this.cursor - num];
    }
    readComment = () => {
        let char = this.peek();
        let comment = '';
        while(char && !isNewline(char)) {
            this.readChar();
            comment += char;
            char = this.peek();
        }
        return comment;
    }

    peekEq = (c:string): boolean => (this.peek() == c);
    peek = (index:number=0): string => this.input[this.cursor + index]

    readNumeric = (): string => {
        let num = '';
        while (isNumeric(this.peek())) {
            num += this.readChar();
        }
        return num;
    }
    readAlpha = (): string => {
        let alpha = '';
        while (isAlpha(this.peek())) {
            alpha += this.readChar();
        }
        return alpha;
    }
    readStringLiteral = (terminator:string): string => {
        let lit = '';
        let char = '';
        while (!(terminator == char)) {
            char = this.readChar();
            lit += char;
        }
        return lit;
    }
    skipWhitespace = (): null => {
        while (' \t\n\r\v'.indexOf(this.peek()) > -1) {
            this.cursor += 1;
        }
        return null;
    }
    
    nextToken = (): [Token, (number | String)?] => {
        this.skipWhitespace();

        if (this.cursor == this.input.length) {
            return [Token.EndOfFile];
        }

        let char = this.peek();
        this.readChar();

        if (char == '.') {
            if (this.peek() == '.') {
                this.readChar();
                if (this.peek() == '.') {
                    this.readChar();
                    return [Token.Continue];
                } else {
                    return [Token.Period, Token.Period];
                }
            }
            return [Token.Period];
        }
        if (char == '*') {
            if (this.peek() == '*') {
                this.readChar();
                return [Token.Pwr];
            }
            return [Token.Times];
        }
        if (char == '^') {
            return [Token.Exp];
        }
        if (char == '|' ) {
            if (this.peek() == '|') {
                this.readChar();
                return [Token.Or];
            }
            return [Token.Pipe];
        }
        if (char == ':') {
            if (this.peek() == '=') {
                this.readChar();
                return [Token.Binding];
            }
            return [Token.Colon];
        }
        if (char == '/') {
            if (this.peek() == '=') {
                this.readChar();
                return [Token.Neq];
            }
            return [Token.Divide];
        }
        if (char == '-') {
            if (this.peek() == '>') {
                this.readChar();
                return [Token.Convert];
            }
            return [Token.Minus];
        }
        if (char == '>') {
            if (this.peek() == '>') {
                this.readChar();
                return [Token.Right];
            } else if (this.peek() == '=') {
                this.readChar();
                return [Token.Geq];
            }
            return [Token.More];
        }
        if (char == '<') {
            if (this.peek() == '<') {
                this.readChar();
                return [Token.Left];
            } else if (this.peek() == '=') {
                this.readChar();
                return [Token.Leq];
            } else if (this.peek() == '-') {
                this.readChar();
                if (this.peek() == '>') {
                    this.readChar();
                    return [Token.Equiv];
                }
            }
            return [Token.Less];
        }
        if (char == '+') {
            return [Token.Plus];
        }
        if (char == '#') {
            return [Token.Comment, this.readComment()];
        }
        if (char == '\"') {
            let stringLiteral = char + this.readStringLiteral('\"');
            return [Token.String, new String(stringLiteral)];
        }
        if (char == '\'') {
            throw WrongQuoteError;
        }
        if (char == '$') {
            let literal = char + this.readAlpha();
            return [Token.Ancilliary, literal];
        }
        if (char == '&') {
            if (this.peek() == '&') {
                this.readChar();
                return [Token.And];
            }
            return [Token.Amp];
        }
        if (char == '!') {
            if (isLetter(this.peek())) {
                let literal = char + this.readAlpha();
                let look = lookup(literal);
                if (look == Token.Assert
                    || look == Token.Include
                    || look == Token.Let
                    || look == Token.Next
                    || look == Token.BeginMacro
                    || look == Token.UseMacro
                    || look == Token.EndMacro
                    || look == Token.If
                    || look == Token.Else
                    || look == Token.EndIf
                    || look == Token.For
                    || look == Token.EndFor) {
                        this.skipWhitespace();
                        return [look];
                }
            }
            return [Token.Bang];
        }
        if (isLetter(char)) {
            let literal = char + this.readAlpha();
            if (literal.toLowerCase() == 'true') {
                return [Token.True];
            } else if (literal.toLowerCase() == 'false') {
                return [Token.False];
            }
            return [Token.Identifier, literal.toString()];
        } else if (!isNumeric(char)) {
            let look = lookup(char);
            if (look != Token.Identifier) {
                return [lookup(char)];
            } else {
                return [Token.Illegal];
            }
        } else {
            let num = char + this.readNumeric();
            if (num.indexOf('.') != -1) {
                return [Token.Float, parseFloat(num)];
            } else {
                return [Token.Int, parseFloat(num)];
            }
        }
    }
}

export default Lexer;
