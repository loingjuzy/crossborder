from PooledDB.PoolMysql import query


def selectUser(*args):
    sql = f'select * from user where nickName = "{args[0]}" and avatarUrl = "{args[1]}"'
    return query(sql)


def insertUser(*args):
    sql = f"""INSERT INTO user(nickName,avatarUrl,city,country,province) select "{args[0]}","{args[1]}",
              "{args[2]}","{args[3]}","{args[4]}" from dual WHERE NOT EXISTS(SELECT * FROM user 
              where nickName = "{args[0]}" and avatarUrl = "{args[1]}")"""
    return query(sql)


