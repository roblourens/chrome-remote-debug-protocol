import {IProtocol} from '../protocol'
export const protocol: IProtocol =
{
    "version": { "major": "1", "minor": "1" },
    "domains": [{
        "domain": "Runtime",
        "description": "Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects. Evaluation results are returned as mirror object that expose object type, string representation and unique identifier that can be used for further object reference. Original objects are maintained in memory unless they are either explicitly released or are released along with the other objects in their object group.",
        "types": [
            {
                "id": "ScriptId",
                "type": "string",
                "description": "Unique script identifier."
            },
            {
                "id": "RemoteObjectId",
                "type": "string",
                "description": "Unique object identifier."
            },
            {
                "id": "RemoteObject",
                "type": "object",
                "description": "Mirror object referencing original JavaScript object.",
                "properties": [
                    { "name": "type", "type": "string", "enum": ["object", "function", "undefined", "string", "number", "boolean", "symbol"], "description": "Object type." },
                    { "name": "subtype", "type": "string", "optional": true, "enum": ["array", "null", "node", "regexp", "date", "map", "set", "iterator", "generator", "error"], "description": "Object subtype hint. Specified for <code>object</code> type values only." },
                    { "name": "className", "type": "string", "optional": true, "description": "Object class (constructor) name. Specified for <code>object</code> type values only." },
                    { "name": "value", "type": "any", "optional": true, "description": "Remote object value in case of primitive values or JSON values (if it was requested), or description string if the value can not be JSON-stringified (like NaN, Infinity, -Infinity, -0)." },
                    { "name": "description", "type": "string", "optional": true, "description": "String representation of the object." },
                    { "name": "objectId", "$ref": "RemoteObjectId", "optional": true, "description": "Unique object identifier (for non-primitive values)." },
                    { "name": "preview", "$ref": "ObjectPreview", "optional": true, "description": "Preview containing abbreviated property values. Specified for <code>object</code> type values only.", "hidden": true },
                    { "name": "customPreview", "$ref": "CustomPreview", "optional": true, "hidden": true}
                ]
            },
            {
                "id": "CustomPreview",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "header", "type": "string"},
                    { "name": "hasBody", "type": "boolean"},
                    { "name": "formatterObjectId", "$ref": "RemoteObjectId"},
                    { "name": "bindRemoteObjectFunctionId", "$ref": "RemoteObjectId" },
                    { "name": "configObjectId", "$ref": "RemoteObjectId", "optional": true }
                ]
            },
            {
                "id": "ObjectPreview",
                "type": "object",
                "hidden": true,
                "description": "Object containing abbreviated remote object value.",
                "properties": [
                    { "name": "type", "type": "string", "enum": ["object", "function", "undefined", "string", "number", "boolean", "symbol"], "description": "Object type." },
                    { "name": "subtype", "type": "string", "optional": true, "enum": ["array", "null", "node", "regexp", "date", "map", "set", "iterator", "generator", "error"], "description": "Object subtype hint. Specified for <code>object</code> type values only." },
                    { "name": "description", "type": "string", "optional": true, "description": "String representation of the object." },
                    { "name": "overflow", "type": "boolean", "description": "True iff some of the properties or entries of the original object did not fit." },
                    { "name": "properties", "type": "array", "items": { "$ref": "PropertyPreview" }, "description": "List of the properties." },
                    { "name": "entries", "type": "array", "items": { "$ref": "EntryPreview" }, "optional": true, "description": "List of the entries. Specified for <code>map</code> and <code>set</code> subtype values only." }
                ]
            },
            {
                "id": "PropertyPreview",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "name", "type": "string", "description": "Property name." },
                    { "name": "type", "type": "string", "enum": ["object", "function", "undefined", "string", "number", "boolean", "symbol", "accessor"], "description": "Object type. Accessor means that the property itself is an accessor property." },
                    { "name": "value", "type": "string", "optional": true, "description": "User-friendly property value string." },
                    { "name": "valuePreview", "$ref": "ObjectPreview", "optional": true, "description": "Nested value preview." },
                    { "name": "subtype", "type": "string", "optional": true, "enum": ["array", "null", "node", "regexp", "date", "map", "set", "iterator", "generator", "error"], "description": "Object subtype hint. Specified for <code>object</code> type values only." }
                ]
            },
            {
                "id": "EntryPreview",
                "type": "object",
                "hidden": true,
                "properties": [
                    { "name": "key", "$ref": "ObjectPreview", "optional": true, "description": "Preview of the key. Specified for map-like collection entries." },
                    { "name": "value", "$ref": "ObjectPreview", "description": "Preview of the value." }
                ]
            },
            {
                "id": "PropertyDescriptor",
                "type": "object",
                "description": "Object property descriptor.",
                "properties": [
                    { "name": "name", "type": "string", "description": "Property name or symbol description." },
                    { "name": "value", "$ref": "RemoteObject", "optional": true, "description": "The value associated with the property." },
                    { "name": "writable", "type": "boolean", "optional": true, "description": "True if the value associated with the property may be changed (data descriptors only)." },
                    { "name": "get", "$ref": "RemoteObject", "optional": true, "description": "A function which serves as a getter for the property, or <code>undefined</code> if there is no getter (accessor descriptors only)." },
                    { "name": "set", "$ref": "RemoteObject", "optional": true, "description": "A function which serves as a setter for the property, or <code>undefined</code> if there is no setter (accessor descriptors only)." },
                    { "name": "configurable", "type": "boolean", "description": "True if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object." },
                    { "name": "enumerable", "type": "boolean", "description": "True if this property shows up during enumeration of the properties on the corresponding object." },
                    { "name": "wasThrown", "type": "boolean", "optional": true, "description": "True if the result was thrown during the evaluation." },
                    { "name": "isOwn", "optional": true, "type": "boolean", "description": "True if the property is owned for the object.", "hidden": true },
                    { "name": "symbol", "$ref": "RemoteObject", "optional": true, "description": "Property symbol object, if the property is of the <code>symbol</code> type.", "hidden": true }
                ]
            },
            {
                "id": "InternalPropertyDescriptor",
                "type": "object",
                "description": "Object internal property descriptor. This property isn't normally visible in JavaScript code.",
                "properties": [
                    { "name": "name", "type": "string", "description": "Conventional property name." },
                    { "name": "value", "$ref": "RemoteObject", "optional": true, "description": "The value associated with the property." }
                ],
                "hidden": true
            },
            {
                "id": "CallArgument",
                "type": "object",
                "description": "Represents function call argument. Either remote object id <code>objectId</code> or primitive <code>value</code> or neither of (for undefined) them should be specified.",
                "properties": [
                    { "name": "value", "type": "any", "optional": true, "description": "Primitive value, or description string if the value can not be JSON-stringified (like NaN, Infinity, -Infinity, -0)." },
                    { "name": "objectId", "$ref": "RemoteObjectId", "optional": true, "description": "Remote object handle." },
                    { "name": "type", "optional": true, "hidden": true, "type": "string", "enum": ["object", "function", "undefined", "string", "number", "boolean", "symbol"], "description": "Object type." }
                ]
            },
            {
                "id": "ExecutionContextId",
                "type": "integer",
                "description": "Id of an execution context."
            },
            {
                "id": "ExecutionContextDescription",
                "type": "object",
                "description": "Description of an isolated world.",
                "properties": [
                    { "name": "id", "$ref": "ExecutionContextId", "description": "Unique id of the execution context. It can be used to specify in which execution context script evaluation should be performed." },
                    { "name": "isDefault", "type": "boolean", "description": "Whether context is the default page context (as opposite to e.g. context of content script).", "hidden": true },
                    { "name": "origin", "type": "string", "description": "Execution context origin.", "hidden": true},
                    { "name": "name", "type": "string", "description": "Human readable name describing given context.", "hidden": true},
                    { "name": "frameId", "type": "string", "description": "Id of the owning frame. May be an empty string if the context is not associated with a frame." }
                ]
            },
            {
                "id": "ExceptionDetails",
                "type": "object",
                "description": "Detailed information on exception (or error) that was thrown during script compilation or execution.",
                "properties": [
                    { "name": "text", "type": "string", "description": "Exception text." },
                    { "name": "url", "type": "string", "optional": true, "description": "URL of the message origin." },
                    { "name": "scriptId", "type": "string", "optional": true, "description": "Script ID of the message origin." },
                    { "name": "line", "type": "integer", "optional": true, "description": "Line number in the resource that generated this message." },
                    { "name": "column", "type": "integer", "optional": true, "description": "Column number in the resource that generated this message." },
                    { "name": "stack", "$ref": "StackTrace", "optional": true, "description": "JavaScript stack trace for assertions and error messages." }
                ]
            },
            {
                "id": "CallFrame",
                "type": "object",
                "description": "Stack entry for runtime errors and assertions.",
                "properties": [
                    { "name": "functionName", "type": "string", "description": "JavaScript function name." },
                    { "name": "scriptId", "$ref": "ScriptId", "description": "JavaScript script id." },
                    { "name": "url", "type": "string", "description": "JavaScript script name or url." },
                    { "name": "lineNumber", "type": "integer", "description": "JavaScript script line number." },
                    { "name": "columnNumber", "type": "integer", "description": "JavaScript script column number." }
                ]
            },
            {
                "id": "StackTrace",
                "type": "object",
                "description": "Call frames for assertions or error messages.",
                "properties": [
                    { "name": "description", "type": "string", "optional": true, "description": "String label of this stack trace. For async traces this may be a name of the function that initiated the async call." },
                    { "name": "callFrames", "type": "array", "items": { "$ref": "CallFrame" }, "description": "JavaScript function name." },
                    { "name": "parent", "$ref": "StackTrace", "optional": true, "hidden": true, "description": "Asynchronous JavaScript stack trace that preceded this stack, if available." }
                ]
            }
        ],
        "commands": [
            {
                "name": "evaluate",
                "parameters": [
                    { "name": "expression", "type": "string", "description": "Expression to evaluate." },
                    { "name": "objectGroup", "type": "string", "optional": true, "description": "Symbolic group name that can be used to release multiple objects." },
                    { "name": "includeCommandLineAPI", "type": "boolean", "optional": true, "description": "Determines whether Command Line API should be available during the evaluation.", "hidden": true },
                    { "name": "doNotPauseOnExceptionsAndMuteConsole", "type": "boolean", "optional": true, "description": "Specifies whether evaluation should stop on exceptions and mute console. Overrides setPauseOnException state.", "hidden": true },
                    { "name": "contextId", "$ref": "ExecutionContextId", "optional": true, "description": "Specifies in which isolated context to perform evaluation. Each content script lives in an isolated context and this parameter may be used to specify one of those contexts. If the parameter is omitted or 0 the evaluation will be performed in the context of the inspected page." },
                    { "name": "returnByValue", "type": "boolean", "optional": true, "description": "Whether the result is expected to be a JSON object that should be sent by value." },
                    { "name": "generatePreview", "type": "boolean", "optional": true, "hidden": true, "description": "Whether preview should be generated for the result." },
                    { "name": "userGesture", "type": "boolean", "optional": true, "hidden": true, "description": "Whether execution should be treated as initiated by user in the UI." }
                ],
                "returns": [
                    { "name": "result", "$ref": "RemoteObject", "description": "Evaluation result." },
                    { "name": "wasThrown", "type": "boolean", "optional": true, "description": "True if the result was thrown during the evaluation." },
                    { "name": "exceptionDetails", "$ref": "ExceptionDetails", "optional": true, "hidden": true, "description": "Exception details."}
                ],
                "description": "Evaluates expression on global object."
            },
            {
                "name": "callFunctionOn",
                "parameters": [
                    { "name": "objectId", "$ref": "RemoteObjectId", "description": "Identifier of the object to call function on." },
                    { "name": "functionDeclaration", "type": "string", "description": "Declaration of the function to call." },
                    { "name": "arguments", "type": "array", "items": { "$ref": "CallArgument", "description": "Call argument." }, "optional": true, "description": "Call arguments. All call arguments must belong to the same JavaScript world as the target object." },
                    { "name": "doNotPauseOnExceptionsAndMuteConsole", "type": "boolean", "optional": true, "description": "Specifies whether function call should stop on exceptions and mute console. Overrides setPauseOnException state.", "hidden": true },
                    { "name": "returnByValue", "type": "boolean", "optional": true, "description": "Whether the result is expected to be a JSON object which should be sent by value." },
                    { "name": "generatePreview", "type": "boolean", "optional": true, "hidden": true, "description": "Whether preview should be generated for the result." },
                    { "name": "userGesture", "type": "boolean", "optional": true, "hidden": true, "description": "Whether execution should be treated as initiated by user in the UI." }
                ],
                "returns": [
                    { "name": "result", "$ref": "RemoteObject", "description": "Call result." },
                    { "name": "wasThrown", "type": "boolean", "optional": true, "description": "True if the result was thrown during the evaluation." }
                ],
                "description": "Calls function with given declaration on the given object. Object group of the result is inherited from the target object."
            },
            {
                "name": "getProperties",
                "parameters": [
                    { "name": "objectId", "$ref": "RemoteObjectId", "description": "Identifier of the object to return properties for." },
                    { "name": "ownProperties", "optional": true, "type": "boolean", "description": "If true, returns properties belonging only to the element itself, not to its prototype chain." },
                    { "name": "accessorPropertiesOnly", "optional": true, "type": "boolean", "description": "If true, returns accessor properties (with getter/setter) only; internal properties are not returned either.", "hidden": true },
                    { "name": "generatePreview", "type": "boolean", "optional": true, "hidden": true, "description": "Whether preview should be generated for the results." }
                ],
                "returns": [
                    { "name": "result", "type": "array", "items": { "$ref": "PropertyDescriptor" }, "description": "Object properties." },
                    { "name": "internalProperties", "optional": true, "type": "array", "items": { "$ref": "InternalPropertyDescriptor" }, "description": "Internal object properties (only of the element itself).", "hidden": true },
                    { "name": "exceptionDetails", "$ref": "ExceptionDetails", "optional": true, "hidden": true, "description": "Exception details."}
                ],
                "description": "Returns properties of a given object. Object group of the result is inherited from the target object."
            },
            {
                "name": "releaseObject",
                "parameters": [
                    { "name": "objectId", "$ref": "RemoteObjectId", "description": "Identifier of the object to release." }
                ],
                "description": "Releases remote object with given id."
            },
            {
                "name": "releaseObjectGroup",
                "parameters": [
                    { "name": "objectGroup", "type": "string", "description": "Symbolic object group name." }
                ],
                "description": "Releases all remote objects that belong to a given group."
            },
            {
                "name": "run",
                "hidden": true,
                "description": "Tells inspected instance(worker or page) that it can run in case it was started paused."
            },
            {
                "name": "enable",
                "description": "Enables reporting of execution contexts creation by means of <code>executionContextCreated</code> event. When the reporting gets enabled the event will be sent immediately for each existing execution context."
            },
            {
                "name": "disable",
                "hidden": true,
                "description": "Disables reporting of execution contexts creation."
            },
            {
                "name": "setCustomObjectFormatterEnabled",
                "parameters": [
                    {
                        "name": "enabled",
                        "type": "boolean"
                    }
                ],
                "hidden": true
            },
            {
                "name": "compileScript",
                "hidden": true,
                "parameters": [
                    { "name": "expression", "type": "string", "description": "Expression to compile." },
                    { "name": "sourceURL", "type": "string", "description": "Source url to be set for the script." },
                    { "name": "persistScript", "type": "boolean", "description": "Specifies whether the compiled script should be persisted." },
                    { "name": "executionContextId", "$ref": "ExecutionContextId", "description": "Specifies in which isolated context to perform script run. Each content script lives in an isolated context and this parameter is used to specify one of those contexts." }
                ],
                "returns": [
                    { "name": "scriptId", "$ref": "ScriptId", "optional": true, "description": "Id of the script." },
                    { "name": "exceptionDetails", "$ref": "ExceptionDetails", "optional": true, "description": "Exception details."}
                ],
                "description": "Compiles expression."
            },
            {
                "name": "runScript",
                "hidden": true,
                "parameters": [
                    { "name": "scriptId", "$ref": "ScriptId", "description": "Id of the script to run." },
                    { "name": "executionContextId", "$ref": "ExecutionContextId", "description": "Specifies in which isolated context to perform script run. Each content script lives in an isolated context and this parameter is used to specify one of those contexts." },
                    { "name": "objectGroup", "type": "string", "optional": true, "description": "Symbolic group name that can be used to release multiple objects." },
                    { "name": "doNotPauseOnExceptionsAndMuteConsole", "type": "boolean", "optional": true, "description": "Specifies whether script run should stop on exceptions and mute console. Overrides setPauseOnException state." },
                    { "name": "includeCommandLineAPI", "type": "boolean", "optional": true, "description": "Determines whether Command Line API should be available during the evaluation." }
                ],
                "returns": [
                    { "name": "result", "$ref": "RemoteObject", "description": "Run result." },
                    { "name": "exceptionDetails", "$ref": "ExceptionDetails", "optional": true, "description": "Exception details."}
                ],
                "description": "Runs script with given id in a given context."
            }
        ],
        "events": [
            {
                "name": "executionContextCreated",
                "parameters": [
                    { "name": "context", "$ref": "ExecutionContextDescription", "description": "A newly created execution contex." }
                ],
                "description": "Issued when new execution context is created."
            },
            {
                "name": "executionContextDestroyed",
                "parameters": [
                    { "name": "executionContextId", "$ref": "ExecutionContextId", "description": "Id of the destroyed context" }
                ],
                "description": "Issued when execution context is destroyed."
            },
            {
                "name": "executionContextsCleared",
                "description": "Issued when all executionContexts were cleared in browser"
            },
            {
                "name": "inspectRequested",
                "parameters": [
                    { "name": "object", "$ref": "RemoteObject" },
                    { "name": "hints", "type": "object" }
                ],
                "hidden": true
            }
        ]
    },
    {
        "domain": "Debugger",
        "description": "Debugger domain exposes JavaScript debugging capabilities. It allows setting and removing breakpoints, stepping through execution, exploring stack traces, etc.",
        "dependencies": ["Runtime"],
        "types": [
            {
                "id": "BreakpointId",
                "type": "string",
                "description": "Breakpoint identifier."
            },
            {
                "id": "CallFrameId",
                "type": "string",
                "description": "Call frame identifier."
            },
            {
                "id": "Location",
                "type": "object",
                "properties": [
                    { "name": "scriptId", "$ref": "Runtime.ScriptId", "description": "Script identifier as reported in the <code>Debugger.scriptParsed</code>." },
                    { "name": "lineNumber", "type": "integer", "description": "Line number in the script (0-based)." },
                    { "name": "columnNumber", "type": "integer", "optional": true, "description": "Column number in the script (0-based)." }
                ],
                "description": "Location in the source code."
            },
            {
                "id": "ScriptPosition",
                "hidden": true,
                "type": "object",
                "properties": [
                    { "name": "line", "type": "integer" },
                    { "name": "column", "type": "integer" }
                ],
                "description": "Location in the source code."
            },
            {
                "id": "FunctionDetails",
                "hidden": true,
                "type": "object",
                "properties": [
                    { "name": "location", "$ref": "Location", "optional": true, "description": "Location of the function, none for native functions." },
                    { "name": "functionName", "type": "string", "description": "Name of the function." },
                    { "name": "isGenerator", "type": "boolean", "description": "Whether this is a generator function." },
                    { "name": "scopeChain", "type": "array", "optional": true, "items": { "$ref": "Scope" }, "description": "Scope chain for this closure." }
                ],
                "description": "Information about the function."
            },
            {
                "id": "GeneratorObjectDetails",
                "hidden": true,
                "type": "object",
                "properties": [
                    { "name": "function", "$ref": "Runtime.RemoteObject", "description": "Generator function." },
                    { "name": "functionName", "type": "string", "description": "Name of the generator function." },
                    { "name": "status", "type": "string", "enum": ["running", "suspended", "closed"], "description": "Current generator object status." },
                    { "name": "location", "$ref": "Location", "optional": true, "description": "If suspended, location where generator function was suspended (e.g. location of the last 'yield'). Otherwise, location of the generator function." }
                ],
                "description": "Information about the generator object."
            },
            {
                "id": "CollectionEntry",
                "hidden": true,
                "type": "object",
                "properties": [
                    { "name": "key", "$ref": "Runtime.RemoteObject", "optional": true, "description": "Entry key of a map-like collection, otherwise not provided." },
                    { "name": "value", "$ref": "Runtime.RemoteObject", "description": "Entry value." }
                ],
                "description": "Collection entry."
            },
            {
                "id": "CallFrame",
                "type": "object",
                "properties": [
                    { "name": "callFrameId", "$ref": "CallFrameId", "description": "Call frame identifier. This identifier is only valid while the virtual machine is paused." },
                    { "name": "functionName", "type": "string", "description": "Name of the JavaScript function called on this call frame." },
                    { "name": "functionLocation", "$ref": "Location", "optional": true, "hidden": true, "description": "Location in the source code." },
                    { "name": "location", "$ref": "Location", "description": "Location in the source code." },
                    { "name": "scopeChain", "type": "array", "items": { "$ref": "Scope" }, "description": "Scope chain for this call frame." },
                    { "name": "this", "$ref": "Runtime.RemoteObject", "description": "<code>this</code> object for this call frame." },
                    { "name": "returnValue", "$ref": "Runtime.RemoteObject", "optional": true, "hidden": true, "description": "The value being returned, if the function is at return point." }
                ],
                "description": "JavaScript call frame. Array of call frames form the call stack."
            },
            {
                "id": "Scope",
                "type": "object",
                "properties": [
                    { "name": "type", "type": "string", "enum": ["global", "local", "with", "closure", "catch", "block", "script"], "description": "Scope type." },
                    { "name": "object", "$ref": "Runtime.RemoteObject", "description": "Object representing the scope. For <code>global</code> and <code>with</code> scopes it represents the actual object; for the rest of the scopes, it is artificial transient object enumerating scope variables as its properties." },
                    { "name": "name", "type": "string", "optional": true, "hidden": true },
                    { "name": "startLocation", "$ref": "Location", "optional": true, "hidden": true, "description": "Location in the source code where scope starts" },
                    { "name": "endLocation", "$ref": "Location", "optional": true, "hidden": true, "description": "Location in the source code where scope ends" }
                ],
                "description": "Scope description."
            },
            {
                "id": "SetScriptSourceError",
                "type": "object",
                "properties": [
                    { "name": "message", "type": "string", "description": "Compiler error message" },
                    { "name": "lineNumber", "type": "integer", "description": "Compile error line number (1-based)" },
                    { "name": "columnNumber", "type": "integer", "description": "Compile error column number (1-based)" }
                ],
                "description": "Error data for setScriptSource command. Contains uncompilable script source error.",
                "hidden": true
            },
            {
                "id": "SearchMatch",
                "type": "object",
                "description": "Search match for resource.",
                "properties": [
                    { "name": "lineNumber", "type": "number", "description": "Line number in resource content." },
                    { "name": "lineContent", "type": "string", "description": "Line with match content." }
                ],
                "hidden": true
            }
        ],
        "commands": [
            {
                "name": "enable",
                "description": "Enables debugger for the given page. Clients should not assume that the debugging has been enabled until the result for this command is received."
            },
            {
                "name": "disable",
                "description": "Disables debugger for given page."
            },
            {
                "name": "setBreakpointsActive",
                "parameters": [
                    { "name": "active", "type": "boolean", "description": "New value for breakpoints active state." }
                ],
                "description": "Activates / deactivates all breakpoints on the page."
            },
            {
                "name": "setSkipAllPauses",
                "hidden": true,
                "parameters": [
                    { "name": "skipped", "type": "boolean", "description": "New value for skip pauses state." }
                ],
                "description": "Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc)."
            },
            {
                "name": "setBreakpointByUrl",
                "parameters": [
                    { "name": "lineNumber", "type": "integer", "description": "Line number to set breakpoint at." },
                    { "name": "url", "type": "string", "optional": true, "description": "URL of the resources to set breakpoint on." },
                    { "name": "urlRegex", "type": "string", "optional": true, "description": "Regex pattern for the URLs of the resources to set breakpoints on. Either <code>url</code> or <code>urlRegex</code> must be specified." },
                    { "name": "columnNumber", "type": "integer", "optional": true, "description": "Offset in the line to set breakpoint at." },
                    { "name": "condition", "type": "string", "optional": true, "description": "Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true." }
                ],
                "returns": [
                    { "name": "breakpointId", "$ref": "BreakpointId", "description": "Id of the created breakpoint for further reference." },
                    { "name": "locations", "type": "array", "items": { "$ref": "Location" }, "description": "List of the locations this breakpoint resolved into upon addition." }
                ],
                "description": "Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this command is issued, all existing parsed scripts will have breakpoints resolved and returned in <code>locations</code> property. Further matching script parsing will result in subsequent <code>breakpointResolved</code> events issued. This logical breakpoint will survive page reloads."
            },
            {
                "name": "setBreakpoint",
                "parameters": [
                    { "name": "location", "$ref": "Location", "description": "Location to set breakpoint in." },
                    { "name": "condition", "type": "string", "optional": true, "description": "Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true." }
                ],
                "returns": [
                    { "name": "breakpointId", "$ref": "BreakpointId", "description": "Id of the created breakpoint for further reference." },
                    { "name": "actualLocation", "$ref": "Location", "description": "Location this breakpoint resolved into." }
                ],
                "description": "Sets JavaScript breakpoint at a given location."
            },
            {
                "name": "removeBreakpoint",
                "parameters": [
                    { "name": "breakpointId", "$ref": "BreakpointId" }
                ],
                "description": "Removes JavaScript breakpoint."
            },
            {
                "name": "continueToLocation",
                "parameters": [
                    { "name": "location", "$ref": "Location", "description": "Location to continue to." },
                    { "name": "interstatementLocation", "type": "boolean", "optional": true, "hidden": true, "description": "Allows breakpoints at the intemediate positions inside statements." }
                ],
                "description": "Continues execution until specific location is reached."
            },
            {
                "name": "stepOver",
                "description": "Steps over the statement."
            },
            {
                "name": "stepInto",
                "description": "Steps into the function call."
            },
            {
                "name": "stepOut",
                "description": "Steps out of the function call."
            },
            {
                "name": "pause",
                "description": "Stops on the next JavaScript statement."
            },
            {
                "name": "resume",
                "description": "Resumes JavaScript execution."
            },
            {
                "name": "searchInContent",
                "parameters": [
                    { "name": "scriptId", "$ref": "Runtime.ScriptId", "description": "Id of the script to search in." },
                    { "name": "query", "type": "string", "description": "String to search for."  },
                    { "name": "caseSensitive", "type": "boolean", "optional": true, "description": "If true, search is case sensitive." },
                    { "name": "isRegex", "type": "boolean", "optional": true, "description": "If true, treats string parameter as regex." }
                ],
                "returns": [
                    { "name": "result", "type": "array", "items": { "$ref": "SearchMatch" }, "description": "List of search matches." }
                ],
                "description": "Searches for given string in script content."
            },
            {
                "name": "canSetScriptSource",
                "returns": [
                    { "name": "result", "type": "boolean", "description": "True if <code>setScriptSource</code> is supported." }
                ],
                "description": "Always returns true."
            },
            {
                "name": "setScriptSource",
                "parameters": [
                    { "name": "scriptId", "$ref": "Runtime.ScriptId", "description": "Id of the script to edit." },
                    { "name": "scriptSource", "type": "string", "description": "New content of the script." },
                    { "name": "preview", "type": "boolean", "optional": true, "description": " If true the change will not actually be applied. Preview mode may be used to get result description without actually modifying the code.", "hidden": true }
                ],
                "returns": [
                    { "name": "callFrames", "type": "array", "optional": true, "items": { "$ref": "CallFrame" }, "description": "New stack trace in case editing has happened while VM was stopped." },
                    { "name": "stackChanged", "type": "boolean", "optional": true, "description": "Whether current call stack  was modified after applying the changes.", "hidden": true },
                    { "name": "asyncStackTrace", "$ref": "Runtime.StackTrace", "optional": true, "description": "Async stack trace, if any.", "hidden": true },
                    { "name": "compileError", "optional": true, "$ref": "SetScriptSourceError", "description": "Error data if any." }
                ],
                "description": "Edits JavaScript source live."
            },
            {
                "name": "restartFrame",
                "parameters": [
                    { "name": "callFrameId", "$ref": "CallFrameId", "description": "Call frame identifier to evaluate on." }
                ],
                "returns": [
                    { "name": "callFrames", "type": "array", "items": { "$ref": "CallFrame" }, "description": "New stack trace." },
                    { "name": "asyncStackTrace", "$ref": "Runtime.StackTrace", "optional": true, "description": "Async stack trace, if any." }
                ],
                "hidden": true,
                "description": "Restarts particular call frame from the beginning."
            },
            {
                "name": "getScriptSource",
                "parameters": [
                    { "name": "scriptId", "$ref": "Runtime.ScriptId", "description": "Id of the script to get source for." }
                ],
                "returns": [
                    { "name": "scriptSource", "type": "string", "description": "Script source." }
                ],
                "description": "Returns source for the script with given id."
            },
            {
                "name": "getFunctionDetails",
                "hidden": true,
                "parameters": [
                    { "name": "functionId", "$ref": "Runtime.RemoteObjectId", "description": "Id of the function to get details for." }
                ],
                "returns": [
                    { "name": "details", "$ref": "FunctionDetails", "description": "Information about the function." }
                ],
                "description": "Returns detailed information on given function."
            },
            {
                "name": "getGeneratorObjectDetails",
                "hidden": true,
                "parameters": [
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "description": "Id of the generator object to get details for." }
                ],
                "returns": [
                    { "name": "details", "$ref": "GeneratorObjectDetails", "description": "Information about the generator object." }
                ],
                "description": "Returns detailed information on given generator object."
            },
            {
                "name": "getCollectionEntries",
                "hidden": true,
                "parameters": [
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "description": "Id of the collection to get entries for." }
                ],
                "returns": [
                    { "name": "entries", "type": "array", "items": { "$ref": "CollectionEntry" }, "description": "Array of collection entries." }
                ],
                "description": "Returns entries of given collection."
            },
            {
                "name": "setPauseOnExceptions",
                "parameters": [
                    { "name": "state", "type": "string", "enum": ["none", "uncaught", "all"], "description": "Pause on exceptions mode." }
                ],
                "description": "Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or no exceptions. Initial pause on exceptions state is <code>none</code>."
            },
            {
                "name": "evaluateOnCallFrame",
                "parameters": [
                    { "name": "callFrameId", "$ref": "CallFrameId", "description": "Call frame identifier to evaluate on." },
                    { "name": "expression", "type": "string", "description": "Expression to evaluate." },
                    { "name": "objectGroup", "type": "string", "optional": true, "description": "String object group name to put result into (allows rapid releasing resulting object handles using <code>releaseObjectGroup</code>)." },
                    { "name": "includeCommandLineAPI", "type": "boolean", "optional": true, "description": "Specifies whether command line API should be available to the evaluated expression, defaults to false.", "hidden": true },
                    { "name": "doNotPauseOnExceptionsAndMuteConsole", "type": "boolean", "optional": true, "description": "Specifies whether evaluation should stop on exceptions and mute console. Overrides setPauseOnException state.", "hidden": true },
                    { "name": "returnByValue", "type": "boolean", "optional": true, "description": "Whether the result is expected to be a JSON object that should be sent by value." },
                    { "name": "generatePreview", "type": "boolean", "optional": true, "hidden": true, "description": "Whether preview should be generated for the result." }
                ],
                "returns": [
                    { "name": "result", "$ref": "Runtime.RemoteObject", "description": "Object wrapper for the evaluation result." },
                    { "name": "wasThrown", "type": "boolean", "optional": true, "description": "True if the result was thrown during the evaluation." },
                    { "name": "exceptionDetails", "$ref": "Runtime.ExceptionDetails", "optional": true, "hidden": true, "description": "Exception details."}
                ],
                "description": "Evaluates expression on a given call frame."
            },
            {
                "name": "setVariableValue",
                "parameters": [
                    { "name": "scopeNumber", "type": "integer", "description": "0-based number of scope as was listed in scope chain. Only 'local', 'closure' and 'catch' scope types are allowed. Other scopes could be manipulated manually." },
                    { "name": "variableName", "type": "string", "description": "Variable name." },
                    { "name": "newValue", "$ref": "Runtime.CallArgument", "description": "New variable value." },
                    { "name": "callFrameId", "$ref": "CallFrameId", "description": "Id of callframe that holds variable." }
                ],
                "hidden": true,
                "description": "Changes value of variable in a callframe. Object-based scopes are not supported and must be mutated manually."
            },
            {
                "name": "getBacktrace",
                "returns": [
                    { "name": "callFrames", "type": "array", "items": { "$ref": "CallFrame" }, "description": "Call stack the virtual machine stopped on." },
                    { "name": "asyncStackTrace", "$ref": "Runtime.StackTrace", "optional": true, "description": "Async stack trace, if any." }
                ],
                "hidden": true,
                "description": "Returns call stack including variables changed since VM was paused. VM must be paused."
            },
            {
                "name": "setAsyncCallStackDepth",
                "parameters": [
                    { "name": "maxDepth", "type": "integer", "description": "Maximum depth of async call stacks. Setting to <code>0</code> will effectively disable collecting async call stacks (default)." }
                ],
                "hidden": true,
                "description": "Enables or disables async call stacks tracking."
            },
            {
                "name": "setBlackboxPatterns",
                "parameters": [
                    { "name": "patterns", "type": "array", "items": { "type": "string" }, "description": "Array of regexps that will be used to check script url for blackbox state." }
                ],
                "hidden": true,
                "description": "Replace previous blackbox patterns with passed ones. Forces backend to skip stepping/pausing in scripts with url matching one of the patterns. VM will try to leave blackboxed script by performing 'step in' several times, finally resorting to 'step out' if unsuccessful."
            },
            {
                "name": "setBlackboxedRanges",
                "parameters": [
                    { "name": "scriptId", "$ref": "Runtime.ScriptId", "description": "Id of the script." },
                    { "name": "positions", "type": "array", "items": { "$ref": "ScriptPosition" } }
                ],
                "hidden": true,
                "description": "Makes backend skip steps in the script in blackboxed ranges. VM will try leave blacklisted scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful. Positions array contains positions where blackbox state is changed. First interval isn't blackboxed. Array should be sorted."
            }
        ],
        "events": [
            {
                "name": "scriptParsed",
                "parameters": [
                    { "name": "scriptId", "$ref": "Runtime.ScriptId", "description": "Identifier of the script parsed." },
                    { "name": "url", "type": "string", "description": "URL or name of the script parsed (if any)." },
                    { "name": "startLine", "type": "integer", "description": "Line offset of the script within the resource with given URL (for script tags)." },
                    { "name": "startColumn", "type": "integer", "description": "Column offset of the script within the resource with given URL." },
                    { "name": "endLine", "type": "integer", "description": "Last line of the script." },
                    { "name": "endColumn", "type": "integer", "description": "Length of the last line of the script." },
                    { "name": "executionContextId", "$ref": "Runtime.ExecutionContextId", "description": "Specifies script creation context.", "hidden": true },
                    { "name": "hash", "type": "string", "hidden": true, "description": "Content hash of the script."},
                    { "name": "isContentScript", "type": "boolean", "optional": true, "description": "Determines whether this script is a user extension script." },
                    { "name": "isInternalScript", "type": "boolean", "optional": true, "description": "Determines whether this script is an internal script.", "hidden": true },
                    { "name": "isLiveEdit", "type": "boolean", "optional": true, "description": "True, if this script is generated as a result of the live edit operation.", "hidden": true },
                    { "name": "sourceMapURL", "type": "string", "optional": true, "description": "URL of source map associated with script (if any)." },
                    { "name": "hasSourceURL", "type": "boolean", "optional": true, "description": "True, if this script has sourceURL.", "hidden": true },
                    { "name": "deprecatedCommentWasUsed", "type": "boolean", "optional": true, "hidden": true, "description": "True, if '//@ sourceURL' or '//@ sourceMappingURL' was used."}
                ],
                "description": "Fired when virtual machine parses script. This event is also fired for all known and uncollected scripts upon enabling debugger."
            },
            {
                "name": "scriptFailedToParse",
                "parameters": [
                    { "name": "scriptId", "$ref": "Runtime.ScriptId", "description": "Identifier of the script parsed." },
                    { "name": "url", "type": "string", "description": "URL or name of the script parsed (if any)." },
                    { "name": "startLine", "type": "integer", "description": "Line offset of the script within the resource with given URL (for script tags)." },
                    { "name": "startColumn", "type": "integer", "description": "Column offset of the script within the resource with given URL." },
                    { "name": "endLine", "type": "integer", "description": "Last line of the script." },
                    { "name": "endColumn", "type": "integer", "description": "Length of the last line of the script." },
                    { "name": "executionContextId", "$ref": "Runtime.ExecutionContextId", "description": "Specifies script creation context.", "hidden": true },
                    { "name": "hash", "type": "string", "hidden": true, "description": "Content hash of the script."},
                    { "name": "isContentScript", "type": "boolean", "optional": true, "description": "Determines whether this script is a user extension script." },
                    { "name": "isInternalScript", "type": "boolean", "optional": true, "description": "Determines whether this script is an internal script.", "hidden": true },
                    { "name": "sourceMapURL", "type": "string", "optional": true, "description": "URL of source map associated with script (if any)." },
                    { "name": "hasSourceURL", "type": "boolean", "optional": true, "description": "True, if this script has sourceURL.", "hidden": true },
                    { "name": "deprecatedCommentWasUsed", "type": "boolean", "optional": true, "hidden": true, "description": "True, if '//@ sourceURL' or '//@ sourceMappingURL' was used."}
                ],
                "description": "Fired when virtual machine fails to parse the script."
            },
            {
                "name": "breakpointResolved",
                "parameters": [
                    { "name": "breakpointId", "$ref": "BreakpointId", "description": "Breakpoint unique identifier." },
                    { "name": "location", "$ref": "Location", "description": "Actual breakpoint location." }
                ],
                "description": "Fired when breakpoint is resolved to an actual script and location."
            },
            {
                "name": "paused",
                "parameters": [
                    { "name": "callFrames", "type": "array", "items": { "$ref": "CallFrame" }, "description": "Call stack the virtual machine stopped on." },
                    { "name": "reason", "type": "string", "enum": [ "XHR", "DOM", "EventListener", "exception", "assert", "CSPViolation", "debugCommand", "promiseRejection", "other" ], "description": "Pause reason." },
                    { "name": "data", "type": "object", "optional": true, "description": "Object containing break-specific auxiliary properties." },
                    { "name": "hitBreakpoints", "type": "array", "optional": true, "items": { "type": "string" }, "description": "Hit breakpoints IDs", "hidden": true },
                    { "name": "asyncStackTrace", "$ref": "Runtime.StackTrace", "optional": true, "description": "Async stack trace, if any.", "hidden": true }
                ],
                "description": "Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria."
            },
            {
                "name": "resumed",
                "description": "Fired when the virtual machine resumed execution."
            }
        ]
    },
    {
        "domain": "Profiler",
        "dependencies": ["Runtime", "Debugger"],
        "hidden": true,
        "types": [
            {
                "id": "CPUProfileNode",
                "type": "object",
                "description": "CPU Profile node. Holds callsite information, execution statistics and child nodes.",
                "properties": [
                    { "name": "functionName", "type": "string", "description": "Function name." },
                    { "name": "scriptId", "$ref": "Runtime.ScriptId", "description": "Script identifier." },
                    { "name": "url", "type": "string", "description": "URL." },
                    { "name": "lineNumber", "type": "integer", "description": "1-based line number of the function start position." },
                    { "name": "columnNumber", "type": "integer", "description": "1-based column number of the function start position." },
                    { "name": "hitCount", "type": "integer", "description": "Number of samples where this node was on top of the call stack." },
                    { "name": "callUID", "type": "number", "description": "Call UID." },
                    { "name": "children", "type": "array", "items": { "$ref": "CPUProfileNode" }, "description": "Child nodes." },
                    { "name": "deoptReason", "type": "string", "description": "The reason of being not optimized. The function may be deoptimized or marked as don't optimize."},
                    { "name": "id", "type": "integer", "description": "Unique id of the node." },
                    { "name": "positionTicks", "type": "array", "items": { "$ref": "PositionTickInfo" }, "description": "An array of source position ticks." }
                ]
            },
            {
                "id": "CPUProfile",
                "type": "object",
                "description": "Profile.",
                "properties": [
                    { "name": "head", "$ref": "CPUProfileNode" },
                    { "name": "startTime", "type": "number", "description": "Profiling start time in seconds." },
                    { "name": "endTime", "type": "number", "description": "Profiling end time in seconds." },
                    { "name": "samples", "optional": true, "type": "array", "items": { "type": "integer" }, "description": "Ids of samples top nodes." },
                    { "name": "timestamps", "optional": true, "type": "array", "items": { "type": "number" }, "description": "Timestamps of the samples in microseconds." }
                ]
            },
            {
                "id": "PositionTickInfo",
                "type": "object",
                "description": "Specifies a number of samples attributed to a certain source position.",
                "properties": [
                    { "name": "line", "type": "integer", "description": "Source line number (1-based)." },
                    { "name": "ticks", "type": "integer", "description": "Number of samples attributed to the source line." }
                ]
            }
        ],
        "commands": [
            {
                "name": "enable"
            },
            {
                "name": "disable"
            },
            {
                "name": "setSamplingInterval",
                "parameters": [
                    { "name": "interval", "type": "integer", "description": "New sampling interval in microseconds." }
                ],
                "description": "Changes CPU profiler sampling interval. Must be called before CPU profiles recording started."
            },
            {
                "name": "start"
            },
            {
                "name": "stop",
                "returns": [
                    { "name": "profile", "$ref": "CPUProfile", "description": "Recorded profile." }
                ]
            }
        ],
        "events": [
            {
                "name": "consoleProfileStarted",
                "parameters": [
                    { "name": "id", "type": "string" },
                    { "name": "location", "$ref": "Debugger.Location", "description": "Location of console.profile()." },
                    { "name": "title", "type": "string", "optional": true, "description": "Profile title passed as argument to console.profile()." }
                ],
                "description": "Sent when new profile recodring is started using console.profile() call."
            },
            {
                "name": "consoleProfileFinished",
                "parameters": [
                    { "name": "id", "type": "string" },
                    { "name": "location", "$ref": "Debugger.Location", "description": "Location of console.profileEnd()." },
                    { "name": "profile", "$ref": "CPUProfile" },
                    { "name": "title", "type": "string", "optional": true, "description": "Profile title passed as argunet to console.profile()." }
                ]
            }
        ]
    },
    {
        "domain": "HeapProfiler",
        "dependencies": ["Runtime"],
        "hidden": true,
        "types": [
            {
                "id": "HeapSnapshotObjectId",
                "type": "string",
                "description": "Heap snapshot object id."
            },
            {
                "id": "SamplingHeapProfileNode",
                "type": "object",
                "description": "Sampling Heap Profile node. Holds callsite information, allocation statistics and child nodes.",
                "properties": [
                    { "name": "functionName", "type": "string", "description": "Function name." },
                    { "name": "scriptId", "$ref": "Runtime.ScriptId", "description": "Script identifier." },
                    { "name": "url", "type": "string", "description": "URL." },
                    { "name": "lineNumber", "type": "integer", "description": "1-based line number of the function start position." },
                    { "name": "columnNumber", "type": "integer", "description": "1-based column number of the function start position." },
                    { "name": "selfSize", "type": "number", "description": "Allocations size in bytes for the node excluding children." },
                    { "name": "children", "type": "array", "items": { "$ref": "SamplingHeapProfileNode" }, "description": "Child nodes." }
                ]
            },
            {
                "id": "SamplingHeapProfile",
                "type": "object",
                "description": "Profile.",
                "properties": [
                    { "name": "head", "$ref": "SamplingHeapProfileNode" }
                ]
            }
        ],
        "commands": [
            {
                "name": "enable"
            },
            {
                "name": "disable"
            },
            {
                "name": "startTrackingHeapObjects",
                "parameters": [
                    { "name": "trackAllocations", "type": "boolean", "optional": true }
                ]
            },
            {
                "name": "stopTrackingHeapObjects",
                "parameters": [
                    { "name": "reportProgress", "type": "boolean", "optional": true, "description": "If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken when the tracking is stopped." }
                ]
            },
            {
                "name": "takeHeapSnapshot",
                "parameters": [
                    { "name": "reportProgress", "type": "boolean", "optional": true, "description": "If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken." }
                ]
            },
            {
                "name": "collectGarbage"
            },
            {
                "name": "getObjectByHeapObjectId",
                "parameters": [
                    { "name": "objectId", "$ref": "HeapSnapshotObjectId" },
                    { "name": "objectGroup", "type": "string", "optional": true, "description": "Symbolic group name that can be used to release multiple objects." }
                ],
                "returns": [
                    { "name": "result", "$ref": "Runtime.RemoteObject", "description": "Evaluation result." }
                ]
            },
            {
                "name": "addInspectedHeapObject",
                "parameters": [
                    { "name": "heapObjectId", "$ref": "HeapSnapshotObjectId", "description": "Heap snapshot object id to be accessible by means of $x command line API." }
                ],
                "description": "Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions)."
            },
            {
                "name": "getHeapObjectId",
                "parameters": [
                    { "name": "objectId", "$ref": "Runtime.RemoteObjectId", "description": "Identifier of the object to get heap object id for." }
                ],
                "returns": [
                    { "name": "heapSnapshotObjectId", "$ref": "HeapSnapshotObjectId", "description": "Id of the heap snapshot object corresponding to the passed remote object id." }
                ]
            },
            {
                "name": "startSampling",
                "parameters": [
                    { "name": "samplingInterval", "type": "number", "optional": true, "description": "Average sample interval in bytes. Poisson distribution is used for the intervals. The default value is 32768 bytes." }
                ]
            },
            {
                "name": "stopSampling",
                "returns": [
                    { "name": "profile", "$ref": "SamplingHeapProfile", "description": "Recorded sampling heap profile." }
                ]
            }
        ],
        "events": [
            {
                "name": "addHeapSnapshotChunk",
                "parameters": [
                    { "name": "chunk", "type": "string" }
                ]
            },
            {
                "name": "resetProfiles"
            },
            {
                "name": "reportHeapSnapshotProgress",
                "parameters": [
                    { "name": "done", "type": "integer" },
                    { "name": "total", "type": "integer" },
                    { "name": "finished", "type": "boolean", "optional": true }
                ]
            },
            {
                "name": "lastSeenObjectId",
                "description": "If heap objects tracking has been started then backend regulary sends a current value for last seen object id and corresponding timestamp. If the were changes in the heap since last event then one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.",
                "parameters": [
                    { "name": "lastSeenObjectId", "type": "integer" },
                    { "name": "timestamp", "type": "number" }
                ]
            },
            {
                "name": "heapStatsUpdate",
                "description": "If heap objects tracking has been started then backend may send update for one or more fragments",
                "parameters": [
                    { "name": "statsUpdate", "type": "array", "items": { "type": "integer" }, "description": "An array of triplets. Each triplet describes a fragment. The first integer is the fragment index, the second integer is a total count of objects for the fragment, the third integer is a total size of the objects for the fragment."}
                ]
            }
        ]
    }]
}