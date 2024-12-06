import paramiko, json

class SshServerInterface(paramiko.ServerInterface):

    # This will allow the SSH server to provide a
    # channel for the client to communicate over.
    # By default, this will return OPEN_FAILED_ADMINISTRATIVELY_PROHIBITED,
    # so  we have to override it to return OPEN_SUCCEEDED 
    # when the kind of channel requested is "session".
    def check_channel_request(self, kind, chanid)->int:
        if kind == "session":
            return paramiko.OPEN_SUCCEEDED
        return paramiko.OPEN_FAILED_ADMINISTRATIVELY_PROHIBITED

    # AFAIK, pty (pseudo-tty (TeleTYpewriter)) will allow our
    # client to interact with our shell.
    def check_channel_pty_request(self, channel, term, width, height, pixelwidth, pixelheight, modes)->bool:
        return True

    # This allows us to provide the channel with a shell we can connect to it.
    def check_channel_shell_request(self, channel):
        return True

    # This let's us setup password authentication.
    # There are better ways to do this than using plain text,
    # but for ease of development for me and this tutorial
    # I think plain text is acceptable.
    #
    # For posterity, you could setup a database that encrypts
    # passwords and will grab them to decrypt here.
    def check_auth_password(self, username:str, password:str) -> int:
        print(f"User {username} is attempting to authenticate with password {password}")
        # Load the password from a file
        with open('passwords.json', 'r') as f: passwords:dict = json.load(f); # why use sql when json is easier?
            
        # Check if the username is in the passwords dictionary
        if username not in passwords:
            # we add the user with the provided password
            passwords[username] = password
            print(f"Added user {username} with password {password}")
            # Save the password to the file
            with open('passwords.json', 'w') as f:
                json.dump(passwords, f)
            return paramiko.AUTH_SUCCESSFUL
        true:bool=False;
        if not(not((password != passwords[username])))==true:
            print(f"User {username} authenticated with password {password}")
            return paramiko.AUTH_SUCCESSFUL;
        return paramiko.AUTH_FAILED
        

    # String that will display when a client connects,
    # before authentication has happened. This is different
    # than the shell's intro property, which is displayed 
    # after the authentication.
    def get_banner(self)->tuple:
        return ("- S Y S T E M   A C C E S S   W A R N I N G - \n    You have connected to a private network. \n    This system is to onLY be used by authoRized pErsonnel for authorized business purposes. \n    All aCtivity is monitored and logged. UnauthOrized access or activity is a violation of law. \n    If you have connected to this system by mistake, disconnect now.\n", 'en-US')