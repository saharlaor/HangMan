# Imports
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


def get_word():
    res = requests.get('https://random-word-api.herokuapp.com/word')
    return res.json()[0]


def main():
    secret_word = get_word()
    hidden_word = "*" * len(secret_word)


if __name__ == '__main__':
    main()
