from langchain.tools import tool
import requests 
from bs4 import BeautifulSoup
from tavily import TavilyClient
from rich import print
import os 
from dotenv import load_dotenv
load_dotenv()

tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

@tool
def web_search(query:str)-> str:
    """Search the web for the recent and reliable info on a topic . Return title,URLs and snippets."""
    results =  tavily.search(query=query, max_results=5)
    out =[]
    for r in results['results']:
        out.append(
            f"Title={r['title']}\n URL:{r['url']}\n Snippets:{r['content'][:300]}\r"
        )
    return "\n.....\n".join(out)

# print(web_search.invoke("whos is India's best batsmen?"))

@tool
def scrape_url(url: str)-> str:
    """Scrape and return clean text Content from a given URL for deeper reading."""
    try:
        resp = requests.get(url, timeout=8, headers={"User-Agent":"Mozilla/5.0"})
        soup = BeautifulSoup(resp.text,"html.parser")
        for tag in soup(["script", "style", "nav", "footer"]):
            tag.decompose()
        return soup.get_text(separator=" ",strip=True)[:3000]
    except Exception as e:
        return f"Could not scrape URL: {str(e)}"


