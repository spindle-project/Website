import unittest
from spindle import *

class TestArrayIndexing(unittest.TestCase):
    def setUp(self):
        self.interpreter = Interpreter()
        self.global_symbol_table = SymbolTable()
        self.context = Context('<test>')
        self.context.symbol_table = self.global_symbol_table

    def test_basic_array_indexing(self):
        # Create a test array
        test_array = List([Number(x) for x in range(5)])
        self.global_symbol_table.set("numbers", test_array)
        
        # Create and run a simple REPEAT loop
        var_name_tok = Token(TT_IDENTIFIER, "i", Position(0, 0, 0, "<test>"), Position(0, 1, 0, "<test>"))
        end_value = NumberNode(Token(TT_INT, "5", Position(0, 0, 0, "<test>"), Position(0, 1, 0, "<test>")))
        
        # Body that accesses array: sum = sum + numbers[i]
        body_node = BinOpNode(
            VarAccessNode(Token(TT_IDENTIFIER, "sum", Position(0, 0, 0, "<test>"), Position(0, 3, 0, "<test>"))),
            Token(TT_PLUS, "+", Position(0, 4, 0, "<test>"), Position(0, 5, 0, "<test>")),
            ArrayAccessNode(
                Token(TT_IDENTIFIER, "numbers", Position(0, 6, 0, "<test>"), Position(0, 13, 0, "<test>")),
                var_name_tok
            )
        )
        
        # Create ForNode
        for_node = ForNode(var_name_tok, None, end_value, None, body_node, False)
        
        # Initialize sum variable
        self.global_symbol_table.set("sum", Number(0))
        
        # Execute loop
        result = self.interpreter.visit(for_node, self.context)
        
        # Check sum value
        sum_var = self.global_symbol_table.get("sum")
        self.assertEqual(sum_var.value, 10)  # Sum of 0,1,2,3,4
        
        # Verify logging
        logs = self.interpreter.get_logs()
        self.assertIn("Loop iteration", logs)
        self.assertIn("Array access", logs)
        self.assertIn("Symbol update", logs)

if __name__ == '__main__':
    unittest.main()
