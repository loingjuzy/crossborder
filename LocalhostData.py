# 导入mongo模块
import pymongo


class SaveMongo(object):  # 创建保存数据的类
    # 初始化类
    def __init__(self, data, myata, mycollection):
        # 连接mongo数据库，默认端口为27017
        mongo_client = pymongo.MongoClient('localhost', 27017)
        # 访问数据库sasadata，没有自动创建
        db = mongo_client[myata]
        # 访问集合sasa，不存在自动创建
        my_collection = db[mycollection]
        # 插入数据，单条数据insert_one，多条数据用insert_many
        my_collection.insert_one(data)
        # 打印结果
        print(data)
