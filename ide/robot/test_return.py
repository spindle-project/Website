from spindle import *

def test_return():
    # Test just RETURN
    code1 = """
PROCEDURE test() {
    RETURN 42
}
test()
    """
    result = run(code1)
    print(f"Result: {result}")
    if result and result.error:
        print(f"Error: {result.error}")
    else:
        # Debug token generation
        lexer = Lexer('<test>', code1)
        tokens, error = lexer.make_tokens()
        if error:
            print(f"Lexer error: {error}")
        else:
            print("Tokens generated:", tokens)

    print("All return tests passed!")

def run(code):
    # First pass code through semi_parser
    code = semi_parse_string(code)
    
    # Process each code block
    last_result = None
    for block in code:
        lexer = Lexer('<test>', block)
        tokens, error = lexer.make_tokens()
        if error: 
            print(f"Lexer error: {error}")
            return None
        
        parser = Parser(tokens)
        ast = parser.parse()
        if ast.error: 
            print(f"Parser error: {ast.error}")
            return None
        
        interpreter = Interpreter()
        context = Context('<test>')
        context.symbol_table = global_symbol_table
        result = interpreter.visit(ast.node, context)
        if result.error:
            print(f"Interpreter error: {result.error}")
            return None
        last_result = result
    
    return last_result

test_return()
