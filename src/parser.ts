import * as fs from 'fs';
import Lexer from './lexer';
import { 
    Token
} from './token';
import {
    BadIntError,
    BadUseMacroError,
    BadMacroNameError,
    UninitializedMacroInstanceError,
    BadChainError,
    BadBindingError,
    BadDeclarationError,
    BadEquivalenceError,
    BadIncludeError,
    BadLoopError,
    BadIteratorError,
    UndeclaredQubitError,
    UndeclaredVariableError,
    BadFormatError,
    BadIdentifierError,
    BadRegisterIndexError,
    BadConditionStructureError
} from './errors';
import { 
    AstNode,
    Or,
    Assert,
    Register,
    SetParam,
    UseMacro,
    Include,
    Parameter,
    Condition,
    Iterator,
    Int,
    Range,
    Bang,
    Amp,
    Tilde,
    Float,
    Bool,
    Chain,
    Left,
    Right,
    AntiChain,
    Qubit,
    Minus,
    Plus,
    Times,
    Divide,
    Power,
    Exp,
    Str,
    Expression,
    GetOutput,
    Equals,
    NotEqual,
    Equivalence,
    Convert,
    Pin,
    Less,
    More,
    And,
    Macro,
    Pipe,
    Mod,
    Geq,
    Leq,
    Weight,
    Coupling,
    Variable,
    Let,
    Ancilliary
} from './ast';

class Parser {

    tokens:Array<[Token, (number | String)?]>;
    macros:Array<string>;
    symbols:Array<string>;
    variables:Array<string>;
    instances:Object;
    parameters:Array<string>;
    prepStates:Array<string>;
    clauseParsers:Array<Parser>;
    macroParsers:Object;
    isSubContext:boolean;
    filePath:string;
    
    constructor(tokens:Array<[Token, (number | String)?]>, isSubContext:boolean=false, filePath:string='') {
        this.tokens = tokens;
        this.macros = [];
        this.symbols = [];
        this.variables = [];
        this.parameters = [];
        this.instances = {};
        this.clauseParsers = [];
        this.macroParsers = {};
        this.isSubContext = isSubContext;
        this.filePath = filePath;
    }

    parse(): Array<AstNode> {
        let ast:Array<AstNode> = [];
        let i = 0;
        while (i < (this.tokens.length - 1)) {
            let nodes = this.parseNode(this.tokens.slice(i));
            ast = ast.concat(
                    nodes ? nodes : []
                );
            if (this.tokens[i][0] == Token.BeginMacro) {
                while (!(this.tokens[i] == undefined) && !(this.matchNext(this.tokens.slice(i), [Token.EndOfFile])) && !(this.matchNext(this.tokens.slice(i), [Token.EndMacro]))) {
                    i++;
                }
                i++;
            } else if (this.tokens[i][0] == Token.If) {
                while (!(this.tokens[i] == undefined) && !(this.matchNext(this.tokens.slice(i), [Token.EndOfFile])) && !(this.matchNext(this.tokens.slice(i), [Token.EndIf]))) {
                    i++;
                }
            } else if (this.tokens[i][0] == Token.For) {
                while (!(this.tokens[i] == undefined) && !(this.matchNext(this.tokens.slice(i), [Token.EndOfFile])) && !(this.matchNext(this.tokens.slice(i), [Token.EndFor]))) {
                    i++;
                }
            } else {
                while (!(this.tokens[i] == undefined) && !(this.matchNext(this.tokens.slice(i), [Token.EndOfFile])) && !(this.matchNext(this.tokens.slice(i), [Token.Newline]))) {
                    i++;
                }
            }
            i++;
        }
        return ast;
    }

    parseNode(tokens:Array<[Token, (number | String)?]>, allowVariables:boolean=false): Array<AstNode> {
        const token = tokens[0];
        switch(token[0]) {
            case Token.True:
                return [new Bool(true)];
            case Token.False:
                return [new Bool(false)];
            case Token.Let:
                return this.let(tokens);
            case Token.If:
                return this.if(tokens);
            case Token.For:
                return this.for(tokens.slice(1));
            case Token.Identifier:
                if (!allowVariables) {
                    if (tokens.length > 3 && this.matchNext(tokens, [Token.Identifier, Token.Period, Token.Identifier])) {
                        if (Object.keys(this.instances).includes(token[1].toString())) {
                            let inst = token[1].toString();
                            let sym = this.macroParsers[this.instances[inst]].symbol(tokens.slice(2));
                            return [new SetParam(inst, sym[0])];
                        } else {
                            throw UninitializedMacroInstanceError;
                        }
                    }
                    this.symbols.push(token[1].toString());
                    return this.symbol(tokens);
                } else if (allowVariables) {
                    if (tokens.length > 3 && this.matchNext(tokens, [Token.Identifier, Token.Period, Token.Identifier])) {
                        if (Object.keys(this.instances).includes(token[1].toString())) {
                            let inst = token[1].toString();
                            let qubit = new Qubit(tokens[2][1].toString());
                            return [new GetOutput(inst, qubit)];
                        } else {
                            throw UninitializedMacroInstanceError;
                        }
                    } else if (this.symbols.includes(token[1].toString()) || this.variables.includes(token[1].toString())) {
                        return [this.parseSymbol(tokens)[0]];
                    } else if (this.isSubContext) {
                        this.parameters.push(token[1].toString());
                        return [new Parameter(token[1].toString())];
                    }
                }
                throw BadIdentifierError;
            case Token.Ancilliary:
                if (!allowVariables) {
                    this.symbols.push(token[1].toString());
                    return this.symbol(tokens);
                } else if (allowVariables && this.symbols.includes(token[1].toString())) {
                    return [new Ancilliary(token[1].toString())];
                } else if (allowVariables && this.isSubContext) {
                    this.parameters.push(token[1].toString());
                    return [new Parameter(token[1].toString())];
                }
                throw BadIdentifierError;
            case Token.BeginMacro:
                return this.macro(tokens.slice(1));
            case Token.UseMacro:
                return this.use(tokens.slice(1));
            case Token.Assert:
                return this.assert(tokens.slice(1));
            case Token.Include:
                return this.include(tokens[1]);
            case Token.Int:
                return [new Int(Number(tokens[0][1]))];
            case Token.Float:
                    return [new Float(Number(tokens[0][1]))];
            case Token.Pwr:
                return [new Power()];
            case Token.Or:
                return [new Or()];
            case Token.And:
                return [new And()];
            case Token.Less:
                return [new Less()];
            case Token.More:
                return [new More()];
            case Token.Left:
                return [new Left()];
            case Token.Right:
                return [new Right()];
            case Token.Bang:
                return [new Bang()];
            case Token.Pipe:
                return [new Pipe()];
            case Token.Amp:
                return [new Amp()];
            case Token.Tilde:
                return [new Tilde()];
            case Token.Mod:
                return [new Mod()];
            case Token.Exp:
                return [new Exp()];
            case Token.Eq:
                return [new Equals()];
            case Token.Neq:
                return [new NotEqual()];
            case Token.Divide:
                return [new Divide()];
            case Token.Leq:
                return [new Leq()];
            case Token.Geq:
                return [new Geq()];
            case Token.Times:
                return [new Times()];
            case Token.Plus:
                return [new Plus()];
            case Token.Minus:
                return [new Minus()];
            case Token.String:
                return [new Str(token[1])];
        }
    }

    parseExpression(tokens:Array<[Token, (number | String)?]>): Expression {
        let elements:Array<Parameter> = [];

        while (tokens.length > 0) {
            if (tokens[0][0] != Token.Lbrac) {
                let node = this.parseNode(tokens, true);
                if (node != undefined) {
                    for (let i in node) {
                        elements.push(node[i]);
                    }
                }
                if (this.matchNext(tokens, [Token.Identifier, Token.Lsqbrac])) {
                    while (!this.matchNext(tokens, [Token.Rsqbrac]) && !(tokens[0] == undefined)) {
                        tokens = tokens.slice(1);
                    }
                }
                tokens = tokens.slice(1);
            } else {
                let exprTokens:Array<[Token, (number | String)?]> = [];
                let j = 1;
                while (tokens[j] != undefined && !this.matchNext(tokens.slice(j), [Token.Newline]) && !this.matchNext(tokens.slice(j), [Token.Rbrac])) {
                    exprTokens.push(tokens[j]);
                    j++;
                }
                let exp = this.parseExpression(exprTokens);
                elements.push(exp);
                tokens = tokens.slice(exprTokens.length + 2);
            }
        }

        return new Expression(elements);
    }

    macro(tokens:Array<[Token, (number | String)?]>): Array<AstNode> {
        let name:string;
        let macroTokens:Array<[Token, (number | String)?]> = [];

        if (this.matchNext(tokens, [Token.Identifier, Token.Newline])) {
            name = tokens[0][1].toString();
            tokens = tokens.slice(1);

            let i = 0;
            while (tokens[i] != undefined && !(this.matchNext(tokens.slice(i), [Token.EndMacro]) && tokens[i + 1][1] == name)) {
                macroTokens.push(tokens[i]);
                i++;
            }
            let macroParser = this.childParser(macroTokens);

            let macroCode = macroParser.parse();

            this.macros.push(name);
            this.macroParsers[name] = macroParser;

            return [new Macro(name, macroCode)];
        } else {
            throw BadMacroNameError;
        }
    }

    use(tokens:Array<[Token, (number | String)?]>): Array<AstNode> {
        let macroName:string;
        let instNames:Array<string> = [];

        if (this.matchNext(tokens, [Token.Identifier])) {
            macroName = tokens[0][1].toString();
            tokens = tokens.slice(1);
        }

        while (!this.matchNext(tokens, [Token.Newline])) {
            if (this.matchNext(tokens, [Token.Identifier])) {
                let instName = tokens[0][1].toString();
                this.instances[instName] = macroName;
                instNames.push(instName);
                tokens = tokens.slice(1);
            } else {
                throw BadUseMacroError;
            }
        }
        return [new UseMacro(macroName, instNames)]; 
    }

    include(token:[Token, (number | String)?]): Array<AstNode> {
        let name:string = token[1].toString();

        if (token[0] ==  Token.String) {
            this.macros.push(name);

            const qmasm = fs.readFileSync(this.filePath + name.slice(1, name.length - 1) + '.qmasm', 'utf8');
            
            const lexer = new Lexer(qmasm, 0);
            const tokens = lexer.lex();

            const parser = new Parser(tokens, true, this.filePath + name.slice(1, name.length - 1).split('/').slice(0, name.slice(1, name.length - 1).split('/').length - 1).join('/'));
            parser.symbols = this.symbols;
            parser.instances = this.instances;
            parser.macros = this.macros;
            parser.macroParsers = this.macroParsers;
            
            this.macroParsers[name] = parser;

            return [new Include(name)];
        } else {
            throw BadIncludeError;
        }
    }

    assert(tokens:Array<[Token, (number | String)?]>): Array<AstNode> {
        let exprTokens:Array<[Token, (number | String)?]> = [];

        let i = 0;
        while (tokens[i] != undefined && !this.matchNext(tokens.slice(i), [Token.Newline])) {
            exprTokens.push(tokens[i]);
            i++;
        }
        let exp = this.parseExpression(exprTokens);
        return [new Assert(exp)];
    }

    parseSymbol(tokens:Array<[Token, (number | String)?]>): [Qubit | Variable | Ancilliary | GetOutput, number] {
        let name:string;

        if (this.matchNext(tokens, [Token.Identifier]) || this.matchNext(tokens, [Token.Ancilliary])) {
            name = tokens[0][1].toString();
        } else if (this.isSubContext && this.matchNext(tokens, [Token.Next])) {
            name = '!next';
        }

        let ancilliary = (this.matchNext(tokens, [Token.Ancilliary]));
        tokens = tokens.slice(1);

        if (this.matchNext(tokens, [Token.Lsqbrac])) {
            tokens = tokens.slice(1);
            if (this.matchNext(tokens, [Token.Identifier])) {
                let index = new Variable(tokens[0][1].toString());
                if (this.variables.includes(tokens[0][1].toString())) {
                    return [new Register(name).qubitByVar(index), 4];
                } else if (this.isSubContext) {
                    this.parameters.push(name);
                    return [new Register(name).qubitByVar(index), 4];
                } else {
                    throw BadRegisterIndexError;
                }
            } else if (this.matchNext(tokens, [Token.Int])) {
                let index = Number(tokens[0][1]);
                tokens = tokens.slice(1);
                if (this.matchNext(tokens, [Token.Colon, Token.Int])) {
                    let range = new Range(index, Number(tokens[1][1]));
                    return [new Register(name).qubitsByRange(range), 6];
                } else {
                    return [new Register(name).qubitByIndex(new Int(index)), 4];
                }
            } else {
                throw BadRegisterIndexError;
            }
        } else if (this.matchNext(tokens, [Token.Period, Token.Identifier])) {
            if (Object.keys(this.instances).includes(name)) {
                let inst = name;
                let sym = this.macroParsers[this.instances[inst]].parseNode(tokens.slice(1), true);
                return [new GetOutput(inst, sym[0]), 3];
            } else if (name == '!next') {
                let inst = name;
                let sym = this.parseSymbol(tokens.slice(1));
                return [new GetOutput(inst, sym[0]), 3];
            } else {
                throw UninitializedMacroInstanceError;
            }
        } else if (ancilliary) {
            return [new Ancilliary(name), 1];
        } else if (this.variables.includes(name)) {
            return [new Variable(name), 1];
        } else {
            return [new Qubit(name), 1];
        }
    }

    symbol(tokens:Array<[Token, (number | String)?]>): Array<AstNode> {
        let names:Array<Qubit | Variable | Ancilliary | GetOutput> = [];

        while (this.matchNext(tokens, [Token.Identifier]) || this.matchNext(tokens, [Token.Ancilliary])) {
            let [symbol, consumed] = this.parseSymbol(tokens);
            names.push(symbol);
            tokens = tokens.slice(consumed);
        }
        if (names.length > 2) {
            throw BadFormatError;
        }
        if (this.matchNext(tokens, [Token.Minus]) || this.matchNext(tokens, [Token.Int]) || this.matchNext(tokens, [Token.Float])) {
            let val:number;

            if (this.matchNext(tokens, [Token.Minus])) {
                tokens = tokens.slice(1);
                val = -Number(tokens[0][1]);
            } else {
                val = Number(tokens[0][1]);
            }
            
            return names.length == 1 ? [new Weight(val, names[0])] : [new Coupling(val, names[0], names[1])];
        } else if (this.matchNext(tokens, [Token.Eq]) || this.matchNext(tokens, [Token.Neq])) {
            let chain = true;
            if (this.matchNext(tokens, [Token.Neq])) {
                chain = false;
            }
            tokens = tokens.slice(1);
            if (this.matchNext(tokens, [Token.Identifier]) || this.matchNext(tokens, [Token.Ancilliary])) {
                let i = 0;
                while (i < names.length) {
                    if (!(this.symbols.includes(names[i].name) || this.symbols.includes(names[i].name.split('[')[0]))) {
                        throw UndeclaredQubitError;
                    }
                    i++;
                }
                this.symbols.push(tokens[0][1].toString());
                let chained = this.parseSymbol(tokens)[0];
                return names.map((name) => chain 
                ? new Chain(name, chained) : new AntiChain(name, chained));
            } else if (this.matchNext(tokens, [Token.Next])) {
                let chained = this.parseSymbol(tokens)[0];
                return names.map((name) => chain ? new Chain(name, chained): new AntiChain(name, chained));
            } else {
                throw BadChainError;
            }
        } else if (this.matchNext(tokens, [Token.Binding])) {
            tokens = tokens.slice(1);
            let i = 0;
            while (i < names.length) {
                if (!this.symbols.includes(names[i].name) || !this.symbols.includes(names[i].name.split('[')[0])) {
                    this.symbols.push(names[i].name);
                }
                i++;
            }
            if (this.matchNext(tokens, [Token.Identifier]) || this.matchNext(tokens, [Token.Ancilliary])) {
                if (!this.variables.includes(tokens[0][1].toString())) {
                    throw UndeclaredVariableError;
                }
                return names.map((name) => new Pin(name, new Variable(tokens[0][1].toString())));
            } else {
                let exprTokens = [];
                let i = 0;
                while (tokens[i] != undefined && !this.matchNext(tokens.slice(i), [Token.Newline])) {
                    exprTokens.push(tokens[i]);
                    i++;
                }
                let exp = this.parseExpression(exprTokens);
                return names.map((name) => new Pin(name, exp));
            }
        } else if (this.matchNext(tokens, [Token.Equiv]) || this.matchNext(tokens, [Token.Convert])) {
            let equiv = true;
            if (this.matchNext(tokens, [Token.Convert])) {
                equiv = false;
            }
            tokens = tokens.slice(1);
            if (this.matchNext(tokens, [Token.Identifier]) || this.matchNext(tokens, [Token.Ancilliary])) {
                let i = 0;
                while (i < names.length) {
                    if (!this.symbols.includes(names[i].name)|| !this.symbols.includes(names[i].name.split('[')[0])) {
                        throw UndeclaredQubitError;
                    }
                    i++;
                }
                const sym = this.parseSymbol(tokens)[0];
                this.symbols.push(sym.name);
                return names.map((name) => equiv ? new Equivalence(name, sym) : new Convert(name, sym));
            } else {
                throw BadEquivalenceError;
            }
        }
        throw BadDeclarationError;
    }

    childParser(tokens:Array<[Token, (number | String)?]>): Parser {
        let newParser = new Parser(tokens, true, this.filePath);
        newParser.symbols = this.symbols;
        newParser.instances = this.instances;
        newParser.macros = this.macros;
        newParser.macroParsers = this.macroParsers;

        return newParser;
    }

    let(tokens:Array<[Token, (number | String)?]>): Array<AstNode> {
        let name:string;
        let exprTokens:Array<[Token, (number | String)?]> = [];

        if (this.matchNext(tokens, [Token.Let, Token.Identifier, Token.Binding])) {
            tokens = tokens.slice(1);
            name = tokens[0][1].toString();
            tokens = tokens.slice(2);
            let i = 0;
            while (tokens[i] != undefined && !this.matchNext(tokens.slice(i), [Token.Newline])) {
                exprTokens.push(tokens[i]);
                i++;
            }
            let exp = this.parseExpression(exprTokens);
            this.variables.push(name);
            return [new Let(exp, new Variable(name))];
        } else {
            throw BadBindingError;
        }
    }

    if(tokens:Array<[Token, (number | String)?]>): Array<AstNode> {
        let clauseTokens:Array<[Token, (number | String)?]> = [];
        let conditionTokens:Array<[Token, (number | String)?]> = [];

        let i = 1;
        while (tokens[i] != undefined && !this.matchNext(tokens.slice(i), [Token.Newline])) {
            conditionTokens.push(tokens[i]);
            i++;
        }
        const condition = this.parseExpression(conditionTokens);
        tokens = tokens.slice(conditionTokens.length + 1);

        let j = 1;
        while (tokens[j] != undefined && !this.matchNext(tokens.slice(j), [Token.Else]) && !this.matchNext(tokens.slice(j), [Token.EndIf])) {
            clauseTokens.push(tokens[j]);
            j++;
        }
        let ifParser = this.childParser(clauseTokens);

        this.clauseParsers.push(ifParser);
        const ifClause = ifParser.parse();
        tokens = tokens.slice(clauseTokens.length + 1);

        if (this.matchNext(tokens, [Token.Else])) {
            let k = 1;
            clauseTokens = [];
            while (tokens[k] != undefined && !this.matchNext(tokens.slice(k), [Token.EndIf])) {
                clauseTokens.push(tokens[k]);
                k++;
            }
            let elseParser = this.childParser(clauseTokens);

            this.clauseParsers.push(elseParser);
            const elseClause = elseParser.parse();
            tokens = tokens.slice(clauseTokens.length + 1);

            if (this.matchNext(tokens, [Token.EndIf])) {
                return [new Condition(condition, ifClause, elseClause)];
            } else {
                throw BadConditionStructureError;
            }
        } else if (this.matchNext(tokens, [Token.EndIf])) {
            return [new Condition(condition, ifClause)];
        } else {
            throw BadConditionStructureError;
        }
    }

    for(tokens:Array<[Token, (number | String)?]>): Array<AstNode> {
        let iterName:string;
        let iterator:Iterator;
        let generated:Array<AstNode> = [];

        if (this.matchNext(tokens, [Token.Identifier, Token.Binding])) {
            iterName = tokens[0][1].toString();
            tokens = tokens.slice(2);

            if (this.matchNext(tokens, [Token.Int])) {
                iterator = new Iterator(iterName, this.matchIntList(tokens));
            } else if (this.matchNext(tokens, [Token.Identifier])) {
                iterator = new Iterator(iterName, this.matchSymbolList(tokens));
            }
            while (!this.matchNext(tokens, [Token.Newline])) {
                tokens = tokens.slice(1);
            }

            let k = 1;
            let clauseTokens = [];
            while (tokens[k] != undefined && !this.matchNext(tokens.slice(k), [Token.EndFor])) {
                clauseTokens.push(tokens[k]);
                k++;
            }
            let forParser = this.childParser(clauseTokens);
            
            let genName = iterator.name;
            forParser.symbols.push(genName);
            forParser.parameters.push(genName);
            let forClause = forParser.parse();

            iterator.vals.forEach((val, i) => {
                generated.push(new Let(new Expression([val]), new Variable(genName)));
                forClause.forEach((node) => {
                    generated.push(node);
                });
            });

            this.clauseParsers.push(forParser);

            return generated;
        } else {
            throw BadLoopError;
        }
    }

    matchIntList(tokens:Array<[Token, (number | String)?]>): Array<Int> {
        let args:Array<Int> = [];
        let j:number = 0;

        while(j < tokens.length && !this.matchNext(tokens.slice(j), [Token.Newline])) {
            
            if (this.matchNext(tokens.slice(j), [Token.Int])) {
                let val = this.matchInt(tokens.slice(j));
                args.push(val);
            } else if (this.matchNext(tokens.slice(j), [Token.Continue, Token.Comma, Token.Int])) {
                let previous = args[args.length - 1].val;
                let following = Number(tokens[j + 2][1]);

                let gen = previous;
                while (gen < following - 1) {
                    gen += 1;
                    args.push(new Int(gen));
                }
            } else {
                throw BadIteratorError;
            }
            j++;
            if (this.matchNext(tokens.slice(j), [Token.Comma])) {
                j++;
            }
        }

        return args;
    }

    matchSymbolList(tokens:Array<[Token, (number | String)?]>): Array<Qubit | Variable | Ancilliary | GetOutput> {
        let args:Array<Qubit | Variable | Ancilliary | GetOutput> = [];
        let j:number = 0;

        while(j < tokens.length && !this.matchNext(tokens.slice(j), [Token.Newline])) {
            
            if (this.matchNext(tokens.slice(j), [Token.Identifier])) {
                let [val, consumed] = this.parseSymbol(tokens.slice(j));
                args.push(val);
                j += consumed;
            } else {
                throw BadIteratorError;
            }
            if (this.matchNext(tokens.slice(j), [Token.Comma])) {
                j++;
            }
        }

        return args;
    }

    matchInt(tokens:Array<[Token, (number | String)?]>): Int {
        let val:Int;

        if (tokens[0][0] == Token.Int) {
            val = new Int(Number(tokens[0][1]));
        } else {
            throw BadIntError;
        }
        return val;
    }

    matchNext(tokens:Array<[Token, (number | String)?]>, expectedTokens:Array<Token>): boolean {
        let matches = true;
        let i = 0;

        if (tokens.length == 0) {
            return false;
        }

        while (i < expectedTokens.length) {
            if (tokens[i] != undefined && tokens[i][0] != expectedTokens[i]) {
                matches = false;
                break;
            }
            i++;
        }
        
        return matches;
    }
}

export default Parser;
