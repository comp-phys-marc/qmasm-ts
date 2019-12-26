import { Token, lookup } from './token';
import { WrongQuoteError } from './errors';

/**
 * Returns whether a given character could be an element of a numeric value.
 * @param c - The character.
 * @return Whether the character is numeric.
 */
function isNumeric(c:string): boolean {
    return (c == '.') || !isNaN(parseInt(c));
}

/**
 * Returns whether a given character is a letter.
 * @param c - The character.
 * @return Whether the character is a letter.
 */
function isLetter(c:string): boolean {
    if (c.match(/[a-z]/i)) {
        return true;
    }
    return false;
}

/**
 * Returns whether a given character is alphanumeric.
 * @param c - The character.
 * @return Whether the character is alphanumeric.
 */
function isAlpha(c:string): boolean {
    if (c.match(/^[_0-9a-zA-Z]+$/)) {
        return true;
    }
    return false;
}

/**
 * Returns whether a given character is a newline character.
 * @param c - The character.
 * @return Whether the character is a newline.
 */
function isNewline(c:string): boolean {
    if (c.match(/\n|\r(?!\n)|\u2028|\u2029|\r\n/g)) {
        return true;
    }
    return false;
}

/** Class representing a lexer. */
class Lexer {

    /** The string to lex. */
    input:string;
    /** The lexer's current cursor location. */
    cursor:number;

    /**
     * Creates a lexer.
     * @param input - The string to lex.
     * @param cursor - The starting cursor position.
     */
    constructor(input:string, cursor:number = 0) {
        this.input = input;
        this.cursor = cursor;
    }

    /**
     * Calling this method lexes the code represented by the provided string.
     * @return An array of tokens and their corresponding values.
     */
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

    /**
     * Reads a character and advances the cursor.
     * @param num - Optional cursor position modifier.
     */
    readChar = (num:number=1): string => {
        this.cursor += num;
        return this.input[this.cursor - num];
    }

    /**
     * Reads a comment.
     * @return The comment string.
     */
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

    /**
     * Determines whether the next character to process equals a given character.
     * @param c - The given character.
     * @return Whether the next character equals the given character.
     */
    peekEq = (c:string): boolean => (this.peek() == c);

    /**
     * Reads a character without advancing the cursor.
     * @param index - Optional peek position offset.
     */
    peek = (index:number=0): string => this.input[this.cursor + index]

    /**
     * Reads a numeric value.
     * @return The numeric value as a string.
     */
    readNumeric = (): string => {
        let num = '';
        while (isNumeric(this.peek())) {
            num += this.readChar();
        }
        return num;
    }

    /**
     * Reads an alphanumeric value.
     * @return The alphanumeric value as a string.
     */
    readAlpha = (): string => {
        let alpha = '';
        while (isAlpha(this.peek())) {
            alpha += this.readChar();
        }
        return alpha;
    }

    /**
     * Reads a string literal.
     * @param terminator - The literal's termination character.
     * @return The literal as a string.
     */
    readStringLiteral = (terminator:string): string => {
        let lit = '';
        let char = '';
        while (!(terminator == char)) {
            char = this.readChar();
            lit += char;
        }
        return lit;
    }

    /**
     * Advances the cusor past the next block of whitespace.
     */
    skipWhitespace = (): null => {
        while (' \t\n\r\v'.indexOf(this.peek()) > -1) {
            this.cursor += 1;
        }
        return null;
    }
    
    /**
     * Lexes the next token.
     * @return The next token and its corresponding value.
     */
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
