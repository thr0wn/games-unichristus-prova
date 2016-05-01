angular.module('gu')
	.constant('worlds', [
		{
			name: 'Mundo Corporativo',
			nameOrigin: 'Referências: Mundo do The Running Man (livro do Stephen King)',
			desc: 'Este mundo é composto por grandes centros urbanos e industriais, onde a poluição é recorrente. As grandes corporações controlam todo o sistema político e econômico das grandes cidades, salvo os casos de pessoas que vivem fora das mesmas. Extrema desigualdade social é a norma, onde o indivíduo é o único reponsável por si e o estado é praticamente inexistente nesta sociedade anarco-capitalista.',
			image: 'imgs/worlds/Mundo Coorporativo.png',
			starKey: 'corpWorld'
		},
		{
			name: 'Mundo Tecnológico',
			nameOrigin: 'Referências: Cyberpunk 2020, Deus EX.',
			desc: 'Neste mundo Futurista os avanços da tecnologia são aplicados aos habitantes, não apenas para reparos e reposição de partes do corpo, mas também para melhoramentos físicos e cérebrais. Não há limites nas pesquisas científicas e as pessoas ricas são praticamente imortais.',
			image: 'imgs/worlds/Mundo Tecnológico.jpg',
			starKey: 'techWorld'
		},
		{
			name: 'Mundo Teocrático',
			nameOrigin: 'Referências: Mitologia Nórdica, Mitologia Eslávica.',
			desc: 'Neste mundo O seu sistema de governo se encontra fundamentado no poder religioso, pela crença na encarnação do divino nos monarcas. As cidades são repletas de templos e imagens de para adoração dos fiéis. O cataclisma na árvore “Árvore Eterna” causou uma diminuição da fé da população nos monarcas, tornando a sociedade instável.',
			image: 'imgs/worlds/Mundo Monarquico Teocrático.jpg',
			starKey: 'teoWorld'
		},
		{
			name: 'Mundo Mágico',
			nameOrigin: 'Referências: Magos da Terra Média (LoTR), College of Winterhold (Skyrim)',
			desc: 'Este mundo é permeado por uma forma de ocultismo que estuda os segredos da natureza e a sua relação com o homem. Um mundo menos populoso, controlado por um grupo seleto de grande magos conhecidos como A Ordem. Tem características ritualísticas e cerimoniais que visam entrar em contato com os aspectos ocultos da natureza e de outros mundos. Eles utilizam de rituais, feitiços, orações e invocações para que forças ocultas atuem sobre o ambiente, modificando, a vontade, o agir e o destino das pessoas.',
			image: 'imgs/worlds/Mundo Mágico.png',
			starKey: 'magicWorld'
		},
		{
			name: 'Mundo do Caos',
			nameOrigin: 'Referências: Berserk (mundo após o eclipse)',
			desc: 'Mundo de origem do Druida atual, que está em decadência e estado de caos permanente porque o Druida está morrendo. Neste mundo os elementos estão sempre em fora do equilíbrio, e as condições adversas são constantes. O Druida foi atacado por Tenma e as alucinações do Druida que está morrendo se materializam em formas de monstros e rios de sangue, etc. A atmosfera é sempre mais sombria, tenebrosa e com uma escuridão recorrente onde os habitantes remanescentes estão em constantes conflitos bélicos.',
			image: 'imgs/worlds/Mundo do Caos.jpg',
			starKey: 'caosWorld'
		},
		{
			name: 'Summa',
			nameOrigin: 'Referências: White Room AKA Construct Room (Matrix)',
			desc: 'O Mundo branco, Summa é em sí uma sala na qual contam as lendas, que ela é o local onde estão as portas de entradas e saídas por onde se cruzam todos os mundos da “Árvore Eterna”l. Habitado apenas pelos seres extra dimensionais que criaram a árvore, Amana é inicialmente guiada até lá pelo mentor.',
			image: 'imgs/worlds/Summa.jpg',
			starKey: 'summaWorld'
		}
	]);