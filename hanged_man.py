# Imports
from os import name, system
from time import sleep

import requests

# Constants
HANGMAN_ILLUSTRATIONS = ["""







=========""", """






      |
=========""", """





      |
      |
=========""", """




      |
      |
      |
=========""", """



      |
      |
      |
      |
=========""", """


      |
      |
      |
      |
      |
=========""", """
    
      |
      |
      |
      |
      |
      |
=========""", """
    --+
      |
      |
      |
      |
      |
      |
=========""", """
  +---+
      |
      |
      |
      |
      |
      |
=========""", """
  +---+
  |   |
      |
      |
      |
      |
      |
=========""", """
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
      |
========="""]

FREEMAN_ILLUSTRATIONS = ["""

(_)
/|\\
 |
/ \\
""", """

(_)
\\|/
 |
/ \\
"""]
HIDDEN_CHAR = "*"


def clear_screen():
  if name == 'nt':
    system('cls')
  else:
    system('clear')


def get_word():
  res = requests.get('https://random-word-api.herokuapp.com/word')
  return res.json()[0]


def game_status(hidden_word, illustration, guessed_letters, misses):
  print(illustration)
  print("\nGuessed Letters: {}".format(", ".join(guessed_letters)))
  print("\nYou Have Missed {} Times".format(misses))
  print("\nThe Word Is: {}\n".format(hidden_word))


def player_turn():
  return input("Guess Here: ")


def is_guess_valid(guess, word, guessed_letters):
  if len(guess) != 1:
    input("Invalid input, Enter A Single Letter")
    return True
  elif guess in guessed_letters:
    input("You've Already Guessed {}".format(guess))
    return True
  elif guess not in word:
    return False
  return True


def update_hidden_word(hidden, secret, guess):
  new_word = ""
  for i in range(len(secret)):
    if secret[i] == guess:
      new_word += guess
    else:
      new_word += hidden[i]
  return new_word


def game_over(word, misses):
  if misses == 10:
    print(HANGMAN_ILLUSTRATIONS[misses])
  else:
    for i in range(10):
      clear_screen()
      print(FREEMAN_ILLUSTRATIONS[i % 2])
      sleep(0.3)
  print("The Secret Word Was {}".format(word))


def main():
  misses = 0
  guessed_letters = []

  secret_word = get_word()
  hidden_word = HIDDEN_CHAR * len(secret_word)

  while misses < 10 and HIDDEN_CHAR in hidden_word:
    clear_screen()
    game_status(
      hidden_word, HANGMAN_ILLUSTRATIONS[misses], guessed_letters, misses)
    guess = player_turn()

    if is_guess_valid(guess, secret_word, guessed_letters):
      hidden_word = update_hidden_word(hidden_word, secret_word, guess)
    else:
      misses += 1

    guessed_letters.append(guess)
  game_over(secret_word, misses)


if __name__ == '__main__':
  main()
