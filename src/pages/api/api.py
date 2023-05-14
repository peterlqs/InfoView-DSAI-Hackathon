import os 

import streamlit as st 
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, SequentialChain 
from langchain.memory import ConversationBufferMemory
from langchain.utilities import WikipediaAPIWrapper 
from flask import Flask, request
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
from flask import Flask, request
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.chains.question_answering import load_qa_chain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.docstore.document import Document
from langchain.prompts import PromptTemplate
from langchain.indexes.vectorstore import VectorstoreIndexCreator
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import DirectoryLoader
from langchain import OpenAI, VectorDBQA
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
import pickle
import faiss
from langchain.vectorstores import FAISS


# load_dotenv()

app = Flask(__name__)
CORS(app)

<<<<<<< HEAD
=======
os.environ['OPENAI_API_KEY'] = ''

>>>>>>> 38d013e558d11f9411a517ad82fcfab16a96198a
@app.route('/generate', methods=['POST'])
@cross_origin()
def generate():
    # App framework
    llm = ChatOpenAI()
    prompt = request.json['prompt']
    option = request.json['option']
    if option == 'c':
        url = 'src/pages/webfiles/c-client'
    elif option == 'u':
        url = 'src/pages/webfiles/u-client'
    elif option == 'b':
        url = 'src/pages/webfiles/b-client'
    print("Prompt test:", prompt)
    
    # loader = DirectoryLoader(url, glob='**/*.txt')
    # docs = loader.load()
    # char_text_splitter = CharacterTextSplitter(chunk_size=3000, chunk_overlap=400)
    # doc_texts = char_text_splitter.split_documents(docs)
    # openAI_embeddings = OpenAIEmbeddings(openai_api_key='')
    # vStore = Chroma.from_documents(doc_texts, openAI_embeddings)
    # model = VectorDBQA.from_chain_type(llm=OpenAI(), chain_type='stuff', vectorstore=vStore)
    # question = 'what is the percentage of women in the bhp workforce?'
    # script = model.run(question)
    # return (script)

    # BREAK
    # CUR TEST
    loader = DirectoryLoader(url, glob='**/*.txt')
    doc = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=3000, chunk_overlap=400)
    docs = text_splitter.split_documents(doc)
    # Get the total number of characters so we can see the average later
    num_total_characters = sum([len(x.page_content) for x in docs])
    print (f"Now you have {len(docs)} documents that have an average of {num_total_characters / len(docs):,.0f} characters (smaller pieces)")
    # Get your embeddings engine ready
    embeddings = OpenAIEmbeddings(openai_api_key=os.getenv('OPENAI_API_KEY'))

    # Embed your documents and combine with the raw text in a pseudo db. Note: This will make an API call to OpenAI
    docsearch = FAISS.from_documents(docs, embeddings)
    qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=docsearch.as_retriever())

    
    # Prompt templates
    title_template = PromptTemplate(
        input_variables = ['topic'], 
        template='Please translate this to English if it is not in English: {topic}'
    )
    # final_template = PromptTemplate(
    #     input_variables = ['final'], 
    #     template='Please answer like you are a helpful virtual assistant: {final}'
    # )

    # Memory 
    title_memory = ConversationBufferMemory(input_key='topic', memory_key='chat_history')
    final_memory = ConversationBufferMemory(input_key='final', memory_key='chat_history')

    # Llms
    llm = OpenAI(temperature=0.9) 
    title_chain = LLMChain(llm=llm, prompt=title_template, verbose=True, output_key='title', memory=title_memory)
    # final_chain = LLMChain(llm=llm, prompt=final_template, verbose=True, output_key='final', memory=final_memory)

    # Show stuff to the screen if there's a prompt 
    translated = title_chain.run(prompt)
    script = qa.run(translated)
    # final_chain = final_chain.run(final=script)
    # BREAKING

    print(script)
    return script

    # print(final_chain)
    # return final_chain


# Flask app run method
if __name__ == '__main__':
    app.run(port=8080, debug=True)



    # TEST 1
    # loader = TextLoader('src\pages\data\idk.txt')
    # doc = loader.load()
    # print (f"You have {len(doc)} document")
    # print (f"You have {len(doc[0].page_content)} characters in that document")
    # index = VectorstoreIndexCreator().from_loaders([loader])
    # # script = index.query(prompt)
    # script = index.query("who is tom cruise")

    # # TEST 2
    # loader = DirectoryLoader('src\pages\data', glob='**/*.txt')
    # documents = loader.load()
    # text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    # texts = text_splitter.split_documents(documents)
    # embeddings = OpenAIEmbeddings(openai_api_key=os.environ['OPENAI_API_KEY'])
    # docsearch = Chroma.from_documents(texts, embeddings)
    # qa = VectorDBQA.from_chain_type(llm=OpenAI(), chain_type="stuff", vectorstore=docsearch)
    # # TEST 3
    # title_memory = ConversationBufferMemory(input_key='topic', memory_key='chat_history')
    # title_template = PromptTemplate(
    #     input_variables = ['topic'], 
    #     template='Improve clarity on this input if possible: {topic}'
    # )
    # title_chain = LLMChain(llm=llm, prompt=title_template, verbose=True, output_key='title', memory=title_memory)
    # title = title_chain.run(prompt)
    # print(title)


    # translation_chain = LLMChain(llm=llm, prompt=translation_template, verbose=True, output_key='translation')
    # translation = translation_chain.run(prompt)
    # print(translation)
    # script = qa.run(translation)

    # Data
    # loader = TextLoader('src\pages\data\sample-test.txt')
    # print("loader here", loader)
    # index = VectorstoreIndexCreator().from_loaders([loader])
    # # script = index.query(prompt)
    # script = index.query("who is tom cruise")
    # src/pages/webfiles/b-client
    # src\pages\data

    # PAST CUR TEST
    # loader = DirectoryLoader('src/pages/webfiles/b-client', glob='**/*.txt')
    # documents = loader.load()
    # text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    # texts = text_splitter.split_documents(documents)
    # embeddings = OpenAIEmbeddings(openai_api_key=os.environ['OPENAI_API_KEY'])
    # docsearch = Chroma.from_documents(texts, embeddings)
    # qa = VectorDBQA.from_chain_type(llm=OpenAI(), chain_type="stuff", vectorstore=docsearch)

<<<<<<< HEAD
=======
    # CUR TEST
    loader = DirectoryLoader(url, glob='**/*.txt')
    doc = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=3000, chunk_overlap=400)
    docs = text_splitter.split_documents(doc)
    # Get the total number of characters so we can see the average later
    num_total_characters = sum([len(x.page_content) for x in docs])
    print (f"Now you have {len(docs)} documents that have an average of {num_total_characters / len(docs):,.0f} characters (smaller pieces)")
    # Get your embeddings engine ready
    embeddings = OpenAIEmbeddings(openai_api_key="")

    # Embed your documents and combine with the raw text in a pseudo db. Note: This will make an API call to OpenAI
    docsearch = FAISS.from_documents(docs, embeddings)
    qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=docsearch.as_retriever())
>>>>>>> 38d013e558d11f9411a517ad82fcfab16a96198a

    
    # BACKUP
    # title_template = PromptTemplate(
    #     input_variables = ['topic'], 
    #     template='Improve clarity on this input if possible: {topic}'
    # )

    # script_template = PromptTemplate(
    #     input_variables = ['title', 'wikipedia_research'], 
    #     # template='write me a youtube video script based on this title TITLE: {title} while leveraging this wikipedia reserch:{wikipedia_research} '
    #     template = 'Explain to me like I am 5 years old about: {title} while leveraging this wikipedia reserch:{wikipedia_research}'
    # )

    # # Memory 
    # title_memory = ConversationBufferMemory(input_key='topic', memory_key='chat_history')
    # script_memory = ConversationBufferMemory(input_key='title', memory_key='chat_history')


    # # Llms
    # llm = OpenAI(temperature=0.9) 
    # title_chain = LLMChain(llm=llm, prompt=title_template, verbose=True, output_key='title', memory=title_memory)
    # script_chain = LLMChain(llm=llm, prompt=script_template, verbose=True, output_key='script', memory=script_memory)

    # wiki = WikipediaAPIWrapper()

    # # Show stuff to the screen if there's a prompt 
    # title = title_chain.run(prompt)
    # wiki_research = wiki.run(prompt) 
    # script = script_chain.run(title=title, wikipedia_research=wiki_research)