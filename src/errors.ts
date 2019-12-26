/** Class representing a bad argument exception. */
class BadArgumentError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadArgumentError.name;
    }
}

/** Class representing a bad parameter exception. */
class BadParameterError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadParameterError.name;
    }
}

/** Class representing a bad macro exception. */
class BadMacroError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadMacroError.name;
    }
}

/** Class representing a bad macro name exception. */
class BadMacroNameError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadMacroNameError.name;
    }
}

/** Class representing a bad macro usage exception. */
class BadUseMacroError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadUseMacroError.name;
    }
}

/** Class representing an uninitialized macro exception. */
class UninitializedMacroInstanceError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = UninitializedMacroInstanceError.name;
    }
}

/** Class representing a wrong quote exception. */
class WrongQuoteError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = WrongQuoteError.name;
    }
}

/** Class representing a bad array exception. */
class BadArrayError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadArrayError.name;
    }
}

/** Class representing a bad register index exception. */
class BadRegisterIndexError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadRegisterIndexError.name;
    }
}

/** Class representing a bad declaration exception. */
class BadDeclarationError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadDeclarationError.name;
    }
}

/** Class representing a bad integer exception. */
class BadIntError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadIntError.name;
    }
}

/** Class representing a bad chain exception. */
class BadChainError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadChainError.name;
    }
}

/** Class representing a bad binding exception. */
class BadBindingError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadBindingError.name;
    }
}

/** Class representing a bad pin exception. */
class BadPinError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadPinError.name;
    }
}

/** Class representing a bad include exception. */
class BadIncludeError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadIncludeError.name;
    }
}

/** Class representing a bad equivalence exception. */
class BadEquivalenceError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadEquivalenceError.name;
    }
}

/** Class representing a bad format exception. */
class BadFormatError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadFormatError.name;
    }
}

/** Class representing a bad identifier exception. */
class BadIdentifierError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadIdentifierError.name;
    }
}

/** Class representing a bad loop exception. */
class BadLoopError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadLoopError.name;
    }
}

/** Class representing a bad iterator exception. */
class BadIteratorError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadIteratorError.name;
    }
}

/** Class representing a bad condition structure exception. */
class BadConditionStructureError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadConditionStructureError.name;
    }
}

/** Class representing an undeclared variable exception. */
class UndeclaredVariableError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = UndeclaredVariableError.name;
    }
}

/** Class representing an undeclared qubit exception. */
class UndeclaredQubitError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = UndeclaredQubitError.name;
    }
}

export {
    BadArgumentError,
    BadParameterError,
    BadBindingError,
    WrongQuoteError,
    BadMacroError,
    BadMacroNameError,
    BadIteratorError,
    BadIntError,
    BadArrayError,
    BadLoopError,
    BadConditionStructureError,
    BadRegisterIndexError,
    BadUseMacroError,
    UndeclaredQubitError,
    UndeclaredVariableError,
    BadDeclarationError,
    BadChainError,
    BadPinError,
    BadEquivalenceError,
    BadIncludeError,
    BadFormatError,
    BadIdentifierError,
    UninitializedMacroInstanceError
};