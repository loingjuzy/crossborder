from requests_html import HTMLSession
import json
import redis

from LocalhostData import SaveMongo

session = HTMLSession()
# 实现一个连接池
pool = redis.ConnectionPool(host='127.0.0.1')
# 调用连接池
conn = redis.Redis(connection_pool=pool)


def KouDai(id):
    url = 'https://api.koudaihk.com:4432/api/info/price/public/v1/PriceProductDetail'
    obj = {"quotationv3Id": id}
    try:
        response = session.post(url, data=obj).html
        if response.html != '{"data":{},"message":"查询成功","status":0}':
            # print(json.loads(response.html)['data'])
            if conn.sadd('KouDai_id', id) == 1:
                SaveMongo(json.loads(response.html)[
                          'data'], 'KouDai', 'KouDai')
    except:
        pass


if __name__ == '__main__':
    for id in range(9616, 40000):
        KouDai(id)
