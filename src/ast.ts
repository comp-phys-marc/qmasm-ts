
class AstNode {}

class Id extends AstNode {
    id:string;
    constructor(id:string) {
        super();
        this.id = id;
    }
}

class Include extends AstNode {
    val:string;
    constructor(val:string) {
        super();
        this.val = val;
    }
}

class UseMacro extends AstNode {
    macroName:string;
    instNames:Array<string>;
    constructor(macroName:string, instNames:Array<string>) {
        super();
        this.macroName = macroName;
        this.instNames = instNames;
    }
}

class Macro extends AstNode {
    name:string;
    nodes:Array<AstNode>;
    constructor(name:string, nodes:Array<AstNode>) {
        super();
        this.name = name;
        this.nodes = nodes;
    }
}

class Parameter extends AstNode {
    name?:string;
    constructor(name?:string) {
        super();
        this.name = name;
    }
}

class Arr<Parameter> extends Parameter {
    vals:Array<Parameter>;
    size:Array<Int>;
    constructor(vals:Array<Parameter>, size:Array<Int>) {
        super();
        this.vals = vals;
        this.size = size;
    }
}

class Float extends Parameter {
    val:AstNode | number;
    constructor(val:AstNode | number) {
        super();
        this.val = val;
    }
}

class Str extends Parameter {
    val:AstNode | string;
    constructor(val:AstNode | string) {
        super();
        this.val = val;
    }
}

class Chain extends AstNode {
    firstQubit:Qubit;
    secondQubit:Qubit;
    constructor(firstQubit:Qubit, secondQubit:Qubit) {
        super();
        this.secondQubit = secondQubit;
        this.firstQubit = firstQubit;
    }
}

class AntiChain extends AstNode {
    firstQubit:Qubit;
    secondQubit:Qubit;
    constructor(firstQubit:Qubit, secondQubit:Qubit) {
        super();
        this.secondQubit = secondQubit;
        this.firstQubit = firstQubit;
    }
}

class Pin extends AstNode {
    val:Variable | Expression;
    qubit:Qubit;
    constructor(qubit:Qubit, val:Variable | Expression) {
        super();
        this.val = val;
        this.qubit = qubit;
    }
}

class Equivalence extends AstNode {
    firstQubit:Qubit;
    secondQubit:Qubit;
    constructor(firstQubit:Qubit, secondQubit:Qubit) {
        super();
        this.secondQubit = secondQubit;
        this.firstQubit = firstQubit;
    }
}

class Convert extends AstNode {
    firstQubit:Qubit;
    secondQubit:Qubit;
    constructor(firstQubit:Qubit, secondQubit:Qubit) {
        super();
        this.secondQubit = secondQubit;
        this.firstQubit = firstQubit;
    }
}

class Iterator extends AstNode {
    name:string;
    vals:Array<Int | Variable>;
    constructor(name:string, vals:Array<Int | Variable>) {
        super();
        this.name = name;
        this.vals = vals;
    }
}

class Range extends Parameter {
    lower:number;
    upper:number;
    constructor(lower:number, upper:number) {
        super();
        this.lower = lower;
        this.upper = upper;
    }
}

class Int extends Parameter {
    val:number;
    constructor(val:number) {
        super();
        this.val = val;
    }
}

class Bool extends Parameter {
    val:boolean;
    constructor(val:boolean) {
        super();
        this.val = val;
    }
}

class Weight extends AstNode {
    val:AstNode | number;
    qubit:Qubit;
    constructor(val:AstNode | number, qubit:Qubit) {
        super();
        this.val = val;
        this.qubit = qubit;
    }
}

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

class Qubit extends Parameter {
    name:string;
    constructor(name:string) {
        super();
        this.name = name;
    }
}

class QubitArray extends Qubit {
    name:string;
    range:Range;
    constructor(name:string, range:Range) {
        super(name);
        this.range = range;
    }
}

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

class Ancilliary extends Parameter {
    name:string;
    constructor(name:string) {
        super();
        this.name = name;
    }
}

class Variable extends Parameter {
    name:string;
    constructor(name:string) {
        super();
        this.name = name;
    }
}

class SetParam extends AstNode {
    macroInstance:string;
    val:AstNode;
    constructor(macroInstance:string, val:AstNode) {
        super();
        this.macroInstance = macroInstance;
        this.val = val;
    }
}

class GetOutput extends Qubit {
    macroInstance:string;
    qubit:Qubit;
    constructor(macroInstance:string, qubit:Qubit) {
        super(macroInstance + '.' + qubit.name);
        this.macroInstance = macroInstance;
        this.qubit = qubit;
    }
}

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

class Exp extends Parameter {}

class Minus extends Parameter {
    constructor() {
        super();
    }
}

class Or extends Parameter {
    constructor() {
        super();
    }
}

class Plus extends Parameter {
    constructor() {
        super();
    }
}

class Times extends Parameter {
    constructor() {
        super();
    }
}

class Equals extends Parameter {
    constructor() {
        super();
    }
}

class NotEqual extends Parameter {
    constructor() {
        super();
    }
}

class Divide extends Parameter {
    constructor() {
        super();
    }
}

class Power extends Parameter {
    constructor() {
        super();
    }
}

class Less extends Parameter {
    constructor() {
        super();
    }
}

class Bang extends Parameter {
    constructor() {
        super();
    }
}


class Amp extends Parameter {
    constructor() {
        super();
    }
}

class Pipe extends Parameter {
    constructor() {
        super();
    }
}

class Tilde extends Parameter {
    constructor() {
        super();
    }
}

class More extends Parameter {
    constructor() {
        super();
    }
}

class Left extends Parameter {
    constructor() {
        super();
    }
}

class Right extends Parameter {
    constructor() {
        super();
    }
}

class And extends Parameter {
    constructor() {
        super();
    }
}

class Mod extends Parameter {
    constructor() {
        super();
    }
}

class Geq extends Parameter {
    constructor() {
        super();
    }
}

class Leq extends Parameter {
    constructor() {
        super();
    }
}

class Let extends AstNode {
    expression:Expression;
    variable:Variable;
    constructor(expression:Expression, variable:Variable) {
        super();
        this.expression = expression;
        this.variable = variable;
    }
}

class Expression extends Parameter {
    elements:Array<Parameter>;
    constructor(elements:Array<Parameter>) {
        super();
        this.elements = elements;
    }
}

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
