import requests
import json
from bs4 import BeautifulSoup

# 對網頁發送 HTTP GET 請求並獲取內容
def get_html_content(url):
   response = requests.get(url)
   html_content = response.text
   return html_content

def translate_language_difficulty(jp_difficulty):
   jp_to_en_map = {
    '習': 'BEGINNER',
    '楽': 'LIGHT',
    '踊': 'STANDARD',
    '激': 'HEAVY',
    '鬼': 'CHALLENGE'
   }
   return jp_to_en_map[jp_difficulty]

def find_jp_difficulty_index(songname_and_difficulty):
   index = None;
   jp_difficulties = ['習', '楽', '踊', '激', '鬼'];
   for jp_difficulty in jp_difficulties:
      if songname_and_difficulty.find(jp_difficulty) != -1:
        index = songname_and_difficulty.find(jp_difficulty)
   return index

# 登入成功之後開始爬取目標網頁
# 目標網頁的 URL
parse_wiki_url = "https://w.atwiki.jp/asigami/"

# 發送 HTTP 請求，獲取網頁內容
html_content = get_html_content(parse_wiki_url)

# 解析 HTML 內容
soup = BeautifulSoup(html_content, "html.parser")
menubar = soup.find(id="menubar") 
lists = menubar.find_all('ul')

# 以等級分類的歌曲
songlist_url_by_level = lists[2].find_all('li')

level_url_collections = [];

for list in songlist_url_by_level:
   title = list.find('a').text
   # 忽略
   if title.find('以下') != -1:
     continue
   link_to = list.find('a').get('href')
   level = title.split('足')[1] 
   level_url_collections.append({ 'title': title, 'level': level, 'link_to': link_to })

song_infos = {}

for level_url_collection in level_url_collections:
    html_content = get_html_content('https:' + level_url_collection['link_to']) # 超連結上抓出來的 url 沒有帶 Protocol, 所以要補上
    soup = BeautifulSoup(html_content, "html.parser")
    tables = soup.select('table')
    song_table = tables[2]

    for info_row in song_table.find_all('tr'):
        info_cols = info_row.find_all('td')

        # 忽略 thead 的 td, 或者 tbody 第一個 tr 內沒有超連結
        if len(info_cols) == 0 or info_cols[0].find('a') == None:
            continue
        
        # print(level_url_collection['level'])
        name_col = info_cols[0]
        songname_and_difficulty = name_col.find('a').text
        difficulty_index = find_jp_difficulty_index(songname_and_difficulty)
        songname = songname_and_difficulty[0:difficulty_index - 1]
        translated_difficulty = translate_language_difficulty(songname_and_difficulty[difficulty_index])
        
        # 把歌曲資訊塞入物件
        if songname in song_infos :
           song_infos[songname][translated_difficulty] = { 'level': level_url_collection['level'] }
        else:
           song_infos[songname] = {}
           song_infos[songname][translated_difficulty] = { 'level': level_url_collection['level'] }

json_data = json.dumps(song_infos, indent=4) # key 被編碼

file_path = 'singleData.json'

with open(file_path, "w") as file:
    file.write(json_data)

print(f"JSON 數據已儲存到 {file_path}")


# print(soup.select('.jk'))
# print(soup.prettify())