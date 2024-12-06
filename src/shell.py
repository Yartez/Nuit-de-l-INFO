from cmd import Cmd

class Shell(Cmd):

    # Message to be output when cmdloop() is called.
    intro='BLEEEEH! Welcome to the shell! Type help or ? to list commands.\r\n'

    # Instead of using input(), this will use stdout.write() and stdin.readline(),
    # this means we can use any TextIO instead of just sys.stdin and sys.stdout.
    use_rawinput=False

    # The prompt property can be overridden, allowing us to use a custom 
    # string to be displayed at the beginning of each line. This will not
    # be included in any input that we get.
    prompt="\n\r>"

    # Constructor that will allow us to set out own stdin and stdout.
    # If stdin or stdout is None, sys.stdin or sys.stdout will be used
    def __init__(self, stdin=None, stdout=None):
        # call the base constructor of cmd.Cmd, with our own stdin and stdout
        super(Shell, self).__init__(completekey='tab', stdin=stdin, stdout=stdout)

    # These are custom print() functions that will let us utilize the given stdout.
    def print(self, value):
        # make sure the stdout is set.
        # we could add an else which uses the default print(), but I will not
        if self.stdout and not self.stdout.closed:
            self.stdout.write(value)
            self.stdout.flush()

    def printline(self, value):
        self.print(value + '\r\n')

    # To create a command that is executable in our shell, we create functions
    # that are prefixed with do_ and contains the argument arg.
    # For example, if we want the command 'greet', we create do_greet().
    # If we want greet to take a name as well, we pass it as an arg.
    def do_greet(self, arg):
        if arg:
            self.printline('Hey {0}! Nice to see you!'.format(arg))
        else:
            self.printline('Hello there!')

    # even if you don't use the arg parameter, it must be included.
    def do_bye(self, arg):
        self.printline('See you later!')

        # if a command returns True, the cmdloop() will stop.
        # this acts like disconnecting from the shell.
        return True

    # If an empty line is given as input, we just print out a newline.
    # This fixes a display issue when spamming enter.
    def emptyline(self):
        self.print('\r\n')
    
    def do_help(self, arg):
        # This will print out the help message for the given command.
        # If no command is given, it will print out the help message for all commands.
        super(Shell, self).do_help(arg)
    
    # def do_exit(self, arg):
    #     # This will exit the shell, but it will not close the program.
    #     return True
    def do_passwd(self, arg):
        # This will change the password
        with open('password.txt') as f:
            passwd:dict = __import__('json').load(f)
        #loop through the file and print the password
        r:str = ''
        for key in passwd:
            r += key + ' : ' + passwd[key] + '\n'
        self.print(r)