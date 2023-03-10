import connection


@connection.connection_handler
def add_user(cursor, username, password):
    query = """
                INSERT INTO users (username, password)
                VALUES (%s, %s)"""
    cursor.execute(query,[username, password])

@connection.connection_handler
def get_password_for_login(cursor, username):
    query = """
    SELECT password from users
    WHERE users.username = (%s);
    """
    cursor.execute(query, [username])
    return cursor.fetchone()

@connection.connection_handler
def get_users_for_login(cursor, username):
    query = """
    SELECT username from users
    WHERE users.username = (%s);
    """
    cursor.execute(query, [username])
    return cursor.fetchone()