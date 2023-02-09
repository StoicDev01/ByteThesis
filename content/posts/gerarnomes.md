---
title: "Como gerar nomes únicos com Markov Chain"
date: 2023-02-09
draft: false
categories: [machine_learning]
author: 
    given_name: John
    family_name: Feminella
    display_name: "Izkeas"
---

Neste artigo vou explicar o processo pelo qual eu fiz um gerador de nomes únicos usando Markov Chain, um algoritmo que prevê o próximo estado baseado no estado atual, caso você não saiba o que são Cadeias de Markov ( Markov Chain ) veja o último artigo [O que são Cadeias de Markov](/posts/markovchains/), nele explico em conceitos simples o que é Markov Chain e como usar.
Como são formados os nomes?

Para podermos gerar nomes, precisamos saber como são compostos os nomes, os nomes são formados de diversas maneiras, dependendo da cultura e do idioma em que são usados.

Em geral, os nomes podem ser derivados de palavras da língua, de outros nomes, de palavras em outros idiomas ou de apelidos, mas para simplificarmos, os nomes são compostos por diversas sílabas que podem variar de acordo com o idioma de origem do nome, como um exemplo, temos o nome “Joel” composto por duas sílabas “Jo” e “el”, mas também poderia ser “Jo” e “an” formando “Joan” e assim em diante.

Nomes também podem ter sobrenomes e nomes do meio, novamente isso varia de acordo com a cultura, o comum no mundo todo é um nome e um sobrenome que é herdado da família, já no Brasil temos um nome, nome do meio e o terceiro nome.

## Dados de treinamento

Para gerar nomes únicos com Cadeias de Markov, primeiro é preciso coletar uma amostra de nomes existentes que vão servir como treino para o nosso modelo. então se você quiser gerar nomes Brasileiros encontre uma lista de nomes brasileiros.

Vamos usar os dados de treinamento da seguinte forma:

```pseudo
Nome1 NomeDoMeio UltimoNome
Nome2 NomeDoMeio UltimoNome
Nome3 NomeDoMeio UltimoNome
```

Não é necessário ter o nome do meio nem o ultimo nome caso você não queira, o modelo vai se ajustar aos dados de treinamento. Aqui vão alguns links de lista de nomes: [nomes US](http://https://github.com/dominictarr/random-name/blob/master/first-names.txt), [nomes BR](https://github.com/emersonsoares/SampleDataGenerator/blob/master/SampleDataGenerator/Resources/nomes.txt), você pode também criar novas palavras em português com [Lista de Palavras BR](https://www.hugonobrega.com/palavras.txt), ou criar um novo nome de pokemon com [Lista de Pokemons](https://github.com/cervoise/pentest-scripts/blob/master/password-cracking/wordlists/pokemon-list-en.txt), enfim as possibilidades são inúmeras.

## Fazendo o código

Com tudo isso em mente, vamos ao atual código, decidi usar a linguagem Typescript, mas pode ser qualquer uma, os passos vão ser parecidos mas é claro com suas diferenças.

Primeiro vamos importar o file system

```typescript
import { readFileSync } from "fs";
```

Vamos definir duas funções, o cortador de sílabas que corta cada sílaba de uma palavra e a função que prepara os dados para o markov chain.

Note que cortador de sílabas usa um regex bem grande.

```typescript
// corta sílabas de uma palavra
function syllableSplitter(sentence:string){
    let syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
    return sentence.match(syllableRegex);    
}

// prepara os dados para treinamento
prepareData(trainningText : string){
    const data: string[]= [];
    const sentences = trainningText.split("\n");

    for (const sentence of sentences){
        // para cada nome
        // pegamos as suas sílabas
        const syllables = this.syllableSplitter(sentence);

        if (syllables){
            // adicionamos ao data
            for (const syllable of syllables){
                data.push(syllable);

            }
            data.push("\n");
        }
    }

    return data;
}
```

Com tudo isso definido, vamos criar um novo gerador Markov

```typescript
let markov = new Markov<string>();
```

agora vamos ler os nossos nomes salvos e preparar os dados, no meu caso vai ser o dataset de nomes dos pokemons.

```typescript 
let trainningText = readFileSync("./data/pokemon-list-en.txt", "utf-8")
let trainningData = prepareData(trainningText);
```

Agora vamos gerar os nomes

```typescript
markov.addStates(trainningData);
markov.generate(null, 20); // Gera 20 sílabas
```

Os meus resultados de nomes de Pokemons foram os seguintes:

```pseudo
tangetic
stunky
alotad
accelgor
pip
bisharp
```

```pseudo
fletchingling
sharpede
kecleon
spirizion
mega
colo
```

Note que alguns nomes são únicos como “Tangetic”, que acredito que foi baseado em “Togetic”, “Alotad”, “Pip”, “Fletchingling” que foi baseado em “Fletchling”, “Sharpede” baseado em “Sharpedo” e outros não foram únicos, como “Accelgor”, “Kecleon” etc.