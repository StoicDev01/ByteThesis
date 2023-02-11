---
title: "Como gerar textos com GPT e Python"
date: 2023-02-11
draft: false
categories: [machine_learning]
author: 
    given_name: John
    family_name: Feminella
    display_name: "Izkeas"
---

GPT ( Generative Pre-Trained Transformer ) é um modelo de linguagem criado pela OpenAI, o GPT pode traduzir textos, responder questões, fazer sumários e gerar texto em geral, vários modelos do GPT podem escrever textos naturais similares a de humanos.

## GPT 2 e GPT 3

O segundo modelo, GPT 2 foi treinado usando um conjunto enorme de dados de texto da internet, incluindo artigos de notícias, livros eletrônicos e páginas da web e, em seguida, pode ser ajustado ou “finetuned” para realizar uma variedade de outras tarefas específicas usando um conjunto menor de dados de treinamento.

OpenAI Criou o modelo GPT 2 com 1.5 Bilhões de parâmetros e o tornou open source, já o GPT 3 foi criado com 175 Bilhões de parâmetros e por sua vez a qualidade do GPT 3 é muito alta, porém a OpenAI não o tornou open source e portanto, para usar o GPT 3 é preciso ter acesso a API da OpenAI que é paga.

## Modelo ChatGPT

Posteriormente a OpenAI Criou um novo modelo, o ChatGPT que foi treinado especificamente para tarefas de conversação e possui informações gerais anteriores a 2021, a quantidade de parâmetros que o ChatGpt possui são 2 bilhões de parâmetros segundo ele mesmo, mas mesmo tendo muito menos parâmetros do que o maior modelo do GPT 3 ele ainda funciona muito bem dentro da sua proposta.

não sabemos se o ChatGPT será gratuito para sempre ou somente por um tempo tendo visto que é preciso de uma grande infraestrutura para rodar esses modelos e é muito custoso manter, e portanto neste artigo vou mostrar alternativas ao ChatGPT e o GPT-3.

## Hugging Face

Hugging Face é uma plataforma de processamento de linguagem natural que oferece uma ampla variedade de modelos de linguagem pré treinados e ferramentas para facilitar o uso de modelos de linguagem em aplicações de processamento de linguagem natural, nela, podemos pesquisar por modelos GPT.

Uma boa alternativa ao GPT-3 é o GPT-J que possui 6 bilhões de parâmetros que deve ser mais que o suficiente para um único usuário e também tem o GPT-neo que possui duas versões 1.3 e 2.7 bilhões de parâmetros, ambos foram criados pela EuletherIA e são open source.

Também há modelos em outras linguagens, como português, chinês. e também é possivel pegar um modelo e afinar com “finetune” para o seu caso específico.

Hugging Face também fornece uma biblioteca Python chamada Transformers com ela podemos baixar rapidamente o modelo e executar uma tarefa como “text-generation” através do pipeline.
Gerando texto com python

Primeiro precisamos baixar as bibliotecas Transformers e o Torch, Torch é uma biblioteca de Machine Learning e Tensores.

```terminal
pip install transformers torch
```

Vamos importar o pipeline do Transformers, o pipeline é como uma função principal da biblioteca Transformers, nela podemos executar uma tarefa como “text-generation”.

```terminal
from transformers import pipeline
```

E vamos gerar um novo texto

# Menor Modelo GPT-2 124M

```python
generator = pipeline('text-generation', model='gpt2')

generated = generator(
    "A story about a man and a dog", 
    max_length=100, num_return_sequences=1
)

for sequence in generated:
    print(sequence['generated_text'])
```

Aqui criamos um gerador do tipo “text-generation” com o modelo gpt2, você pode ver todos os modelos no hugging face, esse modelo tem 584 Megabytes de tamanho, por isso precisamos de pelo menos isso de Memória RAM, caso você use um modelo maior e seu computador não suporte, você pode criar um novo Notebook no kaggle que possibilita usar até 30gb de RAM de graça.

### O resultado gerado foi o seguinte:

***A story about a man and a dog who accidentally stabbed a pedestrian and lost his wife at a busy intersection and were rushed to the hospital.***

***Burgess, of Redwood City, admitted to police that she put the baby into a plastic bag while the dog was running. When she got in the car to help, the dog ran across the path and stabbed a third man; she managed to grab an ax with the help of another bystander, a police sergeant said.***

podemos também alterar alguns parâmetros, como o **“temperature”**, **“top_k”** e **“top_p”**.

```python
generated = generator(
    "A story about a man and a dog", 
    max_length=100, num_return_sequences=1, temperature=0.9,
    top_k=50, top_p=0.9, do_sample=True
)

for sequence in generated:
    print(sequence['generated_text'])
```

O parâmetro **temperature** altera o quão criativo e randômico o modelo é, valores mais altos resultam em texto mais variado e inesperado, enquanto valores mais baixos resultam em texto mais previsível e determinístico.

O parâmetro **top_k** limita as mais prováveis próximas palavras em uma quantidade que no caso é 50. Isso pode ser usado para controlar a diversidade do texto gerado.

O parâmetro **top_p** é a porcentagem de palavras mais prováveis a serem consideradas pelo modelo durante a geração de texto. Isso também pode ser usado para controlar a diversidade do texto gerado.

O parâmetro **do_sample=True** faz com que o modelo use Sample Decoding, possibilitando diferentes estratégias de sampling para que os parâmetros top_p e top_k funcionem.

### O resultado com esses parâmetros foi o seguinte:

***A story about a man and a dog, and how to handle it.***

***It’s been more than four years since The Mummy took off, and we’re very proud of the team and the writers who brought it to life. It’s just a shame that the film just didn’t take off because there was so much of a sense of urgency in the***

***first two parts. But I am so happy to be working on this. And I’m really happy to finally have someone to bring it***

### Podemos também fazer um Chatbot com texto inicial sendo:

<b>
You: hello!, how are you?
<br/>
He: I am fine, thanks.
<br/>
You: Do you like pizza?
</b>

e o resultado gerado foi:

<b>
You: hello!, how are you?
<br/>
He: I am fine, thanks.
<br/>
You: Do you like pizza?
<br/>
He: I am not too fond of it, but I think I like it anyway. I'm still thinking about it.
<br/>
You: Do you like pizza?
<br/>
You: Did you get to eat that?
<br/>
He: It was good, but I want to see if I can get a good meal.
<br/>
You: What was that for?
<br/>
He: I have to see.
</b>

As possibilidades de uso são inúmeras com GPT, esse foi só o começo, você pode usar outros modelos, afinar os modelos para o seu caso de uso, como gerar histórias de fantasia medieval que vai ser o contéudo do próximo artigo, e enfim a sua criatividade é o limite.