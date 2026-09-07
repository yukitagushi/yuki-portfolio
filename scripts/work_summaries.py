"""Small work summaries limited to facts confirmed by the portfolio owner."""
import json
from pathlib import Path
from site_common import esc

ROOT = Path(__file__).resolve().parents[1]


def records():
    return json.loads((ROOT / 'content/work-summaries.json').read_text())


def render_summaries():
    items = []
    for work in records():
        scope = ''.join(f'<li>{esc(item)}</li>' for item in work['scope'])
        scope_markup = f'<ul class="work-scope">{scope}</ul>' if scope else ''
        items.append(f'''<article class="work-summary" id="{esc(work['id'])}" aria-labelledby="heading-{esc(work['id'])}">
<p class="section-label">{esc(work['category'])}</p><h2 id="heading-{esc(work['id'])}">{esc(work['title'])}</h2>
<p>{esc(work['summary'])}</p>{scope_markup}
<a class="text-link" href="{esc(work['related_url'])}">{esc(work['related_label'])} <span aria-hidden="true">↗</span></a></article>''')
    return '<section class="work-summaries" aria-label="AI導入・制作の実績">' + ''.join(items) + '</section>'


def render_home_links():
    items = ''.join(f'''<a href="/works.html#{esc(work['id'])}"><span><small>{esc(work['category'])}</small><strong>{esc(work['title'])}</strong></span><span aria-hidden="true">↗</span></a>''' for work in records())
    return '<div class="work-summary-links">' + items + '</div>'


def update_index():
    path = ROOT / 'works.html'
    markup = path.read_text()
    start, end = '<!-- work-summaries:start -->', '<!-- work-summaries:end -->'
    section = start + '\n' + render_summaries() + '\n' + end
    if start in markup:
        before, rest = markup.split(start, 1)
        _, after = rest.split(end, 1)
        markup = before + section + after
    else:
        anchor = '  <section data-reveal>\n    <div class="works-list">'
        if anchor not in markup:
            raise ValueError('Works insertion point not found')
        markup = markup.replace(anchor, section + '\n\n' + anchor, 1)
    path.write_text(markup)


if __name__ == '__main__':
    update_index()
    print('Updated confirmed work summaries in works.html')
