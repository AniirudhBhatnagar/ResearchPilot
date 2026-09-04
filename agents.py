from langchain.agents import create_agent
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from tools import web_search, scrape_url
import os
from dotenv import load_dotenv
load_dotenv()

model_name = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")
llm = ChatGroq(model=model_name, max_retries=6)

def build_search_agent():
    return create_agent(
        model=llm,
        tools=[web_search]
    )


def build_reader_agent():
    return create_agent(
        model=llm,
        tools=[scrape_url]
    )

## Chains 

#Writer Chain 

writer_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert research writer. Write clear, structured and insightful reports."),
    ("human","""Write a detailed research report on topic below.
    Topic:{topic}
    Research Gathered:
    {research}

    structure the report as:
    - introduction
    - Key Findings(minimum 3 well-explained points)
    - Conclusion 
    - Sources(list all urls found in research)
    
    Be detailed factual and professional.""")
])

writer_chain = writer_prompt | llm | StrOutputParser()

# Critic Chain 

critic_prompt = ChatPromptTemplate.from_messages([
     ("system", "You are a sharp and constructive research critic. Be honest and specific."),
    ("human", """Review the research report below and evaluate it strictly.

Report:
{report}

Respond in this exact format:

Score: X/10

Strengths:
- ...
- ...

Areas to Improve:
- ...
- ...

One line verdict:
..."""),
])

critic_chain = critic_prompt | llm | StrOutputParser()