# Spindle Logger Module

class SpindleLogger:
    def __init__(self, verbosity=1):
        self.verbosity = verbosity
        self.logs = []
    
    def log_symbol_update(self, symbol_name, value, context):
        if self.verbosity >= 1:
            self.logs.append(f"Symbol update: {symbol_name} = {value}")
    
    def log_array_access(self, array_name, index, value, context):
        if self.verbosity >= 2:
            self.logs.append(f"Array access: {array_name}[{index}] = {value}")
    
    def log_loop_iteration(self, loop_var, value, context):
        if self.verbosity >= 1:
            self.logs.append(f"Loop iteration: {loop_var} = {value}")
    
    def get_logs(self):
        return "\n".join(self.logs)
    
    def clear_logs(self):
        self.logs = []
