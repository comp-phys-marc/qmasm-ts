enum Token {
    Plus,
    Minus,
    Times,
    Divide,
    Pwr,
    Eq,
    Neq,
    Leq,
    Geq,
    Binding,
    Equiv,
    Int,
    Float,
    Newline,
    Exp,
    Period,
    Comma,
    Colon,
    Quote,
    Lbrac,
    Rbrac,
    Lsqbrac,
    Rsqbrac,
    Comment,
    Identifier,
    String,
    EndOfFile,
    Illegal,
    Pipe,
    Or,
    And,
    Assert,
    Next,
    Let, 
    Include,
    BeginMacro,
    UseMacro,
    EndMacro,
    If,
    Else,
    EndIf,
    For,
    EndFor,
    Mod,
    Convert,
    Ancilliary,
    Bang,
    Amp,
    Tilde,
    Less,
    More,
    True,
    False,
    Left, 
    Right,
    Continue
}

const paramLookupMap:object = {
    '^': Token.Exp,
    '+': Token.Plus,
    '-': Token.Minus,
    '*': Token.Times,
    '/': Token.Divide,
    '**': Token.Pwr,
    '=': Token.Eq,
    '.': Token.Period,
    '...': Token.Continue,
    'true': Token.True,
    'false': Token.False,
    '<=': Token.Leq,
    '>=': Token.Geq,
    '/=': Token.Neq,
    '||': Token.Or,
    '&&': Token.And,
    '|': Token.Pipe,
    '(': Token.Lbrac,
    ')': Token.Rbrac,
    '[': Token.Lsqbrac,
    ']': Token.Rsqbrac,
    '%': Token.Mod,
    '!': Token.Bang,
    '&': Token.Amp,
    '~': Token.Tilde,
    '<<': Token.Left,
    '>>': Token.Right,
    '<': Token.Less,
    '>': Token.More
}

const lookupMap:object = {
    ...paramLookupMap,
    '!assert': Token.Assert,
    '!let': Token.Let,
    '!include': Token.Include,
    '!begin_macro': Token.BeginMacro,
    '!use_macro': Token.UseMacro,
    '!end_macro': Token.EndMacro,
    '!if': Token.If,
    '!else': Token.Else,
    '!end_if': Token.EndIf,
    '!for': Token.For,
    '!end_for': Token.EndFor,
    '!next': Token.Next,
    ',': Token.Comma,
    ':': Token.Colon,
    '"': Token.Quote,
    ':=': Token.Binding,
    '<->': Token.Equiv,
    '->': Token.Convert
}

function lookup(ident:string): Token {
    return ident in lookupMap ? lookupMap[ident]: Token.Identifier;
}

function inverseParamLookup(token:Token): string {
    return Object.keys(paramLookupMap).find((ident) => paramLookupMap[ident] == token);
}

function notParam(token:Token): boolean {
    return (Object.keys(paramLookupMap).map(key => paramLookupMap[key]).indexOf(token) == -1) && token != Token.Int && token != Token.Float && token && token != Token.Identifier;
}

export {
    Token,
    notParam,
    lookup,
    inverseParamLookup
};
