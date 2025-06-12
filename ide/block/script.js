// =========================================================
// CRITICAL: ALL CUSTOM BLOCK DEFINITIONS AND JAVASCRIPT GENERATORS
// MUST BE DEFINED IMMEDIATELY AFTER BLOCKLY.MIN.JS IS LOADED,
// BEFORE ANY DOMContentLoaded LISTENERS OR BLOCKLY.INJECT CALLS.
// This ensures Blockly's internal generator system knows about them
// BEFORE it attempts to render or generate code.
// =========================================================

// DEBUGGING: Log Blockly's state at script start
console.log("--- Script Execution Start ---");
console.log("Blockly object at script start:", Blockly);
console.log("Blockly.JavaScript object at script start:", Blockly.JavaScript);

// CRITICAL: Ensure Blockly and its JavaScript generator are fully loaded
if (
  typeof Blockly === "undefined" ||
  typeof Blockly.JavaScript === "undefined"
) {
  console.error(
    "CRITICAL ERROR: Blockly or Blockly.JavaScript is not loaded or not defined globally. Check script loading order."
  );
  throw new Error("Blockly library not properly loaded.");
}

// Ensure all required properties exist (Blockly orders for code generation)
// These are crucial for correct code generation with operator precedence.
if (!Blockly.JavaScript.ORDER_ATOMIC) {
  console.log(
    "Initializing Blockly.JavaScript.ORDER constants if not present."
  );
  Blockly.JavaScript.ORDER_ATOMIC = 0;
  Blockly.JavaScript.ORDER_NEW = 1;
  Blockly.JavaScript.ORDER_MEMBER = 2;
  Blockly.JavaScript.ORDER_FUNCTION_CALL = 3;
  Blockly.JavaScript.ORDER_INCREMENT = 4;
  Blockly.JavaScript.ORDER_DECREMENT = 4;
  Blockly.JavaScript.ORDER_BITWISE_NOT = 4;
  Blockly.JavaScript.ORDER_UNARY_PLUS = 4;
  Blockly.JavaScript.ORDER_UNARY_NEGATION = 4;
  Blockly.JavaScript.ORDER_LOGICAL_NOT = 4;
  Blockly.JavaScript.ORDER_TYPEOF = 4;
  Blockly.JavaScript.ORDER_VOID = 4;
  Blockly.JavaScript.ORDER_DELETE = 4;
  Blockly.JavaScript.ORDER_AWAIT = 4;
  Blockly.JavaScript.ORDER_EXPONENTIATION = 5; // Math.pow is effectively this order
  Blockly.JavaScript.ORDER_MULTIPLICATION = 6;
  Blockly.JavaScript.ORDER_DIVISION = 6;
  Blockly.JavaScript.ORDER_MODULUS = 6;
  Blockly.JavaScript.ORDER_SUBTRACTION = 7;
  Blockly.JavaScript.ORDER_ADDITION = 7;
  Blockly.JavaScript.ORDER_BITWISE_SHIFT = 8;
  Blockly.JavaScript.ORDER_RELATIONAL = 9;
  Blockly.JavaScript.ORDER_IN = 9;
  Blockly.JavaScript.ORDER_INSTANCEOF = 9;
  Blockly.JavaScript.ORDER_EQUALITY = 10;
  Blockly.JavaScript.ORDER_BITWISE_AND = 11;
  Blockly.JavaScript.ORDER_BITWISE_XOR = 12;
  Blockly.JavaScript.ORDER_BITWISE_OR = 13;
  Blockly.JavaScript.ORDER_LOGICAL_AND = 14;
  Blockly.JavaScript.ORDER_LOGICAL_OR = 15;
  Blockly.JavaScript.ORDER_CONDITIONAL = 16;
  Blockly.JavaScript.ORDER_ASSIGNMENT = 17;
  Blockly.JavaScript.ORDER_YIELD = 18;
  Blockly.JavaScript.ORDER_COMMA = 19;
  Blockly.JavaScript.ORDER_NONE = 99; // For statements or when no precedence needed
}

// --- Custom Block Definitions and JavaScript Generators ---

// --- 1. Define the Custom AP CSP Theme ---
// This theme aims to use the hue values from your toolbox categories.
// Blockly's default renderers (like 'thrasos' or 'geras') naturally provide
// the curved, puzzle-piece connections. We just need to define the colors
// for each style.
const AP_CSP_IMAGE_THEME = new Blockly.Theme("ap_csp_image_theme", {
  variables_io_style: {
    // Corresponds to colour="330" (Reddish-purple)
    colourPrimary: "#a55b5b", // Example: Vibrant Magenta
    colourSecondary: "#a55b5b", // Lighter
    colourTertiary: "#a55b5b", // Darker
  },
  math_style: {
    // Corresponds to colour="230" (Blue)
    colourPrimary: "#a5935b", // Example: Pure Blue
    colourSecondary: "#a5935b", // Lighter
    colourTertiary: "#a5935b", // Darker
  },
  logic_style: {
    // Corresponds to colour="210" (Light Blue/Cyan)
    colourPrimary: "#80a55b", // Example: Cyan
    colourSecondary: "#80a55b", // Lighter
    colourTertiary: "#80a55b", // Darker
  },
  control_flow_style: {
    // Corresponds to colour="120" (Green)
    colourPrimary: "#5ba56d", // Example: Lime Green
    colourSecondary: "#5ba56d", // Lighter
    colourTertiary: "#5ba56d", // Darker
  },
  list_style: {
    // Corresponds to colour="260" (Purple)
    colourPrimary: "#5ba5a5", // Example: Deep Purple
    colourSecondary: "#5ba5a5", // Lighter
    colourTertiary: "#5ba5a5", // Darker
  },
  strings_style: {
    // Corresponds to colour="160" (Yellow-Green)
    colourPrimary: "#5b6da5", // Example: Goldenrod
    colourSecondary: "#5b6da5", // Lighter
    colourTertiary: "#5b6da5", // Darker
  },
  procedures_style: {
    // Corresponds to colour="290" (Magenta/Pink)
    colourPrimary: "#805ba5", // Example: Bright Pink/Rose
    colourSecondary: "#805ba5", // Lighter
    colourTertiary: "#805ba5", // Darker
  },
  comments_style: {
    // Corresponds to colour="0" (Red)
    colourPrimary: "#a55b93", // Example: Pure Red
    colourSecondary: "#a55b93", // Lighter
    colourTertiary: "#a55b93", // Darker
  },
  // You might also want a generic 'value_block_style' if some value blocks don't fit
  // perfectly into other categories, or if you want to override specific block colours.
  // For now, these categories should cover all blocks.
  value_block_style: {
    // Default for basic literals if not covered by a category-specific style
    colourPrimary: "#777777", // A neutral grey
    colourSecondary: "#999999",
    colourTertiary: "#555555",
  },
});

// --- Data Types ---

// Number block (Literal)
Blockly.Blocks["apcsp_number"] = {
  init: function () {
    this.appendDummyInput().appendField(new Blockly.FieldNumber(0), "NUM");
    this.setOutput(true, "Number");
    this.setStyle("variables_io_style"); // Assign custom style
    this.setTooltip("A number value");
  },
};

Blockly.JavaScript.forBlock["apcsp_number"] = function (block) {
  var code = String(block.getFieldValue("NUM"));
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Boolean block (Literal)
Blockly.Blocks["apcsp_boolean"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["true", "TRUE"],
        ["false", "FALSE"],
      ]),
      "BOOL"
    );
    this.setOutput(true, "Boolean");
    this.setStyle("variables_io_style"); // Assign custom style
    this.setTooltip("A boolean value (true or false)");
  },
};

Blockly.JavaScript.forBlock["apcsp_boolean"] = function (block) {
  var code = block.getFieldValue("BOOL") === "TRUE" ? "true" : "false";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// String block (Literal)
Blockly.Blocks["apcsp_string"] = {
  init: function () {
    this.appendDummyInput().appendField(new Blockly.FieldTextInput(""), "TEXT");
    this.setOutput(true, "String");
    this.setStyle("variables_io_style"); // Assign custom style
    this.setTooltip("A text string value");
  },
};

Blockly.JavaScript.forBlock["apcsp_string"] = function (block) {
  var code = JSON.stringify(block.getFieldValue("TEXT"));
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// --- Assignment, Display, and Input blocks ---

// Assignment block (a ← expression)
Blockly.Blocks["apcsp_assign"] = {
  init: function () {
    this.appendValueInput("VALUE")
      .setCheck(null)
      .appendField(new Blockly.FieldVariable("item"), "VAR")
      .appendField("←");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("variables_io_style"); // Assign custom style
    this.setTooltip("Assign a value to a variable");
  },
};

Blockly.JavaScript.forBlock["apcsp_assign"] = function (block) {
  var variable = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue("VAR"),
    Blockly.Variables.NAME_TYPE
  );
  var value =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_ASSIGNMENT
    ) || "0";
  return variable + " = " + value + ";\n";
};

// NEW BLOCK: Get Variable Value
Blockly.Blocks["apcsp_get_variable"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldVariable("item"),
      "VAR"
    );
    this.setOutput(true, null); // This block outputs a value
    this.setStyle("variables_io_style"); // Assign custom style
    this.setTooltip("Gets the current value of a variable.");
  },
};

Blockly.JavaScript.forBlock["apcsp_get_variable"] = function (block) {
  var variableName = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue("VAR"),
    Blockly.Variables.NAME_TYPE
  );
  // Return the variable name as code. ORDER_ATOMIC means no parentheses needed.
  return [variableName, Blockly.JavaScript.ORDER_ATOMIC];
};

// DISPLAY (expression)
Blockly.Blocks["apcsp_display"] = {
  init: function () {
    this.appendValueInput("VALUE").setCheck(null).appendField("DISPLAY (");
    this.appendDummyInput().appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("variables_io_style"); // Assign custom style
    this.setTooltip("Display a value");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_display"] = function (block) {
  var value =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE
    ) || "''";
  return "console.log(" + value + ");\n";
};

// INPUT (SHOW: prompt)
Blockly.Blocks["apcsp_input"] = {
  init: function () {
    this.appendValueInput("PROMPT") // New input named "PROMPT"
      .setCheck(["String", "Number", "Boolean"]) // Prompt can be a string, number, or boolean (will be converted to string)
      .appendField("INPUT (SHOW:"); // Text shown on the block for the prompt input

    this.appendDummyInput() // A dummy input to close the parenthesis
      .appendField(")");

    this.setInputsInline(true); // Keep inputs on one line
    this.setOutput(true, null); // Still outputs a value (the user's input)
    this.setStyle("variables_io_style"); // Keep the same style
    this.setTooltip("Reads input from the user after showing a prompt.");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript.forBlock["apcsp_input"] = function (block) {
  // Get the code for the PROMPT input
  var prompt =
    Blockly.JavaScript.valueToCode(
      block,
      "PROMPT",
      Blockly.JavaScript.ORDER_NONE
    ) || '""'; // Default to empty string if no prompt is given

  // AP CSP pseudocode typically represents input with a prompt like: INPUT("Enter value:")
  // In JavaScript, this maps to prompt("Your prompt"). The prompt() function returns a string.
  // If you need it as a number, you'd wrap it in Number().
  return ["prompt(" + prompt + ")", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// --- Arithmetic Operators and Numeric Procedures ---

// ADDITION block: a + b
Blockly.Blocks["apcsp_add"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Number");
    this.appendValueInput("B").setCheck("Number").appendField("+");
    this.setOutput(true, "Number");
    this.setStyle("math_style"); // Assign custom style
    this.setTooltip("Add two numbers");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_add"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_ADDITION
    ) || "0";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_ADDITION
    ) || "0";
  return [a + " + " + b, Blockly.JavaScript.ORDER_ADDITION];
};

// SUBTRACTION block: a - b
Blockly.Blocks["apcsp_subtract"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Number");
    this.appendValueInput("B").setCheck("Number").appendField("-");
    this.setOutput(true, "Number");
    this.setStyle("math_style"); // Assign custom style
    this.setTooltip("Subtract b from a");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_subtract"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_SUBTRACTION
    ) || "0";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_SUBTRACTION
    ) || "0";
  return [a + " - " + b, Blockly.JavaScript.ORDER_SUBTRACTION];
};

// MULTIPLICATION block: a * b
Blockly.Blocks["apcsp_multiply"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Number");
    this.appendValueInput("B").setCheck("Number").appendField("×"); // Using the correct symbol
    this.setOutput(true, "Number");
    this.setStyle("math_style"); // Assign custom style
    this.setTooltip("Multiply a by b");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_multiply"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_MULTIPLICATION
    ) || "0";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_MULTIPLICATION
    ) || "0";
  return [a + " * " + b, Blockly.JavaScript.ORDER_MULTIPLICATION];
};

// DIVISION block: a / b
Blockly.Blocks["apcsp_divide"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Number");
    this.appendValueInput("B").setCheck("Number").appendField("÷"); // Using the correct symbol
    this.setOutput(true, "Number");
    this.setStyle("math_style"); // Assign custom style
    this.setTooltip("Divide a by b");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_divide"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_DIVISION
    ) || "0";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_DIVISION
    ) || "1"; // Default to 1 to prevent division by zero in preview
  return [a + " / " + b, Blockly.JavaScript.ORDER_DIVISION];
};

// MOD block
Blockly.Blocks["apcsp_mod"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Number");
    this.appendValueInput("B").setCheck("Number").appendField("MOD");
    this.setOutput(true, "Number");
    this.setStyle("math_style");
    this.setTooltip("Returns the remainder when a is divided by b");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_mod"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_MODULUS
    ) || "0";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_MODULUS
    ) || "1"; // Default to 1 to prevent division by zero in preview
  return [a + " % " + b, Blockly.JavaScript.ORDER_MODULUS];
};

// RANDOM (a, b)
Blockly.Blocks["apcsp_random"] = {
  init: function () {
    this.appendValueInput("MIN").setCheck("Number").appendField("RANDOM (");
    this.appendValueInput("MAX").setCheck("Number").appendField(",");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setStyle("math_style");
    this.setTooltip("Generate a random integer from a to b, inclusive");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_random"] = function (block) {
  var min =
    Blockly.JavaScript.valueToCode(
      block,
      "MIN",
      Blockly.JavaScript.ORDER_COMMA
    ) || "0";
  var max =
    Blockly.JavaScript.valueToCode(
      block,
      "MAX",
      Blockly.JavaScript.ORDER_COMMA
    ) || "1";
  // Ensure min and max are treated as numbers to avoid string concatenation issues
  var code =
    "Math.floor(Math.random() * (Number(" +
    max +
    ") - Number(" +
    min +
    ") + 1)) + Number(" +
    min +
    ")";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// SQRT (a)
Blockly.Blocks["apcsp_sqrt"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("SQRT (");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setStyle("math_style");
    this.setTooltip("Calculates the square root of a number.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_sqrt"] = function (block) {
  var num =
    Blockly.JavaScript.valueToCode(
      block,
      "NUM",
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || "0";
  var code = "Math.sqrt(" + num + ")";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// ABS (a)
Blockly.Blocks["apcsp_abs"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("ABS (");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setStyle("math_style");
    this.setTooltip("Calculates the absolute value of a number.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_abs"] = function (block) {
  var num =
    Blockly.JavaScript.valueToCode(
      block,
      "NUM",
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || "0";
  var code = "Math.abs(" + num + ")";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// MIN (a, b)
Blockly.Blocks["apcsp_min"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Number").appendField("MIN (");
    this.appendValueInput("B").setCheck("Number").appendField(",");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setStyle("math_style");
    this.setTooltip("Returns the smaller of two numbers.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_min"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_COMMA
    ) || "0";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_COMMA
    ) || "0";
  var code = "Math.min(" + a + ", " + b + ")";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// MAX (a, b)
Blockly.Blocks["apcsp_max"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Number").appendField("MAX (");
    this.appendValueInput("B").setCheck("Number").appendField(",");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setStyle("math_style");
    this.setTooltip("Returns the larger of two numbers.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_max"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_COMMA
    ) || "0";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_COMMA
    ) || "0";
  var code = "Math.max(" + a + ", " + b + ")";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// ROUND (a)
Blockly.Blocks["apcsp_round"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("ROUND (");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setStyle("math_style");
    this.setTooltip("Rounds a number to the nearest integer.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_round"] = function (block) {
  var num =
    Blockly.JavaScript.valueToCode(
      block,
      "NUM",
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || "0";
  var code = "Math.round(" + num + ")";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// FLOOR (a)
Blockly.Blocks["apcsp_floor"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("FLOOR (");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setStyle("math_style");
    this.setTooltip("Rounds a number down to the nearest integer.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_floor"] = function (block) {
  var num =
    Blockly.JavaScript.valueToCode(
      block,
      "NUM",
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || "0";
  var code = "Math.floor(" + num + ")";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// CEILING (a)
Blockly.Blocks["apcsp_ceiling"] = {
  init: function () {
    this.appendValueInput("NUM").setCheck("Number").appendField("CEILING (");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setStyle("math_style");
    this.setTooltip("Rounds a number up to the nearest integer.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_ceiling"] = function (block) {
  var num =
    Blockly.JavaScript.valueToCode(
      block,
      "NUM",
      Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || "0";
  var code = "Math.ceil(" + num + ")";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// POWER (a, b)
Blockly.Blocks["apcsp_power"] = {
  init: function () {
    this.appendValueInput("BASE").setCheck("Number").appendField("POWER (");
    this.appendValueInput("EXPONENT").setCheck("Number").appendField(",");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setStyle("math_style");
    this.setTooltip("Raises base to the power of exponent.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_power"] = function (block) {
  var base =
    Blockly.JavaScript.valueToCode(
      block,
      "BASE",
      Blockly.JavaScript.ORDER_COMMA
    ) || "0";
  var exponent =
    Blockly.JavaScript.valueToCode(
      block,
      "EXPONENT",
      Blockly.JavaScript.ORDER_COMMA
    ) || "0";
  var code = "Math.pow(" + base + ", " + exponent + ")";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// --- String Operations ---

// CONCAT (str1, str2)
Blockly.Blocks["apcsp_concat"] = {
  init: function () {
    this.appendValueInput("STR1").setCheck("String").appendField("CONCAT (");
    this.appendValueInput("STR2").setCheck("String").appendField(",");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "String");
    this.setStyle("strings_style");
    this.setTooltip("Concatenates two strings.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_concat"] = function (block) {
  var str1 =
    Blockly.JavaScript.valueToCode(
      block,
      "STR1",
      Blockly.JavaScript.ORDER_ADDITION
    ) || "''";
  var str2 =
    Blockly.JavaScript.valueToCode(
      block,
      "STR2",
      Blockly.JavaScript.ORDER_ADDITION
    ) || "''";
  // Ensure both are treated as strings for concatenation
  var code = "String(" + str1 + ") + String(" + str2 + ")";
  return [code, Blockly.JavaScript.ORDER_ADDITION];
};

// SUBSTRING (str, start, end)
Blockly.Blocks["apcsp_substring"] = {
  init: function () {
    this.appendValueInput("STR").setCheck("String").appendField("SUBSTRING (");
    this.appendValueInput("START").setCheck("Number").appendField("from index");
    this.appendValueInput("END").setCheck("Number").appendField("to index");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "String");
    this.setStyle("strings_style");
    this.setTooltip(
      "Extracts a substring from 'start' (inclusive) to 'end' (inclusive) using 1-based indexing."
    );
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_substring"] = function (block) {
  var str =
    Blockly.JavaScript.valueToCode(
      block,
      "STR",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "''";
  var start =
    Blockly.JavaScript.valueToCode(
      block,
      "START",
      Blockly.JavaScript.ORDER_SUBTRACTION
    ) || "1";
  var end =
    Blockly.JavaScript.valueToCode(
      block,
      "END",
      Blockly.JavaScript.ORDER_NONE
    ) || "1"; // End is exclusive in JS slice, so no +1 needed for AP CSP inclusive if directly mapping

  // AP CSP is 1-based. JS slice is 0-based.
  // str.slice(start-1, end) will extract from start-1 up to (but not including) index 'end'
  // If AP CSP 'end' is inclusive, slice(start-1, end) gets characters from index (start-1) to (end-1)
  var code = str + ".slice(Number(" + start + ") - 1, Number(" + end + "))";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// UPPERCASE (str)
Blockly.Blocks["apcsp_uppercase"] = {
  init: function () {
    this.appendValueInput("STR").setCheck("String").appendField("UPPERCASE (");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "String");
    this.setStyle("strings_style");
    this.setTooltip("Converts a string to uppercase.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_uppercase"] = function (block) {
  var str =
    Blockly.JavaScript.valueToCode(
      block,
      "STR",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "''";
  var code = str + ".toUpperCase()";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// LOWERCASE (str)
Blockly.Blocks["apcsp_lowercase"] = {
  init: function () {
    this.appendValueInput("STR").setCheck("String").appendField("LOWERCASE (");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "String");
    this.setStyle("strings_style");
    this.setTooltip("Converts a string to lowercase.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_lowercase"] = function (block) {
  var str =
    Blockly.JavaScript.valueToCode(
      block,
      "STR",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "''";
  var code = str + ".toLowerCase()";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// --- Relational and Boolean Operators ---

// EQUAL TO block: a = b
Blockly.Blocks["apcsp_equal"] = {
  init: function () {
    this.appendValueInput("A").setCheck(null);
    this.appendValueInput("B").setCheck(null).appendField("=");
    this.setOutput(true, "Boolean");
    this.setStyle("logic_style");
    this.setTooltip("Returns true if a equals b");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_equal"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_EQUALITY
    ) || "0";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_EQUALITY
    ) || "0";
  return [a + " === " + b, Blockly.JavaScript.ORDER_EQUALITY];
};

// NOT EQUAL TO block: a ≠ b
Blockly.Blocks["apcsp_not_equal"] = {
  init: function () {
    this.appendValueInput("A").setCheck(null);
    this.appendValueInput("B").setCheck(null).appendField("≠");
    this.setOutput(true, "Boolean");
    this.setStyle("logic_style");
    this.setTooltip("Returns true if a is not equal to b");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_not_equal"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_EQUALITY
    ) || "0";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_EQUALITY
    ) || "0";
  return [a + " !== " + b, Blockly.JavaScript.ORDER_EQUALITY];
};

// GREATER THAN block: a > b
Blockly.Blocks["apcsp_greater"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Number");
    this.appendValueInput("B").setCheck("Number").appendField(">");
    this.setOutput(true, "Boolean");
    this.setStyle("logic_style");
    this.setTooltip("Returns true if a is greater than b");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_greater"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_RELATIONAL
    ) || "0";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_RELATIONAL
    ) || "0";
  return [a + " > " + b, Blockly.JavaScript.ORDER_RELATIONAL];
};

// LESS THAN block: a < b
Blockly.Blocks["apcsp_less"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Number");
    this.appendValueInput("B").setCheck("Number").appendField("<");
    this.setOutput(true, "Boolean");
    this.setStyle("logic_style");
    this.setTooltip("Returns true if a is less than b");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_less"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_RELATIONAL
    ) || "0";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_RELATIONAL
    ) || "0";
  return [a + " < " + b, Blockly.JavaScript.ORDER_RELATIONAL];
};

// GREATER THAN OR EQUAL TO block: a ≥ b
Blockly.Blocks["apcsp_greater_equal"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Number");
    this.appendValueInput("B").setCheck("Number").appendField("≥");
    this.setOutput(true, "Boolean");
    this.setStyle("logic_style");
    this.setTooltip("Returns true if a is greater than or equal to b");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_greater_equal"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_RELATIONAL
    ) || "0";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_RELATIONAL
    ) || "0";
  return [a + " >= " + b, Blockly.JavaScript.ORDER_RELATIONAL];
};

// LESS THAN OR EQUAL TO block: a ≤ b
Blockly.Blocks["apcsp_less_equal"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Number");
    this.appendValueInput("B").setCheck("Number").appendField("≤");
    this.setOutput(true, "Boolean");
    this.setStyle("logic_style");
    this.setTooltip("Returns true if a is less than or equal to b");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_less_equal"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_RELATIONAL
    ) || "0";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_RELATIONAL
    ) || "0";
  return [a + " <= " + b, Blockly.JavaScript.ORDER_RELATIONAL];
};

// AND block: condition1 AND condition2
Blockly.Blocks["apcsp_and"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Boolean");
    this.appendValueInput("B").setCheck("Boolean").appendField("AND");
    this.setOutput(true, "Boolean");
    this.setStyle("logic_style");
    this.setTooltip("Returns true if both conditions are true");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_and"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_LOGICAL_AND
    ) || "false";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_LOGICAL_AND
    ) || "false";
  return [a + " && " + b, Blockly.JavaScript.ORDER_LOGICAL_AND];
};

// OR block: condition1 OR condition2
Blockly.Blocks["apcsp_or"] = {
  init: function () {
    this.appendValueInput("A").setCheck("Boolean");
    this.appendValueInput("B").setCheck("Boolean").appendField("OR");
    this.setOutput(true, "Boolean");
    this.setStyle("logic_style");
    this.setTooltip("Returns true if at least one condition is true");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_or"] = function (block) {
  var a =
    Blockly.JavaScript.valueToCode(
      block,
      "A",
      Blockly.JavaScript.ORDER_LOGICAL_OR
    ) || "false";
  var b =
    Blockly.JavaScript.valueToCode(
      block,
      "B",
      Blockly.JavaScript.ORDER_LOGICAL_OR
    ) || "false";
  return [a + " || " + b, Blockly.JavaScript.ORDER_LOGICAL_OR];
};

// NOT block
Blockly.Blocks["apcsp_not"] = {
  init: function () {
    this.appendValueInput("CONDITION").setCheck("Boolean").appendField("NOT");
    this.setOutput(true, "Boolean");
    this.setStyle("logic_style");
    this.setTooltip("Returns true if the condition is false");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_not"] = function (block) {
  var condition =
    Blockly.JavaScript.valueToCode(
      block,
      "CONDITION",
      Blockly.JavaScript.ORDER_LOGICAL_NOT
    ) || "false";
  return ["!" + condition, Blockly.JavaScript.ORDER_LOGICAL_NOT];
};

// --- Selection blocks ---

// IF block
Blockly.Blocks["apcsp_if"] = {
  init: function () {
    this.appendValueInput("CONDITION").setCheck("Boolean").appendField("IF (");
    this.appendDummyInput().appendField(") {");
    this.appendStatementInput("DO").setCheck(null);
    this.appendDummyInput().appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_flow_style");
    this.setTooltip("Execute the block of statements if the condition is true");
    this.setInputsInline(false);
  },
};

Blockly.JavaScript.forBlock["apcsp_if"] = function (block) {
  var condition =
    Blockly.JavaScript.valueToCode(
      block,
      "CONDITION",
      Blockly.JavaScript.ORDER_NONE
    ) || "false";
  var branch = Blockly.JavaScript.statementToCode(block, "DO");
  var code = "if (" + condition + ") {\n" + branch + "}\n";
  return code;
};

// IF-ELSE block
Blockly.Blocks["apcsp_if_else"] = {
  init: function () {
    this.appendValueInput("CONDITION").setCheck("Boolean").appendField("IF (");
    this.appendDummyInput().appendField(") {");
    this.appendStatementInput("DO").setCheck(null);
    this.appendDummyInput().appendField("} ELSE {");
    this.appendStatementInput("ELSE").setCheck(null);
    this.appendDummyInput().appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_flow_style");
    this.setTooltip(
      "Execute first block if condition is true, otherwise execute second block"
    );
    this.setInputsInline(false);
  },
};

Blockly.JavaScript.forBlock["apcsp_if_else"] = function (block) {
  var condition =
    Blockly.JavaScript.valueToCode(
      block,
      "CONDITION",
      Blockly.JavaScript.ORDER_NONE
    ) || "false";
  var branch = Blockly.JavaScript.statementToCode(block, "DO");
  var elseBranch = Blockly.JavaScript.statementToCode(block, "ELSE");
  var code =
    "if (" + condition + ") {\n" + branch + "} else {\n" + elseBranch + "}\n";
  return code;
};

// --- Iteration blocks ---

// REPEAT n TIMES block
Blockly.Blocks["apcsp_repeat_n_times"] = {
  init: function () {
    this.appendValueInput("TIMES")
      .setCheck("Number")
      .appendField("REPEAT")
      .appendField("TIMES {");
    this.appendStatementInput("DO").setCheck(null);
    this.appendDummyInput().appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_flow_style");
    this.setTooltip("Repeat the block of statements n times");
    this.setInputsInline(false);
  },
};

Blockly.JavaScript.forBlock["apcsp_repeat_n_times"] = function (block) {
  var times =
    Blockly.JavaScript.valueToCode(
      block,
      "TIMES",
      Blockly.JavaScript.ORDER_ASSIGNMENT
    ) || "0";
  var branch = Blockly.JavaScript.statementToCode(block, "DO");
  var code = "for (let i = 0; i < " + times + "; i++) {\n" + branch + "}\n";
  return code;
};

// REPEAT UNTIL (condition) block
Blockly.Blocks["apcsp_repeat_until"] = {
  init: function () {
    this.appendValueInput("CONDITION")
      .setCheck("Boolean")
      .appendField("REPEAT UNTIL (");
    this.appendDummyInput().appendField(") {");
    this.appendStatementInput("DO").setCheck(null);
    this.appendDummyInput().appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_flow_style");
    this.setTooltip("Repeat until condition is true");
    this.setInputsInline(false);
  },
};

Blockly.JavaScript.forBlock["apcsp_repeat_until"] = function (block) {
  var condition =
    Blockly.JavaScript.valueToCode(
      block,
      "CONDITION",
      Blockly.JavaScript.ORDER_NONE
    ) || "false";
  var branch = Blockly.JavaScript.statementToCode(block, "DO");
  // AP CSP "REPEAT UNTIL condition" is equivalent to "while (!condition)"
  var code = "while (!(" + condition + ")) {\n" + branch + "}\n";
  return code;
};

// FOR EACH item IN list block
Blockly.Blocks["apcsp_for_each"] = {
  init: function () {
    this.appendValueInput("LIST")
      .setCheck("Array")
      .appendField("FOR EACH")
      .appendField(new Blockly.FieldVariable("item"), "VAR")
      .appendField("IN list {");
    this.appendStatementInput("DO").setCheck(null);
    this.appendDummyInput().appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_flow_style"); // For iteration, fits here
    this.setTooltip("Iterate over each item in a list.");
    this.setInputsInline(false);
  },
};

Blockly.JavaScript.forBlock["apcsp_for_each"] = function (block) {
  var variable = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue("VAR"),
    Blockly.Variables.NAME_TYPE
  );
  var list =
    Blockly.JavaScript.valueToCode(
      block,
      "LIST",
      Blockly.JavaScript.ORDER_NONE
    ) || "[]";
  var branch = Blockly.JavaScript.statementToCode(block, "DO");
  var code =
    "for (const " + variable + " of " + list + ") {\n" + branch + "}\n";
  return code;
};

// --- List Operations ---

// EMPTY_LIST ()
Blockly.Blocks["apcsp_empty_list"] = {
  init: function () {
    this.appendDummyInput().appendField("EMPTY_LIST ( )");
    this.setOutput(true, "Array");
    this.setStyle("list_style");
    this.setTooltip("Creates a new empty list.");
  },
};

Blockly.JavaScript.forBlock["apcsp_empty_list"] = function (block) {
  var code = "[]";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// list[i] (Accessing an element at an index)
Blockly.Blocks["apcsp_list_get"] = {
  init: function () {
    this.appendValueInput("INDEX")
      .setCheck("Number")
      .appendField(new Blockly.FieldVariable("myList"), "VAR")
      .appendField("[");
    this.appendDummyInput().appendField("]");
    this.setOutput(true, null);
    this.setStyle("list_style");
    this.setTooltip(
      "Retrieves a value from a list at a specified 1-based index."
    );
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_list_get"] = function (block) {
  var variable = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue("VAR"),
    Blockly.Variables.NAME_TYPE
  );
  var index =
    Blockly.JavaScript.valueToCode(
      block,
      "INDEX",
      Blockly.JavaScript.ORDER_SUBTRACTION
    ) || "1"; // Default to 1 (first element in AP CSP)
  // Adjust for 0-based JavaScript indexing
  var code = variable + "[Number(" + index + ") - 1]";
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

// list[i] ← value (Assigning a value to an element at an index)
Blockly.Blocks["apcsp_list_assign_index"] = {
  init: function () {
    this.appendValueInput("INDEX")
      .setCheck("Number")
      .appendField(new Blockly.FieldVariable("myList"), "VAR")
      .appendField("[");
    this.appendValueInput("VALUE").setCheck(null).appendField("] ←");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("list_style");
    this.setTooltip(
      "Assigns a value to a list element at a specified 1-based index."
    );
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_list_assign_index"] = function (block) {
  var variable = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue("VAR"),
    Blockly.Variables.NAME_TYPE
  );
  var index =
    Blockly.JavaScript.valueToCode(
      block,
      "INDEX",
      Blockly.JavaScript.ORDER_SUBTRACTION
    ) || "1";
  var value =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_ASSIGNMENT
    ) || "null";

  // Adjust for 0-based JavaScript indexing
  var code = variable + "[Number(" + index + ") - 1] = " + value + ";\n";
  return code;
};

// APPEND (list, value)
Blockly.Blocks["apcsp_list_append"] = {
  init: function () {
    this.appendValueInput("VALUE")
      .setCheck(null)
      .appendField("APPEND (")
      .appendField(new Blockly.FieldVariable("myList"), "VAR")
      .appendField(",");
    this.appendDummyInput().appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("list_style");
    this.setTooltip("Appends a value to the end of a list.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_list_append"] = function (block) {
  var variable = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue("VAR"),
    Blockly.Variables.NAME_TYPE
  );
  var value =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE
    ) || "null";
  var code = variable + ".push(" + value + ");\n";
  return code;
};

// INSERT (list, i, value)
Blockly.Blocks["apcsp_list_insert"] = {
  init: function () {
    this.appendValueInput("LIST").setCheck("Array").appendField("INSERT (");
    this.appendValueInput("INDEX").setCheck("Number").appendField(",");
    this.appendValueInput("VALUE").setCheck(null).appendField(",");
    this.appendDummyInput().appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("list_style");
    this.setTooltip(
      "Inserts a value into a list at a specified 1-based index."
    );
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_list_insert"] = function (block) {
  var list =
    Blockly.JavaScript.valueToCode(
      block,
      "LIST",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "[]";
  var index =
    Blockly.JavaScript.valueToCode(
      block,
      "INDEX",
      Blockly.JavaScript.ORDER_SUBTRACTION
    ) || "1"; // Default to 1 (first position in AP CSP)
  var value =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE
    ) || "null";
  // In JavaScript, Array.prototype.splice(startIndex, deleteCount, item1, ...)
  // Adjust for 0-based JavaScript indexing: index - 1
  var code = list + ".splice(Number(" + index + ") - 1, 0, " + value + ");\n";
  return code;
};

// REMOVE (list, i)
Blockly.Blocks["apcsp_list_remove"] = {
  init: function () {
    this.appendValueInput("LIST").setCheck("Array").appendField("REMOVE (");
    this.appendValueInput("INDEX").setCheck("Number").appendField(",");
    this.appendDummyInput().appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("list_style");
    this.setTooltip(
      "Removes a value from a list at a specified 1-based index."
    );
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_list_remove"] = function (block) {
  var list =
    Blockly.JavaScript.valueToCode(
      block,
      "LIST",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "[]";
  var index =
    Blockly.JavaScript.valueToCode(
      block,
      "INDEX",
      Blockly.JavaScript.ORDER_SUBTRACTION
    ) || "1"; // Default to 1 (first position in AP CSP)
  // In JavaScript, Array.prototype.splice(startIndex, deleteCount)
  // Adjust for 0-based JavaScript indexing: index - 1
  var code = list + ".splice(Number(" + index + ") - 1, 1);\n";
  return code;
};

// LENGTH (list)
Blockly.Blocks["apcsp_list_length"] = {
  init: function () {
    this.appendValueInput("LIST").setCheck("Array").appendField("LENGTH (");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setStyle("list_style");
    this.setTooltip("Returns the number of items in a list.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_list_length"] = function (block) {
  var list =
    Blockly.JavaScript.valueToCode(
      block,
      "LIST",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "[]";
  var code = list + ".length";
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

// INDEX (list, element)
Blockly.Blocks["apcsp_list_index_of"] = {
  init: function () {
    this.appendValueInput("LIST").setCheck("Array").appendField("INDEX (");
    this.appendValueInput("ELEMENT").setCheck(null).appendField(",");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setStyle("list_style");
    this.setTooltip(
      "Returns the 1-based index of the first occurrence of an element in a list, or 0 if not found."
    );
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_list_index_of"] = function (block) {
  var list =
    Blockly.JavaScript.valueToCode(
      block,
      "LIST",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "[]";
  var element =
    Blockly.JavaScript.valueToCode(
      block,
      "ELEMENT",
      Blockly.JavaScript.ORDER_NONE
    ) || "null";
  // JavaScript indexOf returns 0-based index or -1 if not found.
  // AP CSP usually expects 1-based index, or 0 if not found.
  var code =
    "(function() { var jsIndex = " +
    list +
    ".indexOf(" +
    element +
    "); return jsIndex === -1 ? 0 : jsIndex + 1; })()";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// CONTAINS (list, element)
Blockly.Blocks["apcsp_list_contains"] = {
  init: function () {
    this.appendValueInput("LIST").setCheck("Array").appendField("CONTAINS (");
    this.appendValueInput("ELEMENT").setCheck(null).appendField(",");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Boolean");
    this.setStyle("list_style");
    this.setTooltip(
      "Returns true if the list contains the element, false otherwise."
    );
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_list_contains"] = function (block) {
  var list =
    Blockly.JavaScript.valueToCode(
      block,
      "LIST",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "[]";
  var element =
    Blockly.JavaScript.valueToCode(
      block,
      "ELEMENT",
      Blockly.JavaScript.ORDER_NONE
    ) || "null";
  var code = list + ".includes(" + element + ")";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// SORT (list)
Blockly.Blocks["apcsp_list_sort"] = {
  init: function () {
    this.appendValueInput("LIST").setCheck("Array").appendField("SORT (");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Array");
    this.setStyle("list_style");
    this.setTooltip(
      "Returns a new sorted version of the list (ascending, numeric)."
    );
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_list_sort"] = function (block) {
  var list =
    Blockly.JavaScript.valueToCode(
      block,
      "LIST",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "[]";
  // Use slice() to create a shallow copy before sorting to avoid modifying the original list.
  // For numeric sort, use a compare function.
  var code = list + ".slice().sort((a, b) => a - b)";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// REVERSE (list)
Blockly.Blocks["apcsp_list_reverse"] = {
  init: function () {
    this.appendValueInput("LIST").setCheck("Array").appendField("REVERSE (");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Array");
    this.setStyle("list_style");
    this.setTooltip("Returns a new reversed version of the list.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_list_reverse"] = function (block) {
  var list =
    Blockly.JavaScript.valueToCode(
      block,
      "LIST",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "[]";
  // Use slice() to create a shallow copy before reversing to avoid modifying the original list.
  var code = list + ".slice().reverse()";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// SUM (list)
Blockly.Blocks["apcsp_list_sum"] = {
  init: function () {
    this.appendValueInput("LIST").setCheck("Array").appendField("SUM (");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setStyle("list_style");
    this.setTooltip("Calculates the sum of all numeric elements in a list.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_list_sum"] = function (block) {
  var list =
    Blockly.JavaScript.valueToCode(
      block,
      "LIST",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "[]";
  var code = list + ".reduce((acc, curr) => acc + curr, 0)";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// AVERAGE (list)
Blockly.Blocks["apcsp_list_average"] = {
  init: function () {
    this.appendValueInput("LIST").setCheck("Array").appendField("AVERAGE (");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, "Number");
    this.setStyle("list_style");
    this.setTooltip(
      "Calculates the average of all numeric elements in a list. Returns 0 for empty list."
    );
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_list_average"] = function (block) {
  var list =
    Blockly.JavaScript.valueToCode(
      block,
      "LIST",
      Blockly.JavaScript.ORDER_MEMBER
    ) || "[]";
  // Handle empty list to avoid division by zero
  var code =
    "(function() { const arr = " +
    list +
    "; return arr.length > 0 ? arr.reduce((acc, curr) => acc + curr, 0) / arr.length : 0; })()";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// --- Procedures/Functions ---

// PROCEDURE name (parameter1, parameter2, ...) { <instructions> } (Defining a procedure without a return value)
Blockly.Blocks["apcsp_procedure_no_return"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("PROCEDURE")
      .appendField(new Blockly.FieldTextInput("myProcedure"), "NAME")
      .appendField("(");
    // This input allows the user to type parameters like "param1, param2"
    this.appendDummyInput("PARAMS_INPUT")
      .appendField(new Blockly.FieldTextInput(""), "PARAMS")
      .appendField(") {");
    this.appendStatementInput("DO").setCheck(null);
    this.appendDummyInput().appendField("}");
    this.setPreviousStatement(true, null); // Allow procedures to be defined sequentially
    this.setNextStatement(true, null);
    this.setStyle("procedures_style");
    this.setTooltip(
      "Defines a new procedure (function) that does not return a value."
    );
    this.setInputsInline(false);
  },
};

Blockly.JavaScript.forBlock["apcsp_procedure_no_return"] = function (block) {
  var procedureName = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue("NAME"),
    Blockly.Procedures.NAME_TYPE
  );
  // Parse parameters from the text field
  var params = block.getFieldValue("PARAMS");
  var paramList = params
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p !== ""); // Filter out empty strings from split
  var paramString = paramList.join(", ");

  var branch = Blockly.JavaScript.statementToCode(block, "DO");
  var code =
    "function " + procedureName + "(" + paramString + ") {\n" + branch + "}\n";
  return code;
};

// PROCEDURE name (parameter1, parameter2, ...) { <instructions> RETURN (expression) } (Defining a procedure with a return value)
Blockly.Blocks["apcsp_procedure_definition"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("PROCEDURE")
      .appendField(new Blockly.FieldTextInput("myFunction"), "NAME")
      .appendField("(");
    // This input allows the user to type parameters like "param1, param2"
    this.appendDummyInput("PARAMS_INPUT")
      .appendField(new Blockly.FieldTextInput(""), "PARAMS")
      .appendField(")");
    // Add a value input for the RETURN expression
    this.appendValueInput("RETURN_VALUE")
      .setCheck(null)
      .appendField(" {")
      .setAlign(Blockly.ALIGN_RIGHT); // Align to the right
    this.appendStatementInput("DO").setCheck(null);
    this.appendDummyInput().appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("procedures_style");
    this.setTooltip("Defines a new procedure that returns a value.");
    this.setInputsInline(false);
  },
};

Blockly.JavaScript.forBlock["apcsp_procedure_definition"] = function (block) {
  var functionName = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue("NAME"),
    Blockly.Procedures.NAME_TYPE
  );
  // Parse parameters from the text field
  var params = block.getFieldValue("PARAMS");
  var paramList = params
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p !== ""); // Filter out empty strings from split
  var paramString = paramList.join(", ");

  var branch = Blockly.JavaScript.statementToCode(block, "DO");
  // Get the return value
  var returnValue =
    Blockly.JavaScript.valueToCode(
      block,
      "RETURN_VALUE",
      Blockly.JavaScript.ORDER_NONE
    ) || "undefined"; // Default to undefined if no return value is provided

  // If the RETURN_VALUE input is connected, we'll append a return statement.
  // Otherwise, it's a "function with instructions that don't explicitly return at the end".
  let returnStatement = "";
  if (returnValue !== "undefined") {
    // This makes the assumption that the block's "RETURN (expression)" input
    // is the *final* return of the procedure.
    returnStatement = "return " + returnValue + ";\n";
  }

  // Combine branch and explicit return statement if present
  var fullBranch = branch + (returnStatement ? returnStatement : "");

  var code =
    "function " +
    functionName +
    "(" +
    paramString +
    ") {\n" +
    fullBranch +
    "}\n";
  return code;
};

// RETURN (expression) - This block should be used *inside* a procedure definition
Blockly.Blocks["apcsp_return"] = {
  init: function () {
    this.appendValueInput("VALUE").setCheck(null).appendField("RETURN (");
    this.appendDummyInput().appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null); // Return is typically the last statement
    this.setStyle("procedures_style");
    this.setTooltip("Returns a value from the current procedure.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_return"] = function (block) {
  var value =
    Blockly.JavaScript.valueToCode(
      block,
      "VALUE",
      Blockly.JavaScript.ORDER_NONE
    ) || "undefined";
  var code = "return " + value + ";\n";
  return code;
};

// PROCEDURE CALL (no return value)
Blockly.Blocks["apcsp_procedure_call"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("CALL PROCEDURE")
      .appendField(new Blockly.FieldTextInput("myProcedure"), "NAME")
      .appendField("(");
    // This input allows the user to type arguments like "arg1, arg2"
    this.appendDummyInput("ARGS_INPUT")
      .appendField(new Blockly.FieldTextInput(""), "ARGS")
      .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("procedures_style");
    this.setTooltip(
      "Calls a procedure (function) that does not return a value."
    );
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_procedure_call"] = function (block) {
  var procedureName = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue("NAME"),
    Blockly.Procedures.NAME_TYPE
  );
  // Parse arguments from the text field
  var args = block.getFieldValue("ARGS");
  var argList = args
    .split(",")
    .map((a) => a.trim())
    .filter((a) => a !== ""); // Filter out empty strings from split

  // For arguments in a CALL block, we need to treat them as variable/literal inputs.
  // Blockly's mechanism for handling arguments for calls usually involves dynamic inputs.
  // For simplicity with a text field, we'll just pass them as raw strings in the JS,
  // assuming they are valid JS expressions.
  // If you need more complex argument handling (e.g., nesting other blocks for arguments),
  // you'd typically add `appendValueInput` for each argument or use a mutator.
  var argString = argList.join(", "); // Join as-is for now

  var code = procedureName + "(" + argString + ");\n";
  return code;
};

// FUNCTION CALL (with return value)
Blockly.Blocks["apcsp_function_call"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("CALL")
      .appendField(new Blockly.FieldTextInput("myFunction"), "NAME")
      .appendField("(");
    // This input allows the user to type arguments like "arg1, arg2"
    this.appendDummyInput("ARGS_INPUT")
      .appendField(new Blockly.FieldTextInput(""), "ARGS")
      .appendField(")");
    this.setOutput(true, null); // Returns a value
    this.setStyle("procedures_style");
    this.setTooltip("Calls a procedure (function) and returns its value.");
    this.setInputsInline(true);
  },
};

Blockly.JavaScript.forBlock["apcsp_function_call"] = function (block) {
  var functionName = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue("NAME"),
    Blockly.Procedures.NAME_TYPE
  );
  // Parse arguments from the text field
  var args = block.getFieldValue("ARGS");
  var argList = args
    .split(",")
    .map((a) => a.trim())
    .filter((a) => a !== ""); // Filter out empty strings from split
  var argString = argList.join(", "); // Join as-is for now

  var code = functionName + "(" + argString + ")";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// --- Comments ---
Blockly.Blocks["apcsp_comment"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("COMMENT:")
      .appendField(new Blockly.FieldTextInput(""), "COMMENT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("comments_style"); // Assign custom style
    this.setTooltip("Add a comment to your code.");
    this.setInputsInline(false);
  },
};

Blockly.JavaScript.forBlock["apcsp_comment"] = function (block) {
  var comment = block.getFieldValue("COMMENT");
  // Escape newlines for multi-line comments in JS // format
  var code = "// " + comment.replace(/\n/g, "\\n") + "\n";
  return code;
};

// =========================================================
// BLOCKLY INITIALIZATION AND FUNCTIONS GO AFTER ALL DEFINITIONS
// =========================================================

// Initialize Blockly workspace
let workspace = null;

document.addEventListener("DOMContentLoaded", () => {
  console.log("--- DOMContentLoaded Fired ---");
  const blocklyDiv = document.getElementById("blocklyDiv");
  const toolbox = document.getElementById("toolbox");

  // DEBUGGING: Check Blockly.JavaScript state just before injecting workspace
  console.log("Blockly.JavaScript before Blockly.inject:", Blockly.JavaScript);
  console.log(
    "Blockly.JavaScript.forBlock['apcsp_string'] before Blockly.inject:",
    typeof Blockly.JavaScript.forBlock["apcsp_string"]
  );

  // Inject Blockly, using the custom theme
  workspace = Blockly.inject(blocklyDiv, {
    toolbox: toolbox,
    scrollbars: true,
    horizontalLayout: false,
    toolboxPosition: "start", // Position toolbox to the left
    trashcan: true,
    theme: AP_CSP_IMAGE_THEME, // Apply the custom theme here
  });

  // Add an event listener to update code output whenever the workspace changes
  workspace.addChangeListener(function (event) {
    // Only regenerate code for relevant events that change the code structure
    if (
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_CHANGE ||
      event.type === Blockly.Events.BLOCK_DELETE ||
      event.type === Blockly.Events.BLOCK_MOVE ||
      event.type === Blockly.Events.VAR_CREATE ||
      event.type === Blockly.Events.VAR_DELETE ||
      event.type === Blockly.Events.VAR_RENAME ||
      event.type === Blockly.Events.CHANGE // Catches field changes
    ) {
      console.log("Blockly event detected. Generating code...");
      // DEBUGGING: Check Blockly.JavaScript state right before generateCode call
      console.log(
        "Blockly.JavaScript before generateCode:",
        Blockly.JavaScript
      );
      console.log(
        "Blockly.JavaScript.forBlock['apcsp_string'] before generateCode:",
        typeof Blockly.JavaScript.forBlock["apcsp_string"]
      );
      generateCode(); // Auto-generate code on relevant changes
    }
  });

  // Initial code generation in case there's pre-loaded XML or blocks
  // (e.g., if you load from workspace.loadFromXml later)
  console.log("Initial generateCode call from DOMContentLoaded.");
  generateCode();
});

function generateCode() {
  // Ensure workspace exists before trying to generate code
  if (workspace) {
    try {
      const code = Blockly.JavaScript.workspaceToCode(workspace);
      document.getElementById("codeOutput").innerText = code;
      console.log("Code generated successfully.");
    } catch (e) {
      console.error("Error during code generation:", e);
      document.getElementById("codeOutput").innerText =
        "Error generating code:\n" + e;
    }
  } else {
    console.warn("Workspace not yet initialized, cannot generate code.");
  }
}

function runCode() {
  const code = document.getElementById("codeOutput").innerText;
  if (!code.trim()) {
    alert("No code to run. Generate code first!");
    return;
  }

  try {
    // Capture console.log output and display it in an alert.
    let capturedOutput = "";
    const originalConsoleLog = console.log;
    const originalPrompt = window.prompt; // Store original prompt

    // Temporarily redirect console.log to capture output
    console.log = (...args) => {
      capturedOutput += args.map(String).join(" ") + "\n";
    };

    // Redirect prompt to a controlled function or keep it interactive
    // For simplicity, let's keep it interactive in the browser alert.
    // If you need a fully headless execution, you'd mock window.prompt.

    console.log("Attempting to run generated code...");
    // Use a Function constructor for somewhat isolated execution.
    // Be aware this is NOT a secure sandbox for untrusted code.
    // prompt() is a browser function for user input.
    const func = new Function(code);
    func(); // Execute the generated code

    alert("Code Output:\n" + (capturedOutput || "No output."));
    console.log("Code executed successfully.");

    // Restore original console.log and prompt
    console.log = originalConsoleLog;
    window.prompt = originalPrompt;
  } catch (e) {
    alert("Error running code:\n" + e);
    console.error("Error running code:", e); // Log the error to console as well
  }
}
