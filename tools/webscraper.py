import urllib3
import datetime
import json
from bs4 import BeautifulSoup, element

TIMEOUT_SECONDS = 2.0
PATCH_NOTES_ENDPOINT = 'https://www.leagueoflegends.com/en-us/news/game-updates/patch-11-19-notes/#patch-champions'

HTTP = urllib3.PoolManager()

def retrieve_patch_notes():
    response = HTTP.request('GET', PATCH_NOTES_ENDPOINT, timeout=TIMEOUT_SECONDS)

    soup = BeautifulSoup(response.data, 'html.parser')

    patch_content = soup.find('div', attrs={'id': 'patch-notes-container'})
    fetch_champions_patch_data(patch_content)

def fetch_champions_patch_data(patch_content):
    champions_start = patch_content.find('h2', attrs={'id': 'patch-champions'}).find_parent()
    champions_end = champions_start.find_next_sibling('header')
    
    champions_patch_data = { 'champions': []}

    itr = champions_start
    while not itr == None and not itr == champions_end:
        if not isinstance(itr, element.NavigableString):
            is_new = True if not itr.find('span', attrs={'class': 'new'}) == None else False
            champion_name_tag = itr.find('h3', attrs={'class': 'change-title'})
            if not champion_name_tag == None:
                champion_name = champion_name_tag.findChild().string
                champion_image = itr.find('img')['src']
                champion_patch_summary = itr.find('p', attrs={'class': 'summary'}).string
                champion_patch_comment = itr.find('blockquote').string
                champion_attribute_patches = retrieve_all_attribute_patches(itr)

                champions_patch_data['champions'].append({
                    'name': champion_name,
                    'isNew': is_new,
                    'imageUrl': champion_image,
                    'summary': champion_patch_summary,
                    'comment': champion_patch_comment.strip() if not champion_patch_comment == None else '',
                    'attributePatches': champion_attribute_patches
                })

        itr = itr.next_sibling

    split_patch_notes_endpoint = PATCH_NOTES_ENDPOINT.split("/")[-2].split("-")
    champions_patch_data['patchVersion'] = split_patch_notes_endpoint[1] + '.' + split_patch_notes_endpoint[2]

    print(json.dumps(champions_patch_data, indent=4))

def retrieve_all_attribute_patches(champion_container):
    attribute_patches = []

    itr = None
    h4_ability_title_find = champion_container.find('h4', attrs={'class': 'change-detail-title ability-title'})
    h4_find = champion_container.find('h4', attrs={'class': 'change-detail-title'})
    if h4_ability_title_find:
        itr = h4_ability_title_find
    elif h4_find:
        itr = h4_find
    else:
        h3_ability_title_find = champion_container.find('h3', attrs={'class': 'change-detail-title ability-title'})
        h3_find = champion_container.find('h3', attrs={'class': 'change-detail-title'})
        if h3_ability_title_find:
            itr = h3_ability_title_find
        elif h3_find:
            itr = h3_find

    while not itr == None:
        if not (itr.name == 'hr' and itr.get('class') == 'divider'):
            attribute_patch = {}
            if itr.name == 'h4' or itr.name == 'h3':
                if len(itr.get('class')) > 1:
                    if itr.get('class')[0] == 'change-detail-title' and itr.get('class')[1] == 'ability-title':
                        attribute_patch['name'] = itr.contents[1] # index 1 contains the name, index 0 contains the img element 
                        attribute_patch['imageUrl'] = itr.contents[0]['src']
                else:
                    attribute_patch['name'] = itr.string
                    attribute_patch['imageUrl'] = ""

                attribute_patch['changes'] = []
                itr = itr.next_sibling
                while not itr == None and not (itr.name == 'h4' or itr.name == 'h3'):
                    if not ((itr.name == 'hr') or isinstance(itr, element.NavigableString)):
                        attribute_change_flag = itr.find('span', attrs={'class': 'attribute'}).find('span')
                        attribute_change_flag_text = attribute_change_flag.string if not attribute_change_flag == None else ''

                        attribute_change_name = attribute_change_flag.next_sibling.string if not attribute_change_flag == None else itr.find('span', attrs={'class': 'attribute'}).string

                        attribute_before_tag = itr.find('span', attrs={'class': 'attribute-before'})
                        attribute_before_change = attribute_before_tag.string if not attribute_before_tag == None else ''

                        attribute_after_tag = itr.find('span', attrs={'class': 'attribute-after'})
                        attribute_after_change = attribute_after_tag.string if not attribute_after_tag == None else ''

                        attribute_removed_tag = itr.find('span', attrs={'class': 'attribute-removed'})
                        attribute_removed_change = attribute_removed_tag.string if not attribute_removed_tag == None else ''
                        
                        attribute_patch['changes'].append({
                            'name': attribute_change_name,
                            'flag': attribute_change_flag_text,
                            'before': attribute_before_change,
                            'after': attribute_after_change,
                            'removed': attribute_removed_change
                        })

                    itr = itr.next_sibling
            attribute_patches.append(attribute_patch)
        else:
            itr = itr.next_sibling

    return attribute_patches

retrieve_patch_notes()
