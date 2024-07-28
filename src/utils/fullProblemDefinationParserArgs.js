class GenerateFullBoilerPlateCodeArgs {
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
            .map((field, index) => {
                return `const ${field.variableName} = JSON.parse(process.argv[${
                    index + 2
                }]);`;
            })
            .join("\n\t");
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
        const inputReads = this.inputFields
            .map((field, index) => {
                // const type = this.mapTypeToRust(field.type);
                // if (type.startsWith("Vec")) {
                //     return `let ${field.variableName}: ${type} = serde_json::from_str(&args[${index}]).unwrap();`;
                // } else if (type === "String") {
                //     return `let ${field.variableName}: ${type} = args[${index}].to_string();`;
                // } else {
                //     return `let ${field.variableName}: ${type} = args[${index}].parse().unwrap();`;
                // }
                const type = this.mapTypeToRust(field.type);
                if (type.startsWith("Vec")) {
                    return `let ${field.variableName}: ${type} = serde_json::from_str(&args[${index}]).expect("Invalid input for ${field.variableName}");`;
                } else if (type === "String") {
                    return `let ${field.variableName}: ${type} = args[${index}].to_string();`;
                } else {
                    return `let ${field.variableName}: ${type} = args[${index}].parse().expect("Invalid input for ${field.variableName}");`;
                }
            })
            .join("\n\t");
        const functionCall = `let result = ${
            this.functionName
        }(${this.inputFields.map((field) => field.variableName).join(", ")});`;
        const outputWrite = `println!("result = {:?}", result);`;

        return `
##USER_CODE_HERE##

use std::env;

fn main() {
    let args: Vec<String> = env::args().skip(1).collect();
    ${inputReads}
    ${functionCall}
    ${outputWrite}
}
        `;
    }

    generateCpp() {
        const inputReads = this.inputFields
            .map((field, index) => {
                // const type = this.mapTypeToCpp(field.type);
                // if (type.startsWith("std::vector")) {
                //     return `${type} ${
                //         field.variableName
                //     } = parseArray<int>(argv[${index + 1}]);`;
                // } else if (type === "std::string") {
                //     return `${type} ${field.variableName} = argv[${
                //         index + 1
                //     }];`;
                // } else {
                //     return `${type} ${field.variableName} = std::stoi(argv[${
                //         index + 1
                //     }]);`;
                // }
                const type = this.mapTypeToCpp(field.type);
                if (type.startsWith("std::vector")) {
                    // Adjust the parseArray template type based on the field type
                    const elementType = type.match(/std::vector<(.+)>/)[1];
                    return `${type} ${
                        field.variableName
                    } = parseArray<${elementType}>(argv[${index + 1}]);`;
                } else if (type === "std::string") {
                    return `${type} ${field.variableName} = argv[${
                        index + 1
                    }];`;
                } else {
                    // Add more type parsing if needed
                    return `${type} ${field.variableName} = std::stoi(argv[${
                        index + 1
                    }]);`;
                }
            })
            .join("\n\t");
        const functionCall = `${this.mapTypeToCpp(this.output.type)} result = ${
            this.functionName
        }(${this.inputFields.map((field) => field.variableName).join(", ")});`;
        const outputWrite = `std::cout << result << std::endl;`;

        return `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>

template <typename T>
std::vector<T> parseArray(const std::string &s) {
    std::vector<T> result;
    std::stringstream ss(s.substr(1, s.size() - 2)); // Remove the square brackets
    T value;
    while (ss >> value) {
        result.push_back(value);
        if (ss.peek() == ',')
            ss.ignore();
    }
    return result;
}

##USER_CODE_HERE##

int main(int argc, char* argv[]) {
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

export { GenerateFullBoilerPlateCodeArgs };
