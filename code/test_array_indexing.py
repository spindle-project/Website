from spindle import (
    Interpreter, SymbolTable, Context, Token, Position,
    NumberNode, ArrayAccessNode, VarAccessNode, ForNode,
    BinOpNode, List, Number, TT_IDENTIFIER, TT_INT, TT_PLUS
)

def run_test():
    # Initialize interpreter components
    interpreter = Interpreter()
    global_symbol_table = SymbolTable()
    context = Context('<test>')
    context.symbol_table = global_symbol_table

    # Create test array [0,1,2,3,4]
    test_array = List([Number(x) for x in range(5)])
    global_symbol_table.set("numbers", test_array)
    
    # Create loop variable token and end value
    var_name_tok = Token(TT_IDENTIFIER, "i", Position(0, 0, 0, "<test>"), Position(0, 1, 0, "<test>"))
    end_value = NumberNode(Token(TT_INT, "5", Position(0, 0, 0, "<test>"), Position(0, 1, 0, "<test>")))
    
    # Create array access node: numbers[i]
    array_access = ArrayAccessNode(
        Token(TT_IDENTIFIER, "numbers", Position(0, 6, 0, "<test>"), Position(0, 13, 0, "<test>")),
        VarAccessNode(var_name_tok)
    )
    
    # Create body node: sum = sum + numbers[i]
    body_node = BinOpNode(
        VarAccessNode(Token(TT_IDENTIFIER, "sum", Position(0, 0, 0, "<test>"), Position(0, 3, 0, "<test>"))),
        Token(TT_PLUS, "+", Position(0, 4, 0, "<test>"), Position(0, 5, 0, "<test>")),
        array_access
    )
    
    # Create ForNode (REPEAT loop)
    for_node = ForNode(var_name_tok, None, end_value, None, body_node, False)
    
    # Initialize sum variable
    global_symbol_table.set("sum", Number(0))
    
    # Execute loop
    result = interpreter.visit(for_node, context)
    
    # Get and print results
    sum_var = global_symbol_table.get("sum")
    print(f"Sum value: {sum_var.value}")
    print("\nLogs:")
    print(interpreter.get_logs())

if __name__ == '__main__':
    run_test()
