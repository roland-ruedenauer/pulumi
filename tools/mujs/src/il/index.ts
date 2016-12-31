// Copyright 2016 Marapongo, Inc. All rights reserved.

import * as symbols from "../symbols";

// Node is a discriminated type for all serialized blocks and instructions.
export interface Node {
    kind: NodeKind;
    loc?: SourceLocation;
}

// NodeType contains all of the legal Node implementations.  This effectively "seales" the discriminated node type,
// and makes constructing and inspecting nodes a little more bulletproof (i.e., they aren't arbitrary strings).
export type NodeKind =
    // # Statements

    // ## Blocks
    BlockKind |
    LocalVariableDeclarationKind |
    TryCatchFinallyKind |
    TryCatchBlockKind |

    // ## Branches
    BreakStatementKind |
    ContinueStatementKind |
    IfStatementKind |
    WhileStatementKind |

    // ## Miscellaneous
    ExpressionStatementKind |

    // # Expressions

    // ## Literals
    NullLiteralExpressionKind |
    BoolLiteralExpressionKind |
    NumberLiteralExpressionKind |
    StringLiteralExpressionKind |
    ObjectLiteralExpressionKind |
    ObjectLiteralInitializerKind |

    // ## Loads
    LoadVariableExpressionKind |
    LoadFunctionExpressionKind |
    LoadDynamicExpressionKind |

    // ## Functions
    InvokeFunctionExpressionKind |
    LambdaExpressionKind |

    // ## Operators
    UnaryOperatorExpressionKind |
    BinaryOperatorExpressionKind |

    // ## Miscellaneous
    CastExpressionKind |
    ConditionalExpressionKind
;

// SourceLocation is a location, possibly a region, in the source code.
export interface SourceLocation {
    file?: string;         // an optional filename in which this location resides.
    start: SourcePosition; // a starting position.
    end?:  SourcePosition; // an optional end position for a range (if empty, this represents just a point).
}

// SourcePosition consists of a 1-indexed `line` number and a 0-indexed `column` number.
export interface SourcePosition {
    line:   number; // >= 1
    column: number; // >= 0
}

/** # Statements **/

export interface Statement extends Node {}

/** ## Blocks **/

export interface Block extends Statement {
    kind:       BlockKind;
    locals:     LocalVariableDeclaration[];
    statements: Statement[];
}
export type  BlockKind     = "Block";
export const BlockKindName = "Block";

export interface LocalVariableDeclaration extends Node {
    kind: LocalVariableDeclarationKind;
    key:  symbols.VariableToken; // the token used to reference this local variable.
    type: symbols.TypeToken;     // the static type of this local variable's slot.
}
export type  LocalVariableDeclarationKind     = "LocalVariableDeclaration";
export const LocalVariableDeclarationKindName = "LocalVariableDeclaration";

/** ## Try/Catch/Finally **/

export interface TryCatchFinally extends Statement {
    kind:          TryCatchFinallyKind;
    tryBlock:      Block;
    catchBlocks?:  TryCatchBlock[];
    finallyBlock?: Block;
}
export type  TryCatchFinallyKind     = "TryCatchFinally";
export const TryCatchFinallyKindName = "TryCatchFinally";

export interface TryCatchBlock extends Node {
    kind:      TryCatchBlockKind;
    exception: symbols.TypeToken;
    block:     Block;
}
export type  TryCatchBlockKind     = "TryCatchBlock";
export const TryCatchBlockKindName = "TryCatchBlock";

/** ## Branches **/

// A `break` statement (valid only within loops).
export interface BreakStatement extends Statement {
    kind:   BreakStatementKind;
    label?: symbols.Identifier;
}
export type  BreakStatementKind     = "BreakStatement";
export const BreakStatementKindName = "BreakStatement";

// A `continue` statement (valid only within loops).
export interface ContinueStatement extends Statement {
    kind:   ContinueStatementKind;
    label?: symbols.Identifier;
}
export type  ContinueStatementKind     = "ContinueStatement";
export const ContinueStatementKindName = "ContinueStatement";

// An `if` statement.  To simplify the AST, this is the only conditional statement available.  All higher-level
// conditional constructs such as `switch`, `if / else if / ...`, etc. must be desugared into it.
export interface IfStatement extends Statement {
    kind:       IfStatementKind;
    condition:  Expression; // a `bool` condition expression.
    consequent: Statement; // the statement to execute if `true`.
    alternate?: Statement; // the statement to execute if `false`.
}
export type  IfStatementKind     = "IfStatement";
export const IfStatementKindName = "IfStatement";

// A `while` statement.  To simplify the AST, this is the only looping statement available.  All higher-level
// looping constructs such as `for`, `foreach`, `for in`, `for of`, `do / while`, etc. must be desugared into it.
export interface WhileStatement extends Statement {
    kind: WhileStatementKind;
    test: Expression; // a `bool` statement indicating whether to continue.
}
export type  WhileStatementKind     = "WhileStatement";
export const WhileStatementKindName = "WhileStatement";

/** ## Miscellaneous **/

// A statement that performs an expression, but ignores its result.
export interface ExpressionStatement extends Statement {
    kind:       ExpressionStatementKind;
    expression: Expression;
}
export type  ExpressionStatementKind     = "ExpressionStatement";
export const ExpressionStatementKindName = "ExpressionStatement";

/** # Expressions **/

export interface Expression extends Node {}

/** ## Literals **/

export interface LiteralExpression extends Expression {}

// A `null` literal.
export interface NullLiteralExpression extends LiteralExpression {
    kind: NullLiteralExpressionKind;
}
export type  NullLiteralExpressionKind     = "NullLiteralExpression";
export const NullLiteralExpressionKindName = "NullLiteralExpression";

// A `bool`-typed literal (`true` or `false`).
export interface BoolLiteralExpression extends LiteralExpression {
    kind:  BoolLiteralExpressionKind;
    value: boolean;
}
export type  BoolLiteralExpressionKind     = "BoolLiteralExpression";
export const BoolLiteralExpressionKindName = "BoolLiteralExpression";

// A `number`-typed literal (floating point IEEE 754).
export interface NumberLiteralExpression extends LiteralExpression {
    kind:  NumberLiteralExpressionKind;
    value: number;
}
export type  NumberLiteralExpressionKind     = "NumberLiteralExpression";
export const NumberLiteralExpressionKindName = "NumberLiteralExpression";

// A `string`-typed literal.
export interface StringLiteralExpression extends LiteralExpression {
    kind:  StringLiteralExpressionKind;
    value: string;
}
export type  StringLiteralExpressionKind     = "StringLiteralExpression";
export const StringLiteralExpressionKindName = "StringLiteralExpression";

// An object literal (`new` and/or initialization).
export interface ObjectLiteralExpression extends LiteralExpression {
    kind:          ObjectLiteralExpressionKind;
    type:          symbols.TypeToken;          // the type of object to produce.
    initializers?: ObjectLiteralInitializer[]; // an optional array of property initializers.
    arguments?:    Expression[];               // an optional set of arguments for the constructor.
}
export type  ObjectLiteralExpressionKind     = "ObjectLiteralExpression";
export const ObjectLiteralExpressionKindName = "ObjectLiteralExpression";

// An object literal property initializer.
export interface ObjectLiteralInitializer extends Node {
    kind:     ObjectLiteralInitializerKind;
    property: symbols.VariableToken; // the property being initialized.
    value:    Expression;            // the expression value to store into the property.
}
export type  ObjectLiteralInitializerKind     = "ObjectLiteralInitializer";
export const ObjectLiteralInitializerKindName = "ObjectLiteralInitializer";

/** ## Loads **/

// TODO(joe): figure out how to load/store elements and maps.  Possibly just use intrinsic functions.

// Loads a variable's address (module, argument, local, or property), producing a pointer that can be dereferenced.
export interface LoadVariableExpression extends Expression {
    kind:     LoadVariableExpressionKind;
    variable: symbols.VariableToken; // the variable to load from.
    object?:  Expression;            // the `this` object, in the case of class properties.
}
export type  LoadVariableExpressionKind     = "LoadVariableExpression";
export const LoadVariableExpressionKindName = "LoadVariableExpression";

// Loads a function's address, producing a pointer that can be dereferenced to produce an invocable expression.
export interface LoadFunctionExpression extends Expression {
    kind: LoadFunctionExpressionKind;
    function: symbols.FunctionToken; // the function to load as a lambda.
    object?: Expression;             // the `this` object, in the case of class methods.
}
export type  LoadFunctionExpressionKind     = "LoadFunctionExpression";
export const LoadFunctionExpressionKindName = "LoadFunctionExpression";

// Dynamically loads either a variable or function, by name, from an object.
// TODO(joe): I'm unsure if we should permit assigning to functions by name; I think we'll need to for Python/Ruby/etc.
export interface LoadDynamicExpression extends Expression {
    kind:   LoadDynamicExpressionKind;
    key:    Expression; // the name of the property to load (a string expression).
    object: Expression; // the object to load a property from.
}
export type  LoadDynamicExpressionKind     = "LoadDynamicExpression";
export const LoadDynamicExpressionKindName = "LoadDynamicExpression";

/** ## Functions **/

// Invokes a function.
export interface InvokeFunctionExpression extends Expression {
    kind:       InvokeFunctionExpressionKind;
    function:   Expression;   // a function to invoke (of a func type).
    arguments?: Expression[]; // the list of arguments in sequential order.
}
export type  InvokeFunctionExpressionKind     = "InvokeFunctionExpression";
export const InvokeFunctionExpressionKindName = "InvokeFunctionExpression";

// Creates a lambda, a sort of "anonymous" function.
export interface LambdaExpression extends Expression {
    kind:       LambdaExpressionKind;
    signature:  symbols.TypeToken;       // the func signature type.
    parameters: symbols.VariableToken[]; // the parameter variables.
    body:       Block;                   // the lambda's body block.
}
export type  LambdaExpressionKind     = "LambdaExpression";
export const LambdaExpressionKindName = "LambdaExpression";

/** ## Operators **/

// A unary operator expression.
export interface UnaryOperatorExpression extends Expression {
    kind:     UnaryOperatorExpressionKind;
    operator: UnaryOperator; // the operator type.
    operand:  Expression;    // the right hand side operand.
    postfix:  boolean;       // whether this is a postifx operator (only legal for UnaryPfixOperator).
}
export type  UnaryOperatorExpressionKind     = "UnaryOperatorExpression";
export const UnaryOperatorExpressionKindName = "UnaryOperatorExpression";

// A unary prefix/postfix operator token.
export type UnaryPfixOperator = "++" | "--";

// A unary operator token.  Note that MuIL doesn't care about precedence.  The MetaMu compilers must present the
// expressions in the order in which they should be evaluated through an in-order AST tree walk.
export type UnaryOperator = UnaryPfixOperator |
                            "*" | "&"         | // dereference and addressof.
                            "+" | "-"         | // unary plus and minus
                            "!" | "~"         ; // logical NOT and bitwise NOT.

// A binary operator expression (assignment, logical, operator, or relational).
export interface BinaryOperatorExpression extends Expression {
    kind:     BinaryOperatorExpressionKind;
    left:     Expression;     // the left hand side.
    operator: BinaryOperator; // the operator.
    right:    Expression;     // the right hand side.
}
export type  BinaryOperatorExpressionKind     = "BinaryOperatorExpression";
export const BinaryOperatorExpressionKindName = "BinaryOperatorExpression";

// All of the available arithmetic operators.
export type BinaryArithmeticOperator  = "+"   | "-"   | // addition and subtraction.
                                        "*"   | "/"   | // multiplication and division.
                                        "%"   | "**"  ; // remainder and exponentiation.

// All of the available assignment operators.
// TODO: figure out what to do with ECMAScript's >>>= operator.
export type BinaryAssignmentOperator  = "="           | // simple assignment.
                                        "+="  | "-="  | // assignment by sum and difference.
                                        "*="  | "/="  | // assignment by product and quotient.
                                        "%="  | "**=" | // assignment by remainder and exponentiation.
                                        "<<=" | ">>=" | // assignment by bitwise left and right shift.
                                        "&="  | "|="  | // assignment by bitwise AND and OR.
                                        "^="          ; // assignment by bitwise XOR.

// All of the available bitwise operators.
// TODO: figure out what to do with ECMAScript's >>> operator.
export type BinaryBitwiseOperator     = "<<"  | ">>"  | // bitwise left and right shift.
                                        "&"   | "|"   | // bitwise AND and OR (inclusive OR).
                                        "^"           ; // bitwise XOR (exclusive OR).

// All of the available conditional operators.
export type BinaryConditionalOperator = "&&"  | "||"  ; // logical AND and OR.

// All of the available relational operators.
// TODO: figure out what to do with ECMAScript's === and !=== operators.
export type BinaryRelationalOperator  = "<"   | "<="  | // relational operators less-than and less-than-or-equals.
                                        ">"   | ">="  | // relational operators greater-than and greater-than-or-equals.
                                        "=="  | "!="  ; // relational operators equals and not-equals.

// A binary operator token.  Note that MuIL doesn't care about precedence.  The MetaMu compilers must present the
// expressions in the order in which they should be evaluated through an in-order AST tree walk.
export type BinaryOperator = BinaryArithmeticOperator  |
                             BinaryAssignmentOperator  |
                             BinaryBitwiseOperator     |
                             BinaryConditionalOperator |
                             BinaryRelationalOperator  ;

/** ## Miscellaneous **/

// A cast expression; this handles both nominal and structural casts, and will throw an exception upon failure.
export interface CastExpression extends Expression {
    kind:       CastExpressionKind;
    type:       symbols.TypeToken; // the target type.
    expression: Expression;        // the source expression.
}
export type  CastExpressionKind     = "CastExpression";
export const CastExpressionKindName = "CastExpression";

// A conditional expression.
export interface ConditionalExpression extends Expression {
    kind:       ConditionalExpressionKind;
    condition:  Expression; // a `bool` condition expression.
    consequent: Expression; // the expression to evaluate if `true`.
    alternate:  Expression; // the expression to evaluate if `false`.
}
export type  ConditionalExpressionKind     = "ConditionalExpression";
export const ConditionalExpressionKindName = "ConditionalExpression";

