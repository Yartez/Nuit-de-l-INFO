import sqlite3
from sqlite3 import Error
from threading import Lock

# Create a connection pool
pool = sqlite3.connect('database.db', check_same_thread=False)
pool_lock = Lock()

# Create a function to get a connection from the pool
def get_connection():
    with pool_lock:
        return pool

# Modify the connect function to get a connection from the pool
def connect():
    # Get a connection from the pool
    conn = get_connection()
    return conn



class sql:
    def __init__(self, conn):
        # Use the connection passed as an argument
        self.conn = conn
        self.cursor = self.conn.cursor()
    def execute(self, *args):
        return self.cursor.execute(*args)


    #--- user part ---#
    def create_user(self, userid, passhash, status=0):
        self.cursor.execute("INSERT INTO users (userid, passhash, status) VALUES (?, ?, ?)", (int(userid), str(passhash), int(status)))
        self.conn.commit()
    def get_user(self, userid):
        self.cursor.execute("SELECT * FROM users WHERE userid = ?", (int(userid),))
        return self.cursor.fetchone()
    def get_all_users(self):
        self.cursor.execute("SELECT * FROM users")
        return self.cursor.fetchall()
    def delete_user(self, userid):
        self.cursor.execute("DELETE FROM users WHERE userid = ?", (int(userid),))
        self.conn.commit()
    def update_user(self, userid, passhash, status):
        self.cursor.execute("UPDATE users SET passhash = ?, status = ? WHERE userid = ?", (str(passhash), int(status), int(userid)))
        self.conn.commit()
    #--- machinecookie part ---#
    def add_machinecookie(self, userid, machinecookie, machinetype, machinename, createip, allowedby, authorized=0):
        self.cursor.execute("INSERT INTO machinecookies (id, userid, machinetype, machinename, createip, allowedby, authorized) VALUES (?, ?, ?, ?, ?, ?, ?)", (str(machinecookie), int(userid), str(machinetype), str(machinename), str(createip), int(allowedby), int(authorized)))
        self.conn.commit()
    def get_machinecookies_by_userid(self, userid):
        self.cursor.execute(f"SELECT * FROM machinecookies WHERE userid = {userid}")
        return self.cursor.fetchall()
    def get_machinecookies_by_userid_and_machinecookie(self, machinecookie, userid):
        self.cursor.execute("SELECT * FROM machinecookies WHERE id = ? AND userid = ?", (str(machinecookie), int(userid)))
        return self.cursor.fetchone()
    def delete_machinecookie(self, id):
        self.cursor.execute(f'DELETE FROM machinecookies WHERE id = "{str(id)}"')
        self.conn.commit()
    def update_machinecookie(self, machinecookie, userid, machinetype, machinename, createip, allowedby, authorized):
        # Update the machinecookie
        self.cursor.execute("UPDATE machinecookies SET userid = ?, machinetype = ?, machinename = ?, createip = ?, allowedby = ?, authorized = ? WHERE id = ?", (int(userid), str(machinetype), str(machinename), str(createip), int(allowedby), int(authorized), str(machinecookie)))
        self.conn.commit()
    def add_user_log(self, userid, machinecookie, first_seen, last_seen, ip):
        self.cursor.execute("INSERT INTO user_log (userid, machinecookie, first_seen, last_seen, ip) VALUES (?, ?, ?, ?, ?)", (int(userid), str(machinecookie), str(first_seen), str(last_seen), str(ip)))
        self.conn.commit()
    def get_user_log_by_userid(self, userid):
        self.cursor.execute(f"SELECT * FROM user_log WHERE userid = {userid}")
        return self.cursor.fetchall()
    def get_user_log_by_machinecookie(self, machinecookie):
        self.cursor.execute(f"SELECT * FROM user_log WHERE machinecookie = '{machinecookie}'")
        return self.cursor.fetchall()
    def get_user_log_by_userid_and_machinecookie(self, userid, machinecookie):
        self.cursor.execute("SELECT * FROM user_log WHERE userid = ? AND machinecookie = ?", (int(userid), str(machinecookie)))
        return self.cursor.fetchone()
    def get_user_log(self):
        self.cursor.execute("SELECT * FROM user_log")
        return self.cursor.fetchall()
    def update_user_log(self, machinecookie, first_seen, last_seen, ip):
        self.cursor.execute("UPDATE user_log SET first_seen = ?, last_seen = ?, ip = ? WHERE machinecookie = ?", (str(first_seen), str(last_seen), str(ip), str(machinecookie)))
        self.conn.commit()