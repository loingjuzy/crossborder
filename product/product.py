from PooledDB.PoolMysql import query


def selectProductList(*args):
    sql = f'select * from product where source = "{args[0]}" limit {args[1]},{args[2]}'
    return query(sql)


def selectProductInfo(*args):
    sql = f'select * from product where productid = {args[0]}'
    return query(sql)

