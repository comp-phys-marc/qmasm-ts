# QMASM TypeScript

QMASM, Los Alamos National Laboratory's macro assembler for D-wave's quantum annelaer, implemented in TypeScript.

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

Feel free to clone, fork, comment or contribute on [GitHub](https://github.com/MackEdweise/qmasm-ts.git)!

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

__This package is a derivative work inspired by Los Alamos National Laboratory's original version of QMASM, the license for which is included below as required.__

Copyright © 2016, Triad National Security, LLC All rights reserved.

This software was produced under U.S. Government contract 89233218CNA000001 for Los Alamos National Laboratory (LANL), which is operated by Triad National Security, LLC for the U.S. Department of Energy/National Nuclear Security Administration. All rights in the program are reserved by Triad National Security, LLC, and the U.S. Department of Energy/National Nuclear Security Administration. The Government is granted for itself and others acting on its behalf a nonexclusive, paid-up, irrevocable worldwide license in this material to reproduce, prepare derivative works, distribute copies to the public, perform publicly and display publicly, and to permit others to do so. NEITHER THE GOVERNMENT NOR TRIAD NATIONAL SECURITY, LLC MAKES ANY WARRANTY, EXPRESS OR IMPLIED, OR ASSUMES ANY LIABILITY FOR THE USE OF THIS SOFTWARE. If software is modified to produce derivative works, such modified software should be clearly marked, so as not to confuse it with the version available from LANL.

Additionally, redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

Neither the name of Triad National Security, LLC, Los Alamos National Laboratory, LANL, the U.S. Government, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY TRIAD NATIONAL SECURITY, LLC AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL TRIAD NATIONAL SECURITY, LLC OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
