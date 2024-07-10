class FullProblemDefinationParser {
    constructor(title, functionName, inputs, output) {
        this.title = title;
        this.functionName = functionName;
        this.inputFields = inputs;
        this.output = output;
    }

    generateJs() {
        const inputs = this.inputFields
            .map((field) => field.variableName)
            .join(", ");
        const inputReads = this.inputFields
            .map((field) => {
                return `const ${field.variableName} = ${field.value};`;
            })
            .join("\n  ");
        const outputType = this.output.type;
        const functionCall = `const result = ${this.functionName}(${inputs});`;
        const outputWrite = `console.log(result);`;

        return `##USER_CODE_HERE##

        ${inputReads}
        ${functionCall}
        ${outputWrite}
            `;
    }

    mapTypeToCpp(type) {
        switch (type) {
            case "int":
                return "int";
            case "float":
                return "float";
            case "string":
                return "std::string";
            case "bool":
                return "bool";
            case "list<int>":
                return "std::vector<int>";
            case "list<float>":
                return "std::vector<float>";
            case "list<string>":
                return "std::vector<std::string>";
            case "list<bool>":
                return "std::vector<bool>";
            default:
                return "unknown";
        }
    }

    mapTypeToRust(type) {
        switch (type) {
            case "int":
                return "i32";
            case "float":
                return "f64";
            case "string":
                return "String";
            case "bool":
                return "bool";
            case "list<int>":
                return "Vec<i32>";
            case "list<float>":
                return "Vec<f64>";
            case "list<string>":
                return "Vec<String>";
            case "list<bool>":
                return "Vec<bool>";
            default:
                return "unknown";
        }
    }

    mapTypeToJava(type) {
        switch (type) {
            case "int":
                return "int";
            case "float":
                return "float";
            case "string":
                return "String";
            case "bool":
                return "boolean";
            case "list<int>":
                return "List<Integer>";
            case "list<float>":
                return "List<Float>";
            case "list<string>":
                return "List<String>";
            case "list<bool>":
                return "List<Boolean>";
            default:
                return "unknown";
        }
    }
}
export { FullProblemDefinationParser };
