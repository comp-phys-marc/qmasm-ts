# QMASM TypeScript

QMASM, the macro assembler for D-wave's quantum annealer, implemented in TypeScript.

Language documentation is provided by Scott Pakin [here](https://github.com/lanl/qmasm/wiki).

## New in Version 1.0.0

- Support for the following QMASM features:

    - Specifying 2-local Ising Hamiltonian parameters via:
        qubit weights, coupling strengths

    - Relating qubits via:
        chains, anti-chains, equivalences
    
    - Relating qubits to classical values via pins

    - Importable and parameterizable macro system via:
        !begin_macro, include, !use_macro

    - Macro chaining via:
        !next

    - Assertions

    - Logical and mathematical expressions involving the following elements:
        \+, \-, \*, /, **, =, /=, ||, |, &&, &, ~, !, ^, %, <, >, <<, >>, <=, >=

    - For loops

    - If/else conditionals

    - Support for the following classical types:
        Iterator, Range, Int, Float, Bool

    - Support for the following quantum data types:
        Qubit, Ancilliary, QubitArray, Register

- Basic Jasmine Unit Tests

## New in Latest Subversion

- Updated the qmasm-ts license following clarifications.

- Thanks to Dr. Pakin for helping me to understand [qmasm](https://github.com/lanl/qmasm/wiki)'s license!

## Usage

Import the parse function or parseString function from the package.

```
import { parse, parseString } from 'qmasm-ts';
```

`parse` can be called with a file path to a `.qmasm` file. It will parse the file and return the abstract syntax tree representation.

```
let ast = parse(<file-path>);
```

`parseString` should be called with a string of QMASM code. It will parse the code and return the abstract syntax tree representation.

```
let ast = parseString(<qmasm-string>);
```

## Example I/O

### Input: feature-test.qmasm

```
####################################
# Comparator for a sorting network #
# By Scott Pakin <pakin@lanl.gov>  #
####################################

!begin_macro comparator
$a    0
$b    0 
$min  1
$max -1

$a $b      1
$a $min   -1
$a $max   -0.5
$b $min   -1
$b $max   -0.5
$min $max -0.5
!end_macro comparator

```

### Output: Abstract Syntax Tree

```
Macro {
  name: 'comparator',
  nodes:
   [ Weight { val: 0, qubit: Ancilliary { name: '$a' } },
     Weight { val: 0, qubit: Ancilliary { name: '$b' } },
     Weight { val: 1, qubit: Ancilliary { name: '$min' } },
     Weight { val: -1, qubit: Ancilliary { name: '$max' } },
     Coupling { val: 1, firstQubit: Ancilliary { name: '$a' }, secondQubit: Ancilliary { name: '$b' } },
     Coupling { val: -1, firstQubit: Ancilliary { name: '$a' }, secondQubit: Ancilliary { name: '$min' } },
     Coupling {
       val: -0.5,
       firstQubit: Ancilliary { name: '$a' },
       secondQubit: Ancilliary { name: '$max' } },
     Coupling { val: -1, firstQubit: Ancilliary { name: '$b' }, secondQubit: Ancilliary { name: '$min' } },
     Coupling {
       val: -0.5,
       firstQubit: Ancilliary { name: '$b' },
       secondQubit: Ancilliary { name: '$max' } },
     Coupling {
       val: -0.5,
       firstQubit: Ancilliary { name: '$min' },
       secondQubit: Ancilliary { name: '$max' } } ] }
```

## Source code

Feel free to clone, fork, comment or contribute on [GitHub](https://github.com/comp-phys-marc/qmasm-ts)!

## Transpiling

```
tsc src/*.ts --outDir dist
```

## Installing dependencies

```
npm install
```

## Run Unit Tests, Conformance Tests

```
npm test
```

## References

The original QMASM author:

- Scott Pakin. "A Quantum Macro Assembler". In Proceedings of the 20th Annual IEEE High Performance Extreme Computing Conference (HPEC 2016), Waltham, Massachusetts, USA, 13–15 September 2016. [DOI: 10.1109/HPEC.2016.7761637](http://dx.doi.org/10.1109/HPEC.2016.7761637).

## License

Copyright 2019 Marcus Edwards

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at:

```
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.