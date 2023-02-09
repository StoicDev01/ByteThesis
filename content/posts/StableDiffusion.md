---
title: "Como gerar imagens com I.A de graça com Stable Diffusion"
date: 2023-02-09
draft: false
categories: [machine_learning]
author: 
    given_name: John
    family_name: Feminella
    display_name: "Izkeas"
---

Neste artigo vou mostrar a melhor e mais fácil forma de usar o Stable Diffusion online com o Google Colab, de maneira que não precise de um computador muito potente e também que não precise pagar nada.

## O que é o Stable Diffusion?

O Stable Diffusion é um modelo de Deep Learning mais especificamente um modelo de latent diffusion criada pela Stability AI que cria imagens a partir de texto, semelhante ao DALLE 2 e ao MidJourney, com a vantagem de ser Open Source e portanto de graça, qualquer um pode usar e alterar o modelo, O Stable diffusion pode ser útil também para edição de imagens com técnicas de InPainting, OutPainting e gerar imagens a partir de outra imagen.

O Stable Diffusion pode ser executado em alguns computadores potentes, com uma GPU de pelomenos 8GB de VRAM, mas também tem como rodar na núvem, sem a necessidade de um computador muito forte.

## O que é o Google Colab?

O Google Colab é uma plataforma que roda códigos Python em forma de Jupyter Notebooks na nuvem, ela permite e que os usuários executem treinamentos de machine learning e computação de alto desempenho, dessa você pode rodar algoritmos muito pesados sem ter que usar o processamento da sua máquina. Colab também facilita a colaboração em tempo real entre os usuários, permitindo que eles compartilhem facilmente códigos e notebooks.

## Interface Automatic1111

<img src="/post_stablediffusion/stablediffusion1.png" class="article-image"/>

O Stable Diffusion criado originalmente pela *Stability AI* não possui interface gráfica, que dificulta o uso pela maioria das pessoas, portanto um programador chamado Automatic1111 [criou uma interface gráfica web](https://github.com/AUTOMATIC1111/stable-diffusion-webui) que deixa tudo mais simples e visual.

## Rodando o Stable Diffusion com Google Colab

<img src="/post_stablediffusion/stablediffusion2.png" class="article-image"/>

Este [Jupyter NoteBook](https://colab.research.google.com/github/TheLastBen/fast-stable-diffusion/blob/main/fast_stable_diffusion_AUTOMATIC1111.ipynb#scrollTo=PjzwxTkPSPHf) contém um código que roda o Stable Diffusion com a interface gráfica Automatic1111.

### Configurações
<img src="/post_stablediffusion/stablediffusion3.png" class="article-image"/>

Primeiro é bom ter noção de certas opções do notebook, na quarta célula (Model Download \ Load) tem as seguintes opções:

- **Model version:** Versão do modelo, use 1.5 na maioria dos casos, a versão 1.5 é melhor para imagens estilizadas já a 2.1 é melhor para imagens realistas.
- **Redownload original model:** Use isso caso seu modelo tenha corrompido ou você queira mudar de versão

Ou altere as seguintes opções:

- **Path to Model:** Caminho para o modelo do stable diffusion .ckpt, você pode definir um modelo seu pelo google drive em **/content/gdrive/...**

Ou altere as seguintes opções:

- **Model Link:** Link para o modelo, você pode escolher um link de um modelo de um site como [Civitai](https://civitai.com/) (Contém nsfw)

Agora é só clicar em todos os botões de Play na ordem, do primeiro para o último, em um momento o NoteBook vai pedir acesso ao seu Google Drive, aceite pois ele vai baixar o modelo do Stable Diffusion e guardar lá.

<img src="/post_stablediffusion/stablediffusion4.png" class="article-image"/>

Depois que todas as caixas foram executadas, na ultima caixa vai ser mostrado o URL público da interface da aplicação na nuvem, basta acessar esse URL que você será redirecionado ao AUTOMATIC1111.

<img src="/post_stablediffusion/stablediffusion5.png" class="article-image"/>


Basta colocar seu input na caixa acima e clicar em Generate, meu input foi “A photo of a dog in mars” ou seja, “Uma foto de um cachorro em marte”, tenha em mente que o interpretador de texto do Stable Diffusion funciona melhor em Inglês então escreva em inglês.

O melhor resultado foi

<img src="/post_stablediffusion/stablediffusion6.png" class="article-image"/>

Você pode brincar com os parâmetros, ver o que cada um faz, mas que tal em estilo de anime? “A photo of a dog in mars, anime”, cfg 15

<img src="/post_stablediffusion/stablediffusion7.png" class="article-image"/>

Mas e se usarmos um prompt mais complexo? “A golden retriever in a space suit in mars, highly detailed, digital painting, artstation, concept art, sharp focus, illustration, art by greg rutkowski and alphonse mucha”

<img src="/post_stablediffusion/stablediffusion8.png" class="article-image"/>