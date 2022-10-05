# -*- coding:utf-8 -*-
"""
作者: shuzan
时间: 2022/4/15/0015 23:07
文件: 007.py
"""
import re
import requests
import pandas as pd


# 返回三家公司对应赛事id
def get_bet_id(game_id):
    game_url = f'http://1x2d.titan007.com/{game_id}.js'
    res = requests.get(game_url).text
    sts = re.findall(r'"60(.*?)STS', res)
    bet_at_home = re.findall(r'"173(.*?)Bet-at-home', res)
    nordicbet = re.findall(r'"4(.*?)Nordicbet', res)
    # dafa = re.findall(r'"798(.*?)Dafabet', res)
    if not all([sts, bet_at_home, nordicbet]):
        print(f'该赛事无开赔公司')
        return []
    else:
        sts_id = sts[0].split(',')[-1].split('|')[1]
        bet_at_home_id = bet_at_home[0].split(',')[-1].split('|')[1]
        nordicbet_id = nordicbet[0].split(',')[-1].split('|')[1]
        # dafa_id = dafa[0].split(',')[-1].split('|')[1]
        return [(60, sts_id), (173, bet_at_home_id), (4, nordicbet_id)]


# 获取公司时间数据
def get_bet_time_data(bet_id, game_id, uuid):
    sts_url = f'http://op1.titan007.com/OddsHistory.aspx?id={bet_id}&sid={game_id}&cid={uuid}'
    r = requests.get(sts_url).content
    try:
        table = pd.read_html(r.decode())
        sts_time = table[0][10][1:]
        return sts_time.values
    except:
        print('解析数据异常')
        return []


# 求相同时间点
def get_common_data(sts, company):
    sts = [ele[:11] for ele in sts]
    company = [ele[:11] for ele in company]
    return list(set(sts).intersection(company))


if __name__ == '__main__':
    tmp_id = '2277860'
    tmp = get_bet_id(tmp_id)
    tmp_list = []
    for item in tmp:
        tmp_list.append(get_bet_time_data(item[1], tmp_id, item[0]))
    common_time2 = sorted(get_common_data(tmp_list[0], tmp_list[1]), reverse=True)
    common_time3 = sorted(get_common_data(tmp_list[0], tmp_list[2]), reverse=True)
    if common_time2:
        print(f'betAtHome相同时间：{common_time2}')
    else:
        print(f'该赛事赔率无相同时间')
    if common_time3:
        print(f'NordicBet相同时间：{common_time3}')
    else:
        print(f'该赛事赔率无相同时间')
    print(f'***三家公司相同时间:{sorted(list(set(common_time2) & set(common_time3)), reverse=True)}')
