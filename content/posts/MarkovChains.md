---
title: "O que são Cadeias de Markov ( Markov Chain )"
date: 2023-02-07
draft: false
categories: [machine_learning]
author: 
    given_name: John
    family_name: Feminella
    display_name: "Izkeas"
---

Uma cadeia de Markov é um algoritmo matemático que pode ser usado para prever como um processo mudará ao longo do tempo. É chamado de cadeia de markov em homenagem ao matemático russo Andrey Markov, que foi que foi o criador do algoritmo. Ele é baseado na ideia de que o próximo passo em um processo só depende do passo atual e das probabilidades de transição entre os estados. É usado em várias áreas, como análise de texto e previsão de séries temporais.

## Aplicações

As cadeias de Markov são usadas em uma ampla variedade de áreas, incluindo:

- Análise de texto: As cadeias de Markov podem ser usadas para analisar e prever padrões em texto, como o que palavras vêm depois de outras em um determinado texto.

- Modelagem de sistemas dinâmicos: As cadeias de Markov são usadas para modelar sistemas que mudam com o tempo, como a propagação de doenças ou a dinâmica de uma economia.

- Previsão de séries temporais: As cadeias de Markov são usadas para prever como uma série de dados, como as vendas de um produto ou o clima, mudará no futuro.

- Tomada de decisão: As cadeias de Markov podem ser usadas para ajudar a tomar decisões, como escolher a melhor rota a seguir em um jogo ou otimizar uma campanha de marketing.

Esses são apenas alguns exemplos dos usos mais comuns das cadeias de Markov. Há muitas outras áreas nas quais elas são usadas.

## Conceito

<img src="/markov.png" style="filter: invert(0.9);"/>

Vamos imaginar uma seguinte sequência de estados:

“Sunny -> Rainy -> Sunny -> Sunny -> Rainy”

Analisando o histórico de sequências é possível estimar a probabilidade de transições entre estados, como exemplo, para estimarmos a probabilidade de transição entre Sunny e Rainy precisamos contar quantas vezes Sunny foi para Rainy que foram duas vezes, e dividir pela quantidade total de transições de Sunny para outro estado, que foram três no total, assim a probabilidade de Sunny para rainy é = 2/3 = 0.666…

Uma vez que as probabilidades de transição entre todos os estados são conhecidas, é possível criar uma tabela de transição, que é uma matriz que contém todas as probabilidades de transição entre os estados. Essa tabela de transição é a base para prever a próxima transição em uma cadeia de Markov.


<img src="/markovTable.png" style="margin : auto"/>

Implementação simples

Vamos implementar o algoritmo do Markov Chain de maneira simples, com uma transition table de forma diferente, em Typescript, mas o conceito vale para qualquer linguagem, Primeiro precisamos definir uma função que escolhe um estado randômico de uma lista de estados.

```typescript
function randomChoice<T>(array : T[]){
    return array[ Math.floor(Math.random() * array.length)]
}
```

Essa função é bem simples, ela retorna um valor dada uma array de valores e usa o “Math.random()” para escolher um valor randômico entre 0.0 e o tamanho da array, depois usamos o “Math.floor” para transformar o número em número inteiro.

Agora vamos fazer a classe de Markov Chain.

```typescript
class Markov<T>{
    public data : Map<T,T[]>    
    
    constructor(){
        this.data = new Map<T, T[]>();
    }
```

A classe usa um template <T>, ela possui a propriedade data que é um Map de T e array de T. Podemos imaginar T sendo o tipo string, e imaginar o mapa com a seguinte estrutura:

```typescript
data = {
    "estado" : [ "proximo estado1", "proximo estado2", "proximo estado 3" ],
...
}
```

Agora vamos declarar a função que adiciona os estados ao data dado uma lista de estados.

```typescript
    class Markov<T>{
    ...
        addStates(states : T[]){
            let index = 0;
            // iterar por todos os estados dados
            for (let state of states){
                // pegar o id do proximo estado
                let nextState = states[index+ 1];
                
                // se este estado não está em data
                if (!this.data.get(state)){
                    // adicione o estado e o possivel proximo estado
                    if (nextState){
                        this.data.set(state, [nextState]);
                    }
                    else{
                        this.data.set(state, []);
                    }
                } else {
                    // adicione o possivel proximo estado
                    if (nextState){
                        let dataState = this.data.get(state);
                        if (dataState){
                            this.data.set(
                            state, dataState.concat(nextState)
                            );
                        }
                    }
                }
                index++;
            }
        }
```

vou dar um exemplo desta função, imaginamos que executamos a função com os seguintes parâmetros :

```typescript
addStates([“A”, “B”, “C”, “D”, “D”, “C”, “C”, ‘A’])
```

O “data” criado seria:

```typescript
data = { 
    'A' : [ 'B' ], 
    'B' : [ 'C' ], 
    'C' : [ 'D', 'C', 'A' ], 
    'D' : [ 'D', 'C' ] 
}
```

Note que usando este método é possivel ter próximos estados “undefined”, trate o undefined como um “Fim”, e também é possivel ter próximos estados duplicados, que não é um problema no nosso caso, na realidade é bom porque podemos usar o randomChoice para escolher um próximo estado aleatório assim sem precisar de calcular as probabilidades.

Agora, a função que anda a partir de um estado.

```typescript
    walk(currentState : T | undefined){
        if ( !currentState){
            // pegar um estado aleatório inicial
            currentState = randomChoice<T>(
                Array.from(this.data.keys())
            );
        }
    
        // escolher o proximo baseado nas possibilidades
        let possibilites = this.data.get(currentState);
        if (possibilites){
            return randomChoice(possibilites);
        }

        return undefined;
    }
```

E por fim, a função que gera vários estados em cadeia

```typescript
...
    generate(max : number = 10){
        let lastState : T | null = null;
        let generatedStates : T[] = [];
       
        for (let x = 0; x < max; x++){
            let currentState : T | undefined;
            if (lastState){
                currentState = this.walk(lastState)
            }
            else{
                currentState = this.walk();
            }

            if (currentState == undefined){
                // chegamos ao fim
                return generatedStates;
            }
            else{
                generatedStates.push(currentState);
            }

            lastState = currentState;
        }
        return generatedStates;
    }
}
```

Exemplo prático

Vou fazer um programa simples em Typescript que prevê o tempo de um dia usando o Markov Chain e dados históricos anteriores.

```typescript
var markov = new Markov<string>();
```

Vamos adicionar os estados em sequência do tempo, eu adicionei dados fictícios como exemplo.

```typescript
markov.addStates([
  'Ensolarado',
  'Ensolarado',
  'Ensolarado',
  'Nublado',
  'Nublado',
  'Ensolarado',
  'Nublado',
  'chovendo',
  'Muito Frio',
  'Ensolarado',
  'Nublado',
  'Nublado',
  'Ensolarado',
  'chovendo',
  'Frio',
]);
```

E por fim, vamos gerar um novo resultado

```typescript
console.log(markov.generate(10))
// [ 'Ensolarado', 'Ensolarado', 'chovendo', 'Frio' ]
```

Esse foi um exemplo didático de como funciona o Markov Chain e por sua vez um exemplo muito simples, é possível implementar o markov chain de maneira mais otimizada e também usar o Markov Chain de formas muito mais complexas e úteis, como um gerador de nomes únicos que aprende de uma database predefinida, que será o assunto do próximo artigo.