declare namespace ts {
    interface MapLike<T> {
        [index: string]: T;
    }
    interface Map<T> {
        get(key: string): T | undefined;
        has(key: string): boolean;
        set(key: string, value: T): this;
        delete(key: string): boolean;
        clear(): void;
        forEach(action: (value: T, key: string) => void): void;
        readonly size: number;
        keys(): Iterator<string>;
        values(): Iterator<T>;
        entries(): Iterator<[string, T]>;
    }
    interface Iterator<T> {
        next(): {
            value: T;
            done: false;
        } | {
            value: never;
            done: true;
        };
    }
    type Path = string & {
        __pathBrand: any;
    };
    interface FileMap<T> {
        get(fileName: Path): T;
        set(fileName: Path, value: T): void;
        contains(fileName: Path): boolean;
        remove(fileName: Path): void;
        forEachValue(f: (key: Path, v: T) => void): void;
        getKeys(): Path[];
        clear(): void;
    }
    interface TextRange {
        pos: number;
        end: number;
    }
    const enum SyntaxKind {
        Unknown = 0,
        EndOfFileToken = 1,
        SingleLineCommentTrivia = 2,
        MultiLineCommentTrivia = 3,
        NewLineTrivia = 4,
        WhitespaceTrivia = 5,
        ShebangTrivia = 6,
        ConflictMarkerTrivia = 7,
        NumericLiteral = 8,
        StringLiteral = 9,
        JsxText = 10,
        JsxTextAllWhiteSpaces = 11,
        RegularExpressionLiteral = 12,
        NoSubstitutionTemplateLiteral = 13,
        TemplateHead = 14,
        TemplateMiddle = 15,
        TemplateTail = 16,
        OpenBraceToken = 17,
        CloseBraceToken = 18,
        OpenParenToken = 19,
        CloseParenToken = 20,
        OpenBracketToken = 21,
        CloseBracketToken = 22,
        DotToken = 23,
        DotDotDotToken = 24,
        SemicolonToken = 25,
        CommaToken = 26,
        LessThanToken = 27,
        LessThanSlashToken = 28,
        GreaterThanToken = 29,
        LessThanEqualsToken = 30,
        GreaterThanEqualsToken = 31,
        EqualsEqualsToken = 32,
        ExclamationEqualsToken = 33,
        EqualsEqualsEqualsToken = 34,
        ExclamationEqualsEqualsToken = 35,
        EqualsGreaterThanToken = 36,
        PlusToken = 37,
        MinusToken = 38,
        AsteriskToken = 39,
        AsteriskAsteriskToken = 40,
        SlashToken = 41,
        PercentToken = 42,
        PlusPlusToken = 43,
        MinusMinusToken = 44,
        LessThanLessThanToken = 45,
        GreaterThanGreaterThanToken = 46,
        GreaterThanGreaterThanGreaterThanToken = 47,
        AmpersandToken = 48,
        BarToken = 49,
        CaretToken = 50,
        ExclamationToken = 51,
        TildeToken = 52,
        AmpersandAmpersandToken = 53,
        BarBarToken = 54,
        QuestionToken = 55,
        ColonToken = 56,
        AtToken = 57,
        EqualsToken = 58,
        PlusEqualsToken = 59,
        MinusEqualsToken = 60,
        AsteriskEqualsToken = 61,
        AsteriskAsteriskEqualsToken = 62,
        SlashEqualsToken = 63,
        PercentEqualsToken = 64,
        LessThanLessThanEqualsToken = 65,
        GreaterThanGreaterThanEqualsToken = 66,
        GreaterThanGreaterThanGreaterThanEqualsToken = 67,
        AmpersandEqualsToken = 68,
        BarEqualsToken = 69,
        CaretEqualsToken = 70,
        Identifier = 71,
        BreakKeyword = 72,
        CaseKeyword = 73,
        CatchKeyword = 74,
        ClassKeyword = 75,
        ConstKeyword = 76,
        ContinueKeyword = 77,
        DebuggerKeyword = 78,
        DefaultKeyword = 79,
        DeleteKeyword = 80,
        DoKeyword = 81,
        ElseKeyword = 82,
        EnumKeyword = 83,
        ExportKeyword = 84,
        ExtendsKeyword = 85,
        FalseKeyword = 86,
        FinallyKeyword = 87,
        ForKeyword = 88,
        FunctionKeyword = 89,
        IfKeyword = 90,
        ImportKeyword = 91,
        InKeyword = 92,
        InstanceOfKeyword = 93,
        NewKeyword = 94,
        NullKeyword = 95,
        ReturnKeyword = 96,
        SuperKeyword = 97,
        SwitchKeyword = 98,
        ThisKeyword = 99,
        ThrowKeyword = 100,
        TrueKeyword = 101,
        TryKeyword = 102,
        TypeOfKeyword = 103,
        VarKeyword = 104,
        VoidKeyword = 105,
        WhileKeyword = 106,
        WithKeyword = 107,
        ImplementsKeyword = 108,
        InterfaceKeyword = 109,
        LetKeyword = 110,
        PackageKeyword = 111,
        PrivateKeyword = 112,
        ProtectedKeyword = 113,
        PublicKeyword = 114,
        StaticKeyword = 115,
        YieldKeyword = 116,
        AbstractKeyword = 117,
        AsKeyword = 118,
        AnyKeyword = 119,
        AsyncKeyword = 120,
        AwaitKeyword = 121,
        BooleanKeyword = 122,
        ConstructorKeyword = 123,
        DeclareKeyword = 124,
        GetKeyword = 125,
        IsKeyword = 126,
        KeyOfKeyword = 127,
        ModuleKeyword = 128,
        NamespaceKeyword = 129,
        NeverKeyword = 130,
        ReadonlyKeyword = 131,
        RequireKeyword = 132,
        NumberKeyword = 133,
        ObjectKeyword = 134,
        SetKeyword = 135,
        StringKeyword = 136,
        SymbolKeyword = 137,
        TypeKeyword = 138,
        UndefinedKeyword = 139,
        FromKeyword = 140,
        GlobalKeyword = 141,
        OfKeyword = 142,
        QualifiedName = 143,
        ComputedPropertyName = 144,
        TypeParameter = 145,
        Parameter = 146,
        Decorator = 147,
        PropertySignature = 148,
        PropertyDeclaration = 149,
        MethodSignature = 150,
        MethodDeclaration = 151,
        Constructor = 152,
        GetAccessor = 153,
        SetAccessor = 154,
        CallSignature = 155,
        ConstructSignature = 156,
        IndexSignature = 157,
        TypePredicate = 158,
        TypeReference = 159,
        FunctionType = 160,
        ConstructorType = 161,
        TypeQuery = 162,
        TypeLiteral = 163,
        ArrayType = 164,
        TupleType = 165,
        UnionType = 166,
        IntersectionType = 167,
        ParenthesizedType = 168,
        ThisType = 169,
        TypeOperator = 170,
        IndexedAccessType = 171,
        MappedType = 172,
        LiteralType = 173,
        ObjectBindingPattern = 174,
        ArrayBindingPattern = 175,
        BindingElement = 176,
        ArrayLiteralExpression = 177,
        ObjectLiteralExpression = 178,
        PropertyAccessExpression = 179,
        ElementAccessExpression = 180,
        CallExpression = 181,
        NewExpression = 182,
        TaggedTemplateExpression = 183,
        TypeAssertionExpression = 184,
        ParenthesizedExpression = 185,
        FunctionExpression = 186,
        ArrowFunction = 187,
        DeleteExpression = 188,
        TypeOfExpression = 189,
        VoidExpression = 190,
        AwaitExpression = 191,
        PrefixUnaryExpression = 192,
        PostfixUnaryExpression = 193,
        BinaryExpression = 194,
        ConditionalExpression = 195,
        TemplateExpression = 196,
        YieldExpression = 197,
        SpreadElement = 198,
        ClassExpression = 199,
        OmittedExpression = 200,
        ExpressionWithTypeArguments = 201,
        AsExpression = 202,
        NonNullExpression = 203,
        MetaProperty = 204,
        TemplateSpan = 205,
        SemicolonClassElement = 206,
        Block = 207,
        VariableStatement = 208,
        EmptyStatement = 209,
        ExpressionStatement = 210,
        IfStatement = 211,
        DoStatement = 212,
        WhileStatement = 213,
        ForStatement = 214,
        ForInStatement = 215,
        ForOfStatement = 216,
        ContinueStatement = 217,
        BreakStatement = 218,
        ReturnStatement = 219,
        WithStatement = 220,
        SwitchStatement = 221,
        LabeledStatement = 222,
        ThrowStatement = 223,
        TryStatement = 224,
        DebuggerStatement = 225,
        VariableDeclaration = 226,
        VariableDeclarationList = 227,
        FunctionDeclaration = 228,
        ClassDeclaration = 229,
        InterfaceDeclaration = 230,
        TypeAliasDeclaration = 231,
        EnumDeclaration = 232,
        ModuleDeclaration = 233,
        ModuleBlock = 234,
        CaseBlock = 235,
        NamespaceExportDeclaration = 236,
        ImportEqualsDeclaration = 237,
        ImportDeclaration = 238,
        ImportClause = 239,
        NamespaceImport = 240,
        NamedImports = 241,
        ImportSpecifier = 242,
        ExportAssignment = 243,
        ExportDeclaration = 244,
        NamedExports = 245,
        ExportSpecifier = 246,
        MissingDeclaration = 247,
        ExternalModuleReference = 248,
        JsxElement = 249,
        JsxSelfClosingElement = 250,
        JsxOpeningElement = 251,
        JsxClosingElement = 252,
        JsxAttribute = 253,
        JsxAttributes = 254,
        JsxSpreadAttribute = 255,
        JsxExpression = 256,
        CaseClause = 257,
        DefaultClause = 258,
        HeritageClause = 259,
        CatchClause = 260,
        PropertyAssignment = 261,
        ShorthandPropertyAssignment = 262,
        SpreadAssignment = 263,
        EnumMember = 264,
        SourceFile = 265,
        Bundle = 266,
        JSDocTypeExpression = 267,
        JSDocAllType = 268,
        JSDocUnknownType = 269,
        JSDocArrayType = 270,
        JSDocUnionType = 271,
        JSDocTupleType = 272,
        JSDocNullableType = 273,
        JSDocNonNullableType = 274,
        JSDocRecordType = 275,
        JSDocRecordMember = 276,
        JSDocTypeReference = 277,
        JSDocOptionalType = 278,
        JSDocFunctionType = 279,
        JSDocVariadicType = 280,
        JSDocConstructorType = 281,
        JSDocThisType = 282,
        JSDocComment = 283,
        JSDocTag = 284,
        JSDocAugmentsTag = 285,
        JSDocClassTag = 286,
        JSDocParameterTag = 287,
        JSDocReturnTag = 288,
        JSDocTypeTag = 289,
        JSDocTemplateTag = 290,
        JSDocTypedefTag = 291,
        JSDocPropertyTag = 292,
        JSDocTypeLiteral = 293,
        JSDocLiteralType = 294,
        SyntaxList = 295,
        NotEmittedStatement = 296,
        PartiallyEmittedExpression = 297,
        CommaListExpression = 298,
        MergeDeclarationMarker = 299,
        EndOfDeclarationMarker = 300,
        Count = 301,
        FirstAssignment = 58,
        LastAssignment = 70,
        FirstCompoundAssignment = 59,
        LastCompoundAssignment = 70,
        FirstReservedWord = 72,
        LastReservedWord = 107,
        FirstKeyword = 72,
        LastKeyword = 142,
        FirstFutureReservedWord = 108,
        LastFutureReservedWord = 116,
        FirstTypeNode = 158,
        LastTypeNode = 173,
        FirstPunctuation = 17,
        LastPunctuation = 70,
        FirstToken = 0,
        LastToken = 142,
        FirstTriviaToken = 2,
        LastTriviaToken = 7,
        FirstLiteralToken = 8,
        LastLiteralToken = 13,
        FirstTemplateToken = 13,
        LastTemplateToken = 16,
        FirstBinaryOperator = 27,
        LastBinaryOperator = 70,
        FirstNode = 143,
        FirstJSDocNode = 267,
        LastJSDocNode = 294,
        FirstJSDocTagNode = 284,
        LastJSDocTagNode = 294,
    }
    const enum NodeFlags {
        None = 0,
        Let = 1,
        Const = 2,
        NestedNamespace = 4,
        Synthesized = 8,
        Namespace = 16,
        ExportContext = 32,
        ContainsThis = 64,
        HasImplicitReturn = 128,
        HasExplicitReturn = 256,
        GlobalAugmentation = 512,
        HasAsyncFunctions = 1024,
        DisallowInContext = 2048,
        YieldContext = 4096,
        DecoratorContext = 8192,
        AwaitContext = 16384,
        ThisNodeHasError = 32768,
        JavaScriptFile = 65536,
        ThisNodeOrAnySubNodesHasError = 131072,
        HasAggregatedChildData = 262144,
        PossiblyContainsDynamicImport = 524288,
        BlockScoped = 3,
        ReachabilityCheckFlags = 384,
        ReachabilityAndEmitFlags = 1408,
        ContextFlags = 96256,
        TypeExcludesFlags = 20480,
    }
    const enum ModifierFlags {
        None = 0,
        Export = 1,
        Ambient = 2,
        Public = 4,
        Private = 8,
        Protected = 16,
        Static = 32,
        Readonly = 64,
        Abstract = 128,
        Async = 256,
        Default = 512,
        Const = 2048,
        HasComputedFlags = 536870912,
        AccessibilityModifier = 28,
        ParameterPropertyModifier = 92,
        NonPublicAccessibilityModifier = 24,
        TypeScriptModifier = 2270,
        ExportDefault = 513,
    }
    const enum JsxFlags {
        None = 0,
        IntrinsicNamedElement = 1,
        IntrinsicIndexedElement = 2,
        IntrinsicElement = 3,
    }
    const enum RelationComparisonResult {
        Succeeded = 1,
        Failed = 2,
        FailedAndReported = 3,
    }
    interface Node extends TextRange {
        kind: SyntaxKind;
        flags: NodeFlags;
        modifierFlagsCache?: ModifierFlags;
        transformFlags?: TransformFlags;
        decorators?: NodeArray<Decorator>;
        modifiers?: ModifiersArray;
        id?: number;
        parent?: Node;
        original?: Node;
        startsOnNewLine?: boolean;
        jsDoc?: JSDoc[];
        jsDocCache?: (JSDoc | JSDocTag)[];
        symbol?: Symbol;
        locals?: SymbolTable;
        nextContainer?: Node;
        localSymbol?: Symbol;
        flowNode?: FlowNode;
        emitNode?: EmitNode;
        contextualType?: Type;
        contextualMapper?: TypeMapper;
    }
    interface NodeArray<T extends Node> extends Array<T>, TextRange {
        hasTrailingComma?: boolean;
        transformFlags?: TransformFlags;
    }
    interface Token<TKind extends SyntaxKind> extends Node {
        kind: TKind;
    }
    type DotDotDotToken = Token<SyntaxKind.DotDotDotToken>;
    type QuestionToken = Token<SyntaxKind.QuestionToken>;
    type ColonToken = Token<SyntaxKind.ColonToken>;
    type EqualsToken = Token<SyntaxKind.EqualsToken>;
    type AsteriskToken = Token<SyntaxKind.AsteriskToken>;
    type EqualsGreaterThanToken = Token<SyntaxKind.EqualsGreaterThanToken>;
    type EndOfFileToken = Token<SyntaxKind.EndOfFileToken>;
    type AtToken = Token<SyntaxKind.AtToken>;
    type ReadonlyToken = Token<SyntaxKind.ReadonlyKeyword>;
    type AwaitKeywordToken = Token<SyntaxKind.AwaitKeyword>;
    type Modifier = Token<SyntaxKind.AbstractKeyword> | Token<SyntaxKind.AsyncKeyword> | Token<SyntaxKind.ConstKeyword> | Token<SyntaxKind.DeclareKeyword> | Token<SyntaxKind.DefaultKeyword> | Token<SyntaxKind.ExportKeyword> | Token<SyntaxKind.PublicKeyword> | Token<SyntaxKind.PrivateKeyword> | Token<SyntaxKind.ProtectedKeyword> | Token<SyntaxKind.ReadonlyKeyword> | Token<SyntaxKind.StaticKeyword>;
    type ModifiersArray = NodeArray<Modifier>;
    const enum GeneratedIdentifierKind {
        None = 0,
        Auto = 1,
        Loop = 2,
        Unique = 3,
        Node = 4,
    }
    interface Identifier extends PrimaryExpression {
        kind: SyntaxKind.Identifier;
        text: string;
        originalKeywordKind?: SyntaxKind;
        autoGenerateKind?: GeneratedIdentifierKind;
        autoGenerateId?: number;
        isInJSDocNamespace?: boolean;
        typeArguments?: NodeArray<TypeNode>;
    }
    interface TransientIdentifier extends Identifier {
        resolvedSymbol: Symbol;
    }
    interface GeneratedIdentifier extends Identifier {
        autoGenerateKind: GeneratedIdentifierKind.Auto | GeneratedIdentifierKind.Loop | GeneratedIdentifierKind.Unique | GeneratedIdentifierKind.Node;
    }
    interface QualifiedName extends Node {
        kind: SyntaxKind.QualifiedName;
        left: EntityName;
        right: Identifier;
    }
    type EntityName = Identifier | QualifiedName;
    type PropertyName = Identifier | StringLiteral | NumericLiteral | ComputedPropertyName;
    type DeclarationName = Identifier | StringLiteral | NumericLiteral | ComputedPropertyName | BindingPattern;
    interface Declaration extends Node {
        _declarationBrand: any;
    }
    interface NamedDeclaration extends Declaration {
        name?: DeclarationName;
    }
    interface DeclarationStatement extends NamedDeclaration, Statement {
        name?: Identifier | StringLiteral | NumericLiteral;
    }
    interface ComputedPropertyName extends Node {
        kind: SyntaxKind.ComputedPropertyName;
        expression: Expression;
    }
    interface Decorator extends Node {
        kind: SyntaxKind.Decorator;
        expression: LeftHandSideExpression;
    }
    interface TypeParameterDeclaration extends NamedDeclaration {
        kind: SyntaxKind.TypeParameter;
        parent?: DeclarationWithTypeParameters;
        name: Identifier;
        constraint?: TypeNode;
        default?: TypeNode;
        expression?: Expression;
    }
    interface SignatureDeclaration extends NamedDeclaration {
        name?: PropertyName;
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        parameters: NodeArray<ParameterDeclaration>;
        type?: TypeNode;
    }
    interface CallSignatureDeclaration extends SignatureDeclaration, TypeElement {
        kind: SyntaxKind.CallSignature;
    }
    interface ConstructSignatureDeclaration extends SignatureDeclaration, TypeElement {
        kind: SyntaxKind.ConstructSignature;
    }
    type BindingName = Identifier | BindingPattern;
    interface VariableDeclaration extends NamedDeclaration {
        kind: SyntaxKind.VariableDeclaration;
        parent?: VariableDeclarationList | CatchClause;
        name: BindingName;
        type?: TypeNode;
        initializer?: Expression;
    }
    interface VariableDeclarationList extends Node {
        kind: SyntaxKind.VariableDeclarationList;
        parent?: VariableStatement | ForStatement | ForOfStatement | ForInStatement;
        declarations: NodeArray<VariableDeclaration>;
    }
    interface ParameterDeclaration extends NamedDeclaration {
        kind: SyntaxKind.Parameter;
        parent?: SignatureDeclaration;
        dotDotDotToken?: DotDotDotToken;
        name: BindingName;
        questionToken?: QuestionToken;
        type?: TypeNode;
        initializer?: Expression;
    }
    interface BindingElement extends NamedDeclaration {
        kind: SyntaxKind.BindingElement;
        parent?: BindingPattern;
        propertyName?: PropertyName;
        dotDotDotToken?: DotDotDotToken;
        name: BindingName;
        initializer?: Expression;
    }
    interface PropertySignature extends TypeElement {
        kind: SyntaxKind.PropertySignature | SyntaxKind.JSDocRecordMember;
        name: PropertyName;
        questionToken?: QuestionToken;
        type?: TypeNode;
        initializer?: Expression;
    }
    interface PropertyDeclaration extends ClassElement {
        kind: SyntaxKind.PropertyDeclaration;
        questionToken?: QuestionToken;
        name: PropertyName;
        type?: TypeNode;
        initializer?: Expression;
    }
    interface ObjectLiteralElement extends NamedDeclaration {
        _objectLiteralBrandBrand: any;
        name?: PropertyName;
    }
    type ObjectLiteralElementLike = PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration;
    interface PropertyAssignment extends ObjectLiteralElement {
        kind: SyntaxKind.PropertyAssignment;
        name: PropertyName;
        questionToken?: QuestionToken;
        initializer: Expression;
    }
    interface ShorthandPropertyAssignment extends ObjectLiteralElement {
        kind: SyntaxKind.ShorthandPropertyAssignment;
        name: Identifier;
        questionToken?: QuestionToken;
        equalsToken?: Token<SyntaxKind.EqualsToken>;
        objectAssignmentInitializer?: Expression;
    }
    interface SpreadAssignment extends ObjectLiteralElement {
        kind: SyntaxKind.SpreadAssignment;
        expression: Expression;
    }
    interface VariableLikeDeclaration extends NamedDeclaration {
        propertyName?: PropertyName;
        dotDotDotToken?: DotDotDotToken;
        name: DeclarationName;
        questionToken?: QuestionToken;
        type?: TypeNode;
        initializer?: Expression;
    }
    interface PropertyLikeDeclaration extends NamedDeclaration {
        name: PropertyName;
    }
    interface ObjectBindingPattern extends Node {
        kind: SyntaxKind.ObjectBindingPattern;
        parent?: VariableDeclaration | ParameterDeclaration | BindingElement;
        elements: NodeArray<BindingElement>;
    }
    interface ArrayBindingPattern extends Node {
        kind: SyntaxKind.ArrayBindingPattern;
        parent?: VariableDeclaration | ParameterDeclaration | BindingElement;
        elements: NodeArray<ArrayBindingElement>;
    }
    type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;
    type ArrayBindingElement = BindingElement | OmittedExpression;
    interface FunctionLikeDeclaration extends SignatureDeclaration {
        _functionLikeDeclarationBrand: any;
        asteriskToken?: AsteriskToken;
        questionToken?: QuestionToken;
        body?: Block | Expression;
    }
    interface FunctionDeclaration extends FunctionLikeDeclaration, DeclarationStatement {
        kind: SyntaxKind.FunctionDeclaration;
        name?: Identifier;
        body?: FunctionBody;
    }
    interface MethodSignature extends SignatureDeclaration, TypeElement {
        kind: SyntaxKind.MethodSignature;
        name: PropertyName;
    }
    interface MethodDeclaration extends FunctionLikeDeclaration, ClassElement, ObjectLiteralElement {
        kind: SyntaxKind.MethodDeclaration;
        name: PropertyName;
        body?: FunctionBody;
    }
    interface ConstructorDeclaration extends FunctionLikeDeclaration, ClassElement {
        kind: SyntaxKind.Constructor;
        parent?: ClassDeclaration | ClassExpression;
        body?: FunctionBody;
    }
    interface SemicolonClassElement extends ClassElement {
        kind: SyntaxKind.SemicolonClassElement;
        parent?: ClassDeclaration | ClassExpression;
    }
    interface GetAccessorDeclaration extends FunctionLikeDeclaration, ClassElement, ObjectLiteralElement {
        kind: SyntaxKind.GetAccessor;
        parent?: ClassDeclaration | ClassExpression | ObjectLiteralExpression;
        name: PropertyName;
        body: FunctionBody;
    }
    interface SetAccessorDeclaration extends FunctionLikeDeclaration, ClassElement, ObjectLiteralElement {
        kind: SyntaxKind.SetAccessor;
        parent?: ClassDeclaration | ClassExpression | ObjectLiteralExpression;
        name: PropertyName;
        body: FunctionBody;
    }
    type AccessorDeclaration = GetAccessorDeclaration | SetAccessorDeclaration;
    interface IndexSignatureDeclaration extends SignatureDeclaration, ClassElement, TypeElement {
        kind: SyntaxKind.IndexSignature;
        parent?: ClassDeclaration | ClassExpression | InterfaceDeclaration | TypeLiteralNode;
    }
    interface TypeNode extends Node {
        _typeNodeBrand: any;
    }
    interface KeywordTypeNode extends TypeNode {
        kind: SyntaxKind.AnyKeyword | SyntaxKind.NumberKeyword | SyntaxKind.ObjectKeyword | SyntaxKind.BooleanKeyword | SyntaxKind.StringKeyword | SyntaxKind.SymbolKeyword | SyntaxKind.ThisKeyword | SyntaxKind.VoidKeyword | SyntaxKind.UndefinedKeyword | SyntaxKind.NullKeyword | SyntaxKind.NeverKeyword;
    }
    interface ThisTypeNode extends TypeNode {
        kind: SyntaxKind.ThisType;
    }
    type FunctionOrConstructorTypeNode = FunctionTypeNode | ConstructorTypeNode;
    interface FunctionTypeNode extends TypeNode, SignatureDeclaration {
        kind: SyntaxKind.FunctionType;
    }
    interface ConstructorTypeNode extends TypeNode, SignatureDeclaration {
        kind: SyntaxKind.ConstructorType;
    }
    type TypeReferenceType = TypeReferenceNode | ExpressionWithTypeArguments | JSDocTypeReference;
    interface TypeReferenceNode extends TypeNode {
        kind: SyntaxKind.TypeReference;
        typeName: EntityName;
        typeArguments?: NodeArray<TypeNode>;
    }
    interface TypePredicateNode extends TypeNode {
        kind: SyntaxKind.TypePredicate;
        parameterName: Identifier | ThisTypeNode;
        type: TypeNode;
    }
    interface TypeQueryNode extends TypeNode {
        kind: SyntaxKind.TypeQuery;
        exprName: EntityName;
    }
    interface TypeLiteralNode extends TypeNode, Declaration {
        kind: SyntaxKind.TypeLiteral;
        members: NodeArray<TypeElement>;
    }
    interface ArrayTypeNode extends TypeNode {
        kind: SyntaxKind.ArrayType;
        elementType: TypeNode;
    }
    interface TupleTypeNode extends TypeNode {
        kind: SyntaxKind.TupleType;
        elementTypes: NodeArray<TypeNode>;
    }
    type UnionOrIntersectionTypeNode = UnionTypeNode | IntersectionTypeNode;
    interface UnionTypeNode extends TypeNode {
        kind: SyntaxKind.UnionType;
        types: NodeArray<TypeNode>;
    }
    interface IntersectionTypeNode extends TypeNode {
        kind: SyntaxKind.IntersectionType;
        types: NodeArray<TypeNode>;
    }
    interface ParenthesizedTypeNode extends TypeNode {
        kind: SyntaxKind.ParenthesizedType;
        type: TypeNode;
    }
    interface TypeOperatorNode extends TypeNode {
        kind: SyntaxKind.TypeOperator;
        operator: SyntaxKind.KeyOfKeyword;
        type: TypeNode;
    }
    interface IndexedAccessTypeNode extends TypeNode {
        kind: SyntaxKind.IndexedAccessType;
        objectType: TypeNode;
        indexType: TypeNode;
    }
    interface MappedTypeNode extends TypeNode, Declaration {
        kind: SyntaxKind.MappedType;
        parent?: TypeAliasDeclaration;
        readonlyToken?: ReadonlyToken;
        typeParameter: TypeParameterDeclaration;
        questionToken?: QuestionToken;
        type?: TypeNode;
    }
    interface LiteralTypeNode extends TypeNode {
        kind: SyntaxKind.LiteralType;
        literal: Expression;
    }
    interface StringLiteral extends LiteralExpression {
        kind: SyntaxKind.StringLiteral;
        textSourceNode?: Identifier | StringLiteral | NumericLiteral;
    }
    interface Expression extends Node {
        _expressionBrand: any;
    }
    interface OmittedExpression extends Expression {
        kind: SyntaxKind.OmittedExpression;
    }
    interface PartiallyEmittedExpression extends LeftHandSideExpression {
        kind: SyntaxKind.PartiallyEmittedExpression;
        expression: Expression;
    }
    interface UnaryExpression extends Expression {
        _unaryExpressionBrand: any;
    }
    type IncrementExpression = UpdateExpression;
    interface UpdateExpression extends UnaryExpression {
        _updateExpressionBrand: any;
    }
    type PrefixUnaryOperator = SyntaxKind.PlusPlusToken | SyntaxKind.MinusMinusToken | SyntaxKind.PlusToken | SyntaxKind.MinusToken | SyntaxKind.TildeToken | SyntaxKind.ExclamationToken;
    interface PrefixUnaryExpression extends UpdateExpression {
        kind: SyntaxKind.PrefixUnaryExpression;
        operator: PrefixUnaryOperator;
        operand: UnaryExpression;
    }
    type PostfixUnaryOperator = SyntaxKind.PlusPlusToken | SyntaxKind.MinusMinusToken;
    interface PostfixUnaryExpression extends UpdateExpression {
        kind: SyntaxKind.PostfixUnaryExpression;
        operand: LeftHandSideExpression;
        operator: PostfixUnaryOperator;
    }
    interface LeftHandSideExpression extends UpdateExpression {
        _leftHandSideExpressionBrand: any;
    }
    interface MemberExpression extends LeftHandSideExpression {
        _memberExpressionBrand: any;
    }
    interface PrimaryExpression extends MemberExpression {
        _primaryExpressionBrand: any;
    }
    interface NullLiteral extends PrimaryExpression, TypeNode {
        kind: SyntaxKind.NullKeyword;
    }
    interface BooleanLiteral extends PrimaryExpression, TypeNode {
        kind: SyntaxKind.TrueKeyword | SyntaxKind.FalseKeyword;
    }
    interface ThisExpression extends PrimaryExpression, KeywordTypeNode {
        kind: SyntaxKind.ThisKeyword;
    }
    interface SuperExpression extends PrimaryExpression {
        kind: SyntaxKind.SuperKeyword;
    }
    interface ImportExpression extends PrimaryExpression {
        kind: SyntaxKind.ImportKeyword;
    }
    interface DeleteExpression extends UnaryExpression {
        kind: SyntaxKind.DeleteExpression;
        expression: UnaryExpression;
    }
    interface TypeOfExpression extends UnaryExpression {
        kind: SyntaxKind.TypeOfExpression;
        expression: UnaryExpression;
    }
    interface VoidExpression extends UnaryExpression {
        kind: SyntaxKind.VoidExpression;
        expression: UnaryExpression;
    }
    interface AwaitExpression extends UnaryExpression {
        kind: SyntaxKind.AwaitExpression;
        expression: UnaryExpression;
    }
    interface YieldExpression extends Expression {
        kind: SyntaxKind.YieldExpression;
        asteriskToken?: AsteriskToken;
        expression?: Expression;
    }
    type ExponentiationOperator = SyntaxKind.AsteriskAsteriskToken;
    type MultiplicativeOperator = SyntaxKind.AsteriskToken | SyntaxKind.SlashToken | SyntaxKind.PercentToken;
    type MultiplicativeOperatorOrHigher = ExponentiationOperator | MultiplicativeOperator;
    type AdditiveOperator = SyntaxKind.PlusToken | SyntaxKind.MinusToken;
    type AdditiveOperatorOrHigher = MultiplicativeOperatorOrHigher | AdditiveOperator;
    type ShiftOperator = SyntaxKind.LessThanLessThanToken | SyntaxKind.GreaterThanGreaterThanToken | SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
    type ShiftOperatorOrHigher = AdditiveOperatorOrHigher | ShiftOperator;
    type RelationalOperator = SyntaxKind.LessThanToken | SyntaxKind.LessThanEqualsToken | SyntaxKind.GreaterThanToken | SyntaxKind.GreaterThanEqualsToken | SyntaxKind.InstanceOfKeyword | SyntaxKind.InKeyword;
    type RelationalOperatorOrHigher = ShiftOperatorOrHigher | RelationalOperator;
    type EqualityOperator = SyntaxKind.EqualsEqualsToken | SyntaxKind.EqualsEqualsEqualsToken | SyntaxKind.ExclamationEqualsEqualsToken | SyntaxKind.ExclamationEqualsToken;
    type EqualityOperatorOrHigher = RelationalOperatorOrHigher | EqualityOperator;
    type BitwiseOperator = SyntaxKind.AmpersandToken | SyntaxKind.BarToken | SyntaxKind.CaretToken;
    type BitwiseOperatorOrHigher = EqualityOperatorOrHigher | BitwiseOperator;
    type LogicalOperator = SyntaxKind.AmpersandAmpersandToken | SyntaxKind.BarBarToken;
    type LogicalOperatorOrHigher = BitwiseOperatorOrHigher | LogicalOperator;
    type CompoundAssignmentOperator = SyntaxKind.PlusEqualsToken | SyntaxKind.MinusEqualsToken | SyntaxKind.AsteriskAsteriskEqualsToken | SyntaxKind.AsteriskEqualsToken | SyntaxKind.SlashEqualsToken | SyntaxKind.PercentEqualsToken | SyntaxKind.AmpersandEqualsToken | SyntaxKind.BarEqualsToken | SyntaxKind.CaretEqualsToken | SyntaxKind.LessThanLessThanEqualsToken | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken | SyntaxKind.GreaterThanGreaterThanEqualsToken;
    type AssignmentOperator = SyntaxKind.EqualsToken | CompoundAssignmentOperator;
    type AssignmentOperatorOrHigher = LogicalOperatorOrHigher | AssignmentOperator;
    type BinaryOperator = AssignmentOperatorOrHigher | SyntaxKind.CommaToken;
    type BinaryOperatorToken = Token<BinaryOperator>;
    interface BinaryExpression extends Expression, Declaration {
        kind: SyntaxKind.BinaryExpression;
        left: Expression;
        operatorToken: BinaryOperatorToken;
        right: Expression;
    }
    type AssignmentOperatorToken = Token<AssignmentOperator>;
    interface AssignmentExpression<TOperator extends AssignmentOperatorToken> extends BinaryExpression {
        left: LeftHandSideExpression;
        operatorToken: TOperator;
    }
    interface ObjectDestructuringAssignment extends AssignmentExpression<EqualsToken> {
        left: ObjectLiteralExpression;
    }
    interface ArrayDestructuringAssignment extends AssignmentExpression<EqualsToken> {
        left: ArrayLiteralExpression;
    }
    type DestructuringAssignment = ObjectDestructuringAssignment | ArrayDestructuringAssignment;
    type BindingOrAssignmentElement = VariableDeclaration | ParameterDeclaration | BindingElement | PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | OmittedExpression | SpreadElement | ArrayLiteralExpression | ObjectLiteralExpression | AssignmentExpression<EqualsToken> | Identifier | PropertyAccessExpression | ElementAccessExpression;
    type BindingOrAssignmentElementRestIndicator = DotDotDotToken | SpreadElement | SpreadAssignment;
    type BindingOrAssignmentElementTarget = BindingOrAssignmentPattern | Expression;
    type ObjectBindingOrAssignmentPattern = ObjectBindingPattern | ObjectLiteralExpression;
    type ArrayBindingOrAssignmentPattern = ArrayBindingPattern | ArrayLiteralExpression;
    type AssignmentPattern = ObjectLiteralExpression | ArrayLiteralExpression;
    type BindingOrAssignmentPattern = ObjectBindingOrAssignmentPattern | ArrayBindingOrAssignmentPattern;
    interface ConditionalExpression extends Expression {
        kind: SyntaxKind.ConditionalExpression;
        condition: Expression;
        questionToken: QuestionToken;
        whenTrue: Expression;
        colonToken: ColonToken;
        whenFalse: Expression;
    }
    type FunctionBody = Block;
    type ConciseBody = FunctionBody | Expression;
    interface FunctionExpression extends PrimaryExpression, FunctionLikeDeclaration {
        kind: SyntaxKind.FunctionExpression;
        name?: Identifier;
        body: FunctionBody;
    }
    interface ArrowFunction extends Expression, FunctionLikeDeclaration {
        kind: SyntaxKind.ArrowFunction;
        equalsGreaterThanToken: EqualsGreaterThanToken;
        body: ConciseBody;
    }
    interface LiteralLikeNode extends Node {
        text: string;
        isUnterminated?: boolean;
        hasExtendedUnicodeEscape?: boolean;
    }
    interface LiteralExpression extends LiteralLikeNode, PrimaryExpression {
        _literalExpressionBrand: any;
    }
    interface RegularExpressionLiteral extends LiteralExpression {
        kind: SyntaxKind.RegularExpressionLiteral;
    }
    interface NoSubstitutionTemplateLiteral extends LiteralExpression {
        kind: SyntaxKind.NoSubstitutionTemplateLiteral;
    }
    const enum NumericLiteralFlags {
        None = 0,
        Scientific = 2,
        Octal = 4,
        HexSpecifier = 8,
        BinarySpecifier = 16,
        OctalSpecifier = 32,
        BinaryOrOctalSpecifier = 48,
    }
    interface NumericLiteral extends LiteralExpression {
        kind: SyntaxKind.NumericLiteral;
        numericLiteralFlags?: NumericLiteralFlags;
    }
    interface TemplateHead extends LiteralLikeNode {
        kind: SyntaxKind.TemplateHead;
        parent?: TemplateExpression;
    }
    interface TemplateMiddle extends LiteralLikeNode {
        kind: SyntaxKind.TemplateMiddle;
        parent?: TemplateSpan;
    }
    interface TemplateTail extends LiteralLikeNode {
        kind: SyntaxKind.TemplateTail;
        parent?: TemplateSpan;
    }
    type TemplateLiteral = TemplateExpression | NoSubstitutionTemplateLiteral;
    interface TemplateExpression extends PrimaryExpression {
        kind: SyntaxKind.TemplateExpression;
        head: TemplateHead;
        templateSpans: NodeArray<TemplateSpan>;
    }
    interface TemplateSpan extends Node {
        kind: SyntaxKind.TemplateSpan;
        parent?: TemplateExpression;
        expression: Expression;
        literal: TemplateMiddle | TemplateTail;
    }
    interface ParenthesizedExpression extends PrimaryExpression {
        kind: SyntaxKind.ParenthesizedExpression;
        expression: Expression;
    }
    interface ArrayLiteralExpression extends PrimaryExpression {
        kind: SyntaxKind.ArrayLiteralExpression;
        elements: NodeArray<Expression>;
        multiLine?: boolean;
    }
    interface SpreadElement extends Expression {
        kind: SyntaxKind.SpreadElement;
        expression: Expression;
    }
    interface ObjectLiteralExpressionBase<T extends ObjectLiteralElement> extends PrimaryExpression, Declaration {
        properties: NodeArray<T>;
    }
    interface ObjectLiteralExpression extends ObjectLiteralExpressionBase<ObjectLiteralElementLike> {
        kind: SyntaxKind.ObjectLiteralExpression;
        multiLine?: boolean;
    }
    type EntityNameExpression = Identifier | PropertyAccessEntityNameExpression | ParenthesizedExpression;
    type EntityNameOrEntityNameExpression = EntityName | EntityNameExpression;
    interface PropertyAccessExpression extends MemberExpression, NamedDeclaration {
        kind: SyntaxKind.PropertyAccessExpression;
        expression: LeftHandSideExpression;
        name: Identifier;
    }
    interface SuperPropertyAccessExpression extends PropertyAccessExpression {
        expression: SuperExpression;
    }
    interface PropertyAccessEntityNameExpression extends PropertyAccessExpression {
        _propertyAccessExpressionLikeQualifiedNameBrand?: any;
        expression: EntityNameExpression;
    }
    interface ElementAccessExpression extends MemberExpression {
        kind: SyntaxKind.ElementAccessExpression;
        expression: LeftHandSideExpression;
        argumentExpression?: Expression;
    }
    interface SuperElementAccessExpression extends ElementAccessExpression {
        expression: SuperExpression;
    }
    type SuperProperty = SuperPropertyAccessExpression | SuperElementAccessExpression;
    interface CallExpression extends LeftHandSideExpression, Declaration {
        kind: SyntaxKind.CallExpression;
        expression: LeftHandSideExpression;
        typeArguments?: NodeArray<TypeNode>;
        arguments: NodeArray<Expression>;
    }
    interface SuperCall extends CallExpression {
        expression: SuperExpression;
    }
    interface ImportCall extends CallExpression {
        expression: ImportExpression;
    }
    interface ExpressionWithTypeArguments extends TypeNode {
        kind: SyntaxKind.ExpressionWithTypeArguments;
        parent?: HeritageClause;
        expression: LeftHandSideExpression;
        typeArguments?: NodeArray<TypeNode>;
    }
    interface NewExpression extends PrimaryExpression, Declaration {
        kind: SyntaxKind.NewExpression;
        expression: LeftHandSideExpression;
        typeArguments?: NodeArray<TypeNode>;
        arguments?: NodeArray<Expression>;
    }
    interface TaggedTemplateExpression extends MemberExpression {
        kind: SyntaxKind.TaggedTemplateExpression;
        tag: LeftHandSideExpression;
        template: TemplateLiteral;
    }
    type CallLikeExpression = CallExpression | NewExpression | TaggedTemplateExpression | Decorator | JsxOpeningLikeElement;
    interface AsExpression extends Expression {
        kind: SyntaxKind.AsExpression;
        expression: Expression;
        type: TypeNode;
    }
    interface TypeAssertion extends UnaryExpression {
        kind: SyntaxKind.TypeAssertionExpression;
        type: TypeNode;
        expression: UnaryExpression;
    }
    type AssertionExpression = TypeAssertion | AsExpression;
    interface NonNullExpression extends LeftHandSideExpression {
        kind: SyntaxKind.NonNullExpression;
        expression: Expression;
    }
    interface MetaProperty extends PrimaryExpression {
        kind: SyntaxKind.MetaProperty;
        keywordToken: SyntaxKind.NewKeyword;
        name: Identifier;
    }
    interface JsxElement extends PrimaryExpression {
        kind: SyntaxKind.JsxElement;
        openingElement: JsxOpeningElement;
        children: NodeArray<JsxChild>;
        closingElement: JsxClosingElement;
    }
    type JsxOpeningLikeElement = JsxSelfClosingElement | JsxOpeningElement;
    type JsxAttributeLike = JsxAttribute | JsxSpreadAttribute;
    type JsxTagNameExpression = PrimaryExpression | PropertyAccessExpression;
    interface JsxAttributes extends ObjectLiteralExpressionBase<JsxAttributeLike> {
        parent?: JsxOpeningLikeElement;
    }
    interface JsxOpeningElement extends Expression {
        kind: SyntaxKind.JsxOpeningElement;
        parent?: JsxElement;
        tagName: JsxTagNameExpression;
        attributes: JsxAttributes;
    }
    interface JsxSelfClosingElement extends PrimaryExpression {
        kind: SyntaxKind.JsxSelfClosingElement;
        tagName: JsxTagNameExpression;
        attributes: JsxAttributes;
    }
    interface JsxAttribute extends ObjectLiteralElement {
        kind: SyntaxKind.JsxAttribute;
        parent?: JsxAttributes;
        name: Identifier;
        initializer?: StringLiteral | JsxExpression;
    }
    interface JsxSpreadAttribute extends ObjectLiteralElement {
        kind: SyntaxKind.JsxSpreadAttribute;
        parent?: JsxAttributes;
        expression: Expression;
    }
    interface JsxClosingElement extends Node {
        kind: SyntaxKind.JsxClosingElement;
        parent?: JsxElement;
        tagName: JsxTagNameExpression;
    }
    interface JsxExpression extends Expression {
        kind: SyntaxKind.JsxExpression;
        parent?: JsxElement | JsxAttributeLike;
        dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
        expression?: Expression;
    }
    interface JsxText extends Node {
        kind: SyntaxKind.JsxText;
        containsOnlyWhiteSpaces: boolean;
        parent?: JsxElement;
    }
    type JsxChild = JsxText | JsxExpression | JsxElement | JsxSelfClosingElement;
    interface Statement extends Node {
        _statementBrand: any;
    }
    interface NotEmittedStatement extends Statement {
        kind: SyntaxKind.NotEmittedStatement;
    }
    interface EndOfDeclarationMarker extends Statement {
        kind: SyntaxKind.EndOfDeclarationMarker;
    }
    interface CommaListExpression extends Expression {
        kind: SyntaxKind.CommaListExpression;
        elements: NodeArray<Expression>;
    }
    interface MergeDeclarationMarker extends Statement {
        kind: SyntaxKind.MergeDeclarationMarker;
    }
    interface EmptyStatement extends Statement {
        kind: SyntaxKind.EmptyStatement;
    }
    interface DebuggerStatement extends Statement {
        kind: SyntaxKind.DebuggerStatement;
    }
    interface MissingDeclaration extends DeclarationStatement, ClassElement, ObjectLiteralElement, TypeElement {
        kind: SyntaxKind.MissingDeclaration;
        name?: Identifier;
    }
    type BlockLike = SourceFile | Block | ModuleBlock | CaseOrDefaultClause;
    interface Block extends Statement {
        kind: SyntaxKind.Block;
        statements: NodeArray<Statement>;
        multiLine?: boolean;
    }
    interface VariableStatement extends Statement {
        kind: SyntaxKind.VariableStatement;
        declarationList: VariableDeclarationList;
    }
    interface ExpressionStatement extends Statement {
        kind: SyntaxKind.ExpressionStatement;
        expression: Expression;
    }
    interface PrologueDirective extends ExpressionStatement {
        expression: StringLiteral;
    }
    interface IfStatement extends Statement {
        kind: SyntaxKind.IfStatement;
        expression: Expression;
        thenStatement: Statement;
        elseStatement?: Statement;
    }
    interface IterationStatement extends Statement {
        statement: Statement;
    }
    interface DoStatement extends IterationStatement {
        kind: SyntaxKind.DoStatement;
        expression: Expression;
    }
    interface WhileStatement extends IterationStatement {
        kind: SyntaxKind.WhileStatement;
        expression: Expression;
    }
    type ForInitializer = VariableDeclarationList | Expression;
    interface ForStatement extends IterationStatement {
        kind: SyntaxKind.ForStatement;
        initializer?: ForInitializer;
        condition?: Expression;
        incrementor?: Expression;
    }
    interface ForInStatement extends IterationStatement {
        kind: SyntaxKind.ForInStatement;
        initializer: ForInitializer;
        expression: Expression;
    }
    interface ForOfStatement extends IterationStatement {
        kind: SyntaxKind.ForOfStatement;
        awaitModifier?: AwaitKeywordToken;
        initializer: ForInitializer;
        expression: Expression;
    }
    interface BreakStatement extends Statement {
        kind: SyntaxKind.BreakStatement;
        label?: Identifier;
    }
    interface ContinueStatement extends Statement {
        kind: SyntaxKind.ContinueStatement;
        label?: Identifier;
    }
    type BreakOrContinueStatement = BreakStatement | ContinueStatement;
    interface ReturnStatement extends Statement {
        kind: SyntaxKind.ReturnStatement;
        expression?: Expression;
    }
    interface WithStatement extends Statement {
        kind: SyntaxKind.WithStatement;
        expression: Expression;
        statement: Statement;
    }
    interface SwitchStatement extends Statement {
        kind: SyntaxKind.SwitchStatement;
        expression: Expression;
        caseBlock: CaseBlock;
        possiblyExhaustive?: boolean;
    }
    interface CaseBlock extends Node {
        kind: SyntaxKind.CaseBlock;
        parent?: SwitchStatement;
        clauses: NodeArray<CaseOrDefaultClause>;
    }
    interface CaseClause extends Node {
        kind: SyntaxKind.CaseClause;
        parent?: CaseBlock;
        expression: Expression;
        statements: NodeArray<Statement>;
    }
    interface DefaultClause extends Node {
        kind: SyntaxKind.DefaultClause;
        parent?: CaseBlock;
        statements: NodeArray<Statement>;
    }
    type CaseOrDefaultClause = CaseClause | DefaultClause;
    interface LabeledStatement extends Statement {
        kind: SyntaxKind.LabeledStatement;
        label: Identifier;
        statement: Statement;
    }
    interface ThrowStatement extends Statement {
        kind: SyntaxKind.ThrowStatement;
        expression: Expression;
    }
    interface TryStatement extends Statement {
        kind: SyntaxKind.TryStatement;
        tryBlock: Block;
        catchClause?: CatchClause;
        finallyBlock?: Block;
    }
    interface CatchClause extends Node {
        kind: SyntaxKind.CatchClause;
        parent?: TryStatement;
        variableDeclaration: VariableDeclaration;
        block: Block;
    }
    type DeclarationWithTypeParameters = SignatureDeclaration | ClassLikeDeclaration | InterfaceDeclaration | TypeAliasDeclaration | JSDocTemplateTag;
    interface ClassLikeDeclaration extends NamedDeclaration {
        name?: Identifier;
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        heritageClauses?: NodeArray<HeritageClause>;
        members: NodeArray<ClassElement>;
    }
    interface ClassDeclaration extends ClassLikeDeclaration, DeclarationStatement {
        kind: SyntaxKind.ClassDeclaration;
        name?: Identifier;
    }
    interface ClassExpression extends ClassLikeDeclaration, PrimaryExpression {
        kind: SyntaxKind.ClassExpression;
    }
    interface ClassElement extends NamedDeclaration {
        _classElementBrand: any;
        name?: PropertyName;
    }
    interface TypeElement extends NamedDeclaration {
        _typeElementBrand: any;
        name?: PropertyName;
        questionToken?: QuestionToken;
    }
    interface InterfaceDeclaration extends DeclarationStatement {
        kind: SyntaxKind.InterfaceDeclaration;
        name: Identifier;
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        heritageClauses?: NodeArray<HeritageClause>;
        members: NodeArray<TypeElement>;
    }
    interface HeritageClause extends Node {
        kind: SyntaxKind.HeritageClause;
        parent?: InterfaceDeclaration | ClassDeclaration | ClassExpression;
        token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword;
        types: NodeArray<ExpressionWithTypeArguments>;
    }
    interface TypeAliasDeclaration extends DeclarationStatement {
        kind: SyntaxKind.TypeAliasDeclaration;
        name: Identifier;
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        type: TypeNode;
    }
    interface EnumMember extends NamedDeclaration {
        kind: SyntaxKind.EnumMember;
        parent?: EnumDeclaration;
        name: PropertyName;
        initializer?: Expression;
    }
    interface EnumDeclaration extends DeclarationStatement {
        kind: SyntaxKind.EnumDeclaration;
        name: Identifier;
        members: NodeArray<EnumMember>;
    }
    type ModuleName = Identifier | StringLiteral;
    type ModuleBody = NamespaceBody | JSDocNamespaceBody;
    interface ModuleDeclaration extends DeclarationStatement {
        kind: SyntaxKind.ModuleDeclaration;
        parent?: ModuleBody | SourceFile;
        name: ModuleName;
        body?: ModuleBody | JSDocNamespaceDeclaration;
    }
    type NamespaceBody = ModuleBlock | NamespaceDeclaration;
    interface NamespaceDeclaration extends ModuleDeclaration {
        name: Identifier;
        body: NamespaceBody;
    }
    type JSDocNamespaceBody = Identifier | JSDocNamespaceDeclaration;
    interface JSDocNamespaceDeclaration extends ModuleDeclaration {
        name: Identifier;
        body: JSDocNamespaceBody;
    }
    interface ModuleBlock extends Node, Statement {
        kind: SyntaxKind.ModuleBlock;
        parent?: ModuleDeclaration;
        statements: NodeArray<Statement>;
    }
    type ModuleReference = EntityName | ExternalModuleReference;
    interface ImportEqualsDeclaration extends DeclarationStatement {
        kind: SyntaxKind.ImportEqualsDeclaration;
        parent?: SourceFile | ModuleBlock;
        name: Identifier;
        moduleReference: ModuleReference;
    }
    interface ExternalModuleReference extends Node {
        kind: SyntaxKind.ExternalModuleReference;
        parent?: ImportEqualsDeclaration;
        expression?: Expression;
    }
    interface ImportDeclaration extends Statement {
        kind: SyntaxKind.ImportDeclaration;
        parent?: SourceFile | ModuleBlock;
        importClause?: ImportClause;
        moduleSpecifier: Expression;
    }
    type NamedImportBindings = NamespaceImport | NamedImports;
    interface ImportClause extends NamedDeclaration {
        kind: SyntaxKind.ImportClause;
        parent?: ImportDeclaration;
        name?: Identifier;
        namedBindings?: NamedImportBindings;
    }
    interface NamespaceImport extends NamedDeclaration {
        kind: SyntaxKind.NamespaceImport;
        parent?: ImportClause;
        name: Identifier;
    }
    interface NamespaceExportDeclaration extends DeclarationStatement {
        kind: SyntaxKind.NamespaceExportDeclaration;
        name: Identifier;
    }
    interface ExportDeclaration extends DeclarationStatement {
        kind: SyntaxKind.ExportDeclaration;
        parent?: SourceFile | ModuleBlock;
        exportClause?: NamedExports;
        moduleSpecifier?: Expression;
    }
    interface NamedImports extends Node {
        kind: SyntaxKind.NamedImports;
        parent?: ImportClause;
        elements: NodeArray<ImportSpecifier>;
    }
    interface NamedExports extends Node {
        kind: SyntaxKind.NamedExports;
        parent?: ExportDeclaration;
        elements: NodeArray<ExportSpecifier>;
    }
    type NamedImportsOrExports = NamedImports | NamedExports;
    interface ImportSpecifier extends NamedDeclaration {
        kind: SyntaxKind.ImportSpecifier;
        parent?: NamedImports;
        propertyName?: Identifier;
        name: Identifier;
    }
    interface ExportSpecifier extends NamedDeclaration {
        kind: SyntaxKind.ExportSpecifier;
        parent?: NamedExports;
        propertyName?: Identifier;
        name: Identifier;
    }
    type ImportOrExportSpecifier = ImportSpecifier | ExportSpecifier;
    interface ExportAssignment extends DeclarationStatement {
        kind: SyntaxKind.ExportAssignment;
        parent?: SourceFile;
        isExportEquals?: boolean;
        expression: Expression;
    }
    interface FileReference extends TextRange {
        fileName: string;
    }
    interface CheckJsDirective extends TextRange {
        enabled: boolean;
    }
    type CommentKind = SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia;
    interface CommentRange extends TextRange {
        hasTrailingNewLine?: boolean;
        kind: CommentKind;
    }
    interface SynthesizedComment extends CommentRange {
        text: string;
        pos: -1;
        end: -1;
    }
    interface JSDocTypeExpression extends Node {
        kind: SyntaxKind.JSDocTypeExpression;
        type: JSDocType;
    }
    interface JSDocType extends TypeNode {
        _jsDocTypeBrand: any;
    }
    interface JSDocAllType extends JSDocType {
        kind: SyntaxKind.JSDocAllType;
    }
    interface JSDocUnknownType extends JSDocType {
        kind: SyntaxKind.JSDocUnknownType;
    }
    interface JSDocArrayType extends JSDocType {
        kind: SyntaxKind.JSDocArrayType;
        elementType: JSDocType;
    }
    interface JSDocUnionType extends JSDocType {
        kind: SyntaxKind.JSDocUnionType;
        types: NodeArray<JSDocType>;
    }
    interface JSDocTupleType extends JSDocType {
        kind: SyntaxKind.JSDocTupleType;
        types: NodeArray<JSDocType>;
    }
    interface JSDocNonNullableType extends JSDocType {
        kind: SyntaxKind.JSDocNonNullableType;
        type: JSDocType;
    }
    interface JSDocNullableType extends JSDocType {
        kind: SyntaxKind.JSDocNullableType;
        type: JSDocType;
    }
    interface JSDocRecordType extends JSDocType {
        kind: SyntaxKind.JSDocRecordType;
        literal: TypeLiteralNode;
    }
    interface JSDocTypeReference extends JSDocType {
        kind: SyntaxKind.JSDocTypeReference;
        name: EntityName;
        typeArguments: NodeArray<JSDocType>;
    }
    interface JSDocOptionalType extends JSDocType {
        kind: SyntaxKind.JSDocOptionalType;
        type: JSDocType;
    }
    interface JSDocFunctionType extends JSDocType, SignatureDeclaration {
        kind: SyntaxKind.JSDocFunctionType;
        parameters: NodeArray<ParameterDeclaration>;
        type: JSDocType;
    }
    interface JSDocVariadicType extends JSDocType {
        kind: SyntaxKind.JSDocVariadicType;
        type: JSDocType;
    }
    interface JSDocConstructorType extends JSDocType {
        kind: SyntaxKind.JSDocConstructorType;
        type: JSDocType;
    }
    interface JSDocThisType extends JSDocType {
        kind: SyntaxKind.JSDocThisType;
        type: JSDocType;
    }
    interface JSDocLiteralType extends JSDocType {
        kind: SyntaxKind.JSDocLiteralType;
        literal: LiteralTypeNode;
    }
    type JSDocTypeReferencingNode = JSDocThisType | JSDocConstructorType | JSDocVariadicType | JSDocOptionalType | JSDocNullableType | JSDocNonNullableType;
    interface JSDocRecordMember extends PropertySignature {
        kind: SyntaxKind.JSDocRecordMember;
        name: Identifier | StringLiteral | NumericLiteral;
        type?: JSDocType;
    }
    interface JSDoc extends Node {
        kind: SyntaxKind.JSDocComment;
        tags: NodeArray<JSDocTag> | undefined;
        comment: string | undefined;
    }
    interface JSDocTag extends Node {
        parent: JSDoc;
        atToken: AtToken;
        tagName: Identifier;
        comment: string | undefined;
    }
    interface JSDocUnknownTag extends JSDocTag {
        kind: SyntaxKind.JSDocTag;
    }
    interface JSDocAugmentsTag extends JSDocTag {
        kind: SyntaxKind.JSDocAugmentsTag;
        typeExpression: JSDocTypeExpression;
    }
    interface JSDocClassTag extends JSDocTag {
        kind: SyntaxKind.JSDocClassTag;
    }
    interface JSDocTemplateTag extends JSDocTag {
        kind: SyntaxKind.JSDocTemplateTag;
        typeParameters: NodeArray<TypeParameterDeclaration>;
    }
    interface JSDocReturnTag extends JSDocTag {
        kind: SyntaxKind.JSDocReturnTag;
        typeExpression: JSDocTypeExpression;
    }
    interface JSDocTypeTag extends JSDocTag {
        kind: SyntaxKind.JSDocTypeTag;
        typeExpression: JSDocTypeExpression;
    }
    interface JSDocTypedefTag extends JSDocTag, NamedDeclaration {
        parent: JSDoc;
        kind: SyntaxKind.JSDocTypedefTag;
        fullName?: JSDocNamespaceDeclaration | Identifier;
        name?: Identifier;
        typeExpression?: JSDocTypeExpression;
        jsDocTypeLiteral?: JSDocTypeLiteral;
    }
    interface JSDocPropertyTag extends JSDocTag, TypeElement {
        parent: JSDoc;
        kind: SyntaxKind.JSDocPropertyTag;
        name: Identifier;
        preParameterName?: Identifier;
        postParameterName?: Identifier;
        typeExpression: JSDocTypeExpression;
        isBracketed: boolean;
    }
    interface JSDocTypeLiteral extends JSDocType {
        kind: SyntaxKind.JSDocTypeLiteral;
        jsDocPropertyTags?: NodeArray<JSDocPropertyTag>;
        jsDocTypeTag?: JSDocTypeTag;
    }
    interface JSDocParameterTag extends JSDocTag {
        kind: SyntaxKind.JSDocParameterTag;
        preParameterName?: Identifier;
        typeExpression?: JSDocTypeExpression;
        postParameterName?: Identifier;
        name: Identifier;
        isBracketed: boolean;
    }
    const enum FlowFlags {
        Unreachable = 1,
        Start = 2,
        BranchLabel = 4,
        LoopLabel = 8,
        Assignment = 16,
        TrueCondition = 32,
        FalseCondition = 64,
        SwitchClause = 128,
        ArrayMutation = 256,
        Referenced = 512,
        Shared = 1024,
        PreFinally = 2048,
        AfterFinally = 4096,
        Label = 12,
        Condition = 96,
    }
    interface FlowLock {
        locked?: boolean;
    }
    interface AfterFinallyFlow extends FlowNode, FlowLock {
        antecedent: FlowNode;
    }
    interface PreFinallyFlow extends FlowNode {
        antecedent: FlowNode;
        lock: FlowLock;
    }
    interface FlowNode {
        flags: FlowFlags;
        id?: number;
    }
    interface FlowStart extends FlowNode {
        container?: FunctionExpression | ArrowFunction | MethodDeclaration;
    }
    interface FlowLabel extends FlowNode {
        antecedents: FlowNode[];
    }
    interface FlowAssignment extends FlowNode {
        node: Expression | VariableDeclaration | BindingElement;
        antecedent: FlowNode;
    }
    interface FlowCondition extends FlowNode {
        expression: Expression;
        antecedent: FlowNode;
    }
    interface FlowSwitchClause extends FlowNode {
        switchStatement: SwitchStatement;
        clauseStart: number;
        clauseEnd: number;
        antecedent: FlowNode;
    }
    interface FlowArrayMutation extends FlowNode {
        node: CallExpression | BinaryExpression;
        antecedent: FlowNode;
    }
    type FlowType = Type | IncompleteType;
    interface IncompleteType {
        flags: TypeFlags;
        type: Type;
    }
    interface AmdDependency {
        path: string;
        name: string;
    }
    interface SourceFileLike {
        readonly text: string;
        lineMap: number[];
    }
    interface SourceFile extends Declaration {
        kind: SyntaxKind.SourceFile;
        statements: NodeArray<Statement>;
        endOfFileToken: Token<SyntaxKind.EndOfFileToken>;
        fileName: string;
        path: Path;
        text: string;
        amdDependencies: AmdDependency[];
        moduleName: string;
        referencedFiles: FileReference[];
        typeReferenceDirectives: FileReference[];
        languageVariant: LanguageVariant;
        isDeclarationFile: boolean;
        renamedDependencies?: Map<string>;
        hasNoDefaultLib: boolean;
        languageVersion: ScriptTarget;
        scriptKind: ScriptKind;
        externalModuleIndicator: Node;
        commonJsModuleIndicator: Node;
        identifiers: Map<string>;
        nodeCount: number;
        identifierCount: number;
        symbolCount: number;
        parseDiagnostics: Diagnostic[];
        bindDiagnostics: Diagnostic[];
        jsDocDiagnostics?: Diagnostic[];
        additionalSyntacticDiagnostics?: Diagnostic[];
        lineMap: number[];
        classifiableNames?: Map<string>;
        resolvedModules: Map<ResolvedModuleFull>;
        resolvedTypeReferenceDirectiveNames: Map<ResolvedTypeReferenceDirective>;
        imports: StringLiteral[];
        moduleAugmentations: StringLiteral[];
        patternAmbientModules?: PatternAmbientModule[];
        ambientModuleNames: string[];
        checkJsDirective: CheckJsDirective | undefined;
    }
    interface Bundle extends Node {
        kind: SyntaxKind.Bundle;
        sourceFiles: SourceFile[];
    }
    interface ScriptReferenceHost {
        getCompilerOptions(): CompilerOptions;
        getSourceFile(fileName: string): SourceFile;
        getSourceFileByPath(path: Path): SourceFile;
        getCurrentDirectory(): string;
    }
    interface ParseConfigHost {
        useCaseSensitiveFileNames: boolean;
        readDirectory(rootDir: string, extensions: string[], excludes: string[], includes: string[]): string[];
        fileExists(path: string): boolean;
        readFile(path: string): string;
    }
    interface WriteFileCallback {
        (fileName: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void, sourceFiles?: SourceFile[]): void;
    }
    class OperationCanceledException {
    }
    interface CancellationToken {
        isCancellationRequested(): boolean;
        throwIfCancellationRequested(): void;
    }
    interface Program extends ScriptReferenceHost {
        getRootFileNames(): string[];
        getSourceFiles(): SourceFile[];
        emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): EmitResult;
        getOptionsDiagnostics(cancellationToken?: CancellationToken): Diagnostic[];
        getGlobalDiagnostics(cancellationToken?: CancellationToken): Diagnostic[];
        getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): Diagnostic[];
        getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): Diagnostic[];
        getDeclarationDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): Diagnostic[];
        getTypeChecker(): TypeChecker;
        getCommonSourceDirectory(): string;
        getDiagnosticsProducingTypeChecker(): TypeChecker;
        dropDiagnosticsProducingTypeChecker(): void;
        getClassifiableNames(): Map<string>;
        getNodeCount(): number;
        getIdentifierCount(): number;
        getSymbolCount(): number;
        getTypeCount(): number;
        getFileProcessingDiagnostics(): DiagnosticCollection;
        getResolvedTypeReferenceDirectives(): Map<ResolvedTypeReferenceDirective>;
        isSourceFileFromExternalLibrary(file: SourceFile): boolean;
        structureIsReused?: StructureIsReused;
        getSourceFileFromReference(referencingFile: SourceFile, ref: FileReference): SourceFile | undefined;
    }
    const enum StructureIsReused {
        Not = 0,
        SafeModules = 1,
        Completely = 2,
    }
    interface CustomTransformers {
        before?: TransformerFactory<SourceFile>[];
        after?: TransformerFactory<SourceFile>[];
    }
    interface SourceMapSpan {
        emittedLine: number;
        emittedColumn: number;
        sourceLine: number;
        sourceColumn: number;
        nameIndex?: number;
        sourceIndex: number;
    }
    interface SourceMapData {
        sourceMapFilePath: string;
        jsSourceMappingURL: string;
        sourceMapFile: string;
        sourceMapSourceRoot: string;
        sourceMapSources: string[];
        sourceMapSourcesContent?: string[];
        inputSourceFileNames: string[];
        sourceMapNames?: string[];
        sourceMapMappings: string;
        sourceMapDecodedMappings: SourceMapSpan[];
    }
    enum ExitStatus {
        Success = 0,
        DiagnosticsPresent_OutputsSkipped = 1,
        DiagnosticsPresent_OutputsGenerated = 2,
    }
    interface EmitResult {
        emitSkipped: boolean;
        diagnostics: Diagnostic[];
        emittedFiles: string[];
        sourceMaps: SourceMapData[];
    }
    interface TypeCheckerHost {
        getCompilerOptions(): CompilerOptions;
        getSourceFiles(): SourceFile[];
        getSourceFile(fileName: string): SourceFile;
        getResolvedTypeReferenceDirectives(): Map<ResolvedTypeReferenceDirective>;
    }
    interface TypeChecker {
        getTypeOfSymbolAtLocation(symbol: Symbol, node: Node): Type;
        getDeclaredTypeOfSymbol(symbol: Symbol): Type;
        getPropertiesOfType(type: Type): Symbol[];
        getPropertyOfType(type: Type, propertyName: string): Symbol | undefined;
        getIndexInfoOfType(type: Type, kind: IndexKind): IndexInfo | undefined;
        getSignaturesOfType(type: Type, kind: SignatureKind): Signature[];
        getIndexTypeOfType(type: Type, kind: IndexKind): Type | undefined;
        getBaseTypes(type: InterfaceType): BaseType[];
        getBaseTypeOfLiteralType(type: Type): Type;
        getWidenedType(type: Type): Type;
        getReturnTypeOfSignature(signature: Signature): Type;
        getParameterType(signature: Signature, parameterIndex: number): Type;
        getNonNullableType(type: Type): Type;
        typeToTypeNode(type: Type, enclosingDeclaration?: Node, flags?: NodeBuilderFlags): TypeNode;
        signatureToSignatureDeclaration(signature: Signature, kind: SyntaxKind, enclosingDeclaration?: Node, flags?: NodeBuilderFlags): SignatureDeclaration;
        indexInfoToIndexSignatureDeclaration(indexInfo: IndexInfo, kind: IndexKind, enclosingDeclaration?: Node, flags?: NodeBuilderFlags): IndexSignatureDeclaration;
        getSymbolsInScope(location: Node, meaning: SymbolFlags): Symbol[];
        getSymbolAtLocation(node: Node): Symbol | undefined;
        getSymbolsOfParameterPropertyDeclaration(parameter: ParameterDeclaration, parameterName: string): Symbol[];
        getShorthandAssignmentValueSymbol(location: Node): Symbol | undefined;
        getExportSpecifierLocalTargetSymbol(location: ExportSpecifier): Symbol | undefined;
        getPropertySymbolOfDestructuringAssignment(location: Identifier): Symbol | undefined;
        getTypeAtLocation(node: Node): Type;
        getTypeFromTypeNode(node: TypeNode): Type;
        signatureToString(signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags, kind?: SignatureKind): string;
        typeToString(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
        symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags): string;
        getSymbolDisplayBuilder(): SymbolDisplayBuilder;
        getFullyQualifiedName(symbol: Symbol): string;
        getAugmentedPropertiesOfType(type: Type): Symbol[];
        getRootSymbols(symbol: Symbol): Symbol[];
        getContextualType(node: Expression): Type | undefined;
        getResolvedSignature(node: CallLikeExpression, candidatesOutArray?: Signature[]): Signature | undefined;
        getSignatureFromDeclaration(declaration: SignatureDeclaration): Signature | undefined;
        isImplementationOfOverload(node: FunctionLikeDeclaration): boolean | undefined;
        isUndefinedSymbol(symbol: Symbol): boolean;
        isArgumentsSymbol(symbol: Symbol): boolean;
        isUnknownSymbol(symbol: Symbol): boolean;
        getMergedSymbol(symbol: Symbol): Symbol;
        getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): string | number | undefined;
        isValidPropertyAccess(node: PropertyAccessExpression | QualifiedName, propertyName: string): boolean;
        getAliasedSymbol(symbol: Symbol): Symbol;
        getImmediateAliasedSymbol(symbol: Symbol): Symbol;
        getExportsOfModule(moduleSymbol: Symbol): Symbol[];
        getExportsAndPropertiesOfModule(moduleSymbol: Symbol): Symbol[];
        getAllAttributesTypeFromJsxOpeningLikeElement(elementNode: JsxOpeningLikeElement): Type | undefined;
        getJsxIntrinsicTagNames(): Symbol[];
        isOptionalParameter(node: ParameterDeclaration): boolean;
        getAmbientModules(): Symbol[];
        tryGetMemberInModuleExports(memberName: string, moduleSymbol: Symbol): Symbol | undefined;
        getApparentType(type: Type): Type;
        getSuggestionForNonexistentProperty(node: Identifier, containingType: Type): string | undefined;
        getSuggestionForNonexistentSymbol(location: Node, name: string, meaning: SymbolFlags): string | undefined;
        getBaseConstraintOfType(type: Type): Type | undefined;
        tryFindAmbientModuleWithoutAugmentations(moduleName: string): Symbol | undefined;
        getDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): Diagnostic[];
        getGlobalDiagnostics(): Diagnostic[];
        getEmitResolver(sourceFile?: SourceFile, cancellationToken?: CancellationToken): EmitResolver;
        getNodeCount(): number;
        getIdentifierCount(): number;
        getSymbolCount(): number;
        getTypeCount(): number;
        getAllPossiblePropertiesOfType(type: Type): Symbol[];
        getJsxNamespace(): string;
        resolveNameAtLocation(location: Node, name: string, meaning: SymbolFlags): Symbol | undefined;
    }
    enum NodeBuilderFlags {
        None = 0,
        NoTruncation = 1,
        WriteArrayAsGenericType = 2,
        WriteTypeArgumentsOfSignature = 32,
        UseFullyQualifiedType = 64,
        SuppressAnyReturnType = 256,
        WriteTypeParametersInQualifiedName = 512,
        AllowThisInObjectLiteral = 1024,
        AllowQualifedNameInPlaceOfIdentifier = 2048,
        AllowAnonymousIdentifier = 8192,
        AllowEmptyUnionOrIntersection = 16384,
        AllowEmptyTuple = 32768,
        IgnoreErrors = 60416,
        InObjectTypeLiteral = 1048576,
        InTypeAlias = 8388608,
    }
    interface SymbolDisplayBuilder {
        buildTypeDisplay(type: Type, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildSymbolDisplay(symbol: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): void;
        buildSignatureDisplay(signature: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, kind?: SignatureKind): void;
        buildIndexSignatureDisplay(info: IndexInfo, writer: SymbolWriter, kind: IndexKind, enclosingDeclaration?: Node, globalFlags?: TypeFormatFlags, symbolStack?: Symbol[]): void;
        buildParameterDisplay(parameter: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildTypeParameterDisplay(tp: TypeParameter, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildTypePredicateDisplay(predicate: TypePredicate, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildTypeParameterDisplayFromSymbol(symbol: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildDisplayForParametersAndDelimiters(thisParameter: Symbol, parameters: Symbol[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildDisplayForTypeParametersAndDelimiters(typeParameters: TypeParameter[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildReturnTypeDisplay(signature: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
    }
    interface SymbolWriter {
        writeKeyword(text: string): void;
        writeOperator(text: string): void;
        writePunctuation(text: string): void;
        writeSpace(text: string): void;
        writeStringLiteral(text: string): void;
        writeParameter(text: string): void;
        writeProperty(text: string): void;
        writeSymbol(text: string, symbol: Symbol): void;
        writeLine(): void;
        increaseIndent(): void;
        decreaseIndent(): void;
        clear(): void;
        trackSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags): void;
        reportInaccessibleThisError(): void;
        reportPrivateInBaseOfClassExpression(propertyName: string): void;
    }
    const enum TypeFormatFlags {
        None = 0,
        WriteArrayAsGenericType = 1,
        UseTypeOfFunction = 4,
        NoTruncation = 8,
        WriteArrowStyleSignature = 16,
        WriteOwnNameForAnyLike = 32,
        WriteTypeArgumentsOfSignature = 64,
        InElementType = 128,
        UseFullyQualifiedType = 256,
        InFirstTypeArgument = 512,
        InTypeAlias = 1024,
        UseTypeAliasValue = 2048,
        SuppressAnyReturnType = 4096,
        AddUndefined = 8192,
        WriteClassExpressionAsTypeLiteral = 16384,
    }
    const enum SymbolFormatFlags {
        None = 0,
        WriteTypeParametersOrArguments = 1,
        UseOnlyExternalAliasing = 2,
    }
    const enum SymbolAccessibility {
        Accessible = 0,
        NotAccessible = 1,
        CannotBeNamed = 2,
    }
    const enum SyntheticSymbolKind {
        UnionOrIntersection = 0,
        Spread = 1,
    }
    const enum TypePredicateKind {
        This = 0,
        Identifier = 1,
    }
    interface TypePredicateBase {
        kind: TypePredicateKind;
        type: Type;
    }
    interface ThisTypePredicate extends TypePredicateBase {
        kind: TypePredicateKind.This;
    }
    interface IdentifierTypePredicate extends TypePredicateBase {
        kind: TypePredicateKind.Identifier;
        parameterName: string;
        parameterIndex: number;
    }
    type TypePredicate = IdentifierTypePredicate | ThisTypePredicate;
    type AnyImportSyntax = ImportDeclaration | ImportEqualsDeclaration;
    interface SymbolVisibilityResult {
        accessibility: SymbolAccessibility;
        aliasesToMakeVisible?: AnyImportSyntax[];
        errorSymbolName?: string;
        errorNode?: Node;
    }
    interface SymbolAccessibilityResult extends SymbolVisibilityResult {
        errorModuleName?: string;
    }
    enum TypeReferenceSerializationKind {
        Unknown = 0,
        TypeWithConstructSignatureAndValue = 1,
        VoidNullableOrNeverType = 2,
        NumberLikeType = 3,
        StringLikeType = 4,
        BooleanType = 5,
        ArrayLikeType = 6,
        ESSymbolType = 7,
        Promise = 8,
        TypeWithCallSignature = 9,
        ObjectType = 10,
    }
    interface EmitResolver {
        hasGlobalName(name: string): boolean;
        getReferencedExportContainer(node: Identifier, prefixLocals?: boolean): SourceFile | ModuleDeclaration | EnumDeclaration;
        getReferencedImportDeclaration(node: Identifier): Declaration;
        getReferencedDeclarationWithCollidingName(node: Identifier): Declaration;
        isDeclarationWithCollidingName(node: Declaration): boolean;
        isValueAliasDeclaration(node: Node): boolean;
        isReferencedAliasDeclaration(node: Node, checkChildren?: boolean): boolean;
        isTopLevelValueImportEqualsWithEntityName(node: ImportEqualsDeclaration): boolean;
        getNodeCheckFlags(node: Node): NodeCheckFlags;
        isDeclarationVisible(node: Declaration): boolean;
        collectLinkedAliases(node: Identifier): Node[];
        isImplementationOfOverload(node: FunctionLikeDeclaration): boolean | undefined;
        isRequiredInitializedParameter(node: ParameterDeclaration): boolean;
        writeTypeOfDeclaration(declaration: AccessorDeclaration | VariableLikeDeclaration, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter): void;
        writeReturnTypeOfSignatureDeclaration(signatureDeclaration: SignatureDeclaration, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter): void;
        writeTypeOfExpression(expr: Expression, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter): void;
        isSymbolAccessible(symbol: Symbol, enclosingDeclaration: Node, meaning: SymbolFlags, shouldComputeAliasToMarkVisible: boolean): SymbolAccessibilityResult;
        isEntityNameVisible(entityName: EntityNameOrEntityNameExpression, enclosingDeclaration: Node): SymbolVisibilityResult;
        getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): string | number;
        getReferencedValueDeclaration(reference: Identifier): Declaration;
        getTypeReferenceSerializationKind(typeName: EntityName, location?: Node): TypeReferenceSerializationKind;
        isOptionalParameter(node: ParameterDeclaration): boolean;
        moduleExportsSomeValue(moduleReferenceExpression: Expression): boolean;
        isArgumentsLocalBinding(node: Identifier): boolean;
        getExternalModuleFileFromDeclaration(declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration): SourceFile;
        getTypeReferenceDirectivesForEntityName(name: EntityNameOrEntityNameExpression): string[];
        getTypeReferenceDirectivesForSymbol(symbol: Symbol, meaning?: SymbolFlags): string[];
        isLiteralConstDeclaration(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration): boolean;
        writeLiteralConstValue(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration, writer: SymbolWriter): void;
        getJsxFactoryEntity(): EntityName;
    }
    const enum SymbolFlags {
        None = 0,
        FunctionScopedVariable = 1,
        BlockScopedVariable = 2,
        Property = 4,
        EnumMember = 8,
        Function = 16,
        Class = 32,
        Interface = 64,
        ConstEnum = 128,
        RegularEnum = 256,
        ValueModule = 512,
        NamespaceModule = 1024,
        TypeLiteral = 2048,
        ObjectLiteral = 4096,
        Method = 8192,
        Constructor = 16384,
        GetAccessor = 32768,
        SetAccessor = 65536,
        Signature = 131072,
        TypeParameter = 262144,
        TypeAlias = 524288,
        ExportValue = 1048576,
        ExportType = 2097152,
        ExportNamespace = 4194304,
        Alias = 8388608,
        Prototype = 16777216,
        ExportStar = 33554432,
        Optional = 67108864,
        Transient = 134217728,
        Enum = 384,
        Variable = 3,
        Value = 107455,
        Type = 793064,
        Namespace = 1920,
        Module = 1536,
        Accessor = 98304,
        FunctionScopedVariableExcludes = 107454,
        BlockScopedVariableExcludes = 107455,
        ParameterExcludes = 107455,
        PropertyExcludes = 0,
        EnumMemberExcludes = 900095,
        FunctionExcludes = 106927,
        ClassExcludes = 899519,
        InterfaceExcludes = 792968,
        RegularEnumExcludes = 899327,
        ConstEnumExcludes = 899967,
        ValueModuleExcludes = 106639,
        NamespaceModuleExcludes = 0,
        MethodExcludes = 99263,
        GetAccessorExcludes = 41919,
        SetAccessorExcludes = 74687,
        TypeParameterExcludes = 530920,
        TypeAliasExcludes = 793064,
        AliasExcludes = 8388608,
        ModuleMember = 8914931,
        ExportHasLocal = 944,
        HasExports = 1952,
        HasMembers = 6240,
        BlockScoped = 418,
        PropertyOrAccessor = 98308,
        Export = 7340032,
        ClassMember = 106500,
        Classifiable = 788448,
    }
    interface Symbol {
        flags: SymbolFlags;
        name: string;
        declarations?: Declaration[];
        valueDeclaration?: Declaration;
        members?: SymbolTable;
        exports?: SymbolTable;
        globalExports?: SymbolTable;
        id?: number;
        mergeId?: number;
        parent?: Symbol;
        exportSymbol?: Symbol;
        constEnumOnlyModule?: boolean;
        isReferenced?: boolean;
        isReplaceableByMethod?: boolean;
        isAssigned?: boolean;
    }
    interface SymbolLinks {
        immediateTarget?: Symbol;
        target?: Symbol;
        type?: Type;
        declaredType?: Type;
        typeParameters?: TypeParameter[];
        inferredClassType?: Type;
        instantiations?: Map<Type>;
        mapper?: TypeMapper;
        referenced?: boolean;
        containingType?: UnionOrIntersectionType;
        leftSpread?: Symbol;
        rightSpread?: Symbol;
        syntheticOrigin?: Symbol;
        isDiscriminantProperty?: boolean;
        resolvedExports?: SymbolTable;
        exportsChecked?: boolean;
        typeParametersChecked?: boolean;
        isDeclarationWithCollidingName?: boolean;
        bindingElement?: BindingElement;
        exportsSomeValue?: boolean;
        enumKind?: EnumKind;
    }
    const enum EnumKind {
        Numeric = 0,
        Literal = 1,
    }
    const enum CheckFlags {
        Instantiated = 1,
        SyntheticProperty = 2,
        SyntheticMethod = 4,
        Readonly = 8,
        Partial = 16,
        HasNonUniformType = 32,
        ContainsPublic = 64,
        ContainsProtected = 128,
        ContainsPrivate = 256,
        ContainsStatic = 512,
        Synthetic = 6,
    }
    interface TransientSymbol extends Symbol, SymbolLinks {
        checkFlags: CheckFlags;
        isRestParameter?: boolean;
    }
    type SymbolTable = Map<Symbol>;
    interface Pattern {
        prefix: string;
        suffix: string;
    }
    interface PatternAmbientModule {
        pattern: Pattern;
        symbol: Symbol;
    }
    const enum NodeCheckFlags {
        TypeChecked = 1,
        LexicalThis = 2,
        CaptureThis = 4,
        CaptureNewTarget = 8,
        SuperInstance = 256,
        SuperStatic = 512,
        ContextChecked = 1024,
        AsyncMethodWithSuper = 2048,
        AsyncMethodWithSuperBinding = 4096,
        CaptureArguments = 8192,
        EnumValuesComputed = 16384,
        LexicalModuleMergesWithClass = 32768,
        LoopWithCapturedBlockScopedBinding = 65536,
        CapturedBlockScopedBinding = 131072,
        BlockScopedBindingInLoop = 262144,
        ClassWithBodyScopedClassBinding = 524288,
        BodyScopedClassBinding = 1048576,
        NeedsLoopOutParameter = 2097152,
        AssignmentsMarked = 4194304,
        ClassWithConstructorReference = 8388608,
        ConstructorReferenceInClass = 16777216,
    }
    interface NodeLinks {
        flags?: NodeCheckFlags;
        resolvedType?: Type;
        resolvedSignature?: Signature;
        resolvedSymbol?: Symbol;
        resolvedIndexInfo?: IndexInfo;
        maybeTypePredicate?: boolean;
        enumMemberValue?: string | number;
        isVisible?: boolean;
        containsArgumentsReference?: boolean;
        hasReportedStatementInAmbientContext?: boolean;
        jsxFlags?: JsxFlags;
        resolvedJsxElementAttributesType?: Type;
        hasSuperCall?: boolean;
        superCall?: ExpressionStatement;
        switchTypes?: Type[];
    }
    const enum TypeFlags {
        Any = 1,
        String = 2,
        Number = 4,
        Boolean = 8,
        Enum = 16,
        StringLiteral = 32,
        NumberLiteral = 64,
        BooleanLiteral = 128,
        EnumLiteral = 256,
        ESSymbol = 512,
        Void = 1024,
        Undefined = 2048,
        Null = 4096,
        Never = 8192,
        TypeParameter = 16384,
        Object = 32768,
        Union = 65536,
        Intersection = 131072,
        Index = 262144,
        IndexedAccess = 524288,
        FreshLiteral = 1048576,
        ContainsWideningType = 2097152,
        ContainsObjectLiteral = 4194304,
        ContainsAnyFunctionType = 8388608,
        NonPrimitive = 16777216,
        JsxAttributes = 33554432,
        Nullable = 6144,
        Literal = 224,
        StringOrNumberLiteral = 96,
        DefinitelyFalsy = 7392,
        PossiblyFalsy = 7406,
        Intrinsic = 16793231,
        Primitive = 8190,
        StringLike = 262178,
        NumberLike = 84,
        BooleanLike = 136,
        EnumLike = 272,
        UnionOrIntersection = 196608,
        StructuredType = 229376,
        StructuredOrTypeVariable = 1032192,
        TypeVariable = 540672,
        Narrowable = 17810175,
        NotUnionOrUnit = 16810497,
        RequiresWidening = 6291456,
        PropagatingFlags = 14680064,
    }
    type DestructuringPattern = BindingPattern | ObjectLiteralExpression | ArrayLiteralExpression;
    interface Type {
        flags: TypeFlags;
        id: number;
        checker: TypeChecker;
        symbol?: Symbol;
        pattern?: DestructuringPattern;
        aliasSymbol?: Symbol;
        aliasTypeArguments?: Type[];
    }
    interface IntrinsicType extends Type {
        intrinsicName: string;
    }
    interface LiteralType extends Type {
        value: string | number;
        freshType?: LiteralType;
        regularType?: LiteralType;
    }
    interface StringLiteralType extends LiteralType {
        value: string;
    }
    interface NumberLiteralType extends LiteralType {
        value: number;
    }
    interface EnumType extends Type {
    }
    const enum ObjectFlags {
        Class = 1,
        Interface = 2,
        Reference = 4,
        Tuple = 8,
        Anonymous = 16,
        Mapped = 32,
        Instantiated = 64,
        ObjectLiteral = 128,
        EvolvingArray = 256,
        ObjectLiteralPatternWithComputedProperties = 512,
        ClassOrInterface = 3,
    }
    interface ObjectType extends Type {
        objectFlags: ObjectFlags;
    }
    interface InterfaceType extends ObjectType {
        typeParameters: TypeParameter[];
        outerTypeParameters: TypeParameter[];
        localTypeParameters: TypeParameter[];
        thisType: TypeParameter;
        resolvedBaseConstructorType?: Type;
        resolvedBaseTypes: BaseType[];
    }
    type BaseType = ObjectType | IntersectionType;
    interface InterfaceTypeWithDeclaredMembers extends InterfaceType {
        declaredProperties: Symbol[];
        declaredCallSignatures: Signature[];
        declaredConstructSignatures: Signature[];
        declaredStringIndexInfo: IndexInfo;
        declaredNumberIndexInfo: IndexInfo;
    }
    interface TypeReference extends ObjectType {
        target: GenericType;
        typeArguments?: Type[];
    }
    interface GenericType extends InterfaceType, TypeReference {
        instantiations: Map<TypeReference>;
    }
    interface UnionOrIntersectionType extends Type {
        types: Type[];
        propertyCache: SymbolTable;
        resolvedProperties: Symbol[];
        resolvedIndexType: IndexType;
        resolvedBaseConstraint: Type;
        couldContainTypeVariables: boolean;
    }
    interface UnionType extends UnionOrIntersectionType {
    }
    interface IntersectionType extends UnionOrIntersectionType {
        resolvedApparentType: Type;
    }
    type StructuredType = ObjectType | UnionType | IntersectionType;
    interface AnonymousType extends ObjectType {
        target?: AnonymousType;
        mapper?: TypeMapper;
    }
    interface MappedType extends ObjectType {
        declaration: MappedTypeNode;
        typeParameter?: TypeParameter;
        constraintType?: Type;
        templateType?: Type;
        modifiersType?: Type;
        mapper?: TypeMapper;
    }
    interface EvolvingArrayType extends ObjectType {
        elementType: Type;
        finalArrayType?: Type;
    }
    interface ResolvedType extends ObjectType, UnionOrIntersectionType {
        members: SymbolTable;
        properties: Symbol[];
        callSignatures: Signature[];
        constructSignatures: Signature[];
        stringIndexInfo?: IndexInfo;
        numberIndexInfo?: IndexInfo;
    }
    interface FreshObjectLiteralType extends ResolvedType {
        regularType: ResolvedType;
    }
    interface IterableOrIteratorType extends ObjectType, UnionType {
        iteratedTypeOfIterable?: Type;
        iteratedTypeOfIterator?: Type;
        iteratedTypeOfAsyncIterable?: Type;
        iteratedTypeOfAsyncIterator?: Type;
    }
    interface PromiseOrAwaitableType extends ObjectType, UnionType {
        promiseTypeOfPromiseConstructor?: Type;
        promisedTypeOfPromise?: Type;
        awaitedTypeOfType?: Type;
    }
    interface TypeVariable extends Type {
        resolvedBaseConstraint: Type;
        resolvedIndexType: IndexType;
    }
    interface TypeParameter extends TypeVariable {
        constraint: Type;
        default?: Type;
        target?: TypeParameter;
        mapper?: TypeMapper;
        isThisType?: boolean;
        resolvedDefaultType?: Type;
    }
    interface IndexedAccessType extends TypeVariable {
        objectType: Type;
        indexType: Type;
        constraint?: Type;
    }
    interface IndexType extends Type {
        type: TypeVariable | UnionOrIntersectionType;
    }
    const enum SignatureKind {
        Call = 0,
        Construct = 1,
    }
    interface Signature {
        declaration: SignatureDeclaration;
        typeParameters?: TypeParameter[];
        parameters: Symbol[];
        thisParameter?: Symbol;
        resolvedReturnType: Type;
        minArgumentCount: number;
        hasRestParameter: boolean;
        hasLiteralTypes: boolean;
        target?: Signature;
        mapper?: TypeMapper;
        unionSignatures?: Signature[];
        erasedSignatureCache?: Signature;
        isolatedSignatureType?: ObjectType;
        typePredicate?: TypePredicate;
        instantiations?: Map<Signature>;
    }
    const enum IndexKind {
        String = 0,
        Number = 1,
    }
    interface IndexInfo {
        type: Type;
        isReadonly: boolean;
        declaration?: SignatureDeclaration;
    }
    interface TypeMapper {
        (t: TypeParameter): Type;
        mappedTypes?: Type[];
        instantiations?: Type[];
    }
    const enum InferencePriority {
        NakedTypeVariable = 1,
        MappedType = 2,
        ReturnType = 4,
    }
    interface InferenceInfo {
        typeParameter: TypeParameter;
        candidates: Type[];
        inferredType: Type;
        priority: InferencePriority;
        topLevel: boolean;
        isFixed: boolean;
    }
    const enum InferenceFlags {
        InferUnionTypes = 1,
        NoDefault = 2,
        AnyDefault = 4,
    }
    interface InferenceContext extends TypeMapper {
        signature: Signature;
        inferences: InferenceInfo[];
        flags: InferenceFlags;
        failedTypeParameterIndex?: number;
    }
    const enum SpecialPropertyAssignmentKind {
        None = 0,
        ExportsProperty = 1,
        ModuleExports = 2,
        PrototypeProperty = 3,
        ThisProperty = 4,
        Property = 5,
    }
    interface JsFileExtensionInfo {
        extension: string;
        isMixedContent: boolean;
    }
    interface DiagnosticMessage {
        key: string;
        category: DiagnosticCategory;
        code: number;
        message: string;
    }
    interface DiagnosticMessageChain {
        messageText: string;
        category: DiagnosticCategory;
        code: number;
        next?: DiagnosticMessageChain;
    }
    interface Diagnostic {
        file: SourceFile | undefined;
        start: number | undefined;
        length: number | undefined;
        messageText: string | DiagnosticMessageChain;
        category: DiagnosticCategory;
        code: number;
        source?: string;
    }
    enum DiagnosticCategory {
        Warning = 0,
        Error = 1,
        Message = 2,
    }
    enum ModuleResolutionKind {
        Classic = 1,
        NodeJs = 2,
    }
    interface PluginImport {
        name: string;
    }
    type CompilerOptionsValue = string | number | boolean | (string | number)[] | string[] | MapLike<string[]> | PluginImport[];
    interface CompilerOptions {
        all?: boolean;
        allowJs?: boolean;
        allowNonTsExtensions?: boolean;
        allowSyntheticDefaultImports?: boolean;
        allowUnreachableCode?: boolean;
        allowUnusedLabels?: boolean;
        alwaysStrict?: boolean;
        baseUrl?: string;
        charset?: string;
        checkJs?: boolean;
        configFilePath?: string;
        declaration?: boolean;
        declarationDir?: string;
        diagnostics?: boolean;
        extendedDiagnostics?: boolean;
        disableSizeLimit?: boolean;
        downlevelIteration?: boolean;
        emitBOM?: boolean;
        emitDecoratorMetadata?: boolean;
        experimentalDecorators?: boolean;
        forceConsistentCasingInFileNames?: boolean;
        help?: boolean;
        importHelpers?: boolean;
        init?: boolean;
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
        isolatedModules?: boolean;
        jsx?: JsxEmit;
        lib?: string[];
        listEmittedFiles?: boolean;
        listFiles?: boolean;
        locale?: string;
        mapRoot?: string;
        maxNodeModuleJsDepth?: number;
        module?: ModuleKind;
        moduleResolution?: ModuleResolutionKind;
        newLine?: NewLineKind;
        noEmit?: boolean;
        noEmitForJsFiles?: boolean;
        noEmitHelpers?: boolean;
        noEmitOnError?: boolean;
        noErrorTruncation?: boolean;
        noFallthroughCasesInSwitch?: boolean;
        noImplicitAny?: boolean;
        noImplicitReturns?: boolean;
        noImplicitThis?: boolean;
        noUnusedLocals?: boolean;
        noUnusedParameters?: boolean;
        noImplicitUseStrict?: boolean;
        noLib?: boolean;
        noResolve?: boolean;
        out?: string;
        outDir?: string;
        outFile?: string;
        paths?: MapLike<string[]>;
        plugins?: PluginImport[];
        preserveConstEnums?: boolean;
        project?: string;
        pretty?: DiagnosticStyle;
        reactNamespace?: string;
        jsxFactory?: string;
        removeComments?: boolean;
        rootDir?: string;
        rootDirs?: string[];
        skipLibCheck?: boolean;
        skipDefaultLibCheck?: boolean;
        sourceMap?: boolean;
        sourceRoot?: string;
        strict?: boolean;
        strictNullChecks?: boolean;
        stripInternal?: boolean;
        suppressExcessPropertyErrors?: boolean;
        suppressImplicitAnyIndexErrors?: boolean;
        suppressOutputPathCheck?: boolean;
        target?: ScriptTarget;
        traceResolution?: boolean;
        types?: string[];
        typeRoots?: string[];
        version?: boolean;
        watch?: boolean;
        [option: string]: CompilerOptionsValue | undefined;
    }
    interface TypeAcquisition {
        enableAutoDiscovery?: boolean;
        enable?: boolean;
        include?: string[];
        exclude?: string[];
        [option: string]: string[] | boolean | undefined;
    }
    interface DiscoverTypingsInfo {
        fileNames: string[];
        projectRootPath: string;
        safeListPath: string;
        packageNameToTypingLocation: Map<string>;
        typeAcquisition: TypeAcquisition;
        compilerOptions: CompilerOptions;
        unresolvedImports: ReadonlyArray<string>;
    }
    enum ModuleKind {
        None = 0,
        CommonJS = 1,
        AMD = 2,
        UMD = 3,
        System = 4,
        ES2015 = 5,
        ESNext = 6,
    }
    const enum JsxEmit {
        None = 0,
        Preserve = 1,
        React = 2,
        ReactNative = 3,
    }
    const enum NewLineKind {
        CarriageReturnLineFeed = 0,
        LineFeed = 1,
    }
    interface LineAndCharacter {
        line: number;
        character: number;
    }
    const enum ScriptKind {
        Unknown = 0,
        JS = 1,
        JSX = 2,
        TS = 3,
        TSX = 4,
        External = 5,
    }
    const enum ScriptTarget {
        ES3 = 0,
        ES5 = 1,
        ES2015 = 2,
        ES2016 = 3,
        ES2017 = 4,
        ESNext = 5,
        Latest = 5,
    }
    const enum LanguageVariant {
        Standard = 0,
        JSX = 1,
    }
    const enum DiagnosticStyle {
        Simple = 0,
        Pretty = 1,
    }
    interface ParsedCommandLine {
        options: CompilerOptions;
        typeAcquisition?: TypeAcquisition;
        fileNames: string[];
        raw?: any;
        errors: Diagnostic[];
        wildcardDirectories?: MapLike<WatchDirectoryFlags>;
        compileOnSave?: boolean;
    }
    const enum WatchDirectoryFlags {
        None = 0,
        Recursive = 1,
    }
    interface ExpandResult {
        fileNames: string[];
        wildcardDirectories: MapLike<WatchDirectoryFlags>;
    }
    interface CommandLineOptionBase {
        name: string;
        type: "string" | "number" | "boolean" | "object" | "list" | Map<number | string>;
        isFilePath?: boolean;
        shortName?: string;
        description?: DiagnosticMessage;
        paramType?: DiagnosticMessage;
        isTSConfigOnly?: boolean;
        isCommandLineOnly?: boolean;
        showInSimplifiedHelpView?: boolean;
        category?: DiagnosticMessage;
    }
    interface CommandLineOptionOfPrimitiveType extends CommandLineOptionBase {
        type: "string" | "number" | "boolean";
    }
    interface CommandLineOptionOfCustomType extends CommandLineOptionBase {
        type: Map<number | string>;
    }
    interface TsConfigOnlyOption extends CommandLineOptionBase {
        type: "object";
    }
    interface CommandLineOptionOfListType extends CommandLineOptionBase {
        type: "list";
        element: CommandLineOptionOfCustomType | CommandLineOptionOfPrimitiveType | TsConfigOnlyOption;
    }
    type CommandLineOption = CommandLineOptionOfCustomType | CommandLineOptionOfPrimitiveType | TsConfigOnlyOption | CommandLineOptionOfListType;
    const enum CharacterCodes {
        nullCharacter = 0,
        maxAsciiCharacter = 127,
        lineFeed = 10,
        carriageReturn = 13,
        lineSeparator = 8232,
        paragraphSeparator = 8233,
        nextLine = 133,
        space = 32,
        nonBreakingSpace = 160,
        enQuad = 8192,
        emQuad = 8193,
        enSpace = 8194,
        emSpace = 8195,
        threePerEmSpace = 8196,
        fourPerEmSpace = 8197,
        sixPerEmSpace = 8198,
        figureSpace = 8199,
        punctuationSpace = 8200,
        thinSpace = 8201,
        hairSpace = 8202,
        zeroWidthSpace = 8203,
        narrowNoBreakSpace = 8239,
        ideographicSpace = 12288,
        mathematicalSpace = 8287,
        ogham = 5760,
        _ = 95,
        $ = 36,
        _0 = 48,
        _1 = 49,
        _2 = 50,
        _3 = 51,
        _4 = 52,
        _5 = 53,
        _6 = 54,
        _7 = 55,
        _8 = 56,
        _9 = 57,
        a = 97,
        b = 98,
        c = 99,
        d = 100,
        e = 101,
        f = 102,
        g = 103,
        h = 104,
        i = 105,
        j = 106,
        k = 107,
        l = 108,
        m = 109,
        n = 110,
        o = 111,
        p = 112,
        q = 113,
        r = 114,
        s = 115,
        t = 116,
        u = 117,
        v = 118,
        w = 119,
        x = 120,
        y = 121,
        z = 122,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        ampersand = 38,
        asterisk = 42,
        at = 64,
        backslash = 92,
        backtick = 96,
        bar = 124,
        caret = 94,
        closeBrace = 125,
        closeBracket = 93,
        closeParen = 41,
        colon = 58,
        comma = 44,
        dot = 46,
        doubleQuote = 34,
        equals = 61,
        exclamation = 33,
        greaterThan = 62,
        hash = 35,
        lessThan = 60,
        minus = 45,
        openBrace = 123,
        openBracket = 91,
        openParen = 40,
        percent = 37,
        plus = 43,
        question = 63,
        semicolon = 59,
        singleQuote = 39,
        slash = 47,
        tilde = 126,
        backspace = 8,
        formFeed = 12,
        byteOrderMark = 65279,
        tab = 9,
        verticalTab = 11,
    }
    interface ModuleResolutionHost {
        fileExists(fileName: string): boolean;
        readFile(fileName: string): string;
        trace?(s: string): void;
        directoryExists?(directoryName: string): boolean;
        realpath?(path: string): string;
        getCurrentDirectory?(): string;
        getDirectories?(path: string): string[];
    }
    interface ResolvedModule {
        resolvedFileName: string;
        isExternalLibraryImport?: boolean;
    }
    interface ResolvedModuleFull extends ResolvedModule {
        extension: Extension;
    }
    const enum Extension {
        Ts = ".ts",
        Tsx = ".tsx",
        Dts = ".d.ts",
        Js = ".js",
        Jsx = ".jsx",
    }
    interface ResolvedModuleWithFailedLookupLocations {
        resolvedModule: ResolvedModuleFull | undefined;
        failedLookupLocations: string[];
    }
    interface ResolvedTypeReferenceDirective {
        primary: boolean;
        resolvedFileName?: string;
    }
    interface ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
        resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective;
        failedLookupLocations: string[];
    }
    interface CompilerHost extends ModuleResolutionHost {
        getSourceFile(fileName: string, languageVersion: ScriptTarget, onError?: (message: string) => void): SourceFile;
        getSourceFileByPath?(fileName: string, path: Path, languageVersion: ScriptTarget, onError?: (message: string) => void): SourceFile;
        getCancellationToken?(): CancellationToken;
        getDefaultLibFileName(options: CompilerOptions): string;
        getDefaultLibLocation?(): string;
        writeFile: WriteFileCallback;
        getCurrentDirectory(): string;
        getDirectories(path: string): string[];
        getCanonicalFileName(fileName: string): string;
        useCaseSensitiveFileNames(): boolean;
        getNewLine(): string;
        resolveModuleNames?(moduleNames: string[], containingFile: string): ResolvedModule[];
        resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[];
        getEnvironmentVariable?(name: string): string;
    }
    const enum TransformFlags {
        None = 0,
        TypeScript = 1,
        ContainsTypeScript = 2,
        ContainsJsx = 4,
        ContainsESNext = 8,
        ContainsES2017 = 16,
        ContainsES2016 = 32,
        ES2015 = 64,
        ContainsES2015 = 128,
        Generator = 256,
        ContainsGenerator = 512,
        DestructuringAssignment = 1024,
        ContainsDestructuringAssignment = 2048,
        ContainsDecorators = 4096,
        ContainsPropertyInitializer = 8192,
        ContainsLexicalThis = 16384,
        ContainsCapturedLexicalThis = 32768,
        ContainsLexicalThisInComputedPropertyName = 65536,
        ContainsDefaultValueAssignments = 131072,
        ContainsParameterPropertyAssignments = 262144,
        ContainsSpread = 524288,
        ContainsObjectSpread = 1048576,
        ContainsRest = 524288,
        ContainsObjectRest = 1048576,
        ContainsComputedPropertyName = 2097152,
        ContainsBlockScopedBinding = 4194304,
        ContainsBindingPattern = 8388608,
        ContainsYield = 16777216,
        ContainsHoistedDeclarationOrCompletion = 33554432,
        ContainsDynamicImport = 67108864,
        HasComputedFlags = 536870912,
        AssertTypeScript = 3,
        AssertJsx = 4,
        AssertESNext = 8,
        AssertES2017 = 16,
        AssertES2016 = 32,
        AssertES2015 = 192,
        AssertGenerator = 768,
        AssertDestructuringAssignment = 3072,
        NodeExcludes = 536872257,
        ArrowFunctionExcludes = 601249089,
        FunctionExcludes = 601281857,
        ConstructorExcludes = 601015617,
        MethodOrAccessorExcludes = 601015617,
        ClassExcludes = 539358529,
        ModuleExcludes = 574674241,
        TypeExcludes = -3,
        ObjectLiteralExcludes = 540087617,
        ArrayLiteralOrCallOrNewExcludes = 537396545,
        VariableDeclarationListExcludes = 546309441,
        ParameterExcludes = 536872257,
        CatchClauseExcludes = 537920833,
        BindingPatternExcludes = 537396545,
        TypeScriptClassSyntaxMask = 274432,
        ES2015FunctionSyntaxMask = 163840,
    }
    interface SourceMapRange extends TextRange {
        source?: SourceMapSource;
    }
    interface SourceMapSource {
        fileName: string;
        text: string;
        lineMap: number[];
        skipTrivia?: (pos: number) => number;
    }
    interface EmitNode {
        annotatedNodes?: Node[];
        flags?: EmitFlags;
        leadingComments?: SynthesizedComment[];
        trailingComments?: SynthesizedComment[];
        commentRange?: TextRange;
        sourceMapRange?: SourceMapRange;
        tokenSourceMapRanges?: SourceMapRange[];
        constantValue?: string | number;
        externalHelpersModuleName?: Identifier;
        helpers?: EmitHelper[];
    }
    const enum EmitFlags {
        SingleLine = 1,
        AdviseOnEmitNode = 2,
        NoSubstitution = 4,
        CapturesThis = 8,
        NoLeadingSourceMap = 16,
        NoTrailingSourceMap = 32,
        NoSourceMap = 48,
        NoNestedSourceMaps = 64,
        NoTokenLeadingSourceMaps = 128,
        NoTokenTrailingSourceMaps = 256,
        NoTokenSourceMaps = 384,
        NoLeadingComments = 512,
        NoTrailingComments = 1024,
        NoComments = 1536,
        NoNestedComments = 2048,
        HelperName = 4096,
        ExportName = 8192,
        LocalName = 16384,
        InternalName = 32768,
        Indented = 65536,
        NoIndentation = 131072,
        AsyncFunctionBody = 262144,
        ReuseTempVariableScope = 524288,
        CustomPrologue = 1048576,
        NoHoisting = 2097152,
        HasEndOfDeclarationMarker = 4194304,
        Iterator = 8388608,
        NoAsciiEscaping = 16777216,
    }
    interface EmitHelper {
        readonly name: string;
        readonly scoped: boolean;
        readonly text: string;
        readonly priority?: number;
    }
    const enum ExternalEmitHelpers {
        Extends = 1,
        Assign = 2,
        Rest = 4,
        Decorate = 8,
        Metadata = 16,
        Param = 32,
        Awaiter = 64,
        Generator = 128,
        Values = 256,
        Read = 512,
        Spread = 1024,
        Await = 2048,
        AsyncGenerator = 4096,
        AsyncDelegator = 8192,
        AsyncValues = 16384,
        ExportStar = 32768,
        ForOfIncludes = 256,
        ForAwaitOfIncludes = 16384,
        AsyncGeneratorIncludes = 6144,
        AsyncDelegatorIncludes = 26624,
        SpreadIncludes = 1536,
        FirstEmitHelper = 1,
        LastEmitHelper = 32768,
    }
    const enum EmitHint {
        SourceFile = 0,
        Expression = 1,
        IdentifierName = 2,
        Unspecified = 3,
    }
    interface EmitHost extends ScriptReferenceHost {
        getSourceFiles(): SourceFile[];
        isSourceFileFromExternalLibrary(file: SourceFile): boolean;
        getCommonSourceDirectory(): string;
        getCanonicalFileName(fileName: string): string;
        getNewLine(): string;
        isEmitBlocked(emitFileName: string): boolean;
        writeFile: WriteFileCallback;
    }
    interface TransformationContext {
        getEmitResolver(): EmitResolver;
        getEmitHost(): EmitHost;
        getCompilerOptions(): CompilerOptions;
        startLexicalEnvironment(): void;
        suspendLexicalEnvironment(): void;
        resumeLexicalEnvironment(): void;
        endLexicalEnvironment(): Statement[];
        hoistFunctionDeclaration(node: FunctionDeclaration): void;
        hoistVariableDeclaration(node: Identifier): void;
        requestEmitHelper(helper: EmitHelper): void;
        readEmitHelpers(): EmitHelper[] | undefined;
        enableSubstitution(kind: SyntaxKind): void;
        isSubstitutionEnabled(node: Node): boolean;
        onSubstituteNode: (hint: EmitHint, node: Node) => Node;
        enableEmitNotification(kind: SyntaxKind): void;
        isEmitNotificationEnabled(node: Node): boolean;
        onEmitNode: (hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) => void;
    }
    interface TransformationResult<T extends Node> {
        transformed: T[];
        diagnostics?: Diagnostic[];
        substituteNode(hint: EmitHint, node: Node): Node;
        emitNodeWithNotification(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;
        dispose(): void;
    }
    type TransformerFactory<T extends Node> = (context: TransformationContext) => Transformer<T>;
    type Transformer<T extends Node> = (node: T) => T;
    type Visitor = (node: Node) => VisitResult<Node>;
    type VisitResult<T extends Node> = T | T[];
    interface Printer {
        printNode(hint: EmitHint, node: Node, sourceFile: SourceFile): string;
        printFile(sourceFile: SourceFile): string;
        printBundle(bundle: Bundle): string;
        writeNode(hint: EmitHint, node: Node, sourceFile: SourceFile | undefined, writer: EmitTextWriter): void;
        writeFile(sourceFile: SourceFile, writer: EmitTextWriter): void;
        writeBundle(bundle: Bundle, writer: EmitTextWriter): void;
    }
    interface PrintHandlers {
        hasGlobalName?(name: string): boolean;
        onEmitNode?(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;
        substituteNode?(hint: EmitHint, node: Node): Node;
        onEmitSourceMapOfNode?: (hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) => void;
        onEmitSourceMapOfToken?: (node: Node, token: SyntaxKind, pos: number, emitCallback: (token: SyntaxKind, pos: number) => number) => number;
        onEmitSourceMapOfPosition?: (pos: number) => void;
        onEmitHelpers?: (node: Node, writeLines: (text: string) => void) => void;
        onSetSourceFile?: (node: SourceFile) => void;
        onBeforeEmitNodeArray?: (nodes: NodeArray<any>) => void;
        onAfterEmitNodeArray?: (nodes: NodeArray<any>) => void;
        onBeforeEmitToken?: (node: Node) => void;
        onAfterEmitToken?: (node: Node) => void;
    }
    interface PrinterOptions {
        removeComments?: boolean;
        newLine?: NewLineKind;
        sourceMap?: boolean;
        inlineSourceMap?: boolean;
        extendedDiagnostics?: boolean;
    }
    interface EmitTextWriter {
        write(s: string): void;
        writeTextOfNode(text: string, node: Node): void;
        writeLine(): void;
        increaseIndent(): void;
        decreaseIndent(): void;
        getText(): string;
        rawWrite(s: string): void;
        writeLiteral(s: string): void;
        getTextPos(): number;
        getLine(): number;
        getColumn(): number;
        getIndent(): number;
        isAtStartOfLine(): boolean;
        reset(): void;
    }
    interface TextSpan {
        start: number;
        length: number;
    }
    interface TextChangeRange {
        span: TextSpan;
        newLength: number;
    }
    interface DiagnosticCollection {
        add(diagnostic: Diagnostic): void;
        getGlobalDiagnostics(): Diagnostic[];
        getDiagnostics(fileName?: string): Diagnostic[];
        getModificationCount(): number;
        reattachFileDiagnostics(newFile: SourceFile): void;
    }
    interface SyntaxList extends Node {
        _children: Node[];
    }
}
declare namespace ts {
    const timestamp: () => number;
}
declare namespace ts.performance {
    function mark(markName: string): void;
    function measure(measureName: string, startMarkName?: string, endMarkName?: string): void;
    function getCount(markName: string): number;
    function getDuration(measureName: string): number;
    function forEachMeasure(cb: (measureName: string, duration: number) => void): void;
    function enable(): void;
    function disable(): void;
}
declare namespace ts {
    const version = "2.4.0";
}
declare namespace ts {
    const enum Ternary {
        False = 0,
        Maybe = 1,
        True = -1,
    }
    const collator: {
        compare(a: string, b: string): number;
    };
    const localeCompareIsCorrect: boolean;
    function createMap<T>(): Map<T>;
    function createMapFromTemplate<T>(template?: MapLike<T>): Map<T>;
    function createFileMap<T>(keyMapper?: (key: string) => string): FileMap<T>;
    function toPath(fileName: string, basePath: string, getCanonicalFileName: (path: string) => string): Path;
    const enum Comparison {
        LessThan = -1,
        EqualTo = 0,
        GreaterThan = 1,
    }
    function length(array: any[]): number;
    function forEach<T, U>(array: T[] | undefined, callback: (element: T, index: number) => U | undefined): U | undefined;
    function findAncestor<T extends Node>(node: Node, callback: (element: Node) => element is T): T | undefined;
    function findAncestor(node: Node, callback: (element: Node) => boolean | "quit"): Node | undefined;
    function zipWith<T, U>(arrayA: T[], arrayB: U[], callback: (a: T, b: U, index: number) => void): void;
    function zipToMap<T>(keys: string[], values: T[]): Map<T>;
    function every<T>(array: T[], callback: (element: T, index: number) => boolean): boolean;
    function find<T>(array: T[], predicate: (element: T, index: number) => boolean): T | undefined;
    function findIndex<T>(array: T[], predicate: (element: T, index: number) => boolean): number;
    function findMap<T, U>(array: T[], callback: (element: T, index: number) => U | undefined): U;
    function contains<T>(array: T[], value: T): boolean;
    function indexOf<T>(array: T[], value: T): number;
    function indexOfAnyCharCode(text: string, charCodes: number[], start?: number): number;
    function countWhere<T>(array: T[], predicate: (x: T, i: number) => boolean): number;
    function filter<T, U extends T>(array: T[], f: (x: T) => x is U): U[];
    function filter<T>(array: T[], f: (x: T) => boolean): T[];
    function removeWhere<T>(array: T[], f: (x: T) => boolean): boolean;
    function filterMutate<T>(array: T[], f: (x: T) => boolean): void;
    function map<T, U>(array: T[], f: (x: T, i: number) => U): U[];
    function sameMap<T>(array: T[], f: (x: T, i: number) => T): T[];
    function flatten<T>(array: (T | T[])[]): T[];
    function flatMap<T, U>(array: T[] | undefined, mapfn: (x: T, i: number) => U | U[] | undefined): U[] | undefined;
    function sameFlatMap<T>(array: T[], mapfn: (x: T, i: number) => T | T[]): T[];
    function mapDefined<T, U>(array: ReadonlyArray<T>, mapFn: (x: T, i: number) => U | undefined): U[];
    function span<T>(array: T[], f: (x: T, i: number) => boolean): [T[], T[]];
    function spanMap<T, K, U>(array: T[], keyfn: (x: T, i: number) => K, mapfn: (chunk: T[], key: K, start: number, end: number) => U): U[];
    function mapEntries<T, U>(map: Map<T>, f: (key: string, value: T) => [string, U]): Map<U>;
    function some<T>(array: T[], predicate?: (value: T) => boolean): boolean;
    function concatenate<T>(array1: T[], array2: T[]): T[];
    function deduplicate<T>(array: T[], areEqual?: (a: T, b: T) => boolean): T[];
    function arrayIsEqualTo<T>(array1: ReadonlyArray<T>, array2: ReadonlyArray<T>, equaler?: (a: T, b: T) => boolean): boolean;
    function changesAffectModuleResolution(oldOptions: CompilerOptions, newOptions: CompilerOptions): boolean;
    function compact<T>(array: T[]): T[];
    function relativeComplement<T>(arrayA: T[] | undefined, arrayB: T[] | undefined, comparer?: (x: T, y: T) => Comparison, offsetA?: number, offsetB?: number): T[] | undefined;
    function sum(array: any[], prop: string): number;
    function append<T>(to: T[] | undefined, value: T | undefined): T[] | undefined;
    function addRange<T>(to: T[] | undefined, from: T[] | undefined, start?: number, end?: number): T[] | undefined;
    function stableSort<T>(array: T[], comparer?: (x: T, y: T) => Comparison): T[];
    function rangeEquals<T>(array1: T[], array2: T[], pos: number, end: number): boolean;
    function elementAt<T>(array: T[] | undefined, offset: number): T | undefined;
    function firstOrUndefined<T>(array: T[]): T | undefined;
    function lastOrUndefined<T>(array: T[]): T | undefined;
    function singleOrUndefined<T>(array: T[]): T | undefined;
    function singleOrMany<T>(array: T[]): T | T[];
    function replaceElement<T>(array: T[], index: number, value: T): T[];
    function binarySearch<T>(array: T[], value: T, comparer?: (v1: T, v2: T) => number, offset?: number): number;
    function reduceLeft<T, U>(array: T[], f: (memo: U, value: T, i: number) => U, initial: U, start?: number, count?: number): U;
    function reduceLeft<T>(array: T[], f: (memo: T, value: T, i: number) => T): T;
    function reduceRight<T, U>(array: T[], f: (memo: U, value: T, i: number) => U, initial: U, start?: number, count?: number): U;
    function reduceRight<T>(array: T[], f: (memo: T, value: T, i: number) => T): T;
    function hasProperty<T>(map: MapLike<T>, key: string): boolean;
    function getProperty<T>(map: MapLike<T>, key: string): T | undefined;
    function getOwnKeys<T>(map: MapLike<T>): string[];
    function arrayFrom<T, U>(iterator: Iterator<T>, map: (t: T) => U): U[];
    function arrayFrom<T>(iterator: Iterator<T>): T[];
    function convertToArray<T, U>(iterator: Iterator<T>, f: (value: T) => U): U[];
    function forEachEntry<T, U>(map: Map<T>, callback: (value: T, key: string) => U | undefined): U | undefined;
    function forEachKey<T>(map: Map<{}>, callback: (key: string) => T | undefined): T | undefined;
    function copyEntries<T>(source: Map<T>, target: Map<T>): void;
    function assign<T1 extends MapLike<{}>, T2, T3>(t: T1, arg1: T2, arg2: T3): T1 & T2 & T3;
    function assign<T1 extends MapLike<{}>, T2>(t: T1, arg1: T2): T1 & T2;
    function assign<T1 extends MapLike<{}>>(t: T1, ...args: any[]): any;
    function equalOwnProperties<T>(left: MapLike<T>, right: MapLike<T>, equalityComparer?: (left: T, right: T) => boolean): boolean;
    function arrayToMap<T>(array: T[], makeKey: (value: T) => string): Map<T>;
    function arrayToMap<T, U>(array: T[], makeKey: (value: T) => string, makeValue: (value: T) => U): Map<U>;
    function cloneMap<T>(map: Map<T>): Map<T>;
    function clone<T>(object: T): T;
    function extend<T1, T2>(first: T1, second: T2): T1 & T2;
    interface MultiMap<T> extends Map<T[]> {
        add(key: string, value: T): T[];
        remove(key: string, value: T): void;
    }
    function createMultiMap<T>(): MultiMap<T>;
    function isArray(value: any): value is any[];
    function tryCast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut | undefined;
    function cast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut;
    function noop(): void;
    function notImplemented(): never;
    function memoize<T>(callback: () => T): () => T;
    function chain<T, U>(...args: ((t: T) => (u: U) => U)[]): (t: T) => (u: U) => U;
    function compose<T>(...args: ((t: T) => T)[]): (t: T) => T;
    function formatStringFromArgs(text: string, args: {
        [index: number]: string;
    }, baseIndex?: number): string;
    let localizedDiagnosticMessages: MapLike<string>;
    function getLocaleSpecificMessage(message: DiagnosticMessage): string;
    function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: (string | number)[]): Diagnostic;
    function formatMessage(_dummy: any, message: DiagnosticMessage): string;
    function createCompilerDiagnostic(message: DiagnosticMessage, ...args: (string | number)[]): Diagnostic;
    function createCompilerDiagnosticFromMessageChain(chain: DiagnosticMessageChain): Diagnostic;
    function chainDiagnosticMessages(details: DiagnosticMessageChain, message: DiagnosticMessage, ...args: any[]): DiagnosticMessageChain;
    function concatenateDiagnosticMessageChains(headChain: DiagnosticMessageChain, tailChain: DiagnosticMessageChain): DiagnosticMessageChain;
    function compareValues<T>(a: T, b: T): Comparison;
    function compareStrings(a: string, b: string, ignoreCase?: boolean): Comparison;
    function compareStringsCaseInsensitive(a: string, b: string): Comparison;
    function compareDiagnostics(d1: Diagnostic, d2: Diagnostic): Comparison;
    function sortAndDeduplicateDiagnostics(diagnostics: Diagnostic[]): Diagnostic[];
    function deduplicateSortedDiagnostics(diagnostics: Diagnostic[]): Diagnostic[];
    function normalizeSlashes(path: string): string;
    function getRootLength(path: string): number;
    const directorySeparator = "/";
    function normalizePath(path: string): string;
    function pathEndsWithDirectorySeparator(path: string): boolean;
    function getDirectoryPath(path: Path): Path;
    function getDirectoryPath(path: string): string;
    function isUrl(path: string): boolean;
    function isExternalModuleNameRelative(moduleName: string): boolean;
    function getEmitScriptTarget(compilerOptions: CompilerOptions): ScriptTarget;
    function getEmitModuleKind(compilerOptions: CompilerOptions): ModuleKind;
    function getEmitModuleResolutionKind(compilerOptions: CompilerOptions): ModuleResolutionKind;
    function hasZeroOrOneAsteriskCharacter(str: string): boolean;
    function isRootedDiskPath(path: string): boolean;
    function convertToRelativePath(absoluteOrRelativePath: string, basePath: string, getCanonicalFileName: (path: string) => string): string;
    function getNormalizedPathComponents(path: string, currentDirectory: string): string[];
    function getNormalizedAbsolutePath(fileName: string, currentDirectory: string): string;
    function getNormalizedPathFromPathComponents(pathComponents: string[]): string;
    function getRelativePathToDirectoryOrUrl(directoryPathOrUrl: string, relativeOrAbsolutePath: string, currentDirectory: string, getCanonicalFileName: (fileName: string) => string, isAbsolutePathAnUrl: boolean): string;
    function getBaseFileName(path: string): string;
    function combinePaths(path1: string, path2: string): string;
    function removeTrailingDirectorySeparator(path: string): string;
    function ensureTrailingDirectorySeparator(path: string): string;
    function comparePaths(a: string, b: string, currentDirectory: string, ignoreCase?: boolean): Comparison;
    function containsPath(parent: string, child: string, currentDirectory: string, ignoreCase?: boolean): boolean;
    function startsWith(str: string, prefix: string): boolean;
    function removePrefix(str: string, prefix: string): string;
    function endsWith(str: string, suffix: string): boolean;
    function hasExtension(fileName: string): boolean;
    function fileExtensionIs(path: string, extension: string): boolean;
    function fileExtensionIsOneOf(path: string, extensions: string[]): boolean;
    function getRegularExpressionForWildcard(specs: string[], basePath: string, usage: "files" | "directories" | "exclude"): string | undefined;
    function isImplicitGlob(lastPathComponent: string): boolean;
    interface FileSystemEntries {
        files: string[];
        directories: string[];
    }
    interface FileMatcherPatterns {
        includeFilePatterns: string[];
        includeFilePattern: string;
        includeDirectoryPattern: string;
        excludePattern: string;
        basePaths: string[];
    }
    function getFileMatcherPatterns(path: string, excludes: string[], includes: string[], useCaseSensitiveFileNames: boolean, currentDirectory: string): FileMatcherPatterns;
    function matchFiles(path: string, extensions: string[], excludes: string[], includes: string[], useCaseSensitiveFileNames: boolean, currentDirectory: string, getFileSystemEntries: (path: string) => FileSystemEntries): string[];
    function ensureScriptKind(fileName: string, scriptKind?: ScriptKind): ScriptKind;
    function getScriptKindFromFileName(fileName: string): ScriptKind;
    const supportedTypeScriptExtensions: Extension[];
    const supportedTypescriptExtensionsForExtractExtension: Extension[];
    const supportedJavascriptExtensions: Extension[];
    function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: JsFileExtensionInfo[]): string[];
    function hasJavaScriptFileExtension(fileName: string): boolean;
    function hasTypeScriptFileExtension(fileName: string): boolean;
    function isSupportedSourceFileName(fileName: string, compilerOptions?: CompilerOptions, extraFileExtensions?: JsFileExtensionInfo[]): boolean;
    const enum ExtensionPriority {
        TypeScriptFiles = 0,
        DeclarationAndJavaScriptFiles = 2,
        Highest = 0,
        Lowest = 2,
    }
    function getExtensionPriority(path: string, supportedExtensions: string[]): ExtensionPriority;
    function adjustExtensionPriority(extensionPriority: ExtensionPriority, supportedExtensions: string[]): ExtensionPriority;
    function getNextLowestExtensionPriority(extensionPriority: ExtensionPriority, supportedExtensions: string[]): ExtensionPriority;
    function removeFileExtension(path: string): string;
    function tryRemoveExtension(path: string, extension: string): string | undefined;
    function removeExtension(path: string, extension: string): string;
    function changeExtension<T extends string | Path>(path: T, newExtension: string): T;
    interface ObjectAllocator {
        getNodeConstructor(): new (kind: SyntaxKind, pos?: number, end?: number) => Node;
        getTokenConstructor(): new <TKind extends SyntaxKind>(kind: TKind, pos?: number, end?: number) => Token<TKind>;
        getIdentifierConstructor(): new (kind: SyntaxKind.Identifier, pos?: number, end?: number) => Identifier;
        getSourceFileConstructor(): new (kind: SyntaxKind.SourceFile, pos?: number, end?: number) => SourceFile;
        getSymbolConstructor(): new (flags: SymbolFlags, name: string) => Symbol;
        getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
        getSignatureConstructor(): new (checker: TypeChecker) => Signature;
        getSourceMapSourceConstructor(): new (fileName: string, text: string, skipTrivia?: (pos: number) => number) => SourceMapSource;
    }
    let objectAllocator: ObjectAllocator;
    const enum AssertionLevel {
        None = 0,
        Normal = 1,
        Aggressive = 2,
        VeryAggressive = 3,
    }
    namespace Debug {
        let currentAssertionLevel: AssertionLevel;
        let isDebugging: boolean;
        function shouldAssert(level: AssertionLevel): boolean;
        function assert(expression: boolean, message?: string, verboseDebugInfo?: () => string, stackCrawlMark?: Function): void;
        function fail(message?: string, stackCrawlMark?: Function): void;
        function getFunctionName(func: Function): any;
    }
    function orderedRemoveItem<T>(array: T[], item: T): boolean;
    function orderedRemoveItemAt<T>(array: T[], index: number): void;
    function unorderedRemoveItemAt<T>(array: T[], index: number): void;
    function unorderedRemoveItem<T>(array: T[], item: T): void;
    function createGetCanonicalFileName(useCaseSensitiveFileNames: boolean): (fileName: string) => string;
    function matchPatternOrExact(patternStrings: string[], candidate: string): string | Pattern | undefined;
    function patternText({prefix, suffix}: Pattern): string;
    function matchedText(pattern: Pattern, candidate: string): string;
    function findBestPatternMatch<T>(values: T[], getPattern: (value: T) => Pattern, candidate: string): T | undefined;
    function tryParsePattern(pattern: string): Pattern | undefined;
    function positionIsSynthesized(pos: number): boolean;
    function extensionIsTypeScript(ext: Extension): boolean;
    function extensionFromPath(path: string): Extension;
    function tryGetExtensionFromPath(path: string): Extension | undefined;
    function isCheckJsEnabledForFile(sourceFile: SourceFile, compilerOptions: CompilerOptions): boolean;
}
declare function setTimeout(handler: (...args: any[]) => void, timeout: number): any;
declare function clearTimeout(handle: any): void;
declare namespace ts {
    type FileWatcherCallback = (fileName: string, removed?: boolean) => void;
    type DirectoryWatcherCallback = (fileName: string) => void;
    interface WatchedFile {
        fileName: string;
        callback: FileWatcherCallback;
        mtime?: Date;
    }
    interface System {
        args: string[];
        newLine: string;
        useCaseSensitiveFileNames: boolean;
        write(s: string): void;
        readFile(path: string, encoding?: string): string;
        getFileSize?(path: string): number;
        writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;
        watchFile?(path: string, callback: FileWatcherCallback, pollingInterval?: number): FileWatcher;
        watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher;
        resolvePath(path: string): string;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        createDirectory(path: string): void;
        getExecutingFilePath(): string;
        getCurrentDirectory(): string;
        getDirectories(path: string): string[];
        readDirectory(path: string, extensions?: string[], exclude?: string[], include?: string[]): string[];
        getModifiedTime?(path: string): Date;
        createHash?(data: string): string;
        getMemoryUsage?(): number;
        exit(exitCode?: number): void;
        realpath?(path: string): string;
        getEnvironmentVariable(name: string): string;
        tryEnableSourceMapsForHost?(): void;
        debugMode?: boolean;
        setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout?(timeoutId: any): void;
    }
    interface FileWatcher {
        close(): void;
    }
    interface DirectoryWatcher extends FileWatcher {
        directoryName: string;
        referenceCount: number;
    }
    function getNodeMajorVersion(): number;
    let sys: System;
}
declare namespace ts {
    const Diagnostics: {
        Unterminated_string_literal: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Identifier_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_file_cannot_have_a_reference_to_itself: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Trailing_comma_not_allowed: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Asterisk_Slash_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unexpected_token: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_rest_parameter_must_be_last_in_a_parameter_list: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_cannot_have_question_mark_and_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_required_parameter_cannot_follow_an_optional_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_index_signature_cannot_have_a_rest_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_index_signature_parameter_cannot_have_an_accessibility_modifier: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_index_signature_parameter_cannot_have_a_question_mark: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_index_signature_parameter_cannot_have_an_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_index_signature_must_have_a_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_index_signature_parameter_must_have_a_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_index_signature_parameter_type_must_be_string_or_number: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        readonly_modifier_can_only_appear_on_a_property_declaration_or_index_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Accessibility_modifier_already_seen: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_modifier_must_precede_1_modifier: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_modifier_already_seen: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_modifier_cannot_appear_on_a_class_element: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        super_must_be_followed_by_an_argument_list_or_member_access: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Only_ambient_modules_can_use_quoted_names: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Statements_are_not_allowed_in_ambient_contexts: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_declare_modifier_cannot_be_used_in_an_already_ambient_context: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Initializers_are_not_allowed_in_ambient_contexts: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_modifier_cannot_be_used_in_an_ambient_context: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_modifier_cannot_be_used_with_a_class_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_modifier_cannot_be_used_here: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_modifier_cannot_appear_on_a_data_property: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_modifier_cannot_appear_on_a_module_or_namespace_element: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_0_modifier_cannot_be_used_with_an_interface_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_rest_parameter_cannot_be_optional: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_rest_parameter_cannot_have_an_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_set_accessor_must_have_exactly_one_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_set_accessor_cannot_have_an_optional_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_set_accessor_parameter_cannot_have_an_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_set_accessor_cannot_have_rest_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_get_accessor_cannot_have_parameters: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_is_not_a_valid_async_function_return_type_in_ES5_SlashES3_because_it_does_not_refer_to_a_Promise_compatible_constructor_value: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_async_function_or_method_must_have_a_valid_awaitable_return_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_return_type_of_an_async_function_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_promise_must_have_a_then_method: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_first_parameter_of_the_then_method_of_a_promise_must_be_a_callback: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Enum_member_must_have_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_is_referenced_directly_or_indirectly_in_the_fulfillment_callback_of_its_own_then_method: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_export_assignment_cannot_be_used_in_a_namespace: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        In_ambient_enum_declarations_member_initializer_must_be_constant_expression: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unexpected_token_A_constructor_method_accessor_or_property_was_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_modifier_cannot_appear_on_a_type_member: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_modifier_cannot_appear_on_an_index_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_0_modifier_cannot_be_used_with_an_import_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Invalid_reference_directive_syntax: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher_Use_the_syntax_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_accessor_cannot_be_declared_in_an_ambient_context: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_modifier_cannot_appear_on_a_constructor_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_modifier_cannot_appear_on_a_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameters_cannot_appear_on_a_constructor_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_annotation_cannot_appear_on_a_constructor_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_accessor_cannot_have_type_parameters: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_set_accessor_cannot_have_a_return_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_index_signature_must_have_exactly_one_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_list_cannot_be_empty: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameter_list_cannot_be_empty: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_argument_list_cannot_be_empty: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Invalid_use_of_0_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        with_statements_are_not_allowed_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        delete_cannot_be_called_on_an_identifier_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_for_await_of_statement_is_only_allowed_within_an_async_function_or_async_generator: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Jump_target_cannot_cross_function_boundary: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_return_statement_can_only_be_used_within_a_function_body: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Expression_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_default_clause_cannot_appear_more_than_once_in_a_switch_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Duplicate_label_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_object_literal_cannot_have_property_and_accessor_with_the_same_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_export_assignment_cannot_have_modifiers: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Octal_literals_are_not_allowed_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_tuple_type_element_list_cannot_be_empty: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Variable_declaration_list_cannot_be_empty: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Digit_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Hexadecimal_digit_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unexpected_end_of_text: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Invalid_character: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Declaration_or_statement_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Statement_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        case_or_default_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_or_signature_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Enum_member_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Variable_declaration_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Argument_expression_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_assignment_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Expression_or_comma_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_declaration_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameter_declaration_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_argument_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        String_literal_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Line_break_not_permitted_here: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        or_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Declaration_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Import_declarations_in_a_namespace_cannot_reference_a_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_use_imports_exports_or_module_augmentations_when_module_is_none: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        File_name_0_differs_from_already_included_file_name_1_only_in_casing: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        const_declarations_must_be_initialized: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        const_declarations_can_only_be_declared_inside_a_block: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        let_declarations_can_only_be_declared_inside_a_block: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unterminated_template_literal: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unterminated_regular_expression_literal: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_object_member_cannot_be_declared_optional: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_yield_expression_is_only_allowed_in_a_generator_body: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Computed_property_names_are_not_allowed_in_enums: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_computed_property_name_in_an_ambient_context_must_directly_refer_to_a_built_in_symbol: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_computed_property_name_in_a_class_property_declaration_must_directly_refer_to_a_built_in_symbol: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_computed_property_name_in_a_method_overload_must_directly_refer_to_a_built_in_symbol: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_computed_property_name_in_an_interface_must_directly_refer_to_a_built_in_symbol: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_computed_property_name_in_a_type_literal_must_directly_refer_to_a_built_in_symbol: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_comma_expression_is_not_allowed_in_a_computed_property_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        extends_clause_already_seen: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        extends_clause_must_precede_implements_clause: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Classes_can_only_extend_a_single_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        implements_clause_already_seen: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Interface_declaration_cannot_have_implements_clause: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Binary_digit_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Octal_digit_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unexpected_token_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_destructuring_pattern_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Array_element_destructuring_pattern_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_destructuring_declaration_must_have_an_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_implementation_cannot_be_declared_in_ambient_contexts: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Modifiers_cannot_appear_here: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Merge_conflict_marker_encountered: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_rest_element_cannot_have_an_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_parameter_property_may_not_be_declared_using_a_binding_pattern: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_import_declaration_cannot_have_modifiers: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_0_has_no_default_export: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_export_declaration_cannot_have_modifiers: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Export_declarations_are_not_permitted_in_a_namespace: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Catch_clause_variable_cannot_have_a_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Catch_clause_variable_cannot_have_an_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unterminated_Unicode_escape_sequence: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Line_terminator_not_permitted_before_arrow: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Import_assignment_cannot_be_used_when_targeting_ECMAScript_2015_modules_Consider_using_import_Asterisk_as_ns_from_mod_import_a_from_mod_import_d_from_mod_or_another_module_format_instead: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Export_assignment_cannot_be_used_when_targeting_ECMAScript_2015_modules_Consider_using_export_default_or_another_module_format_instead: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_re_export_a_type_when_the_isolatedModules_flag_is_provided: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Decorators_are_not_valid_here: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Decorators_cannot_be_applied_to_multiple_get_Slashset_accessors_of_the_same_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_compile_namespaces_when_the_isolatedModules_flag_is_provided: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Ambient_const_enums_are_not_allowed_when_the_isolatedModules_flag_is_provided: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Invalid_use_of_0_Class_definitions_are_automatically_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_class_declaration_without_the_default_modifier_must_have_a_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Identifier_expected_0_is_a_reserved_word_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Invalid_use_of_0_Modules_are_automatically_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Identifier_expected_esModule_is_reserved_as_an_exported_marker_when_transforming_ECMAScript_modules: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Export_assignment_is_not_supported_when_module_flag_is_system: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Experimental_support_for_decorators_is_a_feature_that_is_subject_to_change_in_a_future_release_Set_the_experimentalDecorators_option_to_remove_this_warning: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Generators_are_only_available_when_targeting_ECMAScript_2015_or_higher: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Generators_are_not_allowed_in_an_ambient_context: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_overload_signature_cannot_be_declared_as_a_generator: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_tag_already_specified: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Signature_0_must_have_a_type_predicate: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_find_parameter_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_predicate_0_is_not_assignable_to_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_is_not_in_the_same_position_as_parameter_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_type_predicate_cannot_reference_a_rest_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_type_predicate_cannot_reference_element_0_in_a_binding_pattern: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_export_assignment_can_only_be_used_in_a_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_import_declaration_can_only_be_used_in_a_namespace_or_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_export_declaration_can_only_be_used_in_a_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_ambient_module_declaration_is_only_allowed_at_the_top_level_in_a_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_namespace_declaration_is_only_allowed_in_a_namespace_or_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_return_type_of_a_property_decorator_function_must_be_either_void_or_any: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_return_type_of_a_parameter_decorator_function_must_be_either_void_or_any: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unable_to_resolve_signature_of_class_decorator_when_called_as_an_expression: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unable_to_resolve_signature_of_parameter_decorator_when_called_as_an_expression: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unable_to_resolve_signature_of_property_decorator_when_called_as_an_expression: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unable_to_resolve_signature_of_method_decorator_when_called_as_an_expression: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        abstract_modifier_can_only_appear_on_a_class_method_or_property_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_modifier_cannot_be_used_with_1_modifier: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Abstract_methods_can_only_appear_within_an_abstract_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Method_0_cannot_have_an_implementation_because_it_is_marked_abstract: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_interface_property_cannot_have_an_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_type_literal_property_cannot_have_an_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_class_member_cannot_have_the_0_keyword: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_decorator_can_only_decorate_a_method_implementation_not_an_overload: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Class_definitions_are_automatically_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Function_declarations_are_not_allowed_inside_blocks_in_strict_mode_when_targeting_ES3_or_ES5_Modules_are_automatically_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_tag_cannot_be_used_independently_as_a_top_level_JSDoc_tag: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_const_initializer_in_an_ambient_context_must_be_a_string_or_numeric_literal: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        with_statements_are_not_allowed_in_an_async_function_block: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        await_expression_is_only_allowed_within_an_async_function: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        can_only_be_used_in_an_object_literal_property_inside_a_destructuring_assignment: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_body_of_an_if_statement_cannot_be_the_empty_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Global_module_exports_may_only_appear_in_module_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Global_module_exports_may_only_appear_in_declaration_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Global_module_exports_may_only_appear_at_top_level: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_parameter_property_cannot_be_declared_using_a_rest_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_abstract_accessor_cannot_have_an_implementation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_default_export_can_only_be_used_in_an_ECMAScript_style_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_of_await_operand_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_of_yield_operand_in_an_async_generator_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_of_iterated_elements_of_a_yield_Asterisk_operand_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Dynamic_import_cannot_be_used_when_targeting_ECMAScript_2015_modules: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Dynamic_import_must_have_one_specifier_as_an_argument: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Specifier_of_dynamic_import_cannot_be_spread_element: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Dynamic_import_cannot_have_type_arguments: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Duplicate_identifier_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Static_members_cannot_reference_class_type_parameters: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Circular_definition_of_import_alias_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_find_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_0_has_no_exported_member_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        File_0_is_not_a_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_find_module_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_0_has_already_exported_a_member_named_1_Consider_explicitly_re_exporting_to_resolve_the_ambiguity: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_recursively_references_itself_as_a_base_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_class_may_only_extend_another_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_interface_may_only_extend_a_class_or_another_interface: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameter_0_has_a_circular_constraint: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Generic_type_0_requires_1_type_argument_s: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_is_not_generic: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Global_type_0_must_be_a_class_or_interface_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Global_type_0_must_have_1_type_parameter_s: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_find_global_type_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Named_property_0_of_types_1_and_2_are_not_identical: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Interface_0_cannot_simultaneously_extend_types_1_and_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Excessive_stack_depth_comparing_types_0_and_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_is_not_assignable_to_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_redeclare_exported_variable_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_is_missing_in_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_is_private_in_type_1_but_not_in_type_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Types_of_property_0_are_incompatible: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_is_optional_in_type_1_but_required_in_type_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Types_of_parameters_0_and_1_are_incompatible: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Index_signature_is_missing_in_type_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Index_signatures_are_incompatible: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        this_cannot_be_referenced_in_a_module_or_namespace_body: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        this_cannot_be_referenced_in_current_location: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        this_cannot_be_referenced_in_constructor_arguments: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        this_cannot_be_referenced_in_a_static_property_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        super_can_only_be_referenced_in_a_derived_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        super_cannot_be_referenced_in_constructor_arguments: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_does_not_exist_on_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_is_private_and_only_accessible_within_class_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_index_expression_argument_must_be_of_type_string_number_symbol_or_any: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        This_syntax_requires_an_imported_helper_named_1_but_module_0_has_no_exported_member_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_does_not_satisfy_the_constraint_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Argument_of_type_0_is_not_assignable_to_parameter_of_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Call_target_does_not_contain_any_signatures: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Untyped_function_calls_may_not_accept_type_arguments: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Value_of_type_0_is_not_callable_Did_you_mean_to_include_new: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_invoke_an_expression_whose_type_lacks_a_call_signature_Type_0_has_no_compatible_call_signatures: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Only_a_void_function_can_be_called_with_the_new_keyword: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_cannot_be_converted_to_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        This_syntax_requires_an_imported_helper_but_module_0_cannot_be_found: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_or_a_property_access: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_left_hand_side_of_an_in_expression_must_be_of_type_any_string_number_or_symbol: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_left_hand_side_of_an_assignment_expression_must_be_a_variable_or_a_property_access: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Operator_0_cannot_be_applied_to_types_1_and_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Function_lacks_ending_return_statement_and_return_type_does_not_include_undefined: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameter_name_cannot_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_parameter_property_is_only_allowed_in_a_constructor_implementation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_rest_parameter_must_be_of_an_array_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_cannot_be_referenced_in_its_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Duplicate_string_index_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Duplicate_number_index_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_properties_or_has_parameter_properties: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Constructors_for_derived_classes_must_contain_a_super_call: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_get_accessor_must_return_a_value: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Getter_and_setter_accessors_do_not_agree_in_visibility: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        get_and_set_accessor_must_have_the_same_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_signature_with_an_implementation_cannot_use_a_string_literal_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Overload_signatures_must_all_be_exported_or_non_exported: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Overload_signatures_must_all_be_ambient_or_non_ambient: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Overload_signatures_must_all_be_public_private_or_protected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Overload_signatures_must_all_be_optional_or_required: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Function_overload_must_be_static: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Function_overload_must_not_be_static: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Function_implementation_name_must_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Constructor_implementation_is_missing: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Function_implementation_is_missing_or_not_immediately_following_the_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Multiple_constructor_implementations_are_not_allowed: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Duplicate_function_implementation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Overload_signature_is_not_compatible_with_function_implementation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Declaration_name_conflicts_with_built_in_global_identifier_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_left_hand_side_of_a_for_in_statement_must_be_a_variable_or_a_property_access: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Setters_cannot_return_a_value: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_with_statement_is_not_supported_All_symbols_in_a_with_block_will_have_type_any: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_of_type_1_is_not_assignable_to_string_index_type_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_of_type_1_is_not_assignable_to_numeric_index_type_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Numeric_index_type_0_is_not_assignable_to_string_index_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Class_name_cannot_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Class_0_incorrectly_extends_base_class_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Class_static_side_0_incorrectly_extends_base_class_static_side_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Class_0_incorrectly_implements_interface_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_class_may_only_implement_another_class_or_interface: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_property: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Interface_name_cannot_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        All_declarations_of_0_must_have_identical_type_parameters: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Interface_0_incorrectly_extends_interface_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Enum_name_cannot_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enum_element: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merged: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_namespace_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Ambient_modules_cannot_be_nested_in_other_modules_or_namespaces: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Ambient_module_declaration_cannot_specify_relative_module_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_0_is_hidden_by_a_local_declaration_with_the_same_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Import_name_cannot_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Import_or_export_declaration_in_an_ambient_module_declaration_cannot_reference_module_through_relative_module_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Import_declaration_conflicts_with_local_declaration_of_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Types_have_separate_declarations_of_a_private_property_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_is_protected_in_type_1_but_public_in_type_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Block_scoped_variable_0_used_before_its_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Class_0_used_before_its_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Enum_0_used_before_its_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_redeclare_block_scoped_variable_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_enum_member_cannot_have_a_numeric_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_type_argument_for_type_parameter_0_cannot_be_inferred_from_the_usage_Consider_specifying_the_type_arguments_explicitly: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Variable_0_is_used_before_being_assigned: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_argument_candidate_1_is_not_a_valid_type_argument_because_it_is_not_a_supertype_of_candidate_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_alias_0_circularly_references_itself: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_alias_name_cannot_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_AMD_module_cannot_have_multiple_name_assignments: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_has_no_property_1_and_no_string_index_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_has_no_property_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_is_not_an_array_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_rest_element_must_be_last_in_a_destructuring_pattern: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_binding_pattern_parameter_cannot_be_optional_in_an_implementation_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_computed_property_name_must_be_of_type_string_number_symbol_or_any: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        this_cannot_be_referenced_in_a_computed_property_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        super_cannot_be_referenced_in_a_computed_property_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_find_global_value_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_0_operator_cannot_be_applied_to_type_symbol: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Symbol_reference_does_not_refer_to_the_global_Symbol_constructor_object: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_computed_property_name_of_the_form_0_must_be_of_type_symbol: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Spread_operator_in_new_expressions_is_only_available_when_targeting_ECMAScript_5_and_higher: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Enum_declarations_must_all_be_const_or_non_const: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        In_const_enum_declarations_member_initializer_must_be_constant_expression: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_import_declaration_or_export_assignment: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_const_enum_member_can_only_be_accessed_using_a_string_literal: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        const_enum_member_initializer_was_evaluated_to_a_non_finite_value: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_does_not_exist_on_const_enum_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_initialize_outer_scoped_variable_0_in_the_same_scope_as_block_scoped_declaration_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_left_hand_side_of_a_for_of_statement_cannot_use_a_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Export_declaration_conflicts_with_exported_declaration_of_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_left_hand_side_of_a_for_of_statement_must_be_a_variable_or_a_property_access: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_must_have_a_Symbol_iterator_method_that_returns_an_iterator: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_iterator_must_have_a_next_method: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_type_returned_by_the_next_method_of_an_iterator_must_have_a_value_property: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_left_hand_side_of_a_for_in_statement_cannot_be_a_destructuring_pattern: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_redeclare_identifier_0_in_catch_clause: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Tuple_type_0_with_length_1_cannot_be_assigned_to_tuple_with_length_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Using_a_string_in_a_for_of_statement_is_only_supported_in_ECMAScript_5_and_higher: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_is_not_an_array_type_or_a_string_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_arguments_object_cannot_be_referenced_in_an_arrow_function_in_ES3_and_ES5_Consider_using_a_standard_function_expression: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_0_resolves_to_a_non_module_entity_and_cannot_be_imported_using_this_construct: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_0_uses_export_and_cannot_be_used_with_export_Asterisk: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_interface_can_only_extend_an_identifier_Slashqualified_name_with_optional_type_arguments: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_class_can_only_implement_an_identifier_Slashqualified_name_with_optional_type_arguments: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_rest_element_cannot_contain_a_binding_pattern: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_is_referenced_directly_or_indirectly_in_its_own_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_find_namespace_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_must_have_a_Symbol_asyncIterator_method_that_returns_an_async_iterator: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_generator_cannot_have_a_void_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_is_referenced_directly_or_indirectly_in_its_own_base_expression: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_is_not_a_constructor_function_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        No_base_constructor_has_the_specified_number_of_type_arguments: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Base_constructor_return_type_0_is_not_a_class_or_interface_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Base_constructors_must_all_have_the_same_return_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_create_an_instance_of_the_abstract_class_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Overload_signatures_must_all_be_abstract_or_non_abstract: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Abstract_method_0_in_class_1_cannot_be_accessed_via_super_expression: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Classes_containing_abstract_methods_must_be_marked_abstract: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        All_declarations_of_an_abstract_method_must_be_consecutive: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_assign_an_abstract_constructor_type_to_a_non_abstract_constructor_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_this_based_type_guard_is_not_compatible_with_a_parameter_based_type_guard: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_async_iterator_must_have_a_next_method: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Duplicate_identifier_0_Compiler_uses_declaration_1_to_support_async_functions: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Expression_resolves_to_variable_declaration_0_that_compiler_uses_to_support_async_functions: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_arguments_object_cannot_be_referenced_in_an_async_function_or_method_in_ES3_and_ES5_Consider_using_a_standard_function_or_method: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        yield_expressions_cannot_be_used_in_a_parameter_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        await_expressions_cannot_be_used_in_a_parameter_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Initializer_provides_no_value_for_this_binding_element_and_the_binding_element_has_no_default_value: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_this_type_is_available_only_in_a_non_static_member_of_a_class_or_interface: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_inferred_type_of_0_references_an_inaccessible_this_type_A_type_annotation_is_necessary: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_module_cannot_have_multiple_default_exports: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module_containing_async_functions: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_is_incompatible_with_index_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Object_is_possibly_null: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Object_is_possibly_undefined: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Object_is_possibly_null_or_undefined: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_function_returning_never_cannot_have_a_reachable_end_point: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Enum_type_0_has_members_with_initializers_that_are_not_literals: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_cannot_be_used_to_index_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_has_no_matching_index_signature_for_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_cannot_be_used_as_an_index_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_assign_to_0_because_it_is_not_a_variable: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_assign_to_0_because_it_is_a_constant_or_a_read_only_property: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_target_of_an_assignment_must_be_a_variable_or_a_property_access: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Index_signature_in_type_0_only_permits_reading: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Duplicate_identifier_newTarget_Compiler_uses_variable_declaration_newTarget_to_capture_new_target_meta_property_reference: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Expression_resolves_to_variable_declaration_newTarget_that_compiler_uses_to_capture_new_target_meta_property_reference: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_mixin_class_must_have_a_constructor_with_a_single_rest_parameter_of_type_any: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_has_conflicting_declarations_and_is_inaccessible_in_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_type_returned_by_the_next_method_of_an_async_iterator_must_be_a_promise_for_a_type_with_a_value_property: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_is_not_an_array_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_is_not_an_array_type_or_a_string_type_or_does_not_have_a_Symbol_iterator_method_that_returns_an_iterator: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Generic_type_instantiation_is_excessively_deep_and_possibly_infinite: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_does_not_exist_on_type_1_Did_you_mean_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_find_name_0_Did_you_mean_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Computed_values_are_not_permitted_in_an_enum_with_string_valued_members: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Expected_0_arguments_but_got_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Expected_at_least_0_arguments_but_got_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Expected_0_arguments_but_got_a_minimum_of_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Expected_at_least_0_arguments_but_got_a_minimum_of_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Expected_0_type_arguments_but_got_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_has_no_properties_in_common_with_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        JSX_element_attributes_type_0_may_not_be_a_union_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_return_type_of_a_JSX_element_constructor_must_return_an_object_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        JSX_element_implicitly_has_type_any_because_the_global_type_JSX_Element_does_not_exist: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_in_type_1_is_not_assignable_to_type_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        JSX_element_type_0_does_not_have_any_construct_or_call_signatures: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        JSX_element_type_0_is_not_a_constructor_function_for_JSX_elements: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_of_JSX_spread_attribute_is_not_assignable_to_target_property: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        JSX_element_class_does_not_support_attributes_because_it_does_not_have_a_0_property: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_global_type_JSX_0_may_not_have_more_than_one_property: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        JSX_spread_child_must_be_an_array_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_augment_module_0_with_value_exports_because_it_resolves_to_a_non_module_entity: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_member_initializer_in_a_enum_declaration_cannot_reference_members_declared_after_it_including_members_defined_in_other_enums: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Merged_declaration_0_cannot_include_a_default_export_declaration_Consider_adding_a_separate_export_default_0_declaration_instead: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Non_abstract_class_expression_does_not_implement_inherited_abstract_member_0_from_class_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Exported_external_package_typings_file_cannot_contain_tripleslash_references_Please_contact_the_package_author_to_update_the_package_definition: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Exported_external_package_typings_file_0_is_not_a_module_Please_contact_the_package_author_to_update_the_package_definition: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        JSX_expressions_must_have_one_parent_element: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_provides_no_match_for_the_signature_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        super_is_only_allowed_in_members_of_object_literal_expressions_when_option_target_is_ES2015_or_higher: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        super_can_only_be_referenced_in_members_of_derived_classes_or_object_literal_expressions: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_export_0_Only_local_declarations_can_be_exported_from_a_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_find_name_0_Did_you_mean_the_static_member_1_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_find_name_0_Did_you_mean_the_instance_member_this_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Invalid_module_name_in_augmentation_module_0_cannot_be_found: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Invalid_module_name_in_augmentation_Module_0_resolves_to_an_untyped_module_at_1_which_cannot_be_augmented: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Exports_and_export_assignments_are_not_permitted_in_module_augmentations: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Imports_are_not_permitted_in_module_augmentations_Consider_moving_them_to_the_enclosing_external_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        export_modifier_cannot_be_applied_to_ambient_modules_and_module_augmentations_since_they_are_always_visible: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Augmentations_for_the_global_scope_can_only_be_directly_nested_in_external_modules_or_ambient_module_declarations: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Augmentations_for_the_global_scope_should_have_declare_modifier_unless_they_appear_in_already_ambient_context: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_augment_module_0_because_it_resolves_to_a_non_module_entity: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_assign_a_0_constructor_type_to_a_1_constructor_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Constructor_of_class_0_is_private_and_only_accessible_within_the_class_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Constructor_of_class_0_is_protected_and_only_accessible_within_the_class_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_extend_a_class_0_Class_constructor_is_marked_as_private: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Accessors_must_both_be_abstract_or_non_abstract: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_type_predicate_s_type_must_be_assignable_to_its_parameter_s_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_is_not_comparable_to_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_function_that_is_called_with_the_new_keyword_cannot_have_a_this_type_that_is_void: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_this_parameter_must_be_the_first_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_constructor_cannot_have_a_this_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        get_and_set_accessor_must_have_the_same_this_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_this_context_of_type_0_is_not_assignable_to_method_s_this_of_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_this_types_of_each_signature_are_incompatible: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        All_declarations_of_0_must_have_identical_modifiers: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_find_type_definition_file_for_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_extend_an_interface_0_Did_you_mean_implements: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_import_path_cannot_end_with_a_0_extension_Consider_importing_1_instead: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_is_a_primitive_but_1_is_a_wrapper_object_Prefer_using_0_when_possible: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_only_refers_to_a_type_but_is_being_used_as_a_value_here: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Namespace_0_has_no_exported_member_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Left_side_of_comma_operator_is_unused_and_has_no_side_effects: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_Object_type_is_assignable_to_very_few_other_types_Did_you_mean_to_use_the_any_type_instead: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_async_function_or_method_must_return_a_Promise_Make_sure_you_have_a_declaration_for_Promise_or_include_ES2015_in_your_lib_option: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Spread_types_may_only_be_created_from_object_types: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Static_property_0_conflicts_with_built_in_property_Function_0_of_constructor_function_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Rest_types_may_only_be_created_from_object_types: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_target_of_an_object_rest_assignment_must_be_a_variable_or_a_property_access: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_only_refers_to_a_type_but_is_being_used_as_a_namespace_here: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_operand_of_a_delete_operator_must_be_a_property_reference: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_operand_of_a_delete_operator_cannot_be_a_read_only_property: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_async_function_or_method_in_ES5_SlashES3_requires_the_Promise_constructor_Make_sure_you_have_a_declaration_for_the_Promise_constructor_or_include_ES2015_in_your_lib_option: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Required_type_parameters_may_not_follow_optional_type_parameters: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Generic_type_0_requires_between_1_and_2_type_arguments: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_use_namespace_0_as_a_value: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_use_namespace_0_as_a_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_are_specified_twice_The_attribute_named_0_will_be_overwritten: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_dynamic_import_call_returns_a_Promise_Make_sure_you_have_a_declaration_for_Promise_or_include_ES2015_in_your_lib_option: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_dynamic_import_call_in_ES5_SlashES3_requires_the_Promise_constructor_Make_sure_you_have_a_declaration_for_the_Promise_constructor_or_include_ES2015_in_your_lib_option: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Import_declaration_0_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameter_0_of_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameter_0_of_exported_function_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Implements_clause_of_exported_class_0_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        extends_clause_of_exported_class_0_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        extends_clause_of_exported_interface_0_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Exported_variable_0_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Exported_variable_0_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Public_static_property_0_of_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Public_property_0_of_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_of_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Return_type_of_exported_function_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_exported_function_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Exported_type_alias_0_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Default_export_of_the_module_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_parameter_0_of_exported_type_alias_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Conflicting_definitions_for_0_found_at_1_and_2_Consider_installing_a_specific_version_of_this_library_to_resolve_the_conflict: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_of_exported_class_expression_may_not_be_private_or_protected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_current_host_does_not_support_the_0_option: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_find_the_common_subdirectory_path_for_the_input_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        File_specification_cannot_contain_multiple_recursive_directory_wildcards_Asterisk_Asterisk_Colon_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_read_file_0_Colon_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Failed_to_parse_file_0_Colon_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unknown_compiler_option_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Compiler_option_0_requires_a_value_of_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Could_not_write_file_0_Colon_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Option_project_cannot_be_mixed_with_source_files_on_a_command_line: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES2015_or_higher: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Option_0_cannot_be_specified_without_specifying_option_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Option_0_cannot_be_specified_with_option_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_tsconfig_json_file_is_already_defined_at_Colon_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_write_file_0_because_it_would_overwrite_input_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_find_a_tsconfig_json_file_at_the_specified_directory_Colon_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_specified_path_does_not_exist_Colon_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Option_paths_cannot_be_used_without_specifying_baseUrl_option: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Pattern_0_can_have_at_most_one_Asterisk_character: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Substitution_0_in_pattern_1_in_can_have_at_most_one_Asterisk_character: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Substitutions_for_pattern_0_should_be_an_array: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Substitution_0_for_pattern_1_has_incorrect_type_expected_string_got_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Substitutions_for_pattern_0_shouldn_t_be_an_empty_array: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Invalid_value_for_jsxFactory_0_is_not_a_valid_identifier_or_qualified_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Concatenate_and_emit_output_to_single_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Generates_corresponding_d_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Specify_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Specify_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Watch_input_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Redirect_output_structure_to_the_directory: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Do_not_erase_const_enum_declarations_in_generated_code: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Do_not_emit_outputs_if_any_errors_were_reported: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Do_not_emit_comments_to_output: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Do_not_emit_outputs: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Allow_default_imports_from_modules_with_no_default_export_This_does_not_affect_code_emit_just_typechecking: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Skip_type_checking_of_declaration_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Specify_ECMAScript_target_version_Colon_ES3_default_ES5_ES2015_ES2016_ES2017_or_ESNEXT: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Specify_module_code_generation_Colon_commonjs_amd_system_umd_es2015_or_ESNext: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Print_this_message: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Print_the_compiler_s_version: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Compile_the_project_given_the_path_to_its_configuration_file_or_to_a_folder_with_a_tsconfig_json: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Syntax_Colon_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        options: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Examples_Colon_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Options_Colon: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Version_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Insert_command_line_options_and_files_from_a_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        File_change_detected_Starting_incremental_compilation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        KIND: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        FILE: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        VERSION: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        LOCATION: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        DIRECTORY: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        STRATEGY: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        FILE_OR_DIRECTORY: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Compilation_complete_Watching_for_file_changes: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Generates_corresponding_map_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Compiler_option_0_expects_an_argument: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unterminated_quoted_string_in_response_file_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Argument_for_0_option_must_be_Colon_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unsupported_locale_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unable_to_open_file_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Corrupted_locale_file_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Raise_error_on_expressions_and_declarations_with_an_implied_any_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        File_0_not_found: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        File_0_has_unsupported_extension_The_only_supported_extensions_are_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Suppress_noImplicitAny_errors_for_indexing_objects_lacking_index_signatures: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Do_not_emit_declarations_for_code_that_has_an_internal_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Specify_the_root_directory_of_input_files_Use_to_control_the_output_directory_structure_with_outDir: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Specify_the_end_of_line_sequence_to_be_used_when_emitting_files_Colon_CRLF_dos_or_LF_unix: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        NEWLINE: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Option_0_can_only_be_specified_in_tsconfig_json_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Enables_experimental_support_for_ES7_decorators: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Enables_experimental_support_for_emitting_type_metadata_for_decorators: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Enables_experimental_support_for_ES7_async_functions: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Specify_module_resolution_strategy_Colon_node_Node_js_or_classic_TypeScript_pre_1_6: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Initializes_a_TypeScript_project_and_creates_a_tsconfig_json_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Successfully_created_a_tsconfig_json_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Suppress_excess_property_checks_for_object_literals: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Stylize_errors_and_messages_using_color_and_context_experimental: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Do_not_report_errors_on_unused_labels: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Report_error_when_not_all_code_paths_in_function_return_a_value: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Report_errors_for_fallthrough_cases_in_switch_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Do_not_report_errors_on_unreachable_code: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Disallow_inconsistently_cased_references_to_the_same_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Specify_library_files_to_be_included_in_the_compilation_Colon: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Specify_JSX_code_generation_Colon_preserve_react_native_or_react: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        File_0_has_an_unsupported_extension_so_skipping_it: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Only_amd_and_system_modules_are_supported_alongside_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Base_directory_to_resolve_non_absolute_module_names: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Deprecated_Use_jsxFactory_instead_Specify_the_object_invoked_for_createElement_when_targeting_react_JSX_emit: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Enable_tracing_of_the_name_resolution_process: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Resolving_module_0_from_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Explicitly_specified_module_resolution_kind_Colon_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_resolution_kind_is_not_specified_using_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_name_0_was_successfully_resolved_to_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_name_0_was_not_resolved: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_name_0_matched_pattern_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Trying_substitution_0_candidate_module_location_Colon_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Resolving_module_name_0_relative_to_base_url_1_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Loading_module_as_file_Slash_folder_candidate_module_location_0_target_file_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        File_0_does_not_exist: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        File_0_exist_use_it_as_a_name_resolution_result: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Loading_module_0_from_node_modules_folder_target_file_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Found_package_json_at_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        package_json_does_not_have_a_0_field: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        package_json_has_0_field_1_that_references_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Allow_javascript_files_to_be_compiled: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Option_0_should_have_array_of_strings_as_a_value: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Checking_if_0_is_the_longest_matching_prefix_for_1_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Expected_type_of_0_field_in_package_json_to_be_string_got_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Longest_matching_prefix_for_0_is_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Loading_0_from_the_root_dir_1_candidate_location_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Trying_other_entries_in_rootDirs: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_resolution_using_rootDirs_has_failed: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Do_not_emit_use_strict_directives_in_module_output: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Enable_strict_null_checks: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unknown_option_excludes_Did_you_mean_exclude: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Raise_error_on_this_expressions_with_an_implied_any_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Resolving_type_reference_directive_0_containing_file_1_root_directory_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Resolving_using_primary_search_paths: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Resolving_from_node_modules_folder: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_reference_directive_0_was_not_resolved: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Resolving_with_primary_search_path_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Root_directory_cannot_be_determined_skipping_primary_search_paths: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Resolving_type_reference_directive_0_containing_file_1_root_directory_not_set: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_declaration_files_to_be_included_in_compilation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Looking_up_in_node_modules_folder_initial_location_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_node_modules_folder: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Resolving_type_reference_directive_0_containing_file_not_set_root_directory_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Resolving_type_reference_directive_0_containing_file_not_set_root_directory_not_set: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_config_file_0_found_doesn_t_contain_any_source_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Resolving_real_path_for_0_result_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_compile_modules_using_option_0_unless_the_module_flag_is_amd_or_system: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        File_name_0_has_a_1_extension_stripping_it: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_is_declared_but_never_used: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Report_errors_on_unused_locals: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Report_errors_on_unused_parameters: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_maximum_dependency_depth_to_search_under_node_modules_and_load_JavaScript_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_import_type_declaration_files_Consider_importing_0_instead_of_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_is_declared_but_never_used: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Import_emit_helpers_from_tslib: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using_cache_location_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parse_in_strict_mode_and_emit_use_strict_for_each_source_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_0_was_resolved_to_1_but_jsx_is_not_set: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_0_was_resolved_to_1_but_allowJs_is_not_set: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_0_was_resolved_as_locally_declared_ambient_module_in_file_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_0_was_resolved_as_ambient_module_declared_in_1_since_this_file_was_not_modified: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Specify_the_JSX_factory_function_to_use_when_targeting_react_JSX_emit_e_g_React_createElement_or_h: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Resolution_for_module_0_was_found_in_cache: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Directory_0_does_not_exist_skipping_all_lookups_in_it: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Show_diagnostic_information: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Show_verbose_diagnostic_information: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Emit_a_single_file_with_source_maps_instead_of_having_a_separate_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Emit_the_source_alongside_the_sourcemaps_within_a_single_file_requires_inlineSourceMap_or_sourceMap_to_be_set: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Transpile_each_file_as_a_separate_module_similar_to_ts_transpileModule: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Print_names_of_generated_files_part_of_the_compilation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Print_names_of_files_part_of_the_compilation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_locale_used_when_displaying_messages_to_the_user_e_g_en_us: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Do_not_generate_custom_helper_functions_like_extends_in_compiled_output: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Do_not_include_the_default_library_file_lib_d_ts: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Do_not_add_triple_slash_references_or_imported_modules_to_the_list_of_compiled_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Deprecated_Use_skipLibCheck_instead_Skip_type_checking_of_default_library_declaration_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        List_of_folders_to_include_type_definitions_from: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Disable_size_limitations_on_JavaScript_projects: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_character_set_of_the_input_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Emit_a_UTF_8_Byte_Order_Mark_BOM_in_the_beginning_of_output_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Do_not_truncate_error_messages: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Output_directory_for_generated_declaration_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_series_of_entries_which_re_map_imports_to_lookup_locations_relative_to_the_baseUrl: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        List_of_root_folders_whose_combined_content_represents_the_structure_of_the_project_at_runtime: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Show_all_compiler_options: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Deprecated_Use_outFile_instead_Concatenate_and_emit_output_to_single_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Command_line_Options: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Basic_Options: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Strict_Type_Checking_Options: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Module_Resolution_Options: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Source_Map_Options: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Additional_Checks: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Experimental_Options: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Advanced_Options: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Provide_full_support_for_iterables_in_for_of_spread_and_destructuring_when_targeting_ES5_or_ES3: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Enable_all_strict_type_checking_options: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        List_of_language_service_plugins: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Scoped_package_detected_looking_in_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Reusing_resolution_of_module_0_to_file_1_from_old_program: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Reusing_module_resolutions_originating_in_0_since_resolutions_are_unchanged_from_old_program: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Variable_0_implicitly_has_an_1_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Parameter_0_implicitly_has_an_1_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Member_0_implicitly_has_an_1_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Element_implicitly_has_an_any_type_because_index_expression_is_not_of_type_number: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Object_literal_s_property_0_implicitly_has_an_1_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Rest_parameter_0_implicitly_has_an_any_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Generator_implicitly_has_type_0_because_it_does_not_yield_any_values_Consider_supplying_a_return_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unreachable_code_detected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unused_label: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Fallthrough_case_in_switch: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Not_all_code_paths_return_a_value: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Binding_element_0_implicitly_has_an_1_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Try_npm_install_types_Slash_0_if_it_exists_or_add_a_new_declaration_d_ts_file_containing_declare_module_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Dynamic_import_s_specifier_must_be_of_type_string_but_here_has_type_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        You_cannot_rename_this_element: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        import_can_only_be_used_in_a_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        export_can_only_be_used_in_a_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        type_parameter_declarations_can_only_be_used_in_a_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        implements_clauses_can_only_be_used_in_a_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        interface_declarations_can_only_be_used_in_a_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        module_declarations_can_only_be_used_in_a_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        type_aliases_can_only_be_used_in_a_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_can_only_be_used_in_a_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        types_can_only_be_used_in_a_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        type_arguments_can_only_be_used_in_a_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        parameter_modifiers_can_only_be_used_in_a_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        enum_declarations_can_only_be_used_in_a_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        type_assertion_expressions_can_only_be_used_in_a_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Only_identifiers_Slashqualified_names_with_optional_type_arguments_are_currently_supported_in_a_class_extends_clause: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        class_expressions_are_not_currently_supported: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Language_service_is_disabled: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        JSX_attributes_must_only_be_assigned_a_non_empty_expression: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        JSX_elements_cannot_have_multiple_attributes_with_the_same_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Expected_corresponding_JSX_closing_tag_for_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        JSX_attribute_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Cannot_use_JSX_unless_the_jsx_flag_is_provided: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_constructor_cannot_contain_a_super_call_when_its_class_extends_null: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_type_assertion_expression_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        JSX_element_0_has_no_corresponding_closing_tag: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Unknown_type_acquisition_option_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        super_must_be_called_before_accessing_a_property_of_super_in_the_constructor_of_a_derived_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        _0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Meta_property_0_is_only_allowed_in_the_body_of_a_function_declaration_function_expression_or_constructor: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Circularity_detected_while_resolving_configuration_Colon_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        A_path_in_an_extends_option_must_be_relative_or_rooted_but_0_is_not: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        The_files_list_in_config_file_0_is_empty: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Add_missing_super_call: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Make_super_call_the_first_statement_in_the_constructor: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Change_extends_to_implements: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Remove_declaration_for_Colon_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Implement_interface_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Implement_inherited_abstract_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Add_this_to_unresolved_variable: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript_files_Learn_more_at_https_Colon_Slash_Slashaka_ms_Slashtsconfig: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Type_0_is_not_assignable_to_type_1_Two_different_types_with_this_name_exist_but_they_are_unrelated: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Import_0_from_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Change_0_to_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Add_0_to_existing_import_declaration_from_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Declare_property_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Add_index_signature_for_property_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Disable_checking_for_this_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Ignore_this_error_message: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Initialize_property_0_in_the_constructor: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Initialize_static_property_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Change_spelling_to_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Declare_method_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Declare_static_method_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Convert_function_to_an_ES2015_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Convert_function_0_to_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Octal_literal_types_must_use_ES2015_syntax_Use_the_syntax_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Octal_literals_are_not_allowed_in_enums_members_initializer_Use_the_syntax_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
        Report_errors_in_js_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            message: string;
        };
    };
}
declare namespace ts {
    interface ErrorCallback {
        (message: DiagnosticMessage, length: number): void;
    }
    function tokenIsIdentifierOrKeyword(token: SyntaxKind): boolean;
    interface Scanner {
        getStartPos(): number;
        getToken(): SyntaxKind;
        getTextPos(): number;
        getTokenPos(): number;
        getTokenText(): string;
        getTokenValue(): string;
        hasExtendedUnicodeEscape(): boolean;
        hasPrecedingLineBreak(): boolean;
        isIdentifier(): boolean;
        isReservedWord(): boolean;
        isUnterminated(): boolean;
        getNumericLiteralFlags(): NumericLiteralFlags;
        reScanGreaterToken(): SyntaxKind;
        reScanSlashToken(): SyntaxKind;
        reScanTemplateToken(): SyntaxKind;
        scanJsxIdentifier(): SyntaxKind;
        scanJsxAttributeValue(): SyntaxKind;
        reScanJsxToken(): SyntaxKind;
        scanJsxToken(): SyntaxKind;
        scanJSDocToken(): SyntaxKind;
        scan(): SyntaxKind;
        getText(): string;
        setText(text: string, start?: number, length?: number): void;
        setOnError(onError: ErrorCallback): void;
        setScriptTarget(scriptTarget: ScriptTarget): void;
        setLanguageVariant(variant: LanguageVariant): void;
        setTextPos(textPos: number): void;
        lookAhead<T>(callback: () => T): T;
        scanRange<T>(start: number, length: number, callback: () => T): T;
        tryScan<T>(callback: () => T): T;
    }
    function isUnicodeIdentifierStart(code: number, languageVersion: ScriptTarget): boolean;
    function tokenToString(t: SyntaxKind): string | undefined;
    function stringToToken(s: string): SyntaxKind;
    function computeLineStarts(text: string): number[];
    function getPositionOfLineAndCharacter(sourceFile: SourceFile, line: number, character: number): number;
    function computePositionOfLineAndCharacter(lineStarts: number[], line: number, character: number): number;
    function getLineStarts(sourceFile: SourceFileLike): number[];
    function computeLineAndCharacterOfPosition(lineStarts: number[], position: number): {
        line: number;
        character: number;
    };
    function getLineAndCharacterOfPosition(sourceFile: SourceFileLike, position: number): LineAndCharacter;
    function isWhiteSpaceLike(ch: number): boolean;
    function isWhiteSpaceSingleLine(ch: number): boolean;
    function isLineBreak(ch: number): boolean;
    function isOctalDigit(ch: number): boolean;
    function couldStartTrivia(text: string, pos: number): boolean;
    function skipTrivia(text: string, pos: number, stopAfterLineBreak?: boolean, stopAtComments?: boolean): number;
    function forEachLeadingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state?: T): U | undefined;
    function forEachTrailingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state?: T): U | undefined;
    function reduceEachLeadingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T, memo: U) => U, state: T, initial: U): U;
    function reduceEachTrailingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T, memo: U) => U, state: T, initial: U): U;
    function getLeadingCommentRanges(text: string, pos: number): CommentRange[] | undefined;
    function getTrailingCommentRanges(text: string, pos: number): CommentRange[] | undefined;
    function getShebang(text: string): string | undefined;
    function isIdentifierStart(ch: number, languageVersion: ScriptTarget): boolean;
    function isIdentifierPart(ch: number, languageVersion: ScriptTarget): boolean;
    function isIdentifierText(name: string, languageVersion: ScriptTarget): boolean;
    function createScanner(languageVersion: ScriptTarget, skipTrivia: boolean, languageVariant?: LanguageVariant, text?: string, onError?: ErrorCallback, start?: number, length?: number): Scanner;
}
declare namespace ts {
    const externalHelpersModuleNameText = "tslib";
    interface ReferencePathMatchResult {
        fileReference?: FileReference;
        diagnosticMessage?: DiagnosticMessage;
        isNoDefaultLib?: boolean;
        isTypeReferenceDirective?: boolean;
    }
    function getDeclarationOfKind<T extends Declaration>(symbol: Symbol, kind: T["kind"]): T;
    function findDeclaration<T extends Declaration>(symbol: Symbol, predicate: (node: Declaration) => node is T): T | undefined;
    function findDeclaration(symbol: Symbol, predicate: (node: Declaration) => boolean): Declaration | undefined;
    interface StringSymbolWriter extends SymbolWriter {
        string(): string;
    }
    function getSingleLineStringWriter(): StringSymbolWriter;
    function releaseStringWriter(writer: StringSymbolWriter): void;
    function getFullWidth(node: Node): number;
    function hasResolvedModule(sourceFile: SourceFile, moduleNameText: string): boolean;
    function getResolvedModule(sourceFile: SourceFile, moduleNameText: string): ResolvedModuleFull;
    function setResolvedModule(sourceFile: SourceFile, moduleNameText: string, resolvedModule: ResolvedModuleFull): void;
    function setResolvedTypeReferenceDirective(sourceFile: SourceFile, typeReferenceDirectiveName: string, resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective): void;
    function moduleResolutionIsEqualTo(oldResolution: ResolvedModuleFull, newResolution: ResolvedModuleFull): boolean;
    function typeDirectiveIsEqualTo(oldResolution: ResolvedTypeReferenceDirective, newResolution: ResolvedTypeReferenceDirective): boolean;
    function hasChangesInResolutions<T>(names: string[], newResolutions: T[], oldResolutions: Map<T>, comparer: (oldResolution: T, newResolution: T) => boolean): boolean;
    function containsParseError(node: Node): boolean;
    function getSourceFileOfNode(node: Node): SourceFile;
    function isStatementWithLocals(node: Node): boolean;
    function getStartPositionOfLine(line: number, sourceFile: SourceFileLike): number;
    function nodePosToString(node: Node): string;
    function getStartPosOfNode(node: Node): number;
    function isDefined(value: any): boolean;
    function getEndLinePosition(line: number, sourceFile: SourceFileLike): number;
    function nodeIsMissing(node: Node): boolean;
    function nodeIsPresent(node: Node): boolean;
    function getTokenPosOfNode(node: Node, sourceFile?: SourceFileLike, includeJsDoc?: boolean): number;
    function getNonDecoratorTokenPosOfNode(node: Node, sourceFile?: SourceFileLike): number;
    function getSourceTextOfNodeFromSourceFile(sourceFile: SourceFile, node: Node, includeTrivia?: boolean): string;
    function getTextOfNodeFromSourceText(sourceText: string, node: Node): string;
    function getTextOfNode(node: Node, includeTrivia?: boolean): string;
    function getLiteralText(node: LiteralLikeNode, sourceFile: SourceFile): string;
    function getTextOfConstantValue(value: string | number): string;
    function escapeIdentifier(identifier: string): string;
    function makeIdentifierFromModuleName(moduleName: string): string;
    function isBlockOrCatchScoped(declaration: Declaration): boolean;
    function isCatchClauseVariableDeclarationOrBindingElement(declaration: Declaration): boolean;
    function isAmbientModule(node: Node): boolean;
    function isShorthandAmbientModuleSymbol(moduleSymbol: Symbol): boolean;
    function isBlockScopedContainerTopLevel(node: Node): boolean;
    function isGlobalScopeAugmentation(module: ModuleDeclaration): boolean;
    function isExternalModuleAugmentation(node: Node): boolean;
    function isEffectiveExternalModule(node: SourceFile, compilerOptions: CompilerOptions): boolean;
    function isBlockScope(node: Node, parentNode: Node): boolean;
    function getEnclosingBlockScopeContainer(node: Node): Node;
    function declarationNameToString(name: DeclarationName): string;
    function getNameFromIndexInfo(info: IndexInfo): string | undefined;
    function getTextOfPropertyName(name: PropertyName): string;
    function entityNameToString(name: EntityNameOrEntityNameExpression): string;
    function createDiagnosticForNode(node: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number): Diagnostic;
    function createDiagnosticForNodeInSourceFile(sourceFile: SourceFile, node: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number): Diagnostic;
    function createDiagnosticForNodeFromMessageChain(node: Node, messageChain: DiagnosticMessageChain): Diagnostic;
    function getSpanOfTokenAtPosition(sourceFile: SourceFile, pos: number): TextSpan;
    function getErrorSpanForNode(sourceFile: SourceFile, node: Node): TextSpan;
    function isExternalOrCommonJsModule(file: SourceFile): boolean;
    function isConstEnumDeclaration(node: Node): boolean;
    function isConst(node: Node): boolean;
    function isLet(node: Node): boolean;
    function isSuperCall(n: Node): n is SuperCall;
    function isImportCall(n: Node): n is ImportCall;
    function isPrologueDirective(node: Node): node is PrologueDirective;
    function getLeadingCommentRangesOfNode(node: Node, sourceFileOfNode: SourceFile): CommentRange[];
    function getLeadingCommentRangesOfNodeFromText(node: Node, text: string): CommentRange[];
    function getJSDocCommentRanges(node: Node, text: string): CommentRange[];
    let fullTripleSlashReferencePathRegEx: RegExp;
    let fullTripleSlashReferenceTypeReferenceDirectiveRegEx: RegExp;
    let fullTripleSlashAMDReferencePathRegEx: RegExp;
    function isPartOfTypeNode(node: Node): boolean;
    function isChildOfNodeWithKind(node: Node, kind: SyntaxKind): boolean;
    function forEachReturnStatement<T>(body: Block, visitor: (stmt: ReturnStatement) => T): T;
    function forEachYieldExpression(body: Block, visitor: (expr: YieldExpression) => void): void;
    function getRestParameterElementType(node: TypeNode): TypeNode;
    function isVariableLike(node: Node): node is VariableLikeDeclaration;
    function introducesArgumentsExoticObject(node: Node): boolean;
    function unwrapInnermostStatementOfLabel(node: LabeledStatement, beforeUnwrapLabelCallback?: (node: LabeledStatement) => void): Statement;
    function isFunctionBlock(node: Node): boolean;
    function isObjectLiteralMethod(node: Node): node is MethodDeclaration;
    function isObjectLiteralOrClassExpressionMethod(node: Node): node is MethodDeclaration;
    function isIdentifierTypePredicate(predicate: TypePredicate): predicate is IdentifierTypePredicate;
    function isThisTypePredicate(predicate: TypePredicate): predicate is ThisTypePredicate;
    function getContainingFunction(node: Node): FunctionLikeDeclaration;
    function getContainingClass(node: Node): ClassLikeDeclaration;
    function getThisContainer(node: Node, includeArrowFunctions: boolean): Node;
    function getNewTargetContainer(node: Node): Node;
    function getSuperContainer(node: Node, stopOnFunctions: boolean): Node;
    function getImmediatelyInvokedFunctionExpression(func: Node): CallExpression;
    function isSuperProperty(node: Node): node is SuperProperty;
    function getEntityNameFromTypeNode(node: TypeNode): EntityNameOrEntityNameExpression;
    function getInvokedExpression(node: CallLikeExpression): Expression;
    function nodeCanBeDecorated(node: Node): boolean;
    function nodeIsDecorated(node: Node): boolean;
    function nodeOrChildIsDecorated(node: Node): boolean;
    function childIsDecorated(node: Node): boolean;
    function isJSXTagName(node: Node): boolean;
    function isPartOfExpression(node: Node): boolean;
    function isInstantiatedModule(node: ModuleDeclaration, preserveConstEnums: boolean): boolean;
    function isExternalModuleImportEqualsDeclaration(node: Node): boolean;
    function getExternalModuleImportEqualsDeclarationExpression(node: Node): Expression;
    function isInternalModuleImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration;
    function isSourceFileJavaScript(file: SourceFile): boolean;
    function isInJavaScriptFile(node: Node): boolean;
    function isRequireCall(callExpression: Node, checkArgumentIsStringLiteral: boolean): callExpression is CallExpression;
    function isSingleOrDoubleQuote(charCode: number): boolean;
    function isDeclarationOfFunctionOrClassExpression(s: Symbol): boolean;
    function getRightMostAssignedExpression(node: Node): Node;
    function isExportsIdentifier(node: Node): boolean;
    function isModuleExportsPropertyAccessExpression(node: Node): boolean;
    function getSpecialPropertyAssignmentKind(expression: ts.BinaryExpression): SpecialPropertyAssignmentKind;
    function getExternalModuleName(node: Node): Expression;
    function getNamespaceDeclarationNode(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration): ImportEqualsDeclaration | NamespaceImport;
    function isDefaultImport(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration): boolean;
    function hasQuestionToken(node: Node): boolean;
    function isJSDocConstructSignature(node: Node): boolean;
    function getCommentsFromJSDoc(node: Node): string[];
    function hasJSDocParameterTags(node: FunctionLikeDeclaration | SignatureDeclaration): boolean;
    function getJSDocs(node: Node): (JSDoc | JSDocTag)[];
    function getJSDocParameterTags(param: ParameterDeclaration): JSDocParameterTag[];
    function getParameterFromJSDoc(node: JSDocParameterTag): ParameterDeclaration | undefined;
    function getTypeParameterFromJsDoc(node: TypeParameterDeclaration & {
        parent: JSDocTemplateTag;
    }): TypeParameterDeclaration | undefined;
    function getJSDocType(node: Node): JSDocType;
    function getJSDocAugmentsTag(node: Node): JSDocAugmentsTag;
    function getJSDocClassTag(node: Node): JSDocClassTag;
    function getJSDocReturnTag(node: Node): JSDocReturnTag;
    function getJSDocReturnType(node: Node): JSDocType;
    function getJSDocTemplateTag(node: Node): JSDocTemplateTag;
    function hasRestParameter(s: SignatureDeclaration): boolean;
    function hasDeclaredRestParameter(s: SignatureDeclaration): boolean;
    function isRestParameter(node: ParameterDeclaration): boolean;
    function isDeclaredRestParam(node: ParameterDeclaration): boolean;
    const enum AssignmentKind {
        None = 0,
        Definite = 1,
        Compound = 2,
    }
    function getAssignmentTargetKind(node: Node): AssignmentKind;
    function isAssignmentTarget(node: Node): boolean;
    function isDeleteTarget(node: Node): boolean;
    function isNodeDescendantOf(node: Node, ancestor: Node): boolean;
    function isInAmbientContext(node: Node): boolean;
    function isDeclarationName(name: Node): boolean;
    function isAnyDeclarationName(name: Node): boolean;
    function isLiteralComputedPropertyDeclarationName(node: Node): boolean;
    function isIdentifierName(node: Identifier): boolean;
    function isAliasSymbolDeclaration(node: Node): boolean;
    function exportAssignmentIsAlias(node: ExportAssignment): boolean;
    function getClassExtendsHeritageClauseElement(node: ClassLikeDeclaration | InterfaceDeclaration): ExpressionWithTypeArguments;
    function getClassImplementsHeritageClauseElements(node: ClassLikeDeclaration): NodeArray<ExpressionWithTypeArguments>;
    function getInterfaceBaseTypeNodes(node: InterfaceDeclaration): NodeArray<ExpressionWithTypeArguments>;
    function getHeritageClause(clauses: NodeArray<HeritageClause>, kind: SyntaxKind): HeritageClause;
    function tryResolveScriptReference(host: ScriptReferenceHost, sourceFile: SourceFile, reference: FileReference): SourceFile;
    function getAncestor(node: Node | undefined, kind: SyntaxKind): Node | undefined;
    function getFileReferenceFromReferencePath(comment: string, commentRange: CommentRange): ReferencePathMatchResult;
    function isKeyword(token: SyntaxKind): boolean;
    function isTrivia(token: SyntaxKind): boolean;
    const enum FunctionFlags {
        Normal = 0,
        Generator = 1,
        Async = 2,
        Invalid = 4,
        AsyncGenerator = 3,
    }
    function getFunctionFlags(node: FunctionLikeDeclaration | undefined): FunctionFlags;
    function isAsyncFunction(node: Node): boolean;
    function isStringOrNumericLiteral(node: Node): node is StringLiteral | NumericLiteral;
    function hasDynamicName(declaration: Declaration): boolean;
    function isDynamicName(name: DeclarationName): boolean;
    function isWellKnownSymbolSyntactically(node: Expression): boolean;
    function getPropertyNameForPropertyNameNode(name: DeclarationName | ParameterDeclaration): string;
    function getPropertyNameForKnownSymbolName(symbolName: string): string;
    function isESSymbolIdentifier(node: Node): boolean;
    function isPushOrUnshiftIdentifier(node: Identifier): boolean;
    function isParameterDeclaration(node: VariableLikeDeclaration): boolean;
    function getRootDeclaration(node: Node): Node;
    function nodeStartsNewLexicalEnvironment(node: Node): boolean;
    function nodeIsSynthesized(node: TextRange): boolean;
    function getOriginalSourceFileOrBundle(sourceFileOrBundle: SourceFile | Bundle): SourceFile | Bundle;
    function getOriginalSourceFiles(sourceFiles: SourceFile[]): SourceFile[];
    function getOriginalNodeId(node: Node): number;
    const enum Associativity {
        Left = 0,
        Right = 1,
    }
    function getExpressionAssociativity(expression: Expression): Associativity;
    function getOperatorAssociativity(kind: SyntaxKind, operator: SyntaxKind, hasArguments?: boolean): Associativity;
    function getExpressionPrecedence(expression: Expression): 1 | -1 | 0 | 2 | 4 | 3 | 16 | 10 | 5 | 6 | 11 | 8 | 19 | 18 | 17 | 15 | 14 | 13 | 12 | 9 | 7;
    function getOperator(expression: Expression): SyntaxKind.Unknown | SyntaxKind.EndOfFileToken | SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia | SyntaxKind.NewLineTrivia | SyntaxKind.WhitespaceTrivia | SyntaxKind.ShebangTrivia | SyntaxKind.ConflictMarkerTrivia | SyntaxKind.NumericLiteral | SyntaxKind.StringLiteral | SyntaxKind.JsxText | SyntaxKind.JsxTextAllWhiteSpaces | SyntaxKind.RegularExpressionLiteral | SyntaxKind.NoSubstitutionTemplateLiteral | SyntaxKind.TemplateHead | SyntaxKind.TemplateMiddle | SyntaxKind.TemplateTail | SyntaxKind.OpenBraceToken | SyntaxKind.CloseBraceToken | SyntaxKind.OpenParenToken | SyntaxKind.CloseParenToken | SyntaxKind.OpenBracketToken | SyntaxKind.CloseBracketToken | SyntaxKind.DotToken | SyntaxKind.DotDotDotToken | SyntaxKind.SemicolonToken | SyntaxKind.CommaToken | SyntaxKind.LessThanToken | SyntaxKind.LessThanSlashToken | SyntaxKind.GreaterThanToken | SyntaxKind.LessThanEqualsToken | SyntaxKind.GreaterThanEqualsToken | SyntaxKind.EqualsEqualsToken | SyntaxKind.ExclamationEqualsToken | SyntaxKind.EqualsEqualsEqualsToken | SyntaxKind.ExclamationEqualsEqualsToken | SyntaxKind.EqualsGreaterThanToken | SyntaxKind.PlusToken | SyntaxKind.MinusToken | SyntaxKind.AsteriskToken | SyntaxKind.AsteriskAsteriskToken | SyntaxKind.SlashToken | SyntaxKind.PercentToken | SyntaxKind.PlusPlusToken | SyntaxKind.MinusMinusToken | SyntaxKind.LessThanLessThanToken | SyntaxKind.GreaterThanGreaterThanToken | SyntaxKind.GreaterThanGreaterThanGreaterThanToken | SyntaxKind.AmpersandToken | SyntaxKind.BarToken | SyntaxKind.CaretToken | SyntaxKind.ExclamationToken | SyntaxKind.TildeToken | SyntaxKind.AmpersandAmpersandToken | SyntaxKind.BarBarToken | SyntaxKind.QuestionToken | SyntaxKind.ColonToken | SyntaxKind.AtToken | SyntaxKind.EqualsToken | SyntaxKind.PlusEqualsToken | SyntaxKind.MinusEqualsToken | SyntaxKind.AsteriskEqualsToken | SyntaxKind.AsteriskAsteriskEqualsToken | SyntaxKind.SlashEqualsToken | SyntaxKind.PercentEqualsToken | SyntaxKind.LessThanLessThanEqualsToken | SyntaxKind.GreaterThanGreaterThanEqualsToken | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken | SyntaxKind.AmpersandEqualsToken | SyntaxKind.BarEqualsToken | SyntaxKind.CaretEqualsToken | SyntaxKind.Identifier | SyntaxKind.BreakKeyword | SyntaxKind.CaseKeyword | SyntaxKind.CatchKeyword | SyntaxKind.ClassKeyword | SyntaxKind.ConstKeyword | SyntaxKind.ContinueKeyword | SyntaxKind.DebuggerKeyword | SyntaxKind.DefaultKeyword | SyntaxKind.DeleteKeyword | SyntaxKind.DoKeyword | SyntaxKind.ElseKeyword | SyntaxKind.EnumKeyword | SyntaxKind.ExportKeyword | SyntaxKind.ExtendsKeyword | SyntaxKind.FalseKeyword | SyntaxKind.FinallyKeyword | SyntaxKind.ForKeyword | SyntaxKind.FunctionKeyword | SyntaxKind.IfKeyword | SyntaxKind.ImportKeyword | SyntaxKind.InKeyword | SyntaxKind.InstanceOfKeyword | SyntaxKind.NewKeyword | SyntaxKind.NullKeyword | SyntaxKind.ReturnKeyword | SyntaxKind.SuperKeyword | SyntaxKind.SwitchKeyword | SyntaxKind.ThisKeyword | SyntaxKind.ThrowKeyword | SyntaxKind.TrueKeyword | SyntaxKind.TryKeyword | SyntaxKind.TypeOfKeyword | SyntaxKind.VarKeyword | SyntaxKind.VoidKeyword | SyntaxKind.WhileKeyword | SyntaxKind.WithKeyword | SyntaxKind.ImplementsKeyword | SyntaxKind.InterfaceKeyword | SyntaxKind.LetKeyword | SyntaxKind.PackageKeyword | SyntaxKind.PrivateKeyword | SyntaxKind.ProtectedKeyword | SyntaxKind.PublicKeyword | SyntaxKind.StaticKeyword | SyntaxKind.YieldKeyword | SyntaxKind.AbstractKeyword | SyntaxKind.AsKeyword | SyntaxKind.AnyKeyword | SyntaxKind.AsyncKeyword | SyntaxKind.AwaitKeyword | SyntaxKind.BooleanKeyword | SyntaxKind.ConstructorKeyword | SyntaxKind.DeclareKeyword | SyntaxKind.GetKeyword | SyntaxKind.IsKeyword | SyntaxKind.KeyOfKeyword | SyntaxKind.ModuleKeyword | SyntaxKind.NamespaceKeyword | SyntaxKind.NeverKeyword | SyntaxKind.ReadonlyKeyword | SyntaxKind.RequireKeyword | SyntaxKind.NumberKeyword | SyntaxKind.ObjectKeyword | SyntaxKind.SetKeyword | SyntaxKind.StringKeyword | SyntaxKind.SymbolKeyword | SyntaxKind.TypeKeyword | SyntaxKind.UndefinedKeyword | SyntaxKind.FromKeyword | SyntaxKind.GlobalKeyword | SyntaxKind.OfKeyword | SyntaxKind.QualifiedName | SyntaxKind.ComputedPropertyName | SyntaxKind.TypeParameter | SyntaxKind.Parameter | SyntaxKind.Decorator | SyntaxKind.PropertySignature | SyntaxKind.PropertyDeclaration | SyntaxKind.MethodSignature | SyntaxKind.MethodDeclaration | SyntaxKind.Constructor | SyntaxKind.GetAccessor | SyntaxKind.SetAccessor | SyntaxKind.CallSignature | SyntaxKind.ConstructSignature | SyntaxKind.IndexSignature | SyntaxKind.TypePredicate | SyntaxKind.TypeReference | SyntaxKind.FunctionType | SyntaxKind.ConstructorType | SyntaxKind.TypeQuery | SyntaxKind.TypeLiteral | SyntaxKind.ArrayType | SyntaxKind.TupleType | SyntaxKind.UnionType | SyntaxKind.IntersectionType | SyntaxKind.ParenthesizedType | SyntaxKind.ThisType | SyntaxKind.TypeOperator | SyntaxKind.IndexedAccessType | SyntaxKind.MappedType | SyntaxKind.LiteralType | SyntaxKind.ObjectBindingPattern | SyntaxKind.ArrayBindingPattern | SyntaxKind.BindingElement | SyntaxKind.ArrayLiteralExpression | SyntaxKind.ObjectLiteralExpression | SyntaxKind.PropertyAccessExpression | SyntaxKind.ElementAccessExpression | SyntaxKind.CallExpression | SyntaxKind.NewExpression | SyntaxKind.TaggedTemplateExpression | SyntaxKind.TypeAssertionExpression | SyntaxKind.ParenthesizedExpression | SyntaxKind.FunctionExpression | SyntaxKind.ArrowFunction | SyntaxKind.DeleteExpression | SyntaxKind.TypeOfExpression | SyntaxKind.VoidExpression | SyntaxKind.AwaitExpression | SyntaxKind.ConditionalExpression | SyntaxKind.TemplateExpression | SyntaxKind.YieldExpression | SyntaxKind.SpreadElement | SyntaxKind.ClassExpression | SyntaxKind.OmittedExpression | SyntaxKind.ExpressionWithTypeArguments | SyntaxKind.AsExpression | SyntaxKind.NonNullExpression | SyntaxKind.MetaProperty | SyntaxKind.TemplateSpan | SyntaxKind.SemicolonClassElement | SyntaxKind.Block | SyntaxKind.VariableStatement | SyntaxKind.EmptyStatement | SyntaxKind.ExpressionStatement | SyntaxKind.IfStatement | SyntaxKind.DoStatement | SyntaxKind.WhileStatement | SyntaxKind.ForStatement | SyntaxKind.ForInStatement | SyntaxKind.ForOfStatement | SyntaxKind.ContinueStatement | SyntaxKind.BreakStatement | SyntaxKind.ReturnStatement | SyntaxKind.WithStatement | SyntaxKind.SwitchStatement | SyntaxKind.LabeledStatement | SyntaxKind.ThrowStatement | SyntaxKind.TryStatement | SyntaxKind.DebuggerStatement | SyntaxKind.VariableDeclaration | SyntaxKind.VariableDeclarationList | SyntaxKind.FunctionDeclaration | SyntaxKind.ClassDeclaration | SyntaxKind.InterfaceDeclaration | SyntaxKind.TypeAliasDeclaration | SyntaxKind.EnumDeclaration | SyntaxKind.ModuleDeclaration | SyntaxKind.ModuleBlock | SyntaxKind.CaseBlock | SyntaxKind.NamespaceExportDeclaration | SyntaxKind.ImportEqualsDeclaration | SyntaxKind.ImportDeclaration | SyntaxKind.ImportClause | SyntaxKind.NamespaceImport | SyntaxKind.NamedImports | SyntaxKind.ImportSpecifier | SyntaxKind.ExportAssignment | SyntaxKind.ExportDeclaration | SyntaxKind.NamedExports | SyntaxKind.ExportSpecifier | SyntaxKind.MissingDeclaration | SyntaxKind.ExternalModuleReference | SyntaxKind.JsxElement | SyntaxKind.JsxSelfClosingElement | SyntaxKind.JsxOpeningElement | SyntaxKind.JsxClosingElement | SyntaxKind.JsxAttribute | SyntaxKind.JsxAttributes | SyntaxKind.JsxSpreadAttribute | SyntaxKind.JsxExpression | SyntaxKind.CaseClause | SyntaxKind.DefaultClause | SyntaxKind.HeritageClause | SyntaxKind.CatchClause | SyntaxKind.PropertyAssignment | SyntaxKind.ShorthandPropertyAssignment | SyntaxKind.SpreadAssignment | SyntaxKind.EnumMember | SyntaxKind.SourceFile | SyntaxKind.Bundle | SyntaxKind.JSDocTypeExpression | SyntaxKind.JSDocAllType | SyntaxKind.JSDocUnknownType | SyntaxKind.JSDocArrayType | SyntaxKind.JSDocUnionType | SyntaxKind.JSDocTupleType | SyntaxKind.JSDocNullableType | SyntaxKind.JSDocNonNullableType | SyntaxKind.JSDocRecordType | SyntaxKind.JSDocRecordMember | SyntaxKind.JSDocTypeReference | SyntaxKind.JSDocOptionalType | SyntaxKind.JSDocFunctionType | SyntaxKind.JSDocVariadicType | SyntaxKind.JSDocConstructorType | SyntaxKind.JSDocThisType | SyntaxKind.JSDocComment | SyntaxKind.JSDocTag | SyntaxKind.JSDocAugmentsTag | SyntaxKind.JSDocClassTag | SyntaxKind.JSDocParameterTag | SyntaxKind.JSDocReturnTag | SyntaxKind.JSDocTypeTag | SyntaxKind.JSDocTemplateTag | SyntaxKind.JSDocTypedefTag | SyntaxKind.JSDocPropertyTag | SyntaxKind.JSDocTypeLiteral | SyntaxKind.JSDocLiteralType | SyntaxKind.SyntaxList | SyntaxKind.NotEmittedStatement | SyntaxKind.PartiallyEmittedExpression | SyntaxKind.CommaListExpression | SyntaxKind.MergeDeclarationMarker | SyntaxKind.EndOfDeclarationMarker | SyntaxKind.Count;
    function getOperatorPrecedence(nodeKind: SyntaxKind, operatorKind: SyntaxKind, hasArguments?: boolean): 1 | -1 | 0 | 2 | 4 | 3 | 16 | 10 | 5 | 6 | 11 | 8 | 19 | 18 | 17 | 15 | 14 | 13 | 12 | 9 | 7;
    function createDiagnosticCollection(): DiagnosticCollection;
    function escapeString(s: string): string;
    function isIntrinsicJsxName(name: string): boolean;
    function escapeNonAsciiString(s: string): string;
    function getIndentString(level: number): string;
    function getIndentSize(): number;
    function createTextWriter(newLine: string): EmitTextWriter;
    function getResolvedExternalModuleName(host: EmitHost, file: SourceFile): string;
    function getExternalModuleNameFromDeclaration(host: EmitHost, resolver: EmitResolver, declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration): string;
    function getExternalModuleNameFromPath(host: EmitHost, fileName: string): string;
    function getOwnEmitOutputFilePath(sourceFile: SourceFile, host: EmitHost, extension: string): string;
    function getDeclarationEmitOutputFilePath(sourceFile: SourceFile, host: EmitHost): string;
    interface EmitFileNames {
        jsFilePath: string;
        sourceMapFilePath: string;
        declarationFilePath: string;
    }
    function getSourceFilesToEmit(host: EmitHost, targetSourceFile?: SourceFile): SourceFile[];
    function sourceFileMayBeEmitted(sourceFile: SourceFile, options: CompilerOptions, isSourceFileFromExternalLibrary: (file: SourceFile) => boolean): boolean;
    function forEachEmittedFile(host: EmitHost, action: (emitFileNames: EmitFileNames, sourceFileOrBundle: SourceFile | Bundle, emitOnlyDtsFiles: boolean) => void, sourceFilesOrTargetSourceFile?: SourceFile[] | SourceFile, emitOnlyDtsFiles?: boolean): void;
    function getSourceFilePathInNewDir(sourceFile: SourceFile, host: EmitHost, newDirPath: string): string;
    function writeFile(host: EmitHost, diagnostics: DiagnosticCollection, fileName: string, data: string, writeByteOrderMark: boolean, sourceFiles?: SourceFile[]): void;
    function getLineOfLocalPosition(currentSourceFile: SourceFile, pos: number): number;
    function getLineOfLocalPositionFromLineMap(lineMap: number[], pos: number): number;
    function getFirstConstructorWithBody(node: ClassLikeDeclaration): ConstructorDeclaration;
    function getSetAccessorTypeAnnotationNode(accessor: SetAccessorDeclaration): TypeNode;
    function getThisParameter(signature: SignatureDeclaration): ParameterDeclaration | undefined;
    function parameterIsThisKeyword(parameter: ParameterDeclaration): boolean;
    function isThisIdentifier(node: Node | undefined): boolean;
    function identifierIsThisKeyword(id: Identifier): boolean;
    interface AllAccessorDeclarations {
        firstAccessor: AccessorDeclaration;
        secondAccessor: AccessorDeclaration;
        getAccessor: AccessorDeclaration;
        setAccessor: AccessorDeclaration;
    }
    function getAllAccessorDeclarations(declarations: NodeArray<Declaration>, accessor: AccessorDeclaration): AllAccessorDeclarations;
    function getEffectiveTypeAnnotationNode(node: VariableLikeDeclaration): TypeNode;
    function getEffectiveReturnTypeNode(node: SignatureDeclaration): TypeNode;
    function getEffectiveSetAccessorTypeAnnotationNode(node: SetAccessorDeclaration): TypeNode;
    function emitNewLineBeforeLeadingComments(lineMap: number[], writer: EmitTextWriter, node: TextRange, leadingComments: CommentRange[]): void;
    function emitNewLineBeforeLeadingCommentsOfPosition(lineMap: number[], writer: EmitTextWriter, pos: number, leadingComments: CommentRange[]): void;
    function emitNewLineBeforeLeadingCommentOfPosition(lineMap: number[], writer: EmitTextWriter, pos: number, commentPos: number): void;
    function emitComments(text: string, lineMap: number[], writer: EmitTextWriter, comments: CommentRange[], leadingSeparator: boolean, trailingSeparator: boolean, newLine: string, writeComment: (text: string, lineMap: number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void): void;
    function emitDetachedComments(text: string, lineMap: number[], writer: EmitTextWriter, writeComment: (text: string, lineMap: number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void, node: TextRange, newLine: string, removeComments: boolean): {
        nodePos: number;
        detachedCommentEndPos: number;
    };
    function writeCommentRange(text: string, lineMap: number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string): void;
    function hasModifiers(node: Node): boolean;
    function hasModifier(node: Node, flags: ModifierFlags): boolean;
    function getModifierFlags(node: Node): ModifierFlags;
    function getModifierFlagsNoCache(node: Node): ModifierFlags;
    function modifierToFlag(token: SyntaxKind): ModifierFlags;
    function isLogicalOperator(token: SyntaxKind): boolean;
    function isAssignmentOperator(token: SyntaxKind): boolean;
    function tryGetClassExtendingExpressionWithTypeArguments(node: Node): ClassLikeDeclaration | undefined;
    function isAssignmentExpression(node: Node, excludeCompoundAssignment: true): node is AssignmentExpression<EqualsToken>;
    function isAssignmentExpression(node: Node, excludeCompoundAssignment?: false): node is AssignmentExpression<AssignmentOperatorToken>;
    function isDestructuringAssignment(node: Node): node is DestructuringAssignment;
    function isSupportedExpressionWithTypeArguments(node: ExpressionWithTypeArguments): boolean;
    function isExpressionWithTypeArgumentsInClassExtendsClause(node: Node): boolean;
    function isExpressionWithTypeArgumentsInClassImplementsClause(node: Node): node is ExpressionWithTypeArguments;
    function isEntityNameExpression(node: Expression): node is EntityNameExpression;
    function isRightSideOfQualifiedNameOrPropertyAccess(node: Node): boolean;
    function isEmptyObjectLiteral(expression: Node): boolean;
    function isEmptyArrayLiteral(expression: Node): boolean;
    function getLocalSymbolForExportDefault(symbol: Symbol): Symbol;
    function tryExtractTypeScriptExtension(fileName: string): string | undefined;
    function convertToBase64(input: string): string;
    function getNewLineCharacter(options: CompilerOptions | PrinterOptions): string;
    function isSimpleExpression(node: Expression): boolean;
    function formatSyntaxKind(kind: SyntaxKind): string;
    function formatModifierFlags(flags: ModifierFlags): string;
    function formatTransformFlags(flags: TransformFlags): string;
    function formatEmitFlags(flags: EmitFlags): string;
    function formatSymbolFlags(flags: SymbolFlags): string;
    function formatTypeFlags(flags: TypeFlags): string;
    function formatObjectFlags(flags: ObjectFlags): string;
    function getRangePos(range: TextRange | undefined): number;
    function getRangeEnd(range: TextRange | undefined): number;
    function movePos(pos: number, value: number): number;
    function createRange(pos: number, end: number): TextRange;
    function moveRangeEnd(range: TextRange, end: number): TextRange;
    function moveRangePos(range: TextRange, pos: number): TextRange;
    function moveRangePastDecorators(node: Node): TextRange;
    function moveRangePastModifiers(node: Node): TextRange;
    function isCollapsedRange(range: TextRange): boolean;
    function collapseRangeToStart(range: TextRange): TextRange;
    function collapseRangeToEnd(range: TextRange): TextRange;
    function createTokenRange(pos: number, token: SyntaxKind): TextRange;
    function rangeIsOnSingleLine(range: TextRange, sourceFile: SourceFile): boolean;
    function rangeStartPositionsAreOnSameLine(range1: TextRange, range2: TextRange, sourceFile: SourceFile): boolean;
    function rangeEndPositionsAreOnSameLine(range1: TextRange, range2: TextRange, sourceFile: SourceFile): boolean;
    function rangeStartIsOnSameLineAsRangeEnd(range1: TextRange, range2: TextRange, sourceFile: SourceFile): boolean;
    function rangeEndIsOnSameLineAsRangeStart(range1: TextRange, range2: TextRange, sourceFile: SourceFile): boolean;
    function positionsAreOnSameLine(pos1: number, pos2: number, sourceFile: SourceFile): boolean;
    function getStartPositionOfRange(range: TextRange, sourceFile: SourceFile): number;
    function isDeclarationNameOfEnumOrNamespace(node: Identifier): boolean;
    function getInitializedVariables(node: VariableDeclarationList): VariableDeclaration[];
    function isMergedWithClass(node: Node): boolean;
    function isFirstDeclarationOfKind(node: Node, kind: SyntaxKind): boolean;
    function isWatchSet(options: CompilerOptions): boolean;
    function getCheckFlags(symbol: Symbol): CheckFlags;
    function getDeclarationModifierFlagsFromSymbol(s: Symbol): ModifierFlags;
    function levenshtein(s1: string, s2: string): number;
}
declare namespace ts {
    function getDefaultLibFileName(options: CompilerOptions): string;
    function textSpanEnd(span: TextSpan): number;
    function textSpanIsEmpty(span: TextSpan): boolean;
    function textSpanContainsPosition(span: TextSpan, position: number): boolean;
    function textSpanContainsTextSpan(span: TextSpan, other: TextSpan): boolean;
    function textSpanOverlapsWith(span: TextSpan, other: TextSpan): boolean;
    function textSpanOverlap(span1: TextSpan, span2: TextSpan): TextSpan;
    function textSpanIntersectsWithTextSpan(span: TextSpan, other: TextSpan): boolean;
    function textSpanIntersectsWith(span: TextSpan, start: number, length: number): boolean;
    function decodedTextSpanIntersectsWith(start1: number, length1: number, start2: number, length2: number): boolean;
    function textSpanIntersectsWithPosition(span: TextSpan, position: number): boolean;
    function textSpanIntersection(span1: TextSpan, span2: TextSpan): TextSpan;
    function createTextSpan(start: number, length: number): TextSpan;
    function createTextSpanFromBounds(start: number, end: number): TextSpan;
    function textChangeRangeNewSpan(range: TextChangeRange): TextSpan;
    function textChangeRangeIsUnchanged(range: TextChangeRange): boolean;
    function createTextChangeRange(span: TextSpan, newLength: number): TextChangeRange;
    let unchangedTextChangeRange: TextChangeRange;
    function collapseTextChangeRangesAcrossMultipleVersions(changes: TextChangeRange[]): TextChangeRange;
    function getTypeParameterOwner(d: Declaration): Declaration;
    function isParameterPropertyDeclaration(node: Node): boolean;
    function getCombinedModifierFlags(node: Node): ModifierFlags;
    function getCombinedNodeFlags(node: Node): NodeFlags;
    function validateLocaleAndSetLanguage(locale: string, sys: {
        getExecutingFilePath(): string;
        resolvePath(path: string): string;
        fileExists(fileName: string): boolean;
        readFile(fileName: string): string;
    }, errors?: Diagnostic[]): void;
    function getOriginalNode(node: Node): Node;
    function getOriginalNode<T extends Node>(node: Node, nodeTest: (node: Node) => node is T): T;
    function isParseTreeNode(node: Node): boolean;
    function getParseTreeNode(node: Node): Node;
    function getParseTreeNode<T extends Node>(node: Node, nodeTest?: (node: Node) => node is T): T;
    function unescapeIdentifier(identifier: string): string;
    function getNameOfDeclaration(declaration: Declaration): DeclarationName | undefined;
}
declare namespace ts {
    function isNumericLiteral(node: Node): node is NumericLiteral;
    function isStringLiteral(node: Node): node is StringLiteral;
    function isJsxText(node: Node): node is JsxText;
    function isRegularExpressionLiteral(node: Node): node is RegularExpressionLiteral;
    function isNoSubstitutionTemplateLiteral(node: Node): node is LiteralExpression;
    function isTemplateHead(node: Node): node is TemplateHead;
    function isTemplateMiddle(node: Node): node is TemplateMiddle;
    function isTemplateTail(node: Node): node is TemplateTail;
    function isIdentifier(node: Node): node is Identifier;
    function isQualifiedName(node: Node): node is QualifiedName;
    function isComputedPropertyName(node: Node): node is ComputedPropertyName;
    function isTypeParameter(node: Node): node is TypeParameterDeclaration;
    function isParameter(node: Node): node is ParameterDeclaration;
    function isDecorator(node: Node): node is Decorator;
    function isPropertySignature(node: Node): node is PropertySignature;
    function isPropertyDeclaration(node: Node): node is PropertyDeclaration;
    function isMethodSignature(node: Node): node is MethodSignature;
    function isMethodDeclaration(node: Node): node is MethodDeclaration;
    function isConstructorDeclaration(node: Node): node is ConstructorDeclaration;
    function isGetAccessorDeclaration(node: Node): node is GetAccessorDeclaration;
    function isSetAccessorDeclaration(node: Node): node is SetAccessorDeclaration;
    function isCallSignatureDeclaration(node: Node): node is CallSignatureDeclaration;
    function isConstructSignatureDeclaration(node: Node): node is ConstructSignatureDeclaration;
    function isIndexSignatureDeclaration(node: Node): node is IndexSignatureDeclaration;
    function isTypePredicateNode(node: Node): node is TypePredicateNode;
    function isTypeReferenceNode(node: Node): node is TypeReferenceNode;
    function isFunctionTypeNode(node: Node): node is FunctionTypeNode;
    function isConstructorTypeNode(node: Node): node is ConstructorTypeNode;
    function isTypeQueryNode(node: Node): node is TypeQueryNode;
    function isTypeLiteralNode(node: Node): node is TypeLiteralNode;
    function isArrayTypeNode(node: Node): node is ArrayTypeNode;
    function isTupleTypeNode(node: Node): node is TupleTypeNode;
    function isUnionTypeNode(node: Node): node is UnionTypeNode;
    function isIntersectionTypeNode(node: Node): node is IntersectionTypeNode;
    function isParenthesizedTypeNode(node: Node): node is ParenthesizedTypeNode;
    function isThisTypeNode(node: Node): node is ThisTypeNode;
    function isTypeOperatorNode(node: Node): node is TypeOperatorNode;
    function isIndexedAccessTypeNode(node: Node): node is IndexedAccessTypeNode;
    function isMappedTypeNode(node: Node): node is MappedTypeNode;
    function isLiteralTypeNode(node: Node): node is LiteralTypeNode;
    function isObjectBindingPattern(node: Node): node is ObjectBindingPattern;
    function isArrayBindingPattern(node: Node): node is ArrayBindingPattern;
    function isBindingElement(node: Node): node is BindingElement;
    function isArrayLiteralExpression(node: Node): node is ArrayLiteralExpression;
    function isObjectLiteralExpression(node: Node): node is ObjectLiteralExpression;
    function isPropertyAccessExpression(node: Node): node is PropertyAccessExpression;
    function isElementAccessExpression(node: Node): node is ElementAccessExpression;
    function isCallExpression(node: Node): node is CallExpression;
    function isNewExpression(node: Node): node is NewExpression;
    function isTaggedTemplateExpression(node: Node): node is TaggedTemplateExpression;
    function isTypeAssertion(node: Node): node is TypeAssertion;
    function isParenthesizedExpression(node: Node): node is ParenthesizedExpression;
    function isFunctionExpression(node: Node): node is FunctionExpression;
    function isArrowFunction(node: Node): node is ArrowFunction;
    function isDeleteExpression(node: Node): node is DeleteExpression;
    function isTypeOfExpression(node: Node): node is TypeOfExpression;
    function isVoidExpression(node: Node): node is VoidExpression;
    function isAwaitExpression(node: Node): node is AwaitExpression;
    function isPrefixUnaryExpression(node: Node): node is PrefixUnaryExpression;
    function isPostfixUnaryExpression(node: Node): node is PostfixUnaryExpression;
    function isBinaryExpression(node: Node): node is BinaryExpression;
    function isConditionalExpression(node: Node): node is ConditionalExpression;
    function isTemplateExpression(node: Node): node is TemplateExpression;
    function isYieldExpression(node: Node): node is YieldExpression;
    function isSpreadElement(node: Node): node is SpreadElement;
    function isClassExpression(node: Node): node is ClassExpression;
    function isOmittedExpression(node: Node): node is OmittedExpression;
    function isExpressionWithTypeArguments(node: Node): node is ExpressionWithTypeArguments;
    function isAsExpression(node: Node): node is AsExpression;
    function isNonNullExpression(node: Node): node is NonNullExpression;
    function isMetaProperty(node: Node): node is MetaProperty;
    function isTemplateSpan(node: Node): node is TemplateSpan;
    function isSemicolonClassElement(node: Node): node is SemicolonClassElement;
    function isBlock(node: Node): node is Block;
    function isVariableStatement(node: Node): node is VariableStatement;
    function isEmptyStatement(node: Node): node is EmptyStatement;
    function isExpressionStatement(node: Node): node is ExpressionStatement;
    function isIfStatement(node: Node): node is IfStatement;
    function isDoStatement(node: Node): node is DoStatement;
    function isWhileStatement(node: Node): node is WhileStatement;
    function isForStatement(node: Node): node is ForStatement;
    function isForInStatement(node: Node): node is ForInStatement;
    function isForOfStatement(node: Node): node is ForOfStatement;
    function isContinueStatement(node: Node): node is ContinueStatement;
    function isBreakStatement(node: Node): node is BreakStatement;
    function isReturnStatement(node: Node): node is ReturnStatement;
    function isWithStatement(node: Node): node is WithStatement;
    function isSwitchStatement(node: Node): node is SwitchStatement;
    function isLabeledStatement(node: Node): node is LabeledStatement;
    function isThrowStatement(node: Node): node is ThrowStatement;
    function isTryStatement(node: Node): node is TryStatement;
    function isDebuggerStatement(node: Node): node is DebuggerStatement;
    function isVariableDeclaration(node: Node): node is VariableDeclaration;
    function isVariableDeclarationList(node: Node): node is VariableDeclarationList;
    function isFunctionDeclaration(node: Node): node is FunctionDeclaration;
    function isClassDeclaration(node: Node): node is ClassDeclaration;
    function isInterfaceDeclaration(node: Node): node is InterfaceDeclaration;
    function isTypeAliasDeclaration(node: Node): node is TypeAliasDeclaration;
    function isEnumDeclaration(node: Node): node is EnumDeclaration;
    function isModuleDeclaration(node: Node): node is ModuleDeclaration;
    function isModuleBlock(node: Node): node is ModuleBlock;
    function isCaseBlock(node: Node): node is CaseBlock;
    function isNamespaceExportDeclaration(node: Node): node is NamespaceExportDeclaration;
    function isImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration;
    function isImportDeclaration(node: Node): node is ImportDeclaration;
    function isImportClause(node: Node): node is ImportClause;
    function isNamespaceImport(node: Node): node is NamespaceImport;
    function isNamedImports(node: Node): node is NamedImports;
    function isImportSpecifier(node: Node): node is ImportSpecifier;
    function isExportAssignment(node: Node): node is ExportAssignment;
    function isExportDeclaration(node: Node): node is ExportDeclaration;
    function isNamedExports(node: Node): node is NamedExports;
    function isExportSpecifier(node: Node): node is ExportSpecifier;
    function isMissingDeclaration(node: Node): node is MissingDeclaration;
    function isExternalModuleReference(node: Node): node is ExternalModuleReference;
    function isJsxElement(node: Node): node is JsxElement;
    function isJsxSelfClosingElement(node: Node): node is JsxSelfClosingElement;
    function isJsxOpeningElement(node: Node): node is JsxOpeningElement;
    function isJsxClosingElement(node: Node): node is JsxClosingElement;
    function isJsxAttribute(node: Node): node is JsxAttribute;
    function isJsxAttributes(node: Node): node is JsxAttributes;
    function isJsxSpreadAttribute(node: Node): node is JsxSpreadAttribute;
    function isJsxExpression(node: Node): node is JsxExpression;
    function isCaseClause(node: Node): node is CaseClause;
    function isDefaultClause(node: Node): node is DefaultClause;
    function isHeritageClause(node: Node): node is HeritageClause;
    function isCatchClause(node: Node): node is CatchClause;
    function isPropertyAssignment(node: Node): node is PropertyAssignment;
    function isShorthandPropertyAssignment(node: Node): node is ShorthandPropertyAssignment;
    function isSpreadAssignment(node: Node): node is SpreadAssignment;
    function isEnumMember(node: Node): node is EnumMember;
    function isSourceFile(node: Node): node is SourceFile;
    function isBundle(node: Node): node is Bundle;
    function isJSDocTypeExpression(node: Node): node is JSDocTypeExpression;
    function isJSDocAllType(node: JSDocAllType): node is JSDocAllType;
    function isJSDocUnknownType(node: Node): node is JSDocUnknownType;
    function isJSDocArrayType(node: Node): node is JSDocArrayType;
    function isJSDocUnionType(node: Node): node is JSDocUnionType;
    function isJSDocTupleType(node: Node): node is JSDocTupleType;
    function isJSDocNullableType(node: Node): node is JSDocNullableType;
    function isJSDocNonNullableType(node: Node): node is JSDocNonNullableType;
    function isJSDocRecordType(node: Node): node is JSDocRecordType;
    function isJSDocRecordMember(node: Node): node is JSDocRecordMember;
    function isJSDocTypeReference(node: Node): node is JSDocTypeReference;
    function isJSDocOptionalType(node: Node): node is JSDocOptionalType;
    function isJSDocFunctionType(node: Node): node is JSDocFunctionType;
    function isJSDocVariadicType(node: Node): node is JSDocVariadicType;
    function isJSDocConstructorType(node: Node): node is JSDocConstructorType;
    function isJSDocThisType(node: Node): node is JSDocThisType;
    function isJSDoc(node: Node): node is JSDoc;
    function isJSDocAugmentsTag(node: Node): node is JSDocAugmentsTag;
    function isJSDocParameterTag(node: Node): node is JSDocParameterTag;
    function isJSDocReturnTag(node: Node): node is JSDocReturnTag;
    function isJSDocTypeTag(node: Node): node is JSDocTypeTag;
    function isJSDocTemplateTag(node: Node): node is JSDocTemplateTag;
    function isJSDocTypedefTag(node: Node): node is JSDocTypedefTag;
    function isJSDocPropertyTag(node: Node): node is JSDocPropertyTag;
    function isJSDocTypeLiteral(node: Node): node is JSDocTypeLiteral;
    function isJSDocLiteralType(node: Node): node is JSDocLiteralType;
}
declare namespace ts {
    function isNode(node: Node): boolean;
    function isNodeKind(kind: SyntaxKind): boolean;
    function isToken(n: Node): boolean;
    function isNodeArray<T extends Node>(array: T[]): array is NodeArray<T>;
    function isLiteralKind(kind: SyntaxKind): boolean;
    function isLiteralExpression(node: Node): node is LiteralExpression;
    function isTemplateLiteralKind(kind: SyntaxKind): boolean;
    function isTemplateMiddleOrTemplateTail(node: Node): node is TemplateMiddle | TemplateTail;
    function isGeneratedIdentifier(node: Node): node is GeneratedIdentifier;
    function isModifierKind(token: SyntaxKind): boolean;
    function isModifier(node: Node): node is Modifier;
    function isEntityName(node: Node): node is EntityName;
    function isPropertyName(node: Node): node is PropertyName;
    function isBindingName(node: Node): node is BindingName;
    function isFunctionLike(node: Node): node is FunctionLikeDeclaration;
    function isFunctionLikeKind(kind: SyntaxKind): boolean;
    function isClassElement(node: Node): node is ClassElement;
    function isClassLike(node: Node): node is ClassLikeDeclaration;
    function isAccessor(node: Node): node is AccessorDeclaration;
    function isTypeElement(node: Node): node is TypeElement;
    function isObjectLiteralElementLike(node: Node): node is ObjectLiteralElementLike;
    function isTypeNode(node: Node): node is TypeNode;
    function isFunctionOrConstructorTypeNode(node: Node): node is FunctionTypeNode | ConstructorTypeNode;
    function isBindingPattern(node: Node): node is BindingPattern;
    function isAssignmentPattern(node: Node): node is AssignmentPattern;
    function isArrayBindingElement(node: Node): node is ArrayBindingElement;
    function isDeclarationBindingElement(bindingElement: BindingOrAssignmentElement): bindingElement is VariableDeclaration | ParameterDeclaration | BindingElement;
    function isBindingOrAssignmentPattern(node: BindingOrAssignmentElementTarget): node is BindingOrAssignmentPattern;
    function isObjectBindingOrAssignmentPattern(node: BindingOrAssignmentElementTarget): node is ObjectBindingOrAssignmentPattern;
    function isArrayBindingOrAssignmentPattern(node: BindingOrAssignmentElementTarget): node is ArrayBindingOrAssignmentPattern;
    function isPropertyAccessOrQualifiedName(node: Node): node is PropertyAccessExpression | QualifiedName;
    function isCallLikeExpression(node: Node): node is CallLikeExpression;
    function isCallOrNewExpression(node: Node): node is CallExpression | NewExpression;
    function isTemplateLiteral(node: Node): node is TemplateLiteral;
    function isLeftHandSideExpression(node: Node): node is LeftHandSideExpression;
    function isUnaryExpression(node: Node): node is UnaryExpression;
    function isExpression(node: Node): node is Expression;
    function isAssertionExpression(node: Node): node is AssertionExpression;
    function isPartiallyEmittedExpression(node: Node): node is PartiallyEmittedExpression;
    function isNotEmittedStatement(node: Node): node is NotEmittedStatement;
    function isNotEmittedOrPartiallyEmittedNode(node: Node): node is NotEmittedStatement | PartiallyEmittedExpression;
    function isIterationStatement(node: Node, lookInLabeledStatements: boolean): node is IterationStatement;
    function isConciseBody(node: Node): node is ConciseBody;
    function isFunctionBody(node: Node): node is FunctionBody;
    function isForInitializer(node: Node): node is ForInitializer;
    function isModuleBody(node: Node): node is ModuleBody;
    function isNamespaceBody(node: Node): node is NamespaceBody;
    function isJSDocNamespaceBody(node: Node): node is JSDocNamespaceBody;
    function isNamedImportBindings(node: Node): node is NamedImportBindings;
    function isModuleOrEnumDeclaration(node: Node): node is ModuleDeclaration | EnumDeclaration;
    function isDeclaration(node: Node): node is NamedDeclaration;
    function isDeclarationStatement(node: Node): node is DeclarationStatement;
    function isStatementButNotDeclaration(node: Node): node is Statement;
    function isStatement(node: Node): node is Statement;
    function isModuleReference(node: Node): node is ModuleReference;
    function isJsxTagNameExpression(node: Node): node is JsxTagNameExpression;
    function isJsxChild(node: Node): node is JsxChild;
    function isJsxAttributeLike(node: Node): node is JsxAttributeLike;
    function isStringLiteralOrJsxExpression(node: Node): node is StringLiteral | JsxExpression;
    function isJsxOpeningLikeElement(node: Node): node is JsxOpeningLikeElement;
    function isCaseOrDefaultClause(node: Node): node is CaseOrDefaultClause;
    function isJSDocNode(node: Node): boolean;
    function isJSDocCommentContainingNode(node: Node): boolean;
    function isJSDocTag(node: Node): boolean;
}
declare namespace ts {
    function updateNode<T extends Node>(updated: T, original: T): T;
    function createNodeArray<T extends Node>(elements?: T[], hasTrailingComma?: boolean): NodeArray<T>;
    function getSynthesizedClone<T extends Node>(node: T | undefined): T;
    function createLiteral(value: string): StringLiteral;
    function createLiteral(value: number): NumericLiteral;
    function createLiteral(value: boolean): BooleanLiteral;
    function createLiteral(sourceNode: StringLiteral | NumericLiteral | Identifier): StringLiteral;
    function createLiteral(value: string | number | boolean): PrimaryExpression;
    function createNumericLiteral(value: string): NumericLiteral;
    function createIdentifier(text: string): Identifier;
    function createIdentifier(text: string, typeArguments: TypeNode[]): Identifier;
    function updateIdentifier(node: Identifier, typeArguments: NodeArray<TypeNode> | undefined): Identifier;
    function createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined): Identifier;
    function createLoopVariable(): Identifier;
    function createUniqueName(text: string): Identifier;
    function getGeneratedNameForNode(node: Node): Identifier;
    function createToken<TKind extends SyntaxKind>(token: TKind): Token<TKind>;
    function createSuper(): SuperExpression;
    function createThis(): ThisExpression & Token<SyntaxKind.ThisKeyword>;
    function createNull(): NullLiteral & Token<SyntaxKind.NullKeyword>;
    function createTrue(): BooleanLiteral & Token<SyntaxKind.TrueKeyword>;
    function createFalse(): BooleanLiteral & Token<SyntaxKind.FalseKeyword>;
    function createQualifiedName(left: EntityName, right: string | Identifier): QualifiedName;
    function updateQualifiedName(node: QualifiedName, left: EntityName, right: Identifier): QualifiedName;
    function createComputedPropertyName(expression: Expression): ComputedPropertyName;
    function updateComputedPropertyName(node: ComputedPropertyName, expression: Expression): ComputedPropertyName;
    function createTypeParameterDeclaration(name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration;
    function updateTypeParameterDeclaration(node: TypeParameterDeclaration, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration;
    function createParameter(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken, type?: TypeNode, initializer?: Expression): ParameterDeclaration;
    function updateParameter(node: ParameterDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration;
    function createDecorator(expression: Expression): Decorator;
    function updateDecorator(node: Decorator, expression: Expression): Decorator;
    function createPropertySignature(modifiers: Modifier[] | undefined, name: PropertyName | string, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertySignature;
    function updatePropertySignature(node: PropertySignature, modifiers: Modifier[] | undefined, name: PropertyName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertySignature;
    function createProperty(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
    function updateProperty(node: PropertyDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: PropertyName, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
    function createMethodSignature(typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined): MethodSignature;
    function updateMethodSignature(node: MethodSignature, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined, name: PropertyName, questionToken: QuestionToken | undefined): MethodSignature;
    function createMethod(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
    function updateMethod(node: MethodDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
    function createConstructor(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, parameters: ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
    function updateConstructor(node: ConstructorDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, parameters: ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
    function createGetAccessor(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: string | PropertyName, parameters: ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
    function updateGetAccessor(node: GetAccessorDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: PropertyName, parameters: ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
    function createSetAccessor(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: string | PropertyName, parameters: ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
    function updateSetAccessor(node: SetAccessorDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: PropertyName, parameters: ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
    function createCallSignature(typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined): CallSignatureDeclaration;
    function updateCallSignature(node: CallSignatureDeclaration, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined): CallSignatureDeclaration;
    function createConstructSignature(typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined): ConstructSignatureDeclaration;
    function updateConstructSignature(node: ConstructSignatureDeclaration, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined): ConstructSignatureDeclaration;
    function createIndexSignature(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, parameters: ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
    function updateIndexSignature(node: IndexSignatureDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, parameters: ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
    function createSignatureDeclaration(kind: SyntaxKind, typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined): SignatureDeclaration;
    function createKeywordTypeNode(kind: KeywordTypeNode["kind"]): KeywordTypeNode;
    function createTypePredicateNode(parameterName: Identifier | ThisTypeNode | string, type: TypeNode): TypePredicateNode;
    function updateTypePredicateNode(node: TypePredicateNode, parameterName: Identifier | ThisTypeNode, type: TypeNode): TypePredicateNode;
    function createTypeReferenceNode(typeName: string | EntityName, typeArguments: TypeNode[] | undefined): TypeReferenceNode;
    function updateTypeReferenceNode(node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined): TypeReferenceNode;
    function createFunctionTypeNode(typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined): FunctionTypeNode;
    function updateFunctionTypeNode(node: FunctionTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined): FunctionTypeNode;
    function createConstructorTypeNode(typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined): ConstructorTypeNode;
    function updateConstructorTypeNode(node: ConstructorTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined): ConstructorTypeNode;
    function createTypeQueryNode(exprName: EntityName): TypeQueryNode;
    function updateTypeQueryNode(node: TypeQueryNode, exprName: EntityName): TypeQueryNode;
    function createTypeLiteralNode(members: TypeElement[]): TypeLiteralNode;
    function updateTypeLiteralNode(node: TypeLiteralNode, members: NodeArray<TypeElement>): TypeLiteralNode;
    function createArrayTypeNode(elementType: TypeNode): ArrayTypeNode;
    function updateArrayTypeNode(node: ArrayTypeNode, elementType: TypeNode): ArrayTypeNode;
    function createTupleTypeNode(elementTypes: TypeNode[]): TupleTypeNode;
    function updateTypleTypeNode(node: TupleTypeNode, elementTypes: TypeNode[]): TupleTypeNode;
    function createUnionTypeNode(types: TypeNode[]): UnionTypeNode;
    function updateUnionTypeNode(node: UnionTypeNode, types: NodeArray<TypeNode>): UnionTypeNode;
    function createIntersectionTypeNode(types: TypeNode[]): IntersectionTypeNode;
    function updateIntersectionTypeNode(node: IntersectionTypeNode, types: NodeArray<TypeNode>): IntersectionTypeNode;
    function createUnionOrIntersectionTypeNode(kind: SyntaxKind.UnionType | SyntaxKind.IntersectionType, types: TypeNode[]): UnionTypeNode | IntersectionTypeNode;
    function createParenthesizedType(type: TypeNode): ParenthesizedTypeNode;
    function updateParenthesizedType(node: ParenthesizedTypeNode, type: TypeNode): ParenthesizedTypeNode;
    function createThisTypeNode(): ThisTypeNode;
    function createTypeOperatorNode(type: TypeNode): TypeOperatorNode;
    function updateTypeOperatorNode(node: TypeOperatorNode, type: TypeNode): TypeOperatorNode;
    function createIndexedAccessTypeNode(objectType: TypeNode, indexType: TypeNode): IndexedAccessTypeNode;
    function updateIndexedAccessTypeNode(node: IndexedAccessTypeNode, objectType: TypeNode, indexType: TypeNode): IndexedAccessTypeNode;
    function createMappedTypeNode(readonlyToken: ReadonlyToken | undefined, typeParameter: TypeParameterDeclaration, questionToken: QuestionToken | undefined, type: TypeNode | undefined): MappedTypeNode;
    function updateMappedTypeNode(node: MappedTypeNode, readonlyToken: ReadonlyToken | undefined, typeParameter: TypeParameterDeclaration, questionToken: QuestionToken | undefined, type: TypeNode | undefined): MappedTypeNode;
    function createLiteralTypeNode(literal: Expression): LiteralTypeNode;
    function updateLiteralTypeNode(node: LiteralTypeNode, literal: Expression): LiteralTypeNode;
    function createObjectBindingPattern(elements: BindingElement[]): ObjectBindingPattern;
    function updateObjectBindingPattern(node: ObjectBindingPattern, elements: BindingElement[]): ObjectBindingPattern;
    function createArrayBindingPattern(elements: ArrayBindingElement[]): ArrayBindingPattern;
    function updateArrayBindingPattern(node: ArrayBindingPattern, elements: ArrayBindingElement[]): ArrayBindingPattern;
    function createBindingElement(dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression): BindingElement;
    function updateBindingElement(node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined): BindingElement;
    function createArrayLiteral(elements?: Expression[], multiLine?: boolean): ArrayLiteralExpression;
    function updateArrayLiteral(node: ArrayLiteralExpression, elements: Expression[]): ArrayLiteralExpression;
    function createObjectLiteral(properties?: ObjectLiteralElementLike[], multiLine?: boolean): ObjectLiteralExpression;
    function updateObjectLiteral(node: ObjectLiteralExpression, properties: ObjectLiteralElementLike[]): ObjectLiteralExpression;
    function createPropertyAccess(expression: Expression, name: string | Identifier): PropertyAccessExpression;
    function updatePropertyAccess(node: PropertyAccessExpression, expression: Expression, name: Identifier): PropertyAccessExpression;
    function createElementAccess(expression: Expression, index: number | Expression): ElementAccessExpression;
    function updateElementAccess(node: ElementAccessExpression, expression: Expression, argumentExpression: Expression): ElementAccessExpression;
    function createCall(expression: Expression, typeArguments: TypeNode[] | undefined, argumentsArray: Expression[]): CallExpression;
    function updateCall(node: CallExpression, expression: Expression, typeArguments: TypeNode[] | undefined, argumentsArray: Expression[]): CallExpression;
    function createNew(expression: Expression, typeArguments: TypeNode[] | undefined, argumentsArray: Expression[] | undefined): NewExpression;
    function updateNew(node: NewExpression, expression: Expression, typeArguments: TypeNode[] | undefined, argumentsArray: Expression[] | undefined): NewExpression;
    function createTaggedTemplate(tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
    function updateTaggedTemplate(node: TaggedTemplateExpression, tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
    function createTypeAssertion(type: TypeNode, expression: Expression): TypeAssertion;
    function updateTypeAssertion(node: TypeAssertion, type: TypeNode, expression: Expression): TypeAssertion;
    function createParen(expression: Expression): ParenthesizedExpression;
    function updateParen(node: ParenthesizedExpression, expression: Expression): ParenthesizedExpression;
    function createFunctionExpression(modifiers: Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined, body: Block): FunctionExpression;
    function updateFunctionExpression(node: FunctionExpression, modifiers: Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined, body: Block): FunctionExpression;
    function createArrowFunction(modifiers: Modifier[] | undefined, typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken | undefined, body: ConciseBody): ArrowFunction;
    function updateArrowFunction(node: ArrowFunction, modifiers: Modifier[] | undefined, typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction;
    function createDelete(expression: Expression): DeleteExpression;
    function updateDelete(node: DeleteExpression, expression: Expression): DeleteExpression;
    function createTypeOf(expression: Expression): TypeOfExpression;
    function updateTypeOf(node: TypeOfExpression, expression: Expression): TypeOfExpression;
    function createVoid(expression: Expression): VoidExpression;
    function updateVoid(node: VoidExpression, expression: Expression): VoidExpression;
    function createAwait(expression: Expression): AwaitExpression;
    function updateAwait(node: AwaitExpression, expression: Expression): AwaitExpression;
    function createPrefix(operator: PrefixUnaryOperator, operand: Expression): PrefixUnaryExpression;
    function updatePrefix(node: PrefixUnaryExpression, operand: Expression): PrefixUnaryExpression;
    function createPostfix(operand: Expression, operator: PostfixUnaryOperator): PostfixUnaryExpression;
    function updatePostfix(node: PostfixUnaryExpression, operand: Expression): PostfixUnaryExpression;
    function createBinary(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression): BinaryExpression;
    function updateBinary(node: BinaryExpression, left: Expression, right: Expression, operator?: BinaryOperator | BinaryOperatorToken): BinaryExpression;
    function createConditional(condition: Expression, whenTrue: Expression, whenFalse: Expression): ConditionalExpression;
    function createConditional(condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression;
    function updateConditional(node: ConditionalExpression, condition: Expression, whenTrue: Expression, whenFalse: Expression): ConditionalExpression;
    function createTemplateExpression(head: TemplateHead, templateSpans: TemplateSpan[]): TemplateExpression;
    function updateTemplateExpression(node: TemplateExpression, head: TemplateHead, templateSpans: TemplateSpan[]): TemplateExpression;
    function createYield(expression?: Expression): YieldExpression;
    function createYield(asteriskToken: AsteriskToken, expression: Expression): YieldExpression;
    function updateYield(node: YieldExpression, asteriskToken: AsteriskToken | undefined, expression: Expression): YieldExpression;
    function createSpread(expression: Expression): SpreadElement;
    function updateSpread(node: SpreadElement, expression: Expression): SpreadElement;
    function createClassExpression(modifiers: Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: TypeParameterDeclaration[] | undefined, heritageClauses: HeritageClause[], members: ClassElement[]): ClassExpression;
    function updateClassExpression(node: ClassExpression, modifiers: Modifier[] | undefined, name: Identifier | undefined, typeParameters: TypeParameterDeclaration[] | undefined, heritageClauses: HeritageClause[], members: ClassElement[]): ClassExpression;
    function createOmittedExpression(): OmittedExpression;
    function createExpressionWithTypeArguments(typeArguments: TypeNode[], expression: Expression): ExpressionWithTypeArguments;
    function updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, typeArguments: TypeNode[], expression: Expression): ExpressionWithTypeArguments;
    function createAsExpression(expression: Expression, type: TypeNode): AsExpression;
    function updateAsExpression(node: AsExpression, expression: Expression, type: TypeNode): AsExpression;
    function createNonNullExpression(expression: Expression): NonNullExpression;
    function updateNonNullExpression(node: NonNullExpression, expression: Expression): NonNullExpression;
    function createMetaProperty(keywordToken: MetaProperty["keywordToken"], name: Identifier): MetaProperty;
    function updateMetaProperty(node: MetaProperty, name: Identifier): MetaProperty;
    function createTemplateSpan(expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan;
    function updateTemplateSpan(node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan;
    function createSemicolonClassElement(): SemicolonClassElement;
    function createBlock(statements: Statement[], multiLine?: boolean): Block;
    function updateBlock(node: Block, statements: Statement[]): Block;
    function createVariableStatement(modifiers: Modifier[] | undefined, declarationList: VariableDeclarationList | VariableDeclaration[]): VariableStatement;
    function updateVariableStatement(node: VariableStatement, modifiers: Modifier[] | undefined, declarationList: VariableDeclarationList): VariableStatement;
    function createEmptyStatement(): EmptyStatement;
    function createStatement(expression: Expression): ExpressionStatement;
    function updateStatement(node: ExpressionStatement, expression: Expression): ExpressionStatement;
    function createIf(expression: Expression, thenStatement: Statement, elseStatement?: Statement): IfStatement;
    function updateIf(node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement | undefined): IfStatement;
    function createDo(statement: Statement, expression: Expression): DoStatement;
    function updateDo(node: DoStatement, statement: Statement, expression: Expression): DoStatement;
    function createWhile(expression: Expression, statement: Statement): WhileStatement;
    function updateWhile(node: WhileStatement, expression: Expression, statement: Statement): WhileStatement;
    function createFor(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement;
    function updateFor(node: ForStatement, initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement;
    function createForIn(initializer: ForInitializer, expression: Expression, statement: Statement): ForInStatement;
    function updateForIn(node: ForInStatement, initializer: ForInitializer, expression: Expression, statement: Statement): ForInStatement;
    function createForOf(awaitModifier: AwaitKeywordToken, initializer: ForInitializer, expression: Expression, statement: Statement): ForOfStatement;
    function updateForOf(node: ForOfStatement, awaitModifier: AwaitKeywordToken, initializer: ForInitializer, expression: Expression, statement: Statement): ForOfStatement;
    function createContinue(label?: string | Identifier): ContinueStatement;
    function updateContinue(node: ContinueStatement, label: Identifier | undefined): ContinueStatement;
    function createBreak(label?: string | Identifier): BreakStatement;
    function updateBreak(node: BreakStatement, label: Identifier | undefined): BreakStatement;
    function createReturn(expression?: Expression): ReturnStatement;
    function updateReturn(node: ReturnStatement, expression: Expression | undefined): ReturnStatement;
    function createWith(expression: Expression, statement: Statement): WithStatement;
    function updateWith(node: WithStatement, expression: Expression, statement: Statement): WithStatement;
    function createSwitch(expression: Expression, caseBlock: CaseBlock): SwitchStatement;
    function updateSwitch(node: SwitchStatement, expression: Expression, caseBlock: CaseBlock): SwitchStatement;
    function createLabel(label: string | Identifier, statement: Statement): LabeledStatement;
    function updateLabel(node: LabeledStatement, label: Identifier, statement: Statement): LabeledStatement;
    function createThrow(expression: Expression): ThrowStatement;
    function updateThrow(node: ThrowStatement, expression: Expression): ThrowStatement;
    function createTry(tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined): TryStatement;
    function updateTry(node: TryStatement, tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined): TryStatement;
    function createDebuggerStatement(): DebuggerStatement;
    function createVariableDeclaration(name: string | BindingName, type?: TypeNode, initializer?: Expression): VariableDeclaration;
    function updateVariableDeclaration(node: VariableDeclaration, name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    function createVariableDeclarationList(declarations: VariableDeclaration[], flags?: NodeFlags): VariableDeclarationList;
    function updateVariableDeclarationList(node: VariableDeclarationList, declarations: VariableDeclaration[]): VariableDeclarationList;
    function createFunctionDeclaration(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
    function updateFunctionDeclaration(node: FunctionDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
    function createClassDeclaration(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: TypeParameterDeclaration[] | undefined, heritageClauses: HeritageClause[], members: ClassElement[]): ClassDeclaration;
    function updateClassDeclaration(node: ClassDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: Identifier | undefined, typeParameters: TypeParameterDeclaration[] | undefined, heritageClauses: HeritageClause[], members: ClassElement[]): ClassDeclaration;
    function createInterfaceDeclaration(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: string | Identifier, typeParameters: TypeParameterDeclaration[] | undefined, heritageClauses: HeritageClause[] | undefined, members: TypeElement[]): InterfaceDeclaration;
    function updateInterfaceDeclaration(node: InterfaceDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: Identifier, typeParameters: TypeParameterDeclaration[] | undefined, heritageClauses: HeritageClause[] | undefined, members: TypeElement[]): InterfaceDeclaration;
    function createTypeAliasDeclaration(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: string | Identifier, typeParameters: TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
    function updateTypeAliasDeclaration(node: TypeAliasDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: Identifier, typeParameters: TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
    function createEnumDeclaration(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: string | Identifier, members: EnumMember[]): EnumDeclaration;
    function updateEnumDeclaration(node: EnumDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: Identifier, members: EnumMember[]): EnumDeclaration;
    function createModuleDeclaration(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags?: NodeFlags): ModuleDeclaration;
    function updateModuleDeclaration(node: ModuleDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined): ModuleDeclaration;
    function createModuleBlock(statements: Statement[]): ModuleBlock;
    function updateModuleBlock(node: ModuleBlock, statements: Statement[]): ModuleBlock;
    function createCaseBlock(clauses: CaseOrDefaultClause[]): CaseBlock;
    function updateCaseBlock(node: CaseBlock, clauses: CaseOrDefaultClause[]): CaseBlock;
    function createNamespaceExportDeclaration(name: string | Identifier): NamespaceExportDeclaration;
    function updateNamespaceExportDeclaration(node: NamespaceExportDeclaration, name: Identifier): NamespaceExportDeclaration;
    function createImportEqualsDeclaration(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: string | Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
    function updateImportEqualsDeclaration(node: ImportEqualsDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
    function createImportDeclaration(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier?: Expression): ImportDeclaration;
    function updateImportDeclaration(node: ImportDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression | undefined): ImportDeclaration;
    function createImportClause(name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause;
    function updateImportClause(node: ImportClause, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause;
    function createNamespaceImport(name: Identifier): NamespaceImport;
    function updateNamespaceImport(node: NamespaceImport, name: Identifier): NamespaceImport;
    function createNamedImports(elements: ImportSpecifier[]): NamedImports;
    function updateNamedImports(node: NamedImports, elements: ImportSpecifier[]): NamedImports;
    function createImportSpecifier(propertyName: Identifier | undefined, name: Identifier): ImportSpecifier;
    function updateImportSpecifier(node: ImportSpecifier, propertyName: Identifier | undefined, name: Identifier): ImportSpecifier;
    function createExportAssignment(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, isExportEquals: boolean, expression: Expression): ExportAssignment;
    function updateExportAssignment(node: ExportAssignment, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, expression: Expression): ExportAssignment;
    function createExportDeclaration(decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, exportClause: NamedExports | undefined, moduleSpecifier?: Expression): ExportDeclaration;
    function updateExportDeclaration(node: ExportDeclaration, decorators: Decorator[] | undefined, modifiers: Modifier[] | undefined, exportClause: NamedExports | undefined, moduleSpecifier: Expression | undefined): ExportDeclaration;
    function createNamedExports(elements: ExportSpecifier[]): NamedExports;
    function updateNamedExports(node: NamedExports, elements: ExportSpecifier[]): NamedExports;
    function createExportSpecifier(propertyName: string | Identifier | undefined, name: string | Identifier): ExportSpecifier;
    function updateExportSpecifier(node: ExportSpecifier, propertyName: Identifier | undefined, name: Identifier): ExportSpecifier;
    function createExternalModuleReference(expression: Expression): ExternalModuleReference;
    function updateExternalModuleReference(node: ExternalModuleReference, expression: Expression): ExternalModuleReference;
    function createJsxElement(openingElement: JsxOpeningElement, children: JsxChild[], closingElement: JsxClosingElement): JsxElement;
    function updateJsxElement(node: JsxElement, openingElement: JsxOpeningElement, children: JsxChild[], closingElement: JsxClosingElement): JsxElement;
    function createJsxSelfClosingElement(tagName: JsxTagNameExpression, attributes: JsxAttributes): JsxSelfClosingElement;
    function updateJsxSelfClosingElement(node: JsxSelfClosingElement, tagName: JsxTagNameExpression, attributes: JsxAttributes): JsxSelfClosingElement;
    function createJsxOpeningElement(tagName: JsxTagNameExpression, attributes: JsxAttributes): JsxOpeningElement;
    function updateJsxOpeningElement(node: JsxOpeningElement, tagName: JsxTagNameExpression, attributes: JsxAttributes): JsxOpeningElement;
    function createJsxClosingElement(tagName: JsxTagNameExpression): JsxClosingElement;
    function updateJsxClosingElement(node: JsxClosingElement, tagName: JsxTagNameExpression): JsxClosingElement;
    function createJsxAttribute(name: Identifier, initializer: StringLiteral | JsxExpression): JsxAttribute;
    function updateJsxAttribute(node: JsxAttribute, name: Identifier, initializer: StringLiteral | JsxExpression): JsxAttribute;
    function createJsxAttributes(properties: JsxAttributeLike[]): JsxAttributes;
    function updateJsxAttributes(node: JsxAttributes, properties: JsxAttributeLike[]): JsxAttributes;
    function createJsxSpreadAttribute(expression: Expression): JsxSpreadAttribute;
    function updateJsxSpreadAttribute(node: JsxSpreadAttribute, expression: Expression): JsxSpreadAttribute;
    function createJsxExpression(dotDotDotToken: DotDotDotToken | undefined, expression: Expression | undefined): JsxExpression;
    function updateJsxExpression(node: JsxExpression, expression: Expression | undefined): JsxExpression;
    function createCaseClause(expression: Expression, statements: Statement[]): CaseClause;
    function updateCaseClause(node: CaseClause, expression: Expression, statements: Statement[]): CaseClause;
    function createDefaultClause(statements: Statement[]): DefaultClause;
    function updateDefaultClause(node: DefaultClause, statements: Statement[]): DefaultClause;
    function createHeritageClause(token: HeritageClause["token"], types: ExpressionWithTypeArguments[]): HeritageClause;
    function updateHeritageClause(node: HeritageClause, types: ExpressionWithTypeArguments[]): HeritageClause;
    function createCatchClause(variableDeclaration: string | VariableDeclaration, block: Block): CatchClause;
    function updateCatchClause(node: CatchClause, variableDeclaration: VariableDeclaration, block: Block): CatchClause;
    function createPropertyAssignment(name: string | PropertyName, initializer: Expression): PropertyAssignment;
    function updatePropertyAssignment(node: PropertyAssignment, name: PropertyName, initializer: Expression): PropertyAssignment;
    function createShorthandPropertyAssignment(name: string | Identifier, objectAssignmentInitializer?: Expression): ShorthandPropertyAssignment;
    function updateShorthandPropertyAssignment(node: ShorthandPropertyAssignment, name: Identifier, objectAssignmentInitializer: Expression | undefined): ShorthandPropertyAssignment;
    function createSpreadAssignment(expression: Expression): SpreadAssignment;
    function updateSpreadAssignment(node: SpreadAssignment, expression: Expression): SpreadAssignment;
    function createEnumMember(name: string | PropertyName, initializer?: Expression): EnumMember;
    function updateEnumMember(node: EnumMember, name: PropertyName, initializer: Expression | undefined): EnumMember;
    function updateSourceFileNode(node: SourceFile, statements: Statement[]): SourceFile;
    function getMutableClone<T extends Node>(node: T): T;
    function createNotEmittedStatement(original: Node): NotEmittedStatement;
    function createEndOfDeclarationMarker(original: Node): EndOfDeclarationMarker;
    function createMergeDeclarationMarker(original: Node): MergeDeclarationMarker;
    function createPartiallyEmittedExpression(expression: Expression, original?: Node): PartiallyEmittedExpression;
    function updatePartiallyEmittedExpression(node: PartiallyEmittedExpression, expression: Expression): PartiallyEmittedExpression;
    function createCommaList(elements: Expression[]): CommaListExpression;
    function updateCommaList(node: CommaListExpression, elements: Expression[]): CommaListExpression;
    function createBundle(sourceFiles: SourceFile[]): Bundle;
    function updateBundle(node: Bundle, sourceFiles: SourceFile[]): Bundle;
    function createImmediatelyInvokedFunctionExpression(statements: Statement[]): CallExpression;
    function createImmediatelyInvokedFunctionExpression(statements: Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
    function createComma(left: Expression, right: Expression): Expression;
    function createLessThan(left: Expression, right: Expression): Expression;
    function createAssignment(left: ObjectLiteralExpression | ArrayLiteralExpression, right: Expression): DestructuringAssignment;
    function createAssignment(left: Expression, right: Expression): BinaryExpression;
    function createStrictEquality(left: Expression, right: Expression): BinaryExpression;
    function createStrictInequality(left: Expression, right: Expression): BinaryExpression;
    function createAdd(left: Expression, right: Expression): BinaryExpression;
    function createSubtract(left: Expression, right: Expression): BinaryExpression;
    function createPostfixIncrement(operand: Expression): PostfixUnaryExpression;
    function createLogicalAnd(left: Expression, right: Expression): BinaryExpression;
    function createLogicalOr(left: Expression, right: Expression): BinaryExpression;
    function createLogicalNot(operand: Expression): PrefixUnaryExpression;
    function createVoidZero(): VoidExpression;
    function createExportDefault(expression: Expression): ExportAssignment;
    function createExternalModuleExport(exportName: Identifier): ExportDeclaration;
    function disposeEmitNodes(sourceFile: SourceFile): void;
    function getOrCreateEmitNode(node: Node): EmitNode;
    function setTextRange<T extends TextRange>(range: T, location: TextRange | undefined): T;
    function getEmitFlags(node: Node): EmitFlags | undefined;
    function setEmitFlags<T extends Node>(node: T, emitFlags: EmitFlags): T;
    function getSourceMapRange(node: Node): SourceMapRange;
    function setSourceMapRange<T extends Node>(node: T, range: SourceMapRange | undefined): T;
    function createSourceMapSource(fileName: string, text: string, skipTrivia?: (pos: number) => number): SourceMapSource;
    function getTokenSourceMapRange(node: Node, token: SyntaxKind): SourceMapRange | undefined;
    function setTokenSourceMapRange<T extends Node>(node: T, token: SyntaxKind, range: SourceMapRange | undefined): T;
    function getCommentRange(node: Node): TextRange;
    function setCommentRange<T extends Node>(node: T, range: TextRange): T;
    function getSyntheticLeadingComments(node: Node): SynthesizedComment[] | undefined;
    function setSyntheticLeadingComments<T extends Node>(node: T, comments: SynthesizedComment[]): T;
    function addSyntheticLeadingComment<T extends Node>(node: T, kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia, text: string, hasTrailingNewLine?: boolean): T;
    function getSyntheticTrailingComments(node: Node): SynthesizedComment[] | undefined;
    function setSyntheticTrailingComments<T extends Node>(node: T, comments: SynthesizedComment[]): T;
    function addSyntheticTrailingComment<T extends Node>(node: T, kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia, text: string, hasTrailingNewLine?: boolean): T;
    function getConstantValue(node: PropertyAccessExpression | ElementAccessExpression): string | number;
    function setConstantValue(node: PropertyAccessExpression | ElementAccessExpression, value: string | number): PropertyAccessExpression | ElementAccessExpression;
    function addEmitHelper<T extends Node>(node: T, helper: EmitHelper): T;
    function addEmitHelpers<T extends Node>(node: T, helpers: EmitHelper[] | undefined): T;
    function removeEmitHelper(node: Node, helper: EmitHelper): boolean;
    function getEmitHelpers(node: Node): EmitHelper[] | undefined;
    function moveEmitHelpers(source: Node, target: Node, predicate: (helper: EmitHelper) => boolean): void;
    function compareEmitHelpers(x: EmitHelper, y: EmitHelper): Comparison;
    function setOriginalNode<T extends Node>(node: T, original: Node | undefined): T;
}
declare namespace ts {
    const nullTransformationContext: TransformationContext;
    type TypeOfTag = "undefined" | "number" | "boolean" | "string" | "symbol" | "object" | "function";
    function createTypeCheck(value: Expression, tag: TypeOfTag): BinaryExpression;
    function createMemberAccessForPropertyName(target: Expression, memberName: PropertyName, location?: TextRange): MemberExpression;
    function createFunctionCall(func: Expression, thisArg: Expression, argumentsList: Expression[], location?: TextRange): CallExpression;
    function createFunctionApply(func: Expression, thisArg: Expression, argumentsExpression: Expression, location?: TextRange): CallExpression;
    function createArraySlice(array: Expression, start?: number | Expression): CallExpression;
    function createArrayConcat(array: Expression, values: Expression[]): CallExpression;
    function createMathPow(left: Expression, right: Expression, location?: TextRange): CallExpression;
    function createExpressionForJsxElement(jsxFactoryEntity: EntityName, reactNamespace: string, tagName: Expression, props: Expression, children: Expression[], parentElement: JsxOpeningLikeElement, location: TextRange): LeftHandSideExpression;
    function getHelperName(name: string): Identifier;
    function createValuesHelper(context: TransformationContext, expression: Expression, location?: TextRange): CallExpression;
    function createReadHelper(context: TransformationContext, iteratorRecord: Expression, count: number | undefined, location?: TextRange): CallExpression;
    function createSpreadHelper(context: TransformationContext, argumentList: Expression[], location?: TextRange): CallExpression;
    function createForOfBindingStatement(node: ForInitializer, boundValue: Expression): Statement;
    function insertLeadingStatement(dest: Statement, source: Statement): Block;
    function restoreEnclosingLabel(node: Statement, outermostLabeledStatement: LabeledStatement, afterRestoreLabelCallback?: (node: LabeledStatement) => void): Statement;
    interface CallBinding {
        target: LeftHandSideExpression;
        thisArg: Expression;
    }
    function createCallBinding(expression: Expression, recordTempVariable: (temp: Identifier) => void, languageVersion?: ScriptTarget, cacheIdentifiers?: boolean): CallBinding;
    function inlineExpressions(expressions: Expression[]): Expression;
    function createExpressionFromEntityName(node: EntityName | Expression): Expression;
    function createExpressionForPropertyName(memberName: PropertyName): Expression;
    function createExpressionForObjectLiteralElementLike(node: ObjectLiteralExpression, property: ObjectLiteralElementLike, receiver: Expression): Expression;
    function getInternalName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier;
    function isInternalName(node: Identifier): boolean;
    function getLocalName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier;
    function isLocalName(node: Identifier): boolean;
    function getExportName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier;
    function isExportName(node: Identifier): boolean;
    function getDeclarationName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier;
    function getExternalModuleOrNamespaceExportName(ns: Identifier | undefined, node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier | PropertyAccessExpression;
    function getNamespaceMemberName(ns: Identifier, name: Identifier, allowComments?: boolean, allowSourceMaps?: boolean): PropertyAccessExpression;
    function convertToFunctionBody(node: ConciseBody, multiLine?: boolean): Block;
    function convertFunctionDeclarationToExpression(node: FunctionDeclaration): FunctionExpression;
    function addPrologue(target: Statement[], source: Statement[], ensureUseStrict?: boolean, visitor?: (node: Node) => VisitResult<Node>): number;
    function addStandardPrologue(target: Statement[], source: Statement[], ensureUseStrict?: boolean): number;
    function addCustomPrologue(target: Statement[], source: Statement[], statementOffset: number, visitor?: (node: Node) => VisitResult<Node>): number;
    function startsWithUseStrict(statements: Statement[]): boolean;
    function ensureUseStrict(statements: NodeArray<Statement>): NodeArray<Statement>;
    function parenthesizeBinaryOperand(binaryOperator: SyntaxKind, operand: Expression, isLeftSideOfBinary: boolean, leftOperand?: Expression): Expression;
    function parenthesizeForConditionalHead(condition: Expression): Expression;
    function parenthesizeSubexpressionOfConditionalExpression(e: Expression): Expression;
    function parenthesizeForNew(expression: Expression): LeftHandSideExpression;
    function parenthesizeForAccess(expression: Expression): LeftHandSideExpression;
    function parenthesizePostfixOperand(operand: Expression): LeftHandSideExpression;
    function parenthesizePrefixOperand(operand: Expression): UnaryExpression;
    function parenthesizeListElements(elements: NodeArray<Expression>): NodeArray<Expression>;
    function parenthesizeExpressionForList(expression: Expression): Expression;
    function parenthesizeExpressionForExpressionStatement(expression: Expression): Expression;
    function parenthesizeElementTypeMember(member: TypeNode): TypeNode;
    function parenthesizeElementTypeMembers(members: TypeNode[]): NodeArray<TypeNode>;
    function parenthesizeTypeParameters(typeParameters: TypeNode[]): NodeArray<TypeNode>;
    function parenthesizeConciseBody(body: ConciseBody): ConciseBody;
    const enum OuterExpressionKinds {
        Parentheses = 1,
        Assertions = 2,
        PartiallyEmittedExpressions = 4,
        All = 7,
    }
    type OuterExpression = ParenthesizedExpression | TypeAssertion | AsExpression | NonNullExpression | PartiallyEmittedExpression;
    function isOuterExpression(node: Node, kinds?: OuterExpressionKinds): node is OuterExpression;
    function skipOuterExpressions(node: Expression, kinds?: OuterExpressionKinds): Expression;
    function skipOuterExpressions(node: Node, kinds?: OuterExpressionKinds): Node;
    function skipParentheses(node: Expression): Expression;
    function skipParentheses(node: Node): Node;
    function skipAssertions(node: Expression): Expression;
    function skipAssertions(node: Node): Node;
    function skipPartiallyEmittedExpressions(node: Expression): Expression;
    function skipPartiallyEmittedExpressions(node: Node): Node;
    function recreateOuterExpressions(outerExpression: Expression | undefined, innerExpression: Expression, kinds?: OuterExpressionKinds): Expression;
    function startOnNewLine<T extends Node>(node: T): T;
    function getExternalHelpersModuleName(node: SourceFile): Identifier;
    function getOrCreateExternalHelpersModuleNameIfNeeded(node: SourceFile, compilerOptions: CompilerOptions, hasExportStarsToExportValues?: boolean): Identifier;
    function getLocalNameForExternalImport(node: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration, sourceFile: SourceFile): Identifier;
    function getExternalModuleNameLiteral(importNode: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration, sourceFile: SourceFile, host: EmitHost, resolver: EmitResolver, compilerOptions: CompilerOptions): StringLiteral;
    function tryGetModuleNameFromFile(file: SourceFile, host: EmitHost, options: CompilerOptions): StringLiteral;
    function getInitializerOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): Expression | undefined;
    function getTargetOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): BindingOrAssignmentElementTarget;
    function getRestIndicatorOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): BindingOrAssignmentElementRestIndicator;
    function getPropertyNameOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): PropertyName;
    function getElementsOfBindingOrAssignmentPattern(name: BindingOrAssignmentPattern): BindingOrAssignmentElement[];
    function convertToArrayAssignmentElement(element: BindingOrAssignmentElement): Expression;
    function convertToObjectAssignmentElement(element: BindingOrAssignmentElement): ObjectLiteralElementLike;
    function convertToAssignmentPattern(node: BindingOrAssignmentPattern): AssignmentPattern;
    function convertToObjectAssignmentPattern(node: ObjectBindingOrAssignmentPattern): ObjectLiteralExpression;
    function convertToArrayAssignmentPattern(node: ArrayBindingOrAssignmentPattern): ArrayLiteralExpression;
    function convertToAssignmentElementTarget(node: BindingOrAssignmentElementTarget): Expression;
    interface ExternalModuleInfo {
        externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[];
        externalHelpersImportDeclaration: ImportDeclaration | undefined;
        exportSpecifiers: Map<ExportSpecifier[]>;
        exportedBindings: Identifier[][];
        exportedNames: Identifier[];
        exportEquals: ExportAssignment | undefined;
        hasExportStarsToExportValues: boolean;
    }
    function collectExternalModuleInfo(sourceFile: SourceFile, resolver: EmitResolver, compilerOptions: CompilerOptions): ExternalModuleInfo;
}
declare namespace ts {
    function createNode(kind: SyntaxKind, pos?: number, end?: number): Node;
    function forEachChild<T>(node: Node, cbNode: (node: Node) => T | undefined, cbNodeArray?: (nodes: NodeArray<Node>) => T | undefined): T | undefined;
    function createSourceFile(fileName: string, sourceText: string, languageVersion: ScriptTarget, setParentNodes?: boolean, scriptKind?: ScriptKind): SourceFile;
    function parseIsolatedEntityName(text: string, languageVersion: ScriptTarget): EntityName;
    function isExternalModule(file: SourceFile): boolean;
    function updateSourceFile(sourceFile: SourceFile, newText: string, textChangeRange: TextChangeRange, aggressiveChecks?: boolean): SourceFile;
    function parseIsolatedJSDocComment(content: string, start?: number, length?: number): {
        jsDoc: JSDoc;
        diagnostics: Diagnostic[];
    };
    function parseJSDocTypeExpressionForTests(content: string, start?: number, length?: number): {
        jsDocTypeExpression: JSDocTypeExpression;
        diagnostics: Diagnostic[];
    };
}
declare namespace ts {
    const enum ModuleInstanceState {
        NonInstantiated = 0,
        Instantiated = 1,
        ConstEnumOnly = 2,
    }
    function getModuleInstanceState(node: Node): ModuleInstanceState;
    function bindSourceFile(file: SourceFile, options: CompilerOptions): void;
    function computeTransformFlagsForNode(node: Node, subtreeFlags: TransformFlags): TransformFlags;
    function getTransformFlagsSubtreeExclusions(kind: SyntaxKind): TransformFlags;
}
declare namespace ts {
    function trace(host: ModuleResolutionHost, message: DiagnosticMessage, ...args: any[]): void;
    function isTraceEnabled(compilerOptions: CompilerOptions, host: ModuleResolutionHost): boolean;
    interface Push<T> {
        push(value: T): void;
    }
    function moduleHasNonRelativeName(moduleName: string): boolean;
    function getEffectiveTypeRoots(options: CompilerOptions, host: {
        directoryExists?: (directoryName: string) => boolean;
        getCurrentDirectory?: () => string;
    }): string[] | undefined;
    function resolveTypeReferenceDirective(typeReferenceDirectiveName: string, containingFile: string | undefined, options: CompilerOptions, host: ModuleResolutionHost): ResolvedTypeReferenceDirectiveWithFailedLookupLocations;
    function getAutomaticTypeDirectiveNames(options: CompilerOptions, host: ModuleResolutionHost): string[];
    interface ModuleResolutionCache extends NonRelativeModuleNameResolutionCache {
        getOrCreateCacheForDirectory(directoryName: string): Map<ResolvedModuleWithFailedLookupLocations>;
    }
    interface NonRelativeModuleNameResolutionCache {
        getOrCreateCacheForModuleName(nonRelativeModuleName: string): PerModuleNameCache;
    }
    interface PerModuleNameCache {
        get(directory: string): ResolvedModuleWithFailedLookupLocations;
        set(directory: string, result: ResolvedModuleWithFailedLookupLocations): void;
    }
    function createModuleResolutionCache(currentDirectory: string, getCanonicalFileName: (s: string) => string): ModuleResolutionCache;
    function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache): ResolvedModuleWithFailedLookupLocations;
    function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache): ResolvedModuleWithFailedLookupLocations;
    function resolveJavaScriptModule(moduleName: string, initialDir: string, host: ModuleResolutionHost): string;
    function directoryProbablyExists(directoryName: string, host: {
        directoryExists?: (directoryName: string) => boolean;
    }): boolean;
    function getPackageNameFromAtTypesDirectory(mangledName: string): string;
    function classicNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: NonRelativeModuleNameResolutionCache): ResolvedModuleWithFailedLookupLocations;
    function loadModuleFromGlobalCache(moduleName: string, projectName: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, globalCache: string): ResolvedModuleWithFailedLookupLocations;
}
declare namespace ts {
    function getNodeId(node: Node): number;
    function getSymbolId(symbol: Symbol): number;
    function createTypeChecker(host: TypeCheckerHost, produceDiagnostics: boolean): TypeChecker;
}
declare namespace ts {
    function visitNode<T extends Node>(node: T, visitor: Visitor, test?: (node: Node) => boolean, lift?: (node: NodeArray<Node>) => T): T;
    function visitNode<T extends Node>(node: T | undefined, visitor: Visitor, test?: (node: Node) => boolean, lift?: (node: NodeArray<Node>) => T): T | undefined;
    function visitNodes<T extends Node>(nodes: NodeArray<T>, visitor: Visitor, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T>;
    function visitNodes<T extends Node>(nodes: NodeArray<T> | undefined, visitor: Visitor, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T> | undefined;
    function visitLexicalEnvironment(statements: NodeArray<Statement>, visitor: Visitor, context: TransformationContext, start?: number, ensureUseStrict?: boolean): NodeArray<Statement>;
    function visitParameterList(nodes: NodeArray<ParameterDeclaration>, visitor: Visitor, context: TransformationContext, nodesVisitor?: typeof visitNodes): NodeArray<ParameterDeclaration>;
    function visitFunctionBody(node: FunctionBody, visitor: Visitor, context: TransformationContext): FunctionBody;
    function visitFunctionBody(node: FunctionBody | undefined, visitor: Visitor, context: TransformationContext): FunctionBody | undefined;
    function visitFunctionBody(node: ConciseBody, visitor: Visitor, context: TransformationContext): ConciseBody;
    function visitEachChild<T extends Node>(node: T, visitor: Visitor, context: TransformationContext): T;
    function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: typeof visitNodes, tokenVisitor?: Visitor): T | undefined;
}
declare namespace ts {
    function reduceEachChild<T>(node: Node, initial: T, cbNode: (memo: T, node: Node) => T, cbNodeArray?: (memo: T, nodes: NodeArray<Node>) => T): T;
    function mergeLexicalEnvironment(statements: NodeArray<Statement>, declarations: Statement[]): NodeArray<Statement>;
    function mergeLexicalEnvironment(statements: Statement[], declarations: Statement[]): Statement[];
    function liftToBlock(nodes: Node[]): Statement;
    function aggregateTransformFlags<T extends Node>(node: T): T;
    namespace Debug {
        const failBadSyntaxKind: (node: Node, message?: string) => void;
        const assertEachNode: (nodes: Node[], test: (node: Node) => boolean, message?: string) => void;
        const assertNode: (node: Node, test: (node: Node) => boolean, message?: string) => void;
        const assertOptionalNode: (node: Node, test: (node: Node) => boolean, message?: string) => void;
        const assertOptionalToken: (node: Node, kind: SyntaxKind, message?: string) => void;
        const assertMissingNode: (node: Node, message?: string) => void;
        function enableDebugInfo(): void;
    }
}
declare namespace ts {
    interface SourceMapWriter {
        initialize(filePath: string, sourceMapFilePath: string, sourceFileOrBundle: SourceFile | Bundle): void;
        reset(): void;
        setSourceFile(sourceFile: SourceMapSource): void;
        emitPos(pos: number): void;
        emitNodeWithSourceMap(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;
        emitTokenWithSourceMap(node: Node, token: SyntaxKind, tokenStartPos: number, emitCallback: (token: SyntaxKind, tokenStartPos: number) => number): number;
        getText(): string;
        getSourceMappingURL(): string;
        getSourceMapData(): SourceMapData;
    }
    function createSourceMapWriter(host: EmitHost, writer: EmitTextWriter): SourceMapWriter;
}
declare namespace ts {
    interface CommentWriter {
        reset(): void;
        setSourceFile(sourceFile: SourceFile): void;
        setWriter(writer: EmitTextWriter): void;
        emitNodeWithComments(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;
        emitBodyWithDetachedComments(node: Node, detachedRange: TextRange, emitCallback: (node: Node) => void): void;
        emitTrailingCommentsOfPosition(pos: number): void;
        emitLeadingCommentsOfPosition(pos: number): void;
    }
    function createCommentWriter(printerOptions: PrinterOptions, emitPos: ((pos: number) => void) | undefined): CommentWriter;
}
declare namespace ts {
    const enum FlattenLevel {
        All = 0,
        ObjectRest = 1,
    }
    function flattenDestructuringAssignment(node: VariableDeclaration | DestructuringAssignment, visitor: ((node: Node) => VisitResult<Node>) | undefined, context: TransformationContext, level: FlattenLevel, needsValue?: boolean, createAssignmentCallback?: (name: Identifier, value: Expression, location?: TextRange) => Expression): Expression;
    function flattenDestructuringBinding(node: VariableDeclaration | ParameterDeclaration, visitor: (node: Node) => VisitResult<Node>, context: TransformationContext, level: FlattenLevel, rval?: Expression, hoistTempVariables?: boolean, skipInitializer?: boolean): VariableDeclaration[];
}
declare namespace ts {
    function transformTypeScript(context: TransformationContext): (node: SourceFile) => SourceFile;
}
declare namespace ts {
    function transformES2017(context: TransformationContext): (node: SourceFile) => SourceFile;
    const asyncSuperHelper: EmitHelper;
    const advancedAsyncSuperHelper: EmitHelper;
}
declare namespace ts {
    function transformESNext(context: TransformationContext): (node: SourceFile) => SourceFile;
    function createAssignHelper(context: TransformationContext, attributesSegments: Expression[]): CallExpression;
}
declare namespace ts {
    function transformJsx(context: TransformationContext): (node: SourceFile) => SourceFile;
}
declare namespace ts {
    function transformES2016(context: TransformationContext): (node: SourceFile) => SourceFile;
}
declare namespace ts {
    function transformES2015(context: TransformationContext): (node: SourceFile) => SourceFile;
}
declare namespace ts {
    function transformGenerators(context: TransformationContext): (node: SourceFile) => SourceFile;
}
declare namespace ts {
    function transformES5(context: TransformationContext): (node: SourceFile) => SourceFile;
}
declare namespace ts {
    function transformModule(context: TransformationContext): (node: SourceFile) => SourceFile;
}
declare namespace ts {
    function transformSystemModule(context: TransformationContext): (node: SourceFile) => SourceFile;
}
declare namespace ts {
    function transformES2015Module(context: TransformationContext): (node: SourceFile) => SourceFile;
}
declare namespace ts {
    function getTransformers(compilerOptions: CompilerOptions, customTransformers?: CustomTransformers): TransformerFactory<SourceFile>[];
    function transformNodes<T extends Node>(resolver: EmitResolver, host: EmitHost, options: CompilerOptions, nodes: T[], transformers: TransformerFactory<T>[], allowDtsFiles: boolean): TransformationResult<T>;
}
declare namespace ts {
    function getDeclarationDiagnostics(host: EmitHost, resolver: EmitResolver, targetSourceFile: SourceFile): Diagnostic[];
    function writeDeclarationFile(declarationFilePath: string, sourceFileOrBundle: SourceFile | Bundle, host: EmitHost, resolver: EmitResolver, emitterDiagnostics: DiagnosticCollection, emitOnlyDtsFiles: boolean): boolean;
}
declare namespace ts {
    function emitFiles(resolver: EmitResolver, host: EmitHost, targetSourceFile: SourceFile, emitOnlyDtsFiles?: boolean, transformers?: TransformerFactory<SourceFile>[]): EmitResult;
    function createPrinter(printerOptions?: PrinterOptions, handlers?: PrintHandlers): Printer;
}
declare namespace ts {
    function findConfigFile(searchPath: string, fileExists: (fileName: string) => boolean, configName?: string): string;
    function resolveTripleslashReference(moduleName: string, containingFile: string): string;
    function computeCommonSourceDirectoryOfFilenames(fileNames: string[], currentDirectory: string, getCanonicalFileName: (fileName: string) => string): string;
    function createCompilerHost(options: CompilerOptions, setParentNodes?: boolean): CompilerHost;
    function getPreEmitDiagnostics(program: Program, sourceFile?: SourceFile, cancellationToken?: CancellationToken): Diagnostic[];
    interface FormatDiagnosticsHost {
        getCurrentDirectory(): string;
        getCanonicalFileName(fileName: string): string;
        getNewLine(): string;
    }
    function formatDiagnostics(diagnostics: Diagnostic[], host: FormatDiagnosticsHost): string;
    function formatDiagnosticsWithColorAndContext(diagnostics: Diagnostic[], host: FormatDiagnosticsHost): string;
    function flattenDiagnosticMessageText(messageText: string | DiagnosticMessageChain, newLine: string): string;
    function createProgram(rootNames: string[], options: CompilerOptions, host?: CompilerHost, oldProgram?: Program): Program;
    function getResolutionDiagnostic(options: CompilerOptions, {extension}: ResolvedModuleFull): DiagnosticMessage | undefined;
}
declare const _getScriptKindFromFileName: typeof ts.getScriptKindFromFileName;
export = ts; 
