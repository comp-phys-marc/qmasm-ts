
/** Base class representing a basic AST node. */
class AstNode {}

/** Class representing an identifier. */
class Id extends AstNode {
    id:string;
    constructor(id:string) {
        super();
        this.id = id;
    }
}

/** Class representing an include. */
class Include extends AstNode {
    val:string;
    constructor(val:string) {
        super();
        this.val = val;
    }
}

/** Class representing a macro usage. */
class UseMacro extends AstNode {
    macroName:string;
    instNames:Array<string>;
    constructor(macroName:string, instNames:Array<string>) {
        super();
        this.macroName = macroName;
        this.instNames = instNames;
    }
}

/** Class representing a macro. */
class Macro extends AstNode {
    name:string;
    nodes:Array<AstNode>;
    constructor(name:string, nodes:Array<AstNode>) {
        super();
        this.name = name;
        this.nodes = nodes;
    }
}

/** Base class representing a basic parameter. */
class Parameter extends AstNode {
    name?:string;
    constructor(name?:string) {
        super();
        this.name = name;
    }
}

/** Class representing an array. */
class Arr<Parameter> extends Parameter {
    vals:Array<Parameter>;
    size:Array<Int>;
    constructor(vals:Array<Parameter>, size:Array<Int>) {
        super();
        this.vals = vals;
        this.size = size;
    }
}

/** Class representing a float. */
class Float extends Parameter {
    val:AstNode | number;
    constructor(val:AstNode | number) {
        super();
        this.val = val;
    }
}

/** Class representing a string. */
class Str extends Parameter {
    val:AstNode | string;
    constructor(val:AstNode | string) {
        super();
        this.val = val;
    }
}

/** Class representing a chain. */
class Chain extends AstNode {
    firstQubit:Qubit;
    secondQubit:Qubit;
    constructor(firstQubit:Qubit, secondQubit:Qubit) {
        super();
        this.secondQubit = secondQubit;
        this.firstQubit = firstQubit;
    }
}

/** Class representing an anti-chain. */
class AntiChain extends AstNode {
    firstQubit:Qubit;
    secondQubit:Qubit;
    constructor(firstQubit:Qubit, secondQubit:Qubit) {
        super();
        this.secondQubit = secondQubit;
        this.firstQubit = firstQubit;
    }
}

/** Class representing a pin. */
class Pin extends AstNode {
    val:Variable | Expression;
    qubit:Qubit;
    constructor(qubit:Qubit, val:Variable | Expression) {
        super();
        this.val = val;
        this.qubit = qubit;
    }
}

/** Class representing an equivalence. */
class Equivalence extends AstNode {
    firstQubit:Qubit;
    secondQubit:Qubit;
    constructor(firstQubit:Qubit, secondQubit:Qubit) {
        super();
        this.secondQubit = secondQubit;
        this.firstQubit = firstQubit;
    }
}

/** Class representing a conversion. */
class Convert extends AstNode {
    firstQubit:Qubit;
    secondQubit:Qubit;
    constructor(firstQubit:Qubit, secondQubit:Qubit) {
        super();
        this.secondQubit = secondQubit;
        this.firstQubit = firstQubit;
    }
}

/** Class representing an iterator. */
class Iterator extends AstNode {
    name:string;
    vals:Array<Int | Variable>;
    constructor(name:string, vals:Array<Int | Variable>) {
        super();
        this.name = name;
        this.vals = vals;
    }
}

/** Class representing a range. */
class Range extends Parameter {
    lower:number;
    upper:number;
    constructor(lower:number, upper:number) {
        super();
        this.lower = lower;
        this.upper = upper;
    }
}

/** Class representing an integer. */
class Int extends Parameter {
    val:number;
    constructor(val:number) {
        super();
        this.val = val;
    }
}

/** Class representing a boolean. */
class Bool extends Parameter {
    val:boolean;
    constructor(val:boolean) {
        super();
        this.val = val;
    }
}

/** Class representing a weight. */
class Weight extends AstNode {
    val:AstNode | number;
    qubit:Qubit;
    constructor(val:AstNode | number, qubit:Qubit) {
        super();
        this.val = val;
        this.qubit = qubit;
    }
}


/** Class representing a coupling. */
class Coupling extends AstNode {
    val:AstNode | number;
    firstQubit:Qubit;
    secondQubit:Qubit;
    constructor(val:AstNode | number, firstQubit:Qubit, secondQubit:Qubit) {
        super();
        this.val = val;
        this.firstQubit = firstQubit;
        this.secondQubit = secondQubit;
    }
}

/** Class representing a qubit. */
class Qubit extends Parameter {
    name:string;
    constructor(name:string) {
        super();
        this.name = name;
    }
}

/** Class representing a qubit array. */
class QubitArray extends Qubit {
    name:string;
    range:Range;
    constructor(name:string, range:Range) {
        super(name);
        this.range = range;
    }
}

/** Class representing a register. */
class Register extends Parameter {
    name:string;
    constructor(name:string) {
        super();
        this.name = name;
    }

    qubitByVar(index:Variable) {
        return new Qubit(this.name + '[' + index.name + ']');
    }

    qubitByIndex(index:Int) {
        return new Qubit(this.name + '[' + index.val + ']');
    }

    qubitsByRange(range:Range) {
        return new QubitArray(this.name + '[' + range.lower + ':' + range.upper + ']', range);
    }
}

/** Class representing an ancilliary. */
class Ancilliary extends Parameter {
    name:string;
    constructor(name:string) {
        super();
        this.name = name;
    }
}

/** Class representing a variable. */
class Variable extends Parameter {
    name:string;
    constructor(name:string) {
        super();
        this.name = name;
    }
}

/** Class representing a parameter assignment. */
class SetParam extends AstNode {
    macroInstance:string;
    val:AstNode;
    constructor(macroInstance:string, val:AstNode) {
        super();
        this.macroInstance = macroInstance;
        this.val = val;
    }
}

/** Class representing a output retrieval. */
class GetOutput extends Qubit {
    macroInstance:string;
    qubit:Qubit;
    constructor(macroInstance:string, qubit:Qubit) {
        super(macroInstance + '.' + qubit.name);
        this.macroInstance = macroInstance;
        this.qubit = qubit;
    }
}

/** Class representing a condition. */
class Condition extends AstNode {
    condition:Expression;
    ifClause:Array<AstNode>;
    elseClause:Array<AstNode>;
    constructor(condition:Expression, ifClause:Array<AstNode>, elseClause?:Array<AstNode>) {
        super();
        this.condition = condition;
        this.ifClause = ifClause;
        this.elseClause = elseClause;
    }
}

/** Class representing exponential. */
class Exp extends Parameter {}

/** Class representing minus. */
class Minus extends Parameter {}

/** Class representing a union. */
class Or extends Parameter {}

/** Class representing plus. */
class Plus extends Parameter {}

/** Class representing times. */
class Times extends Parameter {}

/** Class representing an equality. */
class Equals extends Parameter {}

/** Class representing an inequality. */
class NotEqual extends Parameter {}

/** Class representing divide. */
class Divide extends Parameter {}

/** Class representing power. */
class Power extends Parameter {}

/** Class representing less than. */
class Less extends Parameter {}

/** Class representing bang. */
class Bang extends Parameter {}

/** Class representing ampersand. */
class Amp extends Parameter {}

/** Class representing pipe. */
class Pipe extends Parameter {}

/** Class representing tilde. */
class Tilde extends Parameter {}

/** Class representing greater than. */
class More extends Parameter {}

/** Class representing left angle bracket. */
class Left extends Parameter {}

/** Class representing right angle bracket. */
class Right extends Parameter {}

/** Class representing intersection. */
class And extends Parameter {}

/** Class representing modulus. */
class Mod extends Parameter {}

/** Class representing greater than or equal to. */
class Geq extends Parameter {}

/** Class representing less than or equal to. */
class Leq extends Parameter {}

/** Class representing assignment. */
class Let extends AstNode {
    expression:Expression;
    variable:Variable;
    constructor(expression:Expression, variable:Variable) {
        super();
        this.expression = expression;
        this.variable = variable;
    }
}

/** Class representing expression. */
class Expression extends Parameter {
    elements:Array<Parameter>;
    constructor(elements:Array<Parameter>) {
        super();
        this.elements = elements;
    }
}

/** Class representing assertion. */
class Assert extends AstNode {
    expression:Expression;
    constructor(expression:Expression) {
        super();
        this.expression = expression;
    }
}

export {
    AstNode,
    Assert,
    Id,
    UseMacro,
    Macro,
    Arr,
    Float,
    Pipe,
    Int,
    Chain,
    AntiChain,
    Bool,
    Mod,
    Include,
    Parameter,
    Register,
    Condition,
    Pin,
    QubitArray,
    Minus,
    Plus,
    Times,
    Divide,
    Power,
    Exp,
    Str,
    Geq,
    Leq,
    Expression,
    Equals,
    NotEqual,
    Qubit,
    Equivalence,
    Convert,
    Or,
    Less,
    More,
    Ancilliary,
    And,
    Left,
    Right,
    Bang,
    Amp,
    Tilde,
    Weight,
    Coupling,
    Variable,
    Let,
    SetParam,
    GetOutput,
    Iterator,
    Range
};
