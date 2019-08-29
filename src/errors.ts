class BadArgumentError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadArgumentError.name;
    }
}

class BadParameterError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadParameterError.name;
    }
}

class BadMacroError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadMacroError.name;
    }
}

class BadMacroNameError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadMacroNameError.name;
    }
}

class BadUseMacroError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadUseMacroError.name;
    }
}

class UninitializedMacroInstanceError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = UninitializedMacroInstanceError.name;
    }
}

class WrongQuoteError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = WrongQuoteError.name;
    }
}

class BadArrayError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadArrayError.name;
    }
}

class BadRegisterIndexError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadRegisterIndexError.name;
    }
}

class BadDeclarationError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadDeclarationError.name;
    }
}

class BadIntError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadIntError.name;
    }
}

class BadChainError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadChainError.name;
    }
}

class BadBindingError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadBindingError.name;
    }
}

class BadPinError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadPinError.name;
    }
}

class BadIncludeError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadIncludeError.name;
    }
}

class BadEquivalenceError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadEquivalenceError.name;
    }
}

class BadFormatError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadFormatError.name;
    }
}

class BadIdentifierError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadIdentifierError.name;
    }
}

class BadLoopError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadLoopError.name;
    }
}

class BadIteratorError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadIteratorError.name;
    }
}

class BadConditionStructureError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadConditionStructureError.name;
    }
}

class UndeclaredVariableError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = UndeclaredVariableError.name;
    }
}

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