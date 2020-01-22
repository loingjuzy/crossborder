from requests_html import HTMLSession
from PooledDB.PoolMysql import query
import threading
import queue
import time

session = HTMLSession()
q = queue.Queue()
for val in range(9000, 40000):
    q.put(val)


def getKissbabyData(q):
    while True:
        try:
            url = 'http://m.kissbabyhk.club/item-' + \
                str(q.get_nowait())   # 不阻塞的读取队列数据
            i = q.qsize()
        except Exception as e:
            print(e)
            break
        # print ('Current Thread Name Runing %s ... ' % threading.currentThread().name)
        print("当前还有%s个任务" % i)
        response = session.get(url).html
        image = response.xpath(
            '//section[@class="basic"]//img/@src', first=True)
        if not image:
            print("无效数据")
            continue
        HKDPrice = (response.xpath(
            '//span[@class="price color-strong"]/text()', first=True)).replace('¥', '')
        name = response.xpath('//ul/li[1]/text()', first=True)
        barCode = response.xpath('//ul/li[2]/text()', first=True)
        brand = response.xpath('//ul/li[3]/text()', first=True)
        spec = response.xpath('//ul/li[4]/text()', first=True)
        print(name, barCode, brand, spec, image)
        sql = f"""insert into product(name,brand,barCode,specification,HKDPrice,DGPrice,STDPrice,
        source,image,shareUrl) values("{name}","{brand}","{barCode}","{spec}",{HKDPrice},{HKDPrice},
        {HKDPrice},"Kissbaby","{image}","{url}")"""
        query(sql)
        print("插入数据成功！")


if __name__ == "__main__":
    strat_time = time.time()
    num = 10
    threads = []  # 定义列表用于存放子线程实例
    for i in range(num):
        t = threading.Thread(target=getKissbabyData, args=(q,))
        t.start()
        threads.append(t)
    for tmp in threads:
        t.join()  # 为每个子线程添加join之后，主线程就会等这些子线程执行完之后再执行。
    print("cost:", time.time() - strat_time)  # 主线程
