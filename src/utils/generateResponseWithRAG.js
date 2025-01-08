// src/utils/generateResponseWithRAG.js
import { PineconeClient } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';

// Initialize Pinecone and OpenAI
const pinecone = new PineconeClient();
await pinecone.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});
const index = pinecone.Index('running-data');

const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });
const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

export const generateResponseWithRAG = async (question) => {
  try {
    // Embed the question
    const queryEmbedding = await embeddings.embedQuery(question);

    // Retrieve relevant documents from Pinecone
    const results = await index.query({
      topK: 3,
      vector: queryEmbedding,
      includeMetadata: true,
    });

    // Generate a response using the retrieved documents
    const context = results.matches.map((match) => match.metadata.answer).join('\n');
    const prompt = `Context:\n${context}\n\nQuestion: ${question}\nAnswer:`;
    const answer = await llm.generate([prompt]);

    return answer.generations[0].text;
  } catch (error) {
    console.error('Error in RAG pipeline:', error);
    return 'Sorry, something went wrong. Please try again.';
  }
};