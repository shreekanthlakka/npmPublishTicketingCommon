class ProblemDefinationParser {
    constructor(title, functionName, inputs, output) {
        this.title = title;
        this.inputs = inputs;
        this.output = output;
        this.functionName = functionName;
    }
    generateJavaScript() {
        const inputs = this.inputs.map((ele) => ele.variableName).join(", ");
        const output = this.output.variableName;
        return `
function ${this.functionName}(${inputs}) {
    // write your logic here
    return ${output};
}`;
    }
    // generatePython() {
    //     const inputs = this.inputs.map((ele) => ele.variableName).join(", ");
    //     const output = this.output.variableName;
    //     return `def ${this.functionName}(${inputs}):
    //     # write your logic here
    //     return ${output}`;
    // }

    generateRust() {
        const inputs = this.inputs
            .map(
                (field) =>
                    `${field.variableName}: ${this.mapTypeToRust(field.type)}`
            )
            .join(", ");
        const outputType = this.mapTypeToRust(this.output.type);
        return `fn ${this.functionName}(${inputs}) -> ${outputType} {\n\t//Implementation goes here\n\tresult\n}`;
    }

    generateCpp() {
        const inputs = this.inputs
            .map(
                (field) =>
                    `${this.mapTypeToCpp(field.type)} ${field.variableName}`
            )
            .join(", ");
        return `${this.mapTypeToCpp(this.output.type)} ${
            this.functionName
        }(${inputs}) {\n\t//Implementation goes here\n\treturn result;\n}`;
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

export { ProblemDefinationParser };
