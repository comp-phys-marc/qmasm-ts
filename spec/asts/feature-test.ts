import {
    Assert,
    UseMacro,
    Parameter,
    Macro,
    Pipe,
    Int,
    Chain,
    AntiChain,
    Bool,
    Mod,
    Include,
    Condition,
    Pin,
    QubitArray,
    Minus,
    Plus,
    Times,
    Divide,
    Power,
    Exp,
    Geq,
    Expression,
    Equals,
    NotEqual,
    Qubit,
    Equivalence,
    Convert,
    Or,
    Less,
    Ancilliary,
    And,
    Left,
    Bang,
    Amp,
    Tilde,
    Weight,
    Coupling,
    Variable,
    Let,
    SetParam,
    GetOutput,
    Range
} from "../../src/ast";

export default [
    new Weight ( 0.5, new Qubit ( 'abc' ) ),
    new Weight ( 0.5, new Qubit ( 'def' ) ),
    new Coupling (
        0.5,
        new Qubit ( 'abc' ),
        new Qubit ( 'def' ) ),
    new Assert (
        new Expression ( [
            new Qubit ("abc"),
            new Equals(),
            new Int(0),
            new Or(),
            new Qubit("def"),
            new Equals(),
            new Int(0)
        ] ) ),
    new Chain (
        new Qubit ( 'abc' ),
        new Qubit ( 'ghi' ) ),
    new AntiChain (
        new Qubit ( 'def' ),
        new Qubit ( 'jkl' ) ),
    new Let (
        new Expression ( [ new Bool(true)] ),
        new Variable ( 'yes' ) ),
    new Pin ( new Qubit ( 'jkl' ), new Variable ( 'yes' ) ),
    new Equivalence (
        new Qubit ( 'jkl' ),
        new Qubit ( 'mno' ) ),
    new Include ( '"comparator"' ),
    new Assert (
        new Expression ( 
            [ 
                new Int(1),
                new Plus(),
                new Int(2),
                new Plus(),
                new Int(3),
                new Equals(),
                new Int(6),
                new Or(),
                new Int(4),
                new Plus(),
                new Int(5),
                new Times(),
                new Int(6),
                new Equals(),
                new Int(4),
                new Plus(),
                new Expression([
                    new Int(5),
                    new Times(),
                    new Int(6)
                ]),
                new And(),
                new Int(4),
                new Plus(),
                new Int(5),
                new Times(),
                new Int(6),
                new Less(),
                new Expression([
                    new Int(4),
                    new Plus(),
                    new Int(5)
                ]),
                new Times(),
                new Int(6) 
            ] ) ),
    new Assert (
        new Expression ( 
            [
                new Qubit("mno"), 
                new Plus(), 
                new Int(8), 
                new NotEqual(), 
                new Int(3), 
                new Power(), 
                new Expression([ 
                    new Qubit("def"), 
                    new Plus(), 
                    new Int(1) 
                ]) 
            ] ) ),
    new Assert (
        new Expression ( [ new Int(56),
            new Exp(),
            new Int(1),
            new Equals(),
            new Expression([
                new Int (1), 
                new Left(), 
                new Int (4), 
                new Pipe(), 
                new Int (1), 
                new Left(), 
                new Int (1),
                new Pipe(), 
                new Int (1), 
                new Left(), 
                new Bang(), 
                new Int (99)
            ]),
            new Times(),
            new Expression([
                new Int(7), 
                new Amp(), 
                new Tilde(), 
                new Int(4)
            ]) 
        ] ) ),
    new Assert (
        new Expression ( [ new Int(1),
            new Plus(),
            new Int(1),
            new Equals(),
            new Int(25),
            new Or(),
            new Int(25),
            new Divide(),
            new Int(3),
            new Geq(),
            new Int(25),
            new Mod(),
            new Int(7) 
        ] ) ),
    new Macro (
        'XOR',
        [ 
            new Assert (
                new Expression ( [
                    new Parameter("Y"), 
                    new Equals(), 
                    new Parameter("A"),
                    new Exp(), 
                    new Parameter("B")
                ] ) ),
            new Weight ( 0.5, new Qubit ( 'A' ) ),
            new Weight ( -0.5, new Qubit ( 'B' ) ),
            new Weight ( -0.5, new Qubit ( 'Y' ) ),
            new Weight ( 1, new Ancilliary ( '$a1' ) ),
            new Coupling (
                -0.5,
                new Qubit ( 'A' ),
                new Qubit ( 'B' ) ),
            new Coupling (
                -0.5,
                new Qubit ( 'A' ),
                new Qubit ( 'Y' ) ),
            new Coupling (
                1,
                new Qubit ( 'A' ),
                new Ancilliary ( '$a1' ) ),
            new Coupling (
                0.5,
                new Qubit ( 'B' ),
                new Qubit ( 'Y' ) ),
            new Coupling (
                -1,
                new Qubit ( 'B' ),
                new Ancilliary ( '$a1' ) ),
            new Coupling (
                -1,
                new Qubit ( 'Y' ),
                new Ancilliary ( '$a1' ) ),    
        ] ),
    new UseMacro ( 'XOR', [ 'excl_or' ] ),
    new SetParam (
        'excl_or',
        new Pin ( new Qubit('A'), new Expression( [new Bool(true)] ) ) ),
    new SetParam (
        'excl_or',
        new Pin ( new Qubit('B'), new Expression( [new Bool(false)] ) ) ),
    new Let (
        new Expression ( [ 
            new Expression([
                new Int(6),
                new Plus(),
                new Int(1)
            ]), 
            new Times(),
            new Int(2),
            new Times(), 
            new Expression([
                new Int(4),
                new Minus(),
                new Int(1)  
            ]) 
        ] ),
        new Variable ( 'idx1' ) ),
    new Let (
        new Expression ( [
            new Variable('idx1'),
            new Divide(),
            new Int(3)
        ] ),
        new Variable ( 'idx2' ) ),
    new Chain (
        new Qubit ( 'alfa[idx1]' ),
        new Qubit ( 'alfa[idx2]' ) ),
    new Condition (
        new Expression ( [
            new Variable('idx1'),
            new Less(),
            new Variable('idx2'), 
        ] ),
        [new Chain (
            new Qubit ( 'alfa[idx1]' ),
            new GetOutput ( 'excl_or', new Qubit('Y') ),
        )],
        [new Chain (
            new Qubit ( 'alfa[idx2]' ),
            new GetOutput ( 'excl_or', new Qubit('Y') ),
        )]
    ),
    new Let (
        new Expression ( [ new Int(0) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(2) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(3) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(4) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(5) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(6) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(7) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(8) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(9) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(10) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(11) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(12) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(13) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(14) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Int(15) ] ),
        new Variable ( 'idx' ) ),
    new Chain (
        new Qubit ( 'alfa[idx]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [ new Qubit('alfa') ] ),
        new Variable ( 'icao' ) ),
    new Coupling (
        -3.25,
        new Qubit ( 'icao[42]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [new Qubit('bravo')] ),
        new Variable ( 'icao' ) ),
    new Coupling (
        -3.25,
        new Qubit ( 'icao[42]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [new Qubit('charlie')] ),
        new Variable ( 'icao' ) ),
    new Coupling (
        -3.25,
        new Qubit ( 'icao[42]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [new Qubit('delta')] ),
        new Variable ( 'icao' ) ),
    new Coupling (
        -3.25,
        new Qubit ( 'icao[42]' ),
        new Qubit ( 'zulu' ) ),
    new Let (
        new Expression ( [new Qubit('echo')] ),
        new Variable ( 'icao' ) ),
    new Coupling (
        -3.25,
        new Qubit ( 'icao[42]' ),
        new Qubit ( 'zulu' ) ),
    new Macro (
        'XOR_chain',
        [ 
            new UseMacro ( 'XOR', [ 'xor' ] ),
            new Chain (
                new Qubit ( 'A' ),
                new GetOutput ( 'xor', new Qubit('A') ) ),
            new Chain (
                new Qubit ( 'B' ),
                new GetOutput ( 'xor', new Qubit('B') ) ),
            new Chain (
                new Qubit ( 'Y' ),
                new GetOutput ( 'xor', new Qubit('Y') ) ),
            new Chain (
                new Qubit ( 'Y' ),
                new GetOutput ( '!next', new Qubit('A') ) ),     
        ] ),
    new UseMacro (
        'XOR_chain',
        [ 'first', 'second', 'third' ] ),
    new Weight ( -0.75, new Qubit ( 'big' ) ),
    new Weight ( 0.75, new Qubit ( 'small' ) ),
    new Coupling (
        0.5,
        new Qubit ( 'big' ),
        new Qubit ( 'small' ) ),
    new Convert (
        new Qubit ( 'big' ),
        new Qubit ( 'bigger' ) ),
    new Convert (
        new Qubit ( 'small' ),
        new Qubit ( 'smaller' ) ),
    new Pin (
        new QubitArray ( 'six[2:0]', new Range ( 2, 0 ) ),
        new Expression ( [ new Int(110) ] ) ),
    new Assert (
        new Expression ( [
            new Qubit ( 'six[0]' ),
            new NotEqual(),
            new Int(1)
        ] ) ),
    new Chain (
        new Qubit ( 'six[2]' ),
        new Qubit ( 'six[1]' ) ),
    new AntiChain (
        new Qubit ( 'six[1]' ),
        new Qubit ( 'six[0]' ) ),
    new Convert (
        new QubitArray ( 'six[2:0]', new Range ( 2, 0 ) ),
        new QubitArray ( 'six[0:2]', new Range ( 0, 2 ) ) ),
];
