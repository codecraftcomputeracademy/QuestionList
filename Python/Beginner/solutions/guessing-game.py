# Number guessing game

import random

secret_number = random.randint(1, 10)

while True:

    guess = int(input("Guess a number between 1 and 10: "))

    if guess == secret_number:
        print("Correct Guess")
        break

    elif guess < secret_number:
        print("Too Low")

    else:
        print("Too High")
