# --- Apresentação do jogo e Regras ---

# Usamos a função print() para exibir uma mensagem de boas-vindas e as regras do jogo. 
print("-------------------------------------------------------")
print("---Jogo da Velha: Pedra, Papel e Tesoura!---") # Exibição do título do jogo 
print("-------------------------------------------------------") # Exibição de uma linha de separação 
print("Bem-vindo ao Jogo da Velha: Cada jogador escolhe uma opção: Pedra, Papel ou Tesoura.") # Exibição de uma mensagem de boas-vindas e explicação do jogo 

#Usamos uma tupla para armazenar as opções válidas do jogo.
opcoes_validas = ("Pedra", "Papel", "Tesoura") # Armazenamento das opções válidas do jogo em uma tupla  
print(f"As opções válidas são: {opcoes_validas}") # Exibição das opções válidas do jogo 
print(f"{'_' * 25}") # Exibição de uma linha de separação  

#--- 2. Entrada de Dados do Jogador --- 
# Usamos a função input() para solicitar ao jogador que escolha uma opção válida do jogo.
# A função input() sempre retorna uma string. 
jogada_jogador1 = input("jogador 1, escolha uma opção (Pedra, Papel ou Tesoura): ") # Solicitação da jogada do jogador 1
jogada_jogador2 = input("jogador 2, escolha uma opção (Pedra, Papel ou Tesoura): ") # Solicitação da jogada do jogador 2

#--- 3. Validação da Entrada de Dados ---
#Manipulação de strings: usamos .lower() para converter a entrada do jogador para minúsculas e .capitalize() para garantir que a primeira letra seja maiúscula, facilitando a comparação com as opções válidas. 
jogada_jogador1 = jogada_jogador1 .lower(). strip() # Conversão da jogada do jogador 1 para minúsculas e remoção de espaços em branco 
jogada_jogador2 = jogada_jogador2 .lower(). strip() # Conversão da jogada do jogador 2 para minúsculas e remoção de espaços em branco  

print(f"{'_' * 25}") # Exibição de uma linha de separação  
print(f"jogaodor 1 escolheu: {jogada_jogador1}") # Exibição da jogada do jogador 1 
print(f"jogaodor 2 escolheu: {jogada_jogador2}") # Exibição da jogada do jogador 2  
print(f"{'_' * 25}") # Exibição de uma linha de separação 

# --- 4. Lógica do Jogo e Resultado --- 
#Primeiro, verificamos se as jogadas são válidas 
#Há varias jogadas para chegar se as jogada está dentro da nossa tupla de ações.  
if jogada_jogador1 not in opcoes_validas or jogada_jogador2 not in opcoes_validas: # Verificação se as jogadas são válidas 
# --- 1. Apresentação e Regras ---

#Usamos a função print() para exibir mensagens na tela
print("--------------------------------") #Exibição de uma linha de separação 
print("---Jogo da velha: Joga Pedra, Papel e Tesoura (2jogadores) ---") 
print("--------------------------------") # Exibição de uma linha de separação  
print("Bem-vindos! Cada jogador deve escolher uma das opções")

#Usamos uma tupla para armazenar as ações validas.
#Tuplas são boa aqui porque as opções do jogo não mudam (são imutáveis).
opcoes_validas = ("pedra", "papel", "tesoura")
print(f"As opções válidas são: {opcoes_validas}")
print(f"-" *25) # Imprime uma linha para separar

#---2. Coleta de Dados de Entrada

#Usamos a função input() para receber o que o usuário digita (Entrada Padrão)
#A função input() sempre retorna a string.

jogador_jogador1_inicial = input("jogador 1, digite a sua jogada: ")
jogador_jogador2_inicial = input("jogador 2, digite a sua jogada: ")

# ---3. Tratamento dos Dados de Entrada

#Manipulação de Strings: usamos .lower() para converter para minusculas
#e .strip() para remover espaços extras. Isso evita erros como "Pedra" != "pedra".

jogada_jogador1 = jogador_jogador1_inicial.lower(). strip()
jogada_jogador2 = jogador_jogador2_inicial.lower(). strip()

print("-" *25) #Imprime os valores
print(f"Jogador 1 escolheu: {jogada_jogador1}") #Imprime o que o jogador 1 escolheu
print(f"Jogador 2 escolheu: {jogada_jogador2}") #Imprime o que o jogador 2 escolheu
print("-" * 25)

# ---4. Lógica do jogo e resultado ---

#Primeiro, verificamos se as jogadas são válidas.
#Há várias opções para checar se a jogada está dentro da nossa tupla de opções.

if jogada_jogador1 not in opcoes_validas or jogada_jogador2 not in opcoes_validas:
#if opcoes_validas.count(jogada_jogador1) == 0 or opcoes_validas.count(jogada_jogador2) == 0:
#if{jogada_jogador1}, jogada_jogador2} - set{opcoes_valida}:
#if not all (jogada in opcoes-validas for jogada in [jogada_jogada1, jogada_jogada2]):
#if len(list(filter(lambda x: x not in opcoes_validas, [jogado_jogador1, jogada_jogador2]))) > 0:
    print("DSA: Uma ou ambas as jogadas são inválidas! Por favor, use apenas 'pedra', 'papel' ou 'tesoura'.")

#Agora, a lógica principal do jogo, usando operadores de comparação (==) e lógicos (and, or).

#Caso 1: Empate
elif jogada_jogador1 == jogada_jogador2:
    print("Resultado: É um empate!") 

#Caso 2: Jogador 1 vence
#Agrupamos todas as condições de vitória do jogador 1 com o operador 'or'.
elif (jogada_jogador1 == "pedra" and jogada_jogador2 == "tesoura") or \
    (jogada_jogador1 == "tesoura" and jogada_jogador2 == "papel") or \
    (jogada_jogador1 == "papel" and jogada_jogador2 == "pedra"):
    print("Resultado: Jogador 1 venceu! Parabéns!")

#Caso 3: Se não empatou e o jogador 1 não venceu, então o jogador 2 venceu.
else:
    print("Resultado: Jogador 2 venceu! Parabéns!")

print("\n--- Fim de jogo ---")