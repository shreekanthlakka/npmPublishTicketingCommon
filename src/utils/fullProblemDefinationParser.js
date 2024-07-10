class FullProblemDefinationParser {
    constructor(title, functionName, inputs, output) {
        this.title = title;
        this.functionName = functionName;
        this.inputFields = inputs;
        this.output = output;
    }

    generateJavascript() {
        const inputs = this.inputFields
            .map((field) => field.variableName)
            .join(", ");
        const inputReads = this.inputFields
            .map((field) => {
                return `const ${field.variableName} = ${field.value};`;
            })
            .join("\n\t  ");
        const outputType = this.output.type;
        const functionCall = `const result = ${this.functionName}(${inputs});`;
        const outputWrite = `console.log(result);`;

        return `
        ##USER_CODE_HERE##

            ${inputReads}
            ${functionCall}
            ${outputWrite}
        `;
    }

    generateRust() {
        const inputs = this.inputFields
            .map(
                (field) =>
                    `${field.variableName}: ${this.mapTypeToRust(field.type)}`
            )
            .join(", ");
        const inputReads = this.inputFields
            .map((field) => {
                const type = this.mapTypeToRust(field.type);
                if (type.startsWith("Vec")) {
                    return `let ${field.variableName}: ${type} = ${field.value}.to_vec();`;
                } else if (type === "String") {
                    return `let ${field.variableName}: ${type} = ${field.value}.to_string();`;
                } else {
                    return `let ${field.variableName}: ${type} = ${field.value};`;
                }
            })
            .join("\n\t  ");
        const outputType = this.mapTypeToRust(this.output.type);
        const functionCall = `let result = ${this.title}(${this.inputFields
            .map((field) => field.variableName)
            .join(", ")});`;
        const outputWrite = `println!("result = {:?}", result);`;

        return `
        ##USER_CODE_HERE##
        fn main() {
            ${inputReads}
            ${functionCall}
            ${outputWrite}
        }`;
    }

    generateCpp() {
        const inputs = this.inputFields
            .map(
                (field) =>
                    `${this.mapTypeToCpp(field.type)} ${field.variableName}`
            )
            .join(", ");
        const inputReads = this.inputFields
            .map((field) => {
                const type = this.mapTypeToCpp(field.type);
                if (type.startsWith("std::vector")) {
                    return `${type} ${field.variableName} = ${field.value};`;
                } else {
                    return `${type} ${field.variableName} = ${field.value};`;
                }
            })
            .join("\n\t  ");
        const outputType = this.output.type;
        const functionCall = `${outputType} result = ${
            this.functionName
        }(${this.inputFields.map((field) => field.variableName).join(", ")});`;
        const outputWrite = `std::cout << result << std::endl;`;

        return `
        #include <iostream>
        #include <vector>
        #include <string>
        
        ##USER_CODE_HERE##
        
        int main() {
            ${inputReads}
            ${functionCall}
            ${outputWrite}
            return 0;
        }
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
