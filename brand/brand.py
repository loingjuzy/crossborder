from PooledDB.PoolMysql import query


def selectBrand(*args):
    sql = f'select * from brand where type = "{args[0]}"'
    return query(sql)




