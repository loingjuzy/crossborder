# 导入mongo模块
import pymongo
from PooledDB.PoolMysql import query


class cleanData(object):  # 创建保存数据的类
    # 初始化类
    def __init__(self, myata, mycollection):
        # 连接mongo数据库，默认端口为27017
        mongo_client = pymongo.MongoClient('localhost', 27017)
        # 访问数据库sasadata，没有自动创建
        db = mongo_client[myata]
        # 访问集合sasa，不存在自动创建
        my_collection = db[mycollection]
        for item in my_collection.find({'spec': {'$exists': 'true'}}):
            # 打印结果
            for item1 in item['spec']:
                for item2 in item1['sourceList']:
                    product = []
                    # DGPrice = float(item2['CNYPrice'])*1.3
                    # STDPrice = float(item2['HKDPrice'])*1.3
                    product = [item1['name'], item['brand'], item1['specification'],
                               item2['HKDPrice'], item2['CNYPrice'], item2['HKDPrice'], item2['source'],
                               item['detail'], item['pics'][0], item['shareUrl'],
                               str(item['_id'])
                               ]
                    self.insertMysql(str(product).replace(
                        '[', '').replace(']', ''))

    def insertMysql(self, data):
        sql = f"""insert into product(name,brand,specification,HKDPrice,DGPrice,STDPrice,source,detail,image,shareUrl,ObjectId) values({data})"""
        query(sql)
        print('successful')


if __name__ == "__main__":
    cleanData('KouDai', 'KouDai')
